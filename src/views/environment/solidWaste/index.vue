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
          <div>
            <el-button type="primary">废容器</el-button>
            <el-button>废油</el-button>
            <el-button>废药剂</el-button>
            <el-button>废电池</el-button>
            <el-button>其他危害</el-button>
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
import EleChart from "@/components/EleChart";

export default {
  components: { EleChart },
  data() {
    return {};
  },
  computed: {
    outIn() {
      return {
        legend: { right: 0 },
        dataset: {
          // 提供一份数据。
          source: [
            ["product", "出库量", "入库量"],
            ["01月", 43.3, 85.8],
            ["02月", 83.1, 73.4],
            ["03月", 86.4, 65.2],
            ["04月", 72.4, 53.9],
            ["05月", 72.4, 53.9],
            ["06月", 72.4, 53.9],
            ["07月", 72.4, 53.9],
            ["08月", 72.4, 53.9],
            ["09月", 72.4, 53.9],
            ["10月", 72.4, 53.9],
            [("11月", 72.4, 53.9)],
            [("12月", 72.4, 53.9)],
          ],
        },
        xAxis: [
          {
            type: "category",
            show: true,
            axisLabel: { color: "#fff" },
            axisTick: { show: false },
          },
        ],
        yAxis: [
          {
            type: "value",
            axisLabel: {
              color: "#fff",
            },
            splitLine: {
              show: false,
            },
          },
        ],
        series: [{ type: "line" }, { type: "line" }],
      };
    },
    monthGangue() {
      return {
        title: {
          subtext: "1千吨",
        },
        tooltip: {},
        dataset: {
          // 提供一份数据。
          source: [
            ["product", "2015", "2016", "2017"],
            ["15:00", 43.3, 85.8, 93.7],
            ["17:00", 83.1, 73.4, 55.1],
            ["19:00", 86.4, 65.2, 82.5],
            ["21:00", 72.4, 53.9, 39.1],
            ["23:00", 72.4, 53.9, 39.1],
            ["01:00", 72.4, 53.9, 39.1],
          ],
        },
        // 声明一个 X 轴，类目轴（category）。默认情况下，类目轴对应到 dataset 第一列。
        xAxis: { type: "category" },
        // 声明一个 Y 轴，数值轴。
        yAxis: { show: false },
        // 声明多个 bar 系列，默认情况下，每个系列会自动对应到 dataset 的每一列。
        series: [{ type: "bar" }, { type: "bar" }, { type: "bar" }],
      };
    },
  },
};
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
  .el-card:deep(.el-card__body) {
    height: 80%;
  }
  .center {
    height: calc(100vh - 150px);
  }

  .right {
    .center {
      height: calc(100vh / 2 - 83px);
    }
    .el-card:deep.el-card__body {
      height: calc(100% - 83px);
    }
  }
}
</style>
