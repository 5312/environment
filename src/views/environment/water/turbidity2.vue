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
        legend: {},
        xAxis: {
          type: 'category',
          data: ['11:50:36', '11:50:367', '11:50:38', '11:50:39', '11:50:40', '11:50:41', '11:50:42']
        },
        yAxis: {
          type: 'value',
          data: [-5, -4, -3, -2, -1, 0]
        },
        series: [
          {
            data: [-5, -5, -5, -5, -5, -5, -5],
            type: 'line',
            name: 'NDY3污泥浊度'
          }, {
            data: [0, 0, 0, 0, 0, 0, 0],
            type: 'line',
            name: 'NDY4污泥浊度'
          }, {
            data: [0, 0, 0, 0, 0, 0, 0],
            type: 'line',
            name: 'NDY5污泥浊度'
          }, {
            data: [0, 0, 0, 0, 0, 0, 0],
            type: 'line',
            name: 'NDY6污泥浊度'
          }, {
            data: [0, 0, 0, 0, 0, 0, 0],
            type: 'line',
            name: 'NDY7污泥浊度'
          }, {
            data: [0, 0, 0, 0, 0, 0, 0],
            type: 'line',
            name: 'NDY8污泥浊度'
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