function interpolateCurve(x01, points) {
  if (!points || points.length < 2) return x01;
  const pts = points.map((p) => ({ x: p.x / 100, y: p.y / 100 }));
  pts.sort((a, b) => a.x - b.x);
  if (x01 <= pts[0].x) return pts[0].y;
  if (x01 >= pts[pts.length - 1].x) return pts[pts.length - 1].y;
  for (let i = 0; i < pts.length - 1; i++) {
    if (x01 >= pts[i].x && x01 <= pts[i + 1].x) {
      const span = pts[i + 1].x - pts[i].x;
      if (span <= 0) return pts[i + 1].y;
      const t = (x01 - pts[i].x) / span;
      return pts[i].y + t * (pts[i + 1].y - pts[i].y);
    }
  }
  return x01;
}
function computeLUT(params) {
  const rLut = [];
  const gLut = [];
  const bLut = [];
  const contrastFactor = params.contrast / 50;
  const brightnessOffset = (params.brightness - 50) / 100;
  const gammaVal = Math.max(0.1, params.gamma / 100);
  const tempK = params.temp ?? 6500;
  let rMul = params.redGain / 50;
  let gMul = params.greenGain / 50;
  let bMul = params.blueGain / 50;
  if (tempK !== 6500) {
    const delta = (tempK - 6500) / 1e3;
    rMul *= 1 - delta * 0.06;
    bMul *= 1 + delta * 0.06;
    gMul *= 1 - Math.abs(delta) * 0.012;
  }
  const curvePoints = params.curvePoints || [{ x: 0, y: 0 }, { x: 100, y: 100 }];
  for (let i = 0; i < 256; i++) {
    let v = i / 255;
    v = interpolateCurve(v, curvePoints);
    v = (v - 0.5) * contrastFactor + 0.5 + brightnessOffset;
    v = Math.pow(Math.max(0, v), 1 / gammaVal);
    const r = v * rMul, g = v * gMul, b = v * bMul;
    rLut.push(Math.max(0, Math.min(1, r)));
    gLut.push(Math.max(0, Math.min(1, g)));
    bLut.push(Math.max(0, Math.min(1, b)));
  }
  return { r: rLut, g: gLut, b: bLut };
}
export {
  computeLUT as c
};
