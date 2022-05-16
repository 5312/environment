<template>
  <div class="ele-body">
    <el-row :gutter="20">
      <el-col :span="15">
        <el-card class="center">
          <img class="img" :src="require('@/assets/guti.png')" alt="加载失败" />
        </el-card>
      </el-col>
      <el-col :span="9" class="right">
        <el-card class="center">
          <div slot="header" class="title">
            <span>出入库统计</span>
          </div>
          <ele-chart :option="outIn" style="height: 100%" />
        </el-card>
        <el-card class="center">
          <div slot="header" class="title">
            <span>当月矸石销量</span>
          </div>
          <ele-chart :option="monthGangue" style="height: 100%" />
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import EleChart from "@/components/EleChart"

export default {
  components: { EleChart },
  data () {
    return {

    }
  }
  , computed: {
    outIn () {
      return {
        legend: {},
        dataset: {
          // 提供一份数据。
          source: [
            ['product', '生活区污水', '二盘曲', '工业区生活污水'],
            ['Matcha Latte', 43.3, 85.8, 93.7],
            ['Milk Tea', 83.1, 73.4, 55.1],
            ['Cheese Cocoa', 86.4, 65.2, 82.5],
            ['Walnut Brownie', 72.4, 53.9, 39.1]
          ]
        },
        xAxis: [
          {
            type: "category",
            show: false,
            axisLabel: { color: '#fff' },
            axisTick: { show: false },
          },
        ],
        yAxis: [
          {
            type: "value",
            axisLabel: {
              color: '#fff'
            },
            splitLine: {
              show: false
            }
          },
        ],
        series: [
          { type: 'line', smooth: true },
          { type: 'line', smooth: true },
          { type: 'line', smooth: true }
        ],
      }
    },
    monthGangue () {
      return {
        legend: {},
        tooltip: {},
        dataset: {
          // 提供一份数据。
          source: [
            ['product', '2015', '2016', '2017'],
            ['Matcha Latte', 43.3, 85.8, 93.7],
            ['Milk Tea', 83.1, 73.4, 55.1],
            ['Cheese Cocoa', 86.4, 65.2, 82.5],
            ['Walnut Brownie', 72.4, 53.9, 39.1]
          ]
        },
        // 声明一个 X 轴，类目轴（category）。默认情况下，类目轴对应到 dataset 第一列。
        xAxis: { type: 'category' },
        // 声明一个 Y 轴，数值轴。
        yAxis: {},
        // 声明多个 bar 系列，默认情况下，每个系列会自动对应到 dataset 的每一列。
        series: [{ type: 'bar' }, { type: 'bar' }, { type: 'bar' }]
      }
    }
  }
}
</script>
<style lang="scss" scoped>
$text-color: #07d3dd;
.img {
  width: 100%;
  height: 100%;
}
.ele-body {
  .el-card {
    &__header {
      border-color: transparent;
      .title {
        font-size: 18px;
        text-align: center;
        color: $text-color;
      }
    }
  }
  .el-card /deep/ .el-card__body {
    height: 100%;
  }
  .center {
    height: calc(100vh - 150px);
  }

  .right {
    .center {
      height: calc(100vh / 2 - 83px);
    }
    .el-card /deep/ .el-card__body {
      height: calc(100% - 83px);
    }
  }
}
</style>
