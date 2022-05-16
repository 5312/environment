<template>
  <div>
    <el-row :gutter="10">
      <el-col :span="8">
        <el-card shadow="never" v-loading="loading1">
          <div slot="header" class="clearfix flex">
            <i class="el-icon-refresh gree f"> </i>
            <span>当{{ text }}总能耗</span>
          </div>
          <div class="tadayAll" style="height: 200px">
            <div class="tnum">
              {{ couts.b }}
            </div>
            <div class="detail">
              {{ convert == 0 ? "标准吨煤" : "元",}}
            </div>
          </div>
          <div class="c-bottom">
            <span>昨日同期</span>
            <span style="margin: 0 20px">{{ couts.y }}</span>
            <PercentageIconColor :number="couts.z" />
          </div>
        </el-card>
      </el-col>
      <el-col :span="16">
        <el-card shadow="never">
          <div slot="header" class="clearfix flex">
            <i class="el-icon-refresh gree f"> </i>
            <span>当{{ text }}能源同比</span>
          </div>
          <el-table
            :data="tableData"
            style="width: 100%"
            height="250"
            v-loading="loading2"
          >
            <el-table-column prop="class" label="能源类型" width="180">
            </el-table-column>
            <el-table-column prop="classname" label="能源用途" width="180">
            </el-table-column>
            <el-table-column
              v-if="convert == 0"
              prop="datas"
              label="能源量 (吨标准煤)"
            >
            </el-table-column>

            <el-table-column v-else prop="datas" label="能源量 (元)">
            </el-table-column>
            <el-table-column prop="dian" label="能源量"> </el-table-column>

            <el-table-column prop="tbi" label="同比">
              <template slot-scope="scope" style="white-space: nowrap">
                <span style="margin-left: 10px">
                  {{ textData(2, scope.$index, scope.row) }}
                </span>
                <PercentageIconColor :number="scope.row.tbi" />
              </template>
            </el-table-column>
          </el-table>
          <!-- table -->
        </el-card>
      </el-col>
    </el-row>
    <!--  -->
    <el-row :gutter="10">
      <el-col :span="8">
        <el-card shadow="never" v-loading="loading3">
          <div slot="header" class="clearfix flex">
            <i class="el-icon-pie-chart gree f"> </i>
            <span>当{{ text }}用能能源占比</span>
          </div>
          <ele-chart
            :option="todayEnergyCountProportion"
            style="height: 323px"
          />
        </el-card>
      </el-col>
      <el-col :span="16">
        <el-card shadow="never" v-loading="loading4">
          <div slot="header" class="clearfix flex">
            <i class="el-icon-data-line gree f"> </i>
            <span>当{{ text }}能源趋势</span>
          </div>
          <ele-chart :option="energyTrend" style="height: 323px" />
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import PercentageIconColor from '@/components/percentageIconColor'
import { getCouts, getCoutsClass, getCoutsClassBili, getQsDay, getQsMonth, getQsYear } from '@/api/mainLay/energy'
import EleChart from "@/components/EleChart"

