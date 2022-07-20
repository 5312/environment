<template>
  <div class="ele-body">
    <el-row :gutter="20">
      <el-col :span="12">
        <el-card>
          <div slot="header" class="title">
            <span>进水参数</span>
          </div>
          <ele-chart :option="waterIn" style="height: calc(100vh - 630px)"></ele-chart>
        </el-card>
        <el-card>
          <div slot="header" class="title">
            <span>出水参数</span>
          </div>
          <ele-chart :option="waterOut" style="height: calc(100vh - 630px)"></ele-chart>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card>
          <div slot="header" class="title">
            <span>出水参数</span>
          </div>
          <ele-chart :option="waterOut1" style="height: calc(100vh - 630px)"></ele-chart
        ></el-card>
        <el-card>
          <div slot="header" class="title">
            <span>回用水参数</span>
          </div>
          <ele-chart :option="waterBack" style="height: calc(100vh - 630px)"></ele-chart
        ></el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import EleChart from '@/components/EleChart'

export default {
  components: {
    EleChart
  },
  computed: {
    waterIn() {
      return {
        legend: {},
        xAxis: {
          type: 'category',
          data: ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: '进水浊度',
            data: [820, 932, 901, 934, 1290, 1330, 1320, 1203, 999],
            type: 'line',
            smooth: true
          },
          {
            name: '进水ss',
            data: [8201, 9322, 9031, 93, 120, 130, 120, 123, 990],
            type: 'line',
            smooth: true
          }
        ]
      }
    },
    waterOut1() {
      return {
        legend: {},
        xAxis: {
          type: 'category',
          data: ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: '出水浊度1',
            data: [820, 932, 901, 934, 1290, 1330, 1320, 1203, 999],
            type: 'line',
            smooth: true
          },
          {
            name: '二氧化氯',
            data: [8201, 9322, 9031, 93, 120, 130, 120, 123, 990],
            type: 'line',
            smooth: true
          },
          {
            name: '余氯',
            data: [8201, 9322, 9031, 93, 120, 130, 120, 123, 990],
            type: 'line',
            smooth: true
          }
        ]
      }
    },
    waterOut() {
      return {
        legend: {},
        xAxis: {
          type: 'category',
          data: ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: '出水浊度2',
            data: [820, 932, 901, 934, 1290, 1330, 1320, 1203, 999],
            type: 'line',
            smooth: true
          },
          {
            name: '二氧化氯',
            data: [8201, 9322, 9031, 93, 120, 130, 120, 123, 990],
            type: 'line',
            smooth: true
          },
          {
            name: '余氯',
            data: [8201, 9322, 9031, 93, 120, 130, 120, 123, 990],
            type: 'line',
            smooth: true
          }
        ]
      }
    },
    waterBack() {
      return {
        legend: {},
        xAxis: {
          type: 'category',
          data: ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: '累计',
            data: [820, 932, 901, 934, 1290, 1330, 1320, 1203, 999],
            type: 'line',
            smooth: true
          }
        ]
      }
    }
  }
}
</script>
<style lang="scss">
$text-color: #07d3dd;

.el-card {
  height: calc(100% / 3);
  &__header {
    border-color: transparent;
    .title {
      font-size: 18px;
      text-align: center;
      color: $text-color;
    }
  }
}
</style>
