<template>
  <div>
    <el-row :gutter="10" v-loading="meiload">
      <el-col :span="12">
        <el-card shadow="never">
          <div class="title">
            <span v-if="convert == 0">电总能耗</span>
            <span v-else>总费用</span>
            <i class="el-icon-refresh gree"> </i>
            <el-button class="textbtn" type="text">
              <!-- 单位: 吨标准煤 -->
              <span v-if="convert == 0"> 单位: 吨标准煤</span>
              <span v-else>单位:元</span>
            </el-button>
          </div>
          <el-table :show-header="false" :data="mei" style="width: 100%">
            <el-table-column prop="b" label="" width="180">
              <template slot-scope="scope">
                {{ textData(0, scope.$index, scope.row) }}
              </template>
            </el-table-column>
            <el-table-column prop="s" label="" width="180">
              <template slot-scope="scope">
                {{ textData(1, scope.$index, scope.row) }}
              </template>
            </el-table-column>
            <el-table-column prop="z" label="">
              <template slot-scope="scope" style="white-space: nowrap">
                <span style="margin-left: 10px">
                  {{ textData(2, scope.$index, scope.row) }}
                </span>
                <PercentageIconColor :number="scope.row.z" />
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card shadow="never">
          <div class="title">
            电<i class="el-icon-_flash gree"> </i>
            <el-button class="textbtn" type="text">
              <!-- 单位: kWh -->
              <span v-if="convert == 0"> 单位: kWh</span>
              <span v-else>单位:元</span>
            </el-button>
          </div>
          <el-table :show-header="false" :data="dian" style="width: 100%">
            <el-table-column prop="b" label="日期" width="180">
              <template slot-scope="scope">
                {{ textData(0, scope.$index, scope.row) }}
              </template>
            </el-table-column>
            <el-table-column prop="s" label="姓名" width="180">
              <template slot-scope="scope">
                {{ textData(1, scope.$index, scope.row) }}
              </template>
            </el-table-column>
            <el-table-column prop="z" label="地址">
              <template slot-scope="scope">
                <span style="margin-left: 10px">
                  {{ textData(2, scope.$index, scope.row) }}
                </span>
                <PercentageIconColor :number="scope.row.z" />
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>
    <!-- echarts -->
    <!-- 当日用量趋势 -->
    <el-row :gutter="30">
      <el-col>
        <el-card shadow="never" v-loading="todayLoad">
          <!-- header -->
          <div slot="header" class="clearfix">
            <i class="el-icon-_trending-up gree"></i>
            <span>当日用量趋势</span>
            <el-button-group style="float: right; 0;margin:0;">
              <el-button
                style="padding: 5px 10px"
                :type="today == 1 ? 'primary' : ''"
                @click="today = 1"
              >
                {{ convert == 0 ? "总能耗" : "总费用" }}
              </el-button>
              <el-button
                style="padding: 5px 10px"
                :type="today == 0 ? 'primary' : ''"
                @click="today = 0"
                >电
              </el-button>
            </el-button-group>
          </div>
          <!-- body -->
          <el-row>
            <el-col :span="20">
              <ele-chart :option="dailyUsageTrends" style="height: 323px" />
            </el-col>
            <el-col :span="4">
              <el-card class="box-card">
                <div slot="header" class="clearfix">
                  <span>{{ today == 1 ? "当日总用量" : "当日电量" }}</span>
                  <el-button class="textbtn" type="text">
                    {{ today == 1 ? "吨标准煤" : "kWh" }}
                  </el-button>
                </div>
                <div class="right-center" v-if="today == 1">
                  {{ todayAllCount }}
                </div>
                <div class="right-center" v-else>
                  {{ todayTelegram }}
                </div>
              </el-card>
              <!--  -->
              <el-card class="box-card">
                <div slot="header" class="clearfix">
                  <span>{{
                    today == 1 ? "昨日同期总用量" : "昨日同期电量"
                  }}</span>
                  <el-button class="textbtn" type="text">
                    {{ today == 1 ? "吨标准煤" : " kWh" }}
                  </el-button>
                </div>
                <div class="right-center" v-if="today == 1">
                  <PercentageIconColor :number="todayAllCountZ" />
                </div>
                <div class="right-center" v-else>
                  <PercentageIconColor :number="todayTelegramZ" />
                </div>
              </el-card>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <el-card shadow="never" header="当月用量趋势" v-loading="monthLoad">
          <div slot="header" class="clearfix">
            <i class="el-icon-_trending-up gree"></i>
            <span>当月用量趋势</span>
            <el-button-group style="float: right; 0;margin:0;">
              <el-button
                style="padding: 5px 10px"
                :type="month == 1 ? 'primary' : ''"
                @click="month = 1"
              >
                {{ convert == 0 ? "总能耗" : "总费用" }}
              </el-button>
              <el-button
                style="padding: 5px 10px"
                :type="month == 0 ? 'primary' : ''"
                @click="month = 0"
                >电
              </el-button>
            </el-button-group>
          </div>
          <!-- body -->
          <el-row>
            <el-col :span="20">
              <ele-chart :option="monthlyUsageTrend" style="height: 323px" />
            </el-col>
            <el-col :span="4">
              <el-card class="box-card">
                <div slot="header" class="clearfix">
                  <span>{{ month == 1 ? "当月总用量" : "当月电量" }}</span>
                  <el-button class="textbtn" type="text">
                    {{ month == 1 ? "吨标准煤" : "kWh" }}
                  </el-button>
                </div>
                <div class="right-center" v-if="month == 1">
                  {{ monthAllCount }}
                </div>
                <div class="right-center" v-else>
                  {{ telegram }}
                </div>
                <!--  -->
              </el-card>
              <el-card class="box-card">
                <div slot="header" class="clearfix">
                  <span>{{
                    month == 1 ? "上月同期总用量" : "上月同期电量"
                  }}</span>
                  <el-button class="textbtn" type="text">
                    {{ month == 1 ? "吨标准煤" : "kWh" }}
                  </el-button>
                </div>
                <div class="right-center" v-if="month == 1">
                  <PercentageIconColor :number="monthAllCountZ" />
                </div>
                <div class="right-center" v-else>
                  <PercentageIconColor :number="telegramZ" />
                </div>
              </el-card>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
