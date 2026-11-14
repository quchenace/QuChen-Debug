const cu$1 = "HKCU\\", lm$1 = "HKLM\\";
const multimedia = lm$1 + "SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Multimedia\\SystemProfile";
const explorer = cu$1 + "Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Advanced";
const entries = [];
let tier = "safe";
function add(id, label, impact, props, group = "游戏与调度") {
  entries.push({ id: "v570-" + id, label, impact, tier, defaultSelected: true, group, ...props });
}
function reg(id, label, key, name, data, impact, group = "游戏与调度") {
  add(id, label, impact, { key, name, data }, group);
}
function service(name, label, impact, stopService = true, serviceMode = "disabled") {
  add("service-" + name, label, impact, { service: name, stopService, serviceMode }, "系统服务");
}
function power(id, label, power2, powerData, impact, powerGroup) {
  add(id, label, impact, { power: power2, powerData, powerGroup }, "CPU 与电源");
}
reg("dvr-policy", "关闭 Game DVR 策略", lm$1 + "SOFTWARE\\Microsoft\\PolicyManager\\default\\ApplicationManagement\\AllowGameDVR", "value", 0, "5.7.0 原策略；影响 Windows 游戏捕获。");
reg("recording", "关闭机器级游戏录制", lm$1 + "SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\GameDVR", "AppCaptureEnabled", 0, "影响 Windows 录制；不同系统版本对旧键的支持可能不同。");
reg("dvr", "关闭当前用户 Game DVR", cu$1 + "System\\GameConfigStore", "GameDVR_Enabled", 0, "需要 Windows 游戏录屏时取消对应录制项目。");
reg("mmcss-response", "MMCSS 后台资源预留 10%", multimedia, "SystemResponsiveness", 10, "调整多媒体调度资源比例，需验证游戏和音频稳定性。");
for (const [id, name, data] of [["gpu", "GPU Priority", 8], ["priority", "Priority", 2], ["category", "Scheduling Category", "High"], ["io", "SFIO Priority", "High"]])
  reg("mmcss-" + id, "MMCSS Games · " + name, multimedia + "\\Tasks\\Games", name, data, "保留 5.7.0 参数；仅适用于相关任务，写入不代表系统一定采用或帧率提升。");
