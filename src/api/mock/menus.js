export default [
  {
    path: "/environment/oneOfpicture/index",
    meta: {
      hide: 0,
      title: "环保一张图",
      noslider: true,
    },
  },
  {
    path: "/environment/atmosphere/index",
    id: 480,
    meta: {
      hide: 0,
      title: "大气监测",
    },
    redirect: "",
    children: [
      {
        path: "/environment/atmosphere/index",
        meta: {
          hide: 0,
          icon: "el-icon-house",
          title: "大气监测概况",
        },
      },
      {
        path: "/atmosphere/intelligent/intelligent",
        id: 23232,
        meta: {
          hide: 0,
          icon: "el-icon-orange",
          title: "智能降尘监测详情",
        },
        children: [
          {
            path: "",
            meta: {
              hide: 0,
              title: "实时监测",
            },
            children: [
              {
                path: "/environment/atmosphere/intelligent/mapOverview",
                meta: {
                  hide: 0,
                  title: "地图概览",
                },
              },
              {
                path: "/environment/atmosphere/intelligent/curve",
                meta: {
                  hide: 0,
                  title: "曲线对比",
                },
              },
              {
                path: "/environment/atmosphere/intelligent/dataComparison",
                meta: {
                  hide: 0,
                  title: "数据对比",
                },
              },
            ],
          },
          {
            path: "/environment/atmosphere/intelligent/callThePolice",
            meta: {
              hide: 0,
              title: "报警数据",
            },
          },
          {
            path: "/environment/h",
            meta: {
              hide: 0,
              title: "点位详情",
              uuid: 123123123,
            },
            children: [
              {
                path: "/environment/atmosphere/intelligent/historydata",
                meta: {
                  hide: 0,
                  title: "历史数据",
                },
              },
            ],
          },
        ],
      },
      {
        path: "",
        meta: {
          hide: 0,
          icon: "el-icon-sunset",
          title: "锅炉监测详情",
          uuid: 10.02115,
        },
        children: [
          {
            path: "/environment/atmosphere/boilerMonitoring/realTimeCurve",
            meta: {
              hide: 0,
              title: "实时曲线",
            },
          },
          {
            path: "/environment/atmosphere/boilerMonitoring/boilerHistory",
            meta: {
              hide: 0,
              title: "历史数据",
            },
          },
          {
            path: "/environment/atmosphere/boilerMonitoring/callThePolice",
            meta: {
              hide: 0,
              title: "报警数据",
            },
          },
          {
            path: "/environment/atmosphere/boilerMonitoring/earlyWarning",
            meta: {
              hide: 0,
              title: "预警数据",
            },
          },
          {
            path: "/environment/atmosphere/boilerMonitoring/threshold",
            meta: {
              hide: 0,
              title: "阈值设置",
            },
          },
        ],
      },
    ],
  },
  {
    path: "/environment/waterPollution/index",
    meta: {
      hide: 0,
      title: "水污染监测",
    },
    redirect: "",
    children: [
      {
        path: "/environment/waterPollution/index",
        meta: {
          hide: 0,
          icon: "el-icon-set-up",
          title: "水污染监测概况",
        },
      },
      {
        path: "/environment/waterPollution",
        meta: {
          hide: 0,
          icon: "el-icon-set-up",
          title: "水质在线监测",
        },
        children: [
          {
            path: "/environment/waterPollution/onLineMonitor",
            meta: {
              hide: 0,
              title: "实时数据",
            },
          },
          {
            path: "/environment/waterPollution/historyData",
            meta: {
              hide: 0,
              title: "历史数据",
            },
          },
          {
            path: "/environment/waterPollution/earlyWarning",
            meta: {
              hide: 0,
              title: "预警数据",
            },
          },
          {
            path: "/environment/waterPollution/callThePolice",
            meta: {
              hide: 0,
              title: "报警数据",
            },
          },
          {
            path: "/environment/waterPollution/report",
            meta: {
              hide: 0,
              title: "统计报表",
            },
          },
          {
            path: "/environment/waterPollution/threshold",
            meta: {
              hide: 0,
              title: "阈值设置",
            },
          },
        ],
      },
      {
        path: "/environment/waterPollution/secondPanel",
        meta: {
          hide: 0,
          icon: "el-icon-set-up",
          title: "二盘区",
        },
      },
    ],
  },
  {
    path: "/environment/solidWaste/index",
    meta: {
      hide: 0,
      title: "固体废物监测",
    },
    redirect: "/environment/solidWaste/index",
    children: [
      {
        path: "/environment/solidWaste/index",
        meta: {
          hide: 0,
          icon: "el-icon-set-up",
          title: "固体废物监测概况",
        },
      },
      {
        path: "/environment/solidWaste/monitor",
        meta: {
          hide: 0,
          icon: "el-icon-set-up",
          title: "固体废物视频监控",
        },
      },
      {
        path: "/environment/solidWaste/camera",
        meta: {
          hide: 0,
          icon: "el-icon-set-up",
          title: "固体废物摄像头管理",
        },
      },
      {
        path: "/environment/solidWaste/gangue",
        meta: {
          hide: 0,
          icon: "el-icon-set-up",
          title: "矸石明细查询",
        },
      },
      {
        path: "/environment/solidWaste/danger",
        meta: {
          hide: 0,
          icon: "el-icon-set-up",
          title: "危险废物排放管理",
        },
      },
      {
        path: "/environment/solidWaste/electronicScale",
        meta: {
          hide: 0,
          icon: "el-icon-set-up",
          title: "电子秤称重记录",
        },
      },
    ],
  },
  {
    path: "/environment/noise/index",
    meta: {
      hide: 0,
      title: "噪声监测",
    },
    redirect: "/environment/noise/index",
    children: [
      {
        path: "/environment/noise/index",
        meta: {
          hide: 0,
          icon: "el-icon-set-up",
          title: "噪声监测概况",
        },
      },
      {
        path: "",
        meta: {
          hide: 0,
          icon: "el-icon-set-up",
          title: "实时监测",
        },
        children: [
          {
            path: "/environment/noise/map",
            meta: {
              hide: 0,
              title: "地图概览",
            },
          },
          {
            path: "/environment/noise/curve",
            meta: {
              hide: 0,
              title: "曲线对比",
            },
          },
          {
            path: "/environment/noise/dataComparison",
            meta: {
              hide: 0,
              title: "数据对比",
            },
          },
        ],
      },
      {
        path: "/environment/noise/callThePolice",
        meta: {
          hide: 0,
          icon: "el-icon-set-up",
          title: "报警数据",
        },
      },
    ],
  },
  {
    path: "/environment/basics/index",
    meta: {
      hide: 0,
      title: "环保基础管理",
    },
    redirect: "/environment/basics/index",
    children: [
      {
        path: "/environment/basics/index",
        meta: {
          hide: 0,
          icon: "el-icon-set-up",
          title: "环保大数据",
        },
      },
      {
        path: "/environment/basics/pollutants",
        meta: {
          hide: 0,
          icon: "el-icon-set-up",
          title: "报表管理",
        },
        children: [
          {
            path: "/environment/basics/pollutants",
            meta: {
              hide: 0,
              title: "大气主要污染物",
            },
          },
          {
            path: "/environment/basics/guolurun",
            meta: {
              hide: 0,
              title: "锅炉运行及主要污染物",
            },
          },
          {
            path: "/environment/basics/production",
            meta: {
              hide: 0,
              title: "生产用水污染主要污染物排放",
            },
          },
          {
            path: "/environment/basics/enterprise",
            meta: {
              hide: 0,
              title: "企业用水情况",
            },
          },
          {
            path: "/environment/basics/wushui",
            meta: {
              hide: 0,
              title: "污水处理设施运行",
            },
          },
          {
            path: "/environment/basics/yibanguti",
            meta: {
              hide: 0,
              title: "一般固体废物排放",
            },
          },
          {
            path: "/environment/basics/danger",
            meta: {
              hide: 0,
              title: "危险废物排放",
            },
          },
          {
            path: "/environment/basics/other",
            meta: {
              hide: 0,
              title: "其他报表",
            },
          },
        ],
      },
      {
        path: "",
        meta: {
          hide: 0,
          icon: "el-icon-edit",
          title: "环保风险管理",
        },
        children: [
          {
            path: "/environment/basics/friendly/getDown",
            meta: {
              hide: 0,
              title: "环保风险管理下发",
            },
          },
          {
            path: "/environment/basics/friendly/feedback",
            meta: {
              hide: 0,
              title: "环保风险管理反馈",
            },
          },
          {
            path: "/environment/basics/friendly/training",
            meta: {
              hide: 0,
              title: "环保培训管理",
            },
          },
          {
            path: "/environment/basics/friendly/ziliao",
            meta: {
              hide: 0,
              title: "环保资料管理",
            },
          },
          {
            path: "/environment/basics/friendly/drill",
            meta: {
              hide: 0,
              title: "环保演练管理",
            },
          },
          {
            path: "/environment/basics/friendly/work1",
            meta: {
              hide: 0,
              title: "重点工作管理",
            },
            children: [
              {
                path: "/environment/basics/friendly/work1",
                meta: {
                  hide: 0,
                  title: "重点工作管理下发",
                },
              },
              {
                path: "/environment/basics/friendly/feddback",
                meta: {
                  hide: 0,
                  title: "重点工作管理反馈",
                },
              },
            ],
          },
          {
            path: "/environment/basics/friendly/research",
            meta: {
              hide: 0,
              title: "科研项目管理",
            },
          },
          {
            path: "/environment/basics/envri/project",
            meta: {
              hide: 0,
              title: "环保工程管理",
            },
            children: [
              {
                path: "/environment/basics/envri/project",
                meta: {
                  hide: 0,
                  title: "环保工程管理下发",
                },
              },
              {
                path: "/environment/basics/envri/fankui",
                meta: {
                  hide: 0,
                  title: "环保工程管理反馈",
                },
              },
            ],
          },
          {
            path: "/environment/basics/envri/ecologicalGuan",
            meta: {
              hide: 0,
              title: "生态工程管理",
            },
            children: [
              {
                path: "/environment/basics/envri/ecologicalGuan",
                meta: {
                  hide: 0,
                  title: "环保工程管理下发",
                },
              },
              {
                path: "/environment/basics/envri/ecologicalFan",
                meta: {
                  hide: 0,
                  title: "环保工程管理反馈",
                },
              },
            ],
          },
          {
            path: "/environment/basics/envri/kaoheCenter",
            meta: {
              hide: 0,
              icon: "el-icon-set-up",
              title: "考核内容填写",
            },
          },
          {
            path: "/environment/basics/envri/kaohe",
            meta: {
              hide: 0,
              icon: "el-icon-set-up",
              title: "考核填写",
            },
          },
        ],
      },
    ],
  },
  {
    path: "/environment/water/index",
    meta: {
      hide: 0,
      title: "水资源管理",
    },
    redirect: "/environment/water/index",
    children: [
      {
        path: "/environment/water/balanceAnalysis",
        meta: {
          hide: 0,
          icon: "el-icon-set-up",
          title: "水平衡分析",
        },
        children: [
          {
            path: "/environment/water/balanceAnalysis",
            meta: {
              hide: 0,
              title: "水平衡分析图",
            },
          },
          {
            path: "/environment/water/waterPurificationWorkshop",
            meta: {
              hide: 0,
              title: "净水车间,生活污水处理",
            },
          },
          {
            path: "/environment/water/industry",
            meta: {
              hide: 0,
              title: "工业矿井水处理站",
            },
          },
          {
            path: "/environment/water/xinFenMineWater",
            meta: {
              hide: 0,
              title: "新风井矿井水处理站",
            },
          },
        ],
      },
      {
        path: "/environment/water/efficient/params",
        meta: {
          hide: 0,
          icon: "el-icon-set-up",
          title: "高效旋流",
        },
        children: [
          {
            path: "/environment/water/efficient/effic",
            meta: {
              hide: 0,
              title: "旋流流程",
            },
          },
          {
            path: "/environment/water/efficient/process",
            meta: {
              hide: 0,
              title: "煤流流程",
            },
          },
          {
            path: "/environment/water/efficient/warn",
            meta: {
              hide: 0,
              title: "报警数据",
            },
          },
          {
            path: "/environment/water/efficient/curve",
            meta: {
              hide: 0,
              title: "曲线图形",
            },
          },
          {
            path: "/environment/water/efficient/params",
            meta: {
              hide: 0,
              title: "参数设置",
            },
          },
        ],
      },
      {
        path: "/environment/water/purifier",
        meta: {
          hide: 0,
          icon: "el-icon-set-up",
          title: "井下污水处理站",
        },
        children: [
          {
            path: "/environment/water/gongyi",
            meta: {
              hide: 0,
              title: "工艺画面",
            },
          },
          {
            path: "/environment/water/tiaojie",
            meta: {
              hide: 0,
              title: "调节池",
            },
          },
          {
            path: "/environment/water/purifier",
            meta: {
              hide: 0,
              title: "净水器画面",
            },
          },
          {
            path: "/environment/water/guolv",
            meta: {
              hide: 0,
              title: "过滤器画面",
            },
          },
          {
            path: "/environment/water/wuni",
            meta: {
              hide: 0,
              title: "污泥处理",
            },
          },
          {
            path: "/environment/water/meter",
            meta: {
              hide: 0,
              title: "仪表数据",
            },
          },
          {
            path: "/environment/water/canshu",
            meta: {
              hide: 0,
              title: "参数设定",
            },
          },
          {
            path: "/environment/water/baojing",
            meta: {
              hide: 0,
              title: "报警显示",
            },
          },
          {
            path: "/environment/water/turbidity1",
            meta: {
              hide: 0,
              title: "浊度曲线1",
            },
          },
          {
            path: "/environment/water/turbidity2",
            meta: {
              hide: 0,
              title: "浊度曲线2",
            },
          },
          {
            path: "/environment/water/chlorine",
            meta: {
              hide: 0,
              title: "余氯曲线",
            },
          },
          {
            path: "/environment/water/baobiao",
            meta: {
              hide: 0,
              title: "报表画面",
            },
          },
        ],
      },
      {
        path: "/environment/water/index",
        meta: {
          hide: 0,
          icon: "el-icon-set-up",
          title: "智慧水务",
        },
      },
    ],
  },
  {
    path: "/environment/mine/index",
    meta: {
      hide: 0,
      title: "绿色矿山",
    },
    redirect: "/environment/mine/index",
    children: [
      {
        path: "/environment/mine/index",
        meta: {
          hide: 0,
          icon: "el-icon-set-up",
          title: "概况",
        },
      },
      {
        path: "/environment/mine/greenShow",
        meta: {
          hide: 0,
          icon: "el-icon-set-up",
          title: "绿色矿山展示",
        },
      },
      {
        path: "/environment/mine/greenDocs",
        meta: {
          hide: 0,
          icon: "el-icon-set-up",
          title: "绿色矿山文档",
        },
      },
      {
        path: "/environment/mine/twoTan",
        meta: {
          hide: 0,
          icon: "el-icon-set-up",
          title: "双碳",
        },
        children: [
          {
            path: "/environment/mine/carbon/zhonghe",
            meta: {
              hide: 0,
              icon: "el-icon-set-up",
              title: "碳达峰,碳中和",
            },
          },
          {
            path: "/environment/mine/carbon/docs",
            meta: {
              hide: 0,
              icon: "el-icon-set-up",
              title: "'双碳'政策文件",
            },
          },
          {
            path: "/environment/mine/carbon/execl",
            meta: {
              hide: 0,
              icon: "el-icon-set-up",
              title: "气体排放汇总表",
            },
          },
        ],
      },
      {
        path: "/environment/mine/evaluationManage",
        meta: {
          hide: 0,
          icon: "el-icon-set-up",
          title: "评价内容管理",
        },
      },
      {
        path: "/environment/mine/evaluation",
        meta: {
          hide: 0,
          icon: "el-icon-set-up",
          title: "建设评价填写",
        },
      },
    ],
  },
  {
    path: "/system/places/index",
    meta: {
      hide: 0,
      title: "系统管理",
    },
    redirect: "system/places/index",
    children: [
      // {
      //   path: '/system/menu/index',
      //   meta: {
      //     hide: 0,
      //     icon: 'el-icon-set-up',
      //     title: '菜单管理'
      //   }
      // },
      {
        path: "/system/places/index",
        meta: {
          hide: 0,
          icon: "el-icon-set-up",
          title: "监测点管理",
        },
      },
      {
        path: "/system/item/index",
        meta: {
          hide: 0,
          icon: "el-icon-set-up",
          title: "检测项管理",
        },
      },
      {
        path: "/system/devices/index",
        meta: {
          hide: 0,
          icon: "el-icon-set-up",
          title: "监测设备",
        },
      },
    ],
  },
];
