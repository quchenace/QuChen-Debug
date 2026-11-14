import { t as defineComponent, aD as watch, Y as onBeforeUnmount, a5 as openBlock, l as createElementBlock, i as createBaseVNode, ak as toDisplayString, k as createCommentVNode, F as Fragment, ab as renderList, S as normalizeClass, q as createTextVNode, aG as withDirectives, az as vModelSelect, aA as vModelText, p as createStaticVNode, as as unref, a9 as ref, g as computed, _ as _export_sfc } from "./main-DAqTdO6U.js";
/* empty css                     */
function networkEndpoint(address, port) {
  const host = address.includes(":") ? `[${address}]` : address || "*";
  return port === null ? host : `${host}:${port}`;
}
const _hoisted_1 = {
  class: "input-tool network-diagnostics",
  "aria-labelledby": "network-diagnostics-title"
};
const _hoisted_2 = { class: "tool-actions" };
const _hoisted_3 = ["disabled"];
const _hoisted_4 = ["disabled"];
const _hoisted_5 = {
  class: "tool-status",
  role: "status"
};
const _hoisted_6 = {
  key: 0,
  role: "status"
};
const _hoisted_7 = {
  key: 1,
  class: "tool-error",
  role: "alert"
};
const _hoisted_8 = { key: 2 };
const _hoisted_9 = { class: "tool-metrics" };
const _hoisted_10 = {
  key: 0,
  class: "tool-error",
  role: "status"
};
const _hoisted_11 = {
  key: 1,
  class: "tool-error",
  role: "status"
};
const _hoisted_12 = {
  class: "tool-actions section-nav",
  "aria-label": "网络报告分类"
};
const _hoisted_13 = ["aria-pressed", "onClick"];
const _hoisted_14 = { class: "tool-fields network-filters" };
const _hoisted_15 = { class: "row-heading" };
const _hoisted_16 = { class: "network-details" };
const _hoisted_17 = { key: 0 };
const _hoisted_18 = { class: "network-row" };
const _hoisted_19 = { class: "row-heading" };
const _hoisted_20 = { class: "network-details" };
const _hoisted_21 = { class: "network-row" };
const _hoisted_22 = { class: "network-row" };
const _hoisted_23 = { key: 0 };
const _hoisted_24 = { class: "tool-fields network-filters" };
const _hoisted_25 = { class: "row-heading" };
const _hoisted_26 = { class: "network-details" };
const _hoisted_27 = { key: 0 };
const _hoisted_28 = { class: "tool-fields network-filters" };
const _hoisted_29 = {
  key: 0,
  class: "tool-error"
};
const _hoisted_30 = { class: "row-heading" };
const _hoisted_31 = { key: 1 };
const _hoisted_32 = {
  key: 6,
  class: "tool-actions"
};
const _hoisted_33 = ["disabled"];
const _hoisted_34 = ["disabled"];
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "NetworkDiagnosticsPanel",
  setup(__props) {
    const report = ref(null), busy = ref(false), error = ref(""), feedback = ref("");
    const sections = [{ id: "adapters", label: "网卡与地址" }, { id: "proxy", label: "代理与 VPN" }, { id: "connections", label: "连接与端口" }, { id: "hosts", label: "Hosts 映射" }];
    const section = ref("adapters"), page = ref(1), search = ref(""), adapterFilter = ref("all"), connectionFilter = ref("all"), hostsFilter = ref("all");
    const sourceNames = { adapters: "网卡", ip: "IP 配置", tcp: "TCP", udp: "UDP", processes: "进程名称", proxy: "用户代理", winhttp: "WinHTTP", vpnUser: "当前用户 VPN", vpnAll: "所有用户 VPN", hosts: "Hosts" };
    let disposed = false;
    const sourceFailed = (name) => report.value?.sources.some((row) => row.name === name && row.status === "error") ?? true;
    const count = (name, value) => sourceFailed(name) ? `${value}（读取不完整）` : String(value);
    const list = (items, source) => items.length ? items.join(" / ") : sourceFailed(source) ? "读取失败" : "未提供";
    const match = (value) => value.toLowerCase().includes(search.value.trim().toLowerCase());
    const adapterState = (value) => ({ up: "已连接", disconnected: "未连接", disabled: "已禁用", "not present": "不存在" })[value] || value || "未知";
    const adapters = computed(() => (report.value?.adapters ?? []).filter((row) => (adapterFilter.value === "all" || adapterFilter.value === "up" && row.status === "up" || adapterFilter.value === "down" && !!row.status && row.status !== "up" || adapterFilter.value === "unknown" && !row.status) && match([row.name, row.interfaceDescription, row.macAddress, ...row.ipv4Addresses, ...row.ipv6Addresses, ...row.dnsServers, ...row.gateways].join(" "))));
    const connections = computed(() => (report.value?.connections ?? []).filter((row) => (connectionFilter.value === "all" || row.protocol.toLowerCase() === connectionFilter.value || row.state === connectionFilter.value) && match(`${row.processName} ${row.owningProcess ?? ""} ${row.localAddress} ${row.localPort} ${row.remoteAddress} ${row.remotePort ?? ""}`)));
    const hosts = computed(() => (report.value?.hosts.items ?? []).filter((row) => (hostsFilter.value === "all" || hostsFilter.value === "enabled" && row.enabled || hostsFilter.value === "disabled" && !row.enabled || hostsFilter.value === "duplicate" && row.duplicate) && match(`${row.host} ${row.address}`)));
    const pageCount = computed(() => Math.max(1, Math.ceil((section.value === "adapters" ? adapters.value.length : section.value === "connections" ? connections.value.length : section.value === "hosts" ? hosts.value.length : report.value?.vpn.length ?? 0) / 20)));
    const slice = (items) => items.slice((page.value - 1) * 20, page.value * 20);
    const adapterPage = computed(() => slice(adapters.value)), connectionPage = computed(() => slice(connections.value)), hostsPage = computed(() => slice(hosts.value)), vpnPage = computed(() => slice(report.value?.vpn ?? []));
    watch([search, adapterFilter, connectionFilter, hostsFilter], () => {
      page.value = 1;
    });
    watch(section, () => {
      search.value = "";
      page.value = 1;
    });
    async function scan() {
      if (busy.value) return;
      busy.value = true;
      error.value = "";
      feedback.value = "";
      report.value = null;
      page.value = 1;
      try {
        if (!window.sysApi?.getNetworkDiagnostics) throw Error("网络诊断接口不可用，请重启更新后的软件");
        const reply = await window.sysApi.getNetworkDiagnostics();
        if (disposed) return;
        if (reply.success === false) throw Error(reply.error);
        report.value = reply.report;
      } catch (reason) {
        if (!disposed) error.value = reason instanceof Error ? reason.message : String(reason);
      } finally {
        if (!disposed) busy.value = false;
      }
    }
    async function copy() {
      if (!report.value) return;
      try {
        await navigator.clipboard.writeText(JSON.stringify(report.value, null, 2));
        if (!disposed) feedback.value = "网络报告已复制";
      } catch {
        if (!disposed) feedback.value = "复制失败，请重试";
      }
    }
    onBeforeUnmount(() => {
      disposed = true;
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("section", _hoisted_1, [
        _cache[39] || (_cache[39] = createBaseVNode("div", { class: "tool-heading" }, [
          createBaseVNode("div", null, [
            createBaseVNode("h3", { id: "network-diagnostics-title" }, "网络配置与连接审查"),
            createBaseVNode("p", null, "网卡、代理、VPN、Hosts 与 TCP / UDP 快照。")
          ]),
          createBaseVNode("span", { class: "tool-badge" }, "本机只读")
        ], -1)),
        createBaseVNode("div", _hoisted_2, [
          createBaseVNode("button", {
            class: "primary",
            disabled: busy.value,
            onClick: scan
          }, toDisplayString(busy.value ? "正在读取网络…" : "读取网络配置"), 9, _hoisted_3),
          createBaseVNode("button", {
            disabled: !report.value || busy.value,
            onClick: copy
          }, "复制网络报告", 8, _hoisted_4),
          createBaseVNode("span", _hoisted_5, toDisplayString(feedback.value), 1)
        ]),
        busy.value ? (openBlock(), createElementBlock("p", _hoisted_6, "正在读取系统配置和连接，最多等待 60 秒。")) : createCommentVNode("", true),
        error.value ? (openBlock(), createElementBlock("p", _hoisted_7, toDisplayString(error.value), 1)) : createCommentVNode("", true),
        !report.value && !busy.value && !error.value ? (openBlock(), createElementBlock("p", _hoisted_8, "手动读取本机快照，不发起测速；配置和连接会随时间变化。")) : createCommentVNode("", true),
        report.value ? (openBlock(), createElementBlock(Fragment, { key: 3 }, [
          createBaseVNode("div", _hoisted_9, [
            createBaseVNode("div", null, [
              _cache[8] || (_cache[8] = createBaseVNode("span", null, "网卡 / 接口", -1)),
              createBaseVNode("strong", null, toDisplayString(count("adapters", report.value.adapters.length)), 1)
            ]),
            createBaseVNode("div", null, [
              _cache[9] || (_cache[9] = createBaseVNode("span", null, "TCP / UDP 记录", -1)),
              createBaseVNode("strong", null, toDisplayString(report.value.connections.length) + toDisplayString(sourceFailed("tcp") || sourceFailed("udp") ? "（读取不完整）" : ""), 1)
            ]),
            createBaseVNode("div", null, [
              _cache[10] || (_cache[10] = createBaseVNode("span", null, "生效 Hosts 映射", -1)),
              createBaseVNode("strong", null, toDisplayString(count("hosts", report.value.hosts.items.filter((row) => row.enabled).length)), 1)
            ])
          ]),
          createBaseVNode("p", null, "快照时间：" + toDisplayString(new Date(report.value.checkedAt).toLocaleString()), 1),
          report.value.partial ? (openBlock(), createElementBlock("p", _hoisted_10, "部分来源读取失败，不能据此判断网络配置完整或正常。")) : createCommentVNode("", true),
          report.value.truncated ? (openBlock(), createElementBlock("p", _hoisted_11, "记录达到读取上限，本次报告不是完整清单。")) : createCommentVNode("", true),
          (openBlock(true), createElementBlock(Fragment, null, renderList(report.value.sources.filter((row) => row.status === "error"), (source) => {
            return openBlock(), createElementBlock("p", {
              key: source.name,
              class: "tool-error"
            }, toDisplayString(sourceNames[source.name]) + "：" + toDisplayString(source.error || "读取失败"), 1);
          }), 128)),
          createBaseVNode("div", _hoisted_12, [
            (openBlock(), createElementBlock(Fragment, null, renderList(sections, (item) => {
              return createBaseVNode("button", {
                key: item.id,
                class: normalizeClass({ primary: section.value === item.id }),
                "aria-pressed": section.value === item.id,
                onClick: ($event) => section.value = item.id
              }, toDisplayString(item.label), 11, _hoisted_13);
            }), 64))
          ]),
          section.value === "adapters" ? (openBlock(), createElementBlock(Fragment, { key: 2 }, [
            createBaseVNode("div", _hoisted_14, [
              createBaseVNode("label", null, [
                _cache[12] || (_cache[12] = createTextVNode("网卡状态", -1)),
                withDirectives(createBaseVNode("select", {
                  "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => adapterFilter.value = $event),
                  "aria-label": "网卡状态"
                }, [..._cache[11] || (_cache[11] = [
                  createBaseVNode("option", { value: "all" }, "全部状态", -1),
                  createBaseVNode("option", { value: "up" }, "已连接", -1),
                  createBaseVNode("option", { value: "down" }, "未连接 / 禁用", -1),
                  createBaseVNode("option", { value: "unknown" }, "状态未知", -1)
                ])], 512), [
                  [vModelSelect, adapterFilter.value]
                ])
              ]),
              createBaseVNode("label", null, [
                _cache[13] || (_cache[13] = createTextVNode("搜索网卡", -1)),
                withDirectives(createBaseVNode("input", {
                  "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => search.value = $event),
                  type: "search",
                  "aria-label": "搜索网卡",
                  placeholder: "名称、IP、DNS 或 MAC"
                }, null, 512), [
                  [vModelText, search.value]
                ])
              ])
            ]),
            createBaseVNode("p", null, "匹配 " + toDisplayString(adapters.value.length) + " 个接口", 1),
            (openBlock(true), createElementBlock(Fragment, null, renderList(adapterPage.value, (row) => {
              return openBlock(), createElementBlock("article", {
                key: row.id,
                class: "network-row adapter-row"
              }, [
                createBaseVNode("div", _hoisted_15, [
                  createBaseVNode("strong", null, toDisplayString(row.name), 1),
                  createBaseVNode("span", null, toDisplayString(adapterState(row.status)), 1)
                ]),
                createBaseVNode("p", null, toDisplayString(row.interfaceDescription || "描述未知") + " · 接口 " + toDisplayString(row.interfaceIndex) + " · " + toDisplayString(row.virtual === true ? "虚拟接口" : row.hardwareInterface === true ? "硬件接口" : "类型未知"), 1),
                createBaseVNode("dl", _hoisted_16, [
                  createBaseVNode("div", null, [
                    _cache[14] || (_cache[14] = createBaseVNode("dt", null, "IPv4", -1)),
                    createBaseVNode("dd", null, toDisplayString(list(row.ipv4Addresses, "ip")), 1)
                  ]),
                  createBaseVNode("div", null, [
                    _cache[15] || (_cache[15] = createBaseVNode("dt", null, "IPv6", -1)),
                    createBaseVNode("dd", null, toDisplayString(list(row.ipv6Addresses, "ip")), 1)
                  ]),
                  createBaseVNode("div", null, [
                    _cache[16] || (_cache[16] = createBaseVNode("dt", null, "默认网关", -1)),
                    createBaseVNode("dd", null, toDisplayString(list(row.gateways, "ip")), 1)
                  ]),
                  createBaseVNode("div", null, [
                    _cache[17] || (_cache[17] = createBaseVNode("dt", null, "DNS", -1)),
                    createBaseVNode("dd", null, toDisplayString(list(row.dnsServers, "ip")), 1)
                  ]),
                  createBaseVNode("div", null, [
                    _cache[18] || (_cache[18] = createBaseVNode("dt", null, "DHCP（IPv4）", -1)),
                    createBaseVNode("dd", null, toDisplayString(row.dhcp === "Enabled" ? "开启" : row.dhcp === "Disabled" ? "关闭" : "未知"), 1)
                  ]),
                  createBaseVNode("div", null, [
                    _cache[19] || (_cache[19] = createBaseVNode("dt", null, "链路 / MAC", -1)),
                    createBaseVNode("dd", null, toDisplayString(row.linkSpeed || "速率未知") + " · " + toDisplayString(row.macAddress || "MAC 未提供"), 1)
                  ])
                ])
              ]);
            }), 128)),
            !adapters.value.length ? (openBlock(), createElementBlock("p", _hoisted_17, toDisplayString(sourceFailed("adapters") ? "网卡信息读取失败，可重试。" : "没有符合条件的接口。"), 1)) : createCommentVNode("", true)
          ], 64)) : section.value === "proxy" ? (openBlock(), createElementBlock(Fragment, { key: 3 }, [
            createBaseVNode("div", _hoisted_18, [
              createBaseVNode("div", _hoisted_19, [
                _cache[20] || (_cache[20] = createBaseVNode("strong", null, "当前用户代理", -1)),
                createBaseVNode("span", null, toDisplayString(sourceFailed("proxy") || report.value.proxy.enabled === null ? "手动代理状态未知" : report.value.proxy.enabled ? "手动代理已开启" : "手动代理未开启"), 1)
              ]),
              createBaseVNode("dl", _hoisted_20, [
                createBaseVNode("div", null, [
                  _cache[21] || (_cache[21] = createBaseVNode("dt", null, "代理地址", -1)),
                  createBaseVNode("dd", null, toDisplayString(report.value.proxy.server || "未返回配置"), 1)
                ]),
                createBaseVNode("div", null, [
                  _cache[22] || (_cache[22] = createBaseVNode("dt", null, "自动配置脚本（PAC）", -1)),
                  createBaseVNode("dd", null, toDisplayString(report.value.proxy.autoConfigUrl || "未返回配置"), 1)
                ]),
                createBaseVNode("div", null, [
                  _cache[23] || (_cache[23] = createBaseVNode("dt", null, "绕过列表", -1)),
                  createBaseVNode("dd", null, toDisplayString(report.value.proxy.bypass || "未返回配置"), 1)
                ])
              ])
            ]),
            createBaseVNode("div", _hoisted_21, [
              _cache[24] || (_cache[24] = createBaseVNode("strong", null, "WinHTTP 系统代理", -1)),
              createBaseVNode("pre", null, toDisplayString(sourceFailed("winhttp") ? "读取失败" : report.value.winHttp || "没有返回可显示的配置"), 1)
            ]),
            createBaseVNode("div", _hoisted_22, [
              _cache[25] || (_cache[25] = createBaseVNode("strong", null, "Windows VPN 配置", -1)),
              _cache[26] || (_cache[26] = createBaseVNode("p", null, "仅显示 Windows 自带 VPN 配置，不涵盖所有第三方 VPN 或应用内代理。", -1)),
              (openBlock(true), createElementBlock(Fragment, null, renderList(vpnPage.value, (row) => {
                return openBlock(), createElementBlock("div", {
                  key: row.id,
                  class: "vpn-row"
                }, [
                  createBaseVNode("strong", null, toDisplayString(row.name), 1),
                  createBaseVNode("p", null, toDisplayString(row.serverAddress || "服务器未知") + " · " + toDisplayString(row.tunnelType || "类型未知") + " · " + toDisplayString(row.connectionStatus || "状态未知") + " · " + toDisplayString(row.allUserConnection === true ? "所有用户" : row.allUserConnection === false ? "当前用户" : "范围未知"), 1)
                ]);
              }), 128)),
              !report.value.vpn.length ? (openBlock(), createElementBlock("p", _hoisted_23, toDisplayString(sourceFailed("vpnUser") || sourceFailed("vpnAll") ? "VPN 配置未能完整读取。" : "未发现 Windows VPN 配置。"), 1)) : createCommentVNode("", true)
            ]),
            _cache[27] || (_cache[27] = createBaseVNode("p", { class: "tool-note" }, "代理地址可能是已保存但未启用的设置。配置存在不代表故障；本页不检测 PAC 内容、自动发现或应用内代理。", -1))
          ], 64)) : section.value === "connections" ? (openBlock(), createElementBlock(Fragment, { key: 4 }, [
            createBaseVNode("div", _hoisted_24, [
              createBaseVNode("label", null, [
                _cache[29] || (_cache[29] = createTextVNode("连接状态", -1)),
                withDirectives(createBaseVNode("select", {
                  "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => connectionFilter.value = $event),
                  "aria-label": "连接状态"
                }, [..._cache[28] || (_cache[28] = [
                  createStaticVNode('<option value="all" data-v-d9bca5c4>全部记录</option><option value="listen" data-v-d9bca5c4>TCP 监听</option><option value="established" data-v-d9bca5c4>TCP 已建立</option><option value="tcp" data-v-d9bca5c4>TCP</option><option value="udp" data-v-d9bca5c4>UDP 端点</option>', 5)
                ])], 512), [
                  [vModelSelect, connectionFilter.value]
                ])
              ]),
              createBaseVNode("label", null, [
                _cache[30] || (_cache[30] = createTextVNode("搜索连接", -1)),
                withDirectives(createBaseVNode("input", {
                  "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => search.value = $event),
                  type: "search",
                  "aria-label": "搜索连接",
                  placeholder: "进程、PID、地址或端口"
                }, null, 512), [
                  [vModelText, search.value]
                ])
              ])
            ]),
            createBaseVNode("p", null, "匹配 " + toDisplayString(connections.value.length) + " 条连接 / 端点", 1),
            (openBlock(true), createElementBlock(Fragment, null, renderList(connectionPage.value, (row) => {
              return openBlock(), createElementBlock("article", {
                key: row.id,
                class: "network-row connection-row"
              }, [
                createBaseVNode("div", _hoisted_25, [
                  createBaseVNode("strong", null, toDisplayString(row.processName || "进程名不可用") + " · PID " + toDisplayString(row.owningProcess ?? "未知"), 1),
                  createBaseVNode("span", null, toDisplayString(row.protocol === "UDP" ? "UDP 端点" : row.state || "状态未知"), 1)
                ]),
                createBaseVNode("dl", _hoisted_26, [
                  createBaseVNode("div", null, [
                    _cache[31] || (_cache[31] = createBaseVNode("dt", null, "本地地址", -1)),
                    createBaseVNode("dd", null, toDisplayString(unref(networkEndpoint)(row.localAddress, row.localPort)), 1)
                  ]),
                  createBaseVNode("div", null, [
                    _cache[32] || (_cache[32] = createBaseVNode("dt", null, "远端地址", -1)),
                    createBaseVNode("dd", null, toDisplayString(row.protocol === "UDP" ? "UDP 端点不提供远端信息" : unref(networkEndpoint)(row.remoteAddress, row.remotePort)), 1)
                  ])
                ])
              ]);
            }), 128)),
            !connections.value.length ? (openBlock(), createElementBlock("p", _hoisted_27, toDisplayString(sourceFailed("tcp") || sourceFailed("udp") ? "连接信息未能完整读取。" : "没有符合条件的连接或端点。"), 1)) : createCommentVNode("", true),
            _cache[33] || (_cache[33] = createBaseVNode("p", { class: "tool-note" }, "监听端口和外部连接本身不代表风险。进程可能已退出，PID 也可能被复用；这里不推断程序用途或连接安全性。", -1))
          ], 64)) : (openBlock(), createElementBlock(Fragment, { key: 5 }, [
            createBaseVNode("div", _hoisted_28, [
              createBaseVNode("label", null, [
                _cache[35] || (_cache[35] = createTextVNode("Hosts 状态", -1)),
                withDirectives(createBaseVNode("select", {
                  "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => hostsFilter.value = $event),
                  "aria-label": "Hosts 状态"
                }, [..._cache[34] || (_cache[34] = [
                  createBaseVNode("option", { value: "all" }, "全部映射", -1),
                  createBaseVNode("option", { value: "enabled" }, "生效映射", -1),
                  createBaseVNode("option", { value: "disabled" }, "已注释映射", -1),
                  createBaseVNode("option", { value: "duplicate" }, "多条生效映射", -1)
                ])], 512), [
                  [vModelSelect, hostsFilter.value]
                ])
              ]),
              createBaseVNode("label", null, [
                _cache[36] || (_cache[36] = createTextVNode("搜索 Hosts", -1)),
                withDirectives(createBaseVNode("input", {
                  "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => search.value = $event),
                  type: "search",
                  "aria-label": "搜索 Hosts",
                  placeholder: "域名或地址"
                }, null, 512), [
                  [vModelText, search.value]
                ])
              ])
            ]),
            createBaseVNode("p", null, "匹配 " + toDisplayString(hosts.value.length) + " 条映射", 1),
            report.value.hosts.invalidLines ? (openBlock(), createElementBlock("p", _hoisted_29, toDisplayString(report.value.hosts.invalidLines) + " 行非注释内容无法识别为地址映射。", 1)) : createCommentVNode("", true),
            (openBlock(true), createElementBlock(Fragment, null, renderList(hostsPage.value, (row) => {
              return openBlock(), createElementBlock("article", {
                key: row.id,
                class: "network-row hosts-row"
              }, [
                createBaseVNode("div", _hoisted_30, [
                  createBaseVNode("strong", null, toDisplayString(row.host), 1),
                  createBaseVNode("span", null, toDisplayString(row.enabled ? "生效" : "已注释") + toDisplayString(row.duplicate ? " · 多条映射" : ""), 1)
                ]),
                createBaseVNode("p", null, toDisplayString(row.address) + " · 第 " + toDisplayString(row.lineNumber) + " 行", 1)
              ]);
            }), 128)),
            !hosts.value.length ? (openBlock(), createElementBlock("p", _hoisted_31, toDisplayString(sourceFailed("hosts") ? "Hosts 文件未能读取。" : "没有符合条件的地址映射。"), 1)) : createCommentVNode("", true),
            _cache[37] || (_cache[37] = createBaseVNode("p", { class: "tool-note" }, "多条映射可能是正常的 IPv4 / IPv6 配置，不自动视为冲突。本页保留原文件内容。", -1))
          ], 64)),
          pageCount.value > 1 ? (openBlock(), createElementBlock("div", _hoisted_32, [
            createBaseVNode("button", {
              disabled: page.value === 1,
              onClick: _cache[6] || (_cache[6] = ($event) => page.value--)
            }, "上一页", 8, _hoisted_33),
            createBaseVNode("span", null, toDisplayString(page.value) + " / " + toDisplayString(pageCount.value), 1),
            createBaseVNode("button", {
              disabled: page.value >= pageCount.value,
              onClick: _cache[7] || (_cache[7] = ($event) => page.value++)
            }, "下一页", 8, _hoisted_34)
          ])) : createCommentVNode("", true),
          _cache[38] || (_cache[38] = createBaseVNode("p", { class: "tool-note" }, "复制报告包含本机 IP、MAC、进程名和网络配置；仅在点击复制时写入剪贴板。", -1))
        ], 64)) : createCommentVNode("", true)
      ]);
    };
  }
});
const NetworkDiagnosticsPanel = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-d9bca5c4"]]);
export {
  NetworkDiagnosticsPanel as default
};
