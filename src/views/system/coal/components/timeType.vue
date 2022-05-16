<template>
  <div v-if="index != 3" v-loading="threeLoad">
    <el-row :gutter="10">
      <el-col :span="8">
        <el-card shadow="never">
          <div slot="header" class="clearfix flex">
            <i class="el-icon-refresh gree f"> </i>
            <span>当{{ text }}总能耗</span>
          </div>
          <div class="tadayAll">
            <div class="tnum">
              {{ couts.b }}
            </div>
            <div class="detail">
              {{this.twobtn === "1" ? "吨" : "元",}}
            </div>
          </div>
          <div class="c-bottom">
            <span>当{{ text }}同期</span>
            <span style="margin: 0 20px">{{ couts.y }}</span>
            <span class="gree" v-if="couts.z < 0">
              {{ couts.z * 100 }}%
              <i class="el-icon-caret-bottom"></i>
            </span>
            <!-- 红色 -->
            <span class="red" v-else>
              {{ couts.z * 100 }}%
              <i class="el-icon-caret-top"></i>
            </span>
          </div>
        </el-card>
      </el-col>
      <el-col :span="16">
        <el-card shadow="never">
          <div slot="header" class="clearfix flex">
            <i class="el-icon-data-line gree f"> </i>
            <span>当{{ text }}能源趋势</span>
          </div>
          <ele-chart :option="electricity_trend" style="height: 300px" />
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="10">
      <el-col :span="8">
        <el-card shadow="never">
          <div slot="header" class="clearfix flex">
            <i class="el-icon-refresh gree f"> </i>
            <span>上{{ text }}总能耗</span>
          </div>
          <div class="tadayAll">
            <div class="tnum">
              {{ lastcouts.b }}
            </div>
            <div class="detail">
              {{this.twobtn === "1" ? "吨" : "元",}}
            </div>
          </div>
          <div class="c-bottom">
            <span>上{{ text }}同期</span>
            <span style="margin: 0 20px">{{ lastcouts.y }}</span>
            <span class="gree" v-if="lastcouts.z < 0">
              {{ lastcouts.z * 100 }}%
              <i class="el-icon-caret-bottom"></i>
            </span>
            <!-- 红色 -->
            <span class="red" v-else>
              {{ lastcouts.z * 100 }}%
              <i class="el-icon-caret-top"></i>
            </span>
          </div>
        </el-card>
      </el-col>
      <el-col :span="16">
        <el-card shadow="never">
          <div slot="header" class="clearfix flex">
            <i class="el-icon-data-line gree f"> </i>
            <span>季度能源趋势</span>
          </div>
          <ele-chart :option="electricity" style="height: 300px" />
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
// 组件
import EleChart from "@/components/EleChart"
// 工具
import util from "@/utils/util"

