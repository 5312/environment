<template>
  <div class="ele-body">
    <el-card>
      <el-row :gutter="20">
        <el-col>
          <el-tabs v-model="activeName">
            <el-tab-pane label="表格模式" name="table">
              <ele-data-table
                ref="table"
                :data="table"
                :choose.sync="choose"
                height="calc(100vh - 270px)"
                highlight-current-row
                v-loading="table_load"
              >
                <el-table-column label="时间" prop="time" />
                <el-table-column label="PH值" prop="ph" />
                <el-table-column label="悬浮物(ss)(mg/l)" prop="ss" />
                <el-table-column label="COD(mg/l)" prop="mg" />
                <el-table-column label="污水流量(l/s)" prop="l" />
              </ele-data-table>
            </el-tab-pane>
            <el-tab-pane label="图形模式" name="charts">
              <ele-chart
                v-if="activeName == 'charts'"
                ref="charts"
                :option="Curve"
                style="height: calc(100vh - 300px)"
              />
            </el-tab-pane>
          </el-tabs>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>
<script>
import EleChart from "@/components/EleChart"

export default {
  components: { EleChart },
  data () {
    return {
      table: [{
        time: '2022',
        ph: '7.80',
        ss: '1.04',
        mg: '0.31',
        l: '0.17',
      }, {
        time: '2022',
        ph: '7.80',
        ss: '1.04',
        mg: '0.31',
        l: '0.17',
      }, {
        time: '2022',
        ph: '7.80',
        ss: '1.04',
        mg: '0.31',
        l: '0.17',
      }],
      choose: [],
      table_load: false,
      activeName: 'table',
    }
  },
  computed: {
    Curve () {
      return {
        tooltip: {
          trigger: 'axis'
        },
        legend: {
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
          data: ['2022', '2022', '2022']
        },
        yAxis: {
          type: 'value'
        },
        // dataZoom: [
        //   {
        //     type: 'slider',
        //     xAxisIndex: 0,
        //     filterMode: 'filter'
        //   },

        //   {
        //     type: 'inside',
        //     xAxisIndex: 0,
        //     filterMode: 'filter'
        //   }
        // ],
        series: [
          {
            name: 'PH值',
            type: 'line',
            stack: 'Total',
            data: [7.80, 7.80, 7.80]
          },
          {
            name: '悬浮物',
            type: 'line',
            stack: 'Total',
            data: [220, 182, 191, 234, 290, 330, 310]
          },
          {
            name: 'COD',
            type: 'line',
            stack: 'Total',
            data: [1.04, 1.04, 1.04]
          },
          {
            name: '污水流量',
            type: 'line',
            stack: 'Total',
            data: [0.17, 0.17, 0.17]
          },
        ]
      }
    }
  },
}
</script>