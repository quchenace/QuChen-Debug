import { t as defineComponent, aD as watch, l as createElementBlock, S as normalizeClass, i as createBaseVNode, ak as toDisplayString, F as Fragment, ab as renderList, q as createTextVNode, k as createCommentVNode, aI as withModifiers, aH as withKeys, aG as withDirectives, aA as vModelText, a9 as ref, g as computed, a5 as openBlock, _ as _export_sfc, a1 as onMounted, a3 as onUnmounted, p as createStaticVNode, az as vModelSelect, j as createBlock, ah as shallowReactive, R as nextTick } from "./main-DAqTdO6U.js";
const hardwareMarketSources = [
  { id: "merchant", name: "商家批发", detail: "金英通路价", sourceId: "jinying", url: "https://jinyingpc.com/index/pathway", currency: "CNY", mode: "merchant" },
  { id: "fangdede", name: "方的的", detail: "装机参考价", sourceId: "fangdede", url: "https://www.fangdede.com/products", currency: "CNY", mode: "reference" },
  { id: "trendmire", name: "TrendMire", detail: "服务器 · 美元", sourceId: "trendmire", url: "https://www.trendmire.com/price", currency: "USD", mode: "reference" },
  { id: "diypc", name: "DIYPC", detail: "月度参考价", sourceId: "diypc", url: "https://diypc.space/diypc", currency: "CNY", mode: "reference" },
  { id: "retail", name: "电商零售", detail: "需平台授权", sourceId: "duomai-jd", url: "https://www.jd.com/", currency: "CNY", mode: "retail" }
];
function marketSource(channel) {
  return hardwareMarketSources.find((source) => source.id === channel);
}
function summarizeHardwareMarketAvailability(entries) {
  const unavailable = entries.filter((entry) => entry.error && !(entry.channel === "retail" && !entry.report && /未配置|未授权|需连接已配置/.test(entry.error)));
  const loading = entries.some((entry) => entry.loading);
  const hasReports = entries.some((entry) => entry.report);
  const quoteCount = entries.reduce((sum, entry) => sum + (entry.report?.items.length ?? 0), 0);
  const freshQuoteCount = entries.reduce((sum, entry) => sum + (!entry.error && !entry.stale ? entry.report?.items.length ?? 0 : 0), 0);
  const errors = unavailable.map((entry) => entry.error);
  const serverError = errors.find((error) => /行情服务器.*HTTP 5\d\d/.test(error));
  const upgradeRequired = errors.some((error) => error.includes("服务器尚未升级"));
  const detail = serverError ? `${serverError}。请稍后重试；若持续出现，请联系QuChen调试检查行情服务。` : upgradeRequired ? "服务器行情服务尚未升级，请联系QuChen调试更新行情服务。" : errors[0] || "暂无可用报价，请稍后刷新。";
  let notice = "";
  if (unavailable.length) {
    const names = unavailable.map((entry) => marketSource(entry.channel).name).join("、");
    if (freshQuoteCount) {
      notice = `部分来源暂不可用：${names}。已获取的报价仍可查看。${upgradeRequired ? detail : "稍后会自动重试。"}`;
      if (freshQuoteCount < quoteCount) notice += "标注“上次缓存”的报价尚未更新。";
    } else if (quoteCount) {
      notice = `本次未获取到新报价，正在显示上次采集的数据。暂不可用来源：${names}。${detail}`;
    } else if (loading) {
      notice = `部分来源暂不可用：${names}。其余来源仍在读取。`;
    } else {
      notice = `当前暂无可用报价。暂不可用来源：${names}。${detail}`;
    }
  } else if (quoteCount > freshQuoteCount) {
    notice = freshQuoteCount ? "部分报价来自上次采集的数据，请结合采集时间参考。" : "正在显示上次采集的数据，请结合采集时间参考，稍后可重新刷新。";
  }
  return { loading, hasReports, error: !hasReports && !loading ? detail : "", notice };
}
function getSourceAgeStatus(sourceUpdatedAt, now = Date.now()) {
  if (!sourceUpdatedAt) return "unknown";
  const timestamp = Date.parse(sourceUpdatedAt);
  if (!Number.isFinite(timestamp)) return "unknown";
  return now - timestamp > 72 * 60 * 60 * 1e3 ? "historical" : "current";
}
function resolveHardwareSourceDate(quoteDate, reportDate) {
  return quoteDate === void 0 ? reportDate : quoteDate;
}
function selectHardwareQuotes(items, query, sort, suppressChanges = false) {
  const keywords = query.trim().toLocaleLowerCase().split(/\s+/).filter(Boolean);
  const displayed = suppressChanges ? items.map((item) => ({ ...item, dayChange: null, weekChange: null })) : items;
  return displayed.filter((item) => keywords.every((keyword) => `${item.name} ${item.spec || ""}`.toLocaleLowerCase().includes(keyword))).sort((a, b) => {
    if (a.price === null) return b.price === null ? 0 : 1;
    if (b.price === null) return -1;
    if (sort.startsWith("day-") || sort.startsWith("week-")) {
      const aValue = sort.startsWith("day-") ? a.dayChange?.percent : a.weekChange?.percent;
      const bValue = sort.startsWith("day-") ? b.dayChange?.percent : b.weekChange?.percent;
      if (aValue == null || !Number.isFinite(aValue)) return bValue == null || !Number.isFinite(bValue) ? 0 : 1;
      if (bValue == null || !Number.isFinite(bValue)) return -1;
      return sort.endsWith("asc") ? aValue - bValue : bValue - aValue;
    }
    return sort === "asc" ? a.price - b.price : sort === "desc" ? b.price - a.price : 0;
  });
}
function combineHardwareQuotes(sources, now = Date.now()) {
  return sources.flatMap(({ channel, report, stale = false }) => !report ? [] : report.items.map((q) => {
    const sourceUpdatedAt = q.sourceUpdatedAt === void 0 ? report.sourceUpdatedAt : q.sourceUpdatedAt;
    const historical = getSourceAgeStatus(sourceUpdatedAt, now) === "historical", monthly = report.updateFrequency === "monthly";
    return {
      ...q,
      id: `${channel}:${report.kind}:${q.id}`,
      channel,
      sourceName: report.sourceName,
      currency: report.currency ?? marketSource(channel).currency,
      sourceUpdatedAt,
      fetchedAt: report.fetchedAt,
      monthly,
      historical,
      stale,
      timestampBasis: report.timestampBasis,
      historyMode: report.historyMode,
      sourceMessage: report.message,
      ...stale || monthly || historical ? { dayChange: null, weekChange: null } : {}
    };
  }));
}
function group(q) {
  return q.currency === "USD" ? 3 : q.monthly ? 2 : q.stale || q.historical ? 1 : 0;
}
function selectOverviewQuotes(items, query, sort) {
  const keywords = query.toLocaleLowerCase().trim().split(/\s+/).filter(Boolean);
  const matched = items.filter((q) => keywords.every((k) => `${q.name} ${q.spec ?? ""} ${q.sourceName}`.toLocaleLowerCase().includes(k)));
  const ordered = selectHardwareQuotes(matched, "", sort);
  if (sort === "source" || sort === "asc" || sort === "desc") ordered.sort((a, b) => group(a) - group(b));
  return ordered;
}
function summarizeMarket(items) {
  const eligible = [...new Map(items.filter((q) => q.currency === "CNY" && !q.monthly && !q.historical && !q.stale && q.price !== null).map((q) => [q.id, q])).values()];
  const period = (key) => {
    const values = eligible.flatMap((q) => q[key] && Number.isFinite(q[key].percent) ? [q[key].percent] : []);
    return { percent: values.length ? values.reduce((a, b) => a + b, 0) / values.length : null, count: values.length, up: values.filter((p) => p > 0).length, down: values.filter((p) => p < 0).length };
  };
  return { eligible: eligible.length, day: period("dayChange"), week: period("weekChange") };
}
const unknown = "未标注";
const makers = [
  ["华硕", /华硕|\bASUS\b/i],
  ["微星", /微星|\bMSI\b/i],
  ["技嘉", /技嘉|GIGABYTE/i],
  ["七彩虹", /七彩虹|COLORFUL/i],
  ["影驰", /影驰|GALAX/i],
  ["索泰", /索泰|ZOTAC/i],
  ["蓝宝石", /蓝宝石|SAPPHIRE/i],
  ["撼讯", /撼讯|POWERCOLOR/i],
  ["华擎", /华擎|ASROCK/i],
  ["耕升", /耕升|GAINWARD/i],
  ["映众", /映众|INNO3D/i],
  ["铭瑄", /铭瑄|MAXSUN/i],
  ["盈通", /盈通|YESTON/i],
  ["丽台", /丽台|LEADTEK/i],
  ["迪兰", /迪兰|DATALAND/i],
  ["磐镭", /磐镭/],
  ["金士顿", /金士顿|KINGSTON|FURY/i],
  ["金百达", /金百达|KINGBANK/i],
  ["芝奇", /芝奇|G\.?SKILL/i],
  ["海盗船", /海盗船|CORSAIR/i],
  ["威刚", /威刚|ADATA|XPG/i],
  ["英睿达", /英睿达|CRUCIAL/i],
  ["美光", /美光|MICRON/i],
  ["海力士", /海力士|HYNIX/i],
  ["三星", /三星|SAMSUNG/i],
  ["阿斯加特", /阿斯加特|ASGARD/i],
  ["光威", /光威|GLOWAY/i],
  ["十铨", /十铨|TEAMGROUP/i],
  ["科赋", /科赋|KLEVV/i],
  ["雷克沙", /雷克沙|LEXAR/i],
  ["佰维", /佰维|BIWIN/i],
  ["玖合", /玖合|JUHOR/i],
  ["金泰克", /金泰克|TIGO/i],
  ["金邦", /金邦|GEIL/i],
  ["现代", /现代/],
  ["OC LAB", /OC\s*LAB/i],
  ["西部数据", /西部数据|西数|WESTERN\s*DIGITAL|\bWD\b/i],
  ["希捷", /希捷|SEAGATE/i],
  ["东芝", /东芝|TOSHIBA/i],
  ["铠侠", /铠侠|KIOXIA/i],
  ["致态", /致态|ZHITAI/i],
  ["长江存储", /长江存储|YMTC/i],
  ["闪迪", /闪迪|SANDISK/i],
  ["英特尔", /英特尔|\bINTEL\b/i],
  ["宏碁", /宏碁|ACER/i],
  ["惠普", /惠普|\bHP\b/i],
  ["联想", /联想|LENOVO/i],
  ["梵想", /梵想|FANXIANG/i],
  ["爱国者", /爱国者|\bAIGO\b/i],
  ["大华", /大华|DAHUA/i],
  ["海康威视", /海康|HIKVISION|HIKSEMI/i],
  ["达墨", /达墨/],
  ["朗科", /朗科|NETAC/i]
];
const cache = /* @__PURE__ */ new WeakMap();
function capacity(text, memory) {
  const token = /(?<![A-Z0-9.])(?:(\d{1,2})\s*[*x×]\s*)?(\d+(?:\.\d+)?)\s*(TB?|GB?)(?=$|[^A-Z]|X\s*\d)/gi;
  const first = token.exec(text);
  if (!first) return unknown;
  let size = Number(first[2]), unit = first[3][0].toUpperCase();
  if (memory) {
    const tail = text.slice(first.index + first[0].length);
    const after = /^\s*[*x×]\s*(\d{1,2})(?!\d)/i.exec(tail);
    if (first[1] || after) size *= Number(first[1] || after[1]);
    if (unit === "T") size *= 1024;
    return size > 0 && size <= 2048 ? `${size}GB` : unknown;
  }
  return size > 0 && size <= 1e4 ? `${size}${unit === "T" ? "TB" : "GB"}` : unknown;
}
function classifyHardware(q, kind) {
  const found = cache.get(q)?.get(kind);
  if (found) return found;
  const text = `${q.name} ${q.spec ?? ""}`;
  const brandSpec = q.spec?.split("·")[0].trim() ?? "";
  const maker = makers.find(([, pattern]) => {
    const m = pattern.exec(q.name);
    return m !== null && m.index <= 5;
  })?.[0] ?? makers.find(([, pattern]) => pattern.test(brandSpec))?.[0] ?? (/^[\p{L} .-]{1,20}$/u.test(brandSpec) && !/未知|未标注/.test(brandSpec) ? brandSpec : unknown);
  let tags;
  if (kind === "cpu") {
    const amd = /\bAMD\b|RYZEN|锐龙|霄龙|EPYC|THREADRIPPER|线程撕裂者|\bR[3579]\s*\d/i.test(text);
    const intel = /INTEL|英特尔|酷睿|至强|XEON|\bI[3579][- ]?\d|ULTRA\s*[3579]/i.test(text);
    let series = unknown;
    const ryzen = /(?:RYZEN\s*|锐龙\s*|\bR)([3579])/i.exec(text), core = /\bI([3579])[- ]?\d/i.exec(text), ultra = /ULTRA\s*([3579])/i.exec(text);
    if (/EPYC|霄龙/i.test(text)) series = "EPYC / 霄龙";
    else if (/XEON|至强/i.test(text)) series = "Xeon / 至强";
    else if (/THREADRIPPER|线程撕裂者/i.test(text)) series = "Threadripper";
    else if (ultra) series = `酷睿 Ultra ${ultra[1]}`;
    else if (ryzen) series = `锐龙 ${ryzen[1]}`;
    else if (core) series = `酷睿 i${core[1]}`;
    tags = { brand: amd ? "AMD" : intel ? "Intel" : unknown, series, pack: /散片|散装|\s散(?:\s|$)|散$/.test(text) ? "散片" : /盒装|\bBOX\b/i.test(text) ? "盒装" : unknown };
  } else if (kind === "gpu") {
    const rtx = /RTX\s*(20|30|40|50)\d{2}/i.exec(text), gtx = /GTX\s*(10|16)\d{2}/i.exec(text), rx = /RX\s*([5679])\d{3}/i.exec(text);
    const chip = /RTX|GTX|NVIDIA|英伟达|TESLA|QUADRO/i.test(text) ? "NVIDIA" : /\bRX\s*\d|RADEON|AMD|V[E]?GA/i.test(text) ? "AMD" : /ARC|INTEL|英特尔/i.test(text) ? "Intel" : unknown;
    const series = rtx ? `RTX ${rtx[1]} 系列` : gtx ? `GTX ${gtx[1]} 系列` : rx ? `RX ${rx[1]}000 系列` : /ARC\s*B\d/i.test(text) ? "Arc B 系列" : /ARC\s*A\d/i.test(text) ? "Arc A 系列" : /QUADRO|TESLA|RTX\s*(?:PRO|A\d)|\b[AH]\d{3}\b|工作站|计算卡/i.test(text) ? "专业 / 计算卡" : unknown;
    const modelMatch = /\b(RTX|GTX|RX)\s*(\d{3,4})(?:\s*(TI))?(?:\s*(SUPER|XTX|XT|GRE|D))?/i.exec(text);
    const arc = /ARC\s*([AB]\d{3})/i.exec(text);
    const model = modelMatch ? [modelMatch[1].toUpperCase(), modelMatch[2], modelMatch[3] ? "Ti" : "", modelMatch[4]?.toUpperCase() ?? ""].filter(Boolean).join(" ") : arc ? `Arc ${arc[1].toUpperCase()}` : unknown;
    tags = { chip, series, model, brand: maker };
  } else if (kind === "memory") {
    const generation = /(?:DDR|\bD)\s*([345])\b/i.exec(text);
    tags = { brand: maker, generation: generation ? `DDR${generation[1]}` : unknown, capacity: capacity(q.name, true), form: /RDIMM|LRDIMM|ECC|服务器|REG\b/i.test(text) ? "服务器 / ECC" : /SO-?DIMM|笔记本/i.test(text) ? "笔记本" : /UDIMM|台式/i.test(text) ? "台式机" : unknown };
  } else {
    tags = { brand: maker, capacity: capacity(q.name, false), interface: /NVME|PCIE|PCI-E/i.test(text) ? "NVMe / PCIe" : /SAS\b/i.test(text) ? "SAS" : /SATA/i.test(text) ? "SATA" : unknown };
  }
  let saved = cache.get(q);
  if (!saved) {
    saved = /* @__PURE__ */ new Map();
    cache.set(q, saved);
  }
  saved.set(kind, tags);
  return tags;
}
const definitions = { cpu: [["brand", "品牌"], ["series", "系列"], ["pack", "包装"]], gpu: [["chip", "芯片平台"], ["series", "型号系列"], ["model", "具体型号"], ["brand", "显卡品牌"]], memory: [["generation", "内存代数"], ["capacity", "总容量"], ["brand", "内存品牌"], ["form", "适用类型"]], ssd: [["capacity", "容量"], ["brand", "硬盘品牌"], ["interface", "接口"]], hdd: [["capacity", "容量"], ["brand", "硬盘品牌"], ["interface", "接口"]] };
function filterHardwareFacets(items, kind, selection) {
  const selected = Object.entries(selection).filter(([, v]) => v);
  if (!selected.length) return items;
  return items.filter((q) => {
    const tags = classifyHardware(q, kind);
    return selected.every(([k, v]) => tags[k] === v);
  });
}
const compare = new Intl.Collator("zh-CN", { numeric: true });
function hardwareFacetGroups(items, kind, selection) {
  const selected = Object.entries(selection).filter(([, v]) => v);
  return definitions[kind].map(([key, label]) => {
    const counts = /* @__PURE__ */ new Map();
    for (const q of items) {
      const tags = classifyHardware(q, kind);
      if (selected.some(([k, v]) => k !== key && tags[k] !== v)) continue;
      const value = tags[key];
      counts.set(value, (counts.get(value) ?? 0) + 1);
    }
    if (selection[key] && !counts.has(selection[key])) counts.set(selection[key], 0);
    return { key, label, options: [...counts].map(([value, count]) => ({ value, count })).sort((a, b) => a.value === unknown ? 1 : b.value === unknown ? -1 : compare.compare(a.value, b.value)) };
  });
}
function shouldLoadMarket(state, now, force = false, ttl = 6e4) {
  return !state?.loading && (force || state?.checkedAt === void 0 || now - state.checkedAt >= ttl || now < state.checkedAt);
}
function mergeMarketSummaries(summaries) {
  const period = (key) => {
    let count = 0, total = 0, up = 0, down = 0;
    for (const summary of summaries) {
      const p = summary[key];
      if (p.percent === null || !p.count) continue;
      count += p.count;
      total += p.percent * p.count;
      up += p.up;
      down += p.down;
    }
    return { percent: count ? total / count : null, count, up, down };
  };
  return { eligible: summaries.reduce((sum, s) => sum + s.eligible, 0), day: period("day"), week: period("week") };
}
function isHardwareCandle(c) {
  if (!c || typeof c !== "object" || !/^\d{4}-\d{2}-\d{2}$/.test(c.date)) return false;
  const date = Date.parse(c.date + "T00:00:00Z"), first = Date.parse(c.firstObservedAt), last = Date.parse(c.lastObservedAt);
  if (!Number.isFinite(date) || new Date(date).toISOString().slice(0, 10) !== c.date || !Number.isFinite(first) || !Number.isFinite(last) || first > last) return false;
  const day = (t) => new Date(t + 8 * 36e5).toISOString().slice(0, 10);
  return day(first) === c.date && day(last) === c.date && [c.open, c.high, c.low, c.close].every((p) => typeof p === "number" && Number.isFinite(p) && p > 0 && p <= 1e7) && c.low <= Math.min(c.open, c.close) && c.high >= Math.max(c.open, c.close) && Number.isSafeInteger(c.samples) && c.samples > 0 && c.samples <= 1e5;
}
function aggregateCandles(input, period) {
  const days = /* @__PURE__ */ new Map();
  for (const c of input) if (isHardwareCandle(c)) {
    const old = days.get(c.date);
    if (!old || Date.parse(c.lastObservedAt) > Date.parse(old.lastObservedAt)) days.set(c.date, c);
  }
  const groups = /* @__PURE__ */ new Map();
  for (const c of [...days.values()].sort((a, b) => a.date.localeCompare(b.date))) {
    const d = /* @__PURE__ */ new Date(c.date + "T00:00:00Z");
    if (period === "weekly") d.setUTCDate(d.getUTCDate() - (d.getUTCDay() + 6) % 7);
    if (period === "monthly") d.setUTCDate(1);
    const date = d.toISOString().slice(0, 10), old = groups.get(date);
    groups.set(date, old ? { ...old, high: Math.max(old.high, c.high), low: Math.min(old.low, c.low), close: c.close, samples: old.samples + c.samples, lastObservedAt: c.lastObservedAt } : { ...c, date });
  }
  return [...groups.values()];
}
function isReferenceDay(p) {
  if (!p || typeof p.date !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(p.date) || typeof p.price !== "number" || !Number.isFinite(p.price) || p.price <= 0 || p.price > 1e7) return false;
  const t = Date.parse(p.date + "T00:00:00Z");
  return Number.isFinite(t) && new Date(t).toISOString().slice(0, 10) === p.date;
}
function aggregateReferenceDays(points, period) {
  const groups = /* @__PURE__ */ new Map();
  for (const p of [...points].filter(isReferenceDay).sort((a, b) => a.date.localeCompare(b.date))) {
    const d = /* @__PURE__ */ new Date(p.date + "T00:00:00Z");
    if (period === "weekly") d.setUTCDate(d.getUTCDate() - (d.getUTCDay() + 6) % 7);
    if (period === "monthly") d.setUTCDate(1);
    const date = d.toISOString().slice(0, 10), old = groups.get(date);
    groups.set(date, old ? { ...old, high: Math.max(old.high, p.price), low: Math.min(old.low, p.price), close: p.price, samples: old.samples + 1 } : { date, open: p.price, high: p.price, low: p.price, close: p.price, samples: 1 });
  }
  return [...groups.values()];
}
const _hoisted_1$1 = { class: "chart-badge" };
const _hoisted_2$1 = { class: "chart-toolbar" };
const _hoisted_3$1 = { class: "switch" };
const _hoisted_4$1 = ["aria-pressed", "onClick"];
const _hoisted_5$1 = { class: "switch" };
const _hoisted_6$1 = ["aria-pressed"];
const _hoisted_7$1 = ["aria-pressed"];
const _hoisted_8$1 = { class: "zoom" };
const _hoisted_9$1 = ["disabled"];
const _hoisted_10$1 = ["disabled"];
const _hoisted_11$1 = {
  class: "quote-readout",
  "aria-live": "polite"
};
const _hoisted_12$1 = { key: 0 };
const _hoisted_13$1 = { key: 1 };
const _hoisted_14$1 = { key: 2 };
const _hoisted_15$1 = { key: 3 };
const _hoisted_16$1 = { key: 1 };
const _hoisted_17$1 = {
  key: 0,
  class: "chart-empty"
};
const _hoisted_18$1 = { key: 0 };
const _hoisted_19$1 = { key: 1 };
const _hoisted_20$1 = { key: 2 };
const _hoisted_21$1 = ["aria-label"];
const _hoisted_22$1 = ["y1", "y2"];
const _hoisted_23$1 = ["y"];
const _hoisted_24$1 = ["x1", "x2", "y1", "y2"];
const _hoisted_25$1 = ["x", "y", "width", "height"];
const _hoisted_26$1 = ["points"];
const _hoisted_27$1 = ["cx", "cy"];
const _hoisted_28$1 = ["points"];
const _hoisted_29$1 = {
  key: 2,
  class: "crosshair"
};
const _hoisted_30$1 = ["x1", "x2"];
const _hoisted_31$1 = ["y1", "y2"];
const _hoisted_32$1 = {
  x: "64",
  y: "288"
};
const _hoisted_33$1 = {
  x: "782",
  y: "288",
  "text-anchor": "end"
};
const _hoisted_34$1 = { class: "chart-bottom" };
const _hoisted_35$1 = {
  key: 2,
  class: "chart-range"
};
const _hoisted_36$1 = ["max"];
const _hoisted_37$1 = {
  key: 3,
  class: "chart-footnote"
};
const _hoisted_38$1 = {
  key: 4,
  class: "chart-footnote"
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "HardwareMarketChart",
  props: {
    quote: {},
    historyMode: {},
    currency: {},
    referenceOnly: { type: Boolean },
    compact: { type: Boolean }
  },
  setup(__props) {
    const props = __props;
    const periods = [{ id: "daily", name: "日 K" }, { id: "weekly", name: "周 K" }, { id: "monthly", name: "月 K" }];
    const period = ref("daily"), mode = ref("candles"), windowSize = ref(30), start = ref(0), hover = ref(-1);
    const periodLabel = computed(() => periods.find((p) => p.id === period.value).name);
    const sourceDaily = computed(() => !props.referenceOnly && (props.quote.referenceDaily?.length ?? 0) > 0);
    watch([() => props.quote.id, sourceDaily], () => {
      if (sourceDaily.value) period.value = "weekly";
    }, { immediate: true });
    const bars = computed(() => {
      if (sourceDaily.value) return aggregateReferenceDays(props.quote.referenceDaily, period.value);
      if (mode.value === "candles") return aggregateCandles(props.quote.candles ?? [], period.value);
      const groups = /* @__PURE__ */ new Map();
      for (const p of [...props.quote.history ?? []].sort((a, b) => a.date.localeCompare(b.date))) {
        if (!Number.isFinite(p.price) || p.price <= 0) continue;
        const d = /* @__PURE__ */ new Date(p.date + "T00:00:00Z");
        if (Number.isNaN(d.getTime())) continue;
        if (period.value === "weekly") d.setUTCDate(d.getUTCDate() - (d.getUTCDay() + 6) % 7);
        if (period.value === "monthly") d.setUTCDate(1);
        const date = d.toISOString().slice(0, 10);
        groups.set(date, { date, open: p.price, high: p.price, low: p.price, close: p.price, samples: 0 });
      }
      return [...groups.values()];
    });
    watch([() => props.quote.id, period, mode, () => bars.value.length, windowSize], () => {
      start.value = Math.max(0, bars.value.length - windowSize.value);
      hover.value = -1;
    }, { immediate: true });
    watch(start, () => {
      hover.value = -1;
    });
    const visible = computed(() => bars.value.slice(start.value, start.value + windowSize.value));
    const focusBar = computed(() => visible.value[hover.value] ?? visible.value.at(-1));
    const min = computed(() => Math.min(...visible.value.map((c) => c.low))), max = computed(() => Math.max(...visible.value.map((c) => c.high)));
    const pad = computed(() => Math.max((max.value - min.value) * 0.12, max.value * 5e-3, 1)), low = computed(() => Math.max(0, min.value - pad.value)), high = computed(() => max.value + pad.value);
    const ticks = computed(() => Array.from({ length: 5 }, (_, i) => low.value + (high.value - low.value) * i / 4));
    const barWidth = computed(() => Math.min(22, 718 / Math.max(visible.value.length, 1) * 0.6));
    const x = (i) => 64 + (i + 0.5) * 718 / Math.max(visible.value.length, 1);
    const y = (p) => 260 - (p - low.value) / (high.value - low.value) * 240;
    const lineSegments = computed(() => {
      const result = [];
      visible.value.forEach((c, i) => {
        const prior = visible.value[i - 1], date = /* @__PURE__ */ new Date(c.date + "T00:00:00Z"), prev = prior && /* @__PURE__ */ new Date(prior.date + "T00:00:00Z");
        const adjacent = prev && (period.value === "monthly" ? date.getUTCFullYear() * 12 + date.getUTCMonth() - prev.getUTCFullYear() * 12 - prev.getUTCMonth() === 1 : date.getTime() - prev.getTime() === (period.value === "weekly" ? 7 : 1) * 864e5);
        if (!adjacent) result.push([]);
        result.at(-1).push(`${x(i)},${y(c.close)}`);
      });
      return result.filter((s) => s.length > 1).map((s) => s.join(" "));
    });
    const averages = computed(() => [5, 10].map((n) => visible.value.map((_, i) => {
      const index = start.value + i;
      if (index < n - 1) return "";
      const p = bars.value.slice(index - n + 1, index + 1).reduce((s, c) => s + c.close, 0) / n;
      return p >= low.value && p <= high.value ? `${x(i)},${y(p)}` : "";
    }).filter(Boolean).join(" ")));
    function money(p) {
      return p.toLocaleString("zh-CN", { maximumFractionDigits: 2 });
    }
    function zoom(delta) {
      windowSize.value = Math.max(5, Math.min(90, windowSize.value + delta));
    }
    function move(delta) {
      hover.value = Math.max(0, Math.min(visible.value.length - 1, (hover.value < 0 ? visible.value.length - 1 : hover.value) + delta));
    }
    function pointAt(e) {
      const bounds = e.currentTarget.getBoundingClientRect();
      hover.value = Math.max(0, Math.min(visible.value.length - 1, Math.floor(((e.clientX - bounds.left) / bounds.width * 800 - 64) / 718 * visible.value.length)));
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("section", {
        class: normalizeClass(["market-chart", { compact: __props.compact }]),
        "aria-label": "报价看盘图"
      }, [
        createBaseVNode("header", null, [
          createBaseVNode("div", null, [
            _cache[10] || (_cache[10] = createBaseVNode("span", { class: "eyebrow" }, "QUOTE CHART", -1)),
            createBaseVNode("h3", null, toDisplayString(__props.quote.name), 1)
          ]),
          createBaseVNode("span", _hoisted_1$1, toDisplayString(__props.currency ?? "CNY") + " · " + toDisplayString(sourceDaily.value ? "来源日价" : "报价") + " · 非成交", 1)
        ]),
        createBaseVNode("div", _hoisted_2$1, [
          createBaseVNode("div", _hoisted_3$1, [
            (openBlock(), createElementBlock(Fragment, null, renderList(periods, (p) => {
              return createBaseVNode("button", {
                key: p.id,
                "aria-pressed": period.value === p.id,
                class: normalizeClass({ active: period.value === p.id }),
                onClick: ($event) => period.value = p.id
              }, toDisplayString(p.name), 11, _hoisted_4$1);
            }), 64))
          ]),
          createBaseVNode("div", _hoisted_5$1, [
            createBaseVNode("button", {
              "aria-pressed": mode.value === "candles",
              class: normalizeClass({ active: mode.value === "candles" }),
              onClick: _cache[0] || (_cache[0] = ($event) => mode.value = "candles")
            }, "K 线", 10, _hoisted_6$1),
            createBaseVNode("button", {
              "aria-pressed": mode.value === "line",
              class: normalizeClass({ active: mode.value === "line" }),
              onClick: _cache[1] || (_cache[1] = ($event) => mode.value = "line")
            }, "收盘折线", 10, _hoisted_7$1)
          ]),
          createBaseVNode("div", _hoisted_8$1, [
            createBaseVNode("button", {
              "aria-label": "放大图表",
              disabled: windowSize.value <= 5,
              onClick: _cache[2] || (_cache[2] = ($event) => zoom(-10))
            }, "＋", 8, _hoisted_9$1),
            createBaseVNode("button", {
              "aria-label": "缩小图表",
              disabled: windowSize.value >= 90,
              onClick: _cache[3] || (_cache[3] = ($event) => zoom(10))
            }, "−", 8, _hoisted_10$1)
          ])
        ]),
        createBaseVNode("div", _hoisted_11$1, [
          focusBar.value ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
            createBaseVNode("b", null, toDisplayString(focusBar.value.date), 1),
            mode.value === "candles" ? (openBlock(), createElementBlock("span", _hoisted_12$1, [
              _cache[11] || (_cache[11] = createTextVNode("首 ", -1)),
              createBaseVNode("strong", null, toDisplayString(money(focusBar.value.open)), 1)
            ])) : createCommentVNode("", true),
            mode.value === "candles" ? (openBlock(), createElementBlock("span", _hoisted_13$1, [
              _cache[12] || (_cache[12] = createTextVNode("高 ", -1)),
              createBaseVNode("strong", null, toDisplayString(money(focusBar.value.high)), 1)
            ])) : createCommentVNode("", true),
            mode.value === "candles" ? (openBlock(), createElementBlock("span", _hoisted_14$1, [
              _cache[13] || (_cache[13] = createTextVNode("低 ", -1)),
              createBaseVNode("strong", null, toDisplayString(money(focusBar.value.low)), 1)
            ])) : createCommentVNode("", true),
            createBaseVNode("span", null, [
              _cache[14] || (_cache[14] = createTextVNode("末 ", -1)),
              createBaseVNode("strong", null, toDisplayString(money(focusBar.value.close)), 1)
            ]),
            mode.value === "candles" ? (openBlock(), createElementBlock("small", _hoisted_15$1, toDisplayString(focusBar.value.samples) + " " + toDisplayString(sourceDaily.value ? "个日价" : "次观测"), 1)) : createCommentVNode("", true)
          ], 64)) : (openBlock(), createElementBlock("span", _hoisted_16$1, "暂无" + toDisplayString(mode.value === "candles" ? "K 线" : "收盘") + "记录", 1))
        ]),
        !bars.value.length ? (openBlock(), createElementBlock("div", _hoisted_17$1, [
          _cache[15] || (_cache[15] = createBaseVNode("span", { class: "empty-symbol" }, "⌁", -1)),
          createBaseVNode("h4", null, toDisplayString(__props.referenceOnly ? "月度参考报价" : mode.value === "candles" ? "等待真实 K 线记录" : "等待历史报价"), 1),
          __props.referenceOnly ? (openBlock(), createElementBlock("p", _hoisted_18$1, "此来源人工按月维护，仅供型号和预算参考，不生成日涨跌和 K 线。")) : __props.quote.history?.length && mode.value === "candles" ? (openBlock(), createElementBlock("p", _hoisted_19$1, "已有 " + toDisplayString(__props.quote.history.length) + " 条收盘记录。未提供对应的首价、高低价和末价。", 1)) : (openBlock(), createElementBlock("p", _hoisted_20$1, "成功采集后开始积累；不会生成过去的价格。")),
          __props.quote.history?.length && mode.value === "candles" ? (openBlock(), createElementBlock("button", {
            key: 3,
            onClick: _cache[4] || (_cache[4] = ($event) => mode.value = "line")
          }, "查看已有收盘折线 →")) : createCommentVNode("", true)
        ])) : (openBlock(), createElementBlock("svg", {
          key: 1,
          class: "candle-chart",
          viewBox: "0 0 800 300",
          role: "img",
          tabindex: "0",
          "aria-label": `${__props.quote.name} ${periodLabel.value} ${mode.value === "candles" ? "报价 K 线" : "收盘折线"}，${visible.value.length} 条`,
          onPointermove: pointAt,
          onPointerleave: _cache[5] || (_cache[5] = ($event) => hover.value = -1),
          onKeydown: [
            _cache[6] || (_cache[6] = withKeys(withModifiers(($event) => move(-1), ["prevent"]), ["left"])),
            _cache[7] || (_cache[7] = withKeys(withModifiers(($event) => move(1), ["prevent"]), ["right"]))
          ],
          onWheel: _cache[8] || (_cache[8] = withModifiers(($event) => zoom($event.deltaY > 0 ? 10 : -10), ["ctrl", "prevent"]))
        }, [
          _cache[16] || (_cache[16] = createBaseVNode("title", null, "报价图，左右方向键查看记录，Ctrl 加滚轮缩放", -1)),
          (openBlock(true), createElementBlock(Fragment, null, renderList(ticks.value, (tick) => {
            return openBlock(), createElementBlock("g", { key: tick }, [
              createBaseVNode("line", {
                x1: "64",
                x2: "782",
                y1: y(tick),
                y2: y(tick),
                class: "grid"
              }, null, 8, _hoisted_22$1),
              createBaseVNode("text", {
                x: "56",
                y: y(tick) + 4,
                "text-anchor": "end"
              }, toDisplayString(money(tick)), 9, _hoisted_23$1)
            ]);
          }), 128)),
          mode.value === "candles" ? (openBlock(true), createElementBlock(Fragment, { key: 0 }, renderList(visible.value, (c, i) => {
            return openBlock(), createElementBlock("g", {
              key: c.date,
              class: normalizeClass(["candle", c.close > c.open ? "rise" : c.close < c.open ? "fall" : "flat"])
            }, [
              createBaseVNode("line", {
                x1: x(i),
                x2: x(i),
                y1: y(c.high),
                y2: y(c.low)
              }, null, 8, _hoisted_24$1),
              createBaseVNode("rect", {
                x: x(i) - barWidth.value / 2,
                y: Math.min(y(c.open), y(c.close)),
                width: barWidth.value,
                height: Math.max(1.5, Math.abs(y(c.open) - y(c.close)))
              }, null, 8, _hoisted_25$1)
            ], 2);
          }), 128)) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(lineSegments.value, (segment, i) => {
              return openBlock(), createElementBlock("polyline", {
                key: i,
                points: segment,
                class: "close-line"
              }, null, 8, _hoisted_26$1);
            }), 128)),
            (openBlock(true), createElementBlock(Fragment, null, renderList(visible.value, (c, i) => {
              return openBlock(), createElementBlock("circle", {
                key: c.date,
                cx: x(i),
                cy: y(c.close),
                r: "3",
                class: "close-point"
              }, null, 8, _hoisted_27$1);
            }), 128))
          ], 64)),
          (openBlock(true), createElementBlock(Fragment, null, renderList(averages.value, (path, i) => {
            return openBlock(), createElementBlock("polyline", {
              key: i,
              points: path,
              class: normalizeClass(["average", "ma" + i])
            }, null, 10, _hoisted_28$1);
          }), 128)),
          hover.value >= 0 && focusBar.value ? (openBlock(), createElementBlock("g", _hoisted_29$1, [
            createBaseVNode("line", {
              x1: x(hover.value),
              x2: x(hover.value),
              y1: "20",
              y2: "261"
            }, null, 8, _hoisted_30$1),
            createBaseVNode("line", {
              x1: "64",
              x2: "782",
              y1: y(focusBar.value.close),
              y2: y(focusBar.value.close)
            }, null, 8, _hoisted_31$1)
          ])) : createCommentVNode("", true),
          createBaseVNode("text", _hoisted_32$1, toDisplayString(visible.value[0]?.date), 1),
          createBaseVNode("text", _hoisted_33$1, toDisplayString(visible.value.at(-1)?.date), 1)
        ], 40, _hoisted_21$1)),
        createBaseVNode("div", _hoisted_34$1, [
          _cache[17] || (_cache[17] = createBaseVNode("span", { class: "ma-key" }, [
            createTextVNode("MA5 "),
            createBaseVNode("i"),
            createTextVNode(" MA10 "),
            createBaseVNode("i")
          ], -1)),
          createBaseVNode("span", null, toDisplayString(periodLabel.value) + " · " + toDisplayString(bars.value.length) + " 个有记录周期", 1),
          _cache[18] || (_cache[18] = createBaseVNode("span", null, "红涨 / 绿跌", -1))
        ]),
        bars.value.length > windowSize.value ? (openBlock(), createElementBlock("label", _hoisted_35$1, [
          _cache[19] || (_cache[19] = createTextVNode("历史区间", -1)),
          withDirectives(createBaseVNode("input", {
            "aria-label": "平移历史区间",
            type: "range",
            min: "0",
            max: Math.max(0, bars.value.length - windowSize.value),
            "onUpdate:modelValue": _cache[9] || (_cache[9] = ($event) => start.value = $event)
          }, null, 8, _hoisted_36$1), [
            [
              vModelText,
              start.value,
              void 0,
              { number: true }
            ]
          ])
        ])) : createCommentVNode("", true),
        sourceDaily.value ? (openBlock(), createElementBlock("p", _hoisted_37$1, "来源走势图每日参考价：日 K 首、高、低、末为同一个日价；周 / 月 K 的首末和高低取自该周期已发布的日价，不是盘中波动。缺失日期不补价；MA5 / MA10 按有记录周期计算。")) : (openBlock(), createElementBlock("p", _hoisted_38$1, toDisplayString(mode.value === "candles" ? "首 / 末为周期内首次 / 最后有效观测，高 / 低为采样报价极值；单次观测显示平线，当前周期仍在形成。" : "旧版收盘历史可在这里查看，缺失日期不补价。") + " 均线按最近 5 / 10 个有记录周期计算；" + toDisplayString(__props.historyMode === "server" ? "历史由服务器持续积累。" : "本机模式关闭软件后停止采集。"), 1))
      ], 2);
    };
  }
});
const HardwareMarketChart = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-c0440c7e"]]);
const _hoisted_1 = {
  "data-tour": "hardware-market",
  class: "page hardware-market-page"
};
const _hoisted_2 = { class: "market-header" };
const _hoisted_3 = { class: "market-reference-tag" };
const _hoisted_4 = {
  class: "market-indices",
  role: "tablist",
  "aria-label": "硬件分类"
};
const _hoisted_5 = ["id", "aria-selected", "tabindex", "onKeydown", "onClick"];
const _hoisted_6 = { class: "index-title" };
const _hoisted_7 = { class: "index-period" };
const _hoisted_8 = { class: "index-week" };
const _hoisted_9 = ["aria-labelledby", "aria-busy"];
const _hoisted_10 = {
  key: 0,
  class: "market-disk-types",
  role: "group",
  "aria-label": "硬盘类型"
};
const _hoisted_11 = ["aria-pressed"];
const _hoisted_12 = ["aria-pressed"];
const _hoisted_13 = {
  class: "market-facets",
  "aria-label": "型号分类筛选"
};
const _hoisted_14 = { class: "market-facets-heading" };
const _hoisted_15 = { class: "market-facet-fields" };
const _hoisted_16 = ["onUpdate:modelValue", "aria-label"];
const _hoisted_17 = { value: "" };
const _hoisted_18 = ["value", "disabled"];
const _hoisted_19 = { class: "market-controls" };
const _hoisted_20 = { class: "market-search" };
const _hoisted_21 = { class: "market-sort" };
const _hoisted_22 = ["disabled"];
const _hoisted_23 = {
  class: "market-results",
  "aria-label": "型号报价"
};
const _hoisted_24 = {
  class: "market-views",
  role: "group",
  "aria-label": "行情筛选"
};
const _hoisted_25 = { class: "market-filter-note" };
const _hoisted_26 = { key: 0 };
const _hoisted_27 = { class: "market-list" };
const _hoisted_28 = {
  key: 0,
  class: "market-state",
  role: "status"
};
const _hoisted_29 = {
  key: 1,
  class: "market-state market-error",
  role: "alert"
};
const _hoisted_30 = { class: "market-error-actions" };
const _hoisted_31 = {
  key: 0,
  class: "market-table"
};
const _hoisted_32 = { "aria-label": "硬件参考报价列表" };
const _hoisted_33 = ["onClick"];
const _hoisted_34 = { class: "market-product" };
const _hoisted_35 = { class: "market-product-kind" };
const _hoisted_36 = { key: 0 };
const _hoisted_37 = { key: 1 };
const _hoisted_38 = { key: 2 };
const _hoisted_39 = {
  key: 0,
  class: "market-spec"
};
const _hoisted_40 = { class: "market-mobile-label" };
const _hoisted_41 = {
  key: 0,
  class: "market-historical-date"
};
const _hoisted_42 = { key: 1 };
const _hoisted_43 = {
  key: 2,
  class: "market-unknown-date"
};
const _hoisted_44 = ["title"];
const _hoisted_45 = {
  key: 1,
  class: "market-no-history"
};
const _hoisted_46 = ["title"];
const _hoisted_47 = {
  key: 1,
  class: "market-no-history"
};
const _hoisted_48 = { class: "market-actions" };
const _hoisted_49 = ["aria-label", "aria-pressed", "onClick"];
const _hoisted_50 = ["aria-label", "aria-pressed", "onClick"];
const _hoisted_51 = ["aria-label", "onClick"];
const _hoisted_52 = {
  key: 1,
  class: "market-state"
};
const _hoisted_53 = {
  key: 0,
  class: "market-terminal",
  "aria-label": "选中型号详情"
};
const _hoisted_54 = { class: "market-quote-detail" };
const _hoisted_55 = { class: "detail-summary" };
const _hoisted_56 = { class: "detail-price" };
const _hoisted_57 = { class: "detail-changes" };
const _hoisted_58 = { class: "detail-meta" };
const _hoisted_59 = { key: 0 };
const _hoisted_60 = { class: "detail-actions" };
const _hoisted_61 = ["aria-pressed"];
const _hoisted_62 = { class: "market-status-notes" };
const _hoisted_63 = {
  key: 0,
  class: "market-notice warning",
  role: "status"
};
const _hoisted_64 = {
  key: 1,
  class: "market-notice warning",
  role: "alert"
};
const _hoisted_65 = {
  key: 2,
  class: "market-notice warning",
  role: "status"
};
const _hoisted_66 = {
  key: 3,
  class: "market-notice warning",
  role: "status"
};
const _hoisted_67 = {
  key: 4,
  class: "market-notice warning",
  role: "status"
};
const _hoisted_68 = {
  key: 5,
  class: "market-notice market-info",
  role: "status"
};
const _hoisted_69 = {
  key: 6,
  class: "market-notice market-info",
  role: "status"
};
const _hoisted_70 = { class: "market-footer" };
const _hoisted_71 = { class: "market-source-info" };
const _hoisted_72 = { key: 0 };
const _hoisted_73 = {
  key: 0,
  class: "market-stale-label"
};
const _hoisted_74 = {
  key: 1,
  class: "market-cache-label"
};
const _hoisted_75 = { key: 2 };
const _hoisted_76 = {
  key: 0,
  class: "market-history-note"
};
const PAGE_SIZE = 40;
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "HardwareMarket",
  setup(__props) {
    const tabs = [
      { id: "cpu", label: "CPU", subtitle: "处理器" },
      { id: "gpu", label: "显卡", subtitle: "GPU" },
      { id: "memory", label: "内存", subtitle: "Memory" },
      { id: "disk", label: "硬盘", subtitle: "SSD / HDD" }
    ];
    const category = ref("cpu");
    const channel = ref("all");
    const favoritesOnly = ref(false);
    const favorites = ref([]);
    try {
      const v = JSON.parse(localStorage.getItem("supreme-market-favorites-v1") || "[]");
      if (Array.isArray(v)) favorites.value = v.filter((x) => typeof x === "string" && x.length < 300).slice(0, 1e3);
    } catch {
    }
    function favoriteKey(id) {
      return id;
    }
    function isFavorite(id) {
      return favorites.value.includes(favoriteKey(id));
    }
    function toggleFavorite(id) {
      const key = favoriteKey(id);
      favorites.value = isFavorite(id) ? favorites.value.filter((x) => x !== key) : [...favorites.value, key].slice(-1e3);
      try {
        localStorage.setItem("supreme-market-favorites-v1", JSON.stringify(favorites.value));
      } catch {
        externalError.value = "自选暂时只能保留在本次会话，无法写入本机存储。";
      }
    }
    const diskKind = ref("ssd");
    const kind = computed(() => category.value === "disk" ? diskKind.value : category.value);
    const labels = { cpu: "CPU", gpu: "显卡", memory: "内存", ssd: "固态硬盘", hdd: "机械硬盘" };
    const kindLabel = computed(() => labels[kind.value]);
    const fallbackSourceUrl = computed(() => channel.value === "merchant" && kind.value === "gpu" ? "https://jinyingpc.com/index/gcard" : marketSource(channel.value === "all" ? "merchant" : channel.value).url);
    const currency = computed(() => selectedQuote.value?.currency ?? "CNY");
    const formatters = { CNY: new Intl.NumberFormat("zh-CN", { style: "currency", currency: "CNY", maximumFractionDigits: 2, minimumFractionDigits: 0 }), USD: new Intl.NumberFormat("zh-CN", { style: "currency", currency: "USD", maximumFractionDigits: 2, minimumFractionDigits: 0 }) };
    const dateFormatter = new Intl.DateTimeFormat("zh-CN");
    const dateTimeFormatter = new Intl.DateTimeFormat("zh-CN", { dateStyle: "short", timeStyle: "medium", hour12: false });
    const monthly = computed(() => selectedQuote.value?.monthly ?? false);
    const visibleLimit = ref(PAGE_SIZE);
    const states = shallowReactive({});
    const stateKey = computed(() => `${channel.value}:${kind.value}`);
    const emptyState = { loading: false, error: "", stale: false, cached: false };
    const sourceEntries = computed(() => hardwareMarketSources.map((source) => ({ channel: source.id, ...states[`${source.id}:${kind.value}`] })));
    const availability = computed(() => summarizeHardwareMarketAvailability(sourceEntries.value));
    const activeSourceCount = computed(() => sourceEntries.value.filter((entry) => entry.report?.items.length).length);
    const current = computed(() => {
      if (channel.value !== "all") return states[stateKey.value] || emptyState;
      const { loading, error, hasReports } = availability.value;
      return { loading, stale: false, cached: false, error, report: hasReports ? {
        kind: kind.value,
        page: 1,
        sourceName: "综合行情",
        sourceId: "combined",
        sourceUrl: "",
        fetchedAt: "",
        sourceUpdatedAt: null,
        items: [],
        hasNextPage: false
      } : void 0 };
    });
    const query = ref("");
    const emptyFacets = () => ({ brand: "", series: "", model: "", pack: "", chip: "", capacity: "", generation: "", form: "", interface: "" });
    const facetSelection = ref(emptyFacets());
    const hasFilters = computed(() => Boolean(query.value.trim()) || Object.values(facetSelection.value).some(Boolean));
    function resetFilters() {
      facetSelection.value = emptyFacets();
      query.value = "";
      favoritesOnly.value = false;
    }
    const facetGroups = computed(() => hardwareFacetGroups(quotes.value, kind.value, facetSelection.value));
    const sort = ref("source");
    const externalError = ref("");
    const selectedQuoteId = ref("");
    const referenceTime = ref(Date.now());
    const reportIsHistorical = computed(() => getSourceAgeStatus(current.value.report?.sourceUpdatedAt, referenceTime.value) === "historical");
    const quotes = computed(() => sourceEntries.value.flatMap((entry) => entry.quotes ?? []));
    const filtered = computed(() => selectOverviewQuotes(filterHardwareFacets(quotes.value, kind.value, facetSelection.value), query.value, sort.value).filter((q) => !favoritesOnly.value || isFavorite(q.id)));
    const selectedQuote = computed(() => filtered.value.find((q) => q.id === selectedQuoteId.value) ?? filtered.value.find((q) => (q.referenceDaily?.length ?? 0) > 1) ?? filtered.value[0]);
    const marketIndices = computed(() => tabs.map((tab) => {
      const kinds = tab.id === "disk" ? ["ssd", "hdd"] : [tab.id];
      const entries = kinds.flatMap((k) => hardwareMarketSources.map((source) => ({ channel: source.id, ...states[`${source.id}:${k}`] })));
      const summary = mergeMarketSummaries(entries.flatMap((entry) => entry.summary ? [entry.summary] : []));
      return { ...tab, ...summary, total: entries.reduce((sum, entry) => sum + (entry.report?.items.length ?? 0), 0), pending: entries.some((entry) => entry.report?.referenceHistoryPending && !entry.error), failed: entries.some((entry) => entry.error && !entry.report), loading: entries.some((entry) => entry.loading) };
    }));
    function storeResult(key, source, result) {
      const checkedAt = Date.now();
      const quotes2 = combineHardwareQuotes([{ channel: source, report: result.report, stale: result.stale || Boolean(result.error) }], checkedAt);
      states[key] = { ...result, checkedAt, quotes: quotes2, summary: summarizeMarket(quotes2) };
    }
    async function loadSource(requestChannel, requestKind, refresh = false, ttl = 6e4) {
      const requestPage = 1, key = `${requestChannel}:${requestKind}`;
      const previous = states[key];
      if (!shouldLoadMarket(previous, Date.now(), refresh, ttl)) return;
      states[key] = { ...emptyState, ...previous, loading: true, error: "" };
      try {
        if (!window.hardwareMarketApi?.list) throw new Error("当前环境未连接行情服务，请在QuChen调试桌面客户端中打开。");
        const result = await window.hardwareMarketApi.list({ kind: requestKind, page: requestPage, ...requestChannel !== "merchant" ? { channel: requestChannel } : {}, ...refresh ? { refresh: true } : {} });
        if (result.report && (result.report.sourceId !== marketSource(requestChannel).sourceId || result.report.quoteMode !== marketSource(requestChannel).mode)) throw Error("报价渠道不匹配，已停止显示。");
        if (result.report && (result.report.kind !== requestKind || result.report.page !== requestPage)) throw new Error("报价分类或页码不匹配，请稍后刷新。");
        const report = result.report || previous?.report;
        const error = result.error || (!result.report ? "报价来源暂时没有返回数据，请稍后重试。" : !result.success ? "报价刷新失败。" : "");
        storeResult(key, requestChannel, { loading: false, report, error, stale: Boolean(report && (result.stale || !result.success || !result.report)), cached: Boolean(result.cached) });
      } catch (error) {
        storeResult(key, requestChannel, { loading: false, report: previous?.report, error: error instanceof Error ? error.message : "无法连接报价来源，请检查网络后重试。", stale: Boolean(previous?.report), cached: Boolean(previous?.report) });
      }
    }
    async function loadPage(refresh = false) {
      const requestedKind = kind.value;
      const channels = channel.value === "all" ? hardwareMarketSources.map((source) => source.id) : [channel.value];
      await Promise.all(channels.map((source) => loadSource(source, requestedKind, refresh)));
    }
    watch([query, sort, favoritesOnly, () => JSON.stringify(facetSelection.value)], () => {
      visibleLimit.value = PAGE_SIZE;
    });
    watch(stateKey, () => {
      facetSelection.value = emptyFacets();
      visibleLimit.value = PAGE_SIZE;
      query.value = "";
      externalError.value = "";
      selectedQuoteId.value = "";
      void loadPage();
    }, { immediate: true });
    async function loadOverview(ttl = 6e4) {
      const requests = hardwareMarketSources.flatMap((source) => ["cpu", "gpu", "memory", "ssd", "hdd"].map((k) => ({ source: source.id, kind: k })));
      await Promise.all(Array.from({ length: 4 }, async () => {
        while (requests.length) {
          const request = requests.shift();
          await loadSource(request.source, request.kind, false, ttl);
        }
      }));
    }
    function onVisible() {
      if (document.visibilityState === "visible") {
        referenceTime.value = Date.now();
        void loadOverview();
      }
    }
    let historyTimer;
    let refreshTimer;
    onMounted(() => {
      document.addEventListener("visibilitychange", onVisible);
      void loadOverview();
      historyTimer = setInterval(() => {
        if (document.visibilityState !== "visible") return;
        for (const k of ["cpu", "gpu", "memory", "ssd", "hdd"]) if (states[`fangdede:${k}`]?.report?.referenceHistoryPending) void loadSource("fangdede", k, false, 1e4);
      }, 1e4);
      refreshTimer = setInterval(() => {
        if (document.visibilityState === "visible") {
          referenceTime.value = Date.now();
          void loadOverview(0);
        }
      }, 6e4);
    });
    onUnmounted(() => {
      document.removeEventListener("visibilitychange", onVisible);
      if (refreshTimer !== void 0) clearInterval(refreshTimer);
      if (historyTimer !== void 0) clearInterval(historyTimer);
    });
    function formatPrice(value, unit = currency.value) {
      return formatters[unit].format(value);
    }
    function formatFetchedAt(value) {
      if (!value) return "来源未提供";
      const date = new Date(value);
      return Number.isNaN(date.getTime()) ? "来源未提供" : dateTimeFormatter.format(date);
    }
    function quoteEffectiveDate(value) {
      return resolveHardwareSourceDate(value, current.value.report?.sourceUpdatedAt);
    }
    function quoteIsHistorical(value) {
      return getSourceAgeStatus(quoteEffectiveDate(value), referenceTime.value) === "historical";
    }
    function shortSourceDate(value) {
      if (!value) return "日期未知";
      const date = new Date(value);
      return Number.isNaN(date.getTime()) ? "日期未知" : dateFormatter.format(date);
    }
    function changeTone(change) {
      return !change || change.amount === 0 ? "flat" : change.amount > 0 ? "up" : "down";
    }
    function signedMoney(amount, unit = currency.value) {
      return amount === 0 ? "持平" : `${amount > 0 ? "+" : "−"}${formatPrice(Math.abs(amount), unit)}`;
    }
    function signedPercent(percent) {
      return `${percent > 0 ? "+" : percent < 0 ? "−" : ""}${Math.abs(percent).toFixed(2)}%`;
    }
    function changeBaseline(change, unit = currency.value) {
      return change ? `对比 ${change.baselineDate} 的报价 ${formatPrice(change.baselinePrice, unit)}` : "缺少有效对比记录，无法计算涨跌";
    }
    async function openSource(url) {
      externalError.value = "";
      try {
        if (!window.sysApi?.openExternal) throw new Error("当前环境无法打开来源页面，请在QuChen调试桌面客户端中查看。");
        const result = await window.sysApi.openExternal(url);
        if (result && typeof result === "object" && "success" in result && !result.success) throw new Error("来源页面未能打开，请稍后再试。");
      } catch (error) {
        externalError.value = error instanceof Error ? error.message : "来源页面未能打开，请稍后再试。";
      }
    }
    async function moveTab(event, id) {
      if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
      event.preventDefault();
      const index = tabs.findIndex((tab) => tab.id === id);
      const next = event.key === "Home" ? 0 : event.key === "End" ? tabs.length - 1 : (index + (event.key === "ArrowRight" ? 1 : -1) + tabs.length) % tabs.length;
      category.value = tabs[next].id;
      await nextTick();
      document.getElementById(`market-tab-${category.value}`)?.focus();
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createBaseVNode("header", _hoisted_2, [
          _cache[17] || (_cache[17] = createStaticVNode('<div class="market-icon" aria-hidden="true" data-v-fdc2a065><svg width="27" height="27" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" data-v-fdc2a065><rect x="5" y="5" width="14" height="14" rx="3" data-v-fdc2a065></rect><path d="M9 1v4m6-4v4M9 19v4m6-4v4M1 9h4m-4 6h4m14-6h4m-4 6h4M8 15l3-4 3 2 3-5" data-v-fdc2a065></path></svg></div><div class="market-heading" data-v-fdc2a065><h2 data-v-fdc2a065>电脑硬件行情</h2><p data-v-fdc2a065>价格看盘 · 自选追踪 · 日 / 周 / 月 K 线</p></div>', 2)),
          createBaseVNode("span", _hoisted_3, toDisplayString(channel.value === "all" ? "综合报价" : monthly.value ? "月度参考" : reportIsHistorical.value ? "历史报价" : currency.value === "USD" ? "美元参考价" : "报价参考"), 1)
        ]),
        createBaseVNode("section", _hoisted_4, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(marketIndices.value, (index) => {
            return openBlock(), createElementBlock("button", {
              id: `market-tab-${index.id}`,
              key: index.id,
              type: "button",
              role: "tab",
              "aria-selected": category.value === index.id,
              "aria-controls": "market-panel",
              tabindex: category.value === index.id ? 0 : -1,
              onKeydown: ($event) => moveTab($event, index.id),
              class: normalizeClass(["market-index", { active: category.value === index.id }]),
              onClick: ($event) => category.value = index.id
            }, [
              createBaseVNode("span", _hoisted_6, [
                createTextVNode(toDisplayString(index.label), 1),
                _cache[18] || (_cache[18] = createBaseVNode("small", null, "报价大盘", -1))
              ]),
              createBaseVNode("strong", {
                class: normalizeClass(index.day.percent === null ? "flat" : index.day.percent > 0 ? "up" : index.day.percent < 0 ? "down" : "flat")
              }, toDisplayString(index.day.percent === null ? "—" : signedPercent(index.day.percent)), 3),
              createBaseVNode("span", _hoisted_7, "日涨跌 · " + toDisplayString(index.day.count ? index.day.count + " 条可比报价" : index.pending ? "历史补充中" : index.loading ? "读取中" : index.total ? "缺少历史对比" : index.failed ? "连接暂不可用" : "暂无报价"), 1),
              createBaseVNode("span", _hoisted_8, [
                _cache[19] || (_cache[19] = createTextVNode("周涨跌 ", -1)),
                createBaseVNode("b", {
                  class: normalizeClass(index.week.percent === null ? "flat" : index.week.percent > 0 ? "up" : index.week.percent < 0 ? "down" : "flat")
                }, toDisplayString(index.week.percent === null ? "—" : signedPercent(index.week.percent)), 3)
              ]),
              createBaseVNode("small", null, "已收录 " + toDisplayString(index.total) + " 条 · 可比 " + toDisplayString(index.day.count) + " 条", 1)
            ], 42, _hoisted_5);
          }), 128))
        ]),
        createBaseVNode("section", {
          id: "market-panel",
          class: "market-panel",
          role: "tabpanel",
          "aria-labelledby": `market-tab-${category.value}`,
          "aria-busy": current.value.loading
        }, [
          category.value === "disk" ? (openBlock(), createElementBlock("div", _hoisted_10, [
            createBaseVNode("button", {
              type: "button",
              class: normalizeClass({ active: diskKind.value === "ssd" }),
              "aria-pressed": diskKind.value === "ssd",
              onClick: _cache[0] || (_cache[0] = ($event) => diskKind.value = "ssd")
            }, "固态硬盘 SSD", 10, _hoisted_11),
            createBaseVNode("button", {
              type: "button",
              class: normalizeClass({ active: diskKind.value === "hdd" }),
              "aria-pressed": diskKind.value === "hdd",
              onClick: _cache[1] || (_cache[1] = ($event) => diskKind.value = "hdd")
            }, "机械硬盘 HDD", 10, _hoisted_12)
          ])) : createCommentVNode("", true),
          createBaseVNode("section", _hoisted_13, [
            createBaseVNode("div", _hoisted_14, [
              createBaseVNode("strong", null, "挑选" + toDisplayString(kindLabel.value), 1),
              createBaseVNode("span", null, toDisplayString(filtered.value.length) + " / " + toDisplayString(quotes.value.length) + " 条报价", 1),
              hasFilters.value ? (openBlock(), createElementBlock("button", {
                key: 0,
                type: "button",
                onClick: resetFilters
              }, "清除筛选")) : createCommentVNode("", true)
            ]),
            createBaseVNode("div", _hoisted_15, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(facetGroups.value, (group2) => {
                return openBlock(), createElementBlock("label", {
                  key: group2.key
                }, [
                  createBaseVNode("span", null, toDisplayString(group2.label), 1),
                  withDirectives(createBaseVNode("select", {
                    "onUpdate:modelValue": ($event) => facetSelection.value[group2.key] = $event,
                    "aria-label": "筛选" + group2.label
                  }, [
                    createBaseVNode("option", _hoisted_17, "全部" + toDisplayString(group2.label), 1),
                    (openBlock(true), createElementBlock(Fragment, null, renderList(group2.options, (option) => {
                      return openBlock(), createElementBlock("option", {
                        key: option.value,
                        value: option.value,
                        disabled: !option.count
                      }, toDisplayString(option.value) + "（" + toDisplayString(option.count) + "）", 9, _hoisted_18);
                    }), 128))
                  ], 8, _hoisted_16), [
                    [vModelSelect, facetSelection.value[group2.key]]
                  ])
                ]);
              }), 128))
            ]),
            createBaseVNode("div", _hoisted_19, [
              createBaseVNode("label", _hoisted_20, [
                _cache[20] || (_cache[20] = createBaseVNode("svg", {
                  "aria-hidden": "true",
                  width: "17",
                  height: "17",
                  viewBox: "0 0 24 24",
                  fill: "none",
                  stroke: "currentColor",
                  "stroke-width": "1.8"
                }, [
                  createBaseVNode("circle", {
                    cx: "10.5",
                    cy: "10.5",
                    r: "6.5"
                  }),
                  createBaseVNode("path", { d: "m16 16 4.5 4.5" })
                ], -1)),
                withDirectives(createBaseVNode("input", {
                  "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => query.value = $event),
                  type: "search",
                  "aria-label": "搜索本类型号",
                  placeholder: "搜索型号、品牌、规格，自动查全部来源…"
                }, null, 512), [
                  [vModelText, query.value]
                ])
              ]),
              createBaseVNode("label", _hoisted_21, [
                _cache[22] || (_cache[22] = createBaseVNode("span", { class: "sr-only" }, "报价排序", -1)),
                withDirectives(createBaseVNode("select", {
                  "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => sort.value = $event),
                  "aria-label": "报价排序"
                }, [..._cache[21] || (_cache[21] = [
                  createStaticVNode('<option value="source" data-v-fdc2a065>推荐顺序</option><option value="asc" data-v-fdc2a065>价格从低到高</option><option value="desc" data-v-fdc2a065>价格从高到低</option><option value="day-desc" data-v-fdc2a065>日涨幅从高到低</option><option value="day-asc" data-v-fdc2a065>日涨幅从低到高</option><option value="week-desc" data-v-fdc2a065>周涨幅从高到低</option><option value="week-asc" data-v-fdc2a065>周涨幅从低到高</option>', 7)
                ])], 512), [
                  [vModelSelect, sort.value]
                ])
              ]),
              createBaseVNode("button", {
                type: "button",
                class: "market-button market-refresh",
                disabled: current.value.loading,
                onClick: _cache[4] || (_cache[4] = ($event) => loadPage(true))
              }, [
                (openBlock(), createElementBlock("svg", {
                  "aria-hidden": "true",
                  class: normalizeClass({ spinning: current.value.loading }),
                  width: "15",
                  height: "15",
                  viewBox: "0 0 24 24",
                  fill: "none",
                  stroke: "currentColor",
                  "stroke-width": "1.8"
                }, [..._cache[23] || (_cache[23] = [
                  createBaseVNode("path", { d: "M20 8a8 8 0 1 0 0 8M20 3v5h-5" }, null, -1)
                ])], 2)),
                createTextVNode(toDisplayString(current.value.loading ? "读取中" : "刷新报价"), 1)
              ], 8, _hoisted_22)
            ]),
            _cache[24] || (_cache[24] = createBaseVNode("small", null, "分类按名称与规格识别；内存按套装总容量。", -1))
          ]),
          createBaseVNode("div", {
            class: normalizeClass(["market-workspace", { "without-detail": !selectedQuote.value }])
          }, [
            createBaseVNode("section", _hoisted_23, [
              createBaseVNode("div", _hoisted_24, [
                createBaseVNode("button", {
                  class: normalizeClass({ active: !favoritesOnly.value && sort.value === "source" }),
                  onClick: _cache[5] || (_cache[5] = ($event) => {
                    favoritesOnly.value = false;
                    sort.value = "source";
                  })
                }, "全部行情", 2),
                createBaseVNode("button", {
                  class: normalizeClass({ active: favoritesOnly.value }),
                  onClick: _cache[6] || (_cache[6] = ($event) => favoritesOnly.value = !favoritesOnly.value)
                }, "★ 我的自选", 2),
                createBaseVNode("button", {
                  class: normalizeClass({ active: sort.value === "day-desc" && !favoritesOnly.value }),
                  onClick: _cache[7] || (_cache[7] = ($event) => {
                    favoritesOnly.value = false;
                    sort.value = "day-desc";
                  })
                }, "涨价榜", 2),
                createBaseVNode("button", {
                  class: normalizeClass({ active: sort.value === "day-asc" && !favoritesOnly.value }),
                  onClick: _cache[8] || (_cache[8] = ($event) => {
                    favoritesOnly.value = false;
                    sort.value = "day-asc";
                  })
                }, "降价榜", 2)
              ]),
              createBaseVNode("div", _hoisted_25, [
                _cache[25] || (_cache[25] = createBaseVNode("span", null, "型号报价 · 点击列表查看右侧走势", -1)),
                current.value.report ? (openBlock(), createElementBlock("span", _hoisted_26, toDisplayString(filtered.value.length) + " / " + toDisplayString(quotes.value.length) + " 条报价", 1)) : createCommentVNode("", true)
              ]),
              createBaseVNode("div", _hoisted_27, [
                !current.value.report && current.value.loading ? (openBlock(), createElementBlock("div", _hoisted_28, [
                  _cache[26] || (_cache[26] = createBaseVNode("span", {
                    class: "market-loader",
                    "aria-hidden": "true"
                  }, null, -1)),
                  createBaseVNode("h3", null, "正在读取" + toDisplayString(kindLabel.value) + "报价", 1),
                  _cache[27] || (_cache[27] = createBaseVNode("p", null, "正在连接报价来源，请稍候。", -1))
                ])) : !current.value.report && current.value.error ? (openBlock(), createElementBlock("div", _hoisted_29, [
                  _cache[28] || (_cache[28] = createBaseVNode("span", {
                    class: "market-state-mark",
                    "aria-hidden": "true"
                  }, "!", -1)),
                  _cache[29] || (_cache[29] = createBaseVNode("h3", null, "暂时无法读取报价", -1)),
                  createBaseVNode("p", null, toDisplayString(current.value.error), 1),
                  createBaseVNode("div", _hoisted_30, [
                    createBaseVNode("button", {
                      type: "button",
                      class: "market-button",
                      onClick: _cache[9] || (_cache[9] = ($event) => loadPage(true))
                    }, "重新尝试"),
                    createBaseVNode("button", {
                      type: "button",
                      class: "market-button",
                      onClick: _cache[10] || (_cache[10] = ($event) => openSource(fallbackSourceUrl.value))
                    }, "打开来源原页 ↗")
                  ])
                ])) : current.value.report ? (openBlock(), createElementBlock(Fragment, { key: 2 }, [
                  filtered.value.length ? (openBlock(), createElementBlock("div", _hoisted_31, [
                    _cache[32] || (_cache[32] = createBaseVNode("div", {
                      class: "market-table-head",
                      "aria-hidden": "true"
                    }, [
                      createBaseVNode("span", null, "型号 / 产品名称"),
                      createBaseVNode("span", null, "参考报价 / 币种"),
                      createBaseVNode("span", null, "日涨跌"),
                      createBaseVNode("span", null, "周涨跌"),
                      createBaseVNode("span", null, "查看详情")
                    ], -1)),
                    createBaseVNode("ul", _hoisted_32, [
                      (openBlock(true), createElementBlock(Fragment, null, renderList(filtered.value.slice(0, visibleLimit.value), (quote) => {
                        return openBlock(), createElementBlock("li", {
                          key: quote.id,
                          class: normalizeClass(["market-row", { selected: selectedQuote.value?.id === quote.id }]),
                          onClick: ($event) => selectedQuoteId.value = quote.id
                        }, [
                          createBaseVNode("div", _hoisted_34, [
                            createBaseVNode("span", _hoisted_35, [
                              createTextVNode(toDisplayString(kindLabel.value) + " · " + toDisplayString(quote.sourceName), 1),
                              quote.monthly ? (openBlock(), createElementBlock("span", _hoisted_36, " · 月度参考")) : createCommentVNode("", true),
                              quote.stale ? (openBlock(), createElementBlock("span", _hoisted_37, " · 上次缓存")) : createCommentVNode("", true),
                              quote.availability ? (openBlock(), createElementBlock("span", _hoisted_38, " · " + toDisplayString(quote.availability), 1)) : createCommentVNode("", true)
                            ]),
                            createBaseVNode("h3", null, toDisplayString(quote.name), 1),
                            quote.spec ? (openBlock(), createElementBlock("p", _hoisted_39, toDisplayString(quote.spec), 1)) : createCommentVNode("", true)
                          ]),
                          createBaseVNode("div", {
                            class: normalizeClass(["market-price", { unavailable: quote.price === null }])
                          }, [
                            createBaseVNode("small", _hoisted_40, toDisplayString(quoteIsHistorical(quote.sourceUpdatedAt) ? "历史报价" : "商家报价"), 1),
                            createBaseVNode("span", null, toDisplayString(quote.price === null ? quote.priceText || "暂无报价" : formatPrice(quote.price, quote.currency)), 1),
                            createBaseVNode("small", null, toDisplayString(quote.priceBasis || "商家参考价"), 1),
                            quoteIsHistorical(quote.sourceUpdatedAt) ? (openBlock(), createElementBlock("small", _hoisted_41, "历史 · " + toDisplayString(shortSourceDate(quoteEffectiveDate(quote.sourceUpdatedAt))), 1)) : quote.sourceUpdatedAt ? (openBlock(), createElementBlock("small", _hoisted_42, toDisplayString(quote.timestampBasis === "observed" ? "观测" : "更新") + " · " + toDisplayString(shortSourceDate(quote.sourceUpdatedAt)), 1)) : !quoteEffectiveDate(quote.sourceUpdatedAt) ? (openBlock(), createElementBlock("small", _hoisted_43, "来源更新时间未知")) : createCommentVNode("", true)
                          ], 2),
                          createBaseVNode("div", {
                            class: normalizeClass(["market-change", changeTone(quote.dayChange)]),
                            title: changeBaseline(quote.dayChange, quote.currency)
                          }, [
                            _cache[30] || (_cache[30] = createBaseVNode("small", { class: "market-mobile-label" }, "日涨跌", -1)),
                            quote.dayChange ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                              createBaseVNode("span", null, toDisplayString(signedMoney(quote.dayChange.amount, quote.currency)), 1),
                              createBaseVNode("small", null, toDisplayString(signedPercent(quote.dayChange.percent)), 1)
                            ], 64)) : (openBlock(), createElementBlock("small", _hoisted_45, "暂无历史数据"))
                          ], 10, _hoisted_44),
                          createBaseVNode("div", {
                            class: normalizeClass(["market-change", changeTone(quote.weekChange)]),
                            title: changeBaseline(quote.weekChange, quote.currency)
                          }, [
                            _cache[31] || (_cache[31] = createBaseVNode("small", { class: "market-mobile-label" }, "周涨跌", -1)),
                            quote.weekChange ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                              createBaseVNode("span", null, toDisplayString(signedMoney(quote.weekChange.amount, quote.currency)), 1),
                              createBaseVNode("small", null, toDisplayString(signedPercent(quote.weekChange.percent)), 1)
                            ], 64)) : (openBlock(), createElementBlock("small", _hoisted_47, "暂无历史数据"))
                          ], 10, _hoisted_46),
                          createBaseVNode("div", _hoisted_48, [
                            createBaseVNode("button", {
                              type: "button",
                              class: "market-trend-button",
                              "aria-label": `查看 ${quote.name} 的走势`,
                              "aria-pressed": selectedQuote.value?.id === quote.id,
                              onClick: withModifiers(($event) => selectedQuoteId.value = quote.id, ["stop"])
                            }, toDisplayString(selectedQuote.value?.id === quote.id ? "看盘中" : "查看走势"), 9, _hoisted_49),
                            createBaseVNode("button", {
                              class: "market-source-link",
                              "aria-label": `${isFavorite(quote.id) ? "移除" : "添加"} ${quote.name} 自选`,
                              "aria-pressed": isFavorite(quote.id),
                              onClick: withModifiers(($event) => toggleFavorite(quote.id), ["stop"])
                            }, toDisplayString(isFavorite(quote.id) ? "★ 自选" : "☆ 自选"), 9, _hoisted_50),
                            createBaseVNode("button", {
                              type: "button",
                              class: "market-source-link",
                              "aria-label": `查看 ${quote.name} 的来源页面`,
                              onClick: withModifiers(($event) => openSource(quote.url), ["stop"])
                            }, "来源 ↗", 8, _hoisted_51)
                          ])
                        ], 10, _hoisted_33);
                      }), 128))
                    ]),
                    filtered.value.length > visibleLimit.value ? (openBlock(), createElementBlock("button", {
                      key: 0,
                      class: "market-button market-more",
                      onClick: _cache[11] || (_cache[11] = ($event) => visibleLimit.value += PAGE_SIZE)
                    }, "继续显示 " + toDisplayString(Math.min(PAGE_SIZE, filtered.value.length - visibleLimit.value)) + " 个型号（剩余 " + toDisplayString(filtered.value.length - visibleLimit.value) + " 个）", 1)) : createCommentVNode("", true)
                  ])) : (openBlock(), createElementBlock("div", _hoisted_52, [
                    _cache[33] || (_cache[33] = createBaseVNode("span", {
                      class: "market-state-mark",
                      "aria-hidden": "true"
                    }, "⌕", -1)),
                    createBaseVNode("h3", null, toDisplayString(favoritesOnly.value ? "当前分类暂无匹配的自选" : hasFilters.value ? "本类没有匹配的型号" : "当前分类暂无报价"), 1),
                    createBaseVNode("p", null, toDisplayString(favoritesOnly.value ? "点击型号旁的 ☆ 自选即可收藏，收藏可在综合行情中统一查看。" : hasFilters.value ? "试试减少筛选条件，或清除筛选查看本类全部型号。" : current.value.report.message || "来源暂未提供可用报价。"), 1),
                    favoritesOnly.value ? (openBlock(), createElementBlock("button", {
                      key: 0,
                      class: "market-button",
                      onClick: _cache[12] || (_cache[12] = ($event) => favoritesOnly.value = false)
                    }, "查看全部行情")) : hasFilters.value ? (openBlock(), createElementBlock("button", {
                      key: 1,
                      class: "market-button",
                      onClick: resetFilters
                    }, "清空搜索")) : createCommentVNode("", true)
                  ]))
                ], 64)) : createCommentVNode("", true)
              ])
            ]),
            selectedQuote.value ? (openBlock(), createElementBlock("aside", _hoisted_53, [
              (openBlock(), createBlock(HardwareMarketChart, {
                compact: "",
                key: `${stateKey.value}:${selectedQuote.value.id}`,
                quote: selectedQuote.value,
                "history-mode": selectedQuote.value.historyMode,
                currency: currency.value,
                "reference-only": monthly.value
              }, null, 8, ["quote", "history-mode", "currency", "reference-only"])),
              createBaseVNode("div", _hoisted_54, [
                createBaseVNode("div", _hoisted_55, [
                  createBaseVNode("div", null, [
                    createBaseVNode("small", null, "当前参考价 · " + toDisplayString(selectedQuote.value.currency), 1),
                    createBaseVNode("strong", _hoisted_56, toDisplayString(selectedQuote.value.price === null ? "暂无报价" : formatPrice(selectedQuote.value.price)), 1)
                  ]),
                  createBaseVNode("div", _hoisted_57, [
                    createBaseVNode("div", {
                      class: normalizeClass(changeTone(selectedQuote.value.dayChange))
                    }, [
                      _cache[34] || (_cache[34] = createBaseVNode("small", null, "日涨跌", -1)),
                      createBaseVNode("b", null, toDisplayString(selectedQuote.value.dayChange ? signedPercent(selectedQuote.value.dayChange.percent) : "—"), 1)
                    ], 2),
                    createBaseVNode("div", {
                      class: normalizeClass(changeTone(selectedQuote.value.weekChange))
                    }, [
                      _cache[35] || (_cache[35] = createBaseVNode("small", null, "周涨跌", -1)),
                      createBaseVNode("b", null, toDisplayString(selectedQuote.value.weekChange ? signedPercent(selectedQuote.value.weekChange.percent) : "—"), 1)
                    ], 2)
                  ])
                ]),
                createBaseVNode("p", _hoisted_58, [
                  createTextVNode(toDisplayString(selectedQuote.value.sourceName) + " · " + toDisplayString(selectedQuote.value.priceBasis), 1),
                  _cache[36] || (_cache[36] = createBaseVNode("br", null, null, -1)),
                  createTextVNode(toDisplayString(formatFetchedAt(selectedQuote.value.sourceUpdatedAt)), 1),
                  selectedQuote.value.stale ? (openBlock(), createElementBlock("span", _hoisted_59, " · 上次缓存")) : createCommentVNode("", true)
                ]),
                createBaseVNode("div", _hoisted_60, [
                  createBaseVNode("button", {
                    class: "market-button",
                    "aria-pressed": isFavorite(selectedQuote.value.id),
                    onClick: _cache[13] || (_cache[13] = ($event) => toggleFavorite(selectedQuote.value.id))
                  }, toDisplayString(isFavorite(selectedQuote.value.id) ? "★ 已加入自选" : "☆ 加入自选"), 9, _hoisted_61),
                  createBaseVNode("button", {
                    class: "market-source-link",
                    onClick: _cache[14] || (_cache[14] = ($event) => openSource(selectedQuote.value.url))
                  }, "报价来源 ↗")
                ])
              ])
            ])) : createCommentVNode("", true)
          ], 2),
          createBaseVNode("div", _hoisted_62, [
            channel.value === "all" && availability.value.notice ? (openBlock(), createElementBlock("div", _hoisted_63, toDisplayString(availability.value.notice), 1)) : createCommentVNode("", true),
            externalError.value ? (openBlock(), createElementBlock("div", _hoisted_64, [
              createTextVNode(toDisplayString(externalError.value), 1),
              createBaseVNode("button", {
                type: "button",
                "aria-label": "关闭提示",
                onClick: _cache[15] || (_cache[15] = ($event) => externalError.value = "")
              }, "×")
            ])) : createCommentVNode("", true),
            current.value.error && current.value.report ? (openBlock(), createElementBlock("div", _hoisted_65, [
              _cache[37] || (_cache[37] = createBaseVNode("strong", null, "本次未获取到新报价，正在显示上次采集的数据。", -1)),
              createBaseVNode("span", null, toDisplayString(current.value.error), 1)
            ])) : current.value.stale && current.value.report ? (openBlock(), createElementBlock("div", _hoisted_66, "正在显示上次采集的数据，请结合采集时间参考，稍后可重新刷新。")) : createCommentVNode("", true),
            reportIsHistorical.value ? (openBlock(), createElementBlock("div", _hoisted_67, [
              _cache[38] || (_cache[38] = createBaseVNode("strong", null, "来源报价已超过 72 小时未更新，以下为历史参考价。", -1)),
              createBaseVNode("span", null, "报价日期：" + toDisplayString(formatFetchedAt(current.value.report?.sourceUpdatedAt)) + "。刷新只重新读取来源，不会改变商家的报价日期。", 1)
            ])) : createCommentVNode("", true),
            sourceEntries.value.some((entry) => entry.report?.referenceHistoryPending) ? (openBlock(), createElementBlock("div", _hoisted_68, "正在补充来源历史走势图，报价可先查看，完成后自动更新。")) : createCommentVNode("", true),
            selectedQuote.value?.sourceMessage ? (openBlock(), createElementBlock("div", _hoisted_69, toDisplayString(selectedQuote.value?.sourceMessage), 1)) : createCommentVNode("", true)
          ]),
          createBaseVNode("footer", _hoisted_70, [
            createBaseVNode("div", _hoisted_71, [
              channel.value === "all" ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                createBaseVNode("p", null, [
                  createTextVNode("已汇总 " + toDisplayString(activeSourceCount.value) + " 个来源 · " + toDisplayString(quotes.value.length) + " 条报价", 1),
                  current.value.loading ? (openBlock(), createElementBlock("span", _hoisted_72, " · 其他来源读取中")) : createCommentVNode("", true)
                ]),
                _cache[39] || (_cache[39] = createBaseVNode("p", null, "每条报价独立保留来源、币种和更新日期，图表跟随选中的报价。", -1))
              ], 64)) : current.value.report ? (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                createBaseVNode("p", null, [
                  _cache[40] || (_cache[40] = createTextVNode("数据来源：", -1)),
                  createBaseVNode("button", {
                    type: "button",
                    onClick: _cache[16] || (_cache[16] = ($event) => openSource(current.value.report.sourceUrl))
                  }, toDisplayString(current.value.report.sourceName) + " ↗", 1),
                  current.value.stale ? (openBlock(), createElementBlock("span", _hoisted_73, "旧缓存")) : current.value.cached ? (openBlock(), createElementBlock("span", _hoisted_74, "缓存")) : createCommentVNode("", true)
                ]),
                createBaseVNode("p", null, toDisplayString(current.value.report.timestampBasis === "observed" ? "报价观测时间" : "来源标注更新时间") + "：" + toDisplayString(formatFetchedAt(current.value.report.sourceUpdatedAt)), 1),
                createBaseVNode("p", null, [
                  createTextVNode("本次采集时间：" + toDisplayString(formatFetchedAt(current.value.report.fetchedAt)), 1),
                  _cache[41] || (_cache[41] = createBaseVNode("span", null, "（本机时间）", -1))
                ])
              ], 64)) : (openBlock(), createElementBlock("p", _hoisted_75, "报价需要联网读取，首次进入分类时加载。"))
            ]),
            current.value.report ? (openBlock(), createElementBlock("p", _hoisted_76, [
              createTextVNode(toDisplayString(selectedQuote.value?.historyMode === "server" ? "历史数据由服务器采集。" : "历史数据保存在本机，软件关闭后不采集。"), 1),
              _cache[42] || (_cache[42] = createBaseVNode("br", null, null, -1)),
              _cache[43] || (_cache[43] = createTextVNode("页面可见时每分钟读取缓存更新，报价源由后台按周期采集。", -1)),
              _cache[44] || (_cache[44] = createBaseVNode("br", null, null, -1)),
              _cache[45] || (_cache[45] = createTextVNode("旧缓存或缺少对比日期的记录时，不展示日 / 周涨跌。", -1))
            ])) : createCommentVNode("", true)
          ])
        ], 8, _hoisted_9),
        _cache[46] || (_cache[46] = createBaseVNode("p", { class: "market-index-note" }, "人民币报价样本等权平均 · 同来源、同规格对比前一日 / 七日前；排除月度价、美元价与失效缓存。仅代表已覆盖样本，不是全市场成交指数。", -1)),
        _cache[47] || (_cache[47] = createBaseVNode("p", { class: "market-disclaimer" }, "报价可能滞后，实际售价以商家为准。不同规格、散片 / 盒装和销售口径的报价不可直接等同；请核对型号、规格及报价口径。采集时间仅表示本软件读取数据的时间，不等于商家更新了价格。红色表示上涨、绿色表示下跌，涨跌幅以同型号的有效历史记录为基准。", -1))
      ]);
    };
  }
});
const HardwareMarket = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-fdc2a065"]]);
export {
  HardwareMarket as default
};
