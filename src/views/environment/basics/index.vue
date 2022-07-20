<template>
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
            <el-radio-group v-model="radio">
              <el-radio :label="3">二盘区</el-radio>
              <el-radio :label="6">工业区</el-radio>
              <el-radio :label="9">生活区</el-radio>
              <el-radio :label="8">高效旋流</el-radio>
            </el-radio-group>
            <div slot="header" class="title">
              <span>企业用水</span>
            </div>
            <div>
              <ele-chart :option="Company" style="height: 160px" />
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
            <div class="h100">
              <img class="img h100" :src="require('@/assets/大气监测.png')" alt="加载失败" />
              <!-- <ele-chart :option="Atmospheric" style="height: 292px" /> -->
            </div>
          </el-card>
          <el-card>
            <div slot="header" class="title">
              <span>噪声监测</span>
            </div>
            <div>
              <ele-chart :option="Noise" style="height: 160px" />
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
              <ele-chart :option="Bar" style="height: 292px" />
            </div>
          </el-card>
          <el-card>
            <div slot="header" class="title">
              <span>危险废物</span>
            </div>
            <div>
              <ele-chart :option="Danger" style="height: 292px" />
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
    return { radio: 3 }
  },
  computed: {
    /*二盘区水质 */
    WatterQuality() {
      return {
        legend: {},
        dataset: {
          source: [
            ['product', '进水浊度', '出水浊度', '出水浊度2'],
            ['12:00', 10, 20, 30],
            ['14:00', 10, 20, 30],
            ['16:00', 10, 20, 30],
            ['18:00', 10, 20, 30],
            ['20:00', 10, 20, 30],
            ['22:00', 10, 20, 30],
            ['00:00', 10, 20, 30],
            ['02:00', 10, 20, 30],
            ['04:00', 10, 20, 30],
            ['06:00', 10, 20, 30],
            ['08:00', 10, 20, 30],
            ['10:00', 10, 20, 30]
          ]
        },
        xAxis: {
          type: 'category',
          data: [
            '12:00',
            '14:00',
            '16:00',
            '18:00',
            '20:00',
            '22:00',
            '00:00',
            '02:00',
            '04:00',
            '06:00',
            '08:00',
            '10:00'
          ]
        },
        yAxis: {
          type: 'value'
        },
        series: [
          { type: 'line', smooth: true },
          { type: 'line', smooth: true },
          { type: 'line', smooth: true }
        ]
      }
    },
    /* 高效旋流水质 */
    Swirl() {
      return {
        legend: {},
        dataset: {
          source: [
            ['product', '进水浊度', '1#旋流器', '2#旋流器', '3#旋流器'],
            ['12:00', 10, 20, 30, 40],
            ['14:00', 10, 20, 30, 40],
            ['16:00', 10, 20, 30, 40],
            ['18:00', 10, 20, 30, 40],
            ['20:00', 10, 20, 30, 40],
            ['22:00', 10, 20, 30, 40],
            ['00:00', 10, 20, 30, 40],
            ['02:00', 10, 20, 30, 40],
            ['04:00', 10, 20, 30, 40],
            ['06:00', 10, 20, 30, 40],
            ['08:00', 10, 20, 30, 40],
            ['10:00', 10, 20, 30, 40]
          ]
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: [
            '12:00',
            '14:00',
            '16:00',
            '18:00',
            '20:00',
            '22:00',
            '00:00',
            '02:00',
            '04:00',
            '06:00',
            '08:00',
            '10:00'
          ]
        },
        yAxis: {
          type: 'value'
        },
        series: [
          { name: '进水浊度', type: 'line' },
          { name: '1#旋流器', type: 'line' },
          { name: '2#旋流器', type: 'line' },
          { name: '3#旋流器', type: 'line' }
        ]
      }
    },
    /* 企业用水 */
    Company() {
      return {
        title: {
          subtext: '3百吨'
        },
        xAxis: {
          type: 'category',
          data: ['12:00', '15:00', '18:00', '21:00', '00:00', '03:00', '06:00', '9:00']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [120, 200, 150, 80, 70, 110, 130, 90],
            type: 'bar',
            showBackground: true,
            backgroundStyle: {
              color: 'rgba(180, 180, 180, 0.2)'
            }
          }
        ]
      }
    },

    /* 噪声监测 */
    Noise() {
      return {
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category'
        },
        yAxis: {
          type: 'value'
        },
        dataset: {
          source: [
            ['product', '48'],
            ['08:00', 40],
            ['09:00', 40],
            ['10:00', 40],
            ['11:00', 40],
            ['12:00', 40],
            ['13:00', 40]
          ]
        },
        series: [
          {
            name: '2011',
            type: 'line'
          }
        ]
      }
    },
    /* 矸石销量*/
    Bar() {
      return {
        legend: {},
        xAxis: {
          type: 'category'
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            formatter: '{value}万吨'
          },
          splitLine: { show: false }
        },
        dataset: {
          source: [
            ['procuct', '当前', '当月', '今年'],
            ['2021.05', 100, 200, 1000],
            ['2021.06', 3, 4, 6],
            ['2021.07', 3, 4, 6],
            ['2021.08', 3, 4, 6],
            ['2021.09 ', 3, 4, 6]
          ]
        },
        series: [
          {
            name: '湿度',
            type: 'bar'
          }
        ]
      }
    },
    /* 危险废物 */
    Danger() {
      return {
        legend: { bottom: 0 },
        radar: {
          // shape: 'circle',
          indicator: [
            { name: '废容器', max: 1000 },
            { name: '废油', max: 1000 },
            { name: '废药剂', max: 1000 },
            { name: '废电池', max: 1000 },
            { name: '其他危废', max: 1000 }
          ]
        },
        series: [
          {
            name: 'ding',
            type: 'radar',
            areaStyle: {},
            data: [
              {
                value: [1000, 100, 100, 400, 100],
                name: '出库量'
              },
              {
                value: [1000, 200, 800, 400, 300],
                name: '入库量'
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
.h100 {
  height: 100%;
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
