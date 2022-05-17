export default [{
        path: "/environment/oneOfpicture/index", //
        meta: {
            hide: 0,
            title: "环保一张图",
            noslider: true
        }
    },
    {
        path: "/environment/atmosphere/index", //atmosphere/index
        id: 480,
        meta: {
            hide: 0,
            title: "大气监测"
        },
        redirect: "/environment/atmosphere/index",
        children: [{
                path: "/environment/atmosphere/index",
                meta: {
                    hide: 0,
                    icon: "el-icon-house",
                    title: "大气监测概况"
                }
            },
            {
                path: "/atmosphere/intelligent/intelligent" /* /atmosphere/intelligent/intelligent */ ,
                id: 23232,
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
                                path: "/environment/atmosphere/intelligent/mapOverview",
                                meta: {
                                    hide: 0,
                                    title: "地图概览"
                                }
                            },
                            {
                                path: "/environment/atmosphere/intelligent/curve",
                                meta: {
                                    hide: 0,
                                    title: "曲线对比"
                                }
                            },
                            {
                                path: "/environment/atmosphere/intelligent/dataComparison",
                                meta: {
                                    hide: 0,
                                    title: "数据对比"
                                }
                            }
                        ]
                    },
                    {
                        path: "/environment/atmosphere/intelligent/callThePolice",
                        meta: {
                            hide: 0,
                            title: "报警数据"
                        }
                    },
                    {
                        path: "/environment/h" /* /atmosphere/intelligent/historydata */ ,
                        meta: {
                            hide: 0,
                            title: "点位详情",
                            uuid: 123123123
                        },
                        children: [{
                            path: "/environment/atmosphere/intelligent/historydata",
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
                        path: "/environment/atmosphere/boilerMonitoring/realTimeCurve",
                        meta: {
                            hide: 0,
                            title: "实时曲线"
                        }
                    },
                    {
                        path: "/environment/atmosphere/boilerMonitoring/boilerHistory",
                        meta: {
                            hide: 0,
                            title: "历史数据"
                        }
                    },
                    {
                        path: "/environment/atmosphere/boilerMonitoring/callThePolice",
                        meta: {
                            hide: 0,
                            title: "报警数据"
                        }
                    },
                    {
                        path: "/environment/atmosphere/boilerMonitoring/earlyWarning",
                        meta: {
                            hide: 0,
                            title: "预警数据"
                        }
                    },
                    {
                        path: "/environment/atmosphere/boilerMonitoring/threshold",
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
        path: "/environment/waterPollution/index",
        meta: {
            hide: 0,
            title: "水污染监测"
        },
        redirect: "/environment/waterPollution/index",
        children: [{
                path: "/environment/waterPollution/index",
                meta: {
                    hide: 0,
                    icon: "el-icon-set-up",
                    title: "水污染监测概况"
                }
            },
            {
                path: "/environment/waterPollution",
                meta: {
                    hide: 0,
                    icon: "el-icon-set-up",
                    title: "水质在线监测"
                },
                children: [{
                        path: "/environment/waterPollution/onLineMonitor",
                        meta: {
                            hide: 0,
                            title: "实时数据"
                        }
                    },
                    {
                        path: "/environment/waterPollution/historyData",
                        meta: {
                            hide: 0,
                            title: "历史数据"
                        }
                    },
                    {
                        path: "/environment/waterPollution/earlyWarning",
                        meta: {
                            hide: 0,
                            title: "预警数据"
                        }
                    },
                    {
                        path: "/environment/waterPollution/callThePolice",
                        meta: {
                            hide: 0,
                            title: "报警数据"
                        }
                    },
                    {
                        path: "/environment/waterPollution/threshold",
                        meta: {
                            hide: 0,
                            title: "阈值设置"
                        }
                    }
                ]
            },
            {
                path: "/environment/waterPollution/secondPanel",
                meta: {
                    hide: 0,
                    icon: "el-icon-set-up",
                    title: "二盘区"
                }
            }
        ]
    },
    {
        path: "/environment/solidWaste/index",
        meta: {
            hide: 0,
            title: "固体废物监测"
        },
        redirect: "/environment/solidWaste/index",
        children: [{
                path: "/environment/solidWaste/index",
                meta: {
                    hide: 0,
                    icon: "el-icon-set-up",
                    title: "固体废物监测概况"
                }
            },
            {
                path: "/environment/solidWaste/monitor",
                meta: {
                    hide: 0,
                    icon: "el-icon-set-up",
                    title: "固体废物视频监控"
                }
            },
            {
                path: "/environment/solidWaste/camera",
                meta: {
                    hide: 0,
                    icon: "el-icon-set-up",
                    title: "固体废物摄像头管理"
                }
            },
            {
                path: "/environment/solidWaste/gangue",
                meta: {
                    hide: 0,
                    icon: "el-icon-set-up",
                    title: "矸石明细查询"
                }
            },
            {
                path: "/environment/solidWaste/danger",
                meta: {
                    hide: 0,
                    icon: "el-icon-set-up",
                    title: "危险废物排放管理"
                }
            },
            {
                path: "/environment/solidWaste/electronicScale",
                meta: {
                    hide: 0,
                    icon: "el-icon-set-up",
                    title: "电子秤称重记录"
                }
            }
        ]
    },
    {
        path: "/environment/noise/index",
        meta: {
            hide: 0,
            title: "噪声监测"
        },
        redirect: "/environment/noise/index",
        children: [{
                path: "/environment/noise/index",
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
                        path: "/environment/noise/map",
                        meta: {
                            hide: 0,
                            title: "地图概览"
                        }
                    },
                    {
                        path: "/environment/noise/curve",
                        meta: {
                            hide: 0,
                            title: "曲线对比"
                        }
                    },
                    {
                        path: "/environment/noise/dataComparison",
                        meta: {
                            hide: 0,
                            title: "数据对比"
                        }
                    }
                ]
            },
            {
                path: "/environment/noise/callThePolice",
                meta: {
                    hide: 0,
                    icon: "el-icon-set-up",
                    title: "报警数据"
                }
            }
        ]
    },
    {
        path: "/environment/basics/index",
        meta: {
            hide: 0,
            title: "环保基础管理"
        },
        redirect: "/environment/basics/index",
        children: [{
                path: "/environment/basics/index",
                meta: {
                    hide: 0,
                    icon: "el-icon-set-up",

                    title: "环保大数据"
                }
            },
            {
                path: "/environment/basics/pollutants",
                meta: {
                    hide: 0,
                    icon: "el-icon-set-up",
                    title: "报表管理"
                },
                children: [{
                        path: "/environment/basics/pollutants",
                        meta: {
                            hide: 0,
                            icon: "el-icon-set-up",
                            title: "大气主要污染物"
                        }
                    },
                    {
                        path: "/environment/basics/guolurun",
                        meta: {
                            hide: 0,
                            icon: "el-icon-set-up",
                            title: "锅炉运行及主要污染物"
                        }
                    },
                    {
                        path: "/environment/basics/production",
                        meta: {
                            hide: 0,
                            icon: "el-icon-set-up",
                            title: "生产用水污染主要污染物排放"
                        }
                    },
                    {
                        path: "/environment/basics/enterprise",
                        meta: {
                            hide: 0,
                            icon: "el-icon-set-up",
                            title: "企业用水情况"
                        }
                    },
                    {
                        path: "/environment/basics/wushui",
                        meta: {
                            hide: 0,
                            icon: "el-icon-set-up",
                            title: "污水处理设施运行"
                        }
                    },
                    {
                        path: "/environment/basics/yibanguti",
                        meta: {
                            hide: 0,
                            icon: "el-icon-set-up",
                            title: "一般固体废物排放"
                        }
                    },
                    {
                        path: "/environment/basics/danger",
                        meta: {
                            hide: 0,
                            icon: "el-icon-set-up",
                            title: "危险废物排放"
                        }
                    },
                    {
                        path: "/environment/basics/other",
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
                        path: "/environment/basics/friendly/getDown",
                        meta: {
                            hide: 0,
                            icon: "el-icon-set-up",
                            title: "环保风险管理下发"
                        }
                    },
                    {
                        path: "/environment/basics/friendly/feedback",
                        meta: {
                            hide: 0,
                            icon: "el-icon-set-up",
                            title: "环保风险管理反馈"
                        }
                    },
                    {
                        path: "/environment/basics/friendly/ziliao",
                        meta: {
                            hide: 0,
                            icon: "el-icon-folder-opened",
                            title: "环保资料管理"
                        }
                    },
                    {
                        path: "/environment/basics/friendly/training",
                        meta: {
                            hide: 0,
                            icon: "el-icon-edit",
                            title: "环保培训管理"
                        }
                    },
                    {
                        path: "/environment/basics/friendly/drill",
                        meta: {
                            hide: 0,
                            icon: "el-icon-paperclip",
                            title: "环保演练管理"
                        }
                    }
                ]
            }
        ]
    },
    {
        path: "/environment/water/index",
        meta: {
            hide: 0,
            title: "水资源管理"
        },
        redirect: "/environment/water/index",
        children: [{
            path: "/environment/water/index",
            meta: {
                hide: 0,
                icon: "el-icon-set-up",
                title: "智慧水务"
            }
        }]
    },
    {
        path: "/environment/mine/index",
        meta: {
            hide: 0,
            title: "绿色矿山"
        },
        redirect: "/environment/mine/index",
        children: [{
                path: "/environment/mine/index",
                meta: {
                    hide: 0,
                    icon: "el-icon-set-up",
                    title: "概况"
                }
            },
            {
                path: "/environment/mine/evaluation",
                meta: {
                    hide: 0,
                    icon: "el-icon-set-up",
                    title: "建设评价填写"
                }
            }
        ]
    }
];