export default {
  name: 'TimeType',
  components: { EleChart },
  props: {
    twobtn: String,
    index: Number,
    department: [Number, String],
    dateValue: String
  },
  data () {
    return {
      // 加载loading
      threeLoad: false,
      // charts _data
      electricity_Data: [],
      // 上年
      lastYearData: [],
      // 
      electricity_trendData: [],
      couts: {
        z: 0,
        b: 0,
        y: 0
      },
      lastcouts: {
        z: 0,
        b: 0,
        y: 0
      }
    }
  },
  computed: {
    text () {
      const obj = {
        1: '月',
        2: '年'
      }
      return obj[this.index]
    },
    electricity_trend () {
      if (this.electricity_trendData.length == 0) return {}
      return {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        title: {
          show: true,
          subtext: this.twobtn === "1" ? "吨" : "元",
          top: "-2.5%"
        },
        legend: {
          data: ["当" + this.text]
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            data: this.electricity_trendData.map(d =>
              d.ahour
                ? d.ahour + "时"
                : d.dates
                  ? d.dates.split("-")[2] + "日"
                  : d.amonth
                    ? d.amonth + "月"
                    : d.ahour + "时"
            ),
            axisLabel: {
              textStyle: {
                color: "#fff"
              }
            }
          }
        ],
        yAxis: [
          {
            type: "value",
            axisLabel: {
              textStyle: {
                color: "#fff"
              }
            }
          }
        ],
        series: [
          {
            name: "当" + this.text,
            type: "bar",
            emphasis: {
              focus: "series"
            },
            data: this.electricity_trendData.map(d =>
              d.count ? d.count : d.shu ? d.shu : ""
            )
          }
        ]
      }
    },
    electricity () {
      if (this.electricity_Data.length == 0) return {}
      return {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        title: {
          show: true,
          subtext: this.twobtn === "1" ? "吨" : "元",
          top: "-2.5%"
        },
        legend: {
          data: ["季度"]
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            data: this.electricity_Data.map(d =>
              d.ahour
                ? d.ahour + "时"
                : d.dates
                  ? d.dates.split("-")[2] + "日"
                  : d.amonth
                    ? d.amonth + "月"
                    : d.ahour ? d.ahour + "时" : '第' + d.quarter + '度'
            ),
            axisLabel: {
              textStyle: {
                color: "#fff"
              }
            }
          }
        ],
        yAxis: [
          {
            type: "value",
            axisLabel: {
              textStyle: {
                color: "#fff"
              }
            }
          }
        ],
        series: [
          {
            name: "季度",
            type: "bar",
            emphasis: {
              focus: "series"
            },
            data: this.electricity_Data.map(d =>
              d.count ? d.count : d.shu ? d.shu : ""
            )
          }
        ]
      }
    },

  },
  watch: {
    index (v) {
      console.log(v)
      if (v != 3) {
        this.nowData()
        this.nowData(true)
      }
    },
    twobtn () {
      this.nowData()
      this.nowData(true)
    },
    department (v) {
      if (this.index != 3) {
        console.log('c:timeType:department:watch', v)

        this.nowData()
        this.nowData(true)
      }
    },
    dateValue () {
      if (this.index != 3) {
        this.nowData()
        this.nowData(true)
      }
    }
  },

  methods: {
    time_date (last = false) {
      const formatter = ['yyyy-MM-dd', "yyyy-MM", "yyyy"]
      // 默认当月 / 年
      let dates = this.dateValue
      // 
      if (this.index == 1 && last) {
        // 上月
        let y = new Date(this.dateValue).getFullYear()
        let m = new Date(this.dateValue).getMonth()
        const lastMonth = y + '-' + util.digit(m, String(m).length + 1)
        dates = util.toDateString(new Date(lastMonth), formatter[this.index])
      }
      // 年
      if (this.index == 2 && last) {
        let y = new Date(this.dateValue).getFullYear() - 1
        dates = String(y)
      }
      return dates
    },
    // 当月 或 当年数据
    async nowData (last = false) {
      this.threeLoad = true

      let dates = this.time_date(last)
      // charts--> data  总能耗 
      this.$http.post("/energy/getCouts", {
        dept_id: this.department,
        road_id: 0,
        cate_id: 4,
        types: this.twobtn,
        datetype: this.index,
        dates: dates
      }).then(tendency => {
        if (tendency.data.code != 0) return this.$message.error(tendency.data.msg)
        // 总能耗
        if (last) { // 上 月/年
          this.lastcouts = tendency.data.data
        } else { // 当 月/年
          this.couts = tendency.data.data
        }

      })
      if (last) return this.getQuarterYear()
      // 月/年 --> 趋势
      let url = {
        0: "/energy/getQsDay",
        1: "/energy/getQsMonth",
        2: "/energy/getQsYear"
      }
      this.$http
        .post(url[this.index], {
          dept_id: this.department,
          road_id: 0,
          cate_id: 4,
          types: this.twobtn,
          dates: dates
        }).then(total_consumption => {
          if (total_consumption.data.code == 0) {
            this.electricity_trendData = total_consumption.data.data.b
          }
        })
      this.threeLoad = false
    },
    async getQuarterYear () {
      let dates = util.toDateString(new Date(this.dateValue), "yyyy")
      const result = await this.$http.get("/energy/getQuarterYear", {
        params: {
          dept_id: this.department,
          road_id: 0,
          cate_id: 4,
          types: this.twobtn,
          datetype: this.index,
          dates: dates
        }
      })
      this.electricity_Data = result.data.data[0]
      this.threeLoad = false
    }
  }
}
</script>
<style lang="scss" scoped>
.el-row {
  margin-bottom: 10px;
  &:nth-child(2) {
    margin-bottom: 0;
  }

  .detail {
    font-size: 14px;
    color: #c0c4cc;
  }
  .c-bottom {
    height: 50px;
    .gree {
      color: #2ad9b2;
    }
    .red {
      color: red;
    }
  }
  .el-card {
    .tadayAll {
      height: 250px;
      text-align: center;
    }
  }
}

.title {
  font-size: 26px;
  position: relative;
}
.right-center {
  padding: 30px;
  text-align: center;
  font-size: 30px;
}
.text-color {
  font-size: 20px;
}

.flex {
  display: flex;
  align-items: center;
}
.f {
  font-size: 26px;
}
.sel {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-content: center;
  justify-content: center;
  align-items: center;
}
.content {
  font-size: 30px;
  padding-top: 50px;
  padding-bottom: 10px;
}
.bottombar {
  padding-top: 15px;
}
.selbtn {
  margin-left: 20px;
}
.selbtn::before {
  content: "";
  padding: 10px;
  height: 100%;
  color: #ddd;
  height: 20px;
  border-left: 1px solid #ddd;
}

.tnum {
  font-size: 60px;
  padding-top: 80px;
}

.c-bottom {
  text-align: center;
  font-size: 20px;
  line-height: 80px;
}
.typeselect_btn {
  display: flex;
  align-items: center;
  flex-direction: column;
}
.typeselect_btn > button {
  margin: 10px 0;
}
.clas {
  padding-right: 10px;
  white-space: nowrap;
}
.t2 {
  padding: 10px 10px;
}
</style>