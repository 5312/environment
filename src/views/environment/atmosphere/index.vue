<template>
  <div class="ele-body">
    <el-row :gutter="20">
      <el-col :span="7">
        <div class="wrap_card">
          <el-card>
            <!--  -->
            <div slot="header" class="title">
              <span>矿区大气监测总览</span>
            </div>
            <!-- 内容部分 -->
            <div class="center">
              <div class="body-header">
                <div class="flex flex_h_between">
                  <div>
                    <div class="top">PM2.5</div>
                    <div>4.00</div>
                  </div>
                  <div>
                    <div class="top">pm10</div>
                    <div>4.00</div>
                  </div>
                  <div>
                    <div class="top">温度</div>
                    <div>-3.20℃</div>
                  </div>
                  <div>
                    <div class="top">湿度</div>
                    <div>39.60RH</div>
                  </div>
                  <div>
                    <div class="top">风速</div>
                    <div>0.20m/s</div>
                  </div>
                  <div>
                    <div class="top">大气压</div>
                    <div>0.00Pa</div>
                  </div>
                </div>
              </div>
              <el-row :gutter="10" class="pm-row">
                <el-col :span="12">
                  <div>
                    <div class="zhuangtai">PM2.5状态</div>
                    <div class="flex flex_h_between line">
                      <div>0-50 <span class="red">优</span></div>
                      <div>101-150 <span class="yellow">中</span></div>
                    </div>
                    <div class="flex flex_h_between line">
                      <div>51-100 <span class="green">良</span></div>
                      <div>151-200 <span class="blue">差</span></div>
                    </div>
                  </div>
                </el-col>
                <el-col :span="12">
                  <div>
                    <div class="zhuangtai">PM10状态</div>
                    <div class="flex flex_h_between line">
                      <div>0-50 <span class="red">优</span></div>
                      <div>101-150 <span class="yellow">中</span></div>
                    </div>
                    <div class="flex flex_h_between line">
                      <div>51-100 <span class="green">良</span></div>
                      <div>151-200 <span class="blue">差</span></div>
                    </div>
                  </div>
                </el-col>
              </el-row>
            </div>
          </el-card>
          <el-card>
            <div slot="header" class="title">
              <span>PM2.5</span>
            </div>
            <div>
              <ele-chart :option="Pm2" style="height: 160px" />
            </div>
          </el-card>
          <el-card>
            <div slot="header" class="title">
              <span>大气趋势</span>
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
              <span>PM10</span>
            </div>
            <div>
              <ele-chart :option="Pm2" style="height: 292px" />
            </div>
          </el-card>
          <el-card>
            <div slot="header" class="title">
              <span>年度目标</span>
            </div>
            <el-row :gutter="5">
              <el-col :span="12">
                <div>
                  <div class="ele-text-center">重污染天数</div>
                  <ele-chart :option="Year_zhong" style="height: 292px" />
                </div>
              </el-col>
              <el-col :span="12">
                <div>
                  <div class="ele-text-center">优良天数</div>
                  <ele-chart :option="Year_you" style="height: 292px" />
                </div>
              </el-col>
            </el-row>
          </el-card>
        </div>
      </el-col>
      <el-col :span="7">
        <div class="wrap_card">
          <el-card>
            <div slot="header" class="title">
              <span>温度湿度</span>
            </div>
            <!-- 折线图 -->
            <div>
              <ele-chart :option="Line" style="height: 160px" />
            </div>
          </el-card>
          <el-card>
            <div slot="header" class="title">
              <span>报警列表</span>
            </div>
            <div class="center">
              <div class="body-header">
                <div class="flex flex_h_between wraptag">
                  <div>报警类型</div>
                  <div>报警地点</div>
                  <div>报警值</div>
                  <div>报警时间</div>
                </div>
              </div>
              <div class="body">
                <div class="flex flex_h_between wraptag">
                  <div>报警类型</div>
                  <div>报警地点</div>
                  <div>报警值</div>
                  <div>报警时间</div>
                </div>
                <div class="flex flex_h_between wraptag">
                  <div>报警类型</div>
                  <div>报警地点</div>
                  <div>报警值</div>
                  <div>报警时间</div>
                </div>
                <div class="flex flex_h_between wraptag">
                  <div>报警类型</div>
                  <div>报警地点</div>
                  <div>报警值</div>
                  <div>报警时间</div>
                </div>
              </div>
            </div>
          </el-card>
          <el-card>
            <div slot="header" class="title">
              <span>气压</span>
            </div>
            <div>
              <ele-chart :option="Gauge" style="height: 160px" />
            </div>
          </el-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import EleChart from '@/components/EleChart'
