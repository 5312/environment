<template>
  <div>
    <el-card
      class="box-card"
      v-for="(item, index) in element"
      :key="index"
      :header="item.hgrain_name"
    >
      <!-- getOption(item) -->
      <ele-chart
        :ref="'echarrts' + item.hgrain_id"
        :option="getOption(item)"
        style="height: 400px"
      />
    </el-card>
  </div>
</template>
<script>
// 组件
import EleChart from "@/components/EleChart"
// 请求
import { getHjDay } from '@/api/mainLay/Hjing'
// 工具
import unit from "@/utils/util"
import { mapGetters } from "vuex"

export default {
  name: 'echartsList',
  components: { EleChart },
  props: {
    element: Array,/* 循环体 */
    huanjing: Number, /* 环境类别id */
    dept: Number /* 单位id */
  },

  computed: {
    ...mapGetters(["user"]),
    listOptions () {
      return function () {
        return {}
      }
    }
  },
  methods: {
    getOption (option) {
      this.getHuanJing(option)
      return {}
    },
    // echarts
    async getHuanJing (option) {
      // const loading = this.$loading({
      //   lock: true,
      //   text: '正在加载图表',
      //   spinner: 'el-icon-loading',
      //   background: 'rgba(0, 0, 0, 0.7)'
      // })
      // 日环境元素查询趋势
      /**
       * dept_id ->int32 ->true->单位ID
       *  hclass_id->int32->true ->环境类别id
       * hgrain_id->int32->true->监测元素id
       * dates    -> string -> true -> 日期：2021-80-12
       */
      const res = await getHjDay({
        dept_id: this.dept,
        hclass_id: this.huanjing,
        hgrain_id: option.hgrain_id,
        dates: unit.toDateString(new Date(), "yyyy-MM-dd")
      })
      // loading.close()

      // 结果只有 图表数据 console.log(res)
      if (this.$refs['echarrts' + option.hgrain_id][0]) {
        this.$refs['echarrts' + option.hgrain_id][0].chart.setOption(this.use_options(option, res.data), true)
      }

    },
    use_options (option, data) {
      let day = data.b
      let yday = data.y
      if (!day) return {}
      return {
        title: {
          subtext: option.hgrain_dw
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: ["今日", "昨日"]
        },
        toolbox: {
          show: true,
          feature: {
            dataZoom: {
              yAxisIndex: "none"
            },
            dataView: { readOnly: false },
            magicType: { type: ["line", "bar"] },
            restore: {},
            saveAsImage: {}
          }
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: day && day.map(d => d.ahour + "时"),
        },
        yAxis: {
          type: "value",
          splitLine: {
            show: false
          }
        },
        grid: {
          top: '11%'
        },
        series: [
          {
            name: "今日",
            type: "line",
            itemStyle: {
              color: option.hgrain_color,
              lineStyle: {
                color: option.hgrain_color
              }
            },
            data: day && day.map(d => d.avgs.toFixed(3)),
            markPoint: {
              data: [
                { type: "max", name: "最大值" },
                { type: "min", name: "最小值" }
              ]
            },
            markLine: {
              data: [
                {
                  lineStyle: {
                    type: "dotted",
                    color: option.hgrain_color,
                    borderWidth: 10
                  },
                  yAxis:
                    day &&
                    day.map(d => {
                      d.hgrain_max
                    })
                },
                {
                  lineStyle: {
                    type: "dotted",
                    color: option.hgrain_color,
                    borderWidth: 10
                  },
                  yAxis:
                    day &&
                    day.map(d => {
                      d.hgrain_min
                    })
                }
              ]
            }
          },
          {
            name: "昨日",
            type: "line",
            itemStyle: {
              color: '#4ecb73',
            },
            data: yday && yday.map(d => d.avgs.toFixed(3)),
            markPoint: {
              data: [
                { type: "max", name: "最大值" },
                { type: "min", name: "最小值" }
              ]
            },
            markLine: {
              data: [
                {
                  type: 'average',
                  lineStyle: {
                    type: "dotted",
                    color: 'red',
                    borderWidth: 5
                  },
                  yAxis:
                    data &&
                    data.hgrain_max
                },
                {
                  lineStyle: {
                    type: "dotted",
                    color: 'green',
                    borderWidth: 5
                  },
                  yAxis:
                    data &&
                    data.hgrain_min
                }
              ]
            }
          }
        ]
      }
    },
  }
}
</script>
<style>
.box-card {
  margin-top: 15px;
}
</style>