export default {
  name: 'timeview',
  components: { PercentageIconColor, EleChart },
  props: {
    index: Number,
    convert: Number,
    departmentId: Number,
    dates: String
  },
  data () {
    return {
      day: { b: 0, y: 0, z: 0 },
      month: { b: 0, y: 0, z: 0 },
      year: { b: 0, y: 0, z: 0 },
      loading1: false,
      loading2: false,
      loading3: false,
      loading4: false,
      tableData: [],
      /*  */
      todayEnergyCountProportionData: [],
      electricity_trendData: []
    }
  },
  computed: {
    text () {
      return ['', '日', '月', '年'][this.index]
    },
    couts () {
      if (this.index == 1) {
        return this.day
      } else if (this.index == 2) {
        return this.month
      } else {
        return this.year
      }
    },
    todayEnergyCountProportion () {
      return {
        tooltip: {
          trigger: "item",
        },
        legend: {
          top: "5%",
          left: "center",
        },
        dataset: [
          {
            dimensions: ['classname', 'datas'],
            source: this.todayEnergyCountProportionData
          }
        ],
        series: [
          {
            type: "pie",
            radius: ["40%", "70%"],
            avoidLabelOverlap: false,
            label: {
              show: true,
              position: "center",
              formatter: this.convert == 0 ? "kWh" : "元",
              lineHeght: 30,
            },
            emphasis: {
              label: {
                show: true,
                fontSize: "40",
                fontWeight: "bold",
              },
            },
            labelLine: {
              show: false,
            },
          },
        ],
      }
    },
    energyTrend () {
      return {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
          formatter: function (params) {
            var result = params[0].name + "<br>"
            params.forEach(function (item) {
              if (item.value) {
                let a = item.value.count || item.value.shu
                result += item.marker + " " + "  " + a + "</br>"
              } else {
                result += item.marker + " " + " :  - </br>"
              }
            })
            return result
          }
        },
        title: {
          show: true,
          subtext: this.convert == 0 ? "吨标准煤" : "元",
          top: "-2.5%",
        },
        dataset: [
          {
            source: this.electricity_trendData
          }
        ],
        grid: {
          left: "3%",
          right: "4%",
          bottom: "0%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            axisLabel: {
              textStyle: {
                color: "#fff",
              },
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            axisLabel: {
              textStyle: {
                color: "#fff",
              },
            },
          },
        ],
        series: [
          {
            barWidth: 10,
            type: "bar",
            stack: "电",
            emphasis: {
              focus: "series",
            },
          },
        ],
      }
    }
  },
  watch: {
    departmentId (v) {
      this.getTableAllEnergy(v, this.convert == 0 ? 1 : 2)
      this.getEnergyTongBi()
      this.energyProportion()
      this.trend()
    },
    index () {
      /* 切换会重置 */
      this.getEnergyTongBi(new Date())
      this.energyProportion(new Date())
      this.trend(new Date())

    },
    dates () {
      this.getEnergyTongBi()
      this.energyProportion()
      this.trend()

    },
    convert () {
      this.getEnergyTongBi()
      this.energyProportion()
      this.trend()

    }
  },
  mounted () {
    if (this.departmentId) {
      this.getTableAllEnergy(this.departmentId, this.convert == 0 ? 1 : 2)
      this.getEnergyTongBi()
      this.energyProportion()
      this.trend()
    }
  },
  methods: {
    /* 能源报表同比 */
    async getEnergyTongBi (dates) {
      this.loading2 = true
      let time = dates ? this.$moment(dates).format(['', 'yyyy-MM-DD', 'yyyy-MM', 'yyyy'][this.index]) : this.$moment(this.dates).format(['', 'yyyy-MM-DD', 'yyyy-MM', 'yyyy'][this.index])
      const result_h = await getCoutsClass({
        road_id: 0,
        cate_id: 1,
        dept_id: this.departmentId,
        types: this.convert,

        datetype: this.index - 1,
        dates: time
      })
      this.loading2 = false
      this.tableData = result_h.data
    },
    /* 
    deptId:部门id
    types:换算：0能耗1煤2费用
    */
    async getTableAllEnergy (deptId, types) {
      this.loading1 = true

      /* 日 */
      const days = getCouts({
        road_id: 0,
        cate_id: 1,
        datetype: 0,
        dept_id: deptId,
        types: types,
        dates: this.$moment().format('YYYY-MM-DD'),
      })
      /* 月 */
      const months = getCouts({
        road_id: 0,
        cate_id: 1,
        datetype: 1,
        dept_id: deptId,
        types: types,
        dates: this.$moment().format('YYYY-MM'),
      })
      /* 年 */
      const years = getCouts({
        road_id: 0,
        cate_id: 1,
        datetype: 2,
        dept_id: deptId,
        types: types,
        dates: this.$moment().format('YYYY'),
      })
      const [day, month, year] = await this.$http.all([days, months, years])
      this.loading1 = false
      // 当日总能耗
      this.day = day.data
      this.month = month.data
      this.year = year.data
    },
    /* 日用能源占比 */
    async energyProportion (dates) {
      this.loading3 = true
      let time = dates ? this.$moment(dates).format(['', 'yyyy-MM-DD', 'yyyy-MM', 'yyyy'][this.index]) : this.$moment(this.dates).format(['', 'yyyy-MM-DD', 'yyyy-MM', 'yyyy'][this.index])

      const result_z = await getCoutsClassBili({
        dept_id: this.departmentId,
        road_id: 0,
        cate_id: 1,
        types: this.convert,
        datetype: this.index - 1,
        dates: time,
      })
      this.loading3 = false
      if (result_z.code == 0) {
        this.todayEnergyCountProportionData = result_z.data
      }
    },
    /* 趋势 */
    async trend (dates) {
      this.loading4 = true
      let time = dates ? this.$moment(dates).format(['', 'yyyy-MM-DD', 'yyyy-MM', 'yyyy'][this.index]) : this.$moment(this.dates).format(['', 'yyyy-MM-DD', 'yyyy-MM', 'yyyy'][this.index])

      /* QS接口 */
      if (this.index == 1) {
        const res = await getQsDay({
          dept_id: this.departmentId,
          road_id: 0,
          cate_id: 1,
          types: this.convert,
          dates: time
        })
        let data = res.data
        this.electricity_trendData = data.b
      } else if (this.index == 2) {
        const res = await getQsMonth({
          dept_id: this.departmentId,
          road_id: 0,
          cate_id: 1,
          types: this.convert,
          dates: time
        })
        let data = res.data
        this.electricity_trendData = data.b
      } else {
        const res = await getQsYear({
          dept_id: this.departmentId,
          road_id: 0,
          cate_id: 1,
          types: this.convert,
          dates: time
        })
        let data = res.data
        this.loading4 = false
        this.electricity_trendData = data.b
      }

    },
    textData (index, i, data) {
      if (!data) {
        return
      }
      let obj1 = {
        0: "当日:" + data.b,
        1: "当月:" + data.b,
        2: "当年:" + data.b,
      }
      let obj2 = {
        0: "昨日:" + data.y,
        1: "上月:" + data.y,
        2: "上一年:" + data.y,
      }
      let obj3 = {
        0: "同期环比:",
        1: "同期环比:",
        2: "同期环比:",
      }
      let array = [obj1, obj2, obj3]
      return array[index][i]
    },
  }
}
</script>
<style lang="scss" scoped>
.flex {
  display: flex;
  align-items: center;
}
.gree {
  color: #2ad9b2;
}
.red {
  color: red;
}
.el-row {
  margin-bottom: 15px;
}
.el-row:last-child {
  margin-bottom: 0;
}
.el-card {
  .f {
    font-size: 26px;
  }
  .tadayAll {
    text-align: center;
    .tnum {
      font-size: 60px;
      padding-top: 80px;
    }
    .detail {
      font-size: 14px;
      color: #c0c4cc;
    }
  }
  .c-bottom {
    text-align: center;
    font-size: 20px;
    line-height: 80px;
    height: 50px;
  }
}
</style>