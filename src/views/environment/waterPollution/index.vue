<template >
  <div class="ele-body">
    <el-row :gutter="20">
      <el-col :span="7">
        <div class="wrap_card">
          <el-card>
            <div slot="header" class="title">
              <span>处理水量</span>
            </div>
            <div class="card-body">
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
              <ele-chart :option="recycleRate" style="height: 100%" />
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
                <!-- <div>好氧池</div> -->
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
                <!-- <div>好氧池</div> -->
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
import EleChart from "@/components/EleChart"
export default {
  components: { EleChart },
  data () {
    return {
      rightTable: [{}, {}, {}, {}]
    }
  },
  computed: {
    watterCount () {
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
    mine () {
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
            type: 'bar',
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
    innerLoop () {
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
    recycleRate () {
      return {
        dataset: [
          {
            // 这个 dataset 的 index 是 `0`。
            source: [
              ['Product', 'Sales', 'Price', 'Year'],
              ['Cake', 123, 32, 2011],
              ['Cereal', 231, 14, 2011],
              ['Tofu', 235, 5, 2011],
              ['Dumpling', 341, 25, 2011],
              ['Biscuit', 122, 29, 2011],
              ['Cake', 143, 30, 2012],
              ['Cereal', 201, 19, 2012],
              ['Tofu', 255, 7, 2012],
              ['Dumpling', 241, 27, 2012],
              ['Biscuit', 102, 34, 2012],
              ['Cake', 153, 28, 2013],
              ['Cereal', 181, 21, 2013],
              ['Tofu', 395, 4, 2013],
              ['Dumpling', 281, 31, 2013],
              ['Biscuit', 92, 39, 2013],
              ['Cake', 223, 29, 2014],
              ['Cereal', 211, 17, 2014],
              ['Tofu', 345, 3, 2014],
              ['Dumpling', 211, 35, 2014],
              ['Biscuit', 72, 24, 2014]
            ]
            // id: 'a'
          },
          {
            // 这个 dataset 的 index 是 `1`。
            // 这个 `transform` 配置，表示，此 dataset 的数据，来自于此 transform 的结果。
            transform: {
              type: 'filter',
              config: { dimension: 'Year', value: 2011 }
            }
            // 我们还可以设置这些可选的属性： `fromDatasetIndex` 或 `fromDatasetId`。
            // 这些属性，指定了，transform 的输入，来自于哪个 dataset。例如，
            // `fromDatasetIndex: 0` 表示输入来自于 index 为 `0` 的 dataset 。又例如，
            // `fromDatasetId: 'a'` 表示输入来自于 `id: 'a'` 的 dataset。
            // 当这些属性都不指定时，默认认为，输入来自于 index 为 `0` 的 dataset 。
          },
          {
            // 这个 dataset 的 index 是 `2`。
            // 同样，这里因为 `fromDatasetIndex` 和 `fromDatasetId` 都没有被指定，
            // 那么输入默认来自于 index 为 `0` 的 dataset 。
            transform: {
              // 这个类型为 "filter" 的 transform 能够遍历并筛选出满足条件的数据项。
              type: 'filter',
              // 每个 transform 如果需要有配置参数的话，都须配置在 `config` 里。
              // 在这个 "filter" transform 中，`config` 用于指定筛选条件。
              // 下面这个筛选条件是：选出维度（ dimension ）'Year' 中值为 2012 的所有
              // 数据项。
              config: { dimension: 'Year', value: 2012 }
            }
          },
          {
            // 这个 dataset 的 index 是 `3`。
            transform: {
              type: 'filter',
              config: { dimension: 'Year', value: 2013 }
            }
          }
        ],
        series: [
          {
            type: 'pie',
            radius: 50,
            center: ['25%', '50%'],
            // 这个饼图系列，引用了 index 为 `1` 的 dataset 。也就是，引用了上述
            // 2011 年那个 "filter" transform 的结果。
            datasetIndex: 1
          },
          {
            type: 'pie',
            radius: 50,
            center: ['50%', '50%'],
            datasetIndex: 2
          },
          {
            type: 'pie',
            radius: 50,
            center: ['75%', '50%'],
            datasetIndex: 3
          }
        ]
      }
    },

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