add("tcp-autotune", "TCP 接收窗口自动调谐设为 Normal", "恢复旧版 TCP 全局调谐策略；不会改变运营商线路延迟。", { special: "tcp-autotune" }, "网络与后台");
add("rss", "开启接收端缩放 RSS", "需要网卡和驱动支持，不保证游戏延迟降低。", { network: "Rss" }, "网络与后台");
add("tcp-interfaces", "活动网卡 TCPNoDelay 与 ACK 设置", "为当前活动网卡设置 TCPNoDelay=1、TcpAckFrequency=1；影响 TCP，不适用于所有游戏。", { special: "tcp-interfaces" }, "网络与后台");
reg("visual-effects", "旧版桌面视觉效果设置", explorer, "VisualFXSetting", 2, "保留旧版写入位置；实际视觉效果由系统版本决定。", "桌面与输入");
reg("notification-global", "关闭系统通知总开关", cu$1 + "Software\\Microsoft\\Windows\\CurrentVersion\\Notifications\\Settings", "NOC_GLOBAL_SETTING_TOASTS_ENABLED", 0, "可能隐藏消息提醒。", "网络与后台");
reg("notifications", "关闭弹出通知", cu$1 + "Software\\Microsoft\\Windows\\CurrentVersion\\PushNotifications", "ToastEnabled", 0, "会隐藏即时消息等弹出提醒。", "网络与后台");
reg("background-apps", "限制应用后台刷新", cu$1 + "Software\\Microsoft\\Windows\\CurrentVersion\\BackgroundAccessApplications", "GlobalUserDisabled", 1, "可能影响应用通知与后台同步。", "网络与后台");
for (const name of ["DisablePCA", "DisableEngine"]) reg("compat-" + name, "关闭兼容性策略 · " + name, lm$1 + "SOFTWARE\\Policies\\Microsoft\\Windows\\AppCompat", name, 1, "旧软件的兼容性检测与处理可能受影响。", "网络与后台");
reg("maintenance", "关闭系统自动维护", lm$1 + "SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Schedule\\Maintenance", "MaintenanceDisabled", 1, "系统计划维护可能不再自动运行。", "网络与后台");
reg("game-mode", "旧版游戏模式设置", cu$1 + "Software\\Microsoft\\GameBar", "AllowAutoGameMode", 1, "使用 5.7.0 的游戏模式键值；实际支持由 Windows 版本决定。");
reg("throttle-user", "关闭用户 Power Throttling 设置", cu$1 + "Software\\Microsoft\\Windows\\CurrentVersion\\Power\\SystemSettings", "PowerThrottlingOff", 1, "保留旧版设置；可能增加耗电。", "CPU 与电源");
reg("power-throttling", "关闭系统 Power Throttling", lm$1 + "SYSTEM\\CurrentControlSet\\Control\\Power\\PowerThrottling", "PowerThrottlingOff", 1, "关闭后台节能限制，可能增加功耗和温度。", "CPU 与电源");
reg("delivery", "关闭更新对等下载", lm$1 + "SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\DeliveryOptimization\\Config", "DODownloadMode", 0, "使用旧版配置位置，保留 Windows 更新。", "网络与后台");
service("DoSvc", "更新传递优化服务改为手动", "不立即停止服务；更改传递优化启动方式。", false, "demand");
for (const [id, key] of [["machine", lm$1], ["user", cu$1]]) reg("wer-" + id, "关闭错误报告 · " + (id === "machine" ? "系统" : "用户"), key + "SOFTWARE\\Microsoft\\Windows\\Windows Error Reporting", "Disabled", 1, "减少错误报告，可能影响故障诊断。", "网络与后台");
service("WerSvc", "禁用错误报告服务", "减少 Windows 错误报告能力。", false);
reg("usb-registry", "关闭 USB 选择性暂停策略", lm$1 + "SYSTEM\\CurrentControlSet\\Services\\USB", "DisableSelectiveSuspend", 1, "可能增加外设耗电；作用由驱动决定。", "CPU 与电源");
power("usb-ac", "插电时关闭 USB 选择性暂停", "48e6b7a6-50f5-4782-a5d4-53bb8f07e226", 0, "减少 USB 省电暂停，可能增加功耗。", "2a737441-1930-4402-8d77-b2bebba308a3");
tier = "advanced";
service("SysMain", "禁用并停止 SysMain", "关闭预加载，应用冷启动可能变慢。");
reg("system-cache", "关闭大系统缓存策略", lm$1 + "SYSTEM\\CurrentControlSet\\Control\\Session Manager\\Memory Management", "LargeSystemCache", 0, "使用桌面应用缓存策略；通常已是客户端默认值。", "内存策略");
add("page-combining", "关闭内存页合并", "保留旧版意图，修正旧版 MemoryCombining 参数为有效的 PageCombining；可能增加内存占用，内存不足 16GB 时不执行。", { memory: "PageCombining" }, "内存策略");
power("cpu-min", "插电时 CPU 最低状态 100%", "893dee8e-2bef-41e0-89c6-b55d0929964c", 100, "恢复旧版最低状态设置；可能明显增加功耗、温度与风扇噪声。");
power("cpu-max", "插电时 CPU 最高状态 100%", "bc5038f7-23e0-4960-96da-33abaf5935ec", 100, "允许处理器使用最高状态，可能增加功耗。");
power("core-parking", "插电时关闭 CPU 核心停放", "0cc5b647-c1df-4637-891a-dec35c318583", 100, "增加保持可用的核心比例，可能增加功耗和温度。");
service("WSearch", "禁用并停止搜索索引", "开始菜单、文件和邮件搜索可能变慢或受限。");
for (const name of ["MouseSpeed", "MouseThreshold1", "MouseThreshold2"]) reg("mouse-" + name, "鼠标加速度 · " + name, cu$1 + "Control Panel\\Mouse", name, "0", "会改变鼠标指针手感；原始输入游戏可能不受影响。", "桌面与输入");
reg("keyboard-delay", "键盘长按重复等待", cu$1 + "Control Panel\\Keyboard", "KeyboardDelay", "0", "改变文字输入等待，不改变硬件轮询率。", "桌面与输入");
reg("keyboard-speed", "键盘长按重复速度", cu$1 + "Control Panel\\Keyboard", "KeyboardSpeed", "31", "提高长按重复速度；部分设置需重新登录。", "桌面与输入");
for (const [name, label, impact] of [
  ["WpnService", "推送通知", "系统推送通知可能受影响。"],
  ["MapsBroker", "离线地图", "离线地图下载更新受影响。"],
  ["lfsvc", "定位", "系统与应用定位受影响。"],
  ["wisvc", "预览体验", "Windows 预览体验功能受影响。"],
  ["stisvc", "扫描仪图像采集", "扫描仪及 WIA 软件可能不可用。"],
  ["icssvc", "移动热点", "Windows 热点共享可能不可用。"],
  ["PcaSvc", "程序兼容性助手", "旧程序兼容性诊断受影响。"],
  ["WMPNetworkSvc", "媒体网络共享", "局域网媒体共享受影响。"],
  ["OneSyncSvc", "用户同步", "邮件、联系人等同步可能受影响。"],
  ["MessagingService", "消息", "消息功能可能受影响。"],
  ["RetailDemo", "零售演示", "零售演示功能不可用。"],
  ["dmwappushservice", "设备管理推送", "设备管理相关推送可能受影响。"],
  ["WpcMonSvc", "家长控制", "家庭安全监控可能受影响。"]
]) service(name, "禁用并停止" + label + "服务", impact);
reg("menu-delay", "移除菜单等待", cu$1 + "Control Panel\\Desktop", "MenuShowDelay", "0", "恢复旧版 0 毫秒设置，改变桌面交互手感。", "桌面与输入");
reg("transparency", "关闭透明效果", cu$1 + "SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Themes\\Personalize", "EnableTransparency", 0, "改变桌面外观。", "桌面与输入");
reg("foreground", "前台 CPU 调度时间片", lm$1 + "SYSTEM\\CurrentControlSet\\Control\\PriorityControl", "Win32PrioritySeparation", 38, "调整前台与后台任务时间片，需要实测。");
reg("foreground-boost", "旧版 ForegroundBoost 设置", lm$1 + "SYSTEM\\CurrentControlSet\\Control\\PriorityControl", "ForegroundBoost", 1, "保留旧版键值，不宣称该值在所有系统上有效。");
reg("network-throttle", "关闭多媒体网络节流设置", multimedia, "NetworkThrottlingIndex", 4294967295, "更改多媒体网络调度限制，不代表带宽或游戏延迟一定改善。", "网络与后台");
reg("widgets", "关闭小组件策略", lm$1 + "SOFTWARE\\Policies\\Microsoft\\Dsh", "AllowNewsAndInterests", 0, "小组件功能受影响。", "网络与后台");
reg("widgets-taskbar", "关闭任务栏小组件", explorer, "TaskbarDa", 0, "影响 Windows 11 任务栏小组件。", "桌面与输入");
reg("feeds", "关闭资讯和兴趣", cu$1 + "Software\\Microsoft\\Windows\\CurrentVersion\\Feeds", "FeedsEnabled", 0, "影响 Windows 10 资讯和兴趣。", "桌面与输入");
service("WidgetsSvc", "禁用并停止小组件服务", "未安装时跳过；小组件功能受影响。");
tier = "extreme";
for (const [name, label] of [["XblAuthManager", "Xbox 身份验证"], ["XblGameSave", "Xbox 云存档"], ["XboxNetApiSvc", "Xbox 联机"], ["XboxGipSvc", "Xbox 配件管理"]])
  service(name, "禁用并停止" + label + "服务", "可能影响 Xbox / Game Pass 登录、游戏授权、云存档、联机或手柄配件管理。");
