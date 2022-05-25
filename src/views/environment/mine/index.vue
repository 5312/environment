<template >
  <div class="ele-body">
    <el-row :gutter="20">
      <el-col :span="15">
        <div class="wrap_card wrap-center">
          <el-card>
            <div slot="header" class="title">
              <span>矿山治理情况</span>
            </div>
            <div>
              <ele-chart :option="mine" style="height: 292px" />
            </div>
          </el-card>
          <el-card>
            <div slot="header" class="title">
              <span>矿山植被覆盖</span>
            </div>
            <div>
              <ele-chart :option="mine" style="height: 292px" />
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
              <ele-chart :option="green" style="height: 160px" />
            </div>
          </el-card>
          <el-card>
            <div slot="header" class="title">
              <span>碳排放情况</span>
            </div>
            <div>
              <ele-chart :option="tan" style="height: 160px" />
            </div>
          </el-card>
          <el-card>
            <div slot="header" class="title">
              <span>生态治理情况</span>
            </div>
            <div>
              <ele-chart :option="sheng" style="height: 160px" />
            </div>
          </el-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import EleChart from "@/components/EleChart"
import * as echarts from 'echarts'
export default {
  components: { EleChart },
  data () {
    return {
    }
  },
  computed: {
    mine () {
      return {}
    },
    green () {
      return {}
    },
    tan () {
      return {
        xAxis: {
          type: 'category',
          data: ['2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [120, 200, 150, 80, 70, 110, 130, 20, 20, 212, 90, 100],
            type: 'bar',
            showBackground: true,
            backgroundStyle: {
              color: 'rgba(180, 180, 180, 0.2)'
            }
          }
        ]
      }
    },
    sheng () {
      return {
        color: ['#80FFA5', '#00DDFF', '#37A2FF', '#FF0087', '#FFBF00'],
        legend: {},
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            data: ['2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021']
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '生态治理面积',
            type: 'line',
            stack: 'Total',
            smooth: true,
            lineStyle: {
              width: 0
            },
            showSymbol: false,
            areaStyle: {
              opacity: 0.8,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: 'rgb(128, 255, 165)'
                },
                {
                  offset: 1,
                  color: 'rgb(1, 191, 236)'
                }
              ])
            },
            emphasis: {
              focus: 'series'
            },
            data: [140, 232, 101, 264, 90, 340, 250, 100, 200, 90, 10, 80]
          },
          {
            name: '生态环境投入',
            type: 'line',
            stack: 'Total',
            smooth: true,
            lineStyle: {
              width: 0
            },
            showSymbol: false,
            areaStyle: {
              opacity: 0.8,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: '#093065'
                },
                {
                  offset: 1,
                  color: '#0B224C'
                }
              ])
            },
            emphasis: {
              focus: 'series'
            },
            data: [140, 232, 101, 264, 90, 340, 250, 100, 200, 90, 10, 80]
          },
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