function dimension(value) {
  if (typeof value !== "number" && typeof value !== "string") return null;
  if (!/^\d+$/.test(String(value).trim())) return null;
  const parsed = Number(value);
  return Number.isSafeInteger(parsed) && parsed >= 320 && parsed <= 1e4 ? parsed : null;
}
function nearestEven(value) {
  const rounded = Math.round(value);
  if (rounded % 2 === 0) return rounded;
  return Math.abs(value - (rounded - 1)) <= Math.abs(rounded + 1 - value) ? rounded - 1 : rounded + 1;
}
function resolutionAtHeight(width, height, targetHeight, ratio) {
  const w = dimension(width), h = dimension(height), target = dimension(targetHeight);
  if (w === null || h === null || target === null) return null;
  const ratios = { "4:3": 4 / 3, "16:9": 16 / 9, "16:10": 16 / 10 };
  const factor = ratio === "input" ? w / h : ratios[ratio];
  const result = nearestEven(target * factor);
  return dimension(result) === null ? null : { width: result, height: target };
}
const sensitivityGames = [
  { id: "cs2", name: "CS2 / CS:GO", kind: "linear", yaw: 0.022, min: 0.01, max: 10, decimals: 2 },
  { id: "delta-force", name: "三角洲行动", kind: "linear", yaw: 0.011, min: 0.01, max: 10, decimals: 2 },
  { id: "apex", name: "APEX", kind: "linear", yaw: 0.022, min: 0.01, max: 20, decimals: 2 },
  { id: "pubg", name: "PUBG", kind: "log", yaw: 5e-3, min: 1, max: 100, decimals: 0 },
  { id: "valorant", name: "无畏契约", kind: "linear", yaw: 0.07, min: 1e-3, max: 10, decimals: 3 },
  { id: "overwatch", name: "守望先锋", kind: "linear", yaw: 66e-4, min: 0.01, max: 100, decimals: 2 }
];
function positive(value) {
  if (typeof value !== "number" && typeof value !== "string") return null;
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : null;
}
function convertSensitivity(fromId, toId, sensitivity, fromDpi, toDpi) {
  const from = sensitivityGames.find((game) => game.id === fromId);
  const to = sensitivityGames.find((game) => game.id === toId);
  const value = positive(sensitivity), sourceDpi = positive(fromDpi), targetDpi = positive(toDpi);
  if (!from || !to || value === null || sourceDpi === null || targetDpi === null || value < from.min || value > from.max || sourceDpi > 1e5 || targetDpi > 1e5) return null;
  const degrees = from.kind === "linear" ? value * from.yaw : from.yaw * 10 ** (value / 50);
  const targetDegrees = degrees * sourceDpi / targetDpi;
  const raw = to.kind === "linear" ? targetDegrees / to.yaw : 50 * Math.log10(targetDegrees / to.yaw);
  const rounded = Number(raw.toFixed(to.decimals));
  const actualDegrees = to.kind === "linear" ? rounded * to.yaw : to.yaw * 10 ** (rounded / 50);
  const sourceCm = 360 * 2.54 / (sourceDpi * degrees);
  const targetCm = actualDegrees > 0 ? 360 * 2.54 / (targetDpi * actualDegrees) : null;
  if (![raw, rounded, sourceCm].every(Number.isFinite) || targetCm !== null && !Number.isFinite(targetCm)) return null;
  return {
    sensitivity: rounded,
    sourceCm,
    targetCm,
    driftPercent: Math.abs(targetDpi * actualDegrees / (sourceDpi * degrees) - 1) * 100,
    outOfRange: raw < to.min || raw > to.max || rounded < to.min || rounded > to.max
  };
}
export {
  convertSensitivity as c,
  resolutionAtHeight as r,
  sensitivityGames as s
};
