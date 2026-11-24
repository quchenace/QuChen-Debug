'use strict';
/**
 * QuChen调试 账号门禁自测（Node 端）。
 * 起一个本地假账号服务，覆盖：无会话 / 登录 / 密码错 / 离线宽限 / 超期 / 续期 / 退出 / 关闭开关 / 会话文件不含密码
 * 并静态校验 entry.js 接入是否完整。
 * 用法：node tools/account_gate_test.js
 */
const http = require('node:http');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const assert = require('node:assert');

const ROOT = path.dirname(__dirname);
const MAIN = path.join(ROOT, 'app', 'out', 'main');
const { AccountGate, AccountError } = require(path.join(MAIN, 'account-gate.js'));

let pass = 0;
let fail = 0;
const failures = [];
function ok(name, cond, detail) {
  if (cond) { pass++; console.log('  PASS  ' + name); }
  else { fail++; failures.push(name); console.log('  FAIL  ' + name + (detail ? '  ' + detail : '')); }
}

/* ---------- 假账号服务 ---------- */
const users = new Map([['dev@example.com', 'Pass123456']]);
const refreshTokens = new Map();
let refreshSeq = 0;

const server = http.createServer((req, res) => {
  const chunks = [];
  req.on('data', (c) => chunks.push(c));
  req.on('end', () => {
    const raw = Buffer.concat(chunks).toString('utf8');
    let body = {};
    try { body = raw ? JSON.parse(raw) : {}; } catch (_) { body = {}; }
    const send = (code, obj) => {
      res.writeHead(code, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(obj));
    };
    const url = req.url.split('?')[0];
    if (url === '/api/auth/login') {
      if (users.get(body.email) !== body.password) {
        return send(401, { ok: false, code: 'invalid_credentials', message: '邮箱或密码错误' });
      }
      const rt = 'rt-' + (++refreshSeq);
      refreshTokens.set(rt, body.email);
      return send(200, {
        ok: true,
        access_token: 'at-' + rt,
        refresh_token: rt,
        expires_in: 1800,
        user: { email: body.email, role: 'user', status: 'active' },
      });
    }
    if (url === '/api/auth/refresh') {
      const email = refreshTokens.get(body.refresh_token);
      if (!email) return send(401, { ok: false, code: 'invalid_refresh', message: '刷新令牌无效' });
      refreshTokens.delete(body.refresh_token);
      const rt = 'rt-' + (++refreshSeq);
      refreshTokens.set(rt, email);
      return send(200, { ok: true, access_token: 'at-' + rt, refresh_token: rt, expires_in: 1800, user: { email, role: 'user' } });
    }
    if (url === '/api/auth/logout') {
      refreshTokens.delete(body.refresh_token);
      return send(200, { ok: true });
    }
    if (url === '/api/auth/entitlement') {
      return send(200, { ok: true, entitlements: { suite: ['ai', 'radio', 'vpn', 'debug', 'web'] } });
    }
    send(404, { ok: false, code: 'not_found' });
  });
});

function listen() {
  return new Promise((resolve) => server.listen(0, '127.0.0.1', () => resolve(server.address().port)));
}

