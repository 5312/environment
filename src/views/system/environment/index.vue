<template>
  <div class="container">
    <el-card class="year">
      <span>选择年份：</span>
      <el-date-picker
        v-model="pyear"
        type="year"
        placeholder="请选择年份"
        value-format="yyyy"
      >
      </el-date-picker>
    </el-card>
    <el-card class="money">
      <ul>
        <el-row>
          <el-col :span="6">
            <li class="li1">
              <p class="p">资金使用单位：</p>
              <p class="p1">
                <span>{{ surveyData.conts }}</span> 个
              </p>
            </li>
          </el-col>
          <el-col :span="6">
            <li class="li2">
              <p class="p">拨款总金额：</p>
              <p class="p1">
                <span>{{ surveyData.summoeny }}</span> （万元）
              </p>
            </li>
          </el-col>
          <el-col :span="6">
            <li class="li3">
              <p class="p">已使用金额：</p>
              <p class="p1">
                <span>{{ surveyData.usermoeny }}</span> （万元）
              </p>
            </li>
          </el-col>
          <el-col :span="6">
            <li class="li4">
              <p class="p">使用率：</p>
              <p class="p1">
                <span
                  style="margin-left: 10px"
                  :style="{
                    color: surveyData.lsy > 0 ? 'red' : '#09f309',
                  }"
                  >{{ surveyData.lsy * 100 }}%<i
                    :class="{
                      'el-icon-caret-top': surveyData.lsy > 0 ? true : false,
                      'el-icon-caret-bottom': surveyData.lsy < 0 ? true : false,
                    }"
                  ></i
                ></span>
              </p>
            </li>
          </el-col>
        </el-row>
      </ul>
    </el-card>
    <!-- 拨款情况图 -->
    <el-card header="环保专项资金拨款情况（矿）" class="money">
      <ele-chart :option="approp" style="height: 400px" />
    </el-card>
    <!-- 矿图 -->
    <el-card header="环保专项资金使用情况（季度）" class="money">
      <ele-chart :option="ificat" style="height: 400px" />
    </el-card>
    <!-- 季度图 -->
    <el-card header="环保专项资金使用情况（矿）" class="money">
      <ele-chart :option="quarter" style="height: 400px" />
    </el-card>
  </div>