// 红绿状态组件
import PercentageIconColor from '@/components/percentageIconColor'
import { getCouts, getQsDay, getQsMonth } from '@/api/mainLay/energy'
import EleChart from "@/components/EleChart"

// vuex
import { mapGetters } from "vuex"
export default {
  name: 'Overview',
  components: { PercentageIconColor, EleChart },
  props: {
    convert: Number,
    departmentId: Number
  },
  data () {
    return {
      meiload: false,
      mei: [],
      /* table */
      dian: [],
      /* echarts */
      today: 1, // 总能耗 -- 电
      todayLoad: false,
      todayData: [],
      // 月
      month: 1,
      monthLoad: false,
      monthsData: [],
      /* 当日总用量 */
      todayAllCount: 0,
      todayAllCountZ: 0,
      // 月
      monthAllCount: 0,
      monthAllCountZ: 0,
      /* 当日电量 */
      todayTelegram: 0,
      todayTelegramZ: 0,
      telegram: 0,
      telegramZ: 0
      /* deptid */
      // departmentId: null
    }
  },
  watch: {
    /* 用量 -- 费用 */
    convert () {
      /* 顶部表格 */
      this.tableList()
      /* 当日 */
      this.getTodayYestoday()
      /* 当月 */
      this.getMonthLastMonth()
    },
    /* 日 电切换 */
    today () {
      /* 当日 */
      this.getTodayYestoday()
    },
    /* 月 电切换 */
    month () {
      /* 当月 */
      this.getMonthLastMonth()
    },
    departmentId () {
      /* 顶部表格 */
      this.tableList()
      /* 当日 */
      this.getTodayYestoday()
      /* 当月 */
      this.getMonthLastMonth()
    }
  },
  mounted () {
    if (this.departmentId) {
      /* 顶部表格 */
      this.tableList()
      /* 当日 */
      this.getTodayYestoday()
      /* 当月 */
      this.getMonthLastMonth()
    }
  },
  methods: {
    /* 当日昨日请求 */
    async getTodayYestoday () {
      this.todayLoad = true
      // 部门id
      let deptId = this.departmentId
      // 今天
      let toDayTime = this.$moment().format('YYYY-MM-DD')
      // 昨天
      let lastDate = this.$moment().subtract(1, 'days').format('YYYY-MM-DD')
      let types = 0  // 0能耗 1煤 2费用
      if (this.convert == 0) {
        if (this.today == 1) { // 标准吨煤
          types = 1
        } else {
          types = 0
        }
      } else {
        types = 2
      }
      /* 今天 */
      const httpToday = getQsDay({
        road_id: 0,
        cate_id: 1,
        dept_id: deptId,
        types: types,
        dates: toDayTime,
      })
      /* 昨天 */
      const httpYsToday = getQsDay({
        road_id: 0,
        cate_id: 1,
        dept_id: deptId,
        types: types,
        dates: lastDate,
      })

      const [today, yesToday] = await this.$http.all([httpToday, httpYsToday])
      if (today.code == 0 && yesToday.code == 0) {
        this.todayData = [today.data.b, yesToday.data.b]
      } else {
        this.todayData = []
      }
      /* end */
      this.todayLoad = false
    },
    /* 当月上月请求 */
    async getMonthLastMonth () {
      this.monthLoad = true

      // 部门id
      let deptId = this.departmentId
      // 当月
      let month = this.$moment().format('YYYY-MM')
      // 昨天
      let lastMonth = this.$moment().subtract(1, 'month').format('YYYY-MM')
      let types = 0  // 0能耗 1煤 2费用
      if (this.convert == 0) {
        if (this.month == 1) { // 标准吨煤
          types = 1
        } else {
          types = 0
        }
      } else {
        types = 2
      }
      const thismonth = getQsMonth({
        road_id: 0,
        cate_id: 1,
        types: types,
        dept_id: deptId,
        dates: month,
      })
      const lastmonths = getQsMonth({
        road_id: 0,
        cate_id: 1,
        types: types,
        dept_id: deptId,
        dates: lastMonth,
      })
      const [months, lastmonth] = await this.$http.all([thismonth, lastmonths])

      if (months.code == 0 && lastmonth.code == 0) {
        this.monthsData = [months.data.b, lastmonth.data.b]
      } else {
        this.monthsData = []
      }
      this.monthLoad = false
    },
    /* 顶部表格 */
    tableList () {
      let deptId = this.departmentId
      // 用量 1
      // /* 煤 */ 1 和 2
      this.getTableAllEnergy(deptId, this.convert == 0 ? 1 : 2).then(res => {
        this.mei = res
        /* 当日总用量 */
        this.todayAllCount = res[0].b
        this.todayAllCountZ = res[0].z
        /* 月 */
        this.monthAllCount = res[1].b
        this.monthAllCountZ = res[1].z
      })
      /* 电  0  和 2*/
      this.getTableAllEnergy(deptId, this.convert == 0 ? 0 : 2).then(res => {
        this.dian = res
        /* 当日电量 */
        this.todayTelegram = res[0].b
        this.todayTelegramZ = res[0].z
        /* 月 */
        this.telegram = res[1].b
        this.telegramZ = res[1].z
      })
    },
    /* 
    deptId:部门id
    types:换算：0能耗1煤2费用
     */
    async getTableAllEnergy (deptId, types) {
      this.meiload = true

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
      this.meiload = false

      return [day.data, month.data, year.data]
    },
    /*************** element text computed ***************/
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
  },
  /* 计算属性 */
  computed: {
    ...mapGetters(["user"]),
    dailyUsageTrends () {
      let array = this.todayData[0] || []
      let array1 = this.todayData[1] || []

      let subtext = '吨标准煤'
      if (this.convert == 0) {
        if (this.today == 1) {
          subtext = '吨标准煤'
        } else {
          subtext = 'kW h'
        }
      } else {
        subtext = '元'
      }
      return {
        title: {
          subtext: subtext,
        },
        tooltip: {
          trigger: "axis",
        },
        legend: {},
        grid: { top: '11%' },
        dataset: [
          /* 
          {'1时','电':1,'水',2},
          {'2时','电':2,'水',3}
          */
          { dimensions: ['ahour', 'count'], source: array },
          { dimensions: ['ahour', 'count'], source: array1 }

        ],
        toolbox: { /* 工具栏 */
          show: true,
          feature: {
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ["line", "bar"] },
            restore: { show: true },
            saveAsImage: { show: true },
          },
        },
        calculable: true,
        xAxis: [
          {
            type: "category",
            axisLabel: {
              color: "#fff",
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            axisLabel: {
              color: "#fff",
            },
            splitLine: {
              show: false
            }
          },
        ],
        series: [
          {
            name: "今日",
            type: "bar",
            datasetIndex: 0
          },
          {
            name: "昨日",
            type: "bar", datasetIndex: 1
          },
        ],
      }
    },
    monthlyUsageTrend () {
      let array = this.monthsData[0] || []
      let array1 = this.monthsData[1] || []
      let subtext = '吨标准煤'
      if (this.convert == 0) {
        if (this.month == 1) {
          subtext = '吨标准煤'
        } else {
          subtext = 'kW h'
        }
      } else {
        subtext = '元'
      }
      return {
        title: {
          subtext: subtext,
        },
        tooltip: {
          trigger: "axis",
        },
        legend: {},
        grid: { top: '11%' },
        toolbox: { /* 工具栏 */
          show: true,
          feature: {
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ["line", "bar"] },
            restore: { show: true },
            saveAsImage: { show: true },
          },
        },
        xAxis: [
          {
            type: "category",
            data: array.map(d => d.dates),
            axisLabel: {
              color: "#fff",
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            axisLabel: {
              color: "#fff",
            },
            splitLine: {
              show: false
            }
          },
        ],
        series: [
          {
            name: "当月",
            type: "bar",
            data: array.map(d => d.shu)
          },
          {
            name: "上月",
            type: "bar",
            data: array1.map(d => d.shu)
          },
        ],
      }
    },
  },
}
</script>
<style lang="scss" scoped>
.el-row {
  margin-bottom: 15px;
}
.gree {
  color: #2ad9b2;
}
.right-center {
  padding: 30px;
  text-align: center;
  font-size: 30px;
}
.title {
  font-size: 26px;
  position: relative;
}
.textbtn {
  float: right;
  padding: 3px 0;
}
</style>