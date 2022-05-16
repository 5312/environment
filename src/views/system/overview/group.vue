<template>
  <div class="container ele-body">
    <div class="datatop">
      <Group_list :types="1" :dept="dept" />
      <Group_list :types="2" :dept="dept" />
      <Group_list :types="3" :dept="dept" />
      <Group_list :types="4" :dept="dept" />
      <Group_list :types="5" :dept="dept" />
    </div>
    <!-- charts  -->
    <el-card class="box-card" header="局能耗趋势" v-loading="jneng">
      <div class="pic">
        <ele-chart :option="drawLine" style="height: 360px" />
      </div>
    </el-card>
    <el-card class="box-card" header="矿能耗趋势" v-loading="jneng">
      <div class="pic">
        <ele-chart :option="mines" style="height: 360px" />
      </div>
    </el-card>
  </div>
</template>
<script>
import { mapGetters } from "vuex"
// import util from '@/utils/util'
// 组件
import Group_list from './components/group_list.vue'
import EleChart from "@/components/EleChart"
// 请求 
import { getCoutsDeptClass, getCoutsDept } from '@/api/mainLay/energyzong'
export default {
  components: { EleChart, Group_list },

  data () {
    return {
      drawLineData: [],
      mineData: [],
      dept: "",
      jneng: false
    }
  },
  created () {
    this.dept = this.user.user.dept_id
    /*  */
    this.getCharts()
  },
  computed: {
    ...mapGetters(["user"]),
    drawLine () {
      return {
        color: ["#ffdf25", "#36a9ce", "#d0e17d", "#fcd8e8"],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
          formatter: function (v) {
            return `电 : ${v[0].value} 万/kW h</br>
                    水 : ${v[1].value} t</br>
                    气 : ${v[2].value} m³</br>
                    煤 : ${v[3].value} t</br>
                    油 : ${v[4].value} L</br>
            `
          }
          // valueFormatter: (value) => (value).toFixed(2) + '万'
        },
        legend: {
          data: ["电", "水", "气", "煤", '油'],
          top: "0",
        },
        title: {
          left: "0%",
          top: "0%",
          textStyle: {
            fontSize: "14",
            fontStyle: "normal",
          },
        },
        toolbox: {
          show: true,
          feature: {
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ['line', 'bar'] },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        grid: {
          left: "2%",
          right: "6%",
          bottom: "-2%",
          top: "20%",
          containLabel: true,
        },
        calculable: true,
        xAxis: [
          {
            type: "category",
            //修改坐标系字体颜色
            axisLabel: {
              interval: 0,
              rotate: 15,
              show: true,
              color: "#fff",
            },
            data: this.drawLineData.map((d) => d.deptname),
          },
        ],
        yAxis: [
          {
            type: "value",
            nameLocation: "end",
            axisLabel: {
              show: true,
              color: "#fff",
            },
            splitLine: {
              show: false
            }
          },
        ],
        series: [
          {
            name: "电",
            type: "bar",
            // stack: 'c',
            barGap: '40%',
            data: this.drawLineData.map((d) => (d.dian / 10000)),
            label: {
              show: false, //开启显示
              position: "top", //在上方显示
              textStyle: {
                fontSize: 12,
              },
              formatter: function (params) {
                if (params.value == 0) return ''
                return (params.value).toFixed(0) + '万'
              }
            },
          },
          {
            name: "水",
            // stack: 'c',
            type: "bar",
            barGap: '40%',
            data: this.drawLineData.map((d) => d.shui),
            label: {
              show: false, //开启显示
              position: "top", //在上方显示
              textStyle: {
                //数值样式
                fontSize: 12,
              },
              formatter: function (params) {
                if (params.value == 0) return ''
                return (params.value).toFixed(0)
              }
            },
          },
          {
            name: "气",
            // stack: 'c',
            type: "bar",
            barGap: '40%',
            data: this.drawLineData.map((d) => d.qi),
            label: {
              show: false, //开启显示
              position: "top", //在上方显示
              textStyle: {
                //数值样式
                fontSize: 12,
              },
              formatter: function (params) {
                if (params.value == 0) return ''
                return (params.value).toFixed(0)
              }
            },
          },
          {
            name: "煤",
            // stack: 'c',
            type: "bar",
            barGap: '40%',
            data: this.drawLineData.map((d) => d.mei),
            label: {
              show: false, //开启显示
              position: "top", //在上方显示
              textStyle: {
                //数值样式
                fontSize: 12,
              },
              formatter: function (params) {
                if (params.value == 0) return ''
                return (params.value).toFixed(0)
              }
            },
          },
          {
            name: "油",
            // stack: 'c',
            type: "bar",
            barGap: '40%',
            data: this.drawLineData.map((d) => d.you),
            label: {
              show: false, //开启显示
              position: "top", //在上方显示
              textStyle: {
                //数值样式
                fontSize: 12,
              },
              formatter: function (params) {
                if (params.value == 0) return ''
                return (params.value).toFixed(0)
              }
            },
          },
        ],
      }
    },
    mines () {
      let barWidth = '20%'
      return {
        color: ["#ffdf25", "#36a9ce", "#d0e17d", "#fcd8e8"],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
          formatter: function (v) {
            return `电 : ${v[0].value} 万/kW h</br>
                    水 : ${v[1].value} t</br>
                    气 : ${v[2].value} m³</br>
                    煤 : ${v[3].value} t</br>
                    油 : ${v[4].value} L</br>
            `
          }
          // valueFormatter: (value) => (value / 10000).toFixed(2) + '万'
        },
        legend: {
          data: ["电", "水", "气", "煤", '油'],
          top: "0",
        },
        title: {
          left: "0%",
          top: "0%",
          textStyle: {
            fontSize: "14",
            fontStyle: "normal",
          },
        },
        grid: {
          left: "2%",
          right: "6%",
          bottom: "-2%",
          top: "10%",
          containLabel: true,
        },
        calculable: true,
        xAxis: [
          {
            type: "category",
            //修改坐标系字体颜色
            axisLabel: {
              interval: 0,
              rotate: 45,
              show: true,
              color: "#fff",
            },
            data: this.mineData.map((d) => d.deptname),
          },
        ],
        yAxis: [
          {
            type: "value",
            nameLocation: "end",
            axisLabel: {
              show: true,
              color: "#fff",
            },
            splitLine: {
              show: false
            }
          },
        ],
        series: [
          {
            name: "电",
            type: "bar",
            barWidth: barWidth,
            data: this.mineData.map((d) => d.dian / 10000),
            label: {
              show: false, //开启显示
              position: "top", //在上方显示
              textStyle: {
                //数值样式
                fontSize: 12,
              },
              formatter: function (params) {
                if (params.value == 0) return ''
                return params.value.toFixed(0) + '万'
              }
            },
          },
          {
            name: "水",
            type: "bar",
            barWidth: barWidth,
            data: this.mineData.map((d) => d.shui),
            label: {
              show: false, //开启显示
              position: "top", //在上方显示
              textStyle: {
                fontSize: 12,
              },
              formatter: function (params) {
                if (params.value == 0) return ''
                return params.value
              }
            },
          },
          {
            name: "气",
            type: "bar",
            barWidth: barWidth,
            data: this.mineData.map((d) => d.qi),
            label: {
              show: false, //开启显示
              position: "top", //在上方显示
              textStyle: {
                fontSize: 12,
              },
              formatter: function (params) {
                if (params.value == 0) return ''
                return params.value
              }
            },
          },
          {
            name: "煤",
            type: "bar",
            barWidth: barWidth,
            data: this.mineData.map((d) => d.mei),
            label: {
              show: false, //开启显示
              position: "top", //在上方显示
              textStyle: {
                fontSize: 12,
              },
              formatter: function (params) {
                if (params.value == 0) return ''
                return params.value
              }
            },
          },
          {
            name: "油",
            type: "bar",
            barWidth: barWidth,
            data: this.mineData.map((d) => d.you),
            label: {
              show: false, //开启显示
              position: "top", //在上方显示
              textStyle: {
                fontSize: 12,
              },
              formatter: function (params) {
                if (params.value == 0) return ''
                return params.value
              }
            },
          },
        ],
      }
    },
  },
  methods: {
    /* charts  */
    async getCharts () {
      this.jneng = true
      /* 局能耗趋势 */
      const J_response = getCoutsDeptClass({
        dept_id: this.dept
      })

      /* 矿能耗趋势 */
      const k_aungdata = getCoutsDept({
        level: 3,
        dept_id: this.dept
      })

      const [jn, kn] = await this.$http.all([J_response, k_aungdata])
      if (jn && kn) {
        this.drawLineData = jn.data
        this.mineData = kn.data
      }
      this.jneng = false
    },

  },
};
</script>
<style scoped lang="scss">
</style>