reg("settings-sync", "关闭 Microsoft 账户设置同步", cu$1 + "Software\\Microsoft\\Windows\\CurrentVersion\\SettingSync", "SyncPolicy", 5, "恢复 5.7.0 同步策略；影响跨设备设置同步。", "网络与后台");
add("hibernate", "关闭系统休眠", "执行 powercfg /hibernate off；影响休眠、混合睡眠及快速启动，恢复时重建休眠文件。", { special: "hibernate" }, "CPU 与电源");
const FPS_570_SETTINGS = entries;
const cu = "HKCU\\";
const lm = "HKLM\\";
const RECOVERY_SETTINGS = [
  { id: "game-mode", defaultSelected: true, label: "开启 Windows 游戏模式", tier: "safe", impact: "开启系统游戏模式；不保证所有游戏帧率提升。", key: cu + "Software\\Microsoft\\GameBar", name: "AutoGameModeEnabled", data: 1 },
  { id: "recording", label: "关闭游戏后台录制", tier: "safe", impact: "停止 Windows 游戏捕获；需要录屏时取消此项。", key: cu + "Software\\Microsoft\\Windows\\CurrentVersion\\GameDVR", name: "AppCaptureEnabled", data: 0 },
  { id: "dvr", label: "关闭 Game DVR 捕获", tier: "safe", impact: "与后台录制配套，不卸载 Game Bar。", key: cu + "System\\GameConfigStore", name: "GameDVR_Enabled", data: 0 },
  { id: "delivery", defaultSelected: true, label: "关闭更新的对等下载", tier: "safe", impact: "仅关闭 P2P 分发，保留 Windows 更新服务。", key: lm + "SOFTWARE\\Policies\\Microsoft\\Windows\\DeliveryOptimization", name: "DODownloadMode", data: 0 },
  { id: "transparency", label: "关闭桌面透明效果", tier: "advanced", impact: "改变桌面外观；部分界面需重新登录。", key: cu + "SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Themes\\Personalize", name: "EnableTransparency", data: 0 },
  { id: "menu-delay", label: "缩短桌面菜单展开等待", tier: "advanced", impact: "调整桌面菜单等待时间，不等同于降低游戏输入延迟。", key: cu + "Control Panel\\Desktop", name: "MenuShowDelay", data: "100" },
  { id: "mouse-speed", label: "关闭鼠标指针加速度", tier: "advanced", impact: "会改变桌面指针手感；使用原始输入的游戏可能不受影响。", key: cu + "Control Panel\\Mouse", name: "MouseSpeed", data: "0" },
  { id: "mouse-threshold-a", label: "清除鼠标加速第一阈值", tier: "advanced", impact: "与关闭指针加速度配套。", key: cu + "Control Panel\\Mouse", name: "MouseThreshold1", data: "0" },
  { id: "mouse-threshold-b", label: "清除鼠标加速第二阈值", tier: "advanced", impact: "与关闭指针加速度配套。", key: cu + "Control Panel\\Mouse", name: "MouseThreshold2", data: "0" },
  { id: "keyboard-delay", label: "缩短键盘长按重复等待", tier: "advanced", impact: "影响文字重复输入，不改变键盘硬件轮询率。", key: cu + "Control Panel\\Keyboard", name: "KeyboardDelay", data: "0" },
  { id: "keyboard-speed", label: "提高键盘长按重复速度", tier: "advanced", impact: "按 Windows 支持的上限设置；需重新登录。", key: cu + "Control Panel\\Keyboard", name: "KeyboardSpeed", data: "31" },
  { id: "core-parking", label: "插电时提高 CPU 核心可用比例", tier: "extreme", impact: "关闭当前方案的交流电核心停放；可能增加功耗与温度，不锁定最低频率。", power: "0cc5b647-c1df-4637-891a-dec35c318583" },
  { id: "widgets", label: "关闭 Windows 小组件", tier: "extreme", impact: "会影响小组件功能；由系统版本和版本策略支持决定。", key: lm + "SOFTWARE\\Policies\\Microsoft\\Dsh", name: "AllowNewsAndInterests", data: 0 },
  { id: "background-apps", label: "限制商店应用后台活动", tier: "extreme", impact: "可能影响应用通知和后台同步；不结束正在运行的程序。", key: cu + "Software\\Microsoft\\Windows\\CurrentVersion\\BackgroundAccessApplications", name: "GlobalUserDisabled", data: 1 },
  { id: "mmcss-response", label: "MMCSS 后台资源预留调整为 10%", tier: "safe", impact: "调整多媒体调度的资源预留比例；只影响参与 MMCSS 的任务，需测试游戏和音频稳定性。", key: lm + "SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Multimedia\\SystemProfile", name: "SystemResponsiveness", data: 10 },
  { id: "mmcss-games", label: "提高 MMCSS Games 调度类别", tier: "safe", impact: "将注册为 Games 的多媒体任务设为 High；并非所有游戏都会使用此任务类别。", key: lm + "SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Multimedia\\SystemProfile\\Tasks\\Games", name: "Scheduling Category", data: "High" },
  { id: "notifications", label: "关闭当前用户的弹出通知", tier: "safe", impact: "减少通知打扰，也会隐藏即时消息提醒；不是帧率保证。", key: cu + "Software\\Microsoft\\Windows\\CurrentVersion\\PushNotifications", name: "ToastEnabled", data: 0 },
  { id: "window-animation", label: "关闭窗口最小化和还原动画", tier: "advanced", impact: "改变桌面窗口动画；重新登录后生效。", key: cu + "Control Panel\\Desktop\\WindowMetrics", name: "MinAnimate", data: "0" },
  { id: "taskbar-animation", label: "关闭任务栏动画", tier: "advanced", impact: "减少任务栏动画效果；需重启资源管理器或重新登录。", key: cu + "Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Advanced", name: "TaskbarAnimations", data: 0 },
  { id: "foreground-scheduling", label: "使用前台程序优先调度策略", tier: "advanced", impact: "调整前台调度时间片；会影响后台负载，系统已采用此值时不会重复写入。", key: lm + "SYSTEM\\CurrentControlSet\\Control\\PriorityControl", name: "Win32PrioritySeparation", data: 38 },
  { id: "system-cache", defaultSelected: true, label: "使用桌面应用缓存策略", tier: "advanced", impact: "关闭 LargeSystemCache 策略；通常已是客户端默认值，不清空内存，也不保证提升 FPS。", key: lm + "SYSTEM\\CurrentControlSet\\Control\\Session Manager\\Memory Management", name: "LargeSystemCache", data: 0 },
  { id: "page-combining", label: "关闭内存页合并", tier: "advanced", impact: "实验项：减少页合并处理，但可能增加内存占用；不关闭内存压缩，内存不足 16GB 时不可选。", memory: "PageCombining" },
  { id: "network-rss", defaultSelected: true, label: "开启接收端缩放 RSS", tier: "advanced", impact: "允许支持 RSS 的网卡分散接收处理负载；不会降低线路延迟，受网卡及驱动支持限制。", network: "Rss" },
  { id: "cpu-max", label: "允许插电时处理器使用 100% 最大状态", tier: "advanced", impact: "解除当前方案的处理器最大状态限制；不锁定最低频率，可能增加功耗和温度。", power: "bc5038f7-23e0-4960-96da-33abaf5935ec" },
  { id: "service-sysmain", label: "禁用 SysMain 自动启动", tier: "advanced", impact: "重启后减少预加载活动，但应用启动可能变慢；不会立即停止正在运行的服务。", service: "SysMain" },
  { id: "service-search", label: "禁用 Windows 搜索索引服务", tier: "advanced", impact: "重启后停止索引服务；开始菜单、文件与邮件搜索可能变慢或受限。", service: "WSearch" },
  { id: "service-maps", label: "禁用离线地图下载服务", tier: "advanced", impact: "重启后不再自动下载和更新离线地图。", service: "MapsBroker" },
  { id: "service-location", label: "禁用定位服务", tier: "advanced", impact: "重启后影响系统和应用的位置检测。", service: "lfsvc" },
  { id: "service-hotspot", label: "禁用移动热点服务", tier: "advanced", impact: "重启后无法正常使用 Windows 移动热点共享网络。", service: "icssvc" },
  { id: "service-scanner", label: "禁用扫描仪图像采集服务", tier: "advanced", impact: "重启后可能影响扫描仪和依赖 WIA 的图像采集软件。", service: "stisvc" },
  { id: "power-throttling", label: "关闭系统 Power Throttling 策略", tier: "extreme", impact: "减少系统后台节能限制，可能增加后台耗电；不是强制提高前台游戏频率。", key: lm + "SYSTEM\\CurrentControlSet\\Control\\Power\\PowerThrottling", name: "PowerThrottlingOff", data: 1 },
  { id: "error-reporting", label: "关闭 Windows 错误报告", tier: "extreme", impact: "停止错误报告收集策略，降低问题诊断能力；不会修复崩溃，需要诊断报告时取消此项。", key: lm + "SOFTWARE\\Microsoft\\Windows\\Windows Error Reporting", name: "Disabled", data: 1 },
  { id: "settings-sync", label: "关闭 Windows 设置同步", tier: "extreme", impact: "影响 Microsoft 账户跨设备的系统设置同步，不是关闭 OneDrive 文件同步。", key: lm + "SOFTWARE\\Policies\\Microsoft\\Windows\\SettingSync", name: "DisableSettingSync", data: 2 },
  { id: "service-xbox-auth", label: "禁用 Xbox 身份验证服务", tier: "extreme", impact: "重启后可能影响 Xbox 登录与 Game Pass 游戏授权。", service: "XblAuthManager" },
  { id: "service-xbox-save", label: "禁用 Xbox 游戏存档服务", tier: "extreme", impact: "重启后可能影响 Xbox 游戏云存档同步。", service: "XblGameSave" },
  { id: "service-xbox-network", label: "禁用 Xbox 网络服务", tier: "extreme", impact: "重启后可能影响 Xbox 联机与网络功能。", service: "XboxNetApiSvc" },
  { id: "service-xbox-accessory", label: "禁用 Xbox 配件管理服务", tier: "extreme", impact: "重启后可能影响 Xbox 手柄与配件管理功能。", service: "XboxGipSvc" },
  { id: "service-compatibility", label: "禁用程序兼容性助手服务", tier: "extreme", impact: "重启后不再自动检测部分程序兼容性问题，旧软件可能需要手动处理。", service: "PcaSvc" },
  { id: "service-media-sharing", label: "禁用媒体网络共享服务", tier: "extreme", impact: "重启后影响 Windows Media Player 的局域网媒体共享；未安装时不可选。", service: "WMPNetworkSvc" }
];
const FPS_SETTINGS = [...RECOVERY_SETTINGS, ...FPS_570_SETTINGS];
function fpsPlan(tier2) {
  const tiers = ["safe", "advanced", "extreme"];
  if (!tiers.includes(tier2)) throw Error("无效的优化档位");
  return FPS_570_SETTINGS.filter((item) => tiers.indexOf(item.tier) <= tiers.indexOf(tier2));
}
const FPS_GROUPS = ["游戏与调度", "网络与后台", "桌面与输入", "内存策略", "CPU 与电源", "系统服务"];
function fpsSettingGroup(id) {
  const s = FPS_SETTINGS.find((item) => item.id === id);
  if (s?.group) return s.group;
  if (s?.service) return "系统服务";
  if (s?.memory || id === "system-cache") return "内存策略";
  if (s?.power || id === "power-throttling") return "CPU 与电源";
  if (s?.network || ["delivery", "notifications", "widgets", "background-apps", "error-reporting", "settings-sync"].includes(id)) return "网络与后台";
  if (["game-mode", "recording", "dvr", "mmcss-response", "mmcss-games", "foreground-scheduling"].includes(id)) return "游戏与调度";
  return "桌面与输入";
}
export {
  FPS_GROUPS as F,
  fpsSettingGroup as a,
  fpsPlan as f
};