(async () => {
  const port = await listen();
  const base = `http://127.0.0.1:${port}`;
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'quchen-debug-gate-'));
  let seq = 0;
  const newSession = () => path.join(dir, `s${++seq}.json`);

  console.log('\n== QuChen调试 账号门禁自测 ==\n');

  /* 1. 无会话 */
  const g1 = new AccountGate('debug', { baseUrl: base, sessionFile: newSession() });
  ok('无会话时未解锁', g1.unlocked() === false);
  ok('原因标注 no_session', g1.reason().why === 'no_session', JSON.stringify(g1.reason()));

  /* 2. 登录 */
  const email = 'dev@example.com';
  const goodPass = 'Pass123456';
  const st = await g1.login(email, goodPass);
  ok('登录成功写入令牌', Boolean(st.access_token && st.refresh_token), JSON.stringify(st).slice(0, 120));
  ok('登录后解锁', g1.unlocked() === true);
  ok('会话记录了邮箱与角色', st.email === email && st.role === 'user');
  const saved = fs.readFileSync(g1.sessionFile, 'utf8');
  ok('会话文件不含密码原文', !saved.includes(goodPass), saved.slice(0, 80));
  const parsed = JSON.parse(saved);
  ok('会话文件字段齐备', ['email', 'access_token', 'refresh_token', 'issued_at', 'last_verified'].every((k) => k in parsed), Object.keys(parsed).join(','));

  /* 3. 密码错误 */
  const gBad = new AccountGate('debug', { baseUrl: base, sessionFile: newSession() });
  let badErr = null;
  try { await gBad.login(email, 'wrong-pass'); } catch (e) { badErr = e; }
  ok('错误密码抛 AccountError', badErr instanceof AccountError && badErr.status === 401, badErr && badErr.code);
  ok('错误密码不落盘', gBad.unlocked() === false);

  /* 4. 服务不可达 */
  const gDead = new AccountGate('debug', { baseUrl: 'http://127.0.0.1:1', sessionFile: newSession() });
  let deadErr = null;
  try { await gDead.login(email, goodPass); } catch (e) { deadErr = e; }
  ok('服务不可达报 unreachable', deadErr && deadErr.code === 'unreachable', deadErr && deadErr.code);

  /* 5. 离线宽限 / 超期 */
  const graceFile = newSession();
  const now = Date.now() / 1000;
  fs.writeFileSync(graceFile, JSON.stringify({
    app: 'debug', email, access_token: 'a', refresh_token: 'r',
    issued_at: now - 25 * 86400, last_verified: now - 25 * 86400, expires_at: now - 24 * 86400,
  }), 'utf8');
  const gGrace = new AccountGate('debug', { baseUrl: 'http://127.0.0.1:1', sessionFile: graceFile });
  ok('25 天前验证 → 宽限内可用', gGrace.unlocked() === true, JSON.stringify(gGrace.reason()));
  ok('宽限原因标注 session', gGrace.reason().why === 'session' && gGrace.reason().offline_days === 25, JSON.stringify(gGrace.reason()));

  const expiredFile = newSession();
  fs.writeFileSync(expiredFile, JSON.stringify({
    app: 'debug', email, access_token: 'a', refresh_token: 'r',
    issued_at: now - 40 * 86400, last_verified: now - 40 * 86400, expires_at: now - 39 * 86400,
  }), 'utf8');
  const gExpired = new AccountGate('debug', { baseUrl: 'http://127.0.0.1:1', sessionFile: expiredFile });
  ok('40 天前 → 触发重新登录', gExpired.unlocked() === false && gExpired.reason().why === 'grace_expired', JSON.stringify(gExpired.reason()));

  /* 6. 续期 */
  const g2 = new AccountGate('debug', { baseUrl: base, sessionFile: newSession() });
  await g2.login(email, goodPass);
  const before = g2.state();
  fs.writeFileSync(g2.sessionFile, JSON.stringify({ ...before, expires_at: Date.now() / 1000 - 10 }), 'utf8');
  const g2b = new AccountGate('debug', { baseUrl: base, sessionFile: g2.sessionFile });
  const fresh = await g2b.ensureFresh();
  ok('到期前自动续期成功', fresh === true);
  ok('续期后令牌已轮换', g2b.state().refresh_token !== before.refresh_token, g2b.state().refresh_token);

  /* 7. 退出 */
  await g2b.logout();
  ok('退出后本地会话清空', g2b.unlocked() === false && Object.keys(g2b.state()).length === 0, JSON.stringify(g2b.state()));

  /* 8. 关闭开关 */
  const gOff = new AccountGate('debug', { baseUrl: base, sessionFile: newSession(), enabled: false });
  ok('关闭开关时始终放行', gOff.unlocked() === true && gOff.reason().why === 'disabled');

  /* 9. 服务端吊销（refresh 被拒 → revoked） */
  const g3 = new AccountGate('debug', { baseUrl: base, sessionFile: newSession() });
  await g3.login(email, goodPass);
  fs.writeFileSync(g3.sessionFile, JSON.stringify({ ...g3.state(), expires_at: Date.now() / 1000 - 10, refresh_token: 'bogus' }), 'utf8');
  const g3b = new AccountGate('debug', { baseUrl: base, sessionFile: g3.sessionFile });
  const f3 = await g3b.ensureFresh();
  ok('被吊销后不再解锁', f3 === false && g3b.unlocked() === false, JSON.stringify(g3b.reason()));

  /* 10. 工程接入静态校验 */
  const pkg = JSON.parse(fs.readFileSync(path.join(ROOT, 'app', 'package.json'), 'utf8'));
  ok('package.json 版本 6.3.2', pkg.version === '6.3.2', pkg.version);
  ok('main 指向门禁入口', pkg.main === './out/main/entry.js', pkg.main);
  const entry = fs.readFileSync(path.join(MAIN, 'entry.js'), 'utf8');
  ok('entry 引入 AccountGate', entry.includes("require('./account-gate.js')"));
  ok('entry 在放行后才拉起主程序', entry.includes("require('./index.js')") && entry.includes('function launchMain'));
  ok('entry 支持调试跳过开关', entry.includes('QUCHEN_AUTH_SKIP'));
  ok('entry 注册登录 IPC', entry.includes("'qc:gate-login'") && entry.includes("'qc:gate-state'"));
  ok('登录页存在且调用 qc.login', fs.existsSync(path.join(MAIN, 'login.html')) &&
    fs.readFileSync(path.join(MAIN, 'login.html'), 'utf8').includes('qc.login'));
  ok('preload 仅暴露门禁接口', fs.readFileSync(path.join(MAIN, 'preload-login.js'), 'utf8').includes('qc:gate-login'));

  server.close();
  console.log(`\n${pass} passed, ${fail} failed`);
  if (fail) {
    console.log('失败项：' + failures.join('；'));
    process.exit(1);
  }
})().catch((err) => {
  console.error('自测异常：', err);
  server.close();
  process.exit(1);
});
