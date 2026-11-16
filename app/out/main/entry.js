'use strict';
/**
 * QuChen调试 账号门禁入口（6.3.0 起）。
 *
 * 原主进程 bundle（./index.js）保持不变，由本文件做前置校验：
 *   1. 读本机会话（%APPDATA%\QuChen\auth\debug.json），快到期时静默续期；
 *   2. 已登录（或处于 30 天离线宽限期）→ 直接拉起主程序；
 *   3. 未登录 → 先显示登录窗，登录成功后再拉起主程序。
 *
 * 开关：QUCHEN_AUTH_SKIP=1 可跳过门禁（本机调试用）。
 */

const path = require('node:path');
const { app, BrowserWindow, ipcMain } = require('electron');
const { AccountGate } = require('./account-gate.js');

const APP_ID = 'debug';
const gate = new AccountGate(APP_ID, { deviceName: 'QuChen调试' });

let loginWin = null;
let launched = false;

function skipGate() {
  return String(process.env.QUCHEN_AUTH_SKIP || '') === '1';
}

function launchMain() {
  if (launched) return;
  launched = true;
  require('./index.js');
}

function openLoginWindow() {
  if (loginWin) {
    loginWin.focus();
    return;
  }
  loginWin = new BrowserWindow({
    width: 520,
    height: 680,
    resizable: false,
    frame: false,
    show: false,
    center: true,
    backgroundColor: '#050507',
    title: 'QuChen调试 · 登录',
    webPreferences: {
      preload: path.join(__dirname, 'preload-login.js'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: false,
    },
  });
  loginWin.loadFile(path.join(__dirname, 'login.html'));
  loginWin.once('ready-to-show', () => loginWin.show());
  loginWin.on('closed', () => {
    loginWin = null;
    if (!launched) app.quit();
  });
}

ipcMain.handle('qc:gate-state', () => gate.reason());

ipcMain.handle('qc:gate-login', async (_event, payload) => {
  const email = String((payload && payload.email) || '').trim();
  const password = String((payload && payload.password) || '');
  if (!email || !password) {
    return { ok: false, code: 'invalid', message: '请输入邮箱与密码' };
  }
  try {
    await gate.login(email, password);
  } catch (err) {
    return { ok: false, code: (err && err.code) || 'error', message: (err && err.message) || '登录失败' };
  }
  const why = gate.reason();
  if (!why.unlocked) {
    const msg = why.why === 'grace_expired'
      ? '账号登录态已过期，请重新登录'
      : '账号尚未通过审批或已被封禁';
    return { ok: false, code: why.why, message: msg };
  }
  const win = loginWin;
  loginWin = null;
  if (win) win.destroy();
  launchMain();
  return { ok: true, email: why.email || email };
});

// 注册：先发邮箱验证码，再带验证码建号（服务端 require_approval=1 时注册后待审批）
ipcMain.handle('qc:gate-send-code', async (_event, payload) => {
  const email = String((payload && payload.email) || '').trim();
  if (!email) return { ok: false, code: 'bad_request', message: '请填写邮箱' };
  try {
    const data = await gate.sendCode(email, (payload && payload.purpose) || 'register');
    return {
      ok: true,
      ttl: data.ttl,
      resend_after: data.resend_after,
      message: data.message,
      dev_code: data.dev_code,
    };
  } catch (err) {
    return {
      ok: false,
      code: (err && err.code) || 'send_failed',
      status: (err && err.status) || 0,
      message: (err && err.message) || '验证码发送失败',
    };
  }
});

ipcMain.handle('qc:gate-register', async (_event, payload) => {
  const email = String((payload && payload.email) || '').trim();
  const code = String((payload && payload.code) || '').trim();
  const password = String((payload && payload.password) || '');
  if (!email || !code || !password) {
    return { ok: false, code: 'bad_request', message: '请填写邮箱、验证码与密码' };
  }
  try {
    const data = await gate.register(email, code, password);
    return { ok: true, status: data.status, message: data.message };
  } catch (err) {
    return {
      ok: false,
      code: (err && err.code) || 'register_failed',
      status: (err && err.status) || 0,
      message: (err && err.message) || '注册失败',
    };
  }
});

ipcMain.handle('qc:gate-minimize', () => {
  if (loginWin) loginWin.minimize();
  return { ok: true };
});

ipcMain.handle('qc:gate-close', () => {
  if (loginWin) loginWin.close();
  else app.quit();
  return { ok: true };
});

app.whenReady().then(async () => {
  if (skipGate()) {
    launchMain();
    return;
  }
  try {
    await gate.ensureFresh();
  } catch (_) {
    /* 网络异常不清会话，交给 unlocked() 按离线宽限判定 */
  }
  if (gate.unlocked()) {
    launchMain();
    return;
  }
  openLoginWindow();
});

app.on('window-all-closed', () => {
  if (!launched) app.quit();
});