export default {
  components: { EleChart },
  data() {
    return {}
  },
  computed: {
    /* pm2.5 / pm10 */
    Pm2() {
      return {
        xAxis: [
          {
            type: 'category',
            data: ['0.00'],
            axisLabel: {
              color: '#fff'
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            axisLabel: {
              color: '#fff'
            },
            splitLine: {
              show: false
            }
          }
        ],
        series: [
          {
            barWidth: 15,
            type: 'bar',
            data: [
              {
                name: '0.00',
                value: 15
              }
            ],
            itemStyle: {
              color: 'rgb(7, 130, 135)'
            }
          }
        ]
      }
    },
    Daqi() {
      return {
        xAxis: [
          {
            type: 'category',
            data: ['0.00'],
            axisLabel: {
              color: '#fff'
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            axisLabel: {
              color: '#fff'
            },
            splitLine: {
              show: false
            }
          }
        ],
        series: [
          {
            type: 'scatter',
            data: [
              {
                name: '0.00',
                value: 15
              },
              {
                name: '0.00',
                value: 13
              }
            ],
            itemStyle: {
              color: 'rgb(255, 168, 0)'
            }
          }
        ]
      }
    },
    /* 重污染天数 */
    Year_zhong() {
      return {
        color: ['rgb(23, 54, 87)', '#00E1FF'],
        legend: {
          orient: 'vertical',
          left: 'left',
          bottom: 0
        },
        series: [
          {
            type: 'pie',
            radius: ['40%', '60%'],
            data: [
              { value: 65, name: '剩余天数 65 ' },
              { value: 0, name: '污染天数 0' }
            ],
            itemStyle: {
              borderRadius: 10,
              borderColor: '#fff',
              borderWidth: 2
            },
            label: {
              show: false
            }
          },
          {
            type: 'pie',
            radius: ['30%', '35%'],
            data: [{ value: 65, name: '2021年目标 65' }],
            itemStyle: {
              color: '#619EB8',
              borderRadius: 10,
              borderColor: '#fff',
              borderWidth: 2
            },
            label: {
              show: false
            }
          }
        ]
      }
    },
    /* 优良天数 */
    Year_you() {
      return {
        color: ['rgb(23, 54, 87)', '#FFAE5E'],
        legend: {
          orient: 'vertical',
          left: 'left',
          bottom: 0
        },
        series: [
          {
            type: 'pie',
            radius: ['40%', '60%'],
            itemStyle: {
              borderRadius: 10,
              borderColor: '#fff',
              borderWidth: 2
            },
            data: [
              { value: 76, name: '剩余天数 76' },
              { value: 289, name: '优良天数 289' }
            ],
            label: {
              show: false
            }
          },
          {
            type: 'pie',
            radius: ['30%', '35%'],
            data: [{ value: 365, name: '2021年目标 365' }],
            itemStyle: {
              color: '#9A8071',
              borderRadius: 10,
              borderColor: '#fff',
              borderWidth: 2
            },

            label: {
              show: false
            }
          }
        ]
      }
    },
    /* 温度,湿度 */
    Line() {
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
            smooth: 0.6, // 光滑
            symbol: 'none' /* 点 */,
            data: [10, 10, 10, 10, 10, 10, 6]
          },
          {
            name: '温度',
            type: 'line',
            smooth: 0.6, // 光滑
            symbol: 'none' /* 点 */,
            data: [1, 1, 1, 1, 1, 1, 3]
          }
        ]
      }
    },
    /* 气压 */
    Gauge() {
      return {
        series: [
          {
            radius: '100%',
            name: '气压',
            type: 'gauge',
            progress: {
              show: true
            },
            axisLabel: {
              distance: 10 /* 标签与刻度线的距离。 */,
              color: '#fff'
            },
            axisLine: {
              lineStyle: {
                width: 10
              }
            },
            axisTick: {
              show: true,
              length: '5%',
              distance: 1
            },
            anchor: {
              /* 指针中心点 */
              show: true,
              showAbove: true,
              size: 10,
              itemStyle: {
                borderWidth: 8
              }
            },
            detail: {
              valueAnimation: true,
              formatter: '{value}K Pa',
              color: 'rgb(0, 246, 247)',
              fontSize: 14,
              offsetCenter: ['0%', '63%']
            },
            data: [
              {
                value: 50,
                name: '123'
              }
            ]
          }
        ]
      }
    }
  }
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
