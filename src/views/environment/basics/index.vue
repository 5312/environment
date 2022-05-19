<template >
  <div class="ele-body">
    <el-row :gutter="20">
      <el-col :span="7">
        <div class="wrap_card">
          <el-card>
            <!--  -->
            <div slot="header" class="title">
              <span>二盘区水质</span>
            </div>
            <!-- 内容部分 -->
            <div>
              <ele-chart :option="WatterQuality" style="height: 160px" />
            </div>
          </el-card>
          <el-card>
            <div slot="header" class="title">
              <span>高效旋流水质</span>
            </div>
            <div>
              <ele-chart :option="Swirl" style="height: 160px" />
            </div>
          </el-card>
          <el-card>
            <div slot="header" class="title">
              <span>企业用水</span>
            </div>
            <div>
              <ele-chart :option="Daqi" style="height: 160px" />
            </div>
          </el-card>
        </div>
      </el-col>
      <el-col :span="10">
        <div class="wrap_card wrap-center">
          <el-card>
            <div slot="header" class="title">
              <span>大气监测</span>
            </div>
            <div>
              <ele-chart :option="Swirl" style="height: 292px" />
            </div>
          </el-card>
          <el-card>
            <div slot="header" class="title">
              <span>噪声监测</span>
            </div>
            <div>
              <ele-chart :option="Year_zhong" style="height: 160px" />
            </div>
          </el-card>
        </div>
      </el-col>
      <el-col :span="7">
        <div class="wrap_card wrap-right">
          <el-card>
            <div slot="header" class="title">
              <span>矸石销量</span>
            </div>
            <!-- 折线图 -->
            <div>
              <ele-chart :option="Line" style="height: 292px" />
            </div>
          </el-card>
          <el-card>
            <div slot="header" class="title">
              <span>危险废物</span>
            </div>
            <div>
              <ele-chart :option="Gauge" style="height: 292px" />
            </div>
          </el-card>
        </div>
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
  },
  computed: {
    /* pm2.5 / pm10 */
    WatterQuality () {
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
    },
    Swirl () {
      return {
        xAxis: [
          {
            type: "category",
            data: ['0.00'],
            axisLabel: {
              color: '#fff'
            },
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
          {
            barWidth: 15,
            type: "bar",
            data: [{
              name: '0.00',
              value: 15
            }],
            itemStyle: {
              color: 'rgb(7, 130, 135)'
            }
          }
        ],
      }
    },
    Daqi () {
      return {
        xAxis: [
          {
            type: "category",
            data: ['0.00'],
            axisLabel: {
              color: '#fff'
            },
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
          {
            type: 'scatter',
            data: [{
              name: '0.00',
              value: 15
            }, {
              name: '0.00',
              value: 13
            }],
            itemStyle: {
              color: 'rgb(255, 168, 0)'
            }
          }
        ],
      }
    },
    /* 重污染天数 */
    Year_zhong () {
      return {
        series: [
          {
            type: 'pie',
            radius: [40, 60],
            data: [{ value: 1048, name: 'Search Engine' },],
            itemStyle: {
              color: 'rgb(23, 54, 87)'
            },
            label: {
              show: false
            },
          },
        ],
      }
    },
    /* 优良天数 */
    Year_you () {
      return {
        series: [
          {
            type: 'pie',
            radius: [40, 60],
            data: [{ value: 1048, name: 'Search Engine' },],
            itemStyle: {
              color: 'rgb(255, 168, 0)'
            },
            label: {
              show: false
            },
          }
        ]
      }
    },
    /* 温度,湿度 */
    Line () {
      return {
        legend: { right: 0, data: ['温度', '湿度'] },
        xAxis: {
          type: 'category',
          data: ['00:00', '01:03', '03:00', '04:03', '06:00', '07:03', '08:00']
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            formatter: '{value}'
          },
          splitLine: { show: false }
        },
        series: [
          {
            name: '湿度',
            type: 'line',
            smooth: 0.6,// 光滑
            symbol: 'none',/* 点 */
            data: [10, 10, 10, 10, 10, 10, 6],

          },
          {
            name: '温度',
            type: 'line',
            smooth: 0.6,// 光滑
            symbol: 'none',/* 点 */
            data: [1, 1, 1, 1, 1, 1, 3],
          }
        ]
      }
    },
    /* 气压 */
    Gauge () {
      return {
        title: {
          text: 'Basic Radar Chart'
        },
        radar: {
          // shape: 'circle',
          indicator: [
            { name: 'Sales', max: 6500 },
            { name: 'Administration', max: 16000 },
            { name: 'Information Technology', max: 30000 },
            { name: 'Customer Support', max: 38000 },
            { name: 'Development', max: 52000 },
            { name: 'Marketing', max: 25000 }
          ]
        },
        series: [
          {
            name: 'ding',
            type: 'radar',
            data: [
              {
                value: [4200, 3000, 20000, 35000, 50000, 18000],
                name: 'Allocated Budget'
              },
              {
                value: [5000, 14000, 28000, 26000, 42000, 21000],
                name: 'Actual Spending'
              }
            ]
          }
        ]
      }
    }
  },

}
</script>
<style lang="scss" scoped>
$text-color: #07d3dd;
.wrap_card /deep/ .el-card__body {
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
        .center {
          height: 100%;
          overflow-y: auto;
          overflow-x: hidden;
          .body-header {
            padding: 10px 0;
            text-align: center;
            .top {
              margin-bottom: 5px;
            }
            .wraptag > div {
              padding: 10px;
              background: rgb(22, 106, 150);
            }
          }
          .body {
            .wraptag {
              margin: 10px 0;
              & > div {
                padding: 10px;
                background: rgb(22, 106, 150);
              }
            }
          }
          .pm-row {
            height: calc(100% - 63px);
            overflow: hidden;
            .el-col {
              height: 100%;
              & > div {
                height: 100%;
                text-align: center;
                background: radial-gradient(rgb(11, 30, 60), rgb(11, 72, 113));
                .zhuangtai {
                  padding: 5px;
                  font-size: 14px;
                }
                .line {
                  box-sizing: border-box;
                  padding: 8px 0;
                  white-space: nowrap;
                  div {
                    margin: 0 5px;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  // card 头部线条
  .wrap_card /deep/.el-card__header {
    margin: 0 30px;
    // border-color: transparent;
    border-bottom: 2px solid rgba(255, 255, 255, 0.05);
  }
  .wrap-center {
    .el-card:nth-child(1) {
      height: calc(100% * (2 / 3) + 20px);
    }
  }
  .wrap-right {
    .el-card {
      height: 50%;
    }
  }
}

.red {
  color: #f56c6c;
}
.yellow {
  color: #e6a23c;
}
.green {
  color: #67c23a;
}
.blue {
  color: #409eff;
}
</style>