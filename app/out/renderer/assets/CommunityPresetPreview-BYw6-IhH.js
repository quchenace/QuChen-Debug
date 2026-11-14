import { t as defineComponent, a5 as openBlock, l as createElementBlock, S as normalizeClass, F as Fragment, i as createBaseVNode, as as unref, V as normalizeStyle, aG as withDirectives, aA as vModelText, k as createCommentVNode, q as createTextVNode, ab as renderList, ak as toDisplayString, j as createBlock, g as computed, a9 as ref, _ as _export_sfc } from "./main-DAqTdO6U.js";
import { c as computeLUT } from "./lutMath-Du8bBTzw.js";
import { f as fpsPlan } from "./fpsPlan-BV2AClQh.js";
import { L as LegacyCrosshairPreview } from "./LegacyCrosshairPreview-DwpWYNlI.js";
const data = {
  "categories": [
    {
      "id": "FpsDepthTweaks",
      "label": "性能深度调优"
    },
    {
      "id": "PeripheralTweaks",
      "label": "外设优化"
    },
    {
      "id": "NetDepthTweaks",
      "label": "网络深度优化"
    },
    {
      "id": "AudioTweaks",
      "label": "音频优化"
    },
    {
      "id": "PrivacyTweaks",
      "label": "隐私防护"
    },
    {
      "id": "ExplorerTweaks",
      "label": "资源管理器调优"
    },
    {
      "id": "TaskTweaks",
      "label": "计划任务裁剪"
    },
    {
      "id": "ServiceTweaks2",
      "label": "服务优化"
    }
  ],
  "settings": [
    {
      "id": "f7749630f384ba32a96d2bf7e2a502317d9ce1997aac26c7abf948ac7a9518b0",
      "label": "关闭 Windows 自动更新策略",
      "category": "性能深度调优",
      "categoryId": "FpsDepthTweaks",
      "level": 2,
      "aliases": [
        {
          "category": "性能深度调优",
          "categoryId": "FpsDepthTweaks",
          "label": "关闭 Windows 自动更新策略"
        }
      ],
      "options": [
        {
          "id": "unset",
          "label": "未配置",
          "value": null
        },
        {
          "id": "v-3eb2f7bb1fa0bb2f3b1ca7a7071ff39e",
          "label": "调整选项 · 1",
          "value": {
            "kind": "DWord",
            "data": 1
          }
        },
        {
          "id": "v-fee7da91b6fbd7504ee5455a1b3c6487",
          "label": "默认选项 · 0",
          "value": {
            "kind": "DWord",
            "data": 0
          }
        }
      ],
      "target": {
        "kind": "registry",
        "path": "HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\WindowsUpdate\\AU",
        "name": "NoAutoUpdate"
      }
    },
    {
      "id": "4ff9b7e84a5f67dc22df55a8154ee3bdbc031d881c15d40356b41806484638d4",
      "label": "阻止自动安装驱动更新",
      "category": "性能深度调优",
      "categoryId": "FpsDepthTweaks",
      "level": 2,
      "aliases": [
        {
          "category": "性能深度调优",
          "categoryId": "FpsDepthTweaks",
          "label": "阻止自动安装驱动更新"
        }
      ],
      "options": [
        {
          "id": "unset",
          "label": "未配置",
          "value": null
        },
        {
          "id": "v-3eb2f7bb1fa0bb2f3b1ca7a7071ff39e",
          "label": "调整选项 · 1",
          "value": {
            "kind": "DWord",
            "data": 1
          }
        },
        {
          "id": "v-fee7da91b6fbd7504ee5455a1b3c6487",
          "label": "默认选项 · 0",
          "value": {
            "kind": "DWord",
            "data": 0
          }
        }
      ],
      "target": {
        "kind": "registry",
        "path": "HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\WindowsUpdate",
        "name": "ExcludeWUDriversInQualityUpdate"
      }
    },
    {
      "id": "076789a2181cc77e654b082eedeaa7545c576f6002198bc77f66bb77dc10aa19",
      "label": "关闭商店应用自动更新 · AutoDownload",
      "category": "性能深度调优",
      "categoryId": "FpsDepthTweaks",
      "level": 2,
      "aliases": [
        {
          "category": "性能深度调优",
          "categoryId": "FpsDepthTweaks",
          "label": "关闭商店应用自动更新"
        }
      ],
      "options": [
        {
          "id": "unset",
          "label": "未配置",
          "value": null
        },
        {
          "id": "v-b890d43c0a1fc60d0dc8c9217ad2d002",
          "label": "调整选项 · 2",
          "value": {
            "kind": "DWord",
            "data": 2
          }
        },
        {
          "id": "v-fee7da91b6fbd7504ee5455a1b3c6487",
          "label": "默认选项 · 0",
          "value": {
            "kind": "DWord",
            "data": 0
          }
        }
      ],
      "target": {
        "kind": "registry",
        "path": "HKCU\\SOFTWARE\\Policies\\Microsoft\\WindowsStore",
        "name": "AutoDownload"
      }
    },
    {
      "id": "66955994413b35e6ca28244342daac90bb69bdcd0eee446ad98a1ccb8cbc8b90",
      "label": "关闭商店应用自动更新 · AutoDownload",
      "category": "性能深度调优",
      "categoryId": "FpsDepthTweaks",
      "level": 2,
      "aliases": [
        {
          "category": "性能深度调优",
          "categoryId": "FpsDepthTweaks",
          "label": "关闭商店应用自动更新"
        }
      ],
      "options": [
        {
          "id": "unset",
          "label": "未配置",
          "value": null
        },
        {
          "id": "v-b890d43c0a1fc60d0dc8c9217ad2d002",
          "label": "调整选项 · 2",
          "value": {
            "kind": "DWord",
            "data": 2
          }
        },
        {
          "id": "v-fee7da91b6fbd7504ee5455a1b3c6487",
          "label": "默认选项 · 0",
          "value": {
            "kind": "DWord",
            "data": 0
          }
        }
      ],
      "target": {
        "kind": "registry",
        "path": "HKLM\\SOFTWARE\\Policies\\Microsoft\\WindowsStore",
        "name": "AutoDownload"
      }
    },
    {
      "id": "a0674cce0eada12acd53cf8c08615ce45f1d2af1a6d5a89145a65f04a3dae52e",
      "label": "限制 UWP 应用后台运行",
      "category": "性能深度调优",
      "categoryId": "FpsDepthTweaks",
      "level": 2,
      "aliases": [
        {
          "category": "性能深度调优",
          "categoryId": "FpsDepthTweaks",
          "label": "限制 UWP 应用后台运行"
        }
      ],
      "options": [
        {
          "id": "unset",
          "label": "未配置",
          "value": null
        },
        {
          "id": "v-3eb2f7bb1fa0bb2f3b1ca7a7071ff39e",
          "label": "调整选项 · 1",
          "value": {
            "kind": "DWord",
            "data": 1
          }
        },
        {
          "id": "v-fee7da91b6fbd7504ee5455a1b3c6487",
          "label": "默认选项 · 0",
          "value": {
            "kind": "DWord",
            "data": 0
          }
        }
      ],
      "target": {
        "kind": "registry",
        "path": "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\BackgroundAccessApplications",
        "name": "GlobalUserDisabled"
      }
    },
    {
      "id": "74da2ebf6fc6e61300a0ca55cd66dc8615396d562582845f720a74253e8837ce",
      "label": "关闭全局通知横幅",
      "category": "性能深度调优",
      "categoryId": "FpsDepthTweaks",
      "level": 2,
      "aliases": [
        {
          "category": "性能深度调优",
          "categoryId": "FpsDepthTweaks",
          "label": "关闭全局通知横幅"
        }
      ],
      "options": [
        {
          "id": "unset",
          "label": "未配置",
          "value": null
        },
        {
          "id": "v-3eb2f7bb1fa0bb2f3b1ca7a7071ff39e",
          "label": "默认选项 · 1",
          "value": {
            "kind": "DWord",
            "data": 1
          }
        },
        {
          "id": "v-fee7da91b6fbd7504ee5455a1b3c6487",
          "label": "调整选项 · 0",
          "value": {
            "kind": "DWord",
            "data": 0
          }
        }
      ],
      "target": {
        "kind": "registry",
        "path": "HKCU\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\PushNotifications",
        "name": "ToastEnabled"
      }
    },
    {
      "id": "50917c7bbd9f0f2c0439bd9a6a6b5191ba753d5c11748757c556c55458df44ff",
      "label": "关闭 Edge 启动加速",
      "category": "性能深度调优",
      "categoryId": "FpsDepthTweaks",
      "level": 1,
      "aliases": [
        {
          "category": "性能深度调优",
          "categoryId": "FpsDepthTweaks",
          "label": "关闭 Edge 启动加速"
        }
      ],
      "options": [
        {
          "id": "unset",
          "label": "未配置",
          "value": null
        },
        {
          "id": "v-3eb2f7bb1fa0bb2f3b1ca7a7071ff39e",
          "label": "默认选项 · 1",
          "value": {
            "kind": "DWord",
            "data": 1
          }
        },
        {
          "id": "v-fee7da91b6fbd7504ee5455a1b3c6487",
          "label": "调整选项 · 0",
          "value": {
            "kind": "DWord",
            "data": 0
          }
        }
      ],
      "target": {
        "kind": "registry",
        "path": "HKLM\\SOFTWARE\\Policies\\Microsoft\\Edge",
        "name": "StartupBoostEnabled"
      }
    },
    {
      "id": "073bbb291797bf5201e6b1952fddc62bd848748fd57af9f5263d7e3d003a2879",
      "label": "关闭离线地图自动更新",
      "category": "性能深度调优",
      "categoryId": "FpsDepthTweaks",
      "level": 2,
      "aliases": [
        {
          "category": "性能深度调优",
          "categoryId": "FpsDepthTweaks",
          "label": "关闭离线地图自动更新"
        }
      ],
      "options": [
        {
          "id": "unset",
          "label": "未配置",
          "value": null
        },
        {
          "id": "v-3eb2f7bb1fa0bb2f3b1ca7a7071ff39e",
          "label": "默认选项 · 1",
          "value": {
            "kind": "DWord",
            "data": 1
          }
        },
        {
          "id": "v-fee7da91b6fbd7504ee5455a1b3c6487",
          "label": "调整选项 · 0",
          "value": {
            "kind": "DWord",
            "data": 0
          }
        }
      ],
      "target": {
        "kind": "registry",
        "path": "HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\Maps",
        "name": "AutoDownloadAndUpdateMapData"
      }
    },
    {
      "id": "5be84d27083f9eb7a3830365f29643518f70bf7b52c5de98f99ca9e69d6f8856",
      "label": "关闭 Game Bar 启动提示",
      "category": "性能深度调优",
      "categoryId": "FpsDepthTweaks",
      "level": 1,
      "aliases": [
        {
          "category": "性能深度调优",
          "categoryId": "FpsDepthTweaks",
          "label": "关闭 Game Bar 启动提示"
        }
      ],
      "options": [
        {
          "id": "unset",
          "label": "未配置",
          "value": null
        },
        {
          "id": "v-3eb2f7bb1fa0bb2f3b1ca7a7071ff39e",
          "label": "默认选项 · 1",
          "value": {
            "kind": "DWord",
            "data": 1
          }
        },
        {
          "id": "v-fee7da91b6fbd7504ee5455a1b3c6487",
          "label": "调整选项 · 0",
          "value": {
            "kind": "DWord",
            "data": 0
          }
        }
      ],
      "target": {
        "kind": "registry",
        "path": "HKCU\\SOFTWARE\\Microsoft\\GameBar",
        "name": "ShowStartupPanel"
      }
    },
    {
      "id": "ebe77f715649104b85c91aba8bf6e6437c44d3839e751c85a300f5a7b4cef62e",
      "label": "手柄 Xbox 键不打开 Game Bar",
      "category": "性能深度调优",
      "categoryId": "FpsDepthTweaks",
      "level": 1,
      "aliases": [
        {
          "category": "性能深度调优",
          "categoryId": "FpsDepthTweaks",
          "label": "手柄 Xbox 键不打开 Game Bar"
        },
        {
          "category": "外设优化",
          "categoryId": "PeripheralTweaks",
          "label": "关闭手柄 Xbox 键打开 Game Bar"
        }
      ],
      "options": [
        {
          "id": "unset",
          "label": "未配置",
          "value": null
        },
        {
          "id": "v-3eb2f7bb1fa0bb2f3b1ca7a7071ff39e",
          "label": "默认选项 · 1",
          "value": {
            "kind": "DWord",
            "data": 1
          }
        },
        {
          "id": "v-fee7da91b6fbd7504ee5455a1b3c6487",
          "label": "调整选项 · 0",
          "value": {
            "kind": "DWord",
            "data": 0
          }
        }
      ],
      "target": {
        "kind": "registry",
        "path": "HKCU\\SOFTWARE\\Microsoft\\GameBar",
        "name": "UseNexusForGameBarEnabled"
      }
    },
    {
      "id": "8cf345bd6ae06133ebef3602b7a04596551f1a4bffccdb9643a074b6f8639926",
      "label": "开启系统游戏模式",
      "category": "性能深度调优",
      "categoryId": "FpsDepthTweaks",
      "level": 1,
      "aliases": [
        {
          "category": "性能深度调优",
          "categoryId": "FpsDepthTweaks",
          "label": "开启系统游戏模式"
        }
      ],
      "options": [
        {
          "id": "unset",
          "label": "未配置",
          "value": null
        },
        {
          "id": "v-3eb2f7bb1fa0bb2f3b1ca7a7071ff39e",
          "label": "调整选项 · 1",
          "value": {
            "kind": "DWord",
            "data": 1
          }
        },
        {
          "id": "v-fee7da91b6fbd7504ee5455a1b3c6487",
          "label": "默认选项 · 0",
          "value": {
            "kind": "DWord",
            "data": 0
          }
        }
      ],
      "target": {
        "kind": "registry",
        "path": "HKCU\\SOFTWARE\\Microsoft\\GameBar",
        "name": "AutoGameModeEnabled"
      }
    },
    {
      "id": "57b07d353f53b3b401da9a88325ad45bb7fda484ce6a61cba0c0a993033babb9",
      "label": "关闭 Game DVR 录制策略",
      "category": "性能深度调优",
      "categoryId": "FpsDepthTweaks",
      "level": 2,
      "aliases": [
        {
          "category": "性能深度调优",
          "categoryId": "FpsDepthTweaks",
          "label": "关闭 Game DVR 录制策略"
        }
      ],
      "options": [
        {
          "id": "unset",
          "label": "未配置",
          "value": null
        },
        {
          "id": "v-3eb2f7bb1fa0bb2f3b1ca7a7071ff39e",
          "label": "默认选项 · 1",
          "value": {
            "kind": "DWord",
            "data": 1
          }
        },
        {
          "id": "v-fee7da91b6fbd7504ee5455a1b3c6487",
          "label": "调整选项 · 0",
          "value": {
            "kind": "DWord",
            "data": 0
          }
        }
      ],
      "target": {
        "kind": "registry",
        "path": "HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\GameDVR",
        "name": "AllowGameDVR"
      }
    },
    {
      "id": "070a343a076bea38f08c2ca861016c81b2c4ab371ea86fcf1042fe0f896f7239",
      "label": "关闭 Game DVR 捕获入口 · GameDVR_Enabled",
      "category": "性能深度调优",
      "categoryId": "FpsDepthTweaks",
      "level": 2,
      "aliases": [
        {
          "category": "性能深度调优",
          "categoryId": "FpsDepthTweaks",
          "label": "关闭 Game DVR 捕获入口"
        }
      ],
      "options": [
        {
          "id": "unset",
          "label": "未配置",
          "value": null
        },
        {
          "id": "v-3eb2f7bb1fa0bb2f3b1ca7a7071ff39e",
          "label": "默认选项 · 1",
          "value": {
            "kind": "DWord",
            "data": 1
          }
        },
        {
          "id": "v-fee7da91b6fbd7504ee5455a1b3c6487",
          "label": "调整选项 · 0",
          "value": {
            "kind": "DWord",
            "data": 0
          }
        }
      ],
      "target": {
        "kind": "registry",
        "path": "HKCU\\System\\GameConfigStore",
        "name": "GameDVR_Enabled"
      }
    },
    {
      "id": "2e10ad9632da59f49d7459690ca2fca2c40e8780cf5408587868c5bc78f1bf43",
      "label": "关闭 Game DVR 捕获入口 · AppCaptureEnabled",
      "category": "性能深度调优",
      "categoryId": "FpsDepthTweaks",
      "level": 2,
      "aliases": [
        {
          "category": "性能深度调优",
          "categoryId": "FpsDepthTweaks",
          "label": "关闭 Game DVR 捕获入口"
        }
      ],
      "options": [
        {
          "id": "unset",
          "label": "未配置",
          "value": null
        },
        {
          "id": "v-3eb2f7bb1fa0bb2f3b1ca7a7071ff39e",
          "label": "默认选项 · 1",
          "value": {
            "kind": "DWord",
            "data": 1
          }
        },
        {
          "id": "v-fee7da91b6fbd7504ee5455a1b3c6487",
          "label": "调整选项 · 0",
          "value": {
            "kind": "DWord",
            "data": 0
          }
        }
      ],
      "target": {
        "kind": "registry",
        "path": "HKCU\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\GameDVR",
        "name": "AppCaptureEnabled"
      }
    },
    {
      "id": "e43c270afc37122286376100aefcef291a23f35bea7c71976758d9571c242123",
      "label": "禁用 SmartScreen",
      "category": "性能深度调优",
      "categoryId": "FpsDepthTweaks",
      "level": 3,
      "aliases": [
        {
          "category": "性能深度调优",
          "categoryId": "FpsDepthTweaks",
          "label": "禁用 SmartScreen"
        }
      ],
      "options": [
        {
          "id": "unset",
          "label": "未配置",
          "value": null
        },
        {
          "id": "v-76ea4fd63974d1c7b7412eafacfdb09b",
          "label": "默认选项 · Prompt",
          "value": {
            "kind": "String",
            "data": "Prompt"
          }
        },
        {
          "id": "v-f4b7cbfc51c9176063e2bcd421b81feb",
          "label": "调整选项 · Off",
          "value": {
            "kind": "String",
            "data": "Off"
          }
        }
      ],
      "target": {
        "kind": "registry",
        "path": "HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Explorer",
        "name": "SmartScreenEnabled"
      }
    },
    {
      "id": "bae4c4aed69f4b8e2fbd886dd2af0c748050331ccf61cb7d220abcd1b58e728f",
      "label": "关闭传递优化 (P2P 分发)",
      "category": "性能深度调优",
      "categoryId": "FpsDepthTweaks",
      "level": 2,
      "aliases": [
        {
          "category": "性能深度调优",
          "categoryId": "FpsDepthTweaks",
          "label": "关闭传递优化 (P2P 分发)"
        }
      ],
      "options": [
        {
          "id": "unset",
          "label": "未配置",
          "value": null
        },
        {
          "id": "v-3eb2f7bb1fa0bb2f3b1ca7a7071ff39e",
          "label": "默认选项 · 1",
          "value": {
            "kind": "DWord",
            "data": 1
          }
        },
        {
          "id": "v-fee7da91b6fbd7504ee5455a1b3c6487",
          "label": "调整选项 · 0",
          "value": {
            "kind": "DWord",
            "data": 0
          }
        }
      ],
      "target": {
        "kind": "registry",
        "path": "HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\DeliveryOptimization",
        "name": "DODownloadMode"
      }
    },
    {
      "id": "0693808203cb95c4164cf5adaa3b5761396f8f7ded9d2dc08fce844db18ab62e",
      "label": "关闭时间线与活动历史 · EnableActivityFeed",
      "category": "性能深度调优",
      "categoryId": "FpsDepthTweaks",
      "level": 2,
      "aliases": [
        {
          "category": "性能深度调优",
          "categoryId": "FpsDepthTweaks",
          "label": "关闭时间线与活动历史"
        }
      ],
      "options": [
        {
          "id": "unset",
          "label": "未配置",
          "value": null
        },
        {
          "id": "v-3eb2f7bb1fa0bb2f3b1ca7a7071ff39e",
          "label": "默认选项 · 1",
          "value": {
            "kind": "DWord",
            "data": 1
          }
        },
        {
          "id": "v-fee7da91b6fbd7504ee5455a1b3c6487",
          "label": "调整选项 · 0",
          "value": {
            "kind": "DWord",
            "data": 0
          }
        }
      ],
      "target": {
        "kind": "registry",
        "path": "HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\System",
        "name": "EnableActivityFeed"
      }
    },
    {
      "id": "f697e3cc749c55ca854f00c93f8d3a8d054b033ae3bd2b96d52d3e1174bc70a3",
      "label": "关闭时间线与活动历史 · PublishUserActivities",
      "category": "性能深度调优",
      "categoryId": "FpsDepthTweaks",
      "level": 2,
      "aliases": [
        {
          "category": "性能深度调优",
          "categoryId": "FpsDepthTweaks",
          "label": "关闭时间线与活动历史"
        }
      ],
      "options": [
        {
          "id": "unset",
          "label": "未配置",
          "value": null
        },
        {
          "id": "v-3eb2f7bb1fa0bb2f3b1ca7a7071ff39e",
          "label": "默认选项 · 1",
          "value": {
            "kind": "DWord",
            "data": 1
          }
        },
        {
          "id": "v-fee7da91b6fbd7504ee5455a1b3c6487",
          "label": "调整选项 · 0",
          "value": {
            "kind": "DWord",
            "data": 0
          }
        }
      ],
      "target": {
        "kind": "registry",
        "path": "HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\System",
        "name": "PublishUserActivities"
      }
    },
    {
      "id": "052a7949796d2753d82c359e66f10a68702c447911e32283ebcc0670d98d4d1e",
      "label": "关闭时间线与活动历史 · UploadUserActivities",
      "category": "性能深度调优",
      "categoryId": "FpsDepthTweaks",
      "level": 2,
      "aliases": [
        {
          "category": "性能深度调优",
          "categoryId": "FpsDepthTweaks",
          "label": "关闭时间线与活动历史"
        }
      ],
      "options": [
        {
          "id": "unset",
          "label": "未配置",
          "value": null
        },
        {
          "id": "v-3eb2f7bb1fa0bb2f3b1ca7a7071ff39e",
          "label": "默认选项 · 1",
          "value": {
            "kind": "DWord",
            "data": 1
          }
        },
        {
          "id": "v-fee7da91b6fbd7504ee5455a1b3c6487",
          "label": "调整选项 · 0",
          "value": {
            "kind": "DWord",
            "data": 0
          }
        }
      ],
      "target": {
        "kind": "registry",
        "path": "HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\System",
        "name": "UploadUserActivities"
      }
    },
    {
      "id": "5f41d86935b6c553140a9cc16d8e48bd206080adc950ead0cffbdfd74320edfc",
      "label": "关闭更新重启提醒",
      "category": "性能深度调优",
      "categoryId": "FpsDepthTweaks",
      "level": 1,
      "aliases": [
        {
          "category": "性能深度调优",
          "categoryId": "FpsDepthTweaks",
          "label": "关闭更新重启提醒"
        }
      ],
      "options": [
        {
          "id": "unset",
          "label": "未配置",
          "value": null
        },
        {
          "id": "v-3eb2f7bb1fa0bb2f3b1ca7a7071ff39e",
          "label": "默认选项 · 1",
          "value": {
            "kind": "DWord",
            "data": 1
          }
        },
        {
          "id": "v-fee7da91b6fbd7504ee5455a1b3c6487",
          "label": "调整选项 · 0",
          "value": {
            "kind": "DWord",
            "data": 0
          }
        }
      ],
      "target": {
        "kind": "registry",
        "path": "HKLM\\SOFTWARE\\Microsoft\\WindowsUpdate\\UX\\Settings",
        "name": "RestartNotificationsAllowed2"
      }
    },
    {
      "id": "0961e22b0872bf99eb2339f393f55cf2a669df4115fbab2743480cc0d3c43c60",
      "label": "关闭抢先获取最新更新",
      "category": "性能深度调优",
      "categoryId": "FpsDepthTweaks",
      "level": 1,
      "aliases": [
        {
          "category": "性能深度调优",
          "categoryId": "FpsDepthTweaks",
          "label": "关闭抢先获取最新更新"
        }
      ],
      "options": [
        {
          "id": "unset",
          "label": "未配置",
          "value": null
        },
        {
          "id": "v-3eb2f7bb1fa0bb2f3b1ca7a7071ff39e",
          "label": "默认选项 · 1",
          "value": {
            "kind": "DWord",
            "data": 1
          }
        },
        {
          "id": "v-fee7da91b6fbd7504ee5455a1b3c6487",
          "label": "调整选项 · 0",
          "value": {
            "kind": "DWord",
            "data": 0
          }
        }
      ],
      "target": {
        "kind": "registry",
        "path": "HKLM\\SOFTWARE\\Microsoft\\WindowsUpdate\\UX\\Settings",
        "name": "IsContinuousInnovationOptedIn"
      }
    },
    {
      "id": "e05a1871f5a749c798584f723a5e3ecbc8aead5b156a36f1cb185dafa513feb4",
      "label": "阻止登录用户自动重启更新",
      "category": "性能深度调优",
      "categoryId": "FpsDepthTweaks",
      "level": 2,
      "aliases": [
        {
          "category": "性能深度调优",
          "categoryId": "FpsDepthTweaks",
          "label": "阻止登录用户自动重启更新"
        }
      ],
      "options": [
        {
          "id": "unset",
          "label": "未配置",
          "value": null
        },
        {
          "id": "v-3eb2f7bb1fa0bb2f3b1ca7a7071ff39e",
          "label": "调整选项 · 1",
          "value": {
            "kind": "DWord",
            "data": 1
          }
        },
        {
          "id": "v-fee7da91b6fbd7504ee5455a1b3c6487",
          "label": "默认选项 · 0",
          "value": {
            "kind": "DWord",
            "data": 0
          }
        }
      ],
      "target": {
        "kind": "registry",
        "path": "HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\WindowsUpdate\\AU",
        "name": "NoAutoRebootWithLoggedOnUsers"
      }
    },
    {
      "id": "e9f4c68e5c6a60e6423bdd669c8b0db17121de8977576ff938ca95021f7097ca",
      "label": "关闭其他 Microsoft 产品更新",
      "category": "性能深度调优",
      "categoryId": "FpsDepthTweaks",
      "level": 2,
      "aliases": [
        {
          "category": "性能深度调优",
          "categoryId": "FpsDepthTweaks",
          "label": "关闭其他 Microsoft 产品更新"
        }
      ],
      "options": [
        {
          "id": "unset",
          "label": "未配置",
          "value": null
        },
        {
          "id": "v-3eb2f7bb1fa0bb2f3b1ca7a7071ff39e",
          "label": "默认选项 · 1",
          "value": {
            "kind": "DWord",
            "data": 1
          }
        },
        {
          "id": "v-fee7da91b6fbd7504ee5455a1b3c6487",
          "label": "调整选项 · 0",
          "value": {
            "kind": "DWord",
            "data": 0
          }
        }
      ],
      "target": {
        "kind": "registry",
        "path": "HKLM\\SOFTWARE\\Microsoft\\WindowsUpdate\\UX\\Settings",
        "name": "AllowMUUpdateService"
      }
    },
    {
      "id": "e9f00dc6bf82416c3881255f5c809420964c45aa88a68b83f79cf2f7bb46e642",
      "label": "关闭剪贴板历史",
      "category": "性能深度调优",
      "categoryId": "FpsDepthTweaks",
      "level": 1,
      "aliases": [
        {
          "category": "性能深度调优",
          "categoryId": "FpsDepthTweaks",
          "label": "关闭剪贴板历史"
        }
      ],
      "options": [
        {
          "id": "unset",
          "label": "未配置",
          "value": null
        },
        {
          "id": "v-3eb2f7bb1fa0bb2f3b1ca7a7071ff39e",
          "label": "默认选项 · 1",
          "value": {
            "kind": "DWord",
            "data": 1
          }
        },
        {
          "id": "v-fee7da91b6fbd7504ee5455a1b3c6487",
          "label": "调整选项 · 0",
          "value": {
            "kind": "DWord",
            "data": 0
          }
        }
      ],
      "target": {
        "kind": "registry",
        "path": "HKCU\\SOFTWARE\\Microsoft\\Clipboard",
        "name": "EnableClipboardHistory"
      }
    },
    {
      "id": "f6b2322b9120bdb070bc80b248ba03de45598f7b2db95e8cd0a1028ac23f86db",
      "label": "开启处理器 Boost 激进模式 · 接通电源",
      "category": "性能深度调优",
      "categoryId": "FpsDepthTweaks",
      "level": 3,
      "aliases": [
        {
          "category": "性能深度调优",
          "categoryId": "FpsDepthTweaks",
          "label": "开启处理器 Boost 激进模式"
        },
        {
          "category": "性能深度调优",
          "categoryId": "FpsDepthTweaks",
          "label": "禁用处理器 Boost"
        }
      ],
      "options": [
        {
          "id": "v-6ae8e39e9a6772e993b459be859d14f0",
          "label": "调整选项 · 2",
          "value": {
            "kind": "Power",
            "index": 2
          }
        },
        {
          "id": "v-a20f5b8d1666a17cbb6f24b316d75ba8",
          "label": "调整选项 · 0",
          "value": {
            "kind": "Power",
            "index": 0
          }
        },
        {
          "id": "v-f5acaf106d1409672c444054354a83dc",
          "label": "默认选项 · 1",
          "value": {
            "kind": "Power",
            "index": 1
          }
        }
      ],
      "target": {
        "kind": "power",
        "path": "54533251-82BE-4824-96C1-47B60B740D00",
        "name": "BE337238-0D82-4146-A960-4F3749D470C7",
        "side": "ac"
      }
    },
    {
      "id": "073d732c69f1359165d539fcd766202b513b6d9f7eb25d7b5086a1d83a1126c1",
      "label": "开启处理器 Boost 激进模式 · 电池供电",
      "category": "性能深度调优",
      "categoryId": "FpsDepthTweaks",
      "level": 3,
      "aliases": [
        {
          "category": "性能深度调优",
          "categoryId": "FpsDepthTweaks",
          "label": "开启处理器 Boost 激进模式"
        },
        {
          "category": "性能深度调优",
          "categoryId": "FpsDepthTweaks",
          "label": "禁用处理器 Boost"
        }
      ],
      "options": [
        {
          "id": "v-a20f5b8d1666a17cbb6f24b316d75ba8",
          "label": "调整选项 · 0",
          "value": {
            "kind": "Power",
            "index": 0
          }
        },
        {
          "id": "v-f5acaf106d1409672c444054354a83dc",
          "label": "调整选项 · 1",
          "value": {
            "kind": "Power",
            "index": 1
          }
        }
      ],
      "target": {
        "kind": "power",
        "path": "54533251-82BE-4824-96C1-47B60B740D00",
        "name": "BE337238-0D82-4146-A960-4F3749D470C7",
        "side": "dc"
      }
    },
    {
      "id": "b94ac4831b247d7bd0b8b4592ee6e5cb1a5a4cc6f945d7cedbac4ae3d396b355",
      "label": "Intel Speed Shift 性能偏好 · 接通电源",
      "category": "性能深度调优",
      "categoryId": "FpsDepthTweaks",
      "level": 2,
      "aliases": [
        {
          "category": "性能深度调优",
          "categoryId": "FpsDepthTweaks",
          "label": "Intel Speed Shift 性能偏好"
        }
      ],
      "options": [
        {
          "id": "v-8efbfdec02718787ba4a4a56f55e6431",
          "label": "默认选项 · 50",
          "value": {
            "kind": "Power",
            "index": 50
          }
        },
        {
          "id": "v-a20f5b8d1666a17cbb6f24b316d75ba8",
          "label": "调整选项 · 0",
          "value": {
            "kind": "Power",
            "index": 0
          }
        }
      ],
      "target": {
        "kind": "power",
        "path": "54533251-82BE-4824-96C1-47B60B740D00",
        "name": "36687F9E-E3A5-4DBF-B1DC-15EB381C6863",
        "side": "ac"
      }
    },
    {
      "id": "3bfc1e0766070832e55a39188cf9b0e8dfc03db1198e798b65e31c35a71c54ab",
      "label": "Intel Speed Shift 性能偏好 · 电池供电",
      "category": "性能深度调优",
      "categoryId": "FpsDepthTweaks",
      "level": 2,
      "aliases": [
        {
          "category": "性能深度调优",
          "categoryId": "FpsDepthTweaks",
          "label": "Intel Speed Shift 性能偏好"
        }
      ],
      "options": [
        {
          "id": "v-8efbfdec02718787ba4a4a56f55e6431",
          "label": "默认选项 · 50",
          "value": {
            "kind": "Power",
            "index": 50
          }
        },
        {
          "id": "v-a20f5b8d1666a17cbb6f24b316d75ba8",
          "label": "调整选项 · 0",
          "value": {
            "kind": "Power",
            "index": 0
          }
        }
      ],
      "target": {
        "kind": "power",
        "path": "54533251-82BE-4824-96C1-47B60B740D00",
        "name": "36687F9E-E3A5-4DBF-B1DC-15EB381C6863",
        "side": "dc"
      }
    },
    {
      "id": "817cc0623f01bcab3dc685954809ce8a23e39d03cec4bc5c7f4ca9cf5ab0faf3",
      "label": "启用 Intel TSX 指令集",
      "category": "性能深度调优",
      "categoryId": "FpsDepthTweaks",
      "level": 2,
      "aliases": [
        {
          "category": "性能深度调优",
          "categoryId": "FpsDepthTweaks",
          "label": "启用 Intel TSX 指令集"
        }
      ],
      "options": [
        {
          "id": "unset",
          "label": "未配置",
          "value": null
        },
        {
          "id": "v-fee7da91b6fbd7504ee5455a1b3c6487",
          "label": "调整选项 · 0",
          "value": {
            "kind": "DWord",
            "data": 0
          }
        }
      ],
      "target": {
        "kind": "registry",
        "path": "HKLM\\SYSTEM\\CurrentControlSet\\Control\\Session Manager\\Kernel",
        "name": "DisableTsx"
      }
    },
    {
      "id": "64901c85e8ab708dac8123775d4fe111a72de2eb9ec0fa0c90d2155b15e3fef0",
      "label": "处理器性能提升阈值 1% · 接通电源",
      "category": "性能深度调优",
      "categoryId": "FpsDepthTweaks",
      "level": 2,
      "aliases": [
        {
          "category": "性能深度调优",
          "categoryId": "FpsDepthTweaks",
          "label": "处理器性能提升阈值 1%"
        }
      ],
      "options": [
        {
          "id": "v-142db15e2aeec953f66db5b46c0158be",
          "label": "默认选项 · 10",
          "value": {
            "kind": "Power",
            "index": 10
          }
        },
        {
          "id": "v-f5acaf106d1409672c444054354a83dc",
          "label": "调整选项 · 1",
          "value": {
            "kind": "Power",
            "index": 1
          }
        }
      ],
      "target": {
        "kind": "power",
        "path": "54533251-82BE-4824-96C1-47B60B740D00",
        "name": "06CADF0E-64ED-448A-8927-CE7BF90EB35D",
        "side": "ac"
      }
    },
    {
      "id": "0550d9772dd320b2f86a74c689cec1b8da6e841c65be095fe79f44a3ad200c58",
      "label": "处理器性能提升阈值 1% · 电池供电",
      "category": "性能深度调优",
      "categoryId": "FpsDepthTweaks",
      "level": 2,
      "aliases": [
        {
          "category": "性能深度调优",
          "categoryId": "FpsDepthTweaks",
          "label": "处理器性能提升阈值 1%"
        }
      ],
      "options": [
        {
          "id": "v-142db15e2aeec953f66db5b46c0158be",
          "label": "默认选项 · 10",
          "value": {
            "kind": "Power",
            "index": 10
          }
        },
        {
          "id": "v-f5acaf106d1409672c444054354a83dc",
          "label": "调整选项 · 1",
          "value": {
            "kind": "Power",
            "index": 1
          }
        }
      ],
      "target": {
        "kind": "power",
        "path": "54533251-82BE-4824-96C1-47B60B740D00",
        "name": "06CADF0E-64ED-448A-8927-CE7BF90EB35D",
        "side": "dc"
      }
    },
    {
      "id": "ff4bc54969d86cf3aa8f12b940b2bc36bbbb0a8b772f93033cbbc16fdfc86007",
      "label": "处理器闲置降级阈值 100% · 接通电源",
      "category": "性能深度调优",
      "categoryId": "FpsDepthTweaks",
      "level": 2,
      "aliases": [
        {
          "category": "性能深度调优",
          "categoryId": "FpsDepthTweaks",
          "label": "处理器闲置降级阈值 100%"
        }
      ],
      "options": [
        {
          "id": "v-2bd69c8843ab2c0022ed3c518f045cbf",
          "label": "调整选项 · 100",
          "value": {
            "kind": "Power",
            "index": 100
          }
        },
        {
          "id": "v-6c38344e36167a1ccf9c06189b7ad99a",
          "label": "默认选项 · 40",
          "value": {
            "kind": "Power",
            "index": 40
          }
        }
      ],
      "target": {
        "kind": "power",
        "path": "54533251-82BE-4824-96C1-47B60B740D00",
        "name": "4B92D758-5A24-4851-A470-815D78AEE119",
        "side": "ac"
      }
    },
    {
      "id": "2b5b02ea95517ed44dfcc560d064934767335c747aea47021fea18f0b37c6ddb",
      "label": "处理器闲置降级阈值 100% · 电池供电",
      "category": "性能深度调优",
      "categoryId": "FpsDepthTweaks",
      "level": 2,
      "aliases": [
        {
          "category": "性能深度调优",
          "categoryId": "FpsDepthTweaks",
          "label": "处理器闲置降级阈值 100%"
        }
      ],
      "options": [
        {
          "id": "v-2bd69c8843ab2c0022ed3c518f045cbf",
          "label": "调整选项 · 100",
          "value": {
            "kind": "Power",
            "index": 100
          }
        },
        {
          "id": "v-6c38344e36167a1ccf9c06189b7ad99a",
          "label": "默认选项 · 40",
          "value": {
            "kind": "Power",
            "index": 40
          }
        }
      ],
      "target": {
        "kind": "power",
        "path": "54533251-82BE-4824-96C1-47B60B740D00",
        "name": "4B92D758-5A24-4851-A470-815D78AEE119",
        "side": "dc"
      }
    },
    {
      "id": "ba89a8f773c0005e7db355a9fcc7c64d73a3ee748dfc8fd94c79cb5f967a05f2",
      "label": "处理器性能时间检查间隔最大化 · 接通电源",
      "category": "性能深度调优",
      "categoryId": "FpsDepthTweaks",
      "level": 2,
      "aliases": [
        {
          "category": "性能深度调优",
          "categoryId": "FpsDepthTweaks",
          "label": "处理器性能时间检查间隔最大化"
        }
      ],
      "options": [
        {
          "id": "v-4c74b1d00060a7a4e01ee01873cf506f",
          "label": "默认选项 · 15",
          "value": {
            "kind": "Power",
            "index": 15
          }
        },
        {
          "id": "v-d8e74a68e968beeb2934306f0debea5f",
          "label": "调整选项 · 5000",
          "value": {
            "kind": "Power",
            "index": 5e3
          }
        }
      ],
      "target": {
        "kind": "power",
        "path": "54533251-82BE-4824-96C1-47B60B740D00",
        "name": "4D2B0152-7D5C-498B-88E2-34345392A2C5",
        "side": "ac"
      }
    },
    {
      "id": "e65932b2b379afaba8b851bdf15c558a3e034baf39e74025d83073b94c8695aa",
      "label": "处理器性能时间检查间隔最大化 · 电池供电",
      "category": "性能深度调优",
      "categoryId": "FpsDepthTweaks",
      "level": 2,
      "aliases": [
        {
          "category": "性能深度调优",
          "categoryId": "FpsDepthTweaks",
          "label": "处理器性能时间检查间隔最大化"
        }
      ],
      "options": [
        {
          "id": "v-4c74b1d00060a7a4e01ee01873cf506f",
          "label": "默认选项 · 15",
          "value": {
            "kind": "Power",
            "index": 15
          }
        },
        {
          "id": "v-d8e74a68e968beeb2934306f0debea5f",
          "label": "调整选项 · 5000",
          "value": {
            "kind": "Power",
            "index": 5e3
          }
        }
      ],
      "target": {
        "kind": "power",
        "path": "54533251-82BE-4824-96C1-47B60B740D00",
        "name": "4D2B0152-7D5C-498B-88E2-34345392A2C5",
        "side": "dc"
      }
    },
    {
      "id": "ccc5aefdd7403cecff9f683887b3d28d762fd8af81947cfca9f33e8e2d0643f4",
      "label": "性能核延迟提示性能 100% · 接通电源",
      "category": "性能深度调优",
      "categoryId": "FpsDepthTweaks",
      "level": 2,
      "aliases": [
        {
          "category": "性能深度调优",
          "categoryId": "FpsDepthTweaks",
          "label": "性能核延迟提示性能 100%"
        }
      ],
      "options": [
        {
          "id": "v-2bd69c8843ab2c0022ed3c518f045cbf",
          "label": "调整选项 · 100",
          "value": {
            "kind": "Power",
            "index": 100
          }
        },
        {
          "id": "v-c4ab89e8117a69cf184bcbb0f6192127",
          "label": "默认选项 · 99",
          "value": {
            "kind": "Power",
            "index": 99
          }
        }
      ],
      "target": {
        "kind": "power",
        "path": "54533251-82BE-4824-96C1-47B60B740D00",
        "name": "619B7505-003B-4E82-B7A6-4DD29C300971",
        "side": "ac"
      }
    },
    {
      "id": "c1f56183e33d4b7016d1d965c8c6137b9b15617eab3331b1861ce58a6556dadb",
      "label": "性能核延迟提示性能 100% · 电池供电",
      "category": "性能深度调优",
      "categoryId": "FpsDepthTweaks",
      "level": 2,
      "aliases": [
        {
          "category": "性能深度调优",
          "categoryId": "FpsDepthTweaks",
          "label": "性能核延迟提示性能 100%"
        }
      ],
      "options": [
        {
          "id": "v-2bd69c8843ab2c0022ed3c518f045cbf",
          "label": "调整选项 · 100",
          "value": {
            "kind": "Power",
            "index": 100
          }
        },
        {
          "id": "v-c4ab89e8117a69cf184bcbb0f6192127",
          "label": "默认选项 · 99",
          "value": {
            "kind": "Power",
            "index": 99
          }
        }
      ],
      "target": {
        "kind": "power",
        "path": "54533251-82BE-4824-96C1-47B60B740D00",
        "name": "619B7505-003B-4E82-B7A6-4DD29C300971",
        "side": "dc"
      }
    },
    {
      "id": "3e3bf0ef350b1b627fbbaa86376b332bf5ffac2679db6a36801531e15a33a7a4",
      "label": "处理器性能降低阈值 8% · 接通电源",
      "category": "性能深度调优",
      "categoryId": "FpsDepthTweaks",
      "level": 2,
      "aliases": [
        {
          "category": "性能深度调优",
          "categoryId": "FpsDepthTweaks",
          "label": "处理器性能降低阈值 8%"
        }
      ],
      "options": [
        {
          "id": "v-142db15e2aeec953f66db5b46c0158be",
          "label": "默认选项 · 10",
          "value": {
            "kind": "Power",
            "index": 10
          }
        },
        {
          "id": "v-e5ff497c3a786bb842ce1d8dc3fde8e3",
          "label": "调整选项 · 8",
          "value": {
            "kind": "Power",
            "index": 8
          }
        }
      ],
      "target": {
        "kind": "power",
        "path": "54533251-82BE-4824-96C1-47B60B740D00",
        "name": "12A0AB44-FE28-4FA9-B3BD-4B64F44960A6",
        "side": "ac"
      }
    },
    {
      "id": "c8e2d50e0068188c0f823f257a81e4ef8998f089ff75f0c875849057f71b68c8",
      "label": "处理器性能降低阈值 8% · 电池供电",
      "category": "性能深度调优",
      "categoryId": "FpsDepthTweaks",
      "level": 2,
      "aliases": [
        {
          "category": "性能深度调优",
          "categoryId": "FpsDepthTweaks",
          "label": "处理器性能降低阈值 8%"
        }
      ],
      "options": [
        {
          "id": "v-142db15e2aeec953f66db5b46c0158be",
          "label": "默认选项 · 10",
          "value": {
            "kind": "Power",
            "index": 10
          }
        },
        {
          "id": "v-2ebb052bd0260b64a98467b795b9b5bd",
          "label": "调整选项 · 20",
          "value": {
            "kind": "Power",
            "index": 20
          }
        }
      ],
      "target": {
        "kind": "power",
        "path": "54533251-82BE-4824-96C1-47B60B740D00",
        "name": "12A0AB44-FE28-4FA9-B3BD-4B64F44960A6",
        "side": "dc"
      }
    },
    {
      "id": "062a7dae9c084e02c8626fe9e5438cef0973afc9fa07ac0d943766422c82d971",
      "label": "游戏任务调度权重",
      "category": "性能深度调优",
      "categoryId": "FpsDepthTweaks",
      "level": 1,
      "aliases": [
        {
          "category": "性能深度调优",
          "categoryId": "FpsDepthTweaks",
          "label": "游戏任务调度权重"
        }
      ],
      "options": [
        {
          "id": "unset",
          "label": "未配置",
          "value": null
        },
        {
          "id": "v-2b115b3943e1c075e6025f4a84623052",
          "label": "调整选项 · 6",
          "value": {
            "kind": "DWord",
            "data": 6
          }
        },
        {
          "id": "v-b890d43c0a1fc60d0dc8c9217ad2d002",
          "label": "默认选项 · 2",
          "value": {
            "kind": "DWord",
            "data": 2
          }
        }
      ],
      "target": {
        "kind": "registry",
        "path": "HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Multimedia\\SystemProfile\\Tasks\\Games",
        "name": "Priority"
      }
    },
    {
      "id": "0b864a0007a3de4769d511ae0bc50bdfcd215bc93b4bdd3ca0f1d02eec73b02e",
      "label": "禁用 MPO 多平面覆盖",
      "category": "性能深度调优",
      "categoryId": "FpsDepthTweaks",
      "level": 3,
      "aliases": [
        {
          "category": "性能深度调优",
          "categoryId": "FpsDepthTweaks",
          "label": "禁用 MPO 多平面覆盖"
        }
      ],
      "options": [
        {
          "id": "unset",
          "label": "未配置",
          "value": null
        },
        {
          "id": "v-dc600ab6d046688e1597a0e40818c3e7",
          "label": "调整选项 · 5",
          "value": {
            "kind": "DWord",
            "data": 5
          }
        },
        {
          "id": "v-fee7da91b6fbd7504ee5455a1b3c6487",
          "label": "默认选项 · 0",
          "value": {
            "kind": "DWord",
            "data": 0
          }
        }
      ],
      "target": {
        "kind": "registry",
        "path": "HKLM\\SOFTWARE\\Microsoft\\Windows\\Dwm",
        "name": "OverlayTestMode"
      }
    },
    {
      "id": "92a1cedb1a2a404a47526e711e8b2c07cbda9c39df636a22d3ea822e007f0af4",
      "label": "关闭 MPO 最低帧率要求",
      "category": "性能深度调优",
      "categoryId": "FpsDepthTweaks",
      "level": 2,
      "aliases": [
        {
          "category": "性能深度调优",
          "categoryId": "FpsDepthTweaks",
          "label": "关闭 MPO 最低帧率要求"
        }
      ],
      "options": [
        {
          "id": "unset",
          "label": "未配置",
          "value": null
        },
        {
          "id": "v-fee7da91b6fbd7504ee5455a1b3c6487",
          "label": "调整选项 · 0",
          "value": {
            "kind": "DWord",
            "data": 0
          }
        }
      ],
      "target": {
        "kind": "registry",
        "path": "HKLM\\SOFTWARE\\Microsoft\\Windows\\Dwm",
        "name": "OverlayMinFPS"
      }
    },
    {
      "id": "739b48ba974ab67c5a6dc5004d747d1a2f8de23654a13f17f91fd1b8a76a7aec",
      "label": "DirectX 全局图形偏好优化",
      "category": "性能深度调优",
      "categoryId": "FpsDepthTweaks",
      "level": 2,
      "aliases": [
        {
          "category": "性能深度调优",
          "categoryId": "FpsDepthTweaks",
          "label": "DirectX 全局图形偏好优化"
        }
      ],
      "options": [
        {
          "id": "unset",
          "label": "未配置",
          "value": null
        },
        {
          "id": "v-2f3ef9c090d3c39466d58cb1774cc276",
          "label": "默认选项 · GpuPreference=0;VRROptimizeEnable=0;AutoHDREnable=0;SwapEffectUpgradeEnable=0;",
          "value": {
            "kind": "String",
            "data": "GpuPreference=0;VRROptimizeEnable=0;AutoHDREnable=0;SwapEffectUpgradeEnable=0;"
          }
        },
        {
          "id": "v-c994f3b9f3fbb40405c9d4d4b0de70c7",
          "label": "调整选项 · GpuPreference=2;VRROptimizeEnable=1;AutoHDREnable=1;SwapEffectUpgradeEnable=1;",
          "value": {
            "kind": "String",
            "data": "GpuPreference=2;VRROptimizeEnable=1;AutoHDREnable=1;SwapEffectUpgradeEnable=1;"
          }
        }
      ],
      "target": {
        "kind": "registry",
        "path": "HKCU\\SOFTWARE\\Microsoft\\DirectX\\UserGpuPreferences",
        "name": "DirectXUserGlobalSettings"
      }
    },
    {
      "id": "243aed9d7b3c510c11338276d96ac581c821bcae70734f96e7d499c49ff3041a",
      "label": "禁用可变刷新率 (VRR)",
      "category": "性能深度调优",
      "categoryId": "FpsDepthTweaks",
      "level": 2,
      "aliases": [
        {
          "category": "性能深度调优",
          "categoryId": "FpsDepthTweaks",
          "label": "禁用可变刷新率 (VRR)"
        }
      ],
      "options": [
        {
          "id": "unset",
          "label": "未配置",
          "value": null
        },
        {
          "id": "v-3eb2f7bb1fa0bb2f3b1ca7a7071ff39e",
          "label": "默认选项 · 1",
          "value": {
            "kind": "DWord",
            "data": 1
          }
        },
        {
          "id": "v-fee7da91b6fbd7504ee5455a1b3c6487",
          "label": "调整选项 · 0",
          "value": {
            "kind": "DWord",
            "data": 0
          }
        }
      ],
      "target": {
        "kind": "registry",
        "path": "HKLM\\SYSTEM\\CurrentControlSet\\Control\\GraphicsDrivers",
        "name": "VRROptimizeEnable"
      }
    },
    {
      "id": "5b5c1854073f73b907b93de1dc6a39e1ad5fd5081402f95631be9962b580dfe0",
      "label": "AMD ULPS 与深度休眠设置 · EnableUlps",
      "category": "性能深度调优",
      "categoryId": "FpsDepthTweaks",
      "level": 3,
      "aliases": [
        {
          "category": "性能深度调优",
          "categoryId": "FpsDepthTweaks",
          "label": "AMD ULPS 与深度休眠设置"
        }
      ],
      "options": [
        {
          "id": "unset",
          "label": "未配置",
          "value": null
        },
        {
          "id": "v-3eb2f7bb1fa0bb2f3b1ca7a7071ff39e",
          "label": "默认选项 · 1",
          "value": {
            "kind": "DWord",
            "data": 1
          }
        },
        {
          "id": "v-fee7da91b6fbd7504ee5455a1b3c6487",
          "label": "调整选项 · 0",
          "value": {
            "kind": "DWord",
            "data": 0
          }
        }
      ],
      "target": {
        "kind": "registry",
        "path": "HKLM\\SYSTEM\\CurrentControlSet\\Control\\Class\\{4d36e968-e325-11ce-bfc1-08002be10318}\\0000",
        "name": "EnableUlps"
      }
    },
    {
      "id": "3ff07694899283b1ebb49b4aba1ff2d26a4508bca892001192060d32daf8decf",
      "label": "AMD ULPS 与深度休眠设置 · PP_SclkDeepSleepDisable",
      "category": "性能深度调优",
      "categoryId": "FpsDepthTweaks",
      "level": 3,
      "aliases": [
        {
          "category": "性能深度调优",
          "categoryId": "FpsDepthTweaks",
          "label": "AMD ULPS 与深度休眠设置"
        }
      ],
      "options": [
        {
          "id": "unset",
          "label": "未配置",
          "value": null
        },
        {
          "id": "v-3eb2f7bb1fa0bb2f3b1ca7a7071ff39e",
          "label": "调整选项 · 1",
          "value": {
            "kind": "DWord",
            "data": 1
          }
        },
        {
          "id": "v-fee7da91b6fbd7504ee5455a1b3c6487",
          "label": "默认选项 · 0",
          "value": {
            "kind": "DWord",
            "data": 0
          }
        }
      ],
      "target": {
        "kind": "registry",
        "path": "HKLM\\SYSTEM\\CurrentControlSet\\Control\\Class\\{4d36e968-e325-11ce-bfc1-08002be10318}\\0000",
        "name": "PP_SclkDeepSleepDisable"
      }
    },
    {
      "id": "0c99feae561707b7e4dfa164a357ad188de4fc98ffa554b157217719a2f4aadb",
      "label": "AMD ULPS 与深度休眠设置 · PP_ThermalAutoThrottlingEnable",
      "category": "性能深度调优",
      "categoryId": "FpsDepthTweaks",
      "level": 3,
      "aliases": [
        {
          "category": "性能深度调优",
          "categoryId": "FpsDepthTweaks",
          "label": "AMD ULPS 与深度休眠设置"
        }
      ],
      "options": [
        {
          "id": "unset",
          "label": "未配置",
          "value": null
        },
        {
          "id": "v-3eb2f7bb1fa0bb2f3b1ca7a7071ff39e",
          "label": "默认选项 · 1",
          "value": {
            "kind": "DWord",
            "data": 1
          }
        },
        {
          "id": "v-fee7da91b6fbd7504ee5455a1b3c6487",
          "label": "调整选项 · 0",
          "value": {
            "kind": "DWord",
            "data": 0
          }
        }
      ],
      "target": {
        "kind": "registry",
        "path": "HKLM\\SYSTEM\\CurrentControlSet\\Control\\Class\\{4d36e968-e325-11ce-bfc1-08002be10318}\\0000",
        "name": "PP_ThermalAutoThrottlingEnable"
      }
    },
    {
      "id": "6043f2f77a6f4049b5f79fb052bec4407100c1c25545c12045d6d64e8fbe2ac1",
      "label": "设置 GPU SFIO 优先级",
      "category": "性能深度调优",
      "categoryId": "FpsDepthTweaks",
      "level": 1,
      "aliases": [
        {
          "category": "性能深度调优",
          "categoryId": "FpsDepthTweaks",
          "label": "设置 GPU SFIO 优先级"
        }
      ],
      "options": [
        {
          "id": "unset",
          "label": "未配置",
          "value": null
        },
        {
          "id": "v-8f245e217b111b177c8dc8630bf35e1a",
          "label": "默认选项 · Normal",
          "value": {
            "kind": "String",
            "data": "Normal"
          }
        },
        {
          "id": "v-efa63e3004bcd1eac74117cca9bbd0b9",
          "label": "调整选项 · High",
          "value": {
            "kind": "String",
            "data": "High"
          }
        }
      ],
      "target": {
        "kind": "registry",
        "path": "HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Multimedia\\SystemProfile\\Tasks\\Games",
        "name": "SFIO Priority"
      }
    },
    {
      "id": "62de6d5c4e5b3bb1c162f0f7e26b4c97a9b38c1f3e8f518fab2ae1673aa38bb1",
      "label": "禁用全屏优化 (FSE 模式) · GameDVR_FSEBehavior",
      "category": "性能深度调优",
      "categoryId": "FpsDepthTweaks",
      "level": 2,
      "aliases": [
        {
          "category": "性能深度调优",
          "categoryId": "FpsDepthTweaks",
          "label": "禁用全屏优化 (FSE 模式)"
        }
      ],
      "options": [
        {
          "id": "unset",
          "label": "未配置",
          "value": null
        },
        {
          "id": "v-b890d43c0a1fc60d0dc8c9217ad2d002",
          "label": "调整选项 · 2",
          "value": {
            "kind": "DWord",
            "data": 2
          }
        },
        {
          "id": "v-fee7da91b6fbd7504ee5455a1b3c6487",
          "label": "默认选项 · 0",
          "value": {
            "kind": "DWord",
            "data": 0
          }
        }
      ],
      "target": {
        "kind": "registry",
        "path": "HKCU\\System\\GameConfigStore",
        "name": "GameDVR_FSEBehavior"
      }
    },
    {
      "id": "a3979c0f15c98d527d7f3e05014d3f872f77e388c26d4c67b01e0c38495666ef",
      "label": "禁用全屏优化 (FSE 模式) · GameDVR_FSEBehaviorMode",
      "category": "性能深度调优",
      "categoryId": "FpsDepthTweaks",
      "level": 2,
      "aliases": [
        {
          "category": "性能深度调优",
          "categoryId": "FpsDepthTweaks",
          "label": "禁用全屏优化 (FSE 模式)"
        }
      ],
      "options": [
        {
          "id": "unset",
          "label": "未配置",
          "value": null
        },
        {
          "id": "v-b890d43c0a1fc60d0dc8c9217ad2d002",
          "label": "调整选项 · 2",
          "value": {
            "kind": "DWord",
            "data": 2
          }
        },
        {
          "id": "v-fee7da91b6fbd7504ee5455a1b3c6487",
          "label": "默认选项 · 0",
          "value": {
            "kind": "DWord",
            "data": 0
          }
        }
      ],
      "target": {
        "kind": "registry",
        "path": "HKCU\\System\\GameConfigStore",
        "name": "GameDVR_FSEBehaviorMode"
      }
    },
    {
      "id": "0d1501d5f0e1fcea11640c3316c83747e05b57ad7c4233297b0344e7a063be28",
      "label": "禁用 DWM 桌面动画 · EnableAeroPeek",
      "category": "性能深度调优",
      "categoryId": "FpsDepthTweaks",
      "level": 1,
      "aliases": [
        {
          "category": "性能深度调优",
          "categoryId": "FpsDepthTweaks",
          "label": "禁用 DWM 桌面动画"
        }
      ],
      "options": [
        {
          "id": "unset",
          "label": "未配置",
          "value": null
        },
        {
          "id": "v-3eb2f7bb1fa0bb2f3b1ca7a7071ff39e",
          "label": "默认选项 · 1",
          "value": {
            "kind": "DWord",
            "data": 1
          }
        },
        {
          "id": "v-fee7da91b6fbd7504ee5455a1b3c6487",
          "label": "调整选项 · 0",
          "value": {
            "kind": "DWord",
            "data": 0
          }
        }
      ],
      "target": {
        "kind": "registry",
        "path": "HKCU\\SOFTWARE\\Microsoft\\Windows\\DWM",
        "name": "EnableAeroPeek"
      }
    },
    {
      "id": "f9c18773076cbbe01cf35bdd84f5b68b47e25fae7cef4cc905cbb7b789abb9f9",
      "label": "禁用 DWM 桌面动画 · AlwaysHibernateThumbnails",
      "category": "性能深度调优",
      "categoryId": "FpsDepthTweaks",
      "level": 1,
      "aliases": [
        {
          "category": "性能深度调优",
          "categoryId": "FpsDepthTweaks",
          "label": "禁用 DWM 桌面动画"
        }
      ],
      "options": [
        {
          "id": "unset",
          "label": "未配置",
          "value": null
        },
        {
          "id": "v-3eb2f7bb1fa0bb2f3b1ca7a7071ff39e",
          "label": "默认选项 · 1",
          "value": {
            "kind": "DWord",
            "data": 1
          }
        },
        {
          "id": "v-fee7da91b6fbd7504ee5455a1b3c6487",
          "label": "调整选项 · 0",
          "value": {
            "kind": "DWord",
            "data": 0
          }
        }
      ],
      "target": {
        "kind": "registry",
        "path": "HKCU\\SOFTWARE\\Microsoft\\Windows\\DWM",
        "name": "AlwaysHibernateThumbnails"
      }
    },
    {
      "id": "03bbcc40f461b2954eee918532824b07311008fe55e0174a61b9f38bce23d701",
      "label": "AMD 电源滑块:接电性能优先 · 接通电源",
      "category": "性能深度调优",
      "categoryId": "FpsDepthTweaks",
      "level": 2,
      "aliases": [
        {
          "category": "性能深度调优",
          "categoryId": "FpsDepthTweaks",
          "label": "AMD 电源滑块:接电性能优先"
        }
      ],
      "options": [
        {
          "id": "v-990775200773a6dd52fe57bf85489d40",
          "label": "调整选项 · 3",
          "value": {
            "kind": "Power",
            "index": 3
          }
        },
        {
          "id": "v-f5acaf106d1409672c444054354a83dc",
          "label": "默认选项 · 1",
          "value": {
            "kind": "Power",
            "index": 1
          }
        }
      ],
      "target": {
        "kind": "power",
        "path": "C763B4EC-0E50-4B6B-9BED-2B92A6EE884E",
        "name": "7EC1751B-60ED-4588-AFB5-9819D3D77D90",
        "side": "ac"
      }
    },
    {
      "id": "f40c79de0745d57f70e61803a843925b382d0d069d3bec08013670c1e7035617",
      "label": "AMD 电源滑块:接电性能优先 · 电池供电",
      "category": "性能深度调优",
      "categoryId": "FpsDepthTweaks",
      "level": 2,
      "aliases": [
        {
          "category": "性能深度调优",
          "categoryId": "FpsDepthTweaks",
          "label": "AMD 电源滑块:接电性能优先"
        }
      ],
      "options": [
        {
          "id": "v-f5acaf106d1409672c444054354a83dc",
          "label": "调整选项 · 1",
          "value": {
            "kind": "Power",
            "index": 1
          }
        }
      ],
      "target": {
        "kind": "power",
        "path": "C763B4EC-0E50-4B6B-9BED-2B92A6EE884E",
        "name": "7EC1751B-60ED-4588-AFB5-9819D3D77D90",
        "side": "dc"
      }
    },
    {
      "id": "4006642f49dbed0595db469d88a6995998dcd848cb6d40f66a98a18a787b99f7",
      "label": "ATI PowerPlay:接电最高性能 · 接通电源",
      "category": "性能深度调优",
      "categoryId": "FpsDepthTweaks",
      "level": 2,
      "aliases": [
        {
          "category": "性能深度调优",
          "categoryId": "FpsDepthTweaks",
          "label": "ATI PowerPlay:接电最高性能"
        }
      ],
      "options": [
        {
          "id": "v-6ae8e39e9a6772e993b459be859d14f0",
          "label": "调整选项 · 2",
          "value": {
            "kind": "Power",
            "index": 2
          }
        },
        {
          "id": "v-f5acaf106d1409672c444054354a83dc",
          "label": "默认选项 · 1",
          "value": {
            "kind": "Power",
            "index": 1
          }
        }
      ],
      "target": {
        "kind": "power",
        "path": "F693FB01-E858-4F00-B20F-F30E12AC06D6",
        "name": "191F65B5-D45C-4A4F-8AAE-1AB8BFD980E6",
        "side": "ac"
      }
    },
    {
      "id": "33e70287d91a1b29316ca9c41be0186e1c17717207a49d85746c985b82a6bc6a",
      "label": "ATI PowerPlay:接电最高性能 · 电池供电",
      "category": "性能深度调优",
      "categoryId": "FpsDepthTweaks",
      "level": 2,
      "aliases": [
        {
          "category": "性能深度调优",
          "categoryId": "FpsDepthTweaks",
          "label": "ATI PowerPlay:接电最高性能"
        }
      ],
      "options": [
        {
          "id": "v-f5acaf106d1409672c444054354a83dc",
          "label": "调整选项 · 1",
          "value": {
            "kind": "Power",
            "index": 1
          }
        }
      ],
      "target": {
        "kind": "power",
        "path": "F693FB01-E858-4F00-B20F-F30E12AC06D6",
        "name": "191F65B5-D45C-4A4F-8AAE-1AB8BFD980E6",
        "side": "dc"
      }
    },
    {
      "id": "1c2088b498afed351c61c98dc75631662cc90bb58c9324cbdd7e4074f59396f0",
      "label": "Intel 核显电源计划:接电最高性能 · 接通电源",
      "category": "性能深度调优",
      "categoryId": "FpsDepthTweaks",
      "level": 2,
      "aliases": [
        {
          "category": "性能深度调优",
          "categoryId": "FpsDepthTweaks",
          "label": "Intel 核显电源计划:接电最高性能"
        }
      ],
      "options": [
        {
          "id": "v-6ae8e39e9a6772e993b459be859d14f0",
          "label": "调整选项 · 2",
          "value": {
            "kind": "Power",
            "index": 2
          }
        },
        {
          "id": "v-f5acaf106d1409672c444054354a83dc",
          "label": "默认选项 · 1",
          "value": {
            "kind": "Power",
            "index": 1
          }
        }
      ],
      "target": {
        "kind": "power",
        "path": "44F3BECA-A7C0-460E-9DF2-BB8B99E0CBA6",
        "name": "3619C3F2-AFB2-4AFC-B0E9-E7FEF372DE36",
        "side": "ac"
      }
    },
    {
      "id": "09d781a43529a1430ca7e3d08820cfefe65e3ee7eb9359a3c1b26975bdd6d915",
      "label": "Intel 核显电源计划:接电最高性能 · 电池供电",
      "category": "性能深度调优",
      "categoryId": "FpsDepthTweaks",
      "level": 2,
      "aliases": [
        {
          "category": "性能深度调优",
          "categoryId": "FpsDepthTweaks",
          "label": "Intel 核显电源计划:接电最高性能"
        }
      ],
      "options": [
        {
          "id": "v-f5acaf106d1409672c444054354a83dc",
          "label": "调整选项 · 1",
          "value": {
            "kind": "Power",
            "index": 1
          }
        }
      ],
      "target": {
        "kind": "power",
        "path": "44F3BECA-A7C0-460E-9DF2-BB8B99E0CBA6",
        "name": "3619C3F2-AFB2-4AFC-B0E9-E7FEF372DE36",
        "side": "dc"
      }
    },
    {
      "id": "be6f10df1ea0bd72128cfe9eb51681bb9afdce0ec7f6c8cda5171bd82cd74d60",
      "label": "启用旧版 NVIDIA 图像锐化",
      "category": "性能深度调优",
      "categoryId": "FpsDepthTweaks",
      "level": 2,
      "aliases": [
        {
          "category": "性能深度调优",
          "categoryId": "FpsDepthTweaks",
          "label": "启用旧版 NVIDIA 图像锐化"
        }
      ],
      "options": [
        {
          "id": "unset",
          "label": "未配置",
          "value": null
        },
        {
          "id": "v-3eb2f7bb1fa0bb2f3b1ca7a7071ff39e",
          "label": "调整选项 · 1",
          "value": {
            "kind": "DWord",
            "data": 1
          }
        },
        {
          "id": "v-fee7da91b6fbd7504ee5455a1b3c6487",
          "label": "默认选项 · 0",
          "value": {
            "kind": "DWord",
            "data": 0
          }
        }
      ],
      "target": {
        "kind": "registry",
        "path": "HKLM\\Software\\NVIDIA Corporation\\Global\\FTS",
        "name": "EnableGR535"
      }
    },
    {
      "id": "1da0fb028515645cceb83f7490383869d8d295a77c63d034ec9dc3d16846565b",
      "label": "禁用 SysMain 预读取",
      "category": "性能深度调优",
      "categoryId": "FpsDepthTweaks",
      "level": 1,
      "aliases": [
        {
          "category": "性能深度调优",
          "categoryId": "FpsDepthTweaks",
          "label": "禁用 SysMain 预读取"
        }
      ],
      "options": [
        {
          "id": "v-5211408567eac5f001640091a9364a43",
          "label": "禁用",
          "value": {
            "kind": "Service",
            "start": 4
          }
        },
        {
          "id": "v-f9fce49ddd0cd8c57583b51e850b37da",
          "label": "手动启动",
          "value": {
            "kind": "Service",
            "start": 3
          }
        },
        {
          "id": "v-ff68c5f81e0082c91db2abb353faf051",
          "label": "自动启动",
          "value": {
            "kind": "Service",
            "start": 2
          }
        }
      ],
      "target": {
        "kind": "service",
        "path": "SysMain",
        "name": ""
      }
    },
    {
      "id": "3fc77c9e9618de63669a428a477c46dc83e73a680884bcab898b093f89d7ea43",
      "label": "禁用 Prefetch 预取",
      "category": "性能深度调优",
      "categoryId": "FpsDepthTweaks",
      "level": 2,
      "aliases": [
        {
          "category": "性能深度调优",
          "categoryId": "FpsDepthTweaks",
          "label": "禁用 Prefetch 预取"
        }
      ],
      "options": [
        {
          "id": "unset",
          "label": "未配置",
          "value": null
        },
        {
          "id": "v-69ff2138a3bbd9c0b33822530927b77a",
          "label": "默认选项 · 3",
          "value": {
            "kind": "DWord",
            "data": 3
          }
        },
        {
          "id": "v-fee7da91b6fbd7504ee5455a1b3c6487",
          "label": "调整选项 · 0",
          "value": {
            "kind": "DWord",
            "data": 0
          }
        }
      ],
      "target": {
        "kind": "registry",
        "path": "HKLM\\SYSTEM\\CurrentControlSet\\Control\\Session Manager\\Memory Management\\PrefetchParameters",
        "name": "EnablePrefetcher"
      }
    },
    {
      "id": "4528b17c07e3b0ba58b3c3bdd04b711bb8d6ec2f2e5761d3c82bee3894930408",
      "label": "启用大页面内存支持",
      "category": "性能深度调优",
      "categoryId": "FpsDepthTweaks",
      "level": 3,
      "aliases": [
        {
          "category": "性能深度调优",
          "categoryId": "FpsDepthTweaks",
          "label": "启用大页面内存支持"
        }
      ],
      "options": [
        {
          "id": "unset",
          "label": "未配置",
          "value": null
        },
        {
          "id": "v-f28b266cbe2efc4562ecf1f043691b50",
          "label": "调整选项 · 2097152",
          "value": {
            "kind": "DWord",
            "data": 2097152
          }
        },
        {
          "id": "v-fee7da91b6fbd7504ee5455a1b3c6487",
          "label": "默认选项 · 0",
          "value": {
            "kind": "DWord",
            "data": 0
          }
        }
      ],
      "target": {
        "kind": "registry",
        "path": "HKLM\\SYSTEM\\CurrentControlSet\\Control\\Session Manager\\Memory Management",
        "name": "LargePageMinimum"
      }
    },
    {
      "id": "1af42817e5ca64d5d5b2c19d02b6306a9f24313894eee3f1a71ea4a644fefe80",
      "label": "优化页面文件清理策略",
      "category": "性能深度调优",
      "categoryId": "FpsDepthTweaks",
      "level": 2,
      "aliases": [
        {
          "category": "性能深度调优",
          "categoryId": "FpsDepthTweaks",
          "label": "优化页面文件清理策略"
        }
      ],
      "options": [
        {
          "id": "unset",
          "label": "未配置",
          "value": null
        },
        {
          "id": "v-3eb2f7bb1fa0bb2f3b1ca7a7071ff39e",
          "label": "调整选项 · 1",
          "value": {
            "kind": "DWord",
            "data": 1
          }
        },
        {
          "id": "v-fee7da91b6fbd7504ee5455a1b3c6487",
          "label": "默认选项 · 0",
          "value": {
            "kind": "DWord",
            "data": 0
          }
        }
      ],
      "target": {
        "kind": "registry",
        "path": "HKLM\\SYSTEM\\CurrentControlSet\\Control\\Session Manager\\Memory Management",
        "name": "ClearPageFileAtShutdown"
      }
    },
    {
      "id": "8e433f3883422b1dec0e116c63198b0a2d314c3ec7974dd57fb2d46aa3ed12ea",
      "label": "优化 I/O 页面锁定限制",
      "category": "性能深度调优",
      "categoryId": "FpsDepthTweaks",
      "level": 3,
      "aliases": [
        {
          "category": "性能深度调优",
          "categoryId": "FpsDepthTweaks",
          "label": "优化 I/O 页面锁定限制"
        }
      ],
      "options": [
        {
          "id": "unset",
          "label": "未配置",
          "value": null
        },
        {
          "id": "v-712d7aebbf7677cc9b203317bb9a865e",
          "label": "调整选项 · 983040",
          "value": {
            "kind": "DWord",
            "data": 983040
          }
        },
        {
          "id": "v-fee7da91b6fbd7504ee5455a1b3c6487",
          "label": "默认选项 · 0",
          "value": {
            "kind": "DWord",
            "data": 0
          }
        }
      ],
      "target": {
        "kind": "registry",
        "path": "HKLM\\SYSTEM\\CurrentControlSet\\Control\\Session Manager\\Memory Management",
        "name": "IoPageLockLimit"
      }
    },
    {
      "id": "9f042964d7cf357a385452ad5beef316c436ce9b334ff56b2c5b6bcda0413f46",
      "label": "优化前台响应时间片",
      "category": "性能深度调优",
      "categoryId": "FpsDepthTweaks",
      "level": 2,
      "aliases": [
        {
          "category": "性能深度调优",
          "categoryId": "FpsDepthTweaks",
          "label": "优化前台响应时间片"
        }
      ],
      "options": [
        {
          "id": "unset",
          "label": "未配置",
          "value": null
        },
        {
          "id": "v-3935183329eda5e9952031d4d6ffa362",
          "label": "调整选项 · 38",
          "value": {
            "kind": "DWord",
            "data": 38
          }
        },
        {
          "id": "v-b890d43c0a1fc60d0dc8c9217ad2d002",
          "label": "默认选项 · 2",
          "value": {
            "kind": "DWord",
            "data": 2
          }
        }
      ],
      "target": {
        "kind": "registry",
        "path": "HKLM\\SYSTEM\\CurrentControlSet\\Control\\PriorityControl",
        "name": "Win32PrioritySeparation"
      }
    },
    {
      "id": "aa33e414eacb78dfddfc72d0efc3fac1b21cbdbffdffceb7fb335b3ad6c5ab5a",
      "label": "禁用内核内存分页",
      "category": "性能深度调优",
      "categoryId": "FpsDepthTweaks",
      "level": 3,
      "aliases": [
        {
          "category": "性能深度调优",
          "categoryId": "FpsDepthTweaks",
          "label": "禁用内核内存分页"
        }
      ],
      "options": [
        {
          "id": "unset",
          "label": "未配置",
          "value": null
        },
        {
          "id": "v-3eb2f7bb1fa0bb2f3b1ca7a7071ff39e",
          "label": "调整选项 · 1",
          "value": {
            "kind": "DWord",
            "data": 1
          }
        },
        {
          "id": "v-fee7da91b6fbd7504ee5455a1b3c6487",
          "label": "默认选项 · 0",
          "value": {
            "kind": "DWord",
            "data": 0
          }
        }
      ],
      "target": {
        "kind": "registry",
        "path": "HKLM\\SYSTEM\\CurrentControlSet\\Control\\Session Manager\\Memory Management",
        "name": "DisablePagingExecutive"
      }
    },
    {
      "id": "9b38ad299867ac687ebc6600899ed2c3208525026492991a2d0302a121f47955",
      "label": "禁用页面合并",
      "category": "性能深度调优",
      "categoryId": "FpsDepthTweaks",
      "level": 2,
      "aliases": [
        {
          "category": "性能深度调优",
          "categoryId": "FpsDepthTweaks",
          "label": "禁用页面合并"
        }
      ],
      "options": [
        {
          "id": "unset",
          "label": "未配置",
          "value": null
        },
        {
          "id": "v-3eb2f7bb1fa0bb2f3b1ca7a7071ff39e",
          "label": "调整选项 · 1",
          "value": {
            "kind": "DWord",
            "data": 1
          }
        },
        {
          "id": "v-fee7da91b6fbd7504ee5455a1b3c6487",
          "label": "默认选项 · 0",
          "value": {
            "kind": "DWord",
            "data": 0
          }
        }
      ],
      "target": {
        "kind": "registry",
        "path": "HKLM\\SYSTEM\\CurrentControlSet\\Control\\Session Manager\\Memory Management",
        "name": "DisablePageCombining"
      }
    },
    {
      "id": "347c1217e17fc9761bd6bbf308a12fae2b88bddd1f4255275fe12975d86ad29f",
      "label": "禁用自动维护",
      "category": "性能深度调优",
      "categoryId": "FpsDepthTweaks",
      "level": 3,
      "aliases": [
        {
          "category": "性能深度调优",
          "categoryId": "FpsDepthTweaks",
          "label": "禁用自动维护"
        }
      ],
      "options": [
        {
          "id": "unset",
          "label": "未配置",
          "value": null
        },
        {
          "id": "v-3eb2f7bb1fa0bb2f3b1ca7a7071ff39e",
          "label": "调整选项 · 1",
          "value": {
            "kind": "DWord",
            "data": 1
          }
        },
        {
          "id": "v-fee7da91b6fbd7504ee5455a1b3c6487",
          "label": "默认选项 · 0",
          "value": {
            "kind": "DWord",
            "data": 0
          }
        }
      ],
      "target": {
        "kind": "registry",
        "path": "HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Schedule\\Maintenance",
        "name": "MaintenanceDisabled"
      }
    },
    {
      "id": "bb6ebbdff5ba848773bc492ad10759a45ad5bad202646e48426038ab1b807af4",
      "label": "禁用 USB 选择性挂起 · 接通电源",
      "category": "外设优化",
      "categoryId": "PeripheralTweaks",
      "level": 2,
      "aliases": [
        {
          "category": "外设优化",
          "categoryId": "PeripheralTweaks",
          "label": "禁用 USB 选择性挂起"
        }
      ],
      "options": [
        {
          "id": "v-a20f5b8d1666a17cbb6f24b316d75ba8",
          "label": "调整选项 · 0",
          "value": {
            "kind": "Power",
            "index": 0
          }
        },
        {
          "id": "v-f5acaf106d1409672c444054354a83dc",
          "label": "默认选项 · 1",
          "value": {
            "kind": "Power",
            "index": 1
          }
        }
      ],
      "target": {
        "kind": "power",
        "path": "2A737441-1930-4402-8D77-B2BEBBA308A3",
        "name": "48E6B7A6-50F5-4782-A5D4-53BB8F07E226",
        "side": "ac"
      }
    },
    {
      "id": "02b2e498fde350794bea988b81f037031569eeb78e83ed87046d48292584a4c3",
      "label": "禁用 USB 选择性挂起 · 电池供电",
      "category": "外设优化",
      "categoryId": "PeripheralTweaks",
      "level": 2,
      "aliases": [
        {
          "category": "外设优化",
          "categoryId": "PeripheralTweaks",
          "label": "禁用 USB 选择性挂起"
        }
      ],
      "options": [
        {
          "id": "v-a20f5b8d1666a17cbb6f24b316d75ba8",
          "label": "调整选项 · 0",
          "value": {
            "kind": "Power",
            "index": 0
          }
        },
        {
          "id": "v-f5acaf106d1409672c444054354a83dc",
          "label": "默认选项 · 1",
          "value": {
            "kind": "Power",
            "index": 1
          }
        }
      ],
      "target": {
        "kind": "power",
        "path": "2A737441-1930-4402-8D77-B2BEBBA308A3",
        "name": "48E6B7A6-50F5-4782-A5D4-53BB8F07E226",
        "side": "dc"
      }
    },
    {
      "id": "f30b0f7d75d99ed1a1699e7cd57378fb21b84e3758e7648a4c8574174fa163b4",
      "label": "禁用 USB 3 链路电源管理 · 接通电源",
      "category": "外设优化",
      "categoryId": "PeripheralTweaks",
      "level": 2,
      "aliases": [
        {
          "category": "外设优化",
          "categoryId": "PeripheralTweaks",
          "label": "禁用 USB 3 链路电源管理"
        }
      ],
      "options": [
        {
          "id": "v-6ae8e39e9a6772e993b459be859d14f0",
          "label": "默认选项 · 2",
          "value": {
            "kind": "Power",
            "index": 2
          }
        },
        {
          "id": "v-a20f5b8d1666a17cbb6f24b316d75ba8",
          "label": "调整选项 · 0",
          "value": {
            "kind": "Power",
            "index": 0
          }
        }
      ],
      "target": {
        "kind": "power",
        "path": "2A737441-1930-4402-8D77-B2BEBBA308A3",
        "name": "D4E98F31-5FFE-4CE1-BE31-1B38B384C009",
        "side": "ac"
      }
    },
    {
      "id": "4af3a59315e20e095aaa260e8bbfcb74a88e796bc5360ce97675bac4677acdae",
      "label": "禁用 USB 3 链路电源管理 · 电池供电",
      "category": "外设优化",
      "categoryId": "PeripheralTweaks",
      "level": 2,
      "aliases": [
        {
          "category": "外设优化",
          "categoryId": "PeripheralTweaks",
          "label": "禁用 USB 3 链路电源管理"
        }
      ],
      "options": [
        {
          "id": "v-6ae8e39e9a6772e993b459be859d14f0",
          "label": "调整选项 · 2",
          "value": {
            "kind": "Power",
            "index": 2
          }
        }
      ],
      "target": {
        "kind": "power",
        "path": "2A737441-1930-4402-8D77-B2BEBBA308A3",
        "name": "D4E98F31-5FFE-4CE1-BE31-1B38B384C009",
        "side": "dc"
      }
    },
    {
      "id": "fb35d226007bd1fc92d96575a9a385b611cc049dad8d358b67059addf2acdb1b",
      "label": "USB 集线器选择性挂起超时归零 · 接通电源",
      "category": "外设优化",
      "categoryId": "PeripheralTweaks",
      "level": 2,
      "aliases": [
        {
          "category": "外设优化",
          "categoryId": "PeripheralTweaks",
          "label": "USB 集线器选择性挂起超时归零"
        }
      ],
      "options": [
        {
          "id": "v-8efbfdec02718787ba4a4a56f55e6431",
          "label": "默认选项 · 50",
          "value": {
            "kind": "Power",
            "index": 50
          }
        },
        {
          "id": "v-a20f5b8d1666a17cbb6f24b316d75ba8",
          "label": "调整选项 · 0",
          "value": {
            "kind": "Power",
            "index": 0
          }
        }
      ],
      "target": {
        "kind": "power",
        "path": "2A737441-1930-4402-8D77-B2BEBBA308A3",
        "name": "0853A681-27C8-4100-A2FD-82013E970683",
        "side": "ac"
      }
    },
    {
      "id": "baa53991e925c0d23c2643d0aa1f9d412b064492d80255a8f67c34f7251c00ba",
      "label": "USB 集线器选择性挂起超时归零 · 电池供电",
      "category": "外设优化",
      "categoryId": "PeripheralTweaks",
      "level": 2,
      "aliases": [
        {
          "category": "外设优化",
          "categoryId": "PeripheralTweaks",
          "label": "USB 集线器选择性挂起超时归零"
        }
      ],
      "options": [
        {
          "id": "v-51711e294d239f8a2a273db9ab13f40e",
          "label": "调整选项 · 1000",
          "value": {
            "kind": "Power",
            "index": 1e3
          }
        },
        {
          "id": "v-8efbfdec02718787ba4a4a56f55e6431",
          "label": "默认选项 · 50",
          "value": {
            "kind": "Power",
            "index": 50
          }
        }
      ],
      "target": {
        "kind": "power",
        "path": "2A737441-1930-4402-8D77-B2BEBBA308A3",
        "name": "0853A681-27C8-4100-A2FD-82013E970683",
        "side": "dc"
      }
    },
    {
      "id": "488482265b895aa0a6f2b2f3079b4f2aa488edb3dc9696790a373f1f7a9a88c8",
      "label": "缩短鼠标悬停触发时间",
      "category": "外设优化",
      "categoryId": "PeripheralTweaks",
      "level": 1,
      "aliases": [
        {
          "category": "外设优化",
          "categoryId": "PeripheralTweaks",
          "label": "缩短鼠标悬停触发时间"
        }
      ],
      "options": [
        {
          "id": "unset",
          "label": "未配置",
          "value": null
        },
        {
          "id": "v-37e88116e0613c0fded18fea43645d90",
          "label": "调整选项 · 100",
          "value": {
            "kind": "String",
            "data": "100"
          }
        },
        {
          "id": "v-6135cd68cfe6d2b21636a8229007466b",
          "label": "默认选项 · 400",
          "value": {
            "kind": "String",
            "data": "400"
          }
        }
      ],
      "target": {
        "kind": "registry",
        "path": "HKCU\\Control Panel\\Mouse",
        "name": "MouseHoverTime"
      }
    },
    {
      "id": "91107e3df814472b1d3152b850dca3f5723345d2bf8fc7faa642dd983cb5f872",
      "label": "鼠标灵敏度恢复中间档",
      "category": "外设优化",
      "categoryId": "PeripheralTweaks",
      "level": 1,
      "aliases": [
        {
          "category": "外设优化",
          "categoryId": "PeripheralTweaks",
          "label": "鼠标灵敏度恢复中间档"
        }
      ],
      "options": [
        {
          "id": "unset",
          "label": "未配置",
          "value": null
        },
        {
          "id": "v-509049fb0bbadaf05df6f1f338e9abbc",
          "label": "调整选项 · 10",
          "value": {
            "kind": "String",
            "data": "10"
          }
        }
      ],
      "target": {
        "kind": "registry",
        "path": "HKCU\\Control Panel\\Mouse",
        "name": "MouseSensitivity"
      }
    },
    {
      "id": "0d71daa23f7f7fa135cd4ae522abde31f414c1f52d436a144bb152d732b6a422",
      "label": "关闭非活动窗口滚动",
      "category": "外设优化",
      "categoryId": "PeripheralTweaks",
      "level": 2,
      "aliases": [
        {
          "category": "外设优化",
          "categoryId": "PeripheralTweaks",
          "label": "关闭非活动窗口滚动"
        }
      ],
      "options": [
        {
          "id": "unset",
          "label": "未配置",
          "value": null
        },
        {
          "id": "v-b890d43c0a1fc60d0dc8c9217ad2d002",
          "label": "默认选项 · 2",
          "value": {
            "kind": "DWord",
            "data": 2
          }
        },
        {
          "id": "v-fee7da91b6fbd7504ee5455a1b3c6487",
          "label": "调整选项 · 0",
          "value": {
            "kind": "DWord",
            "data": 0
          }
        }
      ],
      "target": {
        "kind": "registry",
        "path": "HKCU\\Control Panel\\Desktop",
        "name": "MouseWheelRouting"
      }
    },
    {
      "id": "81dd9125a573b2a394f1fc467a097d8d0da21dfaf4b2107f3d1ee7b4f13f160b",
      "label": "禁用鼠标指针轨迹",
      "category": "外设优化",
      "categoryId": "PeripheralTweaks",
      "level": 1,
      "aliases": [
        {
          "category": "外设优化",
          "categoryId": "PeripheralTweaks",
          "label": "禁用鼠标指针轨迹"
        }
      ],
      "options": [
        {
          "id": "unset",
          "label": "未配置",
          "value": null
        },
        {
          "id": "v-c1e5eb61e98cbbc5c50792e061d41f09",
          "label": "调整选项 · 0",
          "value": {
            "kind": "String",
            "data": "0"
          }
        }
      ],
      "target": {
        "kind": "registry",
        "path": "HKCU\\Control Panel\\Mouse",
        "name": "MouseTrails"
      }
    },
    {
      "id": "307130f58603e79d7b8ff5a564c2ab13d1701607153a7f92f4becb6048a4cbfe",
      "label": "禁用鼠标自动吸附",
      "category": "外设优化",
      "categoryId": "PeripheralTweaks",
      "level": 1,
      "aliases": [
        {
          "category": "外设优化",
          "categoryId": "PeripheralTweaks",
          "label": "禁用鼠标自动吸附"
        }
      ],
      "options": [
        {
          "id": "unset",
          "label": "未配置",
          "value": null
        },
        {
          "id": "v-c1e5eb61e98cbbc5c50792e061d41f09",
          "label": "调整选项 · 0",
          "value": {
            "kind": "String",
            "data": "0"
          }
        }
      ],
      "target": {
        "kind": "registry",
        "path": "HKCU\\Control Panel\\Mouse",
        "name": "SnapToDefaultButton"
      }
    },
    {
      "id": "bfe041d41442a1314312af9c41a7fcc4652339b316343f669432be391f1117b6",
      "label": "禁用触控反馈 · ContactVisualization",
      "category": "外设优化",
      "categoryId": "PeripheralTweaks",
      "level": 1,
      "aliases": [
        {
          "category": "外设优化",
          "categoryId": "PeripheralTweaks",
          "label": "禁用触控反馈"
        }
      ],
      "options": [
        {
          "id": "unset",
          "label": "未配置",
          "value": null
        },
        {
          "id": "v-fee7da91b6fbd7504ee5455a1b3c6487",
          "label": "调整选项 · 0",
          "value": {
            "kind": "DWord",
            "data": 0
          }
        }
      ],
      "target": {
        "kind": "registry",
        "path": "HKCU\\Control Panel\\Cursors",
        "name": "ContactVisualization"
      }
    },
    {
      "id": "497d4ca801299a8457a1398f7c1816d58a41218db0d4f71dfc793659e296579d",
      "label": "禁用触控反馈 · GestureVisualization",
      "category": "外设优化",
      "categoryId": "PeripheralTweaks",
      "level": 1,
      "aliases": [
        {
          "category": "外设优化",
          "categoryId": "PeripheralTweaks",
          "label": "禁用触控反馈"
        }
      ],
      "options": [
        {
          "id": "unset",
          "label": "未配置",
          "value": null
        },
        {
          "id": "v-fee7da91b6fbd7504ee5455a1b3c6487",
          "label": "调整选项 · 0",
          "value": {
            "kind": "DWord",
            "data": 0
          }
        }
      ],
      "target": {
        "kind": "registry",
        "path": "HKCU\\Control Panel\\Cursors",
        "name": "GestureVisualization"
      }
    },
    {
      "id": "3d17392ec38f82836314513629483e33cdbe0758f8d1b580e9be79c7e4b498ac",
      "label": "禁用笔输入反馈",
      "category": "外设优化",
      "categoryId": "PeripheralTweaks",
      "level": 1,
      "aliases": [
        {
          "category": "外设优化",
          "categoryId": "PeripheralTweaks",
          "label": "禁用笔输入反馈"
        }
      ],
      "options": [
        {
          "id": "unset",
          "label": "未配置",
          "value": null
        },
        {
          "id": "v-3eb2f7bb1fa0bb2f3b1ca7a7071ff39e",
          "label": "默认选项 · 1",
          "value": {
            "kind": "DWord",
            "data": 1
          }
        },
        {
          "id": "v-fee7da91b6fbd7504ee5455a1b3c6487",
          "label": "调整选项 · 0",
          "value": {
            "kind": "DWord",
            "data": 0
          }
        }
      ],
      "target": {
        "kind": "registry",
        "path": "HKCU\\Software\\Microsoft\\TabletTip\\1.7",
        "name": "PenVisualization"
      }
    },
    {
      "id": "bf758c0855e5f93cc129b5a4fec4e9e4375c7ee83b300390328119ba91d4360d",
      "label": "禁用 Win 键误触",
      "category": "外设优化",
      "categoryId": "PeripheralTweaks",
      "level": 3,
      "aliases": [
        {
          "category": "外设优化",
          "categoryId": "PeripheralTweaks",
          "label": "禁用 Win 键误触"
        }
      ],
      "options": [
        {
          "id": "unset",
          "label": "未配置",
          "value": null
        },
        {
          "id": "v-3eb2f7bb1fa0bb2f3b1ca7a7071ff39e",
          "label": "调整选项 · 1",
          "value": {
            "kind": "DWord",
            "data": 1
          }
        }
      ],
      "target": {
        "kind": "registry",
        "path": "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Policies\\Explorer",
        "name": "NoWinKeys"
      }
    },
    {
      "id": "0e63612d71447e59f5e9f32d4d344354d56eeb1a49c08befc5aad82e978aa2de",
      "label": "优化 USB 键盘输入队列",
      "category": "外设优化",
      "categoryId": "PeripheralTweaks",
      "level": 2,
      "aliases": [
        {
          "category": "外设优化",
          "categoryId": "PeripheralTweaks",
          "label": "优化 USB 键盘输入队列"
        }
      ],
      "options": [
        {
          "id": "unset",
          "label": "未配置",
          "value": null
        },
        {
          "id": "v-6efd9652e39f876e28ce93a7682d6a64",
          "label": "调整选项 · 200",
          "value": {
            "kind": "DWord",
            "data": 200
          }
        },
        {
          "id": "v-b748ab907905eb971c12668d9b9cd05f",
          "label": "默认选项 · 100",
          "value": {
            "kind": "DWord",
            "data": 100
          }
        }
      ],
      "target": {
        "kind": "registry",
        "path": "HKLM\\SYSTEM\\CurrentControlSet\\Services\\kbdclass\\Parameters",
        "name": "KeyboardDataQueueSize"
      }
    },
    {
      "id": "9c18ba81251fbe98d41e11a90ab7aa3286e7d58bda05fa6cfc16e4dd2fea86d6",
      "label": "提升游戏任务图形优先级",
      "category": "外设优化",
      "categoryId": "PeripheralTweaks",
      "level": 2,
      "aliases": [
        {
          "category": "外设优化",
          "categoryId": "PeripheralTweaks",
          "label": "提升游戏任务图形优先级"
        }
      ],
      "options": [
        {
          "id": "unset",
          "label": "未配置",
          "value": null
        },
        {
          "id": "v-fa107e7c438972f47522da0f9970c588",
          "label": "调整选项 · 8",
          "value": {
            "kind": "DWord",
            "data": 8
          }
        },
        {
          "id": "v-fee7da91b6fbd7504ee5455a1b3c6487",
          "label": "默认选项 · 0",
          "value": {
            "kind": "DWord",
            "data": 0
          }
        }
      ],
      "target": {
        "kind": "registry",
        "path": "HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Multimedia\\SystemProfile\\Tasks\\Games",
        "name": "GPU Priority"
      }
    },
    {
      "id": "fe369ce8d43871853448d961de708717b21ad173af5b8351b647930932f851b1",
      "label": "关闭前台应用灯效接管",
      "category": "外设优化",
      "categoryId": "PeripheralTweaks",
      "level": 1,
      "aliases": [
        {
          "category": "外设优化",
          "categoryId": "PeripheralTweaks",
          "label": "关闭前台应用灯效接管"
        }
      ],
      "options": [
        {
          "id": "unset",
          "label": "未配置",
          "value": null
        },
        {
          "id": "v-fee7da91b6fbd7504ee5455a1b3c6487",
          "label": "调整选项 · 0",
          "value": {
            "kind": "DWord",
            "data": 0
          }
        }
      ],
      "target": {
        "kind": "registry",
        "path": "HKCU\\Software\\Microsoft\\Lighting",
        "name": "ControlledByForegroundApp"
      }
    },
    {
      "id": "756c5a1eb45cdcaae7609180020ae2ae287b62b7f418ae4216a1adf7d4292db5",
      "label": "关闭 Windows 动态光照接管",
      "category": "外设优化",
      "categoryId": "PeripheralTweaks",
      "level": 1,
      "aliases": [
        {
          "category": "外设优化",
          "categoryId": "PeripheralTweaks",
          "label": "关闭 Windows 动态光照接管"
        }
      ],
      "options": [
        {
          "id": "unset",
          "label": "未配置",
          "value": null
        },
        {
          "id": "v-fee7da91b6fbd7504ee5455a1b3c6487",
          "label": "调整选项 · 0",
          "value": {
            "kind": "DWord",
            "data": 0
          }
        }
      ],
      "target": {
        "kind": "registry",
        "path": "HKCU\\Software\\Microsoft\\Lighting",
        "name": "AmbientLightingEnabled"
      }
    },
    {
      "id": "f6fc2ab2ac5da9c4f2869e8aec5db29591b6c8ca9327e99ee3310c2592962b02",
      "label": "关闭无障碍功能启用提示音",
      "category": "外设优化",
      "categoryId": "PeripheralTweaks",
      "level": 1,
      "aliases": [
        {
          "category": "外设优化",
          "categoryId": "PeripheralTweaks",
          "label": "关闭无障碍功能启用提示音"
        }
      ],
      "options": [
        {
          "id": "unset",
          "label": "未配置",
          "value": null
        },
        {
          "id": "v-fee7da91b6fbd7504ee5455a1b3c6487",
          "label": "调整选项 · 0",
          "value": {
            "kind": "DWord",
            "data": 0
          }
        }
      ],
      "target": {
        "kind": "registry",
        "path": "HKCU\\Control Panel\\Accessibility",
        "name": "Sound on Activation"
      }
    },
    {
      "id": "49e2be2b7623604f380b73f5c98f94c9525611c741254ff65606373050d174ed",
      "label": "关闭无障碍警告提示音",
      "category": "外设优化",
      "categoryId": "PeripheralTweaks",
      "level": 1,
      "aliases": [
        {
          "category": "外设优化",
          "categoryId": "PeripheralTweaks",
          "label": "关闭无障碍警告提示音"
        }
      ],
      "options": [
        {
          "id": "unset",
          "label": "未配置",
          "value": null
        },
        {
          "id": "v-fee7da91b6fbd7504ee5455a1b3c6487",
          "label": "调整选项 · 0",
          "value": {
            "kind": "DWord",
            "data": 0
          }
        }
      ],
      "target": {
        "kind": "registry",
        "path": "HKCU\\Control Panel\\Accessibility",
        "name": "Warning Sounds"
      }
    },
    {
      "id": "8a639b8efca2ebdf74e0164b78b3635452b76a96c2a8f5c25d3c7fb8d9b1ec15",
      "label": "禁用讲述人快捷键",
      "category": "外设优化",
      "categoryId": "PeripheralTweaks",
      "level": 1,
      "aliases": [
        {
          "category": "外设优化",
          "categoryId": "PeripheralTweaks",
          "label": "禁用讲述人快捷键"
        }
      ],
      "options": [
        {
          "id": "unset",
          "label": "未配置",
          "value": null
        },
        {
          "id": "v-fee7da91b6fbd7504ee5455a1b3c6487",
          "label": "调整选项 · 0",
          "value": {
            "kind": "DWord",
            "data": 0
          }
        }
      ],
      "target": {
        "kind": "registry",
        "path": "HKCU\\Software\\Microsoft\\Narrator\\NoRoam",
        "name": "WinEnterLaunchEnabled"
      }
    },
    {
      "id": "bd750da34a589b840d35a46d1b0d7f8b8b2023aa2de37902c0c25008676da38c",
      "label": "关闭默认打印机自动管理",
      "category": "外设优化",
      "categoryId": "PeripheralTweaks",
      "level": 1,
      "aliases": [
        {
          "category": "外设优化",
          "categoryId": "PeripheralTweaks",
          "label": "关闭默认打印机自动管理"
        }
      ],
      "options": [
        {
          "id": "unset",
          "label": "未配置",
          "value": null
        },
        {
          "id": "v-3eb2f7bb1fa0bb2f3b1ca7a7071ff39e",
          "label": "调整选项 · 1",
          "value": {
            "kind": "DWord",
            "data": 1
          }
        },
        {
          "id": "v-fee7da91b6fbd7504ee5455a1b3c6487",
          "label": "默认选项 · 0",
          "value": {
            "kind": "DWord",
            "data": 0
          }
        }
      ],
      "target": {
        "kind": "registry",
        "path": "HKCU\\Software\\Microsoft\\Windows NT\\CurrentVersion\\Windows",
        "name": "LegacyDefaultPrinterMode"
      }
    },
    {
      "id": "04bfa64e3ea5cf52cffac550364faf5afd152b26f5c5f7a82f8fbd7b9f27f32b",
      "label": "禁用音频增强",
      "category": "音频优化",
      "categoryId": "AudioTweaks",
      "level": 1,
      "aliases": [
        {
          "category": "音频优化",
          "categoryId": "AudioTweaks",
          "label": "禁用音频增强"
        }
      ],
      "options": [
        {
          "id": "unset",
          "label": "未配置",
          "value": null
        },
        {
          "id": "v-3eb2f7bb1fa0bb2f3b1ca7a7071ff39e",
          "label": "调整选项 · 1",
          "value": {
            "kind": "DWord",
            "data": 1
          }
        },
        {
          "id": "v-fee7da91b6fbd7504ee5455a1b3c6487",
          "label": "默认选项 · 0",
          "value": {
            "kind": "DWord",
            "data": 0
          }
        }
      ],
      "target": {
        "kind": "registry",
        "path": "HKCU\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Audio",
        "name": "DisableSystemEffects"
      }
    },
    {
      "id": "ac75935384aebb19c737a7e680a6b02fd2ad376b40977e1ffc5de862b929cd8b",
      "label": "提高音频任务优先级",
      "category": "音频优化",
      "categoryId": "AudioTweaks",
      "level": 2,
      "aliases": [
        {
          "category": "音频优化",
          "categoryId": "AudioTweaks",
          "label": "提高音频任务优先级"
        }
      ],
      "options": [
        {
          "id": "unset",
          "label": "未配置",
          "value": null
        },
        {
          "id": "v-2b115b3943e1c075e6025f4a84623052",
          "label": "调整选项 · 6",
          "value": {
            "kind": "DWord",
            "data": 6
          }
        },
        {
          "id": "v-b890d43c0a1fc60d0dc8c9217ad2d002",
          "label": "默认选项 · 2",
          "value": {
            "kind": "DWord",
            "data": 2
          }
        }
      ],
      "target": {
        "kind": "registry",
        "path": "HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Multimedia\\SystemProfile\\Tasks\\Audio",
        "name": "Priority"
      }
    },
    {
      "id": "f561ee23fec5b93481c828584d7ca3641c445603be91d2da0e15d42c659b9097",
      "label": "禁用空间音效",
      "category": "音频优化",
      "categoryId": "AudioTweaks",
      "level": 1,
      "aliases": [
        {
          "category": "音频优化",
          "categoryId": "AudioTweaks",
          "label": "禁用空间音效"
        }
      ],
      "options": [
        {
          "id": "unset",
          "label": "未配置",
          "value": null
        },
        {
          "id": "v-3eb2f7bb1fa0bb2f3b1ca7a7071ff39e",
          "label": "默认选项 · 1",
          "value": {
            "kind": "DWord",
            "data": 1
          }
        },
        {
          "id": "v-fee7da91b6fbd7504ee5455a1b3c6487",
          "label": "调整选项 · 0",
          "value": {
            "kind": "DWord",
            "data": 0
          }
        }
      ],
      "target": {
        "kind": "registry",
        "path": "HKCU\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Audio",
        "name": "EnableSpatialAudio"
      }
    },
    {
      "id": "b0f704b03af0a41f97108c931053d88124611b9e9b9c96f2dcc92e478a2affcc",
      "label": "启用 Games 低延迟调度标记",
      "category": "音频优化",
      "categoryId": "AudioTweaks",
      "level": 2,
      "aliases": [
        {
          "category": "音频优化",
          "categoryId": "AudioTweaks",
          "label": "启用 Games 低延迟调度标记"
        }
      ],
      "options": [
        {
          "id": "unset",
          "label": "未配置",
          "value": null
        },
        {
          "id": "v-1f77af793cb363ea336074edbcc32210",
          "label": "调整选项 · True",
          "value": {
            "kind": "String",
            "data": "True"
          }
        },
        {
          "id": "v-74d0820e28555d494e94d33a1e0e47b4",
          "label": "默认选项 · False",
          "value": {
            "kind": "String",
            "data": "False"
          }
        }
      ],
      "target": {
        "kind": "registry",
        "path": "HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Multimedia\\SystemProfile\\Tasks\\Games",
        "name": "Latency Sensitive"
      }
    },
    {
      "id": "9b88d43610070a4c1d315d1875b985fe45e585730e7beb230885e77949e03889",
      "label": "禁用 Windows Audio 延迟启动",
      "category": "音频优化",
      "categoryId": "AudioTweaks",
      "level": 2,
      "aliases": [
        {
          "category": "音频优化",
          "categoryId": "AudioTweaks",
          "label": "禁用 Windows Audio 延迟启动"
        }
      ],
      "options": [
        {
          "id": "unset",
          "label": "未配置",
          "value": null
        },
        {
          "id": "v-3eb2f7bb1fa0bb2f3b1ca7a7071ff39e",
          "label": "默认选项 · 1",
          "value": {
            "kind": "DWord",
            "data": 1
          }
        },
        {
          "id": "v-fee7da91b6fbd7504ee5455a1b3c6487",
          "label": "调整选项 · 0",
          "value": {
            "kind": "DWord",
            "data": 0
          }
        }
      ],
      "target": {
        "kind": "registry",
        "path": "HKLM\\SYSTEM\\CurrentControlSet\\Services\\Audiosrv",
        "name": "DelayedAutoStart"
      }
    },
    {
      "id": "84ea4825402b4204153ef64aa5dd1091e54474918a0277792e66f8476aebaf8e",
      "label": "调整音频任务调度 · Affinity",
      "category": "音频优化",
      "categoryId": "AudioTweaks",
      "level": 2,
      "aliases": [
        {
          "category": "音频优化",
          "categoryId": "AudioTweaks",
          "label": "调整音频任务调度"
        }
      ],
      "options": [
        {
          "id": "unset",
          "label": "未配置",
          "value": null
        },
        {
          "id": "v-fee7da91b6fbd7504ee5455a1b3c6487",
          "label": "调整选项 · 0",
          "value": {
            "kind": "DWord",
            "data": 0
          }
        }
      ],
      "target": {
        "kind": "registry",
        "path": "HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Multimedia\\SystemProfile\\Tasks\\Audio",
        "name": "Affinity"
      }
    },
    {
      "id": "b918f02df460034f69e7d61cee149090427681afd6ebda6cf431623d5553aa20",
      "label": "调整音频任务调度 · Scheduling Category",
      "category": "音频优化",
      "categoryId": "AudioTweaks",
      "level": 2,
      "aliases": [
        {
          "category": "音频优化",
          "categoryId": "AudioTweaks",
          "label": "调整音频任务调度"
        }
      ],
      "options": [
        {
          "id": "unset",
          "label": "未配置",
          "value": null
        },
        {
          "id": "v-efa63e3004bcd1eac74117cca9bbd0b9",
          "label": "调整选项 · High",
          "value": {
            "kind": "String",
            "data": "High"
          }
        }
      ],
      "target": {
        "kind": "registry",
        "path": "HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Multimedia\\SystemProfile\\Tasks\\Audio",
        "name": "Scheduling Category"
      }
    },
    {
      "id": "cdd2ef9f8a4967265a58a1c9867b6f8fc553deadb7655c50e7673dd88810a07d",
      "label": "调整音频任务调度 · SFIO Priority",
      "category": "音频优化",
      "categoryId": "AudioTweaks",
      "level": 2,
      "aliases": [
        {
          "category": "音频优化",
          "categoryId": "AudioTweaks",
          "label": "调整音频任务调度"
        }
      ],
      "options": [
        {
          "id": "unset",
          "label": "未配置",
          "value": null
        },
        {
          "id": "v-efa63e3004bcd1eac74117cca9bbd0b9",
          "label": "调整选项 · High",
          "value": {
            "kind": "String",
            "data": "High"
          }
        }
      ],
      "target": {
        "kind": "registry",
        "path": "HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Multimedia\\SystemProfile\\Tasks\\Audio",
        "name": "SFIO Priority"
      }
    },
    {
      "id": "4d3e165c9e3d1d9cbd61b5f322efb9682339ee906eeebda937f79ccf6ec48068",
      "label": "禁用通信音量衰减",
      "category": "音频优化",
      "categoryId": "AudioTweaks",
      "level": 1,
      "aliases": [
        {
          "category": "音频优化",
          "categoryId": "AudioTweaks",
          "label": "禁用通信音量衰减"
        }
      ],
      "options": [
        {
          "id": "unset",
          "label": "未配置",
          "value": null
        },
        {
          "id": "v-69ff2138a3bbd9c0b33822530927b77a",
          "label": "调整选项 · 3",
          "value": {
            "kind": "DWord",
            "data": 3
          }
        },
        {
          "id": "v-fee7da91b6fbd7504ee5455a1b3c6487",
          "label": "默认选项 · 0",
          "value": {
            "kind": "DWord",
            "data": 0
          }
        }
      ],
      "target": {
        "kind": "registry",
        "path": "HKCU\\SOFTWARE\\Microsoft\\Multimedia\\Audio",
        "name": "UserDuckingPreference"
      }
    },
    {
      "id": "a46242bcd6ec9f9057267886dc8dd428929d1c6266b9c70bdbe36f9b87b27ac5",
      "label": "关闭讲述人压低音量",
      "category": "音频优化",
      "categoryId": "AudioTweaks",
      "level": 1,
      "aliases": [
        {
          "category": "音频优化",
          "categoryId": "AudioTweaks",
          "label": "关闭讲述人压低音量"
        }
      ],
      "options": [
        {
          "id": "unset",
          "label": "未配置",
          "value": null
        },
        {
          "id": "v-3eb2f7bb1fa0bb2f3b1ca7a7071ff39e",
          "label": "默认选项 · 1",
          "value": {
            "kind": "DWord",
            "data": 1
          }
        },
        {
          "id": "v-fee7da91b6fbd7504ee5455a1b3c6487",
          "label": "调整选项 · 0",
          "value": {
            "kind": "DWord",
            "data": 0
          }
        }
      ],
      "target": {
        "kind": "registry",
        "path": "HKCU\\Software\\Microsoft\\Narrator\\NoRoam",
        "name": "DuckAudio"
      }
    },
    {
      "id": "86fd6e0ff45fc11468990418d58794ff3ce02e9622aff32fd8ecb94680297a23",
      "label": "关闭应用语音激活",
      "category": "音频优化",
      "categoryId": "AudioTweaks",
      "level": 1,
      "aliases": [
        {
          "category": "音频优化",
          "categoryId": "AudioTweaks",
          "label": "关闭应用语音激活"
        }
      ],
      "options": [
        {
          "id": "unset",
          "label": "未配置",
          "value": null
        },
        {
          "id": "v-3eb2f7bb1fa0bb2f3b1ca7a7071ff39e",
          "label": "默认选项 · 1",
          "value": {
            "kind": "DWord",
            "data": 1
          }
        },
        {
          "id": "v-fee7da91b6fbd7504ee5455a1b3c6487",
          "label": "调整选项 · 0",
          "value": {
            "kind": "DWord",
            "data": 0
          }
        }
      ],
      "target": {
        "kind": "registry",
        "path": "HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\SpeechOneCore\\Settings",
        "name": "AgentActivationEnabled"
      }
    },
    {
      "id": "d683fcccdf3fbfbe77b3265bffc3c313cbfe27860ad92e80088746f0c110b48f",
      "label": "关闭语音激活上次配置记忆",
      "category": "音频优化",
      "categoryId": "AudioTweaks",
      "level": 1,
      "aliases": [
        {
          "category": "音频优化",
          "categoryId": "AudioTweaks",
          "label": "关闭语音激活上次配置记忆"
        }
      ],
      "options": [
        {
          "id": "unset",
          "label": "未配置",
          "value": null
        },
        {
          "id": "v-3eb2f7bb1fa0bb2f3b1ca7a7071ff39e",
          "label": "默认选项 · 1",
          "value": {
            "kind": "DWord",
            "data": 1
          }
        },
        {
          "id": "v-fee7da91b6fbd7504ee5455a1b3c6487",
          "label": "调整选项 · 0",
          "value": {
            "kind": "DWord",
            "data": 0
          }
        }
      ],
      "target": {
        "kind": "registry",
        "path": "HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\SpeechOneCore\\Settings",
        "name": "AgentActivationLastUsed"
      }
    },
    {
      "id": "80e1a0fefd511edf9196f1bb576c4955fbfe78c81ca6b0ba9b360e1b65770ae4",
      "label": "广告 ID 个性化关闭 · Enabled",
      "category": "隐私防护",
      "categoryId": "PrivacyTweaks",
      "level": 2,
      "aliases": [
        {
          "category": "隐私防护",
          "categoryId": "PrivacyTweaks",
          "label": "广告 ID 个性化关闭"
        }
      ],
      "options": [
        {
          "id": "unset",
          "label": "未配置",
          "value": null
        },
        {
          "id": "v-3eb2f7bb1fa0bb2f3b1ca7a7071ff39e",
          "label": "默认选项 · 1",
          "value": {
            "kind": "DWord",
            "data": 1
          }
        },
        {
          "id": "v-fee7da91b6fbd7504ee5455a1b3c6487",
          "label": "调整选项 · 0",
          "value": {
            "kind": "DWord",
            "data": 0
          }
        }
      ],
      "target": {
        "kind": "registry",
        "path": "HKCU\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\AdvertisingInfo",
        "name": "Enabled"
      }
    },
    {
      "id": "0d04285c8cfd24351ae1a92a25f4a360baaef2f5bf68ae95bc1f124fdae91c9d",
      "label": "广告 ID 个性化关闭 · Id",
      "category": "隐私防护",
      "categoryId": "PrivacyTweaks",
      "level": 2,
      "aliases": [
        {
          "category": "隐私防护",
          "categoryId": "PrivacyTweaks",
          "label": "广告 ID 个性化关闭"
        }
      ],
      "options": [
        {
          "id": "unset",
          "label": "未配置",
          "value": null
        },
        {
          "id": "v-d780755a9e6f83c7d374dfb382823f51",
          "label": "调整选项 · 00000000-0000-0000-0000-000000000000",
          "value": {
            "kind": "String",
            "data": "00000000-0000-0000-0000-000000000000"
          }
        }
      ],
      "target": {
        "kind": "registry",
        "path": "HKCU\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\AdvertisingInfo",
        "name": "Id"
      }
    },
    {
      "id": "c04bbdd77dfd6fd3cd2c5ea832116924d070d50ab998537e9fe23f2708b038d3",
      "label": "CEIP / SQM 体验数据关闭 · CEIPEnable",
      "category": "隐私防护",
      "categoryId": "PrivacyTweaks",
      "level": 2,
      "aliases": [
        {
          "category": "隐私防护",
          "categoryId": "PrivacyTweaks",
          "label": "CEIP / SQM 体验数据关闭"
        }
      ],
      "options": [
        {
          "id": "unset",
          "label": "未配置",
          "value": null
        },
        {
          "id": "v-fee7da91b6fbd7504ee5455a1b3c6487",
          "label": "调整选项 · 0",
          "value": {
            "kind": "DWord",
            "data": 0
          }
        }
      ],
      "target": {
        "kind": "registry",
        "path": "HKLM\\SOFTWARE\\Microsoft\\SQMClient\\Windows",
        "name": "CEIPEnable"
      }
    },
    {
      "id": "00e94b19d0d1872f920cac49bfd4ca6f8e4ef3378f5a831fa0751137c7b8447e",
      "label": "CEIP / SQM 体验数据关闭 · CEIPEnable",
      "category": "隐私防护",
      "categoryId": "PrivacyTweaks",
      "level": 2,
      "aliases": [
        {
          "category": "隐私防护",
          "categoryId": "PrivacyTweaks",
          "label": "CEIP / SQM 体验数据关闭"
        }
      ],
      "options": [
        {
          "id": "unset",
          "label": "未配置",
          "value": null
        },
        {
          "id": "v-fee7da91b6fbd7504ee5455a1b3c6487",
          "label": "调整选项 · 0",
          "value": {
            "kind": "DWord",
            "data": 0
          }
        }
      ],
      "target": {
        "kind": "registry",
        "path": "HKLM\\SOFTWARE\\Policies\\Microsoft\\SQMClient\\Windows",
        "name": "CEIPEnable"
      }
    },
    {
      "id": "86680d573f5dce2dfcdb9a08421fc7c09ad25c3c7205ee87cda89b505def4798",
      "label": "兼容性遥测关闭",
      "category": "隐私防护",
      "categoryId": "PrivacyTweaks",
      "level": 2,
      "aliases": [
        {
          "category": "隐私防护",
          "categoryId": "PrivacyTweaks",
          "label": "兼容性遥测关闭"
        }
      ],
      "options": [
        {
          "id": "unset",
          "label": "未配置",
          "value": null
        },
        {
          "id": "v-3eb2f7bb1fa0bb2f3b1ca7a7071ff39e",
          "label": "调整选项 · 1",
          "value": {
            "kind": "DWord",
            "data": 1
          }
        }
      ],
      "target": {
        "kind": "registry",
        "path": "HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\AppCompat",
        "name": "DisableUAR"
      }
    },
    {
      "id": "2ebfb1bf7dcf3d3b9bdc078ed2ff669ec95ac4bbdfa6be3e03812727ad747bba",
      "label": "应用影响遥测关闭",
      "category": "隐私防护",
      "categoryId": "PrivacyTweaks",
      "level": 2,
      "aliases": [
        {
          "category": "隐私防护",
          "categoryId": "PrivacyTweaks",
          "label": "应用影响遥测关闭"
        }
      ],
      "options": [
        {
          "id": "unset",
          "label": "未配置",
          "value": null
        },
        {
          "id": "v-fee7da91b6fbd7504ee5455a1b3c6487",
          "label": "调整选项 · 0",
          "value": {
            "kind": "DWord",
            "data": 0
          }
        }
      ],
      "target": {
        "kind": "registry",
        "path": "HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\AppCompat",
        "name": "AITEnable"
      }
    },
    {
      "id": "37e4c80ea44b5f3cd8629f6fadebe82f149bc2ef4551bb1d68f9689983c39896",
      "label": "Inventory 清单遥测关闭",
      "category": "隐私防护",
      "categoryId": "PrivacyTweaks",
      "level": 2,
      "aliases": [
        {
          "category": "隐私防护",
          "categoryId": "PrivacyTweaks",
          "label": "Inventory 清单遥测关闭"
        }
      ],
      "options": [
        {
          "id": "unset",
          "label": "未配置",
          "value": null
        },
        {
          "id": "v-3eb2f7bb1fa0bb2f3b1ca7a7071ff39e",
          "label": "调整选项 · 1",
          "value": {
            "kind": "DWord",
            "data": 1
          }
        }
      ],
      "target": {
        "kind": "registry",
        "path": "HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\AppCompat",
        "name": "DisableInventory"
      }
    },
    {
      "id": "d2175ebc0ab2381147975ebadf3d7c3f6f2f40b944f7ca1b82cd17c2bf13f2c5",
      "label": "许可证遥测关闭",
      "category": "隐私防护",
      "categoryId": "PrivacyTweaks",
      "level": 2,
      "aliases": [
        {
          "category": "隐私防护",
          "categoryId": "PrivacyTweaks",
          "label": "许可证遥测关闭"
        }
      ],
      "options": [
        {
          "id": "unset",
          "label": "未配置",
          "value": null
        },
        {
          "id": "v-3eb2f7bb1fa0bb2f3b1ca7a7071ff39e",
          "label": "调整选项 · 1",
          "value": {
            "kind": "DWord",
            "data": 1
          }
        }
      ],
      "target": {
        "kind": "registry",
        "path": "HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows NT\\CurrentVersion\\Software Protection Platform",
        "name": "NoGenTicket"
      }
    },
    {
      "id": "966abd3353a95356e168339fdd08df19b9fbee64f542dbfca5d7a7e5235e5311",
      "label": "诊断数据限制为必需",
      "category": "隐私防护",
      "categoryId": "PrivacyTweaks",
      "level": 2,
      "aliases": [
        {
          "category": "隐私防护",
          "categoryId": "PrivacyTweaks",
          "label": "诊断数据限制为必需"
        }
      ],
      "options": [
        {
          "id": "unset",
          "label": "未配置",
          "value": null
        },
        {
          "id": "v-3eb2f7bb1fa0bb2f3b1ca7a7071ff39e",
          "label": "调整选项 · 1",
          "value": {
            "kind": "DWord",
            "data": 1
          }
        }
      ],
      "target": {
        "kind": "registry",
        "path": "HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\DataCollection",
        "name": "AllowTelemetry"
      }
    },
    {
      "id": "310018dd3156a2314ae6ce4e534a61ae795d43d55a24477c2762e4fd6a71227e",
      "label": "Windows 反馈提示关闭 · DoNotShowFeedbackNotifications",
      "category": "隐私防护",
      "categoryId": "PrivacyTweaks",
      "level": 2,
      "aliases": [
        {
          "category": "隐私防护",
          "categoryId": "PrivacyTweaks",
          "label": "Windows 反馈提示关闭"
        }
      ],
      "options": [
        {
          "id": "unset",
          "label": "未配置",
          "value": null
        },
        {
          "id": "v-3eb2f7bb1fa0bb2f3b1ca7a7071ff39e",
          "label": "调整选项 · 1",
          "value": {
            "kind": "DWord",
            "data": 1
          }
        }
      ],
      "target": {
        "kind": "registry",
        "path": "HKCU\\SOFTWARE\\Policies\\Microsoft\\Windows\\DataCollection",
        "name": "DoNotShowFeedbackNotifications"
      }
    },
    {
      "id": "7dae2f42b1f06d6cc84c245c494b45ecd17e9142ac13300fd4117d2711c86f7c",
      "label": "Windows 反馈提示关闭 · DoNotShowFeedbackNotifications",
      "category": "隐私防护",
      "categoryId": "PrivacyTweaks",
      "level": 2,
      "aliases": [
        {
          "category": "隐私防护",
          "categoryId": "PrivacyTweaks",
          "label": "Windows 反馈提示关闭"
        }
      ],
      "options": [
        {
          "id": "unset",
          "label": "未配置",
          "value": null
        },
        {
          "id": "v-3eb2f7bb1fa0bb2f3b1ca7a7071ff39e",
          "label": "调整选项 · 1",
          "value": {
            "kind": "DWord",
            "data": 1
          }
        }
      ],
      "target": {
        "kind": "registry",
        "path": "HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\DataCollection",
        "name": "DoNotShowFeedbackNotifications"
      }
    },
    {
      "id": "6bafbb0ed08b7c563cbfb7cfe37ce66f27b1d3b77ef4c2e1b05819188f4a8e8b",
      "label": "Windows 反馈提示关闭 · NumberOfSIUFInPeriod",
      "category": "隐私防护",
      "categoryId": "PrivacyTweaks",
      "level": 2,
      "aliases": [
        {
          "category": "隐私防护",
          "categoryId": "PrivacyTweaks",
          "label": "Windows 反馈提示关闭"
        }
      ],
      "options": [
        {
          "id": "unset",
          "label": "未配置",
          "value": null
        },
        {
          "id": "v-fee7da91b6fbd7504ee5455a1b3c6487",
          "label": "调整选项 · 0",
          "value": {
            "kind": "DWord",
            "data": 0
          }
        }
      ],
      "target": {
        "kind": "registry",
        "path": "HKCU\\SOFTWARE\\Microsoft\\Siuf\\Rules",
        "name": "NumberOfSIUFInPeriod"
      }
    },
    {
      "id": "2637e980b69194930aa06448b2655e8c77e08e641508e2ca627a61c2df598b7c",
      "label": "Windows 反馈提示关闭 · PeriodInNanoSeconds",
      "category": "隐私防护",
      "categoryId": "PrivacyTweaks",
      "level": 2,
      "aliases": [
        {
          "category": "隐私防护",
          "categoryId": "PrivacyTweaks",
          "label": "Windows 反馈提示关闭"
        }
      ],
      "options": [
        {
          "id": "unset",
          "label": "未配置",
          "value": null
        },
        {
          "id": "v-fee7da91b6fbd7504ee5455a1b3c6487",
          "label": "调整选项 · 0",
          "value": {
            "kind": "DWord",
            "data": 0
          }
        }
      ],
      "target": {
        "kind": "registry",
        "path": "HKCU\\SOFTWARE\\Microsoft\\Siuf\\Rules",
        "name": "PeriodInNanoSeconds"
      }
    },
    {
      "id": "0b10d37a2411b83febe3b06eae72ab1bdfcacc867c1de1acaee93ca976a1172c",
      "label": "Windows Error Reporting 关闭 · Disabled",
      "category": "隐私防护",
      "categoryId": "PrivacyTweaks",
      "level": 2,
      "aliases": [
        {
          "category": "隐私防护",
          "categoryId": "PrivacyTweaks",
          "label": "Windows Error Reporting 关闭"
        }
      ],
      "options": [
        {
          "id": "unset",
          "label": "未配置",
          "value": null
        },
        {
          "id": "v-3eb2f7bb1fa0bb2f3b1ca7a7071ff39e",
          "label": "调整选项 · 1",
          "value": {
            "kind": "DWord",
            "data": 1
          }
        }
      ],
      "target": {
        "kind": "registry",
        "path": "HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\Windows Error Reporting",
        "name": "Disabled"
      }
    },
    {
      "id": "edb91cf5c1aebb2d96fd319481fba64d888d6c721202e4bdf82dc82f8248e85a",
      "label": "Windows Error Reporting 关闭 · Disabled",
      "category": "隐私防护",
      "categoryId": "PrivacyTweaks",
      "level": 2,
      "aliases": [
        {
          "category": "隐私防护",
          "categoryId": "PrivacyTweaks",
          "label": "Windows Error Reporting 关闭"
        }
      ],
      "options": [
        {
          "id": "unset",
          "label": "未配置",
          "value": null
        },
        {
          "id": "v-3eb2f7bb1fa0bb2f3b1ca7a7071ff39e",
          "label": "调整选项 · 1",
          "value": {
            "kind": "DWord",
            "data": 1
          }
        }
      ],
      "target": {
        "kind": "registry",
        "path": "HKCU\\SOFTWARE\\Policies\\Microsoft\\Windows\\Windows Error Reporting",
        "name": "Disabled"
      }
    },
    {
      "id": "2cb5d0aa14746de104ad7fc1c0f516b1d31cba6726bed87171837d6cfd803d2d",
      "label": "云推荐内容关闭 · DisableWindowsConsumerFeatures",
      "category": "隐私防护",
      "categoryId": "PrivacyTweaks",
      "level": 2,
      "aliases": [
        {
          "category": "隐私防护",
          "categoryId": "PrivacyTweaks",
          "label": "云推荐内容关闭"
        }
      ],
      "options": [
        {
          "id": "unset",
          "label": "未配置",
          "value": null
        },
        {
          "id": "v-3eb2f7bb1fa0bb2f3b1ca7a7071ff39e",
          "label": "调整选项 · 1",
          "value": {
            "kind": "DWord",
            "data": 1
          }
        }
      ],
      "target": {
        "kind": "registry",
        "path": "HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\CloudContent",
        "name": "DisableWindowsConsumerFeatures"
      }
    },
    {
      "id": "5037ba4763c03f7dd14618514655c3f853322eb5631591ac94108e91954e8d52",
      "label": "云推荐内容关闭 · DisableWindowsSpotlightFeatures",
      "category": "隐私防护",
      "categoryId": "PrivacyTweaks",
      "level": 2,
      "aliases": [
        {
          "category": "隐私防护",
          "categoryId": "PrivacyTweaks",
          "label": "云推荐内容关闭"
        }
      ],
      "options": [
        {
          "id": "unset",
          "label": "未配置",
          "value": null
        },
        {
          "id": "v-3eb2f7bb1fa0bb2f3b1ca7a7071ff39e",
          "label": "调整选项 · 1",
          "value": {
            "kind": "DWord",
            "data": 1
          }
        }
      ],
      "target": {
        "kind": "registry",
        "path": "HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\CloudContent",
        "name": "DisableWindowsSpotlightFeatures"
      }
    },
    {
      "id": "91ab2a1f6a89ff3aa5ea63254957390208c39c7b320da59bccb642c69e803727",
      "label": "云推荐内容关闭 · DisableSoftLanding",
      "category": "隐私防护",
      "categoryId": "PrivacyTweaks",
      "level": 2,
      "aliases": [
        {
          "category": "隐私防护",
          "categoryId": "PrivacyTweaks",
          "label": "云推荐内容关闭"
        }
      ],
      "options": [
        {
          "id": "unset",
          "label": "未配置",
          "value": null
        },
        {
          "id": "v-3eb2f7bb1fa0bb2f3b1ca7a7071ff39e",
          "label": "调整选项 · 1",
          "value": {
            "kind": "DWord",
            "data": 1
          }
        }
      ],
      "target": {
        "kind": "registry",
        "path": "HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\CloudContent",
        "name": "DisableSoftLanding"
      }
    },
    {
      "id": "43551acb329a9fa332187f00147944bce2e40809530f162dded01187c85834b9",
      "label": "关闭 Windows 内容投放",
      "category": "隐私防护",
      "categoryId": "PrivacyTweaks",
      "level": 2,
      "aliases": [
        {
          "category": "隐私防护",
          "categoryId": "PrivacyTweaks",
          "label": "关闭 Windows 内容投放"
        }
      ],
      "options": [
        {
          "id": "unset",
          "label": "未配置",
          "value": null
        },
        {
          "id": "v-3eb2f7bb1fa0bb2f3b1ca7a7071ff39e",
          "label": "默认选项 · 1",
          "value": {
            "kind": "DWord",
            "data": 1
          }
        },
        {
          "id": "v-fee7da91b6fbd7504ee5455a1b3c6487",
          "label": "调整选项 · 0",
          "value": {
            "kind": "DWord",
            "data": 0
          }
        }
      ],
      "target": {
        "kind": "registry",
        "path": "HKCU\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\ContentDeliveryManager",
        "name": "ContentDeliveryAllowed"
      }
    },
    {
      "id": "48a08e2d5e4b59c43a38edf02f930b75b5c91c1bc992bf242b487f8f6b6e78c0",
      "label": "设置/应用同步关闭 · DisableSettingSync",
      "category": "隐私防护",
      "categoryId": "PrivacyTweaks",
      "level": 2,
      "aliases": [
        {
          "category": "隐私防护",
          "categoryId": "PrivacyTweaks",
          "label": "设置/应用同步关闭"
        }
      ],
      "options": [
        {
          "id": "unset",
          "label": "未配置",
          "value": null
        },
        {
          "id": "v-3eb2f7bb1fa0bb2f3b1ca7a7071ff39e",
          "label": "调整选项 · 1",
          "value": {
            "kind": "DWord",
            "data": 1
          }
        }
      ],
      "target": {
        "kind": "registry",
        "path": "HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\SettingSync",
        "name": "DisableSettingSync"
      }
    },
    {
      "id": "925dec4639d9f02f6b98b60b39de53a67062a394a1b4877a4a7747ba5829d282",
      "label": "设置/应用同步关闭 · DisableSettingSyncUserOverride",
      "category": "隐私防护",
      "categoryId": "PrivacyTweaks",
      "level": 2,
      "aliases": [
        {
          "category": "隐私防护",
          "categoryId": "PrivacyTweaks",
          "label": "设置/应用同步关闭"
        }
      ],
      "options": [
        {
          "id": "unset",
          "label": "未配置",
          "value": null
        },
        {
          "id": "v-3eb2f7bb1fa0bb2f3b1ca7a7071ff39e",
          "label": "调整选项 · 1",
          "value": {
            "kind": "DWord",
            "data": 1
          }
        }
      ],
      "target": {
        "kind": "registry",
        "path": "HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\SettingSync",
        "name": "DisableSettingSyncUserOverride"
      }
    },
    {
      "id": "3a92ac8dd6384855d8938dd0bcdb469dbeceed9bbdcc0f25c487b199d6bba483",
      "label": "关闭本机搜索历史",
      "category": "隐私防护",
      "categoryId": "PrivacyTweaks",
      "level": 2,
      "aliases": [
        {
          "category": "隐私防护",
          "categoryId": "PrivacyTweaks",
          "label": "关闭本机搜索历史"
        }
      ],
      "options": [
        {
          "id": "unset",
          "label": "未配置",
          "value": null
        },
        {
          "id": "v-fee7da91b6fbd7504ee5455a1b3c6487",
          "label": "调整选项 · 0",
          "value": {
            "kind": "DWord",
            "data": 0
          }
        }
      ],
      "target": {
        "kind": "registry",
        "path": "HKCU\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\SearchSettings",
        "name": "IsDeviceSearchHistoryEnabled"
      }
    },
    {
      "id": "0f5d2fc4ac4e6b38680575bffede84809d8a8136e0f4f4fae973bc23dccc1b29",
      "label": "关闭微软账户云内容搜索",
      "category": "隐私防护",
      "categoryId": "PrivacyTweaks",
      "level": 2,
      "aliases": [
        {
          "category": "隐私防护",
          "categoryId": "PrivacyTweaks",
          "label": "关闭微软账户云内容搜索"
        }
      ],
      "options": [
        {
          "id": "unset",
          "label": "未配置",
          "value": null
        },
        {
          "id": "v-fee7da91b6fbd7504ee5455a1b3c6487",
          "label": "调整选项 · 0",
          "value": {
            "kind": "DWord",
            "data": 0
          }
        }
      ],
      "target": {
        "kind": "registry",
        "path": "HKCU\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\SearchSettings",
        "name": "IsMSACloudSearchEnabled"
      }
    },
    {
      "id": "25969a1687156c6aab1b6a645121828d28200520e1302ccee802b6d016e3b609",
      "label": "OneDrive 文件同步关闭",
      "category": "隐私防护",
      "categoryId": "PrivacyTweaks",
      "level": 2,
      "aliases": [
        {
          "category": "隐私防护",
          "categoryId": "PrivacyTweaks",
          "label": "OneDrive 文件同步关闭"
        }
      ],
      "options": [
        {
          "id": "unset",
          "label": "未配置",
          "value": null
        },
        {
          "id": "v-3eb2f7bb1fa0bb2f3b1ca7a7071ff39e",
          "label": "调整选项 · 1",
          "value": {
            "kind": "DWord",
            "data": 1
          }
        }
      ],
      "target": {
        "kind": "registry",
        "path": "HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\OneDrive",
        "name": "DisableFileSyncNGSC"
      }
    },
    {
      "id": "5bdd85d9902c7178bab1818386d687a36b4d93657fc1550a305624969e8ce83a",
      "label": "关闭云端语音识别 · HasAccepted",
      "category": "隐私防护",
      "categoryId": "PrivacyTweaks",
      "level": 2,
      "aliases": [
        {
          "category": "隐私防护",
          "categoryId": "PrivacyTweaks",
          "label": "关闭云端语音识别"
        }
      ],
      "options": [
        {
          "id": "unset",
          "label": "未配置",
          "value": null
        },
        {
          "id": "v-fee7da91b6fbd7504ee5455a1b3c6487",
          "label": "调整选项 · 0",
          "value": {
            "kind": "DWord",
            "data": 0
          }
        }
      ],
      "target": {
        "kind": "registry",
        "path": "HKCU\\SOFTWARE\\Microsoft\\Speech_OneCore\\Settings\\OnlineSpeechPrivacy",
        "name": "HasAccepted"
      }
    },
    {
      "id": "56575dd2adc2ce05f77654d98b67e96c716a1c65f4bb8a102ee14f7e44890fa3",
      "label": "关闭云端语音识别 · AllowInputPersonalization",
      "category": "隐私防护",
      "categoryId": "PrivacyTweaks",
      "level": 2,
      "aliases": [
        {
          "category": "隐私防护",
          "categoryId": "PrivacyTweaks",
          "label": "关闭云端语音识别"
        }
      ],
      "options": [
        {
          "id": "unset",
          "label": "未配置",
          "value": null
        },
        {
          "id": "v-fee7da91b6fbd7504ee5455a1b3c6487",
          "label": "调整选项 · 0",
          "value": {
            "kind": "DWord",
            "data": 0
          }
        }
      ],
      "target": {
        "kind": "registry",
        "path": "HKCU\\SOFTWARE\\Policies\\Microsoft\\InputPersonalization",
        "name": "AllowInputPersonalization"
      }
    },
    {
      "id": "0e669683e5a9880aa2b8ebbd0b9bc77f69987b608abd68ddf62eecb37143fbc5",
      "label": "关闭云端语音识别 · AllowInputPersonalization",
      "category": "隐私防护",
      "categoryId": "PrivacyTweaks",
      "level": 2,
      "aliases": [
        {
          "category": "隐私防护",
          "categoryId": "PrivacyTweaks",
          "label": "关闭云端语音识别"
        }
      ],
      "options": [
        {
          "id": "unset",
          "label": "未配置",
          "value": null
        },
        {
          "id": "v-fee7da91b6fbd7504ee5455a1b3c6487",
          "label": "调整选项 · 0",
          "value": {
            "kind": "DWord",
            "data": 0
          }
        }
      ],
      "target": {
        "kind": "registry",
        "path": "HKLM\\SOFTWARE\\Policies\\Microsoft\\InputPersonalization",
        "name": "AllowInputPersonalization"
      }
    },
    {
      "id": "99fbbed3c7e88427f9e094656c7f6c57908ff9e691ddd288891034dd925fc103",
      "label": "Wi-Fi 建议热点自动连接关闭",
      "category": "隐私防护",
      "categoryId": "PrivacyTweaks",
      "level": 2,
      "aliases": [
        {
          "category": "隐私防护",
          "categoryId": "PrivacyTweaks",
          "label": "Wi-Fi 建议热点自动连接关闭"
        }
      ],
      "options": [
        {
          "id": "unset",
          "label": "未配置",
          "value": null
        },
        {
          "id": "v-fee7da91b6fbd7504ee5455a1b3c6487",
          "label": "调整选项 · 0",
          "value": {
            "kind": "DWord",
            "data": 0
          }
        }
      ],
      "target": {
        "kind": "registry",
        "path": "HKLM\\SOFTWARE\\Microsoft\\WcmSvc\\wifinetworkmanager\\config",
        "name": "AutoConnectAllowedOEM"
      }
    },
    {
      "id": "c708bab385a309b31f833f3bed1f76305e592fc00d43040f4fe623c637e969c3",
      "label": "UPnP / SSDP 局域网发现关闭 · SSDPSRV",
      "category": "隐私防护",
      "categoryId": "PrivacyTweaks",
      "level": 2,
      "aliases": [
        {
          "category": "隐私防护",
          "categoryId": "PrivacyTweaks",
          "label": "UPnP / SSDP 局域网发现关闭"
        }
      ],
      "options": [
        {
          "id": "v-5211408567eac5f001640091a9364a43",
          "label": "禁用",
          "value": {
            "kind": "Service",
            "start": 4
          }
        },
        {
          "id": "v-f9fce49ddd0cd8c57583b51e850b37da",
          "label": "手动启动",
          "value": {
            "kind": "Service",
            "start": 3
          }
        },
        {
          "id": "v-ff68c5f81e0082c91db2abb353faf051",
          "label": "自动启动",
          "value": {
            "kind": "Service",
            "start": 2
          }
        }
      ],
      "target": {
        "kind": "service",
        "path": "SSDPSRV",
        "name": ""
      }
    },
    {
      "id": "0833cc82f11821da390de3e5f3f793bb63c1b80db8b4894c89cfb6c500ed3821",
      "label": "UPnP / SSDP 局域网发现关闭 · upnphost",
      "category": "隐私防护",
      "categoryId": "PrivacyTweaks",
      "level": 2,
      "aliases": [
        {
          "category": "隐私防护",
          "categoryId": "PrivacyTweaks",
          "label": "UPnP / SSDP 局域网发现关闭"
        }
      ],
      "options": [
        {
          "id": "v-5211408567eac5f001640091a9364a43",
          "label": "禁用",
          "value": {
            "kind": "Service",
            "start": 4
          }
        },
        {
          "id": "v-f9fce49ddd0cd8c57583b51e850b37da",
          "label": "手动启动",
          "value": {
            "kind": "Service",
            "start": 3
          }
        },
        {
          "id": "v-ff68c5f81e0082c91db2abb353faf051",
          "label": "自动启动",
          "value": {
            "kind": "Service",
            "start": 2
          }
        }
      ],
      "target": {
        "kind": "service",
        "path": "upnphost",
        "name": ""
      }
    },
    {
      "id": "b346c370109df640e2ec6b62c0592a37036e91ece78b78159ee9460f9a999359",
      "label": "禁用传感器服务 · SensorDataService",
      "category": "隐私防护",
      "categoryId": "PrivacyTweaks",
      "level": 2,
      "aliases": [
        {
          "category": "隐私防护",
          "categoryId": "PrivacyTweaks",
          "label": "禁用传感器服务"
        }
      ],
      "options": [
        {
          "id": "v-5211408567eac5f001640091a9364a43",
          "label": "禁用",
          "value": {
            "kind": "Service",
            "start": 4
          }
        },
        {
          "id": "v-f9fce49ddd0cd8c57583b51e850b37da",
          "label": "手动启动",
          "value": {
            "kind": "Service",
            "start": 3
          }
        },
        {
          "id": "v-ff68c5f81e0082c91db2abb353faf051",
          "label": "自动启动",
          "value": {
            "kind": "Service",
            "start": 2
          }
        }
      ],
      "target": {
        "kind": "service",
        "path": "SensorDataService",
        "name": ""
      }
    },
    {
      "id": "a410a832053247513f7f879746fbcfb5634a5ae2706868482dd6edb3c8c0acde",
      "label": "禁用传感器服务 · SensrSvc",
      "category": "隐私防护",
      "categoryId": "PrivacyTweaks",
      "level": 2,
      "aliases": [
        {
          "category": "隐私防护",
          "categoryId": "PrivacyTweaks",
          "label": "禁用传感器服务"
        }
      ],
      "options": [
        {
          "id": "v-5211408567eac5f001640091a9364a43",
          "label": "禁用",
          "value": {
            "kind": "Service",
            "start": 4
          }
        },
        {
          "id": "v-f9fce49ddd0cd8c57583b51e850b37da",
          "label": "手动启动",
          "value": {
            "kind": "Service",
            "start": 3
          }
        },
        {
          "id": "v-ff68c5f81e0082c91db2abb353faf051",
          "label": "自动启动",
          "value": {
            "kind": "Service",
            "start": 2
          }
        }
      ],
      "target": {
        "kind": "service",
        "path": "SensrSvc",
        "name": ""
      }
    },
    {
      "id": "2831ebb187f23adb5ced361d5172719f1e43313f0075ab86feddae512cc5c47a",
      "label": "关闭设置 AI 搜索助手",
      "category": "隐私防护",
      "categoryId": "PrivacyTweaks",
      "level": 2,
      "aliases": [
        {
          "category": "隐私防护",
          "categoryId": "PrivacyTweaks",
          "label": "关闭设置 AI 搜索助手"
        }
      ],
      "options": [
        {
          "id": "unset",
          "label": "未配置",
          "value": null
        },
        {
          "id": "v-3eb2f7bb1fa0bb2f3b1ca7a7071ff39e",
          "label": "调整选项 · 1",
          "value": {
            "kind": "DWord",
            "data": 1
          }
        }
      ],
      "target": {
        "kind": "registry",
        "path": "HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\WindowsAI",
        "name": "DisableSettingsAgent"
      }
    },
    {
      "id": "367b67dc92c6c7356336f40039d67baa328d9b9f570715ce1e6ae8d73b0953ee",
      "label": "关闭 Windows Shell Copilot 可用性",
      "category": "隐私防护",
      "categoryId": "PrivacyTweaks",
      "level": 2,
      "aliases": [
        {
          "category": "隐私防护",
          "categoryId": "PrivacyTweaks",
          "label": "关闭 Windows Shell Copilot 可用性"
        }
      ],
      "options": [
        {
          "id": "unset",
          "label": "未配置",
          "value": null
        },
        {
          "id": "v-fee7da91b6fbd7504ee5455a1b3c6487",
          "label": "调整选项 · 0",
          "value": {
            "kind": "DWord",
            "data": 0
          }
        }
      ],
      "target": {
        "kind": "registry",
        "path": "HKCU\\SOFTWARE\\Microsoft\\Windows\\Shell\\Copilot",
        "name": "IsCopilotAvailable"
      }
    },
    {
      "id": "5b07b2a1b4452394c8eebf054f3e089b8be210d00f8430757c16bb0b2716057d",
      "label": "拒绝联系人访问",
      "category": "隐私防护",
      "categoryId": "PrivacyTweaks",
      "level": 2,
      "aliases": [
        {
          "category": "隐私防护",
          "categoryId": "PrivacyTweaks",
          "label": "拒绝联系人访问"
        }
      ],
      "options": [
        {
          "id": "unset",
          "label": "未配置",
          "value": null
        },
        {
          "id": "v-c1bf42beb21ba2f60c48589fa9d923cc",
          "label": "调整选项 · Deny",
          "value": {
            "kind": "String",
            "data": "Deny"
          }
        }
      ],
      "target": {
        "kind": "registry",
        "path": "HKCU\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\CapabilityAccessManager\\ConsentStore\\contacts",
        "name": "Value"
      }
    },
    {
      "id": "4329c94ec1d8d288473d7f858aa2baf979af6b46e00e40ea3d9dc1a8b44118d5",
      "label": "拒绝账户信息",
      "category": "隐私防护",
      "categoryId": "PrivacyTweaks",
      "level": 2,
      "aliases": [
        {
          "category": "隐私防护",
          "categoryId": "PrivacyTweaks",
          "label": "拒绝账户信息"
        }
      ],
      "options": [
        {
          "id": "unset",
          "label": "未配置",
          "value": null
        },
        {
          "id": "v-c1bf42beb21ba2f60c48589fa9d923cc",
          "label": "调整选项 · Deny",
          "value": {
            "kind": "String",
            "data": "Deny"
          }
        }
      ],
      "target": {
        "kind": "registry",
        "path": "HKCU\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\CapabilityAccessManager\\ConsentStore\\userAccountInformation",
        "name": "Value"
      }
    },
    {
      "id": "3366b79e3fcb65a68aa0b95d8968923ea3c75d8a405d929b6d6aa1127eba70c5",
      "label": "拒绝系统通知访问",
      "category": "隐私防护",
      "categoryId": "PrivacyTweaks",
      "level": 2,
      "aliases": [
        {
          "category": "隐私防护",
          "categoryId": "PrivacyTweaks",
          "label": "拒绝系统通知访问"
        }
      ],
      "options": [
        {
          "id": "unset",
          "label": "未配置",
          "value": null
        },
        {
          "id": "v-c1bf42beb21ba2f60c48589fa9d923cc",
          "label": "调整选项 · Deny",
          "value": {
            "kind": "String",
            "data": "Deny"
          }
        }
      ],
      "target": {
        "kind": "registry",
        "path": "HKCU\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\CapabilityAccessManager\\ConsentStore\\userNotificationListener",
        "name": "Value"
      }
    },
    {
      "id": "271c809e477f57f6668e62d91bd03baf9d2b293e43f50162b063914f82f789df",
      "label": "隐藏最常使用的应用",
      "category": "隐私防护",
      "categoryId": "PrivacyTweaks",
      "level": 1,
      "aliases": [
        {
          "category": "隐私防护",
          "categoryId": "PrivacyTweaks",
          "label": "隐藏最常使用的应用"
        }
      ],
      "options": [
        {
          "id": "unset",
          "label": "未配置",
          "value": null
        },
        {
          "id": "v-3eb2f7bb1fa0bb2f3b1ca7a7071ff39e",
          "label": "默认选项 · 1",
          "value": {
            "kind": "DWord",
            "data": 1
          }
        },
        {
          "id": "v-fee7da91b6fbd7504ee5455a1b3c6487",
          "label": "调整选项 · 0",
          "value": {
            "kind": "DWord",
            "data": 0
          }
        }
      ],
      "target": {
        "kind": "registry",
        "path": "HKCU\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Advanced",
        "name": "Start_TrackProgs"
      }
    },
    {
      "id": "2d126a4723b2c6fc12c4e8e8b46a91970a3d7541731c5b39e0b338cefa8da281",
      "label": "阻止网站读取语言列表",
      "category": "隐私防护",
      "categoryId": "PrivacyTweaks",
      "level": 1,
      "aliases": [
        {
          "category": "隐私防护",
          "categoryId": "PrivacyTweaks",
          "label": "阻止网站读取语言列表"
        }
      ],
      "options": [
        {
          "id": "unset",
          "label": "未配置",
          "value": null
        },
        {
          "id": "v-3eb2f7bb1fa0bb2f3b1ca7a7071ff39e",
          "label": "调整选项 · 1",
          "value": {
            "kind": "DWord",
            "data": 1
          }
        }
      ],
      "target": {
        "kind": "registry",
        "path": "HKCU\\Control Panel\\International\\User Profile",
        "name": "HttpAcceptLanguageOptOut"
      }
    },
    {
      "id": "247e347f565ae7a12ea02eb6ce7b2bbbce7b26167f5cad81381c70cee261fd95",
      "label": "关闭搜索亮点",
      "category": "隐私防护",
      "categoryId": "PrivacyTweaks",
      "level": 1,
      "aliases": [
        {
          "category": "隐私防护",
          "categoryId": "PrivacyTweaks",
          "label": "关闭搜索亮点"
        }
      ],
      "options": [
        {
          "id": "unset",
          "label": "未配置",
          "value": null
        },
        {
          "id": "v-fee7da91b6fbd7504ee5455a1b3c6487",
          "label": "调整选项 · 0",
          "value": {
            "kind": "DWord",
            "data": 0
          }
        }
      ],
      "target": {
        "kind": "registry",
        "path": "HKCU\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\SearchSettings",
        "name": "IsDynamicSearchBoxEnabled"
      }
    },
    {
      "id": "fde84ed7ab3c56b108710a0653b9d799b6e8aae775547cc28ca03c146c3704d6",
      "label": "关闭 Copilot 推荐提示",
      "category": "隐私防护",
      "categoryId": "PrivacyTweaks",
      "level": 1,
      "aliases": [
        {
          "category": "隐私防护",
          "categoryId": "PrivacyTweaks",
          "label": "关闭 Copilot 推荐提示"
        }
      ],
      "options": [
        {
          "id": "unset",
          "label": "未配置",
          "value": null
        },
        {
          "id": "v-fee7da91b6fbd7504ee5455a1b3c6487",
          "label": "调整选项 · 0",
          "value": {
            "kind": "DWord",
            "data": 0
          }
        }
      ],
      "target": {
        "kind": "registry",
        "path": "HKCU\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Advanced",
        "name": "ShowCopilotNudges"
      }
    },
    {
      "id": "43d9e4fdc95ffa5dbb8bb49fcda331c0383a83f5a2cd67c244e78239f62c38f6",
      "label": "禁止文本/手写收集 · RestrictImplicitInkCollection",
      "category": "隐私防护",
      "categoryId": "PrivacyTweaks",
      "level": 1,
      "aliases": [
        {
          "category": "隐私防护",
          "categoryId": "PrivacyTweaks",
          "label": "禁止文本/手写收集"
        }
      ],
      "options": [
        {
          "id": "unset",
          "label": "未配置",
          "value": null
        },
        {
          "id": "v-3eb2f7bb1fa0bb2f3b1ca7a7071ff39e",
          "label": "调整选项 · 1",
          "value": {
            "kind": "DWord",
            "data": 1
          }
        }
      ],
      "target": {
        "kind": "registry",
        "path": "HKCU\\SOFTWARE\\Microsoft\\InputPersonalization",
        "name": "RestrictImplicitInkCollection"
      }
    },
    {
      "id": "d20189a85225e2c13f02cf6ac306642f3d7407e61ed811dcb7489513409efa77",
      "label": "禁止文本/手写收集 · RestrictImplicitTextCollection",
      "category": "隐私防护",
      "categoryId": "PrivacyTweaks",
      "level": 1,
      "aliases": [
        {
          "category": "隐私防护",
          "categoryId": "PrivacyTweaks",
          "label": "禁止文本/手写收集"
        }
      ],
      "options": [
        {
          "id": "unset",
          "label": "未配置",
          "value": null
        },
        {
          "id": "v-3eb2f7bb1fa0bb2f3b1ca7a7071ff39e",
          "label": "调整选项 · 1",
          "value": {
            "kind": "DWord",
            "data": 1
          }
        }
      ],
      "target": {
        "kind": "registry",
        "path": "HKCU\\SOFTWARE\\Microsoft\\InputPersonalization",
        "name": "RestrictImplicitTextCollection"
      }
    },
    {
      "id": "e1da57dc8d7593678c9db6f99b7cc2557390dd3313f339a17944e01453b62d3a",
      "label": "关闭改进墨迹和键入 · Enabled",
      "category": "隐私防护",
      "categoryId": "PrivacyTweaks",
      "level": 1,
      "aliases": [
        {
          "category": "隐私防护",
          "categoryId": "PrivacyTweaks",
          "label": "关闭改进墨迹和键入"
        }
      ],
      "options": [
        {
          "id": "unset",
          "label": "未配置",
          "value": null
        },
        {
          "id": "v-fee7da91b6fbd7504ee5455a1b3c6487",
          "label": "调整选项 · 0",
          "value": {
            "kind": "DWord",
            "data": 0
          }
        }
      ],
      "target": {
        "kind": "registry",
        "path": "HKCU\\SOFTWARE\\Microsoft\\Input\\TIPC",
        "name": "Enabled"
      }
    },
    {
      "id": "e2dc03317d4499a4ed853685671e27867a9c6e200563238f32a9652de9347d88",
      "label": "关闭改进墨迹和键入 · Value",
      "category": "隐私防护",
      "categoryId": "PrivacyTweaks",
      "level": 1,
      "aliases": [
        {
          "category": "隐私防护",
          "categoryId": "PrivacyTweaks",
          "label": "关闭改进墨迹和键入"
        }
      ],
      "options": [
        {
          "id": "unset",
          "label": "未配置",
          "value": null
        },
        {
          "id": "v-fee7da91b6fbd7504ee5455a1b3c6487",
          "label": "调整选项 · 0",
          "value": {
            "kind": "DWord",
            "data": 0
          }
        }
      ],
      "target": {
        "kind": "registry",
        "path": "HKCU\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\CPSS\\Store\\ImproveInkingAndTyping",
        "name": "Value"
      }
    },
    {
      "id": "5321ea77041acd7c9331b2c4b09a0642b642e5fbaf9dc8238f32505319f56122",
      "label": "阻止 OneDrive 自动备份已知文件夹 · KFMBlockOptIn",
      "category": "隐私防护",
      "categoryId": "PrivacyTweaks",
      "level": 1,
      "aliases": [
        {
          "category": "隐私防护",
          "categoryId": "PrivacyTweaks",
          "label": "阻止 OneDrive 自动备份已知文件夹"
        }
      ],
      "options": [
        {
          "id": "unset",
          "label": "未配置",
          "value": null
        },
        {
          "id": "v-3eb2f7bb1fa0bb2f3b1ca7a7071ff39e",
          "label": "调整选项 · 1",
          "value": {
            "kind": "DWord",
            "data": 1
          }
        }
      ],
      "target": {
        "kind": "registry",
        "path": "HKCU\\SOFTWARE\\Policies\\Microsoft\\OneDrive",
        "name": "KFMBlockOptIn"
      }
    },
    {
      "id": "67dca04d033acac2a977941cfdd8c2ad4293797f4c5c3d4a0c658e24ac0269ce",
      "label": "阻止 OneDrive 自动备份已知文件夹 · KFMBlockOptIn",
      "category": "隐私防护",
      "categoryId": "PrivacyTweaks",
      "level": 1,
      "aliases": [
        {
          "category": "隐私防护",
          "categoryId": "PrivacyTweaks",
          "label": "阻止 OneDrive 自动备份已知文件夹"
        }
      ],
      "options": [
        {
          "id": "unset",
          "label": "未配置",
          "value": null
        },
        {
          "id": "v-3eb2f7bb1fa0bb2f3b1ca7a7071ff39e",
          "label": "调整选项 · 1",
          "value": {
            "kind": "DWord",
            "data": 1
          }
        }
      ],
      "target": {
        "kind": "registry",
        "path": "HKLM\\SOFTWARE\\Policies\\Microsoft\\OneDrive",
        "name": "KFMBlockOptIn"
      }
    },
    {
      "id": "3cea0b2481e31d53cf69de81472243aed724537104cc591416d426483d721538",
      "label": "拒绝相机访问",
      "category": "隐私防护",
      "categoryId": "PrivacyTweaks",
      "level": 3,
      "aliases": [
        {
          "category": "隐私防护",
          "categoryId": "PrivacyTweaks",
          "label": "拒绝相机访问"
        }
      ],
      "options": [
        {
          "id": "unset",
          "label": "未配置",
          "value": null
        },
        {
          "id": "v-c1bf42beb21ba2f60c48589fa9d923cc",
          "label": "调整选项 · Deny",
          "value": {
            "kind": "String",
            "data": "Deny"
          }
        }
      ],
      "target": {
        "kind": "registry",
        "path": "HKCU\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\CapabilityAccessManager\\ConsentStore\\webcam",
        "name": "Value"
      }
    },
    {
      "id": "a3b3d513ee60267389a11dc366254b6e9596e93a5cdbfa389621e79e88bd3689",
      "label": "设置系统级摄像头策略",
      "category": "隐私防护",
      "categoryId": "PrivacyTweaks",
      "level": 3,
      "aliases": [
        {
          "category": "隐私防护",
          "categoryId": "PrivacyTweaks",
          "label": "设置系统级摄像头策略"
        }
      ],
      "options": [
        {
          "id": "unset",
          "label": "未配置",
          "value": null
        },
        {
          "id": "v-fee7da91b6fbd7504ee5455a1b3c6487",
          "label": "调整选项 · 0",
          "value": {
            "kind": "DWord",
            "data": 0
          }
        }
      ],
      "target": {
        "kind": "registry",
        "path": "HKLM\\SOFTWARE\\Policies\\Microsoft\\Camera",
        "name": "AllowCamera"
      }
    },
    {
      "id": "b3b50e2878b291f29960fe4eafd548037e1a6ebf8ee9ec97f3ac2628788fe934",
      "label": "拒绝麦克风访问",
      "category": "隐私防护",
      "categoryId": "PrivacyTweaks",
      "level": 3,
      "aliases": [
        {
          "category": "隐私防护",
          "categoryId": "PrivacyTweaks",
          "label": "拒绝麦克风访问"
        }
      ],
      "options": [
        {
          "id": "unset",
          "label": "未配置",
          "value": null
        },
        {
          "id": "v-c1bf42beb21ba2f60c48589fa9d923cc",
          "label": "调整选项 · Deny",
          "value": {
            "kind": "String",
            "data": "Deny"
          }
        }
      ],
      "target": {
        "kind": "registry",
        "path": "HKCU\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\CapabilityAccessManager\\ConsentStore\\microphone",
        "name": "Value"
      }
    },
    {
      "id": "fa3925519030cd576a33da920c137652a4872b243739fc0c5577f0d99d220220",
      "label": "关闭位置服务 · DisableLocation",
      "category": "隐私防护",
      "categoryId": "PrivacyTweaks",
      "level": 3,
      "aliases": [
        {
          "category": "隐私防护",
          "categoryId": "PrivacyTweaks",
          "label": "关闭位置服务"
        }
      ],
      "options": [
        {
          "id": "unset",
          "label": "未配置",
          "value": null
        },
        {
          "id": "v-fee7da91b6fbd7504ee5455a1b3c6487",
          "label": "调整选项 · 0",
          "value": {
            "kind": "DWord",
            "data": 0
          }
        }
      ],
      "target": {
        "kind": "registry",
        "path": "HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\LocationAndSensors",
        "name": "DisableLocation"
      }
    },
    {
      "id": "1b68c9ac74a6b8133ef9a56339871478b08709ad0adf6760b7d779f4f35552f8",
      "label": "关闭位置服务 · LetAppsAccessLocation",
      "category": "隐私防护",
      "categoryId": "PrivacyTweaks",
      "level": 3,
      "aliases": [
        {
          "category": "隐私防护",
          "categoryId": "PrivacyTweaks",
          "label": "关闭位置服务"
        }
      ],
      "options": [
        {
          "id": "unset",
          "label": "未配置",
          "value": null
        },
        {
          "id": "v-b890d43c0a1fc60d0dc8c9217ad2d002",
          "label": "调整选项 · 2",
          "value": {
            "kind": "DWord",
            "data": 2
          }
        }
      ],
      "target": {
        "kind": "registry",
        "path": "HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\AppPrivacy",
        "name": "LetAppsAccessLocation"
      }
    },
    {
      "id": "953c84405f8d0d2112baa9c5752156abdab60e5230c35bbaac8b4177a597252e",
      "label": "关闭位置服务 · Value",
      "category": "隐私防护",
      "categoryId": "PrivacyTweaks",
      "level": 3,
      "aliases": [
        {
          "category": "隐私防护",
          "categoryId": "PrivacyTweaks",
          "label": "关闭位置服务"
        }
      ],
      "options": [
        {
          "id": "unset",
          "label": "未配置",
          "value": null
        },
        {
          "id": "v-c1bf42beb21ba2f60c48589fa9d923cc",
          "label": "调整选项 · Deny",
          "value": {
            "kind": "String",
            "data": "Deny"
          }
        }
      ],
      "target": {
        "kind": "registry",
        "path": "HKCU\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\CapabilityAccessManager\\ConsentStore\\location",
        "name": "Value"
      }
    },
    {
      "id": "87682aa5dae6e5ffbd44e0d16ffbaff42eb9b0c3d0f30a9f294b5853a050ef5a",
      "label": "关闭位置服务 · Value",
      "category": "隐私防护",
      "categoryId": "PrivacyTweaks",
      "level": 3,
      "aliases": [
        {
          "category": "隐私防护",
          "categoryId": "PrivacyTweaks",
          "label": "关闭位置服务"
        }
      ],
      "options": [
        {
          "id": "unset",
          "label": "未配置",
          "value": null
        },
        {
          "id": "v-c1bf42beb21ba2f60c48589fa9d923cc",
          "label": "调整选项 · Deny",
          "value": {
            "kind": "String",
            "data": "Deny"
          }
        }
      ],
      "target": {
        "kind": "registry",
        "path": "HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\CapabilityAccessManager\\ConsentStore\\location",
        "name": "Value"
      }
    },
    {
      "id": "b49835734269a7b520ab6d7edd490a46e5baf4dbdf3929e6fc07bafcefac4d7f",
      "label": "拒绝应用访问生成式 AI · LetAppsAccessGenerativeAI",
      "category": "隐私防护",
      "categoryId": "PrivacyTweaks",
      "level": 3,
      "aliases": [
        {
          "category": "隐私防护",
          "categoryId": "PrivacyTweaks",
          "label": "拒绝应用访问生成式 AI"
        }
      ],
      "options": [
        {
          "id": "unset",
          "label": "未配置",
          "value": null
        },
        {
          "id": "v-b890d43c0a1fc60d0dc8c9217ad2d002",
          "label": "调整选项 · 2",
          "value": {
            "kind": "DWord",
            "data": 2
          }
        }
      ],
      "target": {
        "kind": "registry",
        "path": "HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\AppPrivacy",
        "name": "LetAppsAccessGenerativeAI"
      }
    },
    {
      "id": "37380f0ae290a91299aa8377733b35a1d3a9d5f1d9d6d88d27144b6ddbd64373",
      "label": "拒绝应用访问生成式 AI · Value",
      "category": "隐私防护",
      "categoryId": "PrivacyTweaks",
      "level": 3,
      "aliases": [
        {
          "category": "隐私防护",
          "categoryId": "PrivacyTweaks",
          "label": "拒绝应用访问生成式 AI"
        }
      ],
      "options": [
        {
          "id": "unset",
          "label": "未配置",
          "value": null
        },
        {
          "id": "v-c1bf42beb21ba2f60c48589fa9d923cc",
          "label": "调整选项 · Deny",
          "value": {
            "kind": "String",
            "data": "Deny"
          }
        }
      ],
      "target": {
        "kind": "registry",
        "path": "HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\CapabilityAccessManager\\ConsentStore\\generativeAI",
        "name": "Value"
      }
    },
    {
      "id": "af8ecb2a7c512fe07cf4e02af4af92d7b8bff667a8b161ec83cced6d302b015a",
      "label": "拒绝应用访问系统 AI 模型 · LetAppsAccessSystemAIModels",
      "category": "隐私防护",
      "categoryId": "PrivacyTweaks",
      "level": 3,
      "aliases": [
        {
          "category": "隐私防护",
          "categoryId": "PrivacyTweaks",
          "label": "拒绝应用访问系统 AI 模型"
        }
      ],
      "options": [
        {
          "id": "unset",
          "label": "未配置",
          "value": null
        },
        {
          "id": "v-b890d43c0a1fc60d0dc8c9217ad2d002",
          "label": "调整选项 · 2",
          "value": {
            "kind": "DWord",
            "data": 2
          }
        }
      ],
      "target": {
        "kind": "registry",
        "path": "HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\AppPrivacy",
        "name": "LetAppsAccessSystemAIModels"
      }
    },
    {
      "id": "db5c1f7e0d32e3157af77e1e875a990b95ad959d1fb2ff71d86a7ea7ca5eff5a",
      "label": "拒绝应用访问系统 AI 模型 · Value",
      "category": "隐私防护",
      "categoryId": "PrivacyTweaks",
      "level": 3,
      "aliases": [
        {
          "category": "隐私防护",
          "categoryId": "PrivacyTweaks",
          "label": "拒绝应用访问系统 AI 模型"
        }
      ],
      "options": [
        {
          "id": "unset",
          "label": "未配置",
          "value": null
        },
        {
          "id": "v-c1bf42beb21ba2f60c48589fa9d923cc",
          "label": "调整选项 · Deny",
          "value": {
            "kind": "String",
            "data": "Deny"
          }
        }
      ],
      "target": {
        "kind": "registry",
        "path": "HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\CapabilityAccessManager\\ConsentStore\\systemAIModels",
        "name": "Value"
      }
    },
    {
      "id": "aa70c44840ab32408b390692f2f6d27fc532520ff00513085c1b497826f124a5",
      "label": "拒绝应用访问系统 AI 模型 · RecordUsageData",
      "category": "隐私防护",
      "categoryId": "PrivacyTweaks",
      "level": 3,
      "aliases": [
        {
          "category": "隐私防护",
          "categoryId": "PrivacyTweaks",
          "label": "拒绝应用访问系统 AI 模型"
        }
      ],
      "options": [
        {
          "id": "unset",
          "label": "未配置",
          "value": null
        },
        {
          "id": "v-fee7da91b6fbd7504ee5455a1b3c6487",
          "label": "调整选项 · 0",
          "value": {
            "kind": "DWord",
            "data": 0
          }
        }
      ],
      "target": {
        "kind": "registry",
        "path": "HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\CapabilityAccessManager\\ConsentStore\\systemAIModels",
        "name": "RecordUsageData"
      }
    },
    {
      "id": "d52e506655908ba1b597d928ea40389ebdfd1daf0f533f7020867372a8a60a14",
      "label": "关闭 Recall 快照保存",
      "category": "隐私防护",
      "categoryId": "PrivacyTweaks",
      "level": 3,
      "aliases": [
        {
          "category": "隐私防护",
          "categoryId": "PrivacyTweaks",
          "label": "关闭 Recall 快照保存"
        }
      ],
      "options": [
        {
          "id": "unset",
          "label": "未配置",
          "value": null
        },
        {
          "id": "v-3eb2f7bb1fa0bb2f3b1ca7a7071ff39e",
          "label": "调整选项 · 1",
          "value": {
            "kind": "DWord",
            "data": 1
          }
        }
      ],
      "target": {
        "kind": "registry",
        "path": "HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\WindowsAI",
        "name": "DisableAIDataAnalysis"
      }
    },
    {
      "id": "255a61e3447f92a923dcdc242cc645d906e32c7fac304b95e2f97f73d25a1784",
      "label": "关闭旧版 Windows Copilot",
      "category": "隐私防护",
      "categoryId": "PrivacyTweaks",
      "level": 3,
      "aliases": [
        {
          "category": "隐私防护",
          "categoryId": "PrivacyTweaks",
          "label": "关闭旧版 Windows Copilot"
        }
      ],
      "options": [
        {
          "id": "unset",
          "label": "未配置",
          "value": null
        },
        {
          "id": "v-3eb2f7bb1fa0bb2f3b1ca7a7071ff39e",
          "label": "调整选项 · 1",
          "value": {
            "kind": "DWord",
            "data": 1
          }
        }
      ],
      "target": {
        "kind": "registry",
        "path": "HKCU\\SOFTWARE\\Policies\\Microsoft\\Windows\\WindowsCopilot",
        "name": "TurnOffWindowsCopilot"
      }
    },
    {
      "id": "ef332ece5f45c6c7af71a234add1f023c10df860e0061fbc547c24f209b7f0f4",
      "label": "强制关闭 AI Agent Connectors",
      "category": "隐私防护",
      "categoryId": "PrivacyTweaks",
      "level": 3,
      "aliases": [
        {
          "category": "隐私防护",
          "categoryId": "PrivacyTweaks",
          "label": "强制关闭 AI Agent Connectors"
        }
      ],
      "options": [
        {
          "id": "unset",
          "label": "未配置",
          "value": null
        },
        {
          "id": "v-b890d43c0a1fc60d0dc8c9217ad2d002",
          "label": "调整选项 · 2",
          "value": {
            "kind": "DWord",
            "data": 2
          }
        }
      ],
      "target": {
        "kind": "registry",
        "path": "HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\WindowsAI",
        "name": "DisableAgentConnectors"
      }
    },
    {
      "id": "59734a9bf81bcdd4b2f86d45aff6547156a3b97e3f9f6d584bae01e26496174f",
      "label": "任务栏图标左对齐",
      "category": "资源管理器调优",
      "categoryId": "ExplorerTweaks",
      "level": 1,
      "aliases": [
        {
          "category": "资源管理器调优",
          "categoryId": "ExplorerTweaks",
          "label": "任务栏图标左对齐"
        }
      ],
      "options": [
        {
          "id": "unset",
          "label": "未配置",
          "value": null
        },
        {
          "id": "v-3eb2f7bb1fa0bb2f3b1ca7a7071ff39e",
          "label": "默认选项 · 1",
          "value": {
            "kind": "DWord",
            "data": 1
          }
        },
        {
          "id": "v-fee7da91b6fbd7504ee5455a1b3c6487",
          "label": "调整选项 · 0",
          "value": {
            "kind": "DWord",
            "data": 0
          }
        }
      ],
      "target": {
        "kind": "registry",
        "path": "HKCU\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Advanced",
        "name": "TaskbarAl"
      }
    },
    {
      "id": "05d04ef38d5f03a5d824534ab6faa551706bdf147f169f213a18b6c57dcfb1c4",
      "label": "隐藏任务视图按钮",
      "category": "资源管理器调优",
      "categoryId": "ExplorerTweaks",
      "level": 1,
      "aliases": [
        {
          "category": "资源管理器调优",
          "categoryId": "ExplorerTweaks",
          "label": "隐藏任务视图按钮"
        }
      ],
      "options": [
        {
          "id": "unset",
          "label": "未配置",
          "value": null
        },
        {
          "id": "v-3eb2f7bb1fa0bb2f3b1ca7a7071ff39e",
          "label": "默认选项 · 1",
          "value": {
            "kind": "DWord",
            "data": 1
          }
        },
        {
          "id": "v-fee7da91b6fbd7504ee5455a1b3c6487",
          "label": "调整选项 · 0",
          "value": {
            "kind": "DWord",
            "data": 0
          }
        }
      ],
      "target": {
        "kind": "registry",
        "path": "HKCU\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Advanced",
        "name": "ShowTaskViewButton"
      }
    },
    {
      "id": "87601e45bea28344cf48f2979168e648e18233f55e71e3e31be77c164a1d6dcc",
      "label": "隐藏任务栏 Copilot 按钮",
      "category": "资源管理器调优",
      "categoryId": "ExplorerTweaks",
      "level": 1,
      "aliases": [
        {
          "category": "资源管理器调优",
          "categoryId": "ExplorerTweaks",
          "label": "隐藏任务栏 Copilot 按钮"
        }
      ],
      "options": [
        {
          "id": "unset",
          "label": "未配置",
          "value": null
        },
        {
          "id": "v-3eb2f7bb1fa0bb2f3b1ca7a7071ff39e",
          "label": "默认选项 · 1",
          "value": {
            "kind": "DWord",
            "data": 1
          }
        },
        {
          "id": "v-fee7da91b6fbd7504ee5455a1b3c6487",
          "label": "调整选项 · 0",
          "value": {
            "kind": "DWord",
            "data": 0
          }
        }
      ],
      "target": {
        "kind": "registry",
        "path": "HKCU\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Advanced",
        "name": "ShowCopilotButton"
      }
    },
    {
      "id": "36661daa01ab676635812aee5fc8fe659f50571a207772807639470e5598384f",
      "label": "启用任务栏右键结束任务",
      "category": "资源管理器调优",
      "categoryId": "ExplorerTweaks",
      "level": 1,
      "aliases": [
        {
          "category": "资源管理器调优",
          "categoryId": "ExplorerTweaks",
          "label": "启用任务栏右键结束任务"
        }
      ],
      "options": [
        {
          "id": "unset",
          "label": "未配置",
          "value": null
        },
        {
          "id": "v-3eb2f7bb1fa0bb2f3b1ca7a7071ff39e",
          "label": "调整选项 · 1",
          "value": {
            "kind": "DWord",
            "data": 1
          }
        },
        {
          "id": "v-fee7da91b6fbd7504ee5455a1b3c6487",
          "label": "默认选项 · 0",
          "value": {
            "kind": "DWord",
            "data": 0
          }
        }
      ],
      "target": {
        "kind": "registry",
        "path": "HKCU\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Advanced\\TaskbarDeveloperSettings",
        "name": "TaskbarEndTask"
      }
    },
    {
      "id": "ea2bd15c9a1b5dc25f4349b3d288637398d35a969a519b5795f9c3ff38b46d0c",
      "label": "始终显示系统托盘图标",
      "category": "资源管理器调优",
      "categoryId": "ExplorerTweaks",
      "level": 1,
      "aliases": [
        {
          "category": "资源管理器调优",
          "categoryId": "ExplorerTweaks",
          "label": "始终显示系统托盘图标"
        }
      ],
      "options": [
        {
          "id": "unset",
          "label": "未配置",
          "value": null
        },
        {
          "id": "v-3eb2f7bb1fa0bb2f3b1ca7a7071ff39e",
          "label": "默认选项 · 1",
          "value": {
            "kind": "DWord",
            "data": 1
          }
        },
        {
          "id": "v-fee7da91b6fbd7504ee5455a1b3c6487",
          "label": "调整选项 · 0",
          "value": {
            "kind": "DWord",
            "data": 0
          }
        }
      ],
      "target": {
        "kind": "registry",
        "path": "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer",
        "name": "EnableAutoTray"
      }
    },
    {
      "id": "c3bd3bc3e25b792672c44b7e5fab46955d935963b53cfe72a3ec59f3f49bbc94",
      "label": "隐藏任务栏搜索入口 · SearchOnTaskbarMode",
      "category": "资源管理器调优",
      "categoryId": "ExplorerTweaks",
      "level": 2,
      "aliases": [
        {
          "category": "资源管理器调优",
          "categoryId": "ExplorerTweaks",
          "label": "隐藏任务栏搜索入口"
        }
      ],
      "options": [
        {
          "id": "unset",
          "label": "未配置",
          "value": null
        },
        {
          "id": "v-fee7da91b6fbd7504ee5455a1b3c6487",
          "label": "调整选项 · 0",
          "value": {
            "kind": "DWord",
            "data": 0
          }
        }
      ],
      "target": {
        "kind": "registry",
        "path": "HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\Windows Search",
        "name": "SearchOnTaskbarMode"
      }
    },
    {
      "id": "e81669354a146fe8309e060a77ba939553bb95afd045c0b264da53dea8cc22cc",
      "label": "隐藏任务栏搜索入口 · SearchboxTaskbarMode",
      "category": "资源管理器调优",
      "categoryId": "ExplorerTweaks",
      "level": 2,
      "aliases": [
        {
          "category": "资源管理器调优",
          "categoryId": "ExplorerTweaks",
          "label": "隐藏任务栏搜索入口"
        }
      ],
      "options": [
        {
          "id": "unset",
          "label": "未配置",
          "value": null
        },
        {
          "id": "v-3eb2f7bb1fa0bb2f3b1ca7a7071ff39e",
          "label": "默认选项 · 1",
          "value": {
            "kind": "DWord",
            "data": 1
          }
        },
        {
          "id": "v-fee7da91b6fbd7504ee5455a1b3c6487",
          "label": "调整选项 · 0",
          "value": {
            "kind": "DWord",
            "data": 0
          }
        }
      ],
      "target": {
        "kind": "registry",
        "path": "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Search",
        "name": "SearchboxTaskbarMode"
      }
    },
    {
      "id": "a4f3cf830a2e80a185fe4b5e3b66afa068dfe9be9080dea944907527c7054358",
      "label": "隐藏 Windows 11 小组件 · AllowNewsAndInterests",
      "category": "资源管理器调优",
      "categoryId": "ExplorerTweaks",
      "level": 2,
      "aliases": [
        {
          "category": "资源管理器调优",
          "categoryId": "ExplorerTweaks",
          "label": "隐藏 Windows 11 小组件"
        }
      ],
      "options": [
        {
          "id": "unset",
          "label": "未配置",
          "value": null
        },
        {
          "id": "v-fee7da91b6fbd7504ee5455a1b3c6487",
          "label": "调整选项 · 0",
          "value": {
            "kind": "DWord",
            "data": 0
          }
        }
      ],
      "target": {
        "kind": "registry",
        "path": "HKCU\\SOFTWARE\\Policies\\Microsoft\\Dsh",
        "name": "AllowNewsAndInterests"
      }
    },
    {
      "id": "67d533b0d2e90a7f68da7a1fb1ea7a7bf90178ead43a6c73981fc54e00a14129",
      "label": "隐藏 Windows 11 小组件 · AllowNewsAndInterests",
      "category": "资源管理器调优",
      "categoryId": "ExplorerTweaks",
      "level": 2,
      "aliases": [
        {
          "category": "资源管理器调优",
          "categoryId": "ExplorerTweaks",
          "label": "隐藏 Windows 11 小组件"
        }
      ],
      "options": [
        {
          "id": "unset",
          "label": "未配置",
          "value": null
        },
        {
          "id": "v-fee7da91b6fbd7504ee5455a1b3c6487",
          "label": "调整选项 · 0",
          "value": {
            "kind": "DWord",
            "data": 0
          }
        }
      ],
      "target": {
        "kind": "registry",
        "path": "HKLM\\SOFTWARE\\Policies\\Microsoft\\Dsh",
        "name": "AllowNewsAndInterests"
      }
    },
    {
      "id": "1eaf3c9fe698a5fd88dd7259334c56183e8e39ab6f412a82d5e8fbb3c2bd2cad",
      "label": "隐藏开始菜单推荐区域 · HideRecommendedSection",
      "category": "资源管理器调优",
      "categoryId": "ExplorerTweaks",
      "level": 2,
      "aliases": [
        {
          "category": "资源管理器调优",
          "categoryId": "ExplorerTweaks",
          "label": "隐藏开始菜单推荐区域"
        }
      ],
      "options": [
        {
          "id": "unset",
          "label": "未配置",
          "value": null
        },
        {
          "id": "v-3eb2f7bb1fa0bb2f3b1ca7a7071ff39e",
          "label": "调整选项 · 1",
          "value": {
            "kind": "DWord",
            "data": 1
          }
        }
      ],
      "target": {
        "kind": "registry",
        "path": "HKCU\\SOFTWARE\\Policies\\Microsoft\\Windows\\Explorer",
        "name": "HideRecommendedSection"
      }
    },
    {
      "id": "947e5e3974c8dbbd55d860f708bb7e5c6d2f99a0c5cba7857bf0f08aa28c3b57",
      "label": "隐藏开始菜单推荐区域 · HideRecommendedSection",
      "category": "资源管理器调优",
      "categoryId": "ExplorerTweaks",
      "level": 2,
      "aliases": [
        {
          "category": "资源管理器调优",
          "categoryId": "ExplorerTweaks",
          "label": "隐藏开始菜单推荐区域"
        }
      ],
      "options": [
        {
          "id": "unset",
          "label": "未配置",
          "value": null
        },
        {
          "id": "v-3eb2f7bb1fa0bb2f3b1ca7a7071ff39e",
          "label": "调整选项 · 1",
          "value": {
            "kind": "DWord",
            "data": 1
          }
        }
      ],
      "target": {
        "kind": "registry",
        "path": "HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\Explorer",
        "name": "HideRecommendedSection"
      }
    },
    {
      "id": "c38ad416c6b3cad72820ff4d5f993ee37757ada59b9305aa4c3172046a7dd4ae",
      "label": "隐藏开始菜单最近添加应用 · HideRecentlyAddedApps",
      "category": "资源管理器调优",
      "categoryId": "ExplorerTweaks",
      "level": 2,
      "aliases": [
        {
          "category": "资源管理器调优",
          "categoryId": "ExplorerTweaks",
          "label": "隐藏开始菜单最近添加应用"
        }
      ],
      "options": [
        {
          "id": "unset",
          "label": "未配置",
          "value": null
        },
        {
          "id": "v-3eb2f7bb1fa0bb2f3b1ca7a7071ff39e",
          "label": "调整选项 · 1",
          "value": {
            "kind": "DWord",
            "data": 1
          }
        }
      ],
      "target": {
        "kind": "registry",
        "path": "HKCU\\SOFTWARE\\Policies\\Microsoft\\Windows\\Explorer",
        "name": "HideRecentlyAddedApps"
      }
    },
    {
      "id": "f8afc2c37b258abfd480b9fb5c972483002f72605c5d633fd1b40148a1a674fd",
      "label": "隐藏开始菜单最近添加应用 · HideRecentlyAddedApps",
      "category": "资源管理器调优",
      "categoryId": "ExplorerTweaks",
      "level": 2,
      "aliases": [
        {
          "category": "资源管理器调优",
          "categoryId": "ExplorerTweaks",
          "label": "隐藏开始菜单最近添加应用"
        }
      ],
      "options": [
        {
          "id": "unset",
          "label": "未配置",
          "value": null
        },
        {
          "id": "v-3eb2f7bb1fa0bb2f3b1ca7a7071ff39e",
          "label": "调整选项 · 1",
          "value": {
            "kind": "DWord",
            "data": 1
          }
        }
      ],
      "target": {
        "kind": "registry",
        "path": "HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\Explorer",
        "name": "HideRecentlyAddedApps"
      }
    },
    {
      "id": "273a692b21f6b08ac3f4651e4566aba2151cc52fa09e64b842dd81b3174c113e",
      "label": "隐藏开始菜单最近添加应用 · ShowRecentList",
      "category": "资源管理器调优",
      "categoryId": "ExplorerTweaks",
      "level": 2,
      "aliases": [
        {
          "category": "资源管理器调优",
          "categoryId": "ExplorerTweaks",
          "label": "隐藏开始菜单最近添加应用"
        }
      ],
      "options": [
        {
          "id": "unset",
          "label": "未配置",
          "value": null
        },
        {
          "id": "v-3eb2f7bb1fa0bb2f3b1ca7a7071ff39e",
          "label": "默认选项 · 1",
          "value": {
            "kind": "DWord",
            "data": 1
          }
        },
        {
          "id": "v-fee7da91b6fbd7504ee5455a1b3c6487",
          "label": "调整选项 · 0",
          "value": {
            "kind": "DWord",
            "data": 0
          }
        }
      ],
      "target": {
        "kind": "registry",
        "path": "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Start",
        "name": "ShowRecentList"
      }
    },
    {
      "id": "a65a9e095397ae78c0e81591a33ca4436e184a82f1962a2d1ad64f4c2ca06d52",
      "label": "关闭开始菜单 Bing 网络搜索结果 · DisableSearchBoxSuggestions",
      "category": "资源管理器调优",
      "categoryId": "ExplorerTweaks",
      "level": 2,
      "aliases": [
        {
          "category": "资源管理器调优",
          "categoryId": "ExplorerTweaks",
          "label": "关闭开始菜单 Bing 网络搜索结果"
        }
      ],
      "options": [
        {
          "id": "unset",
          "label": "未配置",
          "value": null
        },
        {
          "id": "v-3eb2f7bb1fa0bb2f3b1ca7a7071ff39e",
          "label": "调整选项 · 1",
          "value": {
            "kind": "DWord",
            "data": 1
          }
        }
      ],
      "target": {
        "kind": "registry",
        "path": "HKCU\\Software\\Policies\\Microsoft\\Windows\\Explorer",
        "name": "DisableSearchBoxSuggestions"
      }
    },
    {
      "id": "98fc67f338189eb9646b6337b5bcf6a47be440a6d3ae462b105111811072675d",
      "label": "关闭开始菜单 Bing 网络搜索结果 · DisableSearchBoxSuggestions",
      "category": "资源管理器调优",
      "categoryId": "ExplorerTweaks",
      "level": 2,
      "aliases": [
        {
          "category": "资源管理器调优",
          "categoryId": "ExplorerTweaks",
          "label": "关闭开始菜单 Bing 网络搜索结果"
        }
      ],
      "options": [
        {
          "id": "unset",
          "label": "未配置",
          "value": null
        },
        {
          "id": "v-3eb2f7bb1fa0bb2f3b1ca7a7071ff39e",
          "label": "调整选项 · 1",
          "value": {
            "kind": "DWord",
            "data": 1
          }
        }
      ],
      "target": {
        "kind": "registry",
        "path": "HKLM\\Software\\Policies\\Microsoft\\Windows\\Explorer",
        "name": "DisableSearchBoxSuggestions"
      }
    },
    {
      "id": "1d422bddd067844eafcb5a33419bb9dff815121dd26760d347307680e65d21d2",
      "label": "关闭开始菜单 Bing 网络搜索结果 · ConnectedSearchUseWeb",
      "category": "资源管理器调优",
      "categoryId": "ExplorerTweaks",
      "level": 2,
      "aliases": [
        {
          "category": "资源管理器调优",
          "categoryId": "ExplorerTweaks",
          "label": "关闭开始菜单 Bing 网络搜索结果"
        }
      ],
      "options": [
        {
          "id": "unset",
          "label": "未配置",
          "value": null
        },
        {
          "id": "v-fee7da91b6fbd7504ee5455a1b3c6487",
          "label": "调整选项 · 0",
          "value": {
            "kind": "DWord",
            "data": 0
          }
        }
      ],
      "target": {
        "kind": "registry",
        "path": "HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\Windows Search",
        "name": "ConnectedSearchUseWeb"
      }
    },
    {
      "id": "7160cd516921391f844a40e4c641537f0ad9285cd0649038081e6fd4a871f12c",
      "label": "关闭开始菜单 Bing 网络搜索结果 · DisableWebSearch",
      "category": "资源管理器调优",
      "categoryId": "ExplorerTweaks",
      "level": 2,
      "aliases": [
        {
          "category": "资源管理器调优",
          "categoryId": "ExplorerTweaks",
          "label": "关闭开始菜单 Bing 网络搜索结果"
        }
      ],
      "options": [
        {
          "id": "unset",
          "label": "未配置",
          "value": null
        },
        {
          "id": "v-3eb2f7bb1fa0bb2f3b1ca7a7071ff39e",
          "label": "调整选项 · 1",
          "value": {
            "kind": "DWord",
            "data": 1
          }
        }
      ],
      "target": {
        "kind": "registry",
        "path": "HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\Windows Search",
        "name": "DisableWebSearch"
      }
    },
    {
      "id": "763cd3e342ec19df0fd5c328bf0439f0948ebef26680130c6b39ec0a28a8381b",
      "label": "隐藏开始菜单推荐建议",
      "category": "资源管理器调优",
      "categoryId": "ExplorerTweaks",
      "level": 1,
      "aliases": [
        {
          "category": "资源管理器调优",
          "categoryId": "ExplorerTweaks",
          "label": "隐藏开始菜单推荐建议"
        }
      ],
      "options": [
        {
          "id": "unset",
          "label": "未配置",
          "value": null
        },
        {
          "id": "v-3eb2f7bb1fa0bb2f3b1ca7a7071ff39e",
          "label": "默认选项 · 1",
          "value": {
            "kind": "DWord",
            "data": 1
          }
        },
        {
          "id": "v-fee7da91b6fbd7504ee5455a1b3c6487",
          "label": "调整选项 · 0",
          "value": {
            "kind": "DWord",
            "data": 0
          }
        }
      ],
      "target": {
        "kind": "registry",
        "path": "HKCU\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Advanced",
        "name": "Start_IrisRecommendations"
      }
    },
    {
      "id": "bc1c6fa6db14cfd12f1ca6068fa6348c16a8f763dcf19f3b2ed9eb4c2df86d5c",
      "label": "开始菜单显示更多固定项",
      "category": "资源管理器调优",
      "categoryId": "ExplorerTweaks",
      "level": 1,
      "aliases": [
        {
          "category": "资源管理器调优",
          "categoryId": "ExplorerTweaks",
          "label": "开始菜单显示更多固定项"
        }
      ],
      "options": [
        {
          "id": "unset",
          "label": "未配置",
          "value": null
        },
        {
          "id": "v-3eb2f7bb1fa0bb2f3b1ca7a7071ff39e",
          "label": "调整选项 · 1",
          "value": {
            "kind": "DWord",
            "data": 1
          }
        },
        {
          "id": "v-fee7da91b6fbd7504ee5455a1b3c6487",
          "label": "默认选项 · 0",
          "value": {
            "kind": "DWord",
            "data": 0
          }
        }
      ],
      "target": {
        "kind": "registry",
        "path": "HKCU\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Advanced",
        "name": "Start_Layout"
      }
    },
    {
      "id": "57f1c3aedcbb98919f4b29924e0ff9ec830a192bd752bb30bdb06723e0de7420",
      "label": "关闭通知声音",
      "category": "资源管理器调优",
      "categoryId": "ExplorerTweaks",
      "level": 1,
      "aliases": [
        {
          "category": "资源管理器调优",
          "categoryId": "ExplorerTweaks",
          "label": "关闭通知声音"
        }
      ],
      "options": [
        {
          "id": "unset",
          "label": "未配置",
          "value": null
        },
        {
          "id": "v-3eb2f7bb1fa0bb2f3b1ca7a7071ff39e",
          "label": "默认选项 · 1",
          "value": {
            "kind": "DWord",
            "data": 1
          }
        },
        {
          "id": "v-fee7da91b6fbd7504ee5455a1b3c6487",
          "label": "调整选项 · 0",
          "value": {
            "kind": "DWord",
            "data": 0
          }
        }
      ],
      "target": {
        "kind": "registry",
        "path": "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Notifications\\Settings",
        "name": "NOC_GLOBAL_SETTING_ALLOW_NOTIFICATION_SOUND"
      }
    },
    {
      "id": "89f6d558533cb5322ecbb921ac6435d6d02f74d5acf5e7278d508fe2a522278a",
      "label": "关闭锁屏普通通知 · NOC_GLOBAL_SETTING_ALLOW_TOASTS_ABOVE_LOCK",
      "category": "资源管理器调优",
      "categoryId": "ExplorerTweaks",
      "level": 2,
      "aliases": [
        {
          "category": "资源管理器调优",
          "categoryId": "ExplorerTweaks",
          "label": "关闭锁屏普通通知"
        }
      ],
      "options": [
        {
          "id": "unset",
          "label": "未配置",
          "value": null
        },
        {
          "id": "v-3eb2f7bb1fa0bb2f3b1ca7a7071ff39e",
          "label": "默认选项 · 1",
          "value": {
            "kind": "DWord",
            "data": 1
          }
        },
        {
          "id": "v-fee7da91b6fbd7504ee5455a1b3c6487",
          "label": "调整选项 · 0",
          "value": {
            "kind": "DWord",
            "data": 0
          }
        }
      ],
      "target": {
        "kind": "registry",
        "path": "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Notifications\\Settings",
        "name": "NOC_GLOBAL_SETTING_ALLOW_TOASTS_ABOVE_LOCK"
      }
    },
    {
      "id": "f2099671ab0e24e70511db4d08968de0dafadfbe5c0c8c4018a8ea724baa8ce4",
      "label": "关闭锁屏普通通知 · LockScreenToastEnabled",
      "category": "资源管理器调优",
      "categoryId": "ExplorerTweaks",
      "level": 2,
      "aliases": [
        {
          "category": "资源管理器调优",
          "categoryId": "ExplorerTweaks",
          "label": "关闭锁屏普通通知"
        }
      ],
      "options": [
        {
          "id": "unset",
          "label": "未配置",
          "value": null
        },
        {
          "id": "v-3eb2f7bb1fa0bb2f3b1ca7a7071ff39e",
          "label": "默认选项 · 1",
          "value": {
            "kind": "DWord",
            "data": 1
          }
        },
        {
          "id": "v-fee7da91b6fbd7504ee5455a1b3c6487",
          "label": "调整选项 · 0",
          "value": {
            "kind": "DWord",
            "data": 0
          }
        }
      ],
      "target": {
        "kind": "registry",
        "path": "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\PushNotifications",
        "name": "LockScreenToastEnabled"
      }
    },
    {
      "id": "8cdbe50a8ccf9a712fe447a28978208e106e5cab843696f31486f55c3ba84800",
      "label": "关闭锁屏关键通知",
      "category": "资源管理器调优",
      "categoryId": "ExplorerTweaks",
      "level": 3,
      "aliases": [
        {
          "category": "资源管理器调优",
          "categoryId": "ExplorerTweaks",
          "label": "关闭锁屏关键通知"
        }
      ],
      "options": [
        {
          "id": "unset",
          "label": "未配置",
          "value": null
        },
        {
          "id": "v-3eb2f7bb1fa0bb2f3b1ca7a7071ff39e",
          "label": "默认选项 · 1",
          "value": {
            "kind": "DWord",
            "data": 1
          }
        },
        {
          "id": "v-fee7da91b6fbd7504ee5455a1b3c6487",
          "label": "调整选项 · 0",
          "value": {
            "kind": "DWord",
            "data": 0
          }
        }
      ],
      "target": {
        "kind": "registry",
        "path": "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Notifications\\Settings",
        "name": "NOC_GLOBAL_SETTING_ALLOW_CRITICAL_TOASTS_ABOVE_LOCK"
      }
    },
    {
      "id": "90fbe77c540662c1380656fb10275700f8be1893fd9b4b1bf9bf957ad0d927f6",
      "label": "隐藏通知铃铛图标",
      "category": "资源管理器调优",
      "categoryId": "ExplorerTweaks",
      "level": 1,
      "aliases": [
        {
          "category": "资源管理器调优",
          "categoryId": "ExplorerTweaks",
          "label": "隐藏通知铃铛图标"
        }
      ],
      "options": [
        {
          "id": "unset",
          "label": "未配置",
          "value": null
        },
        {
          "id": "v-3eb2f7bb1fa0bb2f3b1ca7a7071ff39e",
          "label": "默认选项 · 1",
          "value": {
            "kind": "DWord",
            "data": 1
          }
        },
        {
          "id": "v-fee7da91b6fbd7504ee5455a1b3c6487",
          "label": "调整选项 · 0",
          "value": {
            "kind": "DWord",
            "data": 0
          }
        }
      ],
      "target": {
        "kind": "registry",
        "path": "HKCU\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Advanced",
        "name": "ShowNotificationIcon"
      }
    },
    {
      "id": "94bd59c4e3bc8a61073ad466d9adfdde1ee0ba592770911c24e667cbc875f4dd",
      "label": "关闭通知中心建议",
      "category": "资源管理器调优",
      "categoryId": "ExplorerTweaks",
      "level": 1,
      "aliases": [
        {
          "category": "资源管理器调优",
          "categoryId": "ExplorerTweaks",
          "label": "关闭通知中心建议"
        }
      ],
      "options": [
        {
          "id": "unset",
          "label": "未配置",
          "value": null
        },
        {
          "id": "v-3eb2f7bb1fa0bb2f3b1ca7a7071ff39e",
          "label": "默认选项 · 1",
          "value": {
            "kind": "DWord",
            "data": 1
          }
        },
        {
          "id": "v-fee7da91b6fbd7504ee5455a1b3c6487",
          "label": "调整选项 · 0",
          "value": {
            "kind": "DWord",
            "data": 0
          }
        }
      ],
      "target": {
        "kind": "registry",
        "path": "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\ContentDeliveryManager",
        "name": "SystemPaneSuggestionsEnabled"
      }
    },
    {
      "id": "d5fb82f314b0cd471f9d171a7f184866d36a80dcb5871f3de3eeaf8af78a210a",
      "label": "显示文件扩展名",
      "category": "资源管理器调优",
      "categoryId": "ExplorerTweaks",
      "level": 1,
      "aliases": [
        {
          "category": "资源管理器调优",
          "categoryId": "ExplorerTweaks",
          "label": "显示文件扩展名"
        }
      ],
      "options": [
        {
          "id": "unset",
          "label": "未配置",
          "value": null
        },
        {
          "id": "v-3eb2f7bb1fa0bb2f3b1ca7a7071ff39e",
          "label": "默认选项 · 1",
          "value": {
            "kind": "DWord",
            "data": 1
          }
        },
        {
          "id": "v-fee7da91b6fbd7504ee5455a1b3c6487",
          "label": "调整选项 · 0",
          "value": {
            "kind": "DWord",
            "data": 0
          }
        }
      ],
      "target": {
        "kind": "registry",
        "path": "HKCU\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Advanced",
        "name": "HideFileExt"
      }
    },
    {
      "id": "023936283b835ad2187e259c86959ab796e416fed77c8e5edf4b20167d807e5c",
      "label": "显示隐藏文件和文件夹",
      "category": "资源管理器调优",
      "categoryId": "ExplorerTweaks",
      "level": 1,
      "aliases": [
        {
          "category": "资源管理器调优",
          "categoryId": "ExplorerTweaks",
          "label": "显示隐藏文件和文件夹"
        }
      ],
      "options": [
        {
          "id": "unset",
          "label": "未配置",
          "value": null
        },
        {
          "id": "v-3eb2f7bb1fa0bb2f3b1ca7a7071ff39e",
          "label": "调整选项 · 1",
          "value": {
            "kind": "DWord",
            "data": 1
          }
        },
        {
          "id": "v-fee7da91b6fbd7504ee5455a1b3c6487",
          "label": "默认选项 · 0",
          "value": {
            "kind": "DWord",
            "data": 0
          }
        }
      ],
      "target": {
        "kind": "registry",
        "path": "HKCU\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Advanced",
        "name": "Hidden"
      }
    },
    {
      "id": "14a62f0190b2491a6dbf90fd6cc0380a4b1b00d785ac787095549e4586bee1f8",
      "label": "隐藏受保护的操作系统文件",
      "category": "资源管理器调优",
      "categoryId": "ExplorerTweaks",
      "level": 1,
      "aliases": [
        {
          "category": "资源管理器调优",
          "categoryId": "ExplorerTweaks",
          "label": "隐藏受保护的操作系统文件"
        }
      ],
      "options": [
        {
          "id": "unset",
          "label": "未配置",
          "value": null
        },
        {
          "id": "v-3eb2f7bb1fa0bb2f3b1ca7a7071ff39e",
          "label": "默认选项 · 1",
          "value": {
            "kind": "DWord",
            "data": 1
          }
        },
        {
          "id": "v-fee7da91b6fbd7504ee5455a1b3c6487",
          "label": "调整选项 · 0",
          "value": {
            "kind": "DWord",
            "data": 0
          }
        }
      ],
      "target": {
        "kind": "registry",
        "path": "HKCU\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Advanced",
        "name": "ShowSuperHidden"
      }
    },
    {
      "id": "6eab30bbe20b3209b33ed441076d59ce70a755e8e69a17f3a0266dedad084d88",
      "label": "资源管理器默认打开此电脑",
      "category": "资源管理器调优",
      "categoryId": "ExplorerTweaks",
      "level": 1,
      "aliases": [
        {
          "category": "资源管理器调优",
          "categoryId": "ExplorerTweaks",
          "label": "资源管理器默认打开此电脑"
        }
      ],
      "options": [
        {
          "id": "unset",
          "label": "未配置",
          "value": null
        },
        {
          "id": "v-3eb2f7bb1fa0bb2f3b1ca7a7071ff39e",
          "label": "调整选项 · 1",
          "value": {
            "kind": "DWord",
            "data": 1
          }
        },
        {
          "id": "v-fee7da91b6fbd7504ee5455a1b3c6487",
          "label": "默认选项 · 0",
          "value": {
            "kind": "DWord",
            "data": 0
          }
        }
      ],
      "target": {
        "kind": "registry",
        "path": "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Advanced",
        "name": "LaunchTo"
      }
    },
    {
      "id": "c42cca3a06a64ae6d2bdfae1f7adefa241b95c25748e641b00c45fc32d0fd340",
      "label": "移除新快捷方式名称后缀",
      "category": "资源管理器调优",
      "categoryId": "ExplorerTweaks",
      "level": 1,
      "aliases": [
        {
          "category": "资源管理器调优",
          "categoryId": "ExplorerTweaks",
          "label": "移除新快捷方式名称后缀"
        }
      ],
      "options": [
        {
          "id": "unset",
          "label": "未配置",
          "value": null
        },
        {
          "id": "v-4e8a5c8630d2fb49a44c66ce3d5767fd",
          "label": "调整选项 · 00 00 00 00 00 00 00 00",
          "value": {
            "kind": "Binary",
            "data": [
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0
            ]
          }
        }
      ],
      "target": {
        "kind": "registry",
        "path": "HKCU\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Explorer",
        "name": "link"
      }
    },
    {
      "id": "fa1488ade8ee741b807128350d96d3ac50ef44c9dcb10db3efaf5fe1bdb85a1a",
      "label": "始终显示图标而非缩略图",
      "category": "资源管理器调优",
      "categoryId": "ExplorerTweaks",
      "level": 1,
      "aliases": [
        {
          "category": "资源管理器调优",
          "categoryId": "ExplorerTweaks",
          "label": "始终显示图标而非缩略图"
        }
      ],
      "options": [
        {
          "id": "unset",
          "label": "未配置",
          "value": null
        },
        {
          "id": "v-3eb2f7bb1fa0bb2f3b1ca7a7071ff39e",
          "label": "调整选项 · 1",
          "value": {
            "kind": "DWord",
            "data": 1
          }
        },
        {
          "id": "v-fee7da91b6fbd7504ee5455a1b3c6487",
          "label": "默认选项 · 0",
          "value": {
            "kind": "DWord",
            "data": 0
          }
        }
      ],
      "target": {
        "kind": "registry",
        "path": "HKCU\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Advanced",
        "name": "IconsOnly"
      }
    },
    {
      "id": "83d7e670926a3910ad0d0be5c3e02dea8f66e4770bfbe139a6973aa46d8bb3da",
      "label": "启用资源管理器紧凑视图",
      "category": "资源管理器调优",
      "categoryId": "ExplorerTweaks",
      "level": 1,
      "aliases": [
        {
          "category": "资源管理器调优",
          "categoryId": "ExplorerTweaks",
          "label": "启用资源管理器紧凑视图"
        }
      ],
      "options": [
        {
          "id": "unset",
          "label": "未配置",
          "value": null
        },
        {
          "id": "v-3eb2f7bb1fa0bb2f3b1ca7a7071ff39e",
          "label": "调整选项 · 1",
          "value": {
            "kind": "DWord",
            "data": 1
          }
        },
        {
          "id": "v-fee7da91b6fbd7504ee5455a1b3c6487",
          "label": "默认选项 · 0",
          "value": {
            "kind": "DWord",
            "data": 0
          }
        }
      ],
      "target": {
        "kind": "registry",
        "path": "HKCU\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Advanced",
        "name": "UseCompactMode"
      }
    },
    {
      "id": "549db3332ab4719f3489502dff7273cc0d00cafa7fdd42a9bb5e8ebee660b02d",
      "label": "Alt+Tab 仅显示窗口",
      "category": "资源管理器调优",
      "categoryId": "ExplorerTweaks",
      "level": 1,
      "aliases": [
        {
          "category": "资源管理器调优",
          "categoryId": "ExplorerTweaks",
          "label": "Alt+Tab 仅显示窗口"
        }
      ],
      "options": [
        {
          "id": "unset",
          "label": "未配置",
          "value": null
        },
        {
          "id": "v-69ff2138a3bbd9c0b33822530927b77a",
          "label": "调整选项 · 3",
          "value": {
            "kind": "DWord",
            "data": 3
          }
        },
        {
          "id": "v-fee7da91b6fbd7504ee5455a1b3c6487",
          "label": "默认选项 · 0",
          "value": {
            "kind": "DWord",
            "data": 0
          }
        }
      ],
      "target": {
        "kind": "registry",
        "path": "HKCU\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Advanced",
        "name": "MultiTaskingAltTabFilter"
      }
    },
    {
      "id": "cf6da475a85050ffd6c7f791efd4217e95543ba57a033afd4c5619e33c4fddaa",
      "label": "隐藏资源管理器最近文件 · ShowRecent",
      "category": "资源管理器调优",
      "categoryId": "ExplorerTweaks",
      "level": 1,
      "aliases": [
        {
          "category": "资源管理器调优",
          "categoryId": "ExplorerTweaks",
          "label": "隐藏资源管理器最近文件"
        }
      ],
      "options": [
        {
          "id": "unset",
          "label": "未配置",
          "value": null
        },
        {
          "id": "v-3eb2f7bb1fa0bb2f3b1ca7a7071ff39e",
          "label": "默认选项 · 1",
          "value": {
            "kind": "DWord",
            "data": 1
          }
        },
        {
          "id": "v-fee7da91b6fbd7504ee5455a1b3c6487",
          "label": "调整选项 · 0",
          "value": {
            "kind": "DWord",
            "data": 0
          }
        }
      ],
      "target": {
        "kind": "registry",
        "path": "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer",
        "name": "ShowRecent"
      }
    },
    {
      "id": "a41f4c15d7fb40f57b342fb90ba215af98a0b9e47ce2e0dece505ba8851820ff",
      "label": "隐藏资源管理器最近文件 · ShowRecommendations",
      "category": "资源管理器调优",
      "categoryId": "ExplorerTweaks",
      "level": 1,
      "aliases": [
        {
          "category": "资源管理器调优",
          "categoryId": "ExplorerTweaks",
          "label": "隐藏资源管理器最近文件"
        }
      ],
      "options": [
        {
          "id": "unset",
          "label": "未配置",
          "value": null
        },
        {
          "id": "v-3eb2f7bb1fa0bb2f3b1ca7a7071ff39e",
          "label": "默认选项 · 1",
          "value": {
            "kind": "DWord",
            "data": 1
          }
        },
        {
          "id": "v-fee7da91b6fbd7504ee5455a1b3c6487",
          "label": "调整选项 · 0",
          "value": {
            "kind": "DWord",
            "data": 0
          }
        }
      ],
      "target": {
        "kind": "registry",
        "path": "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer",
        "name": "ShowRecommendations"
      }
    },
    {
      "id": "c6cf92d820a9a7d92ae3d49f749cb71a1b41caef9b0f623be7de595c20a68aea",
      "label": "显示资源管理器状态栏",
      "category": "资源管理器调优",
      "categoryId": "ExplorerTweaks",
      "level": 1,
      "aliases": [
        {
          "category": "资源管理器调优",
          "categoryId": "ExplorerTweaks",
          "label": "显示资源管理器状态栏"
        }
      ],
      "options": [
        {
          "id": "unset",
          "label": "未配置",
          "value": null
        },
        {
          "id": "v-3eb2f7bb1fa0bb2f3b1ca7a7071ff39e",
          "label": "调整选项 · 1",
          "value": {
            "kind": "DWord",
            "data": 1
          }
        },
        {
          "id": "v-fee7da91b6fbd7504ee5455a1b3c6487",
          "label": "默认选项 · 0",
          "value": {
            "kind": "DWord",
            "data": 0
          }
        }
      ],
      "target": {
        "kind": "registry",
        "path": "HKCU\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Advanced",
        "name": "ShowStatusBar"
      }
    },
    {
      "id": "9109b38a60ec795deef682c13aa46bee48a2695d008c77660f98538537cfaba6",
      "label": "关闭预览窗格处理器",
      "category": "资源管理器调优",
      "categoryId": "ExplorerTweaks",
      "level": 1,
      "aliases": [
        {
          "category": "资源管理器调优",
          "categoryId": "ExplorerTweaks",
          "label": "关闭预览窗格处理器"
        }
      ],
      "options": [
        {
          "id": "unset",
          "label": "未配置",
          "value": null
        },
        {
          "id": "v-3eb2f7bb1fa0bb2f3b1ca7a7071ff39e",
          "label": "默认选项 · 1",
          "value": {
            "kind": "DWord",
            "data": 1
          }
        },
        {
          "id": "v-fee7da91b6fbd7504ee5455a1b3c6487",
          "label": "调整选项 · 0",
          "value": {
            "kind": "DWord",
            "data": 0
          }
        }
      ],
      "target": {
        "kind": "registry",
        "path": "HKCU\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Advanced",
        "name": "ShowPreviewHandlers"
      }
    },
    {
      "id": "40fcbfea9f81e009ceed77dbf6dd11a4cf51eb7cb799b57caa25320193a30677",
      "label": "启用 Win32 长路径支持",
      "category": "资源管理器调优",
      "categoryId": "ExplorerTweaks",
      "level": 2,
      "aliases": [
        {
          "category": "资源管理器调优",
          "categoryId": "ExplorerTweaks",
          "label": "启用 Win32 长路径支持"
        }
      ],
      "options": [
        {
          "id": "unset",
          "label": "未配置",
          "value": null
        },
        {
          "id": "v-3eb2f7bb1fa0bb2f3b1ca7a7071ff39e",
          "label": "调整选项 · 1",
          "value": {
            "kind": "DWord",
            "data": 1
          }
        },
        {
          "id": "v-fee7da91b6fbd7504ee5455a1b3c6487",
          "label": "默认选项 · 0",
          "value": {
            "kind": "DWord",
            "data": 0
          }
        }
      ],
      "target": {
        "kind": "registry",
        "path": "HKLM\\SYSTEM\\CurrentControlSet\\Control\\FileSystem",
        "name": "LongPathsEnabled"
      }
    },
    {
      "id": "d3744acc72cb1c25d8bbe44f3787e0d6e76d1367550379f4cfaac46152b5788d",
      "label": "启用 Windows 深色模式 · AppsUseLightTheme",
      "category": "资源管理器调优",
      "categoryId": "ExplorerTweaks",
      "level": 1,
      "aliases": [
        {
          "category": "资源管理器调优",
          "categoryId": "ExplorerTweaks",
          "label": "启用 Windows 深色模式"
        }
      ],
      "options": [
        {
          "id": "unset",
          "label": "未配置",
          "value": null
        },
        {
          "id": "v-3eb2f7bb1fa0bb2f3b1ca7a7071ff39e",
          "label": "默认选项 · 1",
          "value": {
            "kind": "DWord",
            "data": 1
          }
        },
        {
          "id": "v-fee7da91b6fbd7504ee5455a1b3c6487",
          "label": "调整选项 · 0",
          "value": {
            "kind": "DWord",
            "data": 0
          }
        }
      ],
      "target": {
        "kind": "registry",
        "path": "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Themes\\Personalize",
        "name": "AppsUseLightTheme"
      }
    },
    {
      "id": "e4b988664a25d8cd6cc56aa10dcd61b83342a7dbc4bbf5b42867063ef4a34b6a",
      "label": "启用 Windows 深色模式 · SystemUsesLightTheme",
      "category": "资源管理器调优",
      "categoryId": "ExplorerTweaks",
      "level": 1,
      "aliases": [
        {
          "category": "资源管理器调优",
          "categoryId": "ExplorerTweaks",
          "label": "启用 Windows 深色模式"
        }
      ],
      "options": [
        {
          "id": "unset",
          "label": "未配置",
          "value": null
        },
        {
          "id": "v-3eb2f7bb1fa0bb2f3b1ca7a7071ff39e",
          "label": "默认选项 · 1",
          "value": {
            "kind": "DWord",
            "data": 1
          }
        },
        {
          "id": "v-fee7da91b6fbd7504ee5455a1b3c6487",
          "label": "调整选项 · 0",
          "value": {
            "kind": "DWord",
            "data": 0
          }
        }
      ],
      "target": {
        "kind": "registry",
        "path": "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Themes\\Personalize",
        "name": "SystemUsesLightTheme"
      }
    },
    {
      "id": "9feb47b0c11ff043899116b29f1d50c7174abc685baf27f49df30eb2c918f8c5",
      "label": "使用旧版记事本打开文本文件",
      "category": "资源管理器调优",
      "categoryId": "ExplorerTweaks",
      "level": 3,
      "aliases": [
        {
          "category": "资源管理器调优",
          "categoryId": "ExplorerTweaks",
          "label": "使用旧版记事本打开文本文件"
        }
      ],
      "options": [
        {
          "id": "unset",
          "label": "未配置",
          "value": null
        },
        {
          "id": "v-3eb2f7bb1fa0bb2f3b1ca7a7071ff39e",
          "label": "默认选项 · 1",
          "value": {
            "kind": "DWord",
            "data": 1
          }
        },
        {
          "id": "v-fee7da91b6fbd7504ee5455a1b3c6487",
          "label": "调整选项 · 0",
          "value": {
            "kind": "DWord",
            "data": 0
          }
        }
      ],
      "target": {
        "kind": "registry",
        "path": "HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Image File Execution Options\\notepad.exe",
        "name": "UseFilter"
      }
    },
    {
      "id": "fa562030c7623ecd7390601a548f458d2e5ac123b3dc61014c271bf414ac9fbe",
      "label": "禁用启动声音 · DisableStartupSound",
      "category": "资源管理器调优",
      "categoryId": "ExplorerTweaks",
      "level": 2,
      "aliases": [
        {
          "category": "资源管理器调优",
          "categoryId": "ExplorerTweaks",
          "label": "禁用启动声音"
        }
      ],
      "options": [
        {
          "id": "unset",
          "label": "未配置",
          "value": null
        },
        {
          "id": "v-3eb2f7bb1fa0bb2f3b1ca7a7071ff39e",
          "label": "调整选项 · 1",
          "value": {
            "kind": "DWord",
            "data": 1
          }
        }
      ],
      "target": {
        "kind": "registry",
        "path": "HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Policies\\System",
        "name": "DisableStartupSound"
      }
    },
    {
      "id": "ad639a538f3d8769c46ab6e1dff83e1d91fb621bd27d7b9397e326d28ddb213d",
      "label": "禁用启动声音 · DisableStartupSound",
      "category": "资源管理器调优",
      "categoryId": "ExplorerTweaks",
      "level": 2,
      "aliases": [
        {
          "category": "资源管理器调优",
          "categoryId": "ExplorerTweaks",
          "label": "禁用启动声音"
        }
      ],
      "options": [
        {
          "id": "unset",
          "label": "未配置",
          "value": null
        },
        {
          "id": "v-3eb2f7bb1fa0bb2f3b1ca7a7071ff39e",
          "label": "调整选项 · 1",
          "value": {
            "kind": "DWord",
            "data": 1
          }
        }
      ],
      "target": {
        "kind": "registry",
        "path": "HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Authentication\\LogonUI\\BootAnimation",
        "name": "DisableStartupSound"
      }
    },
    {
      "id": "608bd5112d4e6e898ea53e5e3932844923f6a05f06526e77229ce3c4a35e8515",
      "label": "禁用启动声音 · UserSetting_DisableStartupSound",
      "category": "资源管理器调优",
      "categoryId": "ExplorerTweaks",
      "level": 2,
      "aliases": [
        {
          "category": "资源管理器调优",
          "categoryId": "ExplorerTweaks",
          "label": "禁用启动声音"
        }
      ],
      "options": [
        {
          "id": "unset",
          "label": "未配置",
          "value": null
        },
        {
          "id": "v-3eb2f7bb1fa0bb2f3b1ca7a7071ff39e",
          "label": "调整选项 · 1",
          "value": {
            "kind": "DWord",
            "data": 1
          }
        }
      ],
      "target": {
        "kind": "registry",
        "path": "HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\EditionOverrides",
        "name": "UserSetting_DisableStartupSound"
      }
    },
    {
      "id": "60d5b7e149da526161ccdf0e7430beaf18cdfba3fd3d3bcc3d7c3838a1483354",
      "label": "兼容性评估遥测关闭",
      "category": "计划任务裁剪",
      "categoryId": "TaskTweaks",
      "level": 1,
      "aliases": [
        {
          "category": "计划任务裁剪",
          "categoryId": "TaskTweaks",
          "label": "兼容性评估遥测关闭"
        }
      ],
      "options": [
        {
          "id": "v-51465befb349566a8976d813040e7fe7",
          "label": "启用",
          "value": {
            "kind": "Task",
            "enabled": true
          }
        },
        {
          "id": "v-8ce26c55f3a9a3b6487885506acb1a26",
          "label": "禁用",
          "value": {
            "kind": "Task",
            "enabled": false
          }
        }
      ],
      "target": {
        "kind": "task",
        "path": "\\Microsoft\\Windows\\Application Experience\\Microsoft Compatibility Appraiser Exp",
        "name": ""
      }
    },
    {
      "id": "2d33399bce75930a76db90359aa4fec14e566c9396fd3219f3df28850e049c99",
      "label": "兼容性备份任务关闭",
      "category": "计划任务裁剪",
      "categoryId": "TaskTweaks",
      "level": 1,
      "aliases": [
        {
          "category": "计划任务裁剪",
          "categoryId": "TaskTweaks",
          "label": "兼容性备份任务关闭"
        }
      ],
      "options": [
        {
          "id": "v-51465befb349566a8976d813040e7fe7",
          "label": "启用",
          "value": {
            "kind": "Task",
            "enabled": true
          }
        },
        {
          "id": "v-8ce26c55f3a9a3b6487885506acb1a26",
          "label": "禁用",
          "value": {
            "kind": "Task",
            "enabled": false
          }
        }
      ],
      "target": {
        "kind": "task",
        "path": "\\Microsoft\\Windows\\Application Experience\\MareBackup",
        "name": ""
      }
    },
    {
      "id": "e06352547a7df75cf81326f3a187809b77ba8bbe6625846c37db8eadea86628d",
      "label": "启动应用评估任务关闭",
      "category": "计划任务裁剪",
      "categoryId": "TaskTweaks",
      "level": 1,
      "aliases": [
        {
          "category": "计划任务裁剪",
          "categoryId": "TaskTweaks",
          "label": "启动应用评估任务关闭"
        }
      ],
      "options": [
        {
          "id": "v-51465befb349566a8976d813040e7fe7",
          "label": "启用",
          "value": {
            "kind": "Task",
            "enabled": true
          }
        },
        {
          "id": "v-8ce26c55f3a9a3b6487885506acb1a26",
          "label": "禁用",
          "value": {
            "kind": "Task",
            "enabled": false
          }
        }
      ],
      "target": {
        "kind": "task",
        "path": "\\Microsoft\\Windows\\Application Experience\\StartupAppTask",
        "name": ""
      }
    },
    {
      "id": "17b3fb8a7d545aac15ff04f81010572ba4b1b71836c535daa12da3c5b6a8630a",
      "label": "CEIP 体验数据任务关闭",
      "category": "计划任务裁剪",
      "categoryId": "TaskTweaks",
      "level": 1,
      "aliases": [
        {
          "category": "计划任务裁剪",
          "categoryId": "TaskTweaks",
          "label": "CEIP 体验数据任务关闭"
        }
      ],
      "options": [
        {
          "id": "v-51465befb349566a8976d813040e7fe7",
          "label": "启用",
          "value": {
            "kind": "Task",
            "enabled": true
          }
        },
        {
          "id": "v-8ce26c55f3a9a3b6487885506acb1a26",
          "label": "禁用",
          "value": {
            "kind": "Task",
            "enabled": false
          }
        }
      ],
      "target": {
        "kind": "task",
        "path": "\\Microsoft\\Windows\\Customer Experience Improvement Program\\Consolidator",
        "name": ""
      }
    },
    {
      "id": "e7774330918dc30830af802e92cedefe7f1c598dc5eec1bf6545c7ba3b6fe34a",
      "label": "计划碎片整理触发关闭",
      "category": "计划任务裁剪",
      "categoryId": "TaskTweaks",
      "level": 1,
      "aliases": [
        {
          "category": "计划任务裁剪",
          "categoryId": "TaskTweaks",
          "label": "计划碎片整理触发关闭"
        }
      ],
      "options": [
        {
          "id": "v-51465befb349566a8976d813040e7fe7",
          "label": "启用",
          "value": {
            "kind": "Task",
            "enabled": true
          }
        },
        {
          "id": "v-8ce26c55f3a9a3b6487885506acb1a26",
          "label": "禁用",
          "value": {
            "kind": "Task",
            "enabled": false
          }
        }
      ],
      "target": {
        "kind": "task",
        "path": "\\Microsoft\\Windows\\Defrag\\ScheduledDefrag",
        "name": ""
      }
    },
    {
      "id": "62f7e3401e25b14378c8330f2ac7e9b9f2974daa1a0246787d21be5ee72648e9",
      "label": "磁盘诊断数据采集关闭",
      "category": "计划任务裁剪",
      "categoryId": "TaskTweaks",
      "level": 1,
      "aliases": [
        {
          "category": "计划任务裁剪",
          "categoryId": "TaskTweaks",
          "label": "磁盘诊断数据采集关闭"
        }
      ],
      "options": [
        {
          "id": "v-51465befb349566a8976d813040e7fe7",
          "label": "启用",
          "value": {
            "kind": "Task",
            "enabled": true
          }
        },
        {
          "id": "v-8ce26c55f3a9a3b6487885506acb1a26",
          "label": "禁用",
          "value": {
            "kind": "Task",
            "enabled": false
          }
        }
      ],
      "target": {
        "kind": "task",
        "path": "\\Microsoft\\Windows\\DiskDiagnostic\\Microsoft-Windows-DiskDiagnosticDataCollector",
        "name": ""
      }
    },
    {
      "id": "bbfaffa35811353c7d5780be86841fc049ce2fdd579b805a291471bb20e1ef72",
      "label": "反馈采样任务关闭",
      "category": "计划任务裁剪",
      "categoryId": "TaskTweaks",
      "level": 1,
      "aliases": [
        {
          "category": "计划任务裁剪",
          "categoryId": "TaskTweaks",
          "label": "反馈采样任务关闭"
        }
      ],
      "options": [
        {
          "id": "v-51465befb349566a8976d813040e7fe7",
          "label": "启用",
          "value": {
            "kind": "Task",
            "enabled": true
          }
        },
        {
          "id": "v-8ce26c55f3a9a3b6487885506acb1a26",
          "label": "禁用",
          "value": {
            "kind": "Task",
            "enabled": false
          }
        }
      ],
      "target": {
        "kind": "task",
        "path": "\\Microsoft\\Windows\\Feedback\\Siuf\\DmClient",
        "name": ""
      }
    },
    {
      "id": "c782f072d9895083a714699f700aed43e68612ed28db4873455e6fd20f50fed1",
      "label": "反馈场景下载任务关闭",
      "category": "计划任务裁剪",
      "categoryId": "TaskTweaks",
      "level": 1,
      "aliases": [
        {
          "category": "计划任务裁剪",
          "categoryId": "TaskTweaks",
          "label": "反馈场景下载任务关闭"
        }
      ],
      "options": [
        {
          "id": "v-51465befb349566a8976d813040e7fe7",
          "label": "启用",
          "value": {
            "kind": "Task",
            "enabled": true
          }
        },
        {
          "id": "v-8ce26c55f3a9a3b6487885506acb1a26",
          "label": "禁用",
          "value": {
            "kind": "Task",
            "enabled": false
          }
        }
      ],
      "target": {
        "kind": "task",
        "path": "\\Microsoft\\Windows\\Feedback\\Siuf\\DmClientOnScenarioDownload",
        "name": ""
      }
    },
    {
      "id": "a9c29938e9e9bafba68ddfde86b0854cc735eb8562b013dd2fa22fc347699073",
      "label": "电源效率诊断任务关闭",
      "category": "计划任务裁剪",
      "categoryId": "TaskTweaks",
      "level": 1,
      "aliases": [
        {
          "category": "计划任务裁剪",
          "categoryId": "TaskTweaks",
          "label": "电源效率诊断任务关闭"
        }
      ],
      "options": [
        {
          "id": "v-51465befb349566a8976d813040e7fe7",
          "label": "启用",
          "value": {
            "kind": "Task",
            "enabled": true
          }
        },
        {
          "id": "v-8ce26c55f3a9a3b6487885506acb1a26",
          "label": "禁用",
          "value": {
            "kind": "Task",
            "enabled": false
          }
        }
      ],
      "target": {
        "kind": "task",
        "path": "\\Microsoft\\Windows\\Power Efficiency Diagnostics\\AnalyzeSystem",
        "name": ""
      }
    },
    {
      "id": "32eeb48385c54dffdaacc209357141242a4b2447891bf9b2ba600051fccf05cf",
      "label": "错误报告队列任务关闭",
      "category": "计划任务裁剪",
      "categoryId": "TaskTweaks",
      "level": 1,
      "aliases": [
        {
          "category": "计划任务裁剪",
          "categoryId": "TaskTweaks",
          "label": "错误报告队列任务关闭"
        }
      ],
      "options": [
        {
          "id": "v-51465befb349566a8976d813040e7fe7",
          "label": "启用",
          "value": {
            "kind": "Task",
            "enabled": true
          }
        },
        {
          "id": "v-8ce26c55f3a9a3b6487885506acb1a26",
          "label": "禁用",
          "value": {
            "kind": "Task",
            "enabled": false
          }
        }
      ],
      "target": {
        "kind": "task",
        "path": "\\Microsoft\\Windows\\Windows Error Reporting\\QueueReporting",
        "name": ""
      }
    },
    {
      "id": "c076e323a111c1de4251b203ce516e3db07fdc551caf6914adf2ba30326a0c37",
      "label": "自动代理检测任务关闭",
      "category": "计划任务裁剪",
      "categoryId": "TaskTweaks",
      "level": 2,
      "aliases": [
        {
          "category": "计划任务裁剪",
          "categoryId": "TaskTweaks",
          "label": "自动代理检测任务关闭"
        }
      ],
      "options": [
        {
          "id": "v-51465befb349566a8976d813040e7fe7",
          "label": "启用",
          "value": {
            "kind": "Task",
            "enabled": true
          }
        },
        {
          "id": "v-8ce26c55f3a9a3b6487885506acb1a26",
          "label": "禁用",
          "value": {
            "kind": "Task",
            "enabled": false
          }
        }
      ],
      "target": {
        "kind": "task",
        "path": "\\Microsoft\\Windows\\Autochk\\Proxy",
        "name": ""
      }
    },
    {
      "id": "51ec2cc870fb05d2f0ab0ef4fa7d36b64c40c13f5d93bf68f01ce355a8457074",
      "label": "组件存储清理任务关闭",
      "category": "计划任务裁剪",
      "categoryId": "TaskTweaks",
      "level": 2,
      "aliases": [
        {
          "category": "计划任务裁剪",
          "categoryId": "TaskTweaks",
          "label": "组件存储清理任务关闭"
        }
      ],
      "options": [
        {
          "id": "v-51465befb349566a8976d813040e7fe7",
          "label": "启用",
          "value": {
            "kind": "Task",
            "enabled": true
          }
        },
        {
          "id": "v-8ce26c55f3a9a3b6487885506acb1a26",
          "label": "禁用",
          "value": {
            "kind": "Task",
            "enabled": false
          }
        }
      ],
      "target": {
        "kind": "task",
        "path": "\\Microsoft\\Windows\\Servicing\\StartComponentCleanup",
        "name": ""
      }
    },
    {
      "id": "069e4c70aa76c5336bf964cb5850ba37317d63f31c623b2e9656063dcb7d3401",
      "label": "自动磁盘清理触发关闭",
      "category": "计划任务裁剪",
      "categoryId": "TaskTweaks",
      "level": 2,
      "aliases": [
        {
          "category": "计划任务裁剪",
          "categoryId": "TaskTweaks",
          "label": "自动磁盘清理触发关闭"
        }
      ],
      "options": [
        {
          "id": "v-51465befb349566a8976d813040e7fe7",
          "label": "启用",
          "value": {
            "kind": "Task",
            "enabled": true
          }
        },
        {
          "id": "v-8ce26c55f3a9a3b6487885506acb1a26",
          "label": "禁用",
          "value": {
            "kind": "Task",
            "enabled": false
          }
        }
      ],
      "target": {
        "kind": "task",
        "path": "\\Microsoft\\Windows\\DiskCleanup\\SilentCleanup",
        "name": ""
      }
    },
    {
      "id": "7c0586c6ab6027310597d009bb9235758ae77d1dc8362d9e895d59d5c806f709",
      "label": "家庭安全监控任务关闭",
      "category": "计划任务裁剪",
      "categoryId": "TaskTweaks",
      "level": 2,
      "aliases": [
        {
          "category": "计划任务裁剪",
          "categoryId": "TaskTweaks",
          "label": "家庭安全监控任务关闭"
        }
      ],
      "options": [
        {
          "id": "v-51465befb349566a8976d813040e7fe7",
          "label": "启用",
          "value": {
            "kind": "Task",
            "enabled": true
          }
        },
        {
          "id": "v-8ce26c55f3a9a3b6487885506acb1a26",
          "label": "禁用",
          "value": {
            "kind": "Task",
            "enabled": false
          }
        }
      ],
      "target": {
        "kind": "task",
        "path": "\\Microsoft\\Windows\\Shell\\FamilySafetyMonitor",
        "name": ""
      }
    },
    {
      "id": "f402d91e3d21fc1655bef1ea95c76638cb8d197977d0592b0ba7c6d2080be8a2",
      "label": "离线地图更新任务关闭",
      "category": "计划任务裁剪",
      "categoryId": "TaskTweaks",
      "level": 2,
      "aliases": [
        {
          "category": "计划任务裁剪",
          "categoryId": "TaskTweaks",
          "label": "离线地图更新任务关闭"
        }
      ],
      "options": [
        {
          "id": "v-51465befb349566a8976d813040e7fe7",
          "label": "启用",
          "value": {
            "kind": "Task",
            "enabled": true
          }
        },
        {
          "id": "v-8ce26c55f3a9a3b6487885506acb1a26",
          "label": "禁用",
          "value": {
            "kind": "Task",
            "enabled": false
          }
        }
      ],
      "target": {
        "kind": "task",
        "path": "\\Microsoft\\Windows\\Maps\\MapsUpdateTask",
        "name": ""
      }
    },
    {
      "id": "117cf39a668849243edcd6b6eb76d4bc77b1f0a880c20972520b5198979a5ec8",
      "label": "商店体验组件任务关闭",
      "category": "计划任务裁剪",
      "categoryId": "TaskTweaks",
      "level": 2,
      "aliases": [
        {
          "category": "计划任务裁剪",
          "categoryId": "TaskTweaks",
          "label": "商店体验组件任务关闭"
        }
      ],
      "options": [
        {
          "id": "v-51465befb349566a8976d813040e7fe7",
          "label": "启用",
          "value": {
            "kind": "Task",
            "enabled": true
          }
        },
        {
          "id": "v-8ce26c55f3a9a3b6487885506acb1a26",
          "label": "禁用",
          "value": {
            "kind": "Task",
            "enabled": false
          }
        }
      ],
      "target": {
        "kind": "task",
        "path": "\\Microsoft\\Windows\\CloudExperienceHost\\CreateObjectTask",
        "name": ""
      }
    },
    {
      "id": "52cc24833c16a69849f10919404b98c4270384353cec26de5166254574a7cdd3",
      "label": "Xbox 云存档同步任务关闭",
      "category": "计划任务裁剪",
      "categoryId": "TaskTweaks",
      "level": 2,
      "aliases": [
        {
          "category": "计划任务裁剪",
          "categoryId": "TaskTweaks",
          "label": "Xbox 云存档同步任务关闭"
        }
      ],
      "options": [
        {
          "id": "v-51465befb349566a8976d813040e7fe7",
          "label": "启用",
          "value": {
            "kind": "Task",
            "enabled": true
          }
        },
        {
          "id": "v-8ce26c55f3a9a3b6487885506acb1a26",
          "label": "禁用",
          "value": {
            "kind": "Task",
            "enabled": false
          }
        }
      ],
      "target": {
        "kind": "task",
        "path": "\\Microsoft\\XblGameSave\\XblGameSaveTask",
        "name": ""
      }
    },
    {
      "id": "8905145ff89856664929a53426b56056d73fbab04687b8f443c3dcc03cf9d781",
      "label": "功能控制使用数据上报关闭",
      "category": "计划任务裁剪",
      "categoryId": "TaskTweaks",
      "level": 2,
      "aliases": [
        {
          "category": "计划任务裁剪",
          "categoryId": "TaskTweaks",
          "label": "功能控制使用数据上报关闭"
        }
      ],
      "options": [
        {
          "id": "v-51465befb349566a8976d813040e7fe7",
          "label": "启用",
          "value": {
            "kind": "Task",
            "enabled": true
          }
        },
        {
          "id": "v-8ce26c55f3a9a3b6487885506acb1a26",
          "label": "禁用",
          "value": {
            "kind": "Task",
            "enabled": false
          }
        }
      ],
      "target": {
        "kind": "task",
        "path": "\\Microsoft\\Windows\\Flighting\\FeatureConfig\\UsageDataReporting",
        "name": ""
      }
    },
    {
      "id": "a43d8bf015d080424c0b72fd6c695ad444a7bd52c5c9f8dbf91cd64862b597e6",
      "label": "功能控制使用数据冲洗关闭",
      "category": "计划任务裁剪",
      "categoryId": "TaskTweaks",
      "level": 2,
      "aliases": [
        {
          "category": "计划任务裁剪",
          "categoryId": "TaskTweaks",
          "label": "功能控制使用数据冲洗关闭"
        }
      ],
      "options": [
        {
          "id": "v-51465befb349566a8976d813040e7fe7",
          "label": "启用",
          "value": {
            "kind": "Task",
            "enabled": true
          }
        },
        {
          "id": "v-8ce26c55f3a9a3b6487885506acb1a26",
          "label": "禁用",
          "value": {
            "kind": "Task",
            "enabled": false
          }
        }
      ],
      "target": {
        "kind": "task",
        "path": "\\Microsoft\\Windows\\Flighting\\FeatureConfig\\UsageDataFlushing",
        "name": ""
      }
    },
    {
      "id": "f9b049d08d5b43dfa7efac4114bec2238ea61b4592a05d06a27903ba6d621a95",
      "label": "OneSettings 缓存刷新关闭",
      "category": "计划任务裁剪",
      "categoryId": "TaskTweaks",
      "level": 2,
      "aliases": [
        {
          "category": "计划任务裁剪",
          "categoryId": "TaskTweaks",
          "label": "OneSettings 缓存刷新关闭"
        }
      ],
      "options": [
        {
          "id": "v-51465befb349566a8976d813040e7fe7",
          "label": "启用",
          "value": {
            "kind": "Task",
            "enabled": true
          }
        },
        {
          "id": "v-8ce26c55f3a9a3b6487885506acb1a26",
          "label": "禁用",
          "value": {
            "kind": "Task",
            "enabled": false
          }
        }
      ],
      "target": {
        "kind": "task",
        "path": "\\Microsoft\\Windows\\Flighting\\OneSettings\\RefreshCache",
        "name": ""
      }
    },
    {
      "id": "861086e5f1c4a5057d2ae1b23423a7c68b2ab3814cfa472bf3380de09b878d44",
      "label": "可持续性遥测任务关闭",
      "category": "计划任务裁剪",
      "categoryId": "TaskTweaks",
      "level": 2,
      "aliases": [
        {
          "category": "计划任务裁剪",
          "categoryId": "TaskTweaks",
          "label": "可持续性遥测任务关闭"
        }
      ],
      "options": [
        {
          "id": "v-51465befb349566a8976d813040e7fe7",
          "label": "启用",
          "value": {
            "kind": "Task",
            "enabled": true
          }
        },
        {
          "id": "v-8ce26c55f3a9a3b6487885506acb1a26",
          "label": "禁用",
          "value": {
            "kind": "Task",
            "enabled": false
          }
        }
      ],
      "target": {
        "kind": "task",
        "path": "\\Microsoft\\Windows\\Sustainability\\SustainabilityTelemetry",
        "name": ""
      }
    },
    {
      "id": "c4fee049cd92dea3c4a3f6118f4ed4ec4b747ce4bc854c06cea3af8ac7141804",
      "label": "商业数据同步任务关闭",
      "category": "计划任务裁剪",
      "categoryId": "TaskTweaks",
      "level": 2,
      "aliases": [
        {
          "category": "计划任务裁剪",
          "categoryId": "TaskTweaks",
          "label": "商业数据同步任务关闭"
        }
      ],
      "options": [
        {
          "id": "v-51465befb349566a8976d813040e7fe7",
          "label": "启用",
          "value": {
            "kind": "Task",
            "enabled": true
          }
        },
        {
          "id": "v-8ce26c55f3a9a3b6487885506acb1a26",
          "label": "禁用",
          "value": {
            "kind": "Task",
            "enabled": false
          }
        }
      ],
      "target": {
        "kind": "task",
        "path": "\\Microsoft\\Windows\\WlanSvc\\CDSSync",
        "name": ""
      }
    },
    {
      "id": "72f05da9b2a4a14160b250164b8b2bce97e4a07622f9434f744c1b3ec2ff26a1",
      "label": "位置操作对话框任务关闭",
      "category": "计划任务裁剪",
      "categoryId": "TaskTweaks",
      "level": 2,
      "aliases": [
        {
          "category": "计划任务裁剪",
          "categoryId": "TaskTweaks",
          "label": "位置操作对话框任务关闭"
        }
      ],
      "options": [
        {
          "id": "v-51465befb349566a8976d813040e7fe7",
          "label": "启用",
          "value": {
            "kind": "Task",
            "enabled": true
          }
        },
        {
          "id": "v-8ce26c55f3a9a3b6487885506acb1a26",
          "label": "禁用",
          "value": {
            "kind": "Task",
            "enabled": false
          }
        }
      ],
      "target": {
        "kind": "task",
        "path": "\\Microsoft\\Windows\\Location\\WindowsActionDialog",
        "name": ""
      }
    },
    {
      "id": "9939f588e8a48713b22ca09f1d6e2ac63d83d9b286b3ba120b081b59cd28f524",
      "label": "UPnP 配置任务关闭",
      "category": "计划任务裁剪",
      "categoryId": "TaskTweaks",
      "level": 2,
      "aliases": [
        {
          "category": "计划任务裁剪",
          "categoryId": "TaskTweaks",
          "label": "UPnP 配置任务关闭"
        }
      ],
      "options": [
        {
          "id": "v-51465befb349566a8976d813040e7fe7",
          "label": "启用",
          "value": {
            "kind": "Task",
            "enabled": true
          }
        },
        {
          "id": "v-8ce26c55f3a9a3b6487885506acb1a26",
          "label": "禁用",
          "value": {
            "kind": "Task",
            "enabled": false
          }
        }
      ],
      "target": {
        "kind": "task",
        "path": "\\Microsoft\\Windows\\UPnP\\UPnPHostConfig",
        "name": ""
      }
    },
    {
      "id": "90cf9afafd694ee18935b05928db359e775c4f5599e2d3f30ad3b210aff454fa",
      "label": "主题同步图片下载关闭",
      "category": "计划任务裁剪",
      "categoryId": "TaskTweaks",
      "level": 2,
      "aliases": [
        {
          "category": "计划任务裁剪",
          "categoryId": "TaskTweaks",
          "label": "主题同步图片下载关闭"
        }
      ],
      "options": [
        {
          "id": "v-51465befb349566a8976d813040e7fe7",
          "label": "启用",
          "value": {
            "kind": "Task",
            "enabled": true
          }
        },
        {
          "id": "v-8ce26c55f3a9a3b6487885506acb1a26",
          "label": "禁用",
          "value": {
            "kind": "Task",
            "enabled": false
          }
        }
      ],
      "target": {
        "kind": "task",
        "path": "\\Microsoft\\Windows\\Shell\\ThemesSyncedImageDownload",
        "name": ""
      }
    },
    {
      "id": "6450e4d51a35026abd6ae68051e8c9e306cbf0a1f3b5c101125c80610d1faff1",
      "label": "Windows 更新策略触发任务关闭",
      "category": "计划任务裁剪",
      "categoryId": "TaskTweaks",
      "level": 3,
      "aliases": [
        {
          "category": "计划任务裁剪",
          "categoryId": "TaskTweaks",
          "label": "Windows 更新策略触发任务关闭"
        }
      ],
      "options": [
        {
          "id": "v-51465befb349566a8976d813040e7fe7",
          "label": "启用",
          "value": {
            "kind": "Task",
            "enabled": true
          }
        },
        {
          "id": "v-8ce26c55f3a9a3b6487885506acb1a26",
          "label": "禁用",
          "value": {
            "kind": "Task",
            "enabled": false
          }
        }
      ],
      "target": {
        "kind": "task",
        "path": "\\Microsoft\\Windows\\WindowsUpdate\\Scheduled Start",
        "name": ""
      }
    },
    {
      "id": "5a11a46d53916340f98ad5abf9c1195b4c992ed12f1622a0d99ab44d2fcb4ff7",
      "label": "禁用 Windows 错误报告服务",
      "category": "服务优化",
      "categoryId": "ServiceTweaks2",
      "level": 1,
      "aliases": [
        {
          "category": "服务优化",
          "categoryId": "ServiceTweaks2",
          "label": "禁用 Windows 错误报告服务"
        }
      ],
      "options": [
        {
          "id": "v-5211408567eac5f001640091a9364a43",
          "label": "禁用",
          "value": {
            "kind": "Service",
            "start": 4
          }
        },
        {
          "id": "v-f9fce49ddd0cd8c57583b51e850b37da",
          "label": "手动启动",
          "value": {
            "kind": "Service",
            "start": 3
          }
        },
        {
          "id": "v-ff68c5f81e0082c91db2abb353faf051",
          "label": "自动启动",
          "value": {
            "kind": "Service",
            "start": 2
          }
        }
      ],
      "target": {
        "kind": "service",
        "path": "WerSvc",
        "name": ""
      }
    },
    {
      "id": "5321b3a1001a8a43ebbdbc1c4472eb6b9330f76d8f11b94d2ccdb7478fadeaa8",
      "label": "禁用远程访问自动拨号",
      "category": "服务优化",
      "categoryId": "ServiceTweaks2",
      "level": 1,
      "aliases": [
        {
          "category": "服务优化",
          "categoryId": "ServiceTweaks2",
          "label": "禁用远程访问自动拨号"
        }
      ],
      "options": [
        {
          "id": "v-5211408567eac5f001640091a9364a43",
          "label": "禁用",
          "value": {
            "kind": "Service",
            "start": 4
          }
        },
        {
          "id": "v-f9fce49ddd0cd8c57583b51e850b37da",
          "label": "手动启动",
          "value": {
            "kind": "Service",
            "start": 3
          }
        },
        {
          "id": "v-ff68c5f81e0082c91db2abb353faf051",
          "label": "自动启动",
          "value": {
            "kind": "Service",
            "start": 2
          }
        }
      ],
      "target": {
        "kind": "service",
        "path": "RasAuto",
        "name": ""
      }
    },
    {
      "id": "81af101e7954796887f0d973028129954baaa578296958097fc32c3aeb1af352",
      "label": "禁用 Spot Verifier 文件系统校验",
      "category": "服务优化",
      "categoryId": "ServiceTweaks2",
      "level": 1,
      "aliases": [
        {
          "category": "服务优化",
          "categoryId": "ServiceTweaks2",
          "label": "禁用 Spot Verifier 文件系统校验"
        }
      ],
      "options": [
        {
          "id": "v-5211408567eac5f001640091a9364a43",
          "label": "禁用",
          "value": {
            "kind": "Service",
            "start": 4
          }
        },
        {
          "id": "v-f9fce49ddd0cd8c57583b51e850b37da",
          "label": "手动启动",
          "value": {
            "kind": "Service",
            "start": 3
          }
        },
        {
          "id": "v-ff68c5f81e0082c91db2abb353faf051",
          "label": "自动启动",
          "value": {
            "kind": "Service",
            "start": 2
          }
        }
      ],
      "target": {
        "kind": "service",
        "path": "svsvc",
        "name": ""
      }
    },
    {
      "id": "a6c06dae195bc1da80da29835d58da65fb906a9a489ddb6ca2db3e20c8575326",
      "label": "禁用蓝牙后台服务",
      "category": "服务优化",
      "categoryId": "ServiceTweaks2",
      "level": 2,
      "aliases": [
        {
          "category": "服务优化",
          "categoryId": "ServiceTweaks2",
          "label": "禁用蓝牙后台服务"
        }
      ],
      "options": [
        {
          "id": "v-5211408567eac5f001640091a9364a43",
          "label": "禁用",
          "value": {
            "kind": "Service",
            "start": 4
          }
        },
        {
          "id": "v-f9fce49ddd0cd8c57583b51e850b37da",
          "label": "手动启动",
          "value": {
            "kind": "Service",
            "start": 3
          }
        },
        {
          "id": "v-ff68c5f81e0082c91db2abb353faf051",
          "label": "自动启动",
          "value": {
            "kind": "Service",
            "start": 2
          }
        }
      ],
      "target": {
        "kind": "service",
        "path": "bthserv",
        "name": ""
      }
    },
    {
      "id": "c8b42324694e9c36beac5cd41e5c560ddde50846471d946925c9c8ac524792ae",
      "label": "禁用支付钱包服务",
      "category": "服务优化",
      "categoryId": "ServiceTweaks2",
      "level": 2,
      "aliases": [
        {
          "category": "服务优化",
          "categoryId": "ServiceTweaks2",
          "label": "禁用支付钱包服务"
        }
      ],
      "options": [
        {
          "id": "v-5211408567eac5f001640091a9364a43",
          "label": "禁用",
          "value": {
            "kind": "Service",
            "start": 4
          }
        },
        {
          "id": "v-f9fce49ddd0cd8c57583b51e850b37da",
          "label": "手动启动",
          "value": {
            "kind": "Service",
            "start": 3
          }
        },
        {
          "id": "v-ff68c5f81e0082c91db2abb353faf051",
          "label": "自动启动",
          "value": {
            "kind": "Service",
            "start": 2
          }
        }
      ],
      "target": {
        "kind": "service",
        "path": "WalletService",
        "name": ""
      }
    },
    {
      "id": "f9a1b28e6ae964e0f83e33990e48871c2b252063b7534c8394b2067ec306d697",
      "label": "禁用电话服务",
      "category": "服务优化",
      "categoryId": "ServiceTweaks2",
      "level": 2,
      "aliases": [
        {
          "category": "服务优化",
          "categoryId": "ServiceTweaks2",
          "label": "禁用电话服务"
        }
      ],
      "options": [
        {
          "id": "v-5211408567eac5f001640091a9364a43",
          "label": "禁用",
          "value": {
            "kind": "Service",
            "start": 4
          }
        },
        {
          "id": "v-f9fce49ddd0cd8c57583b51e850b37da",
          "label": "手动启动",
          "value": {
            "kind": "Service",
            "start": 3
          }
        },
        {
          "id": "v-ff68c5f81e0082c91db2abb353faf051",
          "label": "自动启动",
          "value": {
            "kind": "Service",
            "start": 2
          }
        }
      ],
      "target": {
        "kind": "service",
        "path": "PhoneSvc",
        "name": ""
      }
    },
    {
      "id": "ab156104bc7aff921ccc63944574ce8873d5eb800dfff14afe7eb2d59ea102fe",
      "label": "禁用短信路由服务",
      "category": "服务优化",
      "categoryId": "ServiceTweaks2",
      "level": 2,
      "aliases": [
        {
          "category": "服务优化",
          "categoryId": "ServiceTweaks2",
          "label": "禁用短信路由服务"
        }
      ],
      "options": [
        {
          "id": "v-5211408567eac5f001640091a9364a43",
          "label": "禁用",
          "value": {
            "kind": "Service",
            "start": 4
          }
        },
        {
          "id": "v-f9fce49ddd0cd8c57583b51e850b37da",
          "label": "手动启动",
          "value": {
            "kind": "Service",
            "start": 3
          }
        },
        {
          "id": "v-ff68c5f81e0082c91db2abb353faf051",
          "label": "自动启动",
          "value": {
            "kind": "Service",
            "start": 2
          }
        }
      ],
      "target": {
        "kind": "service",
        "path": "SmsRouter",
        "name": ""
      }
    },
    {
      "id": "49de86843ce32cfcbb1e275aa634916c1352babe5bd026b0ab716e869ac5ef80",
      "label": "禁用 NFC 安全元素服务",
      "category": "服务优化",
      "categoryId": "ServiceTweaks2",
      "level": 2,
      "aliases": [
        {
          "category": "服务优化",
          "categoryId": "ServiceTweaks2",
          "label": "禁用 NFC 安全元素服务"
        }
      ],
      "options": [
        {
          "id": "v-5211408567eac5f001640091a9364a43",
          "label": "禁用",
          "value": {
            "kind": "Service",
            "start": 4
          }
        },
        {
          "id": "v-f9fce49ddd0cd8c57583b51e850b37da",
          "label": "手动启动",
          "value": {
            "kind": "Service",
            "start": 3
          }
        },
        {
          "id": "v-ff68c5f81e0082c91db2abb353faf051",
          "label": "自动启动",
          "value": {
            "kind": "Service",
            "start": 2
          }
        }
      ],
      "target": {
        "kind": "service",
        "path": "SEMgrSvc",
        "name": ""
      }
    },
    {
      "id": "57c7389a85eb404c6ed1d68bd9791ecdc3f7171d88782daaf0069b6ace695cbf",
      "label": "禁用跨设备平台服务",
      "category": "服务优化",
      "categoryId": "ServiceTweaks2",
      "level": 2,
      "aliases": [
        {
          "category": "服务优化",
          "categoryId": "ServiceTweaks2",
          "label": "禁用跨设备平台服务"
        }
      ],
      "options": [
        {
          "id": "v-5211408567eac5f001640091a9364a43",
          "label": "禁用",
          "value": {
            "kind": "Service",
            "start": 4
          }
        },
        {
          "id": "v-f9fce49ddd0cd8c57583b51e850b37da",
          "label": "手动启动",
          "value": {
            "kind": "Service",
            "start": 3
          }
        },
        {
          "id": "v-ff68c5f81e0082c91db2abb353faf051",
          "label": "自动启动",
          "value": {
            "kind": "Service",
            "start": 2
          }
        }
      ],
      "target": {
        "kind": "service",
        "path": "CDPSvc",
        "name": ""
      }
    },
    {
      "id": "241ffef03468c5312a1569056dd5d0166059f62db2c4b1838947f6cdf6d2aace",
      "label": "禁用 Windows AI Fabric 服务",
      "category": "服务优化",
      "categoryId": "ServiceTweaks2",
      "level": 2,
      "aliases": [
        {
          "category": "服务优化",
          "categoryId": "ServiceTweaks2",
          "label": "禁用 Windows AI Fabric 服务"
        }
      ],
      "options": [
        {
          "id": "v-5211408567eac5f001640091a9364a43",
          "label": "禁用",
          "value": {
            "kind": "Service",
            "start": 4
          }
        },
        {
          "id": "v-f9fce49ddd0cd8c57583b51e850b37da",
          "label": "手动启动",
          "value": {
            "kind": "Service",
            "start": 3
          }
        },
        {
          "id": "v-ff68c5f81e0082c91db2abb353faf051",
          "label": "自动启动",
          "value": {
            "kind": "Service",
            "start": 2
          }
        }
      ],
      "target": {
        "kind": "service",
        "path": "WSAIFabricSvc",
        "name": ""
      }
    },
    {
      "id": "5a0f0c9fca279168f4af8923d0027f69c742926bf8c8565baaf9da113066ac88",
      "label": "禁用打印后台服务",
      "category": "服务优化",
      "categoryId": "ServiceTweaks2",
      "level": 3,
      "aliases": [
        {
          "category": "服务优化",
          "categoryId": "ServiceTweaks2",
          "label": "禁用打印后台服务"
        }
      ],
      "options": [
        {
          "id": "v-5211408567eac5f001640091a9364a43",
          "label": "禁用",
          "value": {
            "kind": "Service",
            "start": 4
          }
        },
        {
          "id": "v-f9fce49ddd0cd8c57583b51e850b37da",
          "label": "手动启动",
          "value": {
            "kind": "Service",
            "start": 3
          }
        },
        {
          "id": "v-ff68c5f81e0082c91db2abb353faf051",
          "label": "自动启动",
          "value": {
            "kind": "Service",
            "start": 2
          }
        }
      ],
      "target": {
        "kind": "service",
        "path": "Spooler",
        "name": ""
      }
    },
    {
      "id": "0a472aa273f007f700dc1f67bbb8f3d39f4eb94a6a4af9925823965c6a3148c0",
      "label": "禁用远程桌面服务",
      "category": "服务优化",
      "categoryId": "ServiceTweaks2",
      "level": 3,
      "aliases": [
        {
          "category": "服务优化",
          "categoryId": "ServiceTweaks2",
          "label": "禁用远程桌面服务"
        }
      ],
      "options": [
        {
          "id": "v-5211408567eac5f001640091a9364a43",
          "label": "禁用",
          "value": {
            "kind": "Service",
            "start": 4
          }
        },
        {
          "id": "v-f9fce49ddd0cd8c57583b51e850b37da",
          "label": "手动启动",
          "value": {
            "kind": "Service",
            "start": 3
          }
        },
        {
          "id": "v-ff68c5f81e0082c91db2abb353faf051",
          "label": "自动启动",
          "value": {
            "kind": "Service",
            "start": 2
          }
        }
      ],
      "target": {
        "kind": "service",
        "path": "TermService",
        "name": ""
      }
    },
    {
      "id": "41ad7a4037e131d157184204064bbf63f10094874420ae3eff6dac23109e569d",
      "label": "禁用远程桌面重定向服务",
      "category": "服务优化",
      "categoryId": "ServiceTweaks2",
      "level": 3,
      "aliases": [
        {
          "category": "服务优化",
          "categoryId": "ServiceTweaks2",
          "label": "禁用远程桌面重定向服务"
        }
      ],
      "options": [
        {
          "id": "v-5211408567eac5f001640091a9364a43",
          "label": "禁用",
          "value": {
            "kind": "Service",
            "start": 4
          }
        },
        {
          "id": "v-f9fce49ddd0cd8c57583b51e850b37da",
          "label": "手动启动",
          "value": {
            "kind": "Service",
            "start": 3
          }
        },
        {
          "id": "v-ff68c5f81e0082c91db2abb353faf051",
          "label": "自动启动",
          "value": {
            "kind": "Service",
            "start": 2
          }
        }
      ],
      "target": {
        "kind": "service",
        "path": "UmRdpService",
        "name": ""
      }
    },
    {
      "id": "ce8d8a84e339b722f7401f00626e401fdaa92dd1fffc8a227d0985d746c6ee76",
      "label": "禁用远程桌面配置服务",
      "category": "服务优化",
      "categoryId": "ServiceTweaks2",
      "level": 3,
      "aliases": [
        {
          "category": "服务优化",
          "categoryId": "ServiceTweaks2",
          "label": "禁用远程桌面配置服务"
        }
      ],
      "options": [
        {
          "id": "v-5211408567eac5f001640091a9364a43",
          "label": "禁用",
          "value": {
            "kind": "Service",
            "start": 4
          }
        },
        {
          "id": "v-f9fce49ddd0cd8c57583b51e850b37da",
          "label": "手动启动",
          "value": {
            "kind": "Service",
            "start": 3
          }
        },
        {
          "id": "v-ff68c5f81e0082c91db2abb353faf051",
          "label": "自动启动",
          "value": {
            "kind": "Service",
            "start": 2
          }
        }
      ],
      "target": {
        "kind": "service",
        "path": "SessionEnv",
        "name": ""
      }
    },
    {
      "id": "3e50edad038ebc6702200005ef9b72238267d5c5973a84946bb8dbbeb5d9fa9f",
      "label": "禁用远程访问连接管理器",
      "category": "服务优化",
      "categoryId": "ServiceTweaks2",
      "level": 3,
      "aliases": [
        {
          "category": "服务优化",
          "categoryId": "ServiceTweaks2",
          "label": "禁用远程访问连接管理器"
        }
      ],
      "options": [
        {
          "id": "v-5211408567eac5f001640091a9364a43",
          "label": "禁用",
          "value": {
            "kind": "Service",
            "start": 4
          }
        },
        {
          "id": "v-f9fce49ddd0cd8c57583b51e850b37da",
          "label": "手动启动",
          "value": {
            "kind": "Service",
            "start": 3
          }
        },
        {
          "id": "v-ff68c5f81e0082c91db2abb353faf051",
          "label": "自动启动",
          "value": {
            "kind": "Service",
            "start": 2
          }
        }
      ],
      "target": {
        "kind": "service",
        "path": "RasMan",
        "name": ""
      }
    },
    {
      "id": "f1e7941c4836a0d4016dd826efb57fb47f41698b99b8787a1f6f52538108a1ca",
      "label": "禁用 Windows 生物识别服务",
      "category": "服务优化",
      "categoryId": "ServiceTweaks2",
      "level": 3,
      "aliases": [
        {
          "category": "服务优化",
          "categoryId": "ServiceTweaks2",
          "label": "禁用 Windows 生物识别服务"
        }
      ],
      "options": [
        {
          "id": "v-5211408567eac5f001640091a9364a43",
          "label": "禁用",
          "value": {
            "kind": "Service",
            "start": 4
          }
        },
        {
          "id": "v-f9fce49ddd0cd8c57583b51e850b37da",
          "label": "手动启动",
          "value": {
            "kind": "Service",
            "start": 3
          }
        },
        {
          "id": "v-ff68c5f81e0082c91db2abb353faf051",
          "label": "自动启动",
          "value": {
            "kind": "Service",
            "start": 2
          }
        }
      ],
      "target": {
        "kind": "service",
        "path": "WbioSrvc",
        "name": ""
      }
    },
    {
      "id": "d55e1f5cdeafdf349bd25448223981fa01e290ce9f7901412334abad99be1926",
      "label": "禁用智能卡相关服务 · SCardSvr",
      "category": "服务优化",
      "categoryId": "ServiceTweaks2",
      "level": 3,
      "aliases": [
        {
          "category": "服务优化",
          "categoryId": "ServiceTweaks2",
          "label": "禁用智能卡相关服务"
        }
      ],
      "options": [
        {
          "id": "v-5211408567eac5f001640091a9364a43",
          "label": "禁用",
          "value": {
            "kind": "Service",
            "start": 4
          }
        },
        {
          "id": "v-f9fce49ddd0cd8c57583b51e850b37da",
          "label": "手动启动",
          "value": {
            "kind": "Service",
            "start": 3
          }
        },
        {
          "id": "v-ff68c5f81e0082c91db2abb353faf051",
          "label": "自动启动",
          "value": {
            "kind": "Service",
            "start": 2
          }
        }
      ],
      "target": {
        "kind": "service",
        "path": "SCardSvr",
        "name": ""
      }
    },
    {
      "id": "05e70db9012d864aa85024b28d6d6d7b9904099ab439076b4126959e35f178ca",
      "label": "禁用智能卡相关服务 · ScDeviceEnum",
      "category": "服务优化",
      "categoryId": "ServiceTweaks2",
      "level": 3,
      "aliases": [
        {
          "category": "服务优化",
          "categoryId": "ServiceTweaks2",
          "label": "禁用智能卡相关服务"
        }
      ],
      "options": [
        {
          "id": "v-5211408567eac5f001640091a9364a43",
          "label": "禁用",
          "value": {
            "kind": "Service",
            "start": 4
          }
        },
        {
          "id": "v-f9fce49ddd0cd8c57583b51e850b37da",
          "label": "手动启动",
          "value": {
            "kind": "Service",
            "start": 3
          }
        },
        {
          "id": "v-ff68c5f81e0082c91db2abb353faf051",
          "label": "自动启动",
          "value": {
            "kind": "Service",
            "start": 2
          }
        }
      ],
      "target": {
        "kind": "service",
        "path": "ScDeviceEnum",
        "name": ""
      }
    },
    {
      "id": "de0e7d569f07a559afbd2451fc9c92b064070b0635fb0b849d8b27fe407f0171",
      "label": "禁用智能卡相关服务 · SCPolicySvc",
      "category": "服务优化",
      "categoryId": "ServiceTweaks2",
      "level": 3,
      "aliases": [
        {
          "category": "服务优化",
          "categoryId": "ServiceTweaks2",
          "label": "禁用智能卡相关服务"
        }
      ],
      "options": [
        {
          "id": "v-5211408567eac5f001640091a9364a43",
          "label": "禁用",
          "value": {
            "kind": "Service",
            "start": 4
          }
        },
        {
          "id": "v-f9fce49ddd0cd8c57583b51e850b37da",
          "label": "手动启动",
          "value": {
            "kind": "Service",
            "start": 3
          }
        },
        {
          "id": "v-ff68c5f81e0082c91db2abb353faf051",
          "label": "自动启动",
          "value": {
            "kind": "Service",
            "start": 2
          }
        }
      ],
      "target": {
        "kind": "service",
        "path": "SCPolicySvc",
        "name": ""
      }
    }
  ],
  "unsupported": [
    {
      "id": "d6bb654feb656fea13d8d24487a71108d6f7ce6b83d17a550c3a4457f7cbdca8",
      "label": "禁用虚拟化安全 (VBS)",
      "category": "性能深度调优",
      "categoryId": "FpsDepthTweaks",
      "reason": "高风险设置不支持社区分享"
    },
    {
      "id": "64e5149033ba4a0cf4cbaf4c92d50ca9d15584cbb525408226b18dd8aa005baf",
      "label": "禁用内存完整性 (HVCI)",
      "category": "性能深度调优",
      "categoryId": "FpsDepthTweaks",
      "reason": "高风险设置不支持社区分享"
    },
    {
      "id": "06c69c15c71cff04768107f4bd96657c3836178acb6b92be0e42c883ed1c7a3a",
      "label": "禁用 UAC 用户账户控制",
      "category": "性能深度调优",
      "categoryId": "FpsDepthTweaks",
      "reason": "高风险设置不支持社区分享"
    },
    {
      "id": "b005b67c146fb740166b7a34e0e655121f85710169960b11f2a5215a9415d2fc",
      "label": "禁用 Windows 防火墙服务",
      "category": "性能深度调优",
      "categoryId": "FpsDepthTweaks",
      "reason": "高风险设置不支持社区分享"
    },
    {
      "id": "1f3d17c0518c5ec330a896bb10a3d9c0df1a770c3ea36e214d428356c9cd75d4",
      "label": "关闭 Defender 实时保护",
      "category": "性能深度调优",
      "categoryId": "FpsDepthTweaks",
      "reason": "高风险设置不支持社区分享"
    },
    {
      "id": "346f183f3fa2323b039a2928a636f8b27b90acbfefa177a8b4aa6a3debf676c6",
      "label": "禁用 CPU 核心驻留 (Core Parking)",
      "category": "性能深度调优",
      "categoryId": "FpsDepthTweaks",
      "reason": "脚本、组件或设备相关操作暂不支持分享"
    },
    {
      "id": "16f2e835fac4fc389b0e2bd6f1518a80e42a63a910b9d741a052a2e93a8cb3b2",
      "label": "关闭 Spectre/Meltdown 安全缓解",
      "category": "性能深度调优",
      "categoryId": "FpsDepthTweaks",
      "reason": "高风险设置不支持社区分享"
    },
    {
      "id": "a654462ed08cfb9233cf9f0db2faae824eb622b89eecd4d21ca923bf8b09d00a",
      "label": "CPU 处理器状态锁定 100%",
      "category": "性能深度调优",
      "categoryId": "FpsDepthTweaks",
      "reason": "高风险设置不支持社区分享"
    },
    {
      "id": "2649b04ac5e22b6237825d37b95df5c432d18f7854336229b94b3ace3ca641d6",
      "label": "禁用 CPU C-States (Intel)",
      "category": "性能深度调优",
      "categoryId": "FpsDepthTweaks",
      "reason": "高风险设置不支持社区分享"
    },
    {
      "id": "c83cc8911d10a9c74492ad43f60da1974a7378469165055d2e6bb130e993d58b",
      "label": "禁用内存压缩",
      "category": "性能深度调优",
      "categoryId": "FpsDepthTweaks",
      "reason": "脚本、组件或设备相关操作暂不支持分享"
    },
    {
      "id": "7f77a9f23e83663a4e760fa710ac84a93e27e28f75ed5bde479935fb26abea1b",
      "label": "关闭休眠回收内存镜像文件",
      "category": "性能深度调优",
      "categoryId": "FpsDepthTweaks",
      "reason": "脚本、组件或设备相关操作暂不支持分享"
    },
    {
      "id": "94df7756262375a19e85a5d91ef5cfdc79d4d9847689a21f115e8213e11dd26f",
      "label": "DNS 预设 - Cloudflare",
      "category": "网络深度优化",
      "categoryId": "NetDepthTweaks",
      "reason": "脚本、组件或设备相关操作暂不支持分享"
    },
    {
      "id": "7ff6dac8e69d26f096e63204963d95edc787dc7e78417c955aeea2dae9e0fd1a",
      "label": "DNS 预设 - Google",
      "category": "网络深度优化",
      "categoryId": "NetDepthTweaks",
      "reason": "脚本、组件或设备相关操作暂不支持分享"
    },
    {
      "id": "1bb1e014464794ec1ccbeb503039c4eb15333319e060806700779170edf975c5",
      "label": "DNS 预设 - Quad9",
      "category": "网络深度优化",
      "categoryId": "NetDepthTweaks",
      "reason": "脚本、组件或设备相关操作暂不支持分享"
    },
    {
      "id": "bf5fa52efbdc1b189899fda11d4a1b62a9ad1ab5749ff74e0f4ab8914e5b4bb3",
      "label": "禁用 RSC",
      "category": "网络深度优化",
      "categoryId": "NetDepthTweaks",
      "reason": "脚本、组件或设备相关操作暂不支持分享"
    },
    {
      "id": "ac6575f68fdb35e6e43348f22b797fa01c29a8dfc95704a7dd7fb5a80fe86501",
      "label": "禁用 ECN",
      "category": "网络深度优化",
      "categoryId": "NetDepthTweaks",
      "reason": "脚本、组件或设备相关操作暂不支持分享"
    },
    {
      "id": "13719b509c62ed151439d34d811b09866302de1120f6aedef575c0765ae2c013",
      "label": "显示 .lnk 快捷方式扩展名",
      "category": "资源管理器调优",
      "categoryId": "ExplorerTweaks",
      "reason": "脚本、组件或设备相关操作暂不支持分享"
    },
    {
      "id": "62a8fb7dd680b65e3012d8cb14517d024b59e6d74a99fdace819dae695dcc0f7",
      "label": "恢复 Win11 经典右键菜单",
      "category": "资源管理器调优",
      "categoryId": "ExplorerTweaks",
      "reason": "脚本、组件或设备相关操作暂不支持分享"
    },
    {
      "id": "1996a3a6e7a4c476bdb85e7dee23dd095dd20822f937334d9b8ee9461d0fb499",
      "label": "启用旧版 Windows 照片查看器",
      "category": "资源管理器调优",
      "categoryId": "ExplorerTweaks",
      "reason": "脚本、组件或设备相关操作暂不支持分享"
    }
  ]
};
function freeze(value) {
  if (value && typeof value === "object") {
    for (const child of Object.values(value)) freeze(child);
    Object.freeze(value);
  }
  return value;
}
freeze(data);
const SYSTEM_SETTINGS = data.settings;
data.unsupported;
data.categories;
const byId = new Map(SYSTEM_SETTINGS.map((setting) => [setting.id, setting]));
function systemSetting(id) {
  return byId.get(id);
}
function systemSettingOption(id, value) {
  return byId.get(id)?.options.find((option) => option.id === value);
}
const PRESET_KINDS = Object.freeze(["system", "filter", "eq", "crosshair"]);
const FPS_IDS = Object.freeze({
  safe: Object.freeze(["v570-dvr-policy", "v570-recording", "v570-dvr", "v570-mmcss-response", "v570-mmcss-gpu", "v570-mmcss-priority", "v570-mmcss-category", "v570-mmcss-io", "v570-tcp-autotune", "v570-rss", "v570-tcp-interfaces", "v570-visual-effects", "v570-notification-global", "v570-notifications", "v570-background-apps", "v570-compat-DisablePCA", "v570-compat-DisableEngine", "v570-maintenance", "v570-game-mode", "v570-throttle-user", "v570-power-throttling", "v570-delivery", "v570-service-DoSvc", "v570-wer-machine", "v570-wer-user", "v570-service-WerSvc", "v570-usb-registry", "v570-usb-ac"]),
  advanced: Object.freeze(["v570-service-SysMain", "v570-system-cache", "v570-page-combining", "v570-cpu-min", "v570-cpu-max", "v570-core-parking", "v570-service-WSearch", "v570-mouse-MouseSpeed", "v570-mouse-MouseThreshold1", "v570-mouse-MouseThreshold2", "v570-keyboard-delay", "v570-keyboard-speed", "v570-service-WpnService", "v570-service-MapsBroker", "v570-service-lfsvc", "v570-service-wisvc", "v570-service-stisvc", "v570-service-icssvc", "v570-service-PcaSvc", "v570-service-WMPNetworkSvc", "v570-service-OneSyncSvc", "v570-service-MessagingService", "v570-service-RetailDemo", "v570-service-dmwappushservice", "v570-service-WpcMonSvc", "v570-menu-delay", "v570-transparency", "v570-foreground", "v570-foreground-boost", "v570-network-throttle", "v570-widgets", "v570-widgets-taskbar", "v570-feeds", "v570-service-WidgetsSvc"]),
  extreme: Object.freeze(["v570-service-XblAuthManager", "v570-service-XblGameSave", "v570-service-XboxNetApiSvc", "v570-service-XboxGipSvc", "v570-settings-sync", "v570-hibernate"])
});
const fail = (message) => {
  throw new Error(message);
};
function object(value, keys) {
  if (!value || typeof value !== "object" || Array.isArray(value) || Object.getPrototypeOf(value) !== Object.prototype && Object.getPrototypeOf(value) !== null) fail("方案参数必须是普通对象");
  if (Object.keys(value).some((key) => !keys.includes(key))) fail("方案包含不支持的参数");
  return value;
}
const number = (value, min, max) => typeof value === "number" && Number.isFinite(value) && value >= min && value <= max ? value : fail("方案数值超出范围");
const boolean = (value) => typeof value === "boolean" ? value : fail("方案开关参数无效");
const choice = (value, list) => list.includes(value) ? value : fail("方案选项无效");
const color = (value) => typeof value === "string" && /^#[a-f\d]{6}$/i.test(value) ? value.toLowerCase() : fail("准星颜色无效");
function numbers(value, length, min, max) {
  if (!Array.isArray(value) || value.length !== length) fail("方案数组长度无效");
  return value.map((n) => number(n, min, max));
}
const basicRanges = { offsetX: [-50, 50], offsetY: [-50, 50], thickness: [1, 12], length: [2, 40], gap: [0, 15], outlineOpacity: [0.1, 1], outlineThickness: [1, 6], dotOpacity: [0.05, 1], dotThickness: [2, 15], scaleX: [0.5, 3], scaleY: [0.5, 3] };
const legacyRanges = { size: [8, 160], opacity: [0.1, 1], dotSize: [0, 20], dotOpacity: [0.1, 1], lineLength: [0, 60], lineWidth: [1, 12], lineGap: [0, 40], outerLength: [0, 40], outerWidth: [1, 12], outerGap: [0, 60], outlineWidth: [0, 6], circleRadius: [4, 80], circleWidth: [1, 12], rotation: [0, 360] };
const legacyBooleans = ["dotEnabled", "tStyle", "outerEnabled", "outlineEnabled"];
const legacyStyles = ["classic", "cross", "dot", "circle", "circle-dot", "thin-cross", ...["Glasses", "Smiley", "T字准星", "aragornN", "ropz", "s1mple", "MMW2.0", "donk", "cat", "SSCJ"].map((x) => "img:" + x)];
function legacy(value) {
  const p = object(value, ["schema", "style", "color", "outlineColor", ...Object.keys(legacyRanges), ...legacyBooleans]);
  if (p.schema !== "crosshair-preset-v1") fail("高级准星版本不受支持");
  const out = { schema: p.schema, style: choice(p.style, legacyStyles), color: color(p.color), outlineColor: color(p.outlineColor) };
  for (const [key, [min, max]] of Object.entries(legacyRanges)) out[key] = number(p[key], min, max);
  for (const key of legacyBooleans) out[key] = boolean(p[key]);
  if (out.style === "cross" || out.style === "thin-cross") out.style = "classic";
  else if (out.style === "circle-dot") {
    out.style = "circle";
    out.dotEnabled = true;
  }
  return out;
}
function validatePreset(value) {
  const input = object(value, ["schemaVersion", "kind", "params"]);
  if (input.schemaVersion !== 1) fail("方案版本不受支持");
  const kind = choice(input.kind, PRESET_KINDS);
  let params;
  if (kind === "system") {
    if (input.params?.catalog === "system-settings-v1") {
      const p = object(input.params, ["catalog", "settings"]);
      if (!Array.isArray(p.settings) || !p.settings.length || p.settings.length > 512 || p.settings.length > SYSTEM_SETTINGS.length) fail("请选择 1–512 项可分享的系统设置");
      const seen = /* @__PURE__ */ new Set();
      const settings = Array.from(p.settings, (value2) => {
        const item = object(value2, ["id", "value"]);
        if (typeof item.id !== "string" || typeof item.value !== "string" || seen.has(item.id) || !systemSettingOption(item.id, item.value)) fail("系统设置或选项不在当前白名单内");
        seen.add(item.id);
        return { id: item.id, value: item.value };
      }).sort((a, b) => a.id < b.id ? -1 : a.id > b.id ? 1 : 0);
      params = { catalog: "system-settings-v1", settings };
    } else {
      const p = object(input.params, ["catalog", "tier", "ids"]);
      if (p.catalog !== "fps570-v1") fail("优化项目版本不受支持");
      const tiers = ["safe", "advanced", "extreme"], tier = choice(p.tier, tiers);
      const allowed = tiers.slice(0, tiers.indexOf(tier) + 1).flatMap((t) => FPS_IDS[t]);
      if (!Array.isArray(p.ids) || !p.ids.length || p.ids.length > allowed.length || new Set(p.ids).size !== p.ids.length || p.ids.some((id) => !allowed.includes(id))) fail("优化项目不在当前白名单内");
      params = { catalog: "fps570-v1", tier, ids: allowed.filter((id) => p.ids.includes(id)) };
    }
  } else if (kind === "filter") {
    const source = input.params, mode = choice(source?.mode, ["params", "lut"]);
    const keys = mode === "params" ? ["brightness", "contrast", "gamma", "redGain", "greenGain", "blueGain", "curvePoints"] : ["r", "g", "b"];
    const p = object(source, ["mode", "temp", "saturation", ...keys]);
    params = { mode, temp: number(p.temp, 3e3, 9e3), saturation: number(p.saturation, 0, 100) };
    if (mode === "params") {
      for (const key of ["brightness", "contrast", "redGain", "greenGain", "blueGain"]) params[key] = number(p[key], 0, 100);
      params.gamma = number(p.gamma, 50, 250);
      if (!Array.isArray(p.curvePoints) || p.curvePoints.length < 2 || p.curvePoints.length > 32) fail("曲线需要 2–32 个点");
      params.curvePoints = p.curvePoints.map((point) => {
        const q = object(point, ["x", "y"]);
        return { x: number(q.x, 0, 100), y: number(q.y, 0, 100) };
      });
      if (params.curvePoints[0].x !== 0 || params.curvePoints.at(-1).x !== 100 || params.curvePoints.some((p2, i, a) => i > 0 && p2.x <= a[i - 1].x)) fail("曲线横坐标应严格递增并覆盖 0–100");
    } else for (const key of ["r", "g", "b"]) params[key] = numbers(p[key], 256, 0, 1);
  } else if (kind === "eq") {
    const p = object(input.params, ["freqs", "gains", "master"]);
    params = { freqs: numbers(p.freqs, 10, 20, 2e4), gains: numbers(p.gains, 10, -12, 12), master: number(p.master, -12, 12) };
    if (params.freqs.some((n, i, a) => i > 0 && n <= a[i - 1])) fail("均衡器频率必须严格递增");
  } else {
    const p = object(input.params, ["shape", "color", "outlines", "centerDot", "legacyPreset", ...Object.keys(basicRanges)]);
    params = { shape: choice(p.shape, ["cross", "dot", "circle", "chevron"]), color: color(p.color), outlines: boolean(p.outlines), centerDot: boolean(p.centerDot), legacyPreset: p.legacyPreset == null ? null : legacy(p.legacyPreset) };
    for (const [key, [min, max]] of Object.entries(basicRanges)) params[key] = number(p[key], min, max);
  }
  return { schemaVersion: 1, kind, params };
}
function presetLut(params) {
  if (params.mode === "params") return computeLUT(params);
  const delta = (params.temp - 6500) / 1e3, multipliers = [1 - delta * 0.06, 1 - Math.abs(delta) * 0.012, 1 + delta * 0.06];
  return { r: params.r.map((v) => Math.max(0, Math.min(1, v * multipliers[0]))), g: params.g.map((v) => Math.max(0, Math.min(1, v * multipliers[1]))), b: params.b.map((v) => Math.max(0, Math.min(1, v * multipliers[2]))) };
}
function saturationMatrix(value) {
  const saturation = value / 50, weights = [0.2126, 0.7152, 0.0722];
  return [0, 1, 2].flatMap((row) => [...weights.map((w, col) => w * (1 - saturation) + (row === col ? saturation : 0)), 0, 0]).concat([0, 0, 0, 1, 0]).map((v) => Number(v.toFixed(7))).join(" ");
}
const sceneImage = "" + new URL("航天基地_室外-BAKs9aoq.png", import.meta.url).href;
const _hoisted_1 = {
  key: 0,
  class: "invalid"
};
const _hoisted_2 = { class: "filter-scene" };
const _hoisted_3 = ["src"];
const _hoisted_4 = ["src"];
const _hoisted_5 = { key: 0 };
const _hoisted_6 = {
  class: "eq-chart",
  viewBox: "0 0 560 186",
  role: "img",
  "aria-label": "方案均衡器设置曲线"
};
const _hoisted_7 = ["y1", "y2"];
const _hoisted_8 = ["y"];
const _hoisted_9 = ["points"];
const _hoisted_10 = ["cx", "cy"];
const _hoisted_11 = ["x"];
const _hoisted_12 = { key: 0 };
const _hoisted_13 = { class: "system-item-title" };
const _hoisted_14 = { key: 0 };
const _hoisted_15 = { key: 0 };
const _hoisted_16 = { key: 0 };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "CommunityPresetPreview",
  props: {
    payload: {},
    compact: { type: Boolean }
  },
  setup(__props) {
    const props = __props;
    const safe = computed(() => {
      try {
        return validatePreset(props.payload);
      } catch {
        return null;
      }
    }), split = ref(50);
    const tierNames = { safe: "基础电竞", advanced: "极致流畅", extreme: "极客骨灰级" };
    const systemItems = computed(() => {
      const payload = safe.value;
      if (payload?.kind !== "system") return [];
      const params = payload.params;
      if (params.catalog === "fps570-v1") return fpsPlan(params.tier).filter((item) => params.ids.includes(item.id)).map((item) => ({ ...item, valueLabel: "" }));
      return params.settings.flatMap((state) => {
        const definition = systemSetting(state.id), option = systemSettingOption(state.id, state.value);
        return definition && option ? [{ id: state.id, label: definition.label, valueLabel: option.label, impact: definition.category + (definition.level >= 2 ? " · 进阶项目，需确认适用范围" : "") }] : [];
      });
    });
    const filterCss = computed(() => {
      if (safe.value?.kind !== "filter") return "none";
      const lut = presetLut(safe.value.params), table = (a) => a.map((n) => Number(n.toFixed(7))).join(" ");
      const svg = `<svg xmlns='http://www.w3.org/2000/svg'><filter id='p' color-interpolation-filters='sRGB'><feComponentTransfer><feFuncR type='table' tableValues='${table(lut.r)}'/><feFuncG type='table' tableValues='${table(lut.g)}'/><feFuncB type='table' tableValues='${table(lut.b)}'/></feComponentTransfer><feColorMatrix type='matrix' values='${saturationMatrix(safe.value.params.saturation)}'/></filter></svg>`;
      return `url("data:image/svg+xml,${encodeURIComponent(svg)}#p")`;
    });
    const eqX = (hz) => 34 + Math.log(hz / 20) / Math.log(1e3) * 512, eqY = (db) => 84 - db / 24 * 70;
    const frequencyLabel = (hz) => hz >= 1e3 ? `${Number((hz / 1e3).toFixed(1))}k` : `${hz}`;
    const eqPoints = computed(() => safe.value?.kind === "eq" ? safe.value.params.gains.map((g, i) => `${eqX(safe.value.kind === "eq" ? safe.value.params.freqs[i] : 20)},${eqY(g + (safe.value.kind === "eq" ? safe.value.params.master : 0))}`).join(" ") : "");
    const cfg = computed(() => safe.value?.kind === "crosshair" ? safe.value.params : null);
    const outline = () => cfg.value?.outlines ? `0 0 0 ${cfg.value.outlineThickness}px rgba(0,0,0,${cfg.value.outlineOpacity})` : void 0;
    const dotStyle = computed(() => {
      const c = cfg.value;
      return c ? { width: c.dotThickness + "px", height: c.dotThickness + "px", background: `rgba(${parseInt(c.color.slice(1, 3), 16)},${parseInt(c.color.slice(3, 5), 16)},${parseInt(c.color.slice(5, 7), 16)},${c.dotOpacity})`, boxShadow: outline() } : {};
    });
    function lineStyle(side) {
      const c = cfg.value;
      if (!c) return {};
      const horizontal = side === "left" || side === "right", length = Math.round(c.length * (horizontal ? c.scaleX : c.scaleY)), thickness = Math.round(c.thickness * (horizontal ? c.scaleY : c.scaleX));
      return { position: "absolute", background: c.color, borderRadius: "1px", width: (horizontal ? length : thickness) + "px", height: (horizontal ? thickness : length) + "px", boxShadow: outline(), ...side === "top" ? { bottom: c.gap + "px", left: -thickness / 2 + "px" } : side === "bottom" ? { top: c.gap + "px", left: -thickness / 2 + "px" } : side === "left" ? { right: c.gap + "px", top: -thickness / 2 + "px" } : { left: c.gap + "px", top: -thickness / 2 + "px" } };
    }
    function chevronStyle(side) {
      const c = cfg.value;
      if (!c) return {};
      const thickness = Math.round(c.thickness * c.scaleY);
      return { position: "absolute", width: Math.round(c.length * c.scaleX) + "px", height: thickness + "px", background: c.color, borderRadius: "1px", boxShadow: outline(), transformOrigin: side === "left" ? "right center" : "left center", transform: `rotate(${side === "left" ? -35 : 35}deg)`, top: -thickness / 2 + "px", ...side === "left" ? { right: c.gap + "px" } : { left: c.gap + "px" } };
    }
    const ringStyle = computed(() => {
      const c = cfg.value;
      return c ? { position: "absolute", width: Math.round(c.length * 2 * c.scaleX) + "px", height: Math.round(c.length * 2 * c.scaleY) + "px", borderRadius: "50%", border: `${Math.round(c.thickness * (c.scaleX + c.scaleY) / 2)}px solid ${c.color}`, transform: "translate(-50%,-50%)", boxShadow: outline() } : {};
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("figure", {
        class: normalizeClass(["community-preset-preview", { compact: __props.compact }])
      }, [
        !safe.value ? (openBlock(), createElementBlock("p", _hoisted_1, "方案参数无效，无法预览")) : safe.value.kind === "filter" ? (openBlock(), createElementBlock(Fragment, { key: 1 }, [
          createBaseVNode("div", _hoisted_2, [
            createBaseVNode("img", {
              src: unref(sceneImage),
              alt: "航天基地原始场景",
              loading: "lazy"
            }, null, 8, _hoisted_3),
            createBaseVNode("img", {
              class: "filtered",
              src: unref(sceneImage),
              alt: "方案滤镜预览",
              style: normalizeStyle({ filter: filterCss.value, clipPath: `inset(0 0 0 ${split.value}%)` }),
              loading: "lazy"
            }, null, 12, _hoisted_4),
            _cache[1] || (_cache[1] = createBaseVNode("span", { class: "before-label" }, "原图", -1)),
            _cache[2] || (_cache[2] = createBaseVNode("span", { class: "after-label" }, "方案预览", -1)),
            createBaseVNode("i", {
              style: normalizeStyle({ left: split.value + "%" })
            }, null, 4)
          ]),
          !__props.compact ? withDirectives((openBlock(), createElementBlock("input", {
            key: 0,
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => split.value = $event),
            type: "range",
            min: "5",
            max: "95",
            "aria-label": "调整原图和滤镜对比分界"
          }, null, 512)), [
            [
              vModelText,
              split.value,
              void 0,
              { number: true }
            ]
          ]) : createCommentVNode("", true),
          createBaseVNode("figcaption", null, [
            _cache[3] || (_cache[3] = createTextVNode("真实场景 · 同一 LUT 参数预览", -1)),
            !__props.compact ? (openBlock(), createElementBlock("span", _hoisted_5, "；数字亮丽为图像近似，实际效果受显卡与显示器影响。")) : createCommentVNode("", true)
          ])
        ], 64)) : safe.value.kind === "eq" ? (openBlock(), createElementBlock(Fragment, { key: 2 }, [
          (openBlock(), createElementBlock("svg", _hoisted_6, [
            (openBlock(), createElementBlock(Fragment, null, renderList([-24, -12, 0, 12, 24], (db) => {
              return createBaseVNode("g", { key: db }, [
                createBaseVNode("line", {
                  x1: "34",
                  x2: "546",
                  y1: eqY(db),
                  y2: eqY(db),
                  class: normalizeClass({ zero: db === 0 })
                }, null, 10, _hoisted_7),
                createBaseVNode("text", {
                  x: "2",
                  y: eqY(db) + 4
                }, toDisplayString(db > 0 ? "+" : "") + toDisplayString(db), 9, _hoisted_8)
              ]);
            }), 64)),
            createBaseVNode("polyline", {
              points: eqPoints.value,
              fill: "none",
              class: "eq-line"
            }, null, 8, _hoisted_9),
            (openBlock(true), createElementBlock(Fragment, null, renderList(safe.value.params.gains, (gain, i) => {
              return openBlock(), createElementBlock("g", { key: i }, [
                createBaseVNode("circle", {
                  cx: eqX(safe.value.params.freqs[i]),
                  cy: eqY(gain + safe.value.params.master),
                  r: "3.4"
                }, null, 8, _hoisted_10),
                !__props.compact || i % 2 === 0 ? (openBlock(), createElementBlock("text", {
                  key: 0,
                  x: eqX(safe.value.params.freqs[i]),
                  y: "183",
                  "text-anchor": "middle"
                }, toDisplayString(frequencyLabel(safe.value.params.freqs[i])), 9, _hoisted_11)) : createCommentVNode("", true)
              ]);
            }), 128))
          ])),
          createBaseVNode("figcaption", null, [
            createTextVNode("均衡器设置曲线 · 主增益 " + toDisplayString(safe.value.params.master) + " dB", 1),
            !__props.compact ? (openBlock(), createElementBlock("span", _hoisted_12, "。按本方案真实频率与增益绘制，非 DSP 实测频响。")) : createCommentVNode("", true)
          ])
        ], 64)) : safe.value.kind === "crosshair" ? (openBlock(), createElementBlock(Fragment, { key: 3 }, [
          createBaseVNode("div", {
            class: "crosshair-scene",
            style: normalizeStyle({ backgroundImage: `linear-gradient(#10213366,#10213366),url(${unref(sceneImage)})` })
          }, [
            createBaseVNode("div", {
              class: "crosshair-origin",
              style: normalizeStyle({ transform: `translate(${safe.value.params.offsetX}px,${safe.value.params.offsetY}px)` })
            }, [
              safe.value.params.legacyPreset ? (openBlock(), createBlock(LegacyCrosshairPreview, {
                key: 0,
                settings: safe.value.params.legacyPreset
              }, null, 8, ["settings"])) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                safe.value.params.centerDot ? (openBlock(), createElementBlock("div", {
                  key: 0,
                  class: "crosshair-dot",
                  style: normalizeStyle(dotStyle.value)
                }, null, 4)) : createCommentVNode("", true),
                safe.value.params.shape === "chevron" ? (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                  createBaseVNode("div", {
                    style: normalizeStyle(chevronStyle("left"))
                  }, null, 4),
                  createBaseVNode("div", {
                    style: normalizeStyle(chevronStyle("right"))
                  }, null, 4)
                ], 64)) : safe.value.params.shape === "circle" ? (openBlock(), createElementBlock("div", {
                  key: 2,
                  style: normalizeStyle(ringStyle.value)
                }, null, 4)) : safe.value.params.shape === "cross" ? (openBlock(), createElementBlock(Fragment, { key: 3 }, renderList(["top", "bottom", "left", "right"], (side) => {
                  return createBaseVNode("div", {
                    key: side,
                    style: normalizeStyle(lineStyle(side))
                  }, null, 4);
                }), 64)) : createCommentVNode("", true)
              ], 64))
            ], 4)
          ], 4),
          _cache[4] || (_cache[4] = createBaseVNode("figcaption", null, "实际参数绘制 · 预览不会开启屏幕准星", -1))
        ], 64)) : (openBlock(), createElementBlock(Fragment, { key: 4 }, [
          createBaseVNode("div", {
            class: normalizeClass(["system-preview", { "actual-settings": safe.value.params.catalog === "system-settings-v1" }])
          }, [
            createBaseVNode("strong", null, toDisplayString(systemItems.value.length) + " 项系统设置", 1),
            createBaseVNode("span", null, toDisplayString(safe.value.params.catalog === "fps570-v1" ? tierNames[safe.value.params.tier] : "用户选择的配置"), 1),
            createBaseVNode("ul", null, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(__props.compact ? systemItems.value.slice(0, 3) : systemItems.value, (item) => {
                return openBlock(), createElementBlock("li", {
                  key: item.id
                }, [
                  createBaseVNode("div", _hoisted_13, [
                    createTextVNode(toDisplayString(item.label), 1),
                    item.valueLabel ? (openBlock(), createElementBlock("b", _hoisted_14, toDisplayString(item.valueLabel), 1)) : createCommentVNode("", true)
                  ]),
                  !__props.compact ? (openBlock(), createElementBlock("small", _hoisted_15, toDisplayString(item.impact), 1)) : createCommentVNode("", true)
                ]);
              }), 128))
            ]),
            __props.compact && systemItems.value.length > 3 ? (openBlock(), createElementBlock("p", _hoisted_16, "另有 " + toDisplayString(systemItems.value.length - 3) + " 项，打开详情查看完整设置", 1)) : createCommentVNode("", true)
          ], 2),
          _cache[5] || (_cache[5] = createBaseVNode("figcaption", null, "展示实际设置项目，预览不会修改系统", -1))
        ], 64))
      ], 2);
    };
  }
});
const CommunityPresetPreview = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-a2339661"]]);
export {
  CommunityPresetPreview as C,
  SYSTEM_SETTINGS as S,
  validatePreset as v
};
