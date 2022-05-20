<template>
  <div class="ele-body">
    <el-card>
      <div slot="header" class="title">
        <span>多测点PM10小时曲线对比</span>
      </div>
      <ele-chart
        ref="chartss"
        :option="Curve"
        style="height: calc(100vh - 291px)"
    /></el-card>
  </div>
</template>
<script>
import * as echarts from 'echarts'
import EleChart from "@/components/EleChart"
export default {
  components: { EleChart },
  computed: {
    Curve () {
      const data = []
      const str = '五号路灯杆'
      const y = []
      for (let i = 0; i < 20; ++i) {
        data.push(Math.round(Math.random() * 2000))
        y.push(str + i)
      }
      return {
        xAxis: {
          max: 'dataMax',
          axisLabel: {
            color: 'rgb(12, 132, 249)'
          }
        },
        grid: {
          left: '10%',
          right: '3%'
        },
        yAxis: {
          type: 'category',
          data: y,
          inverse: true,
          animationDuration: 300,
          animationDurationUpdate: 300,
          axisLabel: {
            color: 'rgb(12, 132, 249)'
          }
        },
        series: [
          {
            realtimeSort: true,
            barWidth: 10,
            type: 'bar',
            data: data,
            label: {
              show: true,
              position: 'right',
              valueAnimation: true
            },
            itemStyle: {
              borderRadius: 5,
              color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                { offset: 0, color: 'rgb(4, 120, 251)' },
                { offset: 1, color: 'rgb(73, 223, 237)' }
              ])
            },
          }
        ],
        legend: {
          show: true
        },
      }
    }
  },

}
</script>
<style lang="scss" scoped>
$text-color: #07d3dd;
.el-card {
  height: calc(100% / 3);
  .title {
    padding: 30px;
    font-size: 18px;
    text-align: center;
    color: $text-color;
  }
}
</style>