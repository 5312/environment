<template>
  <div class="ele-body">
    <el-row :gutter="20">
      <el-col :span="7">
        <div class="wrap_card">
          <el-card>
            <div slot="header" class="title">
              <span>处理水量</span>
            </div>
            <div class="card-body">
              <el-button-group>
                <el-button type="primary" size="mini">日</el-button>
                <el-button size="mini">月</el-button>
                <el-button size="mini">年</el-button>
              </el-button-group>
              <ele-chart :option="watterCount" style="height: 100%" />
            </div>
          </el-card>
          <el-card>
            <div slot="header" class="title">
              <span>矿区综合利用量</span>
            </div>
            <div class="card-body">
              <ele-chart :option="mine" style="height: 100%" />
            </div>
          </el-card>
        </div>
      </el-col>
      <el-col :span="7">
        <div class="wrap_card">
          <el-card>
            <div slot="header" class="title">
              <span>内循环水量</span>
            </div>
            <div class="card-body">
              <ele-chart :option="innerLoop" style="height: 100%" />
            </div>
          </el-card>
          <el-card>
            <div slot="header" class="title">
              <span>回用率(单位:天)</span>
            </div>
            <div class="card-body">
              <el-row>
                <el-col :span="12">
                  <div>工业区矿井污水处理站</div>
                  <ele-chart :option="recycleRate" style="height: 150px" />
                </el-col>
                <el-col :span="12">
                  <div>二盘区矿井污水处理站</div>
                  <ele-chart :option="recycleRate" style="height: 150px" />
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <div>生后区生活污水处理站</div>

                  <ele-chart :option="recycleRate" style="height: 150px" />
                </el-col>
                <el-col :span="12">
                  <div>工业区生活污水处理站</div>

                  <ele-chart :option="recycleRate" style="height: 150px" />
                </el-col>
              </el-row>
            </div>
          </el-card>
        </div>
      </el-col>
      <el-col :span="10">
        <div class="wrap_card">
          <el-card class="card_left">
            <div slot="header" class="title">
              <span>矿井总排量及污染指标</span>
            </div>
            <div class="top">
              <span>综合利用量</span>
              <span>100吨</span>
            </div>
            <!--  v-for="(x, y) in rightTable" :key="y" -->
            <div class="table">
              <div class="col">
                <div class="vertical">生活区</div>
              </div>
              <div class="col">
                <div>好氧池</div>
                <!--田字格 -->
                <div class="field">
                  <div>1# 污泥浓度:3388.17mg/L</div>
                  <div>2# 污泥浓度:3388.17mg/L</div>
                  <div>1# 溶解氧:6.28mg/L</div>
                  <div>2# 溶解氧:1.17mg/L</div>
                </div>
              </div>
            </div>
            <div class="table">
              <div class="col">
                <div class="vertical">工业区</div>
              </div>
              <div class="col">
                <div>好氧池</div>
                <!--田字格 -->
                <div class="field">
                  <div>1# 污泥浓度:3388.17mg/L</div>
                  <div>2# 污泥浓度:3388.17mg/L</div>
                  <div>1# 溶解氧:6.28mg/L</div>
                  <div>2# 溶解氧:1.17mg/L</div>
                </div>
              </div>
            </div>
            <div class="table">
              <div class="col">
                <div class="vertical">二盘区</div>
              </div>
              <div class="col">
                <!--田字格 -->
                <div class="field">
                  <div>进水参数</div>
                  <div></div>
                  <div>进水浊度:25.00NTU</div>
                  <div>进水浊度:25.00NTU</div>
                </div>
              </div>
            </div>
            <div class="table">
              <div class="col">
                <div class="vertical">高效旋流</div>
              </div>
              <div class="col">
                <!--田字格 -->
                <div class="field">
                  <div>进水参数</div>
                  <div></div>
                  <div>进水浊度:25.00NTU</div>
                  <div>进水浊度:25.00NTU</div>
                </div>
              </div>
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
    return {
      rightTable: [{}, {}, {}, {}]
    }
  },

  computed: {
    watterCount() {
      return {
        legend: {},
        dataset: {
          // 提供一份数据。
          source: [
            ['product', '生活区污水', '二盘曲', '工业区生活污水'],
            ['00:00', 43.3, 85.8, 93.7],
            ['02:00', 83.1, 73.4, 55.1],
            ['04:00', 86.4, 65.2, 82.5],
            ['06:00', 72.4, 53.9, 39.1]
          ]
        },
        xAxis: [
          {
            type: 'category',
            show: true,
            axisLabel: { color: '#fff' },
            axisTick: { show: false }
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
          { type: 'line', smooth: true },
          { type: 'line', smooth: true },
          { type: 'line', smooth: true }
        ]
      }
    },
    mine() {
      return {
        xAxis: [
          {
            type: 'category'
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
        dataset: {
          source: [
            ['product', '井下生产,消尘'],
            ['井下生产,消尘', 43.3],
            ['冲厕,绿化,搅拌站', 83.1],
            ['洗煤厂,装车', 86.4]
          ]
        },
        series: [{ type: 'bar' }]
      }
    },
    innerLoop() {
      return {
        legend: {},
        dataset: {
          // 提供一份数据。
          source: [
            ['product', '生活区污水', '二盘曲', '工业区生活污水'],
            ['00:00', 43.3, 85.8, 93.7],
            ['02:00', 83.1, 73.4, 55.1],
            ['04:00', 86.4, 65.2, 82.5],
            ['06:00', 72.4, 53.9, 39.1]
          ]
        },
        xAxis: [
          {
            type: 'category',
            show: true,
            axisLabel: { color: '#fff' },
            axisTick: { show: false }
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
          { type: 'line', smooth: true },
          { type: 'line', smooth: true },
          { type: 'line', smooth: true }
        ]
      }
    },
    recycleRate() {
      return {
        series: [
          {
            type: 'liquidFill',
            radius: '80%',
            center: ['50%', '50%'],
            left: 'center',
            top: 'middle',
            color: [
              {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: 'rgba(9,152,200,0.6)'
                  },
                  {
                    offset: 1,
                    color: '#0ABC98'
                  }
                ],
                globalCoord: false
              }
            ],
            data: [0.3, 0.3], // data个数代表波浪数
            backgroundStyle: {
              borderWidth: 1,
              color: '#3D4A73'
            },
            label: {
              normal: {
                textStyle: {
                  fontSize: 18,
                  color: ' rgba(255,255,255,0.60)'
                }
              }
            },
            outline: {
              show: false,
              borderDistance: 0,
              itemStyle: {
                borderWidth: 2,
                borderColor: '#112165'
              }
            }
          }
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
    & > .card_left {
      height: 100% !important;
    }
    .el-card {
      height: 50%;
      // height: calc(100% / 2);
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
        .card-body {
          height: 100%;
        }
        .top {
          font-size: 0;
          span {
            font-size: 18px;
          }
          span:nth-child(1) {
            color: $text-color;
          }
          span:nth-child(2) {
            float: right;
          }
        }
        .table {
          position: relative;
          left: -15px;
          margin-top: 10px;
          width: calc(100% + 30px);
          font-size: 0;
          overflow: hidden;
          height: calc(100% / 4 - 15px);
          .col {
            height: calc(100% - 2px);
            width: 10%;
            display: inline-block;
            vertical-align: top;
            font-size: 14px;
            border: 1px solid $text-color;
            .vertical {
              width: 20px;
              line-height: 24px;
              /* 垂直居中 */
              position: relative;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
            }
            div {
              padding: 10px 0;
            }
          }
          .col:nth-child(1) {
            border-right: none;
          }
          .col:nth-child(2) {
            text-align: center;
            /* - 边框 */
            width: calc(90% - 4px);
            .field {
              font-size: 0;
              border-top: 1px solid $text-color;
              padding: 0 10px;
              height: calc(100% - 39px);
              div {
                width: 50%;
                height: calc(50% - 20px);
                line-height: 300%;
                overflow: hidden;
                display: inline-block;
                font-size: 14px;
                text-align: left;
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
}
</style>
