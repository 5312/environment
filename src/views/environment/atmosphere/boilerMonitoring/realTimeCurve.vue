<template>
  <div class="ele-body">
    <el-card>
      <el-row :gutter="20">
        <el-col :span="5">
          <div class="title">实时曲线</div>
          <div>
            <table class="table" border="1" cellspacing="0">
              <tbody>
                <tr>
                  <td>二氧化硫</td>
                  <td>0.70 mg/m³</td>
                </tr>
                <tr>
                  <td>氧气含量</td>
                  <td>0.70 mg/m³</td>
                </tr>
                <tr>
                  <td>一氧化氢</td>
                  <td>0.70 mg/m³</td>
                </tr>
                <tr>
                  <td>烟尘</td>
                  <td>0.70 mg/m³</td>
                </tr>
                <tr>
                  <td>烟气温度</td>
                  <td>0.70 ℃</td>
                </tr>
              </tbody>
            </table>
          </div>
        </el-col>
        <el-col :span="19">
          <ele-chart
            ref="chartss"
            :option="Curve"
            style="height: calc(100vh - 291px)"
          />
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>
<script>
import EleChart from "@/components/EleChart"
export default {
  components: { EleChart },
  computed: {
    Curve () {
      return {
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['烟尘折算', '二氧化硫折算', '氮氧化物折算', '氮二氧化硫', '氧气含量']
        },
        grid: {
          top: '5%',
          left: '3%',
          right: '4%',
          bottom: '10%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['2022-01-01', '2022-01-01', '2022-01-01', '2022-01-01', '2022-01-01', '2022-01-01', '2022-01-01']
        },
        yAxis: {
          type: 'value'
        },
        dataZoom: [
          {
            type: 'slider',
            xAxisIndex: 0,
            filterMode: 'filter'
          },

          {
            type: 'inside',
            xAxisIndex: 0,
            filterMode: 'filter'
          }
        ],
        series: [
          {
            name: '烟尘折算',
            type: 'line',
            stack: 'Total',
            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: '二氧化硫折算',
            type: 'line',
            stack: 'Total',
            data: [220, 182, 191, 234, 290, 330, 310]
          },
          {
            name: '氮氧化物折算',
            type: 'line',
            stack: 'Total',
            data: [150, 232, 201, 154, 190, 330, 410]
          },
          {
            name: '氮二氧化硫',
            type: 'line',
            stack: 'Total',
            data: [320, 332, 301, 334, 390, 330, 320]
          },
          {
            name: '氧气含量',
            type: 'line',
            stack: 'Total',
            data: [820, 932, 901, 934, 1290, 1330, 1320]
          }
        ]
      }
    }
  },
}
</script>
<style lang="scss" scoped>
.title {
  padding: 30px 20px;
}
.table {
  border: 1px solid #ddd;
  margin: auto;
  td {
    padding: 30px 20px;
    border: 1px solid #ddd;
  }
}
</style>