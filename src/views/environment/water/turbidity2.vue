<template>
  <div class="ele-body">
    <el-card>
      <ele-chart
        ref="chartss"
        :option="Curve"
        style="height: calc(100vh - 171px)"
    /></el-card>
  </div>
</template>
<script>
import EleChart from "@/components/EleChart"
export default {
  components: { EleChart },
  computed: {
    Curve () {
      return {
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: 'line',
            smooth: true
          }
        ]
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