</template>
<script>
import EleChart from "@/components/EleChart"
import { mapGetters } from "vuex"
export default {
  data () {
    return {
      //   部门ID
      dept: "",
      //   拨款数据
      appropriation: [],
      //   季度数据
      quartData: [],
      //   概况数据
      surveyData: [],
      //   矿数据
      ificationData: [],
      //   选择年份数据
      pyear: "2021",
    }
  },
  components: { EleChart },
  computed: {
    ...mapGetters(["user"]),
    // 拨款情况图
    approp () {
      return {
        title: {
          // text: "环保专项资金拨款情况（矿）",
          subtext: "万元",
          left: "0%",
          top: "0%",
          textStyle: {
            fontSize: "14",
            // color: "#000",
            fontStyle: "normal",
          },
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        legend: {},
        grid: {
          left: "3%",
          right: "2%",
          bottom: "5%",
          containLabel: true,
        },
        xAxis: {
          axisLabel: {
            interval: 0,
            rotate: -45,
            show: true,
            textStyle: {
              // color: "#8DB6DB",
              color: "#fff",
            },
          },
          type: "category",
          data: this.appropriation.map((d) => d.deptname),
        },
        yAxis: {
          type: "value",
          axisLabel: {
            textStyle: {
              // color: "#8DB6DB",
              color: "#fff",
            },
          },
          splitLine: {
            show: false
          }
        },
        series: [
          {
            data: this.appropriation.map((d) => d.p_money),
            type: "bar",
          },
        ],
      }
    },
    // 季度柱形图
    quarter () {
      return {
        title: {
          // text: "环保专项资金使用情况（季度）",
          subtext: "万元",
          left: "0%",
          top: "0%",
          textStyle: {
            fontSize: "14",
            // color: "#000",
            fontStyle: "normal",
          },
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        xAxis: {
          type: "category",
          data: ["第一季度", "第二季度", "第三季度", "第四季度"],
          axisLabel: {
            textStyle: {
              // color: "#8DB6DB",
              color: "#fff",
            },
          },
        },
        yAxis: {
          type: "value",
          axisLabel: {
            textStyle: {
              // color: "#8DB6DB",
              color: "#fff",
            },
          },
          splitLine: {
            show: false
          }
        },

        series: [
          {
            data: this.quartData,
            type: "bar",
            color: "#DC143C",
          },
        ],
      }
    },
    // 四季度矿柱形图
    ificat () {
      return {
        title: {
          // text: "环保专项资金使用情况（矿）",
          subtext: "万元",
          left: "0%",
          top: "0%",
          textStyle: {
            fontSize: "14",
            // color: "#000",
            fontStyle: "normal",
          },
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        legend: {},
        grid: {
          left: "3%",
          right: "2%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: [
          {
            axisLabel: {
              interval: 0,
              rotate: -45,
              show: true,
              textStyle: {
                // color: "#8DB6DB",
                color: "#fff",
              },
            },
            data: this.ificationData.map((d) => d.deptname),
          },
        ],
        yAxis: [
          {
            type: "value",
            axisLabel: {
              textStyle: {
                // color: "#8DB6DB",
                color: "#fff",
              },
            },
            splitLine: {
              show: false
            }
          },
        ],
        series: [
          {
            name: "第一季度",
            type: "bar",
            stack: "Ad",
            emphasis: {
              focus: "series",
            },
            data: this.ificationData.map((d) => d.a_quarter),
          },
          {
            name: "第二季度",
            type: "bar",
            stack: "Ad",
            emphasis: {
              focus: "series",
            },
            data: this.ificationData.map((d) => d.b_quarter),
          },
          {
            name: "第三季度",
            type: "bar",
            stack: "Ad",
            emphasis: {
              focus: "series",
            },
            data: this.ificationData.map((d) => d.c_quarter),
          },
          {
            name: "第四季度",
            type: "bar",
            stack: "Ad",
            emphasis: {
              focus: "series",
            },
            data: this.ificationData.map((d) => d.d_quarter),
          },
        ],
      }
    },
  },
  watch: {
    pyear () {
      this.quart()
      this.survey()
      this.ification()
      this.appropriat()
    },
  },
  mounted () {
    this.getId()
    this.quart()
    this.survey()
    this.ification()
    this.appropriat()
  },
  methods: {
    //   获取部门ID
    getId () {
      this.dept = this.user.dept_id
    },
    // 拨款数据
    appropriat () {
      this.$http
        .get("/hmoney/getCoutsMoneyBo", {
          params: {
            dept_id: this.dept,
            p_year: this.pyear,
          },
        })
        .then((res) => {
          this.appropriation = res.data.data
          // console.log(res.data.data);
        })
    },
    //   季度数据
    quart () {
      this.$http
        .get("/hmoney/getCoutsJidu", {
          params: {
            dept_id: this.dept,
            p_year: this.pyear,
          },
        })
        .then((res) => {
          let arr = []
          let quartdata = res.data.data
          for (const key in quartdata) {
            if (Object.hasOwnProperty.call(quartdata, key)) {
              const element = quartdata[key]
              arr.push(element)
            }
          }
          this.quartData = arr
        })
    },
    //   矿数据
    ification () {
      this.$http
        .get("/hmoney/getCoutsMoney", {
          params: {
            dept_id: this.dept,
            p_year: this.pyear,
          },
        })
        .then((res) => {
          this.ificationData = res.data.data
        })
    },
    //   概况数据
    survey () {
      this.$http
        .get("/hmoney/getCoutsInfo", {
          params: {
            dept_id: this.dept,
            p_year: this.pyear,
          },
        })
        .then((res) => {
          this.surveyData = res.data.data
        })
    },
  },
};
</script>
<style scoped>
* {
  list-style: none;
}
.year {
  margin-top: 10px;
  margin-left: 10px;
}
.money {
  margin-left: 10px;
}
li {
  width: 93%;
  height: 100px;
  background-color: #eee;
  border-radius: 10px;
  padding: 10px 0 0 10px;
}
.p {
  font-size: 20px;
}
.p1 {
  position: relative;
  top: 20px;
  left: 50%;
  font-size: 18px;
}
.p1 span {
  font-size: 24px;
}
.li1 {
  background-color: #3aa1ff;
}
.li2 {
  background-color: #4ecb73;
}
.li3 {
  background-color: #36cbcb;
}
.li4 {
  background-color: #fbd437;
}
</style>