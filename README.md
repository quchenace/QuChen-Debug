# QuChen调试

> Windows 桌面端的 PC 优化与游戏辅助工具（Electron）。本仓库为 **QuChen调试 6.2.0** 的应用源码与构建配置，安装包通过 GitHub Releases 分发。

---

## 一、项目简介

QuChen调试 是一款面向 Windows 的桌面调优软件，覆盖系统体检、性能优化、显卡与进程调度、音频处理、硬件行情和游戏辅助等场景。

- 应用名：`QuChen调试`
- 版本：`6.2.0`
- 平台：Windows 10 / 11 x64
- 分发：NSIS 安装包（支持自定义安装目录），自动检测更新
- 数据目录：`%APPDATA%\supreme-debugger`（沿用历史目录名，升级后自动继承旧配置与恢复档案）

---

## 二、功能清单

| 模块 | 能力 |
|---|---|
| 系统体检 | 分阶段检测并给出评分与建议；一键应用前逐项备份原值，写入后回读核验 |
| 深度优化 | 按项目应用与还原系统设置；不支持的项显示原因并跳过 |
| 三档一键优化 | 基础电竞 / 极致流畅 / 极限竞技，高档包含低档；可逐项取消，支持完整恢复 |
| 电源管理 | 区分 Windows 电源模式与经典电源计划，按设备与供电状态筛选 |
| 显卡优化 | NVIDIA 驱动级全局与按游戏配置、帧率上限、DLSS 预设、功耗与温度只读检测 |
| 进程调度器 | CPU Sets、传统亲和性、优先级与自动规则，保留原值并可恢复 |
| 音频均衡器 | 引擎开关、参数调节、设备选择与社区方案导入 |
| 游戏性能报告 | 帧率、1% Low、帧时间采集与历史对照，支持 HTML / CSV / JSON 导出 |
| 方案社区 | 系统设置、画质滤镜、音频均衡器、游戏准星四类方案的发布与应用 |
| 硬件行情 | CPU / 显卡 / 内存 / 硬盘参考报价、走势图与自选收藏 |
| 三角洲助手 | 地图站、每日密码、改枪码与收藏入口 |
| 工具箱 | 键盘测试、DPI 校准、显示测试、运行库检测、启动项与磁盘分析等 |
| 备份中心 | 操作历史、状态核验与撤销入口，按批次恢复 |
| 诊断修复 | 功能核验、驱动清单、硬件与系统、网络诊断、故障线索与场景修复 |

> 具体变更以 `resources/changelog.json` 为准，应用内「更新日志」与此文件同源。

---

## 三、更新机制

应用使用两条并行链路，均指向本仓库的 Releases：

1. **electron-updater**：读取 `latest.yml`，校验 SHA-512 后下载安装包。
2. **自定义更新器**：额外读取 `changelog.json` 展示更新说明，下载完成后校验并启动安装。

更新地址：

```
https://github.com/quchenace/QuChen-Debug/releases/latest/download/latest.yml
https://github.com/quchenace/QuChen-Debug/releases/latest/download/changelog.json
```

实现要点：

- 仅允许 HTTPS，主机白名单为 `github.com`、`objects.githubusercontent.com`、`release-assets.githubusercontent.com`
- 支持最多 5 次 300–399 重定向（Releases 资产会跳转到 `release-assets.githubusercontent.com`）
- 共享总超时，响应体上限 1 MiB
- 不做静默强制安装：自动安装仅在退出时按配置执行

---

## 四、技术栈与目录结构

| 组件 | 技术 |
|---|---|
| 桌面框架 | Electron 28.3.3 |
| 打包 | electron-builder（NSIS，x64，`--prepackaged`） |
| 前端 | Vue 3.5 + Vue Router 4.5 + Element Plus 2.14 |
| 3D 背景 | OGL |
| 更新 | electron-updater 6.8.3 + 自定义元数据读取 |
| 系统能力 | 原生模块（`.node`）、PowerShell、注册表与 WMI |
| 显示器控制 | `@ddc-node/ddc-node`（DDC/CI） |

```
QuChen-Debug/
├── app/                        # 应用源码
│   ├── out/
│   │   ├── main/index.js       # Electron 主进程（窗口、更新、系统调用、IPC）
│   │   ├── preload/            # 预加载脚本（index.js / platform.js）
│   │   └── renderer/           # 渲染层（页面、组件、样式、图片资源）
│   └── package.json            # 应用依赖声明与入口
├── resources/                  # 随应用分发的资源
│   ├── app-update.yml          # 更新提供方配置
│   ├── changelog.json          # 更新日志（与 Release 资产同步）
│   └── display-check.html      # 显示检测页
├── builder.json                # electron-builder 构建配置
└── README.md
```

**不入库的目录**：`app/node_modules`（依赖安装生成）、`dist`（ASAR 产物）、`staging`（打包暂存与 Electron 运行时）、`release`（安装包与元数据）、`backup`（回滚备份）。见 `.gitignore`。

---

## 五、开发与构建

### 环境

- Node.js 22.x
- npm
- Windows 构建机（原生模块与 NSIS 需在 Windows 上打包）

### 安装依赖

```bash
cd app
npm install
```

### 打包流程

1. **打包 ASAR**（原生模块不压缩进归档）

```bash
npx @electron/asar pack app dist/app.asar --unpack "*.node"
```

2. **写入完整性指纹**：计算 `dist/app.asar` 的 SHA-256，写入 `resources/integrity.json`，供安装后自检使用。必须在封装安装包之前完成。

3. **生成安装包**（基于已准备好的 Electron 目录，避免重复下载）

```bash
npx electron-builder --prepackaged staging --win nsis --x64 --config builder.json
```

4. **写入 EXE 版本信息**（可选）

```bash
rcedit "release/QuChen调试.exe" --set-file-version 6.2.0 --set-product-version 6.2.0
```

产物：`release/QuChen-Debug-Setup-6.2.0.exe`、同名 `.blockmap`、`latest.yml`。

> `builder.json` 中 `electronVersion` 必须显式指定为 `28.3.3`，否则 electron-builder 无法从 `--prepackaged` 目录推断版本。

---

## 六、发布流程

Release 需上传 4 个资产：

| 资产 | 说明 |
|---|---|
| `QuChen-Debug-Setup-<version>.exe` | 安装包 |
| `QuChen-Debug-Setup-<version>.exe.blockmap` | 增量更新分块索引 |
| `latest.yml` | 版本、URL、SHA-512、大小、发布时间 |
| `changelog.json` | 更新日志 |

发布前检查：

1. `latest.yml` 中的 `version`、`sha512`、`size` 与实际安装包一致
2. `changelog.json` 首条版本号与 `latest.yml` 一致
3. 仓库根目录的 `latest.yml` 与 Release 资产保持一致（供无重定向场景兜底）

---

## 七、说明

- 本仓库只包含应用源码与构建配置，不包含运行时数据、用户配置与恢复档案。
- 修改系统设置类功能均带原值备份与回读核验，使用前建议创建系统还原点。
- 显卡驱动写入、服务调整、电源方案修改在部分硬件或权限环境下可能被拒绝，应用会显示系统返回的真实错误。

---

## 八、联系方式

- 仓库：<https://github.com/quchenace/QuChen-Debug>
- 下载：<https://github.com/quchenace/QuChen-Debug/releases>
