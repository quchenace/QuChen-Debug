import { t as defineComponent, av as useRouter, a1 as onMounted, a3 as onUnmounted, a5 as openBlock, l as createElementBlock, i as createBaseVNode, as as unref, q as createTextVNode, ak as toDisplayString, S as normalizeClass, V as normalizeStyle, a9 as ref, _ as _export_sfc } from "./main-DAqTdO6U.js";
const _hoisted_1 = {
  "data-tour": "dashboard",
  class: "relative z-10 flex h-full min-h-screen w-full items-center justify-center p-10 text-white -mt-20"
};
const _hoisted_2 = { class: "grid w-full max-w-7xl grid-cols-1 gap-12 lg:grid-cols-12" };
const _hoisted_3 = { class: "col-span-5 flex flex-col justify-center" };
const _hoisted_4 = { class: "mt-6 flex flex-wrap gap-3" };
const _hoisted_5 = { class: "animate-slide-right delay-400 mt-12 flex items-center gap-6 border-l-4 border-blue-500 pl-6" };
const _hoisted_6 = { class: "text-6xl font-mono font-bold text-white" };
const _hoisted_7 = { class: "flex flex-col" };
const _hoisted_8 = { class: "text-xs text-gray-500 font-mono" };
const _hoisted_9 = { class: "col-span-7 flex flex-col gap-6 pt-8" };
const _hoisted_10 = { class: "glass-card animate-fade-in delay-500 flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl shadow-2xl relative overflow-hidden" };
const _hoisted_11 = { class: "flex items-center justify-between border-b border-white/10 pb-4 mb-2" };
const _hoisted_12 = { class: "group flex flex-col gap-2" };
const _hoisted_13 = { class: "flex justify-between font-mono text-sm" };
const _hoisted_14 = { class: "font-bold text-blue-400" };
const _hoisted_15 = { class: "h-1.5 w-full bg-gray-800/50 overflow-hidden" };
const _hoisted_16 = { class: "group flex flex-col gap-2" };
const _hoisted_17 = { class: "flex justify-between font-mono text-sm" };
const _hoisted_18 = { class: "font-bold text-purple-400" };
const _hoisted_19 = { class: "h-1.5 w-full bg-gray-800/50 overflow-hidden" };
const _hoisted_20 = { class: "group flex flex-col gap-2" };
const _hoisted_21 = { class: "flex justify-between font-mono text-sm" };
const _hoisted_22 = { class: "font-bold text-orange-400" };
const _hoisted_23 = { class: "h-1.5 w-full bg-gray-800/50 overflow-hidden" };
const _hoisted_24 = { class: "animate-fade-in delay-700 rounded-xl border border-blue-500/20 bg-[#050B14]/80 p-4 font-mono text-xs shadow-inner backdrop-blur-md" };
const _hoisted_25 = { class: "flex flex-col gap-1 text-green-400" };
const _hoisted_26 = { class: "text-blue-300" };
const _hoisted_27 = { class: "mt-2 grid grid-cols-3 gap-4 border-t border-white/5 pt-2 text-gray-300" };
const _hoisted_28 = { class: "text-white" };
const _hoisted_29 = { class: "text-white" };
const _hoisted_30 = { class: "text-white" };
const _hoisted_31 = { class: "animate-fade-in delay-700 rounded-xl border border-blue-500/10 bg-[#050B14]/60 p-4 font-mono text-xs backdrop-blur-md" };
const _hoisted_32 = { class: "grid grid-cols-2 gap-x-6 gap-y-2 text-gray-300" };
const _hoisted_33 = { class: "text-white/80" };
const _hoisted_34 = { class: "text-white/80" };
const _hoisted_35 = { class: "text-white/80" };
const _hoisted_36 = { class: "text-white/80" };
const _hoisted_37 = { class: "text-white/80" };
const _hoisted_38 = { class: "text-white/80" };
const _hoisted_39 = { class: "text-white/80" };
const _hoisted_40 = { class: "text-white/80" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Dashboard",
  setup(__props) {
    const router = useRouter();
    function openGuide() {
      window.dispatchEvent(new Event("zzt:open-guide"));
    }
    const cpuUsage = ref(0);
    const gpuUsage = ref(0);
    const ramUsage = ref(0);
    const tempGPU = ref(0);
    const powerDraw = ref("0W");
    const frequency = ref("0MHz");
    const cpuModel = ref("检测中...");
    const gpuModel = ref("检测中...");
    const gpuMemory = ref("");
    const sysDetail = ref({
      processor: "",
      motherboard: "",
      memory: "",
      gpu: "",
      monitor: "",
      disk: "",
      audio: "",
      network: ""
    });
    const isScanning = ref(false);
    let pollingTimer = null;
    let unsubSleep = null;
    let unsubWake = null;
    function startPolling() {
      stopPolling();
      pollingTimer = setInterval(fetchRealData, 3e4);
    }
    function stopPolling() {
      if (pollingTimer !== null) {
        clearInterval(pollingTimer);
        pollingTimer = null;
      }
    }
    async function fetchRealData() {
      if (!window.sysApi) return;
      isScanning.value = true;
      try {
        const [gpuDetail, cpuData, snapshot] = await Promise.all([
          window.sysApi.getGpuDetail().catch(() => ({ available: false })),
          window.sysApi.getCpuUsage().catch(() => ({ success: false, usage: 0 })),
          // 内存占用也要每轮刷新——旧实现只在挂载时算一次，仪表板长期显示陈旧值
          window.sysApi.getPerformanceSnapshot?.().catch(() => null)
        ]);
        cpuUsage.value = cpuData.success ? cpuData.usage : 0;
        if (snapshot?.memory?.usagePercent !== void 0) {
          ramUsage.value = snapshot.memory.usagePercent;
        }
        if (gpuDetail.available) {
          gpuUsage.value = gpuDetail.gpuUsage || 0;
          tempGPU.value = gpuDetail.temp || 0;
          powerDraw.value = gpuDetail.powerDraw ? gpuDetail.powerDraw + "W" : gpuDetail.powerLimit ? gpuDetail.powerLimit + "W" : "—";
          frequency.value = gpuDetail.coreClock ? gpuDetail.coreClock + "MHz" : "—";
        }
      } catch {
      } finally {
        isScanning.value = false;
      }
    }
    async function fetchSystemDetailOnce() {
      if (!window.sysApi) return;
      try {
        const sysInfo = await window.sysApi.getSystemInfo();
        cpuModel.value = sysInfo.cpuModel || cpuModel.value;
        gpuModel.value = sysInfo.gpuModel || gpuModel.value;
        gpuMemory.value = sysInfo.gpuMemory || gpuMemory.value;
        ramUsage.value = sysInfo.totalMemoryGB ? Math.round((1 - parseFloat(sysInfo.freeMemoryGB) / parseFloat(sysInfo.totalMemoryGB)) * 100) : 0;
        sysDetail.value = {
          processor: sysInfo.cpuModel,
          motherboard: sysInfo.motherboard || "—",
          memory: (sysInfo.totalMemoryGB || "—") + " GB",
          gpu: sysInfo.gpuModel || "—",
          monitor: sysInfo.monitorName || "—",
          disk: sysInfo.diskInfo || "—",
          audio: (sysInfo.audioCards || []).slice(0, 3).join(", ") || "—",
          network: (sysInfo.networkCards || []).slice(0, 3).join(", ") || "—"
        };
      } catch {
      }
    }
    onMounted(() => {
      fetchRealData().catch(() => {
      });
      fetchSystemDetailOnce().catch(() => {
      });
      startPolling();
      if (window.powerApi) {
        unsubSleep = window.powerApi.onSleep(() => {
          console.log("[Dashboard] 主进程进入睡眠 → 暂停仪表盘轮询");
          stopPolling();
        });
        unsubWake = window.powerApi.onWake(() => {
          console.log("[Dashboard] 主进程唤醒 → 恢复仪表盘轮询");
          fetchRealData().catch(() => {
          });
          startPolling();
        });
      }
    });
    onUnmounted(() => {
      stopPolling();
      if (unsubSleep) unsubSleep();
      if (unsubWake) unsubWake();
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createBaseVNode("div", _hoisted_2, [
          createBaseVNode("div", _hoisted_3, [
            _cache[3] || (_cache[3] = createBaseVNode("div", { class: "animate-slide-right font-mono text-xs tracking-[0.3em] text-blue-500/70" }, " QuChen调试助手 v6.2.0 ", -1)),
            _cache[4] || (_cache[4] = createBaseVNode("h1", { class: "animate-slide-right delay-100 mt-4 text-7xl font-black uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-500" }, " 性能极限觉醒 ", -1)),
            _cache[5] || (_cache[5] = createBaseVNode("h2", { class: "animate-slide-right delay-200 mt-6 text-2xl font-bold tracking-widest text-blue-400" }, " 释放每一帧潜力 ", -1)),
            _cache[6] || (_cache[6] = createBaseVNode("p", { class: "animate-slide-right delay-300 mt-4 max-w-sm text-sm leading-relaxed text-gray-400" }, " 从系统体检了解配置状态，通过系统诊断与修复排查问题，再按需选择游戏、显卡和外设调优。 ", -1)),
            createBaseVNode("div", _hoisted_4, [
              createBaseVNode("button", {
                class: "rounded-lg border border-sky-400/30 bg-sky-400/10 px-4 py-2 text-sm text-sky-300",
                onClick: openGuide
              }, "新手入门 →"),
              createBaseVNode("button", {
                class: "rounded-lg border border-white/10 px-4 py-2 text-sm text-gray-300",
                onClick: _cache[0] || (_cache[0] = ($event) => unref(router).push("/system-diagnostics"))
              }, "打开系统诊断与修复")
            ]),
            createBaseVNode("div", _hoisted_5, [
              createBaseVNode("div", _hoisted_6, [
                createTextVNode(toDisplayString(cpuUsage.value), 1),
                _cache[1] || (_cache[1] = createBaseVNode("span", { class: "text-2xl text-blue-500" }, "%", -1))
              ]),
              createBaseVNode("div", _hoisted_7, [
                _cache[2] || (_cache[2] = createBaseVNode("span", { class: "text-sm font-bold tracking-widest text-green-400" }, "系统就绪", -1)),
                createBaseVNode("span", _hoisted_8, toDisplayString(cpuModel.value.slice(0, 40)), 1)
              ])
            ])
          ]),
          createBaseVNode("div", _hoisted_9, [
            createBaseVNode("div", _hoisted_10, [
              createBaseVNode("div", {
                class: normalizeClass(["absolute -top-24 -right-24 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl transition-opacity duration-300", { "opacity-100": isScanning.value, "opacity-40": !isScanning.value }])
              }, null, 2),
              createBaseVNode("div", _hoisted_11, [
                _cache[7] || (_cache[7] = createBaseVNode("span", { class: "font-mono text-xs tracking-widest text-gray-400" }, "硬件监控", -1)),
                createBaseVNode("span", {
                  class: normalizeClass(["flex h-2 w-2 rounded-full", isScanning.value ? "bg-blue-400 shadow-[0_0_8px_#60a5fa]" : "bg-gray-600"])
                }, null, 2)
              ]),
              createBaseVNode("div", _hoisted_12, [
                createBaseVNode("div", _hoisted_13, [
                  _cache[8] || (_cache[8] = createBaseVNode("span", { class: "text-gray-300" }, "CPU 占用", -1)),
                  createBaseVNode("span", _hoisted_14, toDisplayString(cpuUsage.value) + "%", 1)
                ]),
                createBaseVNode("div", _hoisted_15, [
                  createBaseVNode("div", {
                    class: "h-full bg-blue-500 transition-all duration-300 ease-out",
                    style: normalizeStyle({ width: cpuUsage.value + "%" })
                  }, null, 4)
                ])
              ]),
              createBaseVNode("div", _hoisted_16, [
                createBaseVNode("div", _hoisted_17, [
                  _cache[9] || (_cache[9] = createBaseVNode("span", { class: "text-gray-300" }, "GPU 占用", -1)),
                  createBaseVNode("span", _hoisted_18, toDisplayString(gpuUsage.value) + "%", 1)
                ]),
                createBaseVNode("div", _hoisted_19, [
                  createBaseVNode("div", {
                    class: "h-full bg-purple-500 transition-all duration-300 ease-out",
                    style: normalizeStyle({ width: gpuUsage.value + "%" })
                  }, null, 4)
                ])
              ]),
              createBaseVNode("div", _hoisted_20, [
                createBaseVNode("div", _hoisted_21, [
                  _cache[10] || (_cache[10] = createBaseVNode("span", { class: "text-gray-300" }, "内存占用", -1)),
                  createBaseVNode("span", _hoisted_22, toDisplayString(ramUsage.value) + "%", 1)
                ]),
                createBaseVNode("div", _hoisted_23, [
                  createBaseVNode("div", {
                    class: "h-full bg-orange-500 transition-all duration-300 ease-out",
                    style: normalizeStyle({ width: ramUsage.value + "%" })
                  }, null, 4)
                ])
              ])
            ]),
            createBaseVNode("div", _hoisted_24, [
              _cache[18] || (_cache[18] = createBaseVNode("div", { class: "mb-2 flex items-center gap-2 border-b border-blue-500/20 pb-2 text-blue-500/60" }, [
                createBaseVNode("span", null, ">_ 显卡终端"),
                createBaseVNode("span", { class: "animate-pulse bg-blue-500 text-black px-1" }, "录制")
              ], -1)),
              createBaseVNode("div", _hoisted_25, [
                _cache[17] || (_cache[17] = createBaseVNode("p", null, "> 正在解析底层电源状态...", -1)),
                createBaseVNode("p", _hoisted_26, "> GPU_0 [" + toDisplayString(gpuModel.value.slice(0, 30)) + toDisplayString(gpuModel.value.length > 30 ? "..." : "") + "] " + toDisplayString(gpuMemory.value ? gpuMemory.value + " · " : "") + "P-State: P0 (最高性能)", 1),
                createBaseVNode("div", _hoisted_27, [
                  createBaseVNode("div", null, [
                    _cache[11] || (_cache[11] = createBaseVNode("span", { class: "text-gray-500" }, "温度:", -1)),
                    _cache[12] || (_cache[12] = createTextVNode()),
                    createBaseVNode("span", _hoisted_28, toDisplayString(tempGPU.value) + "°C", 1)
                  ]),
                  createBaseVNode("div", null, [
                    _cache[13] || (_cache[13] = createBaseVNode("span", { class: "text-gray-500" }, "功耗:", -1)),
                    _cache[14] || (_cache[14] = createTextVNode()),
                    createBaseVNode("span", _hoisted_29, toDisplayString(powerDraw.value), 1)
                  ]),
                  createBaseVNode("div", null, [
                    _cache[15] || (_cache[15] = createBaseVNode("span", { class: "text-gray-500" }, "频率:", -1)),
                    _cache[16] || (_cache[16] = createTextVNode()),
                    createBaseVNode("span", _hoisted_30, toDisplayString(frequency.value), 1)
                  ])
                ])
              ])
            ]),
            createBaseVNode("div", _hoisted_31, [
              _cache[35] || (_cache[35] = createBaseVNode("div", { class: "mb-3 flex items-center gap-2 border-b border-blue-500/10 pb-2 text-blue-500/60" }, [
                createBaseVNode("span", null, ">_ 系统详情")
              ], -1)),
              createBaseVNode("div", _hoisted_32, [
                createBaseVNode("div", null, [
                  _cache[19] || (_cache[19] = createBaseVNode("span", { class: "text-gray-500" }, "处理器:", -1)),
                  _cache[20] || (_cache[20] = createTextVNode()),
                  createBaseVNode("span", _hoisted_33, toDisplayString(sysDetail.value.processor), 1)
                ]),
                createBaseVNode("div", null, [
                  _cache[21] || (_cache[21] = createBaseVNode("span", { class: "text-gray-500" }, "主板:", -1)),
                  _cache[22] || (_cache[22] = createTextVNode()),
                  createBaseVNode("span", _hoisted_34, toDisplayString(sysDetail.value.motherboard), 1)
                ]),
                createBaseVNode("div", null, [
                  _cache[23] || (_cache[23] = createBaseVNode("span", { class: "text-gray-500" }, "内存:", -1)),
                  _cache[24] || (_cache[24] = createTextVNode()),
                  createBaseVNode("span", _hoisted_35, toDisplayString(sysDetail.value.memory), 1)
                ]),
                createBaseVNode("div", null, [
                  _cache[25] || (_cache[25] = createBaseVNode("span", { class: "text-gray-500" }, "显卡:", -1)),
                  _cache[26] || (_cache[26] = createTextVNode()),
                  createBaseVNode("span", _hoisted_36, toDisplayString(sysDetail.value.gpu), 1)
                ]),
                createBaseVNode("div", null, [
                  _cache[27] || (_cache[27] = createBaseVNode("span", { class: "text-gray-500" }, "显示器:", -1)),
                  _cache[28] || (_cache[28] = createTextVNode()),
                  createBaseVNode("span", _hoisted_37, toDisplayString(sysDetail.value.monitor), 1)
                ]),
                createBaseVNode("div", null, [
                  _cache[29] || (_cache[29] = createBaseVNode("span", { class: "text-gray-500" }, "磁盘:", -1)),
                  _cache[30] || (_cache[30] = createTextVNode()),
                  createBaseVNode("span", _hoisted_38, toDisplayString(sysDetail.value.disk), 1)
                ]),
                createBaseVNode("div", null, [
                  _cache[31] || (_cache[31] = createBaseVNode("span", { class: "text-gray-500" }, "声卡:", -1)),
                  _cache[32] || (_cache[32] = createTextVNode()),
                  createBaseVNode("span", _hoisted_39, toDisplayString(sysDetail.value.audio), 1)
                ]),
                createBaseVNode("div", null, [
                  _cache[33] || (_cache[33] = createBaseVNode("span", { class: "text-gray-500" }, "网卡:", -1)),
                  _cache[34] || (_cache[34] = createTextVNode()),
                  createBaseVNode("span", _hoisted_40, toDisplayString(sysDetail.value.network), 1)
                ])
              ])
            ])
          ])
        ])
      ]);
    };
  }
});
const Dashboard = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-d5341c57"]]);
export {
  Dashboard as default
};
