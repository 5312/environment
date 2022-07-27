<template>
  <div class="ele-body">
    <el-row :gutter="20">
      <el-col :span="7">
        <div class="wrap_card">
          <el-card>
            <!--  -->
            <div slot="header" class="title">
              <span>矿区噪声总览</span>
            </div>
            <!-- 内容部分 -->
            <div class="center">
              <div class="body-header">
                <div class="flex flex_h_between">
                  <div>
                    <div class="top">厂区东</div>
                    <div>21.2dB</div>
                  </div>
                  <div>
                    <div class="top">厂区南</div>
                    <div>21.2dB</div>
                  </div>
                  <div>
                    <div class="top">厂区西</div>
                    <div>21.2dB</div>
                  </div>
                  <div>
                    <div class="top">厂区北</div>
                    <div>21.2dB</div>
                  </div>
                </div>
              </div>
              <el-row :gutter="10" class="pm-row">
                <el-col :span="24">
                  <div>
                    <div class="zhuangtai">噪声状态</div>
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
              <span>重点设备状态</span>
            </div>
            <div class="center">
              <table class="data_table">
                <thead>
                  <th>设备ID</th>
                  <th>设备名称</th>
                  <th>状态</th>
                </thead>
                <tbody>
                  <tr>
                    <td>无数据</td>
                    <td>无数据</td>
                    <td>无数据</td>
                  </tr>
                </tbody>
              </table>
              <!-- <div class="body-header">
                <div class="flex flex_h_between wraptag">
                  <div>设备ID</div>
                  <div>设备名称</div>
                  <div>状态</div>
                </div>
              </div>
              <div class="body">
                <div class="flex flex_h_between wraptag">
                  <div>无数据</div>
                  <div>无数据</div>
                  <div>无数据</div>
                </div>
              </div> -->
            </div>
          </el-card>
          <el-card>
            <div slot="header" class="title">
              <span>厂区监测噪声趋势</span>
            </div>
            <div>
              <ele-chart :option="Changqu" style="height: 160px" />
            </div>
          </el-card>
        </div>
      </el-col>
      <el-col :span="10">
        <div class="wrap_card wrap-center">
          <el-card>
            <div slot="header" class="title">
              <span>噪声数据分析</span>
            </div>
            <div>
              <ele-chart :option="Noise" style="height: 292px" />
            </div>
          </el-card>
          <el-card>
            <div slot="header" class="title">
              <span>噪声数据对比</span>
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
              <span>阈值警告</span>
            </div>
            <div class="center">
              <table class="data_table">
                <thead>
                  <th>点位</th>
                  <th>报警值</th>
                  <th>阈值</th>
                </thead>
                <tbody>
                  <tr>
                    <td>九号路灯杆</td>
                    <td>64.90</td>
                    <td>60</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </el-card>
          <el-card>
            <div slot="header" class="title">
              <span>智慧路灯监测数据</span>
            </div>
            <div class="center">
              <div class="body-header">
                <div class="flex flex_h_between wraptag">
                  <div>设备ID</div>
                  <div>设备名称</div>
                  <div>监测结果</div>
                </div>
              </div>
            </div>
          </el-card>
          <el-card>
            <div slot="header" class="title">
              <span>设备噪声监控趋势</span>
            </div>
            <div>
              <ele-chart :option="Line" style="height: 160px" />
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
    Noise() {
      return {
        xAxis: [
          {
            type: 'category',
            data: ['0.00', '1.00'],
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
              },
              {
                name: '1.00',
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
    Changqu() {
      return {
        legend: { right: 0 },
        xAxis: [
          {
            type: 'category',
            data: ['0.10', '8.09'],
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
            name: '噪声',
            data: [
              { name: 0.14, value: 40 },
              {
                name: '8.09',
                value: 40
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
        legend: { right: 0 },
        xAxis: {
          type: 'category',
          data: ['00:14', '01:03', '03:00', '04:03', '06:00', '07:03', '08:00']
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            formatter: '{value}'
          },
          splitLine: { show: false }
        },
        dataset: {
          // 提供一份数据。
          source: [
            ['product', '二号路灯杆', '三号路灯杆', '四号路灯杆', '九号路灯杆', '六号路灯杆'],
            ['00:14', 43.3, 85.8, 133, 4, 5],
            ['01:03', 83.1, 73.4, 10, 33, 6],
            ['03:00', 86.4, 65.2, 11, 55, 8],
            ['04:03', 72.4, 53.92, 33, 34, 6],
            ['07:03', 72.4, 53.9, 61, 14, 9],
            ['08:00', 72.4, 53.9, 62, 2, 33]
          ]
        },
        series: [
          { type: 'line', showSymbol: false, smooth: true },
          { type: 'line', showSymbol: false, smooth: true },
          { type: 'line', showSymbol: false, smooth: true },
          { type: 'line', showSymbol: false, smooth: true },
          { type: 'line', showSymbol: false, smooth: true }
        ]
      }
    }
  }
}
</script>
<style lang="scss" scoped>
$text-color: #07d3dd;
.wrap_card:deep.el-card__body {
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
          .data_table {
            width: 100%;
            th,
            td {
              padding: 10px;
              background: rgb(22, 106, 150);
            }
            td {
              background-color: #173c6f;
              text-align: center;
            }
          }
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
