<template>
  <div class="ele-body">
    <el-card>
      <el-form ref="form" :model="form" :inline="true" label-width="80px">
        <el-form-item label="开始时间">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="form.date1"
            style="width: 100%"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="form.date1"
            style="width: 100%"
          ></el-date-picker>
        </el-form-item>
        <el-form-item> <el-button type="primary">查询</el-button></el-form-item>
      </el-form>
      <el-row :gutter="20">
        <el-col>
          <el-tabs v-model="activeName">
            <el-tab-pane label="表格模式" name="table">
              <ele-data-table
                ref="table"
                :data="table"
                :choose.sync="choose"
                height="calc(100vh - 330px)"
                highlight-current-row
                v-loading="table_load"
              >
                <el-table-column label="点位名称" prop="name" />
                <el-table-column label="PM10" prop="name" />
                <el-table-column label="PM2.5" prop="name" />
                <el-table-column label="温度" prop="name" />
                <el-table-column label="湿度" prop="name" />
                <el-table-column label="风速" prop="name" />
                <el-table-column label="风向" prop="name" />
                <el-table-column label="时间" prop="name" />
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
      form: {},
      table: [],
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