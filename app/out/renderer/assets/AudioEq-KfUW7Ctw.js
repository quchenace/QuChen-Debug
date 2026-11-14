import { a1 as onMounted, a3 as onUnmounted, a8 as readonly, a9 as ref, t as defineComponent, aD as watch, a5 as openBlock, l as createElementBlock, S as normalizeClass, aG as withDirectives, aB as vShow, i as createBaseVNode, _ as _export_sfc, a7 as reactive, r as createVNode, V as normalizeStyle, ak as toDisplayString, q as createTextVNode, k as createCommentVNode, aF as withCtx, as as unref, F as Fragment, ab as renderList, p as createStaticVNode, aA as vModelText, aH as withKeys, az as vModelSelect, ax as vModelCheckbox, b as Transition, g as computed, ad as resolveComponent, aI as withModifiers } from "./main-DAqTdO6U.js";
import { S as SupportDiagnosticsPanel } from "./embeddedTools-CnGo9MNI.js";
import { G as Geometry, P as Plane, R as Renderer, C as Camera, T as Transform, k as Program, M as Mesh, s as createAnimationScheduler } from "./index-CL4m76NE.js";
import { E as EmbeddedSection } from "./EmbeddedSection-SxpWnTdG.js";
class Box extends Geometry {
  constructor(gl, { width = 1, height = 1, depth = 1, widthSegments = 1, heightSegments = 1, depthSegments = 1, attributes = {} } = {}) {
    const wSegs = widthSegments;
    const hSegs = heightSegments;
    const dSegs = depthSegments;
    const num = (wSegs + 1) * (hSegs + 1) * 2 + (wSegs + 1) * (dSegs + 1) * 2 + (hSegs + 1) * (dSegs + 1) * 2;
    const numIndices = (wSegs * hSegs * 2 + wSegs * dSegs * 2 + hSegs * dSegs * 2) * 6;
    const position = new Float32Array(num * 3);
    const normal = new Float32Array(num * 3);
    const uv = new Float32Array(num * 2);
    const index = num > 65536 ? new Uint32Array(numIndices) : new Uint16Array(numIndices);
    let i = 0;
    let ii = 0;
    Plane.buildPlane(position, normal, uv, index, depth, height, width, dSegs, hSegs, 2, 1, 0, -1, -1, i, ii);
    i += (dSegs + 1) * (hSegs + 1);
    ii += dSegs * hSegs;
    Plane.buildPlane(position, normal, uv, index, depth, height, -width, dSegs, hSegs, 2, 1, 0, 1, -1, i, ii);
    i += (dSegs + 1) * (hSegs + 1);
    ii += dSegs * hSegs;
    Plane.buildPlane(position, normal, uv, index, width, depth, height, dSegs, wSegs, 0, 2, 1, 1, 1, i, ii);
    i += (wSegs + 1) * (dSegs + 1);
    ii += wSegs * dSegs;
    Plane.buildPlane(position, normal, uv, index, width, depth, -height, dSegs, wSegs, 0, 2, 1, 1, -1, i, ii);
    i += (wSegs + 1) * (dSegs + 1);
    ii += wSegs * dSegs;
    Plane.buildPlane(position, normal, uv, index, width, height, -depth, wSegs, hSegs, 0, 1, 2, -1, -1, i, ii);
    i += (wSegs + 1) * (hSegs + 1);
    ii += wSegs * hSegs;
    Plane.buildPlane(position, normal, uv, index, width, height, depth, wSegs, hSegs, 0, 1, 2, 1, -1, i, ii);
    Object.assign(attributes, {
      position: { size: 3, data: position },
      normal: { size: 3, data: normal },
      uv: { size: 2, data: uv },
      index: { data: index }
    });
    super(gl, attributes);
  }
}
function useSystemAudio(opts = {}) {
  const fftSize = opts.fftSize ?? 2048;
  const bandCount = Number.isSafeInteger(opts.bands) && opts.bands > 0 && opts.bands <= 2048 ? opts.bands : 64;
  const smoothing = opts.smoothing ?? 0.2;
  const maxFreqHz = opts.maxFreqHz ?? 16e3;
  const bands = ref(new Float32Array(bandCount));
  const level = ref(0);
  const active = ref(false);
  const error = ref("");
  let audioCtx = null;
  let analyser = null;
  let rafId = 0;
  let buf = null;
  let stream = null;
  let unmounted = false;
  function releaseAudio() {
    cancelAnimationFrame(rafId);
    rafId = 0;
    const captured = stream;
    const context = audioCtx;
    stream = null;
    audioCtx = null;
    analyser = null;
    buf = null;
    active.value = false;
    for (const track of captured?.getTracks() ?? []) {
      try {
        track.stop();
      } catch {
      }
    }
    try {
      void context?.close().catch(() => {
      });
    } catch {
    }
  }
  async function acquireStream() {
    try {
      const sysApi = window.sysApi;
      if (sysApi?.getDesktopAudioSourceId) {
        const r = await sysApi.getDesktopAudioSourceId();
        if (unmounted) return null;
        if (r?.success && r.sourceId) {
          const constraints = {
            audio: {
              // @ts-ignore — Electron 专有
              mandatory: { chromeMediaSource: "desktop" }
            },
            // chromium 捕获桌面音频要求 video 也开启，使用同一 sourceId
            video: {
              // @ts-ignore
              mandatory: { chromeMediaSource: "desktop", chromeMediaSourceId: r.sourceId }
            }
          };
          const s = await navigator.mediaDevices.getUserMedia(constraints);
          s.getVideoTracks().forEach((t) => t.stop());
          return s;
        }
      }
    } catch (e) {
      console.warn("[useSystemAudio] desktop capture failed:", e?.message || e);
    }
    if (unmounted) return null;
    try {
      return await navigator.mediaDevices.getUserMedia({
        audio: { echoCancellation: false, noiseSuppression: false, autoGainControl: false },
        video: false
      });
    } catch (e) {
      console.warn("[useSystemAudio] getUserMedia fallback failed:", e?.message || e);
    }
    return null;
  }
  async function start() {
    error.value = "";
    stream = await acquireStream();
    if (unmounted) {
      releaseAudio();
      return;
    }
    if (!stream) {
      error.value = "未能获取系统音频流（可能未授权或非 Electron 环境）";
      active.value = false;
      placeholderLoop();
      return;
    }
    try {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      if (audioCtx.state === "suspended") await audioCtx.resume();
      if (unmounted) {
        releaseAudio();
        return;
      }
      analyser = audioCtx.createAnalyser();
      analyser.fftSize = fftSize;
      analyser.smoothingTimeConstant = smoothing;
      buf = new Uint8Array(analyser.frequencyBinCount);
      const src = audioCtx.createMediaStreamSource(stream);
      src.connect(analyser);
      active.value = true;
      loop();
    } catch (e) {
      releaseAudio();
      error.value = String(e?.message || e);
      if (!unmounted) placeholderLoop();
    }
  }
  function loop() {
    if (unmounted) return;
    rafId = requestAnimationFrame(loop);
    if (!analyser || !buf) return;
    analyser.getByteFrequencyData(buf);
    const binCount = analyser.frequencyBinCount;
    const nyquist = (audioCtx?.sampleRate ?? 44100) / 2;
    const hzPerBin = nyquist / binCount;
    const targetBins = Math.min(binCount, Math.floor(maxFreqHz / hzPerBin));
    const minLog = Math.log10(20);
    const maxLog = Math.log10(Math.max(20, maxFreqHz));
    const seg = (maxLog - minLog) / bandCount;
    const out = bands.value;
    let sum = 0;
    for (let i = 0; i < bandCount; i++) {
      const lo = Math.pow(10, minLog + i * seg);
      const hi = Math.pow(10, minLog + (i + 1) * seg);
      const loBin = Math.max(0, Math.floor(lo / hzPerBin));
      const hiBin = Math.min(targetBins - 1, Math.max(loBin, Math.ceil(hi / hzPerBin)));
      let s = 0, c = 0;
      for (let b = loBin; b <= hiBin; b++) {
        s += buf[b];
        c++;
      }
      const raw = c ? s / c / 255 : 0;
      const t = i / Math.max(1, bandCount - 1);
      const weight = 0.5 + t * 0.8;
      out[i] = Math.min(1, Math.pow(raw, 0.55) * weight * 1.5);
      sum += out[i];
    }
    bands.value = out;
    level.value = sum / bandCount;
  }
  function placeholderLoop() {
    if (unmounted) return;
    rafId = requestAnimationFrame(placeholderLoop);
    const t = performance.now() / 1e3;
    const out = new Float32Array(bandCount);
    let sum = 0;
    for (let i = 0; i < bandCount; i++) {
      const base = 0.06 + 0.04 * Math.sin(t * 0.6 + i * 0.18);
      const mid = i > bandCount * 0.2 && i < bandCount * 0.7 ? 0.05 : 0;
      const noise = 0.03 * Math.sin(t * 4 + i * 1.7);
      const v = Math.max(0, Math.min(1, base + mid + noise));
      out[i] = v;
      sum += v;
    }
    bands.value = out;
    level.value = sum / bandCount;
  }
  onMounted(() => {
    start();
  });
  onUnmounted(() => {
    unmounted = true;
    releaseAudio();
  });
  return {
    bands: readonly(bands),
    level: readonly(level),
    active: readonly(active),
    error: readonly(error)
  };
}
function createTerrainAudio() {
  const bands = new Float32Array(8);
  const ripples = new Float32Array(4 * 4);
  const meteors = new Float32Array(3 * 4);
  for (let i = 2; i < ripples.length; i += 4) ripples[i] = -100;
  for (let i = 2; i < meteors.length; i += 4) meteors[i] = -100;
  let time = 0, lastBass = 0, lastHigh = 0, lastRipple = -10, lastMeteor = -10;
  let rippleSlot = 0, meteorSlot = 0, seed = 0;
  const position = () => Math.sin(++seed * 127.1) * 5.4;
  function update(input, hasAudio, delta) {
    const dt = Number.isFinite(delta) ? Math.max(0, Math.min(delta, 0.1)) : 0;
    time += dt;
    for (let band = 0; band < 8; band++) {
      const start = Math.floor(band * input.length / 8);
      const end = Math.floor((band + 1) * input.length / 8);
      let sum = 0;
      for (let i = start; i < end; i++) {
        const value = input[i];
        sum += Number.isFinite(value) ? Math.max(0, Math.min(value, 1)) : 0;
      }
      const target = hasAudio && end > start ? sum / (end - start) : 0;
      bands[band] += (target - bands[band]) * (1 - Math.exp(-dt * (target > bands[band] ? 18 : 5)));
    }
    const bass = (bands[0] + bands[1]) / 2;
    const high = (bands[5] + bands[6] + bands[7]) / 3;
    if (hasAudio && bass > 0.1 && bass > lastBass + 0.025 && time - lastRipple > 0.65) {
      ripples.set([position(), position(), time, bass], 4 * rippleSlot);
      rippleSlot = (rippleSlot + 1) % 4;
      lastRipple = time;
    }
    if (hasAudio && high > 0.12 && high > lastHigh + 0.018 && time - lastMeteor > 1.15) {
      meteors.set([position(), position(), time, high], 4 * meteorSlot);
      meteorSlot = (meteorSlot + 1) % 3;
      lastMeteor = time;
    }
    lastBass = bass;
    lastHigh = high;
    return time;
  }
  return { bands, ripples, meteors, update };
}
const terrainVertex = `
precision highp float;
attribute vec3 position;
attribute vec3 normal;
attribute vec2 aOffset;
attribute float aBand;
uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
uniform float uTime;
uniform float uBands[8];
uniform vec4 uRipples[4];
varying vec3 vNormal;
varying vec2 vLocal;
varying float vEnergy;
varying float vRadius;
varying float vHeight;
void main() {
  float energy = 0.0;
  for (int i = 0; i < 8; i++) {
    energy += uBands[i] * (1.0 - step(0.5, abs(aBand - float(i))));
  }
  float radius = length(aOffset);
  float idle = sin(aOffset.x * 0.7 + uTime * 0.6) * cos(aOffset.y * 0.65 - uTime * 0.45);
  float wave = sin(radius * 1.6 - uTime * 3.5) * 0.5 + 0.5;
  float height = 0.10 + 0.10 * (idle + 1.0) + energy * (0.7 + wave * 2.4);
  float pulse = 0.0;
  for (int i = 0; i < 4; i++) {
    float age = uTime - uRipples[i].z;
    float distanceToRing = length(aOffset - uRipples[i].xy) - age * 3.6;
    float ring = exp(-distanceToRing * distanceToRing * 2.2) * exp(-age * 0.65);
    pulse += ring * uRipples[i].w * step(0.0, age);
  }
  height += pulse * 1.65;
  vec3 p = vec3(aOffset.x + position.x * 0.232, (position.y + 0.5) * height, aOffset.y + position.z * 0.232);
  vNormal = normal;
  vLocal = position.xz;
  vRadius = radius;
  vEnergy = energy + pulse;
  vHeight = height;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
}`;
const terrainFragment = `
precision highp float;
uniform float uHue;
varying vec3 vNormal;
varying vec2 vLocal;
varying float vEnergy;
varying float vRadius;
varying float vHeight;
vec3 hueColor(float h) {
  return clamp(abs(fract(h + vec3(0.0, 0.6667, 0.3333)) * 6.0 - 3.0) - 1.0, 0.0, 1.0);
}
void main() {
  float top = max(vNormal.y, 0.0);
  float border = smoothstep(0.41, 0.49, max(abs(vLocal.x), abs(vLocal.y)));
  vec3 tint = mix(hueColor(uHue + vRadius * 0.013), vec3(0.55, 0.92, 1.0), clamp(vEnergy * 0.2, 0.0, 0.35));
  float lighting = 0.12 + top * 0.20 + max(dot(vNormal, normalize(vec3(-1.0, 2.0, 3.0))), 0.0) * 0.18;
  vec3 color = tint * (lighting + top * border * 0.20 + vEnergy * 0.38);
  color += tint * smoothstep(0.8, 3.0, vHeight) * 0.3;
  float fade = 1.0 - smoothstep(7.0, 11.0, vRadius);
  gl_FragColor = vec4(color, fade * 0.83);
}`;
const meteorVertex = `
precision highp float;
attribute vec3 position;
attribute vec2 aParticle;
uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
uniform float uTime;
uniform float uDpr;
uniform vec4 uMeteors[3];
varying float vAlpha;
void main() {
  vec4 meteor = vec4(0.0, 0.0, -100.0, 0.0);
  for (int i = 0; i < 3; i++) {
    if (abs(aParticle.x - float(i)) < 0.5) meteor = uMeteors[i];
  }
  float age = uTime - meteor.z;
  float part = aParticle.y;
  vec3 p = vec3(meteor.x, 0.12, meteor.y);
  if (part < 16.0) {
    float progress = age / 0.75 - part * 0.014;
    p += vec3(3.8, 5.8, -2.0) * (1.0 - clamp(progress, 0.0, 1.0));
    vAlpha = (1.0 - part / 16.0) * step(0.0, progress) * (1.0 - step(1.0, progress));
  } else {
    float impact = age - 0.75;
    float angle = (part - 16.0) * 2.39996;
    float speed = 0.8 + fract(part * 0.618) * 2.6;
    p += vec3(cos(angle) * speed * impact, max(0.0, impact * 2.0 - impact * impact * 2.8), sin(angle) * speed * impact);
    vAlpha = step(0.0, impact) * max(0.0, 1.0 - impact / 1.2);
  }
  vAlpha *= meteor.w;
  gl_PointSize = (part < 16.0 ? 5.5 : 3.5) * uDpr;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(p + position, 1.0);
}`;
const meteorFragment = `
precision mediump float;
varying float vAlpha;
void main() {
  float distanceToCenter = length(gl_PointCoord - 0.5) * 2.0;
  float glow = pow(max(0.0, 1.0 - distanceToCenter), 1.8);
  gl_FragColor = vec4(0.55, 0.86, 1.0, glow * vAlpha);
}`;
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "WaveBackground",
  props: {
    hue: { default: 205 },
    barCount: { default: 64 },
    mode: { default: "both" }
  },
  setup(__props) {
    const props = __props;
    const canvasRef = ref(null);
    const failed = ref(false);
    const audio = useSystemAudio({ bands: props.barCount, smoothing: 0.35, maxFreqHz: 6e3 });
    const dynamics = createTerrainAudio();
    let renderer = null;
    let camera = null;
    let scene = null;
    let terrain = null;
    let meteors = null;
    const geometries = [];
    const programs = [];
    const cleanups = [];
    let asleep = false, disposed = false;
    const animation = createAnimationScheduler({ request: (cb) => requestAnimationFrame(cb), cancel: (id) => cancelAnimationFrame(id) }, draw);
    let themeObserver = null;
    const uniforms = {
      uTime: { value: 0 },
      uHue: { value: props.hue / 360 },
      uDpr: { value: 1 },
      // OGL resolves GLSL array uniforms through Array.isArray; keep reusable plain arrays.
      uBands: { value: Array.from(dynamics.bands) },
      uRipples: { value: Array.from(dynamics.ripples) },
      uMeteors: { value: Array.from(dynamics.meteors) }
    };
    function readTheme() {
      const rgb = getComputedStyle(document.documentElement).getPropertyValue("--accent-rgb").trim().split(/[\s,/]+/).map(Number);
      uniforms.uHue.value = props.hue / 360;
      if (rgb.length !== 3 || !rgb.every(Number.isFinite)) return;
      const [r, g, b] = rgb;
      const max = Math.max(r, g, b), min = Math.min(r, g, b), delta = max - min;
      if (!delta) return;
      const hue = max === r ? (g - b) / delta : max === g ? (b - r) / delta + 2 : (r - g) / delta + 4;
      uniforms.uHue.value = (hue / 6 % 1 + 1) % 1;
    }
    function resize() {
      if (!renderer || !camera) return;
      renderer.dpr = Math.min(window.devicePixelRatio || 1, 1.25);
      renderer.setSize(window.innerWidth, window.innerHeight);
      uniforms.uDpr.value = renderer.dpr;
      const aspect = window.innerWidth / Math.max(1, window.innerHeight);
      const fov = 2 * Math.atan(Math.tan(20 * Math.PI / 360) * Math.min(1, 16 / 9 / aspect)) * 180 / Math.PI;
      camera.perspective({ aspect, fov });
      if (!document.hidden && !asleep) draw(0);
    }
    function draw(delta) {
      if (!renderer || !camera || !scene || failed.value) return;
      const time = dynamics.update(audio.bands.value, audio.active.value, delta);
      uniforms.uTime.value = time;
      for (let i = 0; i < dynamics.bands.length; i++) uniforms.uBands.value[i] = dynamics.bands[i];
      for (let i = 0; i < dynamics.ripples.length; i++) uniforms.uRipples.value[i] = dynamics.ripples[i];
      for (let i = 0; i < dynamics.meteors.length; i++) uniforms.uMeteors.value[i] = dynamics.meteors[i];
      camera.position.set(12 + Math.sin(time * 0.035) * 1.1, 13, 17);
      camera.lookAt([0, 0.2, 0]);
      if (terrain) terrain.visible = props.mode !== "particles";
      if (meteors) meteors.visible = props.mode !== "bars";
      renderer.render({ scene, camera, frustumCull: false });
    }
    function syncAnimation() {
      animation.setEnabled(!disposed && !asleep && !document.hidden && !failed.value && !!renderer);
    }
    function releaseGpu() {
      animation.dispose();
      for (const geometry of geometries.splice(0)) geometry.remove();
      for (const program of programs.splice(0)) program.remove();
      renderer?.gl.getExtension("WEBGL_lose_context")?.loseContext();
      renderer = null;
      camera = null;
      scene = null;
      terrain = null;
      meteors = null;
    }
    onMounted(() => {
      try {
        if (!canvasRef.value) return;
        renderer = new Renderer({ canvas: canvasRef.value, alpha: true, antialias: false, powerPreference: "low-power", dpr: 1 });
        const gl = renderer.gl;
        if (!gl || !renderer.drawElementsInstanced) throw new Error("WebGL instancing unavailable");
        gl.clearColor(0, 0, 0, 0);
        camera = new Camera(gl, { fov: 20, near: 0.1, far: 100 });
        scene = new Transform();
        const count = 64;
        const offsets = new Float32Array(count * count * 2);
        const bandIndices = new Float32Array(count * count);
        for (let z = 0; z < count; z++) {
          for (let x = 0; x < count; x++) {
            const i = z * count + x;
            const px = (x - (count - 1) / 2) * 0.26, pz = (z - (count - 1) / 2) * 0.26;
            offsets.set([px, pz], i * 2);
            bandIndices[i] = Math.min(7, Math.floor(Math.hypot(px, pz) / 1.45));
          }
        }
        const boxes = new Box(gl);
        geometries.push(boxes);
        boxes.addAttribute("aOffset", { size: 2, data: offsets, instanced: 1 });
        boxes.addAttribute("aBand", { size: 1, data: bandIndices, instanced: 1 });
        const boxProgram = new Program(gl, { vertex: terrainVertex, fragment: terrainFragment, uniforms, transparent: true, depthWrite: true });
        programs.push(boxProgram);
        terrain = new Mesh(gl, { geometry: boxes, program: boxProgram, frustumCulled: false });
        terrain.setParent(scene);
        const particles = new Float32Array(3 * 48 * 2);
        for (let i = 0; i < 3 * 48; i++) particles.set([Math.floor(i / 48), i % 48], i * 2);
        const points = new Geometry(gl, {
          position: { size: 3, data: new Float32Array(3 * 48 * 3) },
          aParticle: { size: 2, data: particles }
        });
        geometries.push(points);
        const pointProgram = new Program(gl, { vertex: meteorVertex, fragment: meteorFragment, uniforms, transparent: true, depthWrite: false });
        programs.push(pointProgram);
        meteors = new Mesh(gl, { geometry: points, program: pointProgram, mode: gl.POINTS, frustumCulled: false });
        meteors.setParent(scene);
        if (programs.some((program) => !gl.getProgramParameter(program.program, gl.LINK_STATUS))) throw new Error("Terrain shader compilation failed");
        readTheme();
        resize();
        themeObserver = new MutationObserver(() => {
          readTheme();
          if (!document.hidden && !asleep) draw(0);
        });
        themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["class", "style", "data-theme"] });
        window.addEventListener("resize", resize);
        document.addEventListener("visibilitychange", syncAnimation);
        const onContextLost = (event) => {
          event.preventDefault();
          failed.value = true;
          syncAnimation();
        };
        canvasRef.value.addEventListener("webglcontextlost", onContextLost);
        const canvas = canvasRef.value;
        cleanups.push(() => canvas.removeEventListener("webglcontextlost", onContextLost));
        if (window.powerApi) {
          cleanups.push(window.powerApi.onSleep(() => {
            asleep = true;
            syncAnimation();
          }));
          cleanups.push(window.powerApi.onWake(() => {
            asleep = false;
            syncAnimation();
          }));
        }
        syncAnimation();
      } catch (error) {
        failed.value = true;
        console.warn("[WaveBackground] 3D background unavailable:", error);
        releaseGpu();
      }
    });
    onUnmounted(() => {
      disposed = true;
      for (const cleanup of cleanups) cleanup();
      themeObserver?.disconnect();
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", syncAnimation);
      releaseGpu();
    });
    watch(() => props.hue, readTheme);
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(["wave-bg", { "wave-bg-fallback": failed.value }]),
        "aria-hidden": "true"
      }, [
        withDirectives(createBaseVNode("canvas", {
          ref_key: "canvasRef",
          ref: canvasRef
        }, null, 512), [
          [vShow, !failed.value]
        ]),
        _cache[0] || (_cache[0] = createBaseVNode("div", { class: "wave-bg-shade" }, null, -1))
      ], 2);
    };
  }
});
const WaveBackground = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-8b191018"]]);
function playbackDevices(list) {
  return list.filter((device) => device && typeof device.id === "string" && device.id.length > 0 && !/[\r\n]/.test(device.id) && !/fxsound|fxvad/i.test(`${device.name ?? ""} ${device.id}`));
}
function selectPlaybackDevice(list, saved) {
  const devices = playbackDevices(list);
  return devices.find((device) => device.id === saved)?.id ?? devices.find((device) => device.default)?.id ?? devices.find((device) => !/virtual|todesk|虚拟/i.test(device.name ?? ""))?.id ?? devices[0]?.id;
}
const _hoisted_1 = { class: "page eq-page" };
const _hoisted_2 = { class: "page-header" };
const _hoisted_3 = { class: "page-desc" };
const _hoisted_4 = { class: "page-actions" };
const _hoisted_5 = ["disabled"];
const _hoisted_6 = ["disabled"];
const _hoisted_7 = ["disabled"];
const _hoisted_8 = {
  key: 0,
  class: "eq-state-hint",
  role: "status"
};
const _hoisted_9 = { class: "eq-body" };
const _hoisted_10 = { class: "eq-card eq-curve-card" };
const _hoisted_11 = { class: "eq-card-head" };
const _hoisted_12 = { class: "eq-card-actions" };
const _hoisted_13 = ["disabled"];
const _hoisted_14 = ["disabled"];
const _hoisted_15 = ["viewBox"];
const _hoisted_16 = ["y1", "y2"];
const _hoisted_17 = ["y1", "y2"];
const _hoisted_18 = ["y"];
const _hoisted_19 = ["x1", "x2"];
const _hoisted_20 = ["d"];
const _hoisted_21 = ["d"];
const _hoisted_22 = ["cx", "cy", "onMousedown"];
const _hoisted_23 = ["cx", "cy"];
const _hoisted_24 = ["x", "y"];
const _hoisted_25 = ["x", "y"];
const _hoisted_26 = { class: "bands-strip" };
const _hoisted_27 = { class: "band-track-wrap" };
const _hoisted_28 = ["value", "disabled", "onInput"];
const _hoisted_29 = ["title"];
const _hoisted_30 = { class: "master-row" };
const _hoisted_31 = { class: "master-bar" };
const _hoisted_32 = ["value", "disabled"];
const _hoisted_33 = { class: "eq-bottom-grid" };
const _hoisted_34 = { class: "eq-card" };
const _hoisted_35 = { class: "eq-card-head" };
const _hoisted_36 = ["disabled"];
const _hoisted_37 = { class: "input-row" };
const _hoisted_38 = { class: "placeholder" };
const _hoisted_39 = { class: "user-list" };
const _hoisted_40 = ["title"];
const _hoisted_41 = { class: "user-actions" };
const _hoisted_42 = ["onClick", "disabled"];
const _hoisted_43 = ["onClick", "disabled"];
const _hoisted_44 = {
  key: 0,
  class: "placeholder"
};
const _hoisted_45 = ["disabled"];
const _hoisted_46 = ["value"];
const _hoisted_47 = { class: "eq-card" };
const _hoisted_48 = { class: "toggle-row" };
const _hoisted_49 = { class: "info-line" };
const _hoisted_50 = { class: "hint" };
const _hoisted_51 = { class: "info-line" };
const _hoisted_52 = { class: "hint" };
const _hoisted_53 = { class: "drv-row" };
const _hoisted_54 = ["disabled"];
const _hoisted_55 = ["disabled"];
const SVG_W = 1048;
const SVG_H = 200;
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "AudioEq",
  setup(__props) {
    const api = window.eqApi;
    const bandFreqs = [55, 95, 175, 320, 650, 1100, 2200, 4500, 9e3, 14e3];
    const yLabels = [
      { label: "+12 dB", pct: 4 },
      { label: "+9", pct: 18 },
      { label: "+6", pct: 32 },
      { label: "+3", pct: 46 },
      { label: "0", pct: 50 },
      { label: "-3", pct: 54 },
      { label: "-6", pct: 68 },
      { label: "-9", pct: 82 },
      { label: "-12", pct: 96 }
    ];
    const svgRef = ref(null);
    const curveRef = ref(null);
    const running = ref(false);
    const eqOn = ref(true);
    const observedEqEnabled = ref(null);
    const eqReadback = ref("waiting");
    const legacyPresetConfirmed = ref(false);
    const eqStateHint = computed(() => {
      if (!running.value || eqReadback.value === "available") return "";
      if (eqReadback.value === "invalid") return "引擎回报的 EQ 开关状态无效；开关显示期望设置，实际开关尚未确认。";
      if (eqReadback.value === "unavailable" && legacyPresetConfirmed.value) return "预设曲线与播放开关已回读确认；已发送 EQ 开启命令，但当前引擎不回报 EQ 开关状态，实际开关未验证。";
      if (eqReadback.value === "unavailable") return "当前引擎不回报 EQ 开关状态；开关显示期望设置，实际开关尚未确认。";
      return "正在等待 EQ 开关状态回读；开关显示期望设置。";
    });
    const driver = reactive({ installed: false, status: "" });
    const busy = reactive({ driver: false, engine: false, preset: false });
    const devices = ref([]);
    const userPresets = ref([]);
    const keepEQOnExit = ref(false);
    let engineEventRevision = 0;
    let engineFailureRevision = 0;
    const settings = reactive({
      power: 1,
      eqEnabled: 1,
      master: 0,
      gains: new Array(10).fill(0),
      freqs: [...bandFreqs],
      effects: new Array(5).fill(0),
      outputDevice: void 0
    });
    const bandLabels = computed(() => settings.freqs.map((freq) => freq >= 1e3 ? `${Number((freq / 1e3).toFixed(2))}k` : String(Number(freq.toFixed(2)))));
    const newPresetName = ref("");
    const toast = ref("");
    const toastOk = ref(true);
    const dragIdx = ref(-1);
    const dragStartY = ref(0);
    const dragStartGain = ref(0);
    const bandTimers = {};
    let masterTimer = null;
    let unsubListener = null;
    let engineStarted = false;
    let outputApplied;
    let initializeOutput = false;
    let presetLoadOperation = null;
    const iconBg = computed(
      () => running.value ? "linear-gradient(135deg, rgba(56,189,248,0.12), rgba(168,85,247,0.08))" : "rgba(168,85,247,0.08)"
    );
    const driverStatusText = computed(
      () => driver.installed ? driver.status || "已安装" : "未安装"
    );
    function colX(i) {
      return (i + 0.5) / 10 * SVG_W;
    }
    function gainToY(g) {
      return SVG_H / 2 - g / 12 * (SVG_H * 0.46);
    }
    function yToGain(y) {
      return Math.round((SVG_H / 2 - y) / (SVG_H * 0.46) * 12 * 2) / 2;
    }
    function clamp(n, min, max) {
      return Math.min(max, Math.max(min, n));
    }
    function buildSmoothPath(gains) {
      if (gains.length === 0) return "";
      const pts = gains.map((g, i) => ({ x: colX(i), y: gainToY(g) }));
      let d = `M ${pts[0].x} ${pts[0].y}`;
      for (let i = 1; i < pts.length; i++) {
        const cx1 = (pts[i - 1].x + pts[i].x) / 2;
        const cy1 = pts[i - 1].y;
        const cx2 = (pts[i - 1].x + pts[i].x) / 2;
        const cy2 = pts[i].y;
        d += ` C ${cx1} ${cy1}, ${cx2} ${cy2}, ${pts[i].x} ${pts[i].y}`;
      }
      return d;
    }
    const linePath = computed(() => buildSmoothPath(settings.gains));
    const fillPath = computed(() => {
      const g = settings.gains;
      if (g.length === 0) return "";
      const top = buildSmoothPath(g);
      return `${top} L ${SVG_W} ${SVG_H + 1} L 0 ${SVG_H + 1} Z`;
    });
    function t(msg, ok = true) {
      toast.value = msg;
      toastOk.value = ok;
      setTimeout(() => {
        if (toast.value === msg) toast.value = "";
      }, 2800);
    }
    function formatGain(v) {
      return (v > 0 ? "+" : "") + Number(v).toFixed(1);
    }
    function bandFillStyle(g, horizontal = false) {
      const pct = Math.round(Math.abs(g) / 12 * 100);
      if (g > 0) return horizontal ? { left: "50%", width: pct + "%", top: "0", bottom: "0" } : { bottom: "50%", height: pct + "%", left: "0", right: "0" };
      if (g < 0) return horizontal ? { right: "50%", width: pct + "%", top: "0", bottom: "0" } : { top: "50%", height: pct + "%", left: "0", right: "0" };
      return { height: "0" };
    }
    function gainColor(v) {
      if (v > 0.5) return "boost";
      if (v < -0.5) return "cut";
      return "";
    }
    async function sendAdjustment(command) {
      try {
        const result = await api.send(command);
        if (!result.success) t(result.message || "调节未生效，请重新启动引擎", false);
        return result.success;
      } catch (error) {
        t(error?.message || "引擎通信失败，调节未生效", false);
        return false;
      }
    }
    function svgCoords(e) {
      const svg = svgRef.value;
      if (!svg) return { x: 0, y: 0 };
      const pt = svg.createSVGPoint();
      pt.x = e.clientX;
      pt.y = e.clientY;
      const ctm = svg.getScreenCTM()?.inverse();
      if (!ctm) return { x: 0, y: 0 };
      const p = pt.matrixTransform(ctm);
      return p;
    }
    function onSvgMouseDown(e) {
      if (!running.value || !eqOn.value || busy.preset) return;
      const p = svgCoords(e);
      let minDist = Infinity;
      let bestIdx = -1;
      for (let i = 0; i < settings.gains.length; i++) {
        const dx = p.x - colX(i);
        const dy = p.y - gainToY(settings.gains[i]);
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < minDist && dist < 30) {
          minDist = dist;
          bestIdx = i;
        }
      }
      if (bestIdx >= 0) {
        dragIdx.value = bestIdx;
        dragStartY.value = p.y;
        dragStartGain.value = settings.gains[bestIdx];
      }
    }
    function onSvgMouseMove(e) {
      if (dragIdx.value < 0 || busy.preset) return;
      const p = svgCoords(e);
      const newG = clamp(yToGain(p.y), -12, 12);
      settings.gains[dragIdx.value] = newG;
      const i = dragIdx.value;
      if (bandTimers[i]) clearTimeout(bandTimers[i]);
      bandTimers[i] = setTimeout(() => {
        if (engineStarted) void sendAdjustment(`band ${i} ${newG}`);
      }, 80);
    }
    function onSvgMouseUp() {
      if (busy.preset) {
        dragIdx.value = -1;
        return;
      }
      if (dragIdx.value >= 0) {
        const i = dragIdx.value;
        if (bandTimers[i]) clearTimeout(bandTimers[i]);
        if (engineStarted) void sendAdjustment(`band ${i} ${settings.gains[i]}`);
        scheduleSaveSettings();
      }
      dragIdx.value = -1;
    }
    function onDotMouseDown(i, e) {
      if (!running.value || !eqOn.value || busy.preset) return;
      e.stopPropagation();
      dragIdx.value = i;
      const p = svgCoords(e);
      dragStartY.value = p.y;
      dragStartGain.value = settings.gains[i];
    }
    function onSliderInput(i, raw) {
      if (busy.preset) return;
      const v = clamp(parseFloat(raw) || 0, -12, 12);
      settings.gains[i] = v;
      if (bandTimers[i]) clearTimeout(bandTimers[i]);
      bandTimers[i] = setTimeout(() => {
        if (engineStarted) void sendAdjustment(`band ${i} ${v}`);
      }, 80);
      scheduleSaveSettings();
    }
    function onMasterInput(raw) {
      if (busy.preset) return;
      const v = clamp(parseFloat(raw) || 0, -12, 12);
      settings.master = v;
      if (masterTimer) clearTimeout(masterTimer);
      masterTimer = setTimeout(() => {
        if (engineStarted) void sendAdjustment(`master ${v}`);
      }, 80);
      scheduleSaveSettings();
    }
    let saveTimer = null;
    function scheduleSaveSettings() {
      if (busy.preset) return;
      if (saveTimer) clearTimeout(saveTimer);
      saveTimer = setTimeout(() => {
        if (busy.preset) return;
        api.saveSettings({
          power: settings.power,
          eqEnabled: settings.eqEnabled,
          master: settings.master,
          gains: [...settings.gains],
          freqs: [...settings.freqs],
          effects: [...settings.effects],
          outputDevice: settings.outputDevice
        });
      }, 500);
    }
    function toggleEq() {
      if (busy.preset) return;
      legacyPresetConfirmed.value = false;
      observedEqEnabled.value = null;
      if (eqReadback.value === "available") eqReadback.value = "waiting";
      eqOn.value = !eqOn.value;
      settings.eqEnabled = eqOn.value ? 1 : 0;
      scheduleSaveSettings();
      if (engineStarted) void sendAdjustment(`eq ${eqOn.value ? "1" : "0"}`);
    }
    function resetAllBands() {
      if (busy.preset) return;
      settings.gains.fill(0);
      settings.master = 0;
      if (engineStarted) {
        for (let i = 0; i < 10; i++) api.send(`band ${i} 0`);
        api.send("master 0");
      }
      scheduleSaveSettings();
      t("已重置全部频段");
    }
    async function onOutputChange() {
      if (busy.preset) return;
      if (engineStarted && settings.outputDevice) {
        const result = await api.send(`output ${settings.outputDevice}`);
        if (!result.success) {
          t(result.message || "输出设备切换失败", false);
          return;
        }
        outputApplied = settings.outputDevice;
        await api.send("power 1");
      }
      scheduleSaveSettings();
    }
    async function installDriver() {
      if (busy.preset) return;
      busy.driver = true;
      let r;
      try {
        r = await api.installDriver();
      } catch (e) {
        r = { success: false, message: e?.message || "IPC 异常" };
      } finally {
        busy.driver = false;
      }
      t(r.message || (r.success ? "虚拟声卡驱动已安装" : "安装失败"), r.success);
      try {
        Object.assign(driver, await api.driverStatus());
      } catch {
      }
    }
    async function uninstallDriver() {
      if (busy.preset) return;
      busy.driver = true;
      let r;
      try {
        r = await api.uninstallDriver();
      } catch (e) {
        r = { success: false, message: e?.message || "IPC 异常" };
      } finally {
        busy.driver = false;
      }
      t(r.message || (r.success ? "驱动已卸载" : "卸载失败"), r.success);
      try {
        Object.assign(driver, await api.driverStatus());
      } catch {
      }
    }
    async function pushFullState() {
      if (!engineStarted) return;
      const commands = [];
      if (devices.value.length) {
        settings.outputDevice = selectPlaybackDevice(devices.value, settings.outputDevice);
        if (settings.outputDevice) commands.push(`output ${settings.outputDevice}`);
      }
      for (let i = 0; i < 10; i++) commands.push(`freq ${i} ${settings.freqs[i]}`, `band ${i} ${settings.gains[i]}`);
      commands.push(`master ${settings.master}`);
      for (let i = 0; i < 5; i++) commands.push(`effect ${i} ${settings.effects[i]}`);
      commands.push(`eq ${eqOn.value ? "1" : "0"}`, "power 1", "devices", "state");
      for (const command of commands) {
        const result = await api.send(command);
        if (!result.success) {
          t(result.message || "引擎设置应用失败", false);
          return false;
        }
        if (command.startsWith("output ")) outputApplied = command.slice(7);
      }
      return true;
    }
    async function toggleEngine() {
      if (busy.engine || busy.preset) return;
      busy.engine = true;
      const failureRevision = engineFailureRevision;
      try {
        if (running.value) {
          const result = await api.stop();
          if (!result.success) {
            t(result.message || "停止失败", false);
            return;
          }
          engineStarted = false;
          initializeOutput = false;
          outputApplied = void 0;
          running.value = false;
          devices.value = [];
          observedEqEnabled.value = null;
          eqReadback.value = "waiting";
          legacyPresetConfirmed.value = false;
          t("引擎已停止");
          return;
        }
        observedEqEnabled.value = null;
        eqReadback.value = "waiting";
        legacyPresetConfirmed.value = false;
        initializeOutput = true;
        if (unsubListener) unsubListener();
        unsubListener = api.onEqEvent(onEqEvent);
        const r = await api.start();
        if (!r.success) {
          initializeOutput = false;
          const revision = engineEventRevision;
          try {
            const current = await api.running();
            if (revision === engineEventRevision) running.value = current.running;
          } catch {
          }
          t(r.message || "启动失败", false);
          return;
        }
        if (failureRevision !== engineFailureRevision) return;
        engineStarted = true;
        running.value = true;
        if (!await pushFullState()) return;
        if (failureRevision !== engineFailureRevision || !running.value) return;
        scheduleSaveSettings();
        t("引擎已启动");
      } catch (error) {
        t(error?.message || "引擎操作失败", false);
      } finally {
        busy.engine = false;
      }
    }
    function applyGainsArray(target, src, len) {
      if (!Array.isArray(src)) return;
      const vals = src.slice(0, len).map((v) => Number(v) || 0);
      if (vals.length === len) target.splice(0, len, ...vals);
    }
    function onEqEvent(e) {
      if (e.type === "state" || e.type === "error" || e.type === "exit") engineEventRevision++;
      if (e.type === "devices") {
        devices.value = playbackDevices(e.list ?? []);
        const previous = settings.outputDevice;
        settings.outputDevice = selectPlaybackDevice(devices.value, previous);
        if (settings.outputDevice !== previous) {
          if (previous) t("原输出不可用，已切换到可用播放设备", false);
        }
        if (initializeOutput && engineStarted && settings.outputDevice && settings.outputDevice !== outputApplied) void onOutputChange();
        if (!devices.value.length) t("没有可用播放设备，请连接耳机或扬声器", false);
      } else if (e.type === "state") {
        running.value = true;
        if (e.power === 0 || e.power === 1) settings.power = e.power;
        if (e.gains) applyGainsArray(settings.gains, e.gains, 10);
        if (e.freqs) applyGainsArray(settings.freqs, e.freqs, 10);
        if (e.effects) applyGainsArray(settings.effects, e.effects, 5);
        if (typeof e.master === "number") settings.master = e.master;
        const eqEnabled = e.eqEnabled;
        if (eqEnabled === true || eqEnabled === false || eqEnabled === 0 || eqEnabled === 1) {
          observedEqEnabled.value = eqEnabled === true || eqEnabled === 1;
          eqReadback.value = "available";
          legacyPresetConfirmed.value = false;
          settings.eqEnabled = eqEnabled === true || eqEnabled === 1 ? 1 : 0;
          eqOn.value = settings.eqEnabled === 1;
        } else {
          observedEqEnabled.value = null;
          eqReadback.value = eqEnabled === void 0 ? "unavailable" : "invalid";
        }
        if (e.outputDevice) {
          settings.outputDevice = e.outputDevice;
          outputApplied = e.outputDevice;
        }
        presetLoadOperation?.onState?.(e);
      } else if (e.type === "error") {
        engineFailureRevision++;
        if (presetLoadOperation) {
          presetLoadOperation.error = e.message || "音频引擎发生错误";
          presetLoadOperation.finish?.(new Error(presetLoadOperation.error));
        }
        t(e.message || "音频引擎发生错误", false);
      } else if (e.type === "exit") {
        engineFailureRevision++;
        running.value = false;
        devices.value = [];
        observedEqEnabled.value = null;
        eqReadback.value = "waiting";
        legacyPresetConfirmed.value = false;
        engineStarted = false;
        initializeOutput = false;
        outputApplied = void 0;
        if (presetLoadOperation) {
          presetLoadOperation.error = "均衡器引擎已退出";
          presetLoadOperation.finish?.(new Error(presetLoadOperation.error));
        }
      }
    }
    function confirmPresetState(target, includeEffects, operation) {
      return new Promise((resolve, reject) => {
        let finished = false, sawState = false, queryAccepted = false;
        let matchedState = null;
        const close = (error) => {
          if (finished) return;
          finished = true;
          clearTimeout(timer);
          operation.onState = void 0;
          operation.finish = void 0;
          if (error) reject(error);
          else if (matchedState) resolve(matchedState);
        };
        const timer = setTimeout(() => close(new Error(sawState ? "引擎回读与目标参数不一致" : "均衡器状态回读超时")), 2500);
        const matches = (actual, expected, frequency = false) => typeof actual === "number" && Number.isFinite(actual) && Math.abs(actual - expected) <= (frequency ? Math.max(1e-3, Math.abs(expected) * 1e-6) : 51e-4);
        const matchesArray = (actual, expected, frequency = false) => Array.isArray(actual) && actual.length >= expected.length && expected.every((value, index) => matches(actual[index], value, frequency));
        operation.finish = close;
        operation.onState = (event) => {
          sawState = true;
          const enabled = event.eqEnabled;
          matchedState = null;
          if (matchesArray(event.freqs, target.freqs, true) && matchesArray(event.gains, target.gains) && matches(event.master, target.master) && (!includeEffects || matchesArray(event.effects, target.effects)) && event.power === 1 && (enabled === void 0 || enabled === true || enabled === 1)) {
            matchedState = enabled === void 0 ? "parameters" : "full";
            if (queryAccepted) close();
          }
        };
        if (operation.error) {
          close(new Error(operation.error));
          return;
        }
        void api.send("state").then((result) => {
          if (!result.success) close(new Error(result.message || "无法读取均衡器状态"));
          else {
            queryAccepted = true;
            if (matchedState) close();
          }
        }, (error) => close(error instanceof Error ? error : new Error(String(error))));
      });
    }
    async function saveUserPreset() {
      if (busy.preset) return;
      const n = newPresetName.value.trim();
      if (!n) return;
      const r = await api.savePreset({
        name: n,
        gains: [...settings.gains],
        freqs: [...settings.freqs],
        master: settings.master,
        effects: [...settings.effects]
      });
      t(r.success ? "已保存" : "保存失败", r.success);
      if (r.success) newPresetName.value = "";
      userPresets.value = (await api.listPresets()).presets;
    }
    async function loadUserPreset(path) {
      if (busy.engine || busy.preset) return;
      busy.preset = true;
      legacyPresetConfirmed.value = false;
      let operation = null;
      let confirmation = null;
      const checkLatestSwitch = () => {
        if (observedEqEnabled.value === false || eqReadback.value === "invalid") throw new Error("EQ 开关状态已变化，本次预设未能完整确认，请重新核对");
      };
      if (saveTimer) {
        clearTimeout(saveTimer);
        saveTimer = null;
      }
      Object.values(bandTimers).forEach((timer) => timer && clearTimeout(timer));
      if (masterTimer) {
        clearTimeout(masterTimer);
        masterTimer = null;
      }
      dragIdx.value = -1;
      try {
        const r = await api.loadPreset(path);
        if (!r.success || !r.preset) {
          t("加载失败", false);
          return;
        }
        const p = r.preset;
        const target = { ...settings, power: 1, eqEnabled: 1, gains: [...settings.gains], freqs: [...settings.freqs], effects: [...settings.effects] };
        if (p.gains) applyGainsArray(target.gains, p.gains, 10);
        if (p.freqs) applyGainsArray(target.freqs, p.freqs, 10);
        if (typeof p.master === "number") target.master = p.master;
        const hasEffects = Array.isArray(p.effects) && p.effects.length >= 5;
        if (hasEffects) applyGainsArray(target.effects, p.effects, 5);
        if (engineStarted) {
          operation = { error: "" };
          presetLoadOperation = operation;
          const commands = [];
          for (let i = 0; i < 10; i++) commands.push(`freq ${i} ${target.freqs[i]}`, `band ${i} ${target.gains[i]}`);
          commands.push(`master ${target.master}`);
          if (hasEffects) for (let i = 0; i < 5; i++) commands.push(`effect ${i} ${target.effects[i]}`);
          commands.push("eq 1", "power 1");
          for (const command of commands) {
            if (operation.error) throw new Error(operation.error);
            const result = await api.send(command);
            if (!result.success) throw new Error(result.message || "预设命令未生效");
            if (operation.error) throw new Error(operation.error);
          }
          confirmation = await confirmPresetState(target, hasEffects, operation);
          if (operation.error) throw new Error(operation.error);
          checkLatestSwitch();
          settings.eqEnabled = 1;
          eqOn.value = true;
          legacyPresetConfirmed.value = confirmation === "parameters";
        } else {
          Object.assign(settings, target);
          eqOn.value = true;
        }
        const saved = await api.saveSettings({
          power: settings.power,
          eqEnabled: settings.eqEnabled,
          master: settings.master,
          gains: [...settings.gains],
          freqs: [...settings.freqs],
          effects: [...settings.effects],
          outputDevice: settings.outputDevice
        });
        if (!saved.success) {
          t("预设已载入，但设置保存失败，请重试", false);
          return;
        }
        if (operation?.error) throw new Error(operation.error);
        if (confirmation) checkLatestSwitch();
        t((confirmation ? confirmation === "parameters" ? "预设曲线已回读确认（EQ 开关未验证）: " : "已应用: " : "已载入，启动引擎后生效: ") + (p.name || "未命名"));
      } catch (error) {
        if (operation && engineStarted) await api.send("state").catch(() => {
        });
        t((error?.message || "加载失败") + (operation ? "；部分设置可能已生效，请检查当前参数后重试。" : ""), false);
      } finally {
        if (presetLoadOperation === operation) presetLoadOperation = null;
        busy.preset = false;
      }
    }
    async function deleteUserPreset(path) {
      if (busy.preset) return;
      const r = await api.deletePreset(path);
      t(r.success ? "已删除" : "删除失败", r.success);
      userPresets.value = (await api.listPresets()).presets;
    }
    function toggleKeepEQOnExit() {
      api.setKeepEQOnExit(keepEQOnExit.value);
    }
    onMounted(async () => {
      if (unsubListener) {
        unsubListener();
        unsubListener = null;
      }
      unsubListener = api.onEqEvent(onEqEvent);
      const eventRevision = engineEventRevision;
      const [d, r, s, presets, keepeq] = await Promise.all([
        api.driverStatus(),
        api.running(),
        api.loadSettings(),
        api.listPresets(),
        api.getKeepEQOnExit()
      ]);
      Object.assign(driver, d);
      if (eventRevision === engineEventRevision) running.value = r.running;
      keepEQOnExit.value = keepeq.enabled;
      if (s.success && s.settings) {
        if (s.settings.gains) applyGainsArray(settings.gains, s.settings.gains, 10);
        if (s.settings.freqs) applyGainsArray(settings.freqs, s.settings.freqs, 10);
        if (s.settings.effects) applyGainsArray(settings.effects, s.settings.effects, 5);
        if (typeof s.settings.master === "number") settings.master = s.settings.master;
        if (s.settings.outputDevice) settings.outputDevice = s.settings.outputDevice;
        if (typeof s.settings.eqEnabled === "number") {
          settings.eqEnabled = s.settings.eqEnabled;
          eqOn.value = s.settings.eqEnabled === 1;
        }
      }
      userPresets.value = presets.presets;
      if (running.value) {
        engineStarted = true;
        if (!await sendAdjustment("state")) return;
        await sendAdjustment("devices");
      }
    });
    onUnmounted(() => {
      if (presetLoadOperation) {
        presetLoadOperation.error = "均衡器页面已关闭";
        presetLoadOperation.finish?.(new Error(presetLoadOperation.error));
      }
      if (unsubListener) {
        unsubListener();
        unsubListener = null;
      }
      Object.values(bandTimers).forEach((t2) => t2 && clearTimeout(t2));
      if (masterTimer) clearTimeout(masterTimer);
      if (saveTimer) clearTimeout(saveTimer);
    });
    return (_ctx, _cache) => {
      const _component_router_link = resolveComponent("router-link");
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createVNode(WaveBackground),
        createBaseVNode("div", _hoisted_2, [
          createBaseVNode("div", {
            class: "page-icon",
            style: normalizeStyle({ background: iconBg.value })
          }, [..._cache[4] || (_cache[4] = [
            createBaseVNode("svg", {
              width: "28",
              height: "28",
              viewBox: "0 0 24 24",
              fill: "none",
              stroke: "var(--accent)",
              "stroke-width": "1.5"
            }, [
              createBaseVNode("line", {
                x1: "3",
                y1: "12",
                x2: "21",
                y2: "12"
              }),
              createBaseVNode("path", { d: "M6 9v6M10 6v12M14 7v10M18 9v6" })
            ], -1)
          ])], 4),
          createBaseVNode("div", null, [
            _cache[5] || (_cache[5] = createBaseVNode("h2", { class: "page-title" }, "音频均衡器", -1)),
            createBaseVNode("p", _hoisted_3, "虚拟声卡 · 10 段均衡 · " + toDisplayString(settings.freqs[0]) + "–" + toDisplayString(settings.freqs[9]) + " Hz", 1)
          ]),
          createBaseVNode("div", _hoisted_4, [
            createBaseVNode("span", {
              class: normalizeClass(["status-chip", driver.installed ? "on" : "off"])
            }, [
              _cache[6] || (_cache[6] = createBaseVNode("span", { class: "status-dot" }, null, -1)),
              createTextVNode(" 驱动 " + toDisplayString(driver.installed ? "已装" : "未装"), 1)
            ], 2),
            createBaseVNode("button", {
              class: "action-btn silver",
              onClick: installDriver,
              disabled: busy.driver || busy.preset,
              style: { "font-size": "11px" }
            }, "安装", 8, _hoisted_5),
            createBaseVNode("button", {
              class: "action-btn silver",
              onClick: uninstallDriver,
              disabled: busy.driver || busy.preset,
              style: { "font-size": "11px" }
            }, "卸载", 8, _hoisted_6),
            createBaseVNode("button", {
              class: normalizeClass(["action-btn", running.value ? "red" : "green"]),
              onClick: toggleEngine,
              disabled: busy.engine || busy.preset
            }, toDisplayString(busy.engine ? "处理中…" : running.value ? "停止引擎" : "启动引擎"), 11, _hoisted_7)
          ])
        ]),
        eqStateHint.value ? (openBlock(), createElementBlock("p", _hoisted_8, toDisplayString(eqStateHint.value), 1)) : createCommentVNode("", true),
        createVNode(unref(EmbeddedSection), {
          id: "audio-diagnostics",
          title: "声音诊断",
          description: "无声音或调节无效时，检查输出链路与实际均衡参数"
        }, {
          default: withCtx(() => [
            createVNode(unref(SupportDiagnosticsPanel), { mode: "audio" })
          ]),
          _: 1
        }),
        createBaseVNode("div", _hoisted_9, [
          createBaseVNode("div", _hoisted_10, [
            createBaseVNode("div", _hoisted_11, [
              _cache[7] || (_cache[7] = createBaseVNode("span", { class: "eq-card-title" }, "频率响应", -1)),
              createBaseVNode("div", _hoisted_12, [
                createBaseVNode("button", {
                  class: normalizeClass(["toggle-pill", { active: eqOn.value }]),
                  onClick: toggleEq,
                  disabled: !running.value || busy.preset
                }, " EQ " + toDisplayString(eqOn.value ? "ON" : "OFF") + toDisplayString(observedEqEnabled.value === null ? "（设置）" : ""), 11, _hoisted_13),
                createBaseVNode("button", {
                  class: "text-btn",
                  onClick: resetAllBands,
                  disabled: !running.value || busy.preset
                }, "重置全部", 8, _hoisted_14)
              ])
            ]),
            createBaseVNode("div", {
              class: "curve-area",
              ref_key: "curveRef",
              ref: curveRef
            }, [
              (openBlock(), createElementBlock("svg", {
                viewBox: `0 0 ${SVG_W} ${SVG_H}`,
                class: "curve-svg",
                ref_key: "svgRef",
                ref: svgRef,
                preserveAspectRatio: "none",
                onMousedown: onSvgMouseDown,
                onMousemove: onSvgMouseMove,
                onMouseup: onSvgMouseUp,
                onMouseleave: onSvgMouseUp
              }, [
                (openBlock(), createElementBlock(Fragment, null, renderList(yLabels, (v) => {
                  return createBaseVNode("line", {
                    key: "grid-" + v.label,
                    x1: 0,
                    y1: v.pct * SVG_H / 100,
                    x2: SVG_W,
                    y2: v.pct * SVG_H / 100,
                    stroke: "rgba(148,163,184,0.12)",
                    "stroke-width": "0.5"
                  }, null, 8, _hoisted_16);
                }), 64)),
                createBaseVNode("line", {
                  x1: "0",
                  y1: SVG_H / 2,
                  x2: SVG_W,
                  y2: SVG_H / 2,
                  stroke: "rgba(56,189,248,0.25)",
                  "stroke-width": "1"
                }, null, 8, _hoisted_17),
                (openBlock(), createElementBlock(Fragment, null, renderList(yLabels, (v) => {
                  return createBaseVNode("text", {
                    key: "y-" + v.label,
                    x: 6,
                    y: v.pct * SVG_H / 100 + 3,
                    fill: "rgba(148,163,184,0.45)",
                    "font-size": "11",
                    "font-family": "Inter,monospace"
                  }, toDisplayString(v.label), 9, _hoisted_18);
                }), 64)),
                (openBlock(true), createElementBlock(Fragment, null, renderList(settings.freqs, (f, i) => {
                  return openBlock(), createElementBlock("line", {
                    key: "vgrid-" + i,
                    x1: colX(i),
                    y1: 0,
                    x2: colX(i),
                    y2: SVG_H,
                    stroke: "rgba(148,163,184,0.08)",
                    "stroke-width": "0.5"
                  }, null, 8, _hoisted_19);
                }), 128)),
                _cache[8] || (_cache[8] = createStaticVNode('<defs data-v-55e9a2eb><linearGradient id="curveFill" x1="0" y1="0" x2="0" y2="1" data-v-55e9a2eb><stop offset="0%" stop-color="rgba(56,189,248,0.35)" data-v-55e9a2eb></stop><stop offset="100%" stop-color="rgba(56,189,248,0.02)" data-v-55e9a2eb></stop></linearGradient><filter id="curveGlow" data-v-55e9a2eb><feGaussianBlur stdDeviation="1.5" result="blur" data-v-55e9a2eb></feGaussianBlur><feMerge data-v-55e9a2eb><feMergeNode in="blur" data-v-55e9a2eb></feMergeNode><feMergeNode in="SourceGraphic" data-v-55e9a2eb></feMergeNode></feMerge></filter></defs>', 1)),
                createBaseVNode("path", {
                  d: fillPath.value,
                  fill: "url(#curveFill)"
                }, null, 8, _hoisted_20),
                createBaseVNode("path", {
                  d: linePath.value,
                  fill: "none",
                  stroke: "var(--accent)",
                  "stroke-width": "2",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  filter: "url(#curveGlow)"
                }, null, 8, _hoisted_21),
                (openBlock(true), createElementBlock(Fragment, null, renderList(settings.gains, (g, i) => {
                  return openBlock(), createElementBlock("g", {
                    key: "dot-" + i
                  }, [
                    createBaseVNode("circle", {
                      cx: colX(i),
                      cy: gainToY(g),
                      r: "7",
                      fill: "rgba(15,23,42,0.8)",
                      stroke: "var(--accent)",
                      "stroke-width": "2",
                      class: "curve-dot",
                      onMousedown: withModifiers(($event) => onDotMouseDown(i, $event), ["prevent"])
                    }, null, 40, _hoisted_22),
                    createBaseVNode("circle", {
                      cx: colX(i),
                      cy: gainToY(g),
                      r: "5",
                      fill: "var(--accent)",
                      class: "curve-dot-inner"
                    }, null, 8, _hoisted_23),
                    dragIdx.value === i ? (openBlock(), createElementBlock("text", {
                      key: 0,
                      x: colX(i),
                      y: gainToY(g) - 14,
                      "text-anchor": "middle",
                      fill: "var(--accent)",
                      "font-size": "11",
                      "font-family": "'Orbitron',monospace"
                    }, toDisplayString(g > 0 ? "+" : "") + toDisplayString(g.toFixed(1)) + " dB", 9, _hoisted_24)) : createCommentVNode("", true)
                  ]);
                }), 128)),
                (openBlock(true), createElementBlock(Fragment, null, renderList(settings.freqs, (f, i) => {
                  return openBlock(), createElementBlock("text", {
                    key: "x-" + i,
                    x: colX(i),
                    y: SVG_H - 6,
                    "text-anchor": "middle",
                    fill: "rgba(148,163,184,0.4)",
                    "font-size": "11",
                    "font-family": "Inter,monospace"
                  }, toDisplayString(bandLabels.value[i]), 9, _hoisted_25);
                }), 128))
              ], 40, _hoisted_15))
            ], 512),
            createBaseVNode("div", _hoisted_26, [
              (openBlock(), createElementBlock(Fragment, null, renderList(10, (i) => {
                return createBaseVNode("div", {
                  key: "s-" + i,
                  class: "band-col"
                }, [
                  createBaseVNode("div", _hoisted_27, [
                    createBaseVNode("div", {
                      class: "band-fill",
                      style: normalizeStyle(bandFillStyle(settings.gains[i - 1]))
                    }, null, 4),
                    _cache[9] || (_cache[9] = createBaseVNode("div", { class: "band-zero" }, null, -1)),
                    createBaseVNode("input", {
                      type: "range",
                      min: "-12",
                      max: "12",
                      step: "0.5",
                      value: settings.gains[i - 1],
                      disabled: !running.value || !eqOn.value || busy.preset,
                      onInput: ($event) => onSliderInput(i - 1, $event.target.value),
                      class: "band-slider"
                    }, null, 40, _hoisted_28)
                  ]),
                  createBaseVNode("div", {
                    class: normalizeClass(["band-val", gainColor(settings.gains[i - 1])])
                  }, toDisplayString(formatGain(settings.gains[i - 1])), 3),
                  createBaseVNode("div", {
                    class: "band-hz",
                    title: `${settings.freqs[i - 1]} Hz`
                  }, toDisplayString(bandLabels.value[i - 1]), 9, _hoisted_29)
                ]);
              }), 64))
            ]),
            createBaseVNode("div", _hoisted_30, [
              _cache[11] || (_cache[11] = createBaseVNode("span", { class: "master-label" }, "主增益", -1)),
              createBaseVNode("div", _hoisted_31, [
                createBaseVNode("div", {
                  class: "master-fill",
                  style: normalizeStyle(bandFillStyle(settings.master, true))
                }, null, 4),
                _cache[10] || (_cache[10] = createBaseVNode("div", { class: "master-zero" }, null, -1)),
                createBaseVNode("input", {
                  type: "range",
                  min: "-12",
                  max: "12",
                  step: "0.5",
                  value: settings.master,
                  disabled: !running.value || busy.preset,
                  onInput: _cache[0] || (_cache[0] = ($event) => onMasterInput($event.target.value)),
                  class: "master-slider"
                }, null, 40, _hoisted_32)
              ]),
              createBaseVNode("span", {
                class: normalizeClass(["master-db", gainColor(settings.master)])
              }, toDisplayString((settings.master > 0 ? "+" : "") + settings.master.toFixed(1)) + " dB ", 3)
            ])
          ]),
          createBaseVNode("div", _hoisted_33, [
            createBaseVNode("div", _hoisted_34, [
              createBaseVNode("div", _hoisted_35, [
                _cache[12] || (_cache[12] = createBaseVNode("span", { class: "eq-card-title" }, "我的预设", -1)),
                createBaseVNode("button", {
                  class: "text-btn",
                  onClick: saveUserPreset,
                  disabled: !newPresetName.value.trim() || busy.preset
                }, "保存当前", 8, _hoisted_36)
              ]),
              createBaseVNode("div", _hoisted_37, [
                withDirectives(createBaseVNode("input", {
                  "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => newPresetName.value = $event),
                  placeholder: "预设名称…",
                  class: "cyber-input",
                  maxlength: "32",
                  onKeyup: withKeys(saveUserPreset, ["enter"])
                }, null, 544), [
                  [vModelText, newPresetName.value]
                ])
              ]),
              createBaseVNode("p", _hoisted_38, [
                _cache[14] || (_cache[14] = createTextVNode("社区收藏可在 ", -1)),
                createVNode(_component_router_link, { to: "/my-plans" }, {
                  default: withCtx(() => [..._cache[13] || (_cache[13] = [
                    createTextVNode("我的方案", -1)
                  ])]),
                  _: 1
                }),
                _cache[15] || (_cache[15] = createTextVNode(" 中导入到这里。", -1))
              ]),
              createBaseVNode("div", _hoisted_39, [
                (openBlock(true), createElementBlock(Fragment, null, renderList(userPresets.value, (p) => {
                  return openBlock(), createElementBlock("div", {
                    key: p.path,
                    class: "user-row"
                  }, [
                    createBaseVNode("span", {
                      class: "user-name",
                      title: p.name
                    }, toDisplayString(p.name || "未命名"), 9, _hoisted_40),
                    createBaseVNode("div", _hoisted_41, [
                      createBaseVNode("button", {
                        class: "text-btn",
                        onClick: ($event) => loadUserPreset(p.path),
                        disabled: busy.engine || busy.preset
                      }, "载入", 8, _hoisted_42),
                      createBaseVNode("button", {
                        class: "text-btn red",
                        onClick: ($event) => deleteUserPreset(p.path),
                        disabled: busy.preset
                      }, "删除", 8, _hoisted_43)
                    ])
                  ]);
                }), 128)),
                !userPresets.value.length ? (openBlock(), createElementBlock("div", _hoisted_44, "暂无保存的预设")) : createCommentVNode("", true)
              ]),
              _cache[17] || (_cache[17] = createBaseVNode("div", { class: "card-divider" }, null, -1)),
              _cache[18] || (_cache[18] = createBaseVNode("div", {
                class: "eq-card-head",
                style: { "margin-bottom": "6px" }
              }, [
                createBaseVNode("span", { class: "eq-card-title" }, "输出设备")
              ], -1)),
              withDirectives(createBaseVNode("select", {
                "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => settings.outputDevice = $event),
                class: "cyber-select",
                disabled: !running.value || busy.preset,
                onChange: onOutputChange
              }, [
                _cache[16] || (_cache[16] = createBaseVNode("option", {
                  value: "",
                  disabled: ""
                }, "选择设备", -1)),
                (openBlock(true), createElementBlock(Fragment, null, renderList(devices.value, (d) => {
                  return openBlock(), createElementBlock("option", {
                    key: d.id,
                    value: d.id
                  }, toDisplayString(d.name || d.id), 9, _hoisted_46);
                }), 128))
              ], 40, _hoisted_45), [
                [vModelSelect, settings.outputDevice]
              ])
            ]),
            createBaseVNode("div", _hoisted_47, [
              _cache[23] || (_cache[23] = createBaseVNode("div", { class: "eq-card-head" }, [
                createBaseVNode("span", { class: "eq-card-title" }, "设置")
              ], -1)),
              createBaseVNode("label", _hoisted_48, [
                withDirectives(createBaseVNode("input", {
                  type: "checkbox",
                  "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => keepEQOnExit.value = $event),
                  onChange: toggleKeepEQOnExit
                }, null, 544), [
                  [vModelCheckbox, keepEQOnExit.value]
                ]),
                _cache[19] || (_cache[19] = createBaseVNode("span", { class: "toggle-track" }, [
                  createBaseVNode("span", { class: "toggle-knob" })
                ], -1)),
                _cache[20] || (_cache[20] = createBaseVNode("span", { class: "toggle-label" }, "退出时保留引擎", -1))
              ]),
              _cache[24] || (_cache[24] = createBaseVNode("div", { class: "card-divider" }, null, -1)),
              createBaseVNode("div", _hoisted_49, [
                _cache[21] || (_cache[21] = createBaseVNode("span", null, "状态", -1)),
                createBaseVNode("span", _hoisted_50, toDisplayString(running.value ? settings.power ? "音频处理已启用" : "音频处理已旁路" : "引擎已停止"), 1)
              ]),
              createBaseVNode("div", _hoisted_51, [
                _cache[22] || (_cache[22] = createBaseVNode("span", null, "虚拟设备", -1)),
                createBaseVNode("span", _hoisted_52, toDisplayString(driverStatusText.value), 1)
              ]),
              _cache[25] || (_cache[25] = createBaseVNode("div", { class: "card-divider" }, null, -1)),
              createBaseVNode("div", _hoisted_53, [
                createBaseVNode("button", {
                  class: "btn-sm",
                  onClick: installDriver,
                  disabled: busy.driver || busy.preset
                }, toDisplayString(busy.driver ? "安装中…" : "安装驱动"), 9, _hoisted_54),
                createBaseVNode("button", {
                  class: "btn-sm",
                  onClick: uninstallDriver,
                  disabled: busy.driver || busy.preset
                }, "卸载驱动", 8, _hoisted_55)
              ])
            ])
          ])
        ]),
        createVNode(Transition, { name: "tst" }, {
          default: withCtx(() => [
            toast.value ? (openBlock(), createElementBlock("div", {
              key: 0,
              class: normalizeClass(["toast", toastOk.value ? "ok" : "err"])
            }, toDisplayString(toast.value), 3)) : createCommentVNode("", true)
          ]),
          _: 1
        })
      ]);
    };
  }
});
const AudioEq = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-55e9a2eb"]]);
export {
  AudioEq as default
};
