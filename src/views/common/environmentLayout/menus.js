export default [{
        path: "/oneOfpicture/index", //
        meta: {
            hide: 0,
            title: "环保一张图",
            noslider: true
        }
    },
    {
        path: "", //atmosphere/index
        meta: {
            hide: 0,
            title: "大气监测"
        },
        component: "",
        redirect: "/atmosphere/index",
        children: [{
                path: "/atmosphere/index",
                meta: {
                    hide: 0,
                    icon: "el-icon-house",
                    title: "大气监测概况"
                }
            },
            {
                path: "" /* /atmosphere/intelligent/intelligent */ ,
                meta: {
                    hide: 0,
                    icon: "el-icon-orange",
                    title: "智能降尘监测详情"
                },
                children: [{
                        path: "" /* /atmosphere/intelligent/intelligent */ ,
                        meta: {
                            hide: 0,
                            title: "实时监测"
                        },
                        children: [{
                                path: "/atmosphere/intelligent/mapOverview",
                                meta: {
                                    hide: 0,
                                    title: "地图概览"
                                }
                            },
                            {
                                path: "/atmosphere/intelligent/curve",
                                meta: {
                                    hide: 0,
                                    title: "曲线对比"
                                }
                            },
                            {
                                path: "/atmosphere/intelligent/dataComparison",
                                meta: {
                                    hide: 0,
                                    title: "数据对比"
                                }
                            }
                        ]
                    },
                    {
                        path: "/atmosphere/intelligent/callThePolice",
                        meta: {
                            hide: 0,
                            title: "报警数据"
                        }
                    },
                    {
                        path: "/h" /* /atmosphere/intelligent/historydata */ ,
                        meta: {
                            hide: 0,
                            title: "点位详情",
                            uuid: 123123123
                        },
                        children: [{
                            path: "/atmosphere/intelligent/historydata",
                            meta: {
                                hide: 0,
                                title: "历史数据"
                            }
                        }]
                    }
                ]
            },
            {
                path: "",
                meta: {
                    hide: 0,
                    icon: "el-icon-sunset",
                    title: "锅炉监测详情",
                    uuid: 10.02115
                },
                children: [{
                        path: "/atmosphere/boilerMonitoring/realTimeCurve",
                        meta: {
                            hide: 0,
                            title: "实时曲线"
                        }
                    },
                    {
                        path: "/atmosphere/boilerMonitoring/boilerHistory",
                        meta: {
                            hide: 0,
                            title: "历史数据"
                        }
                    },
                    {
                        path: "/atmosphere/boilerMonitoring/callThePolice",
                        meta: {
                            hide: 0,
                            title: "报警数据"
                        }
                    },
                    {
                        path: "/atmosphere/boilerMonitoring/earlyWarning",
                        meta: {
                            hide: 0,
                            title: "预警数据"
                        }
                    },
                    {
                        path: "/atmosphere/boilerMonitoring/threshold",
                        meta: {
                            hide: 0,
                            title: "阈值设置"
                        }
                    }
                ]
            }
        ]
    },
    {
        path: "",
        meta: {
            hide: 0,
            title: "水污染监测"
        },
        redirect: "/waterPollution/index",
        children: [{
                path: "/waterPollution/index",
                meta: {
                    hide: 0,
                    icon: "el-icon-set-up",
                    title: "水污染监测概况"
                }
            },
            {
                path: "/waterPollution",
                meta: {
                    hide: 0,
                    icon: "el-icon-set-up",
                    title: "水质在线监测"
                },
                children: [{
                        path: "/waterPollution/onLineMonitor",
                        meta: {
                            hide: 0,
                            title: "实时数据"
                        }
                    },
                    {
                        path: "/waterPollution/historyData",
                        meta: {
                            hide: 0,
                            title: "历史数据"
                        }
                    },
                    {
                        path: "/waterPollution/earlyWarning",
                        meta: {
                            hide: 0,
                            title: "预警数据"
                        }
                    },
                    {
                        path: "/waterPollution/callThePolice",
                        meta: {
                            hide: 0,
                            title: "报警数据"
                        }
                    },
                    {
                        path: "/waterPollution/threshold",
                        meta: {
                            hide: 0,
                            title: "阈值设置"
                        }
                    }
                ]
            },
            {
                path: "/waterPollution/secondPanel",
                meta: {
                    hide: 0,
                    icon: "el-icon-set-up",
                    title: "二盘区"
                }
            }
        ]
    },
    {
        path: "",
        meta: {
            hide: 0,
            title: "固体废物监测"
        },
        redirect: "/solidWaste/index",
        children: [{
                path: "/solidWaste/index",
                meta: {
                    hide: 0,
                    icon: "el-icon-set-up",
                    title: "固体废物监测概况"
                }
            },
            {
                path: "/solidWaste/monitor",
                meta: {
                    hide: 0,
                    icon: "el-icon-set-up",
                    title: "固体废物视频监控"
                }
            },
            {
                path: "/solidWaste/camera",
                meta: {
                    hide: 0,
                    icon: "el-icon-set-up",
                    title: "固体废物摄像头管理"
                }
            },
            {
                path: "/solidWaste/gangue",
                meta: {
                    hide: 0,
                    icon: "el-icon-set-up",
                    title: "矸石明细查询"
                }
            },
            {
                path: "/solidWaste/danger",
                meta: {
                    hide: 0,
                    icon: "el-icon-set-up",
                    title: "危险废物排放管理"
                }
            },
            {
                path: "/solidWaste/electronicScale",
                meta: {
                    hide: 0,
                    icon: "el-icon-set-up",
                    title: "电子秤称重记录"
                }
            }
        ]
    },
    {
        path: "",
        meta: {
            hide: 0,
            title: "噪声监测"
        },
        redirect: "/noise/index",
        children: [{
                path: "/noise/index",
                meta: {
                    hide: 0,
                    icon: "el-icon-set-up",
                    title: "噪声监测概况"
                }
            },
            {
                path: "",
                meta: {
                    hide: 0,
                    icon: "el-icon-set-up",
                    title: "实时监测"
                },
                children: [{
                        path: "/noise/map",
                        meta: {
                            hide: 0,
                            title: "地图概览"
                        }
                    },
                    {
                        path: "/noise/curve",
                        meta: {
                            hide: 0,
                            title: "曲线对比"
                        }
                    },
                    {
                        path: "/noise/dataComparison",
                        meta: {
                            hide: 0,
                            title: "数据对比"
                        }
                    }
                ]
            },
            {
                path: "/noise/callThePolice",
                meta: {
                    hide: 0,
                    icon: "el-icon-set-up",
                    title: "报警数据"
                }
            }
        ]
    },
    {
        path: "",
        meta: {
            hide: 0,
            title: "环保基础管理"
        },
        redirect: "/basics/index",
        children: [{
                path: "/basics/index",
                meta: {
                    hide: 0,
                    icon: "el-icon-set-up",

                    title: "环保大数据"
                }
            },
            {
                path: "",
                meta: {
                    hide: 0,
                    icon: "el-icon-set-up",
                    title: "报表管理"
                },
                children: [{
                        path: "/basics/pollutants",
                        meta: {
                            hide: 0,
                            icon: "el-icon-set-up",
                            title: "大气主要污染物"
                        }
                    },
                    {
                        path: "/basics/guolurun",
                        meta: {
                            hide: 0,
                            icon: "el-icon-set-up",
                            title: "锅炉运行及主要污染物"
                        }
                    },
                    {
                        path: "/basics/production",
                        meta: {
                            hide: 0,
                            icon: "el-icon-set-up",
                            title: "生产用水污染主要污染物排放"
                        }
                    },
                    {
                        path: "/basics/enterprise",
                        meta: {
                            hide: 0,
                            icon: "el-icon-set-up",
                            title: "企业用水情况"
                        }
                    },
                    {
                        path: "/basics/wushui",
                        meta: {
                            hide: 0,
                            icon: "el-icon-set-up",
                            title: "污水处理设施运行"
                        }
                    },
                    {
                        path: "/basics/yibanguti",
                        meta: {
                            hide: 0,
                            icon: "el-icon-set-up",
                            title: "一般固体废物排放"
                        }
                    },
                    {
                        path: "/basics/danger",
                        meta: {
                            hide: 0,
                            icon: "el-icon-set-up",
                            title: "危险废物排放"
                        }
                    },
                    {
                        path: "/basics/other",
                        meta: {
                            hide: 0,
                            icon: "el-icon-set-up",
                            title: "其他报表"
                        }
                    }
                ]
            },
            {
                path: "",
                meta: {
                    hide: 0,
                    icon: "el-icon-set-up",
                    title: "环保风险管理"
                },
                children: [{
                        path: "/basics/friendly/getDown",
                        meta: {
                            hide: 0,
                            icon: "el-icon-set-up",
                            title: "环保风险管理下发"
                        }
                    },
                    {
                        path: "/basics/friendly/feedback",
                        meta: {
                            hide: 0,
                            icon: "el-icon-set-up",
                            title: "环保风险管理反馈"
                        }
                    },
                    {
                        path: "/basics/friendly/ziliao",
                        meta: {
                            hide: 0,
                            icon: "el-icon-set-up",
                            title: "环保资料管理"
                        }
                    }
                ]
            }
        ]
    },
    {
        path: "",
        meta: {
            hide: 0,
            title: "水资源管理"
        },
        redirect: "/water/index",
        children: [{
            path: "/water/index",
            meta: {
                hide: 0,
                icon: "el-icon-set-up",
                title: "智慧水务"
            }
        }]
    },
    {
        path: "",
        meta: {
            hide: 0,
            title: "绿色矿山"
        },
        redirect: "/mine/index",
        children: [{
                path: "/mine/index",
                meta: {
                    hide: 0,
                    icon: "el-icon-set-up",
                    title: "概况"
                }
            },
            {
                path: "/mine/evaluation",
                meta: {
                    hide: 0,
                    icon: "el-icon-set-up",
                    title: "建设评价填写"
                }
            }
        ]
    }
];