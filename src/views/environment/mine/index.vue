<template>
  <div class="ele-body">
    <el-row :gutter="20">
      <el-col :span="15">
        <div class="wrap_card wrap-center">
          <el-card>
            <div slot="header" class="title">
              <span>矿山治理情况</span>
            </div>
            <div>
              <!-- <div id="3dpie" style="height: 292px"></div> -->
              <highcharts :options="chartOptions"></highcharts>
            </div>
          </el-card>
          <el-card>
            <div slot="header" class="title">
              <span>矿山植被覆盖</span>
            </div>
            <div class="mine">
              <img
                class="img"
                :src="require('@/assets/mine.png')"
                alt="加载失败"
              />
              <!-- <ele-chart :option="mine" /> -->
            </div>
          </el-card>
        </div>
      </el-col>
      <el-col :span="9">
        <div class="wrap_card">
          <el-card>
            <!--  -->
            <div slot="header" class="title">
              <span>绿色矿山评估情况</span>
            </div>
            <!-- 内容部分 -->
            <div>
              <ele-chart :option="green" />
            </div>
          </el-card>
          <el-card>
            <div slot="header" class="title">
              <span>碳排放情况</span>
            </div>
            <div>
              <ele-chart :option="tan" />
            </div>
          </el-card>
          <el-card>
            <div slot="header" class="title">
              <span>生态治理情况</span>
            </div>
            <div>
              <ele-chart :option="sheng" />
            </div>
          </el-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import EleChart from "@/components/EleChart";
import * as echarts from "echarts";
/* highcharts */
import Highcharts from "highcharts";

import Highcharts3D from "highcharts/highcharts-3d";

import { Chart } from "highcharts-vue";
Highcharts3D(Highcharts);

export default {
  components: { EleChart, highcharts: Chart },
  data() {
    return {
      chartOptions: {
        chart: {
          backgroundColor: {
            linearGradient: [0, 0, 500, 500],
            stops: [
              [0, "rgb(2, 17, 50)"],
              [1, "rgb(2, 17, 50)"],
            ],
          },
          type: "pie",
          options3d: {
            enabled: true,
            alpha: 45,
            beta: 0,
          },
        },
        title: {
          text: "",
        },
        plotOptions: {
          pie: {
            allowPointSelect: true,
            cursor: "pointer",
            depth: 35,
            dataLabels: {
              enabled: true,
              format: "{point.name}",
            },
          },
        },
        series: [
          {
            type: "pie",
            name: "",
            data: [
              {
                name: "尚未治理",
                y: 307,
                sliced: true,
                selected: true,
              },
              ["已完成治理", 809.66],
            ],
          },
        ],
        /*  series: [{
           data: [1, 2, 3] // sample data
         }] */
      },
    };
  },
  computed: {
    mine() {
      return {};
    },
    green() {
      return {
        legend: { left: "1%", data: ["实际得分", "标准分"] },
        dataset: [
          {
            source: [
              ["product", "2012", "2013", "2014", "2015", "2016", "2017"],
              ["实际得分", 56.5, 82.1, 88.7, 70.1, 53.4, 85.1],
              ["标准分", 51.1, 51.4, 55.1, 53.3, 73.8, 68.7],
            ],
          },
          {
            source: [
              ["product", "b", "s"],
              ["矿区环境", 10, 8],
              ["资源开发方式", 10, 8],
              ["资源综合再利用", 10, 8],
              ["节能减排", 10, 8],
            ],
          },
        ],
        grid: { left: "50%" },
        xAxis: {
          type: "value",
          show: false,
          gridIndex: 0,
        },
        yAxis: {
          type: "category",
          show: true,
          axisTick: {
            show: false,
          },
          axisLine: {
            show: false,
          },
        },
        // xAxis: { type: 'category' },
        // yAxis: { gridIndex: 0 },
        series: [
          {
            type: "bar",
            emphasis: { focus: "series" },
            datasetIndex: 1,
          },
          {
            type: "bar",
            emphasis: { focus: "series" },
            datasetIndex: 1,
          },
          {
            type: "pie",
            id: "pie",
            radius: ["30%", "40%"],
            center: ["10%", "50%"],
            datasetIndex: 0,
            emphasis: {
              focus: "self",
            },
            label: {
              show: false,
              position: "center",
            },
            encode: {
              itemName: "product",
              value: "2012",
              tooltip: "2012",
            },
          },
        ],
      };
    },
    tan() {
      return {
        xAxis: {
          type: "category",
          data: [
            "2010",
            "2011",
            "2012",
            "2013",
            "2014",
            "2015",
            "2016",
            "2017",
            "2018",
            "2019",
            "2020",
            "2021",
          ],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: [120, 200, 150, 80, 70, 110, 130, 20, 20, 212, 90, 100],
            type: "bar",
            showBackground: true,
            backgroundStyle: {
              color: "rgba(180, 180, 180, 0.2)",
            },
          },
        ],
      };
    },
    sheng() {
      return {
        color: ["#80FFA5", "#00DDFF", "#37A2FF", "#FF0087", "#FFBF00"],
        legend: {},
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: [
              "2010",
              "2011",
              "2012",
              "2013",
              "2014",
              "2015",
              "2016",
              "2017",
              "2018",
              "2019",
              "2020",
              "2021",
            ],
          },
        ],
        yAxis: [
          {
            type: "value",
          },
        ],
        series: [
          {
            name: "生态治理面积",
            type: "line",
            stack: "Total",
            smooth: true,
            lineStyle: {
              width: 0,
            },
            showSymbol: false,
            areaStyle: {
              opacity: 0.8,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "rgb(128, 255, 165)",
                },
                {
                  offset: 1,
                  color: "rgb(1, 191, 236)",
                },
              ]),
            },
            emphasis: {
              focus: "series",
            },
            data: [140, 232, 101, 264, 90, 340, 250, 100, 200, 90, 10, 80],
          },
          {
            name: "生态环境投入",
            type: "line",
            stack: "Total",
            smooth: true,
            lineStyle: {
              width: 0,
            },
            showSymbol: false,
            areaStyle: {
              opacity: 0.8,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "#093065",
                },
                {
                  offset: 1,
                  color: "#0B224C",
                },
              ]),
            },
            emphasis: {
              focus: "series",
            },
            data: [140, 232, 101, 264, 90, 340, 250, 100, 200, 90, 10, 80],
          },
        ],
      };
    },
  },
};
</script>
<style lang="scss" scoped>
$text-color: #07d3dd;
.wrap_card:deep(.el-card__body) {
  height: calc(100% - 82px);
}
.ele-body {
  .wrap_card {
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    align-content: center;
    align-items: stretch;
    justify-content: space-between;
    height: calc(100vh - 150px);
    .el-card {
      .el-card__body > div {
        height: 100%;
        div {
          height: 100%;
        }
      }
      height: calc(100% / 3);
      &__header {
        border-color: transparent;
        .title {
          font-size: 18px;
          text-align: center;
          color: $text-color;
        }
      }
      &__body {
        height: calc(100% - 52px);
      }
    }
  }
  // card 头部线条
  .wrap_card :deep(.el-card__header) {
    margin: 0 30px;
    border-bottom: 2px solid rgba(255, 255, 255, 0.05);
  }
  .wrap-center {
    .el-card {
      height: 50%;
    }
  }
}
.mine > .img {
  width: 100%;
}
</style>
