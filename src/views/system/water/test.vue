<template>
  <div class="ele-body">
    <div class="topbar">
      <div class="clas t2">标签:</div>
      <el-button
        :type="index == 0 ? 'primary' : ''"
        @click="typeSelect(0)"
        size="small"
        >支路</el-button
      >
      <el-button
        :type="index == 1 ? 'primary' : ''"
        @click="typeSelect(1)"
        size="small"
        >分项</el-button
      >
      <el-button
        :type="index == 2 ? 'primary' : ''"
        @click="typeSelect(2)"
        size="small"
        >部门</el-button
      >
      <el-button
        :type="index == 3 ? 'primary' : ''"
        @click="typeSelect(3)"
        size="small"
        >分区</el-button
      >
      <div class="sel" v-if="index == 0">
        <div class="clas t2">选择支路:</div>
        <div class="ui-theme">
          <treeselect
            class="tree"
            v-model="editForm.dept_id"
            :options="deptList"
            noChildrenText="暂无设备"
            @input="treeinput"
            placeholder="请选择支路"
            :defaultExpandLevel="3"
            :normalizer="
              (d) => {
                return {
                  id: d.id,
                  label: d.title,
                  children: d.child || undefined,
                };
              }
            "
          />
        </div>
      </div>
      <div class="sel selbtn" v-else>
        <el-button
          :type="date == 0 ? 'primary' : ''"
          @click="datesel(0)"
          size="small"
          >日</el-button
        >
        <el-button
          :type="date == 1 ? 'primary' : ''"
          @click="datesel(1)"
          size="small"
          >月</el-button
        >
        <el-button
          :type="date == 2 ? 'primary' : ''"
          @click="datesel(2)"
          size="small"
          >年</el-button
        >
        <div class="clas t2">日期:</div>
        <el-date-picker
          v-model="value1"
          :type="dateType"
          @change="change"
          placeholder="选择日期"
          :value-format="valueFormat"
        >
        </el-date-picker>
      </div>
      <treeselect
        v-if="permission.includes('sys:xiala:view')"
        class="depart"
        v-model="dept"
        :options="depart"
        placeholder="请选择"
        :defaultExpandLevel="3"
        :normalizer="
          (d) => {
            return {
              id: d.id,
              label: d.name,
              children: d.children || undefined,
            };
          }
        "
      />
    </div>
    <div v-if="index == 0" key="123132" class="type-zhilu">
      <el-row :gutter="10">
        <el-col :span="6">
          <el-card shadow="never" v-loading="benyue">
            <div class="title">本月用水(t)<i class="ic el-icon-date"></i></div>

            <div class="content">
              {{ month.b }}
            </div>
            <div class="bottombar">
              上月同期 {{ month.y }}
              <span
                :style="{
                  color: month.z * 1 < 0 ? '#09f309' : 'red',
                }"
                >{{ month.z }}%
                <i
                  :class="{
                    'el-icon-caret-bottom': month.z * 1 < 0 ? true : false,
                    'el-icon-caret-top': month.z * 1 < 0 ? false : true,
                  }"
                ></i
              ></span>
            </div>
          </el-card>
          <el-card shadow="never" v-loading="jinri">
            <div class="title">今日用水(t)<i class="ic el-icon-date"></i></div>

            <div class="content">
              {{ day.b }}
            </div>
            <div class="bottombar">
              昨日同期 {{ day.y }}
              <span :style="{ color: month.z * 1 < 0 ? '#09f309' : 'red' }"
                >{{ day.z }}%<i
                  :class="{
                    'el-icon-caret-bottom': month.z * 1 < 0 ? true : false,
                    'el-icon-caret-top': month.z * 1 < 0 ? false : true,
                  }"
                ></i
              ></span>
            </div>
          </el-card>
        </el-col>
        <el-col :span="18">
          <el-card shadow="never" header="今日用水">
            <!-- 1 -->
            <ele-chart
              v-loading="today_shui_load"
              :option="today_branch"
              style="height: 323px"
            />
          </el-card>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="24">
          <el-card shadow="never" header="今日支路用水">
            <el-row v-loading="today_shui_three">
              <el-col :span="2">
                <div class="typeselect_btn">
                  <el-button
                    :type="t1_date == 0 ? 'primary' : ''"
                    @click="t1_datefunc(0)"
                    size="small"
                    >日</el-button
                  >
                  <el-button
                    :type="t1_date == 1 ? 'primary' : ''"
                    @click="t1_datefunc(1)"
                    size="small"
                    >月</el-button
                  >
                  <el-button
                    :type="t1_date == 2 ? 'primary' : ''"
                    @click="t1_datefunc(2)"
                    size="small"
                    >年</el-button
                  >
                </div>
              </el-col>
              <el-col :span="22">
                <ele-chart :option="today_branch_three" style="height: 323px" />
              </el-col>
            </el-row>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <div
      v-if="index == 1 ? true : index == 2 ? true : index == 3 ? true : false"
      class="type-zhilu"
      key="1qewqe"
    >
      <el-row :gutter="10">
        <el-col :span="8">
          <el-card shadow="never" header="分项用水占比" v-loading="echart1">
            <ele-chart :option="electricity" style="height: 323px" />
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card
            shadow="never"
            header="分项用水增幅 TOP5"
            v-loading="echart2"
          >
            <ele-chart :option="electricity_increase" style="height: 323px" />
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card shadow="never" header="分项用水 TOP5" v-loading="echart3">
            <ele-chart :option="sub_option" style="height: 323px" />
          </el-card>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="8">
          <el-card shadow="never" header="分项用水环比" v-loading="echart4">
            <ele-chart :option="electricity_ring" style="height: 323px" />
          </el-card>
        </el-col>
        <el-col :span="16">
          <el-card shadow="never" header="分项用水趋势" v-loading="echart5">
            <ele-chart :option="electricity_trend" style="height: 323px" />
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import EleChart from "@/components/EleChart"
import Treeselect from "@riophae/vue-treeselect" // 下拉树
import "@riophae/vue-treeselect/dist/vue-treeselect.css"
import { mapGetters } from "vuex"
import util from "@/utils/util"

export default {
  components: { EleChart, Treeselect },
  name: "test",
  data () {
    return {
      // 加载图
      benyue: false,
      jinri: false,
      echart1: false,
      echart2: false,
      echart3: false,
      echart4: false,
      echart5: false,
      // 加载图
      valueFormat: "yyyy-MM-dd",
      t1_date: 0,
      date: 0,
      index: 0,
      value1: "",
      deptList: [], // 部门列表
      editForm: {},
      dateType: "date",
      /**/
      // 本月用水
      month: {
        b: 0,
        y: 0,
        z: 0,
      },
      // 本日用水
      day: {
        b: 0,
        y: 0,
        z: 0,
      },
      today_shui_load: false,
      today_shui_three: false,
      /**/
      pgfData: [],
      pgfData1: [],
      value: "",
      today_branchData: [],
      today_branch_threeData: [],
      today_branch_threeData_pie1: [],
      today_branch_threeData_pie2: [],
      electricityData: [], // 用水占比数据
      electricity_ringData: [],
      electricity_increaseData: [], // 用水增幅数据
      sub_optionData: [],
      electricity_trendData: [],
      dept: "",
      depart: [],
    }
  },
  watch: {
    index (old) {
      if (old == 1) {
        this.typeSubOption()
      }
      if (old == 2) {
        this.typeSubOption()
      }
      if (old == 3) {
        this.typeSubOption()
      }
    },
    dept () {
      this.getCouts() // 总量查询
      this.getDeptList() // 查询部门列表
      this.departs()
      this.typeSubOption()
    },
  },
  mounted () {
    /***********/
    this.getCouts() // 总量查询
    this.getId()
    this.getDeptList() // 查询部门列表
    this.departs()
    this.department()
  },
  computed: {
    ...mapGetters(["permission", "user"]),
    // 1 - 今日支路用水
    today_branch () {
      return {
        color: "#975fe5",
        tooltip: {
          trigger: "axis",
          formatter:
            '<i class="ele-chart-dot" style="background-color:#975fe5;"></i>{b0}: {c0}',
        },
        xAxis: [
          {
            show: true,
            type: "category",
            boundaryGap: false,
            data: this.today_branchData.map((d) => d.ahour),
            axisLabel: {
              textStyle: {
                color: "#fff",
              },
            },
          },
        ],
        yAxis: [
          {
            show: true,
            type: "value",
            splitLine: { show: false },
            axisLabel: {
              textStyle: {
                color: "#fff",
              },
            },
          },
        ],
        series: [
          {
            type: "line",
            smooth: true,
            animation: false,
            symbol: "none",
            areaStyle: { opacity: 0.5 },
            data: this.today_branchData.map((d) => d.count),
          },
        ],
      }
    },
    // 三图
    today_branch_three () {
      return {
        title: {
          text: "",
          subtext: "t",
          top: "-4%",
        },
        tooltip: {
          trigger: "item",
        },
        legend: {
          type: "scroll",
          data: ["今日", "昨日"],
        },
        grid: {
          width: "95%",
        },

        calculable: true,
        xAxis: [
          {
            type: "category",
            data: this.today_branch_threeData.map((d) =>
              d.ahour
                ? d.ahour + "时"
                : d.dates
                  ? d.dates + "日"
                  : d.amonth
                    ? d.amonth + "月"
                    : d.ahour + "时"
            ),
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
            name: "今日",
            center: ["10%", "50%"],
            type: "bar",
            data: this.today_branch_threeData.map((d) =>
              d.count ? d.count : d.shu ? d.shu : ""
            ),
          },
        ],
      }
    },
    // 分项用水占比 pie1
    electricity () {
      // 用水占比配置
      return {
        tooltip: {
          trigger: "item",
        },
        legend: {
          top: "5%",
          left: "center",
        },
        series: [
          {
            name: "",
            type: "pie",
            radius: ["40%", "70%"],
            avoidLabelOverlap: false,
            label: {
              // 此处重点，设置为显示
              show: true,
              position: "center",
              formatter: "{b}\n{c}",
              align: "center",
              verticalAlign: "middle",
              // 此处重点，字体大小设置为0
              textStyle: {
                fontSize: "0",
              },
            },
            emphasis: {
              show: true,
              textStyle: {
                fontSize: "20",
                fontWeight: "bold",
              },
              // 同步样式
              formatter: function (params) {
                return `{tTitle|${params.name}}\n{tSubTitle|${params.value}}`
              },
              rich: {
                tTitle: {
                  fontSize: "14",
                  fontWeight: "bold",
                  lineHeight: "25",
                },
                tSubTitle: {
                  fontSize: "20",
                  fontWeight: "bold",
                  lineHeight: "25",
                },
              },
            },
            labelLine: {
              show: false,
              normal: {
                show: false,
              },
            },
            data: this.electricityData.map((d) => {
              return {
                value: d.b,
                name: d.title,
              }
            }),
          },
        ],
      }
    },
    electricity_ring () {
      return {
        title: {
          text: "",
          subtext: "",
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        legend: {
          data: [],
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: {
          type: "value",
          axisLabel: {
            textStyle: {
              color: "#fff",
            },
          },
        },
        yAxis: {
          type: "category",
          data: this.electricity_ringData.map((d) => {
            return d.title
          }),
          axisLabel: {
            textStyle: {
              color: "#fff",
            },
          },
        },
        series: [
          {
            name: "本期",
            type: "bar",
            data: this.electricity_ringData.map((d) => {
              return d.b
            }),
          },
          {
            name: "上期",
            type: "bar",
            data: this.electricity_ringData.map((d) => {
              return d.y
            }),
          },
        ],
      }
    },

    //分项用水增幅 TOP5
    electricity_increase () {
      // 用水增幅配置
      return {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
          },
        },
        legend: {
          data: [],
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "value",
            axisLabel: {
              textStyle: {
                color: "#fff",
              },
            },
          },
        ],
        yAxis: [
          {
            realtimeSort: true,
            inverse: false,
            type: "category",
            axisTick: {
              show: false,
            },
            data: this.electricity_increaseData.map((d) => d.title),
            axisLabel: {
              textStyle: {
                color: "#fff",
              },
            },
          },
        ],
        series: [
          {
            name: "",
            type: "bar",
            label: {
              show: true,
              position: "inside",
              formatter: "{c}%",
            },
            emphasis: {
              focus: "series",
            },
            data: this.electricity_increaseData.map((d) => d.z), //[320, 302, 341, 374, 390, 450, 420]
          },
        ],
      }
    },

    //分项用水
    sub_option () {
      let array = this.sub_optionData
      array.sort(function (n1, n2) {
        return n2.b - n1.b
      })
      return {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
          },
        },
        legend: {
          data: [],
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: {
          type: "category",
          max: "dataMax",
          data: this.sub_optionData.map((d) => d.title),
          axisLabel: {
            textStyle: {
              color: "#fff",
            },
          },
        },
        yAxis: {
          type: "value",
          axisLabel: {
            textStyle: {
              color: "#fff",
            },
          },
        },
        series: [
          {
            type: "bar",
            data: array.map((d) => d.b),
          },
        ],
      }
    },

    electricity_trend () {
      let ser = []
      let xa = []
      if (this.electricity_trendData.length != 0) {
        ser = this.electricity_trendData.map((obj) => {
          return {
            name: obj.title,
            type: "bar",
            stack: "日",
            data: obj.b.map((d) =>
              d.count ? d.count : d.shu ? d.shu : d.count
            ),
          }
        })
        xa = this.electricity_trendData[0].b.map((d) =>
          d.ahour
            ? d.ahour + "时"
            : d.dates
              ? d.dates
              : d.amonth
                ? d.amonth + "月"
                : d.ahour + "时"
        )
      }
      return {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
          },
        },
        legend: {
          data: this.electricity_trendData.map((d) => d.title),
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            data: xa,
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
        series: ser,
      }
    },
    /********over 完成***********/
  },
  methods: {
    getId () {
      this.dept = this.user.user.dept_id
    },

    // 矿名
    async departs () {
      this.name = []
      this.depart.forEach((i) => {
        if (Number(i.id) === Number(this.dept)) {
          this.name = i.name
        }
      })
    },
    // 部门列表
    async department () {
      const res = await this.$http.get("/dept/getUserDepList", {
        params: {
          dept_id: this.dept,
        },
      })
      let data = res.data.data
      this.depart = util.toTreeData(data, "id", "pid", "children")
    },
    /************star******************/
    getDeptList () {
      // 区域查询
      this.$http
        .get("/energy/getQyTreeCalss", {
          params: {
            dept_id: this.dept,
            road_id: 0,
            cate_id: 2,
          },
        })
        .then((res) => {
          if (res.data.code === 0) {
            this.deptList = res.data.data //this.$util.toTreeData(res.data.data, "id", "pid");
            console.log(this.deptList)
          } else {
            this.$message.error(res.data.msg)
          }
        })
        .catch((e) => {
          this.$message.error(e.message)
        })
    },
    typeSelect (i) {
      this.index = i
    },
    async getCouts (id = "") {
      /************************总量查询******************** */
      // 本月
      this.benyue = true
      this.jinri = true
      this.today_shui_three = true

      this.today_shui_load = true
      /* 日月年 -- 图**/
      this.t1_datefunc(0, id)

      const res = await this.$http
        .post("/energy/getCouts", {
          dept_id: this.dept,
          road_id: 0,
          cate_id: 2,
          types: 0,
          datetype: 1,
          id: id,
          dates: util.toDateString(new Date(), "yyyy-MM"),
        })
        .catch((err) => {
          this.benyue = false
          this.month = []
          console.log(err)
        })
      if (res) {
        this.benyue = false
        this.month = res.data.data
      }

      // 本日
      const day = await this.$http.post("/energy/getCouts", {
        dept_id: this.dept,
        road_id: 0,
        cate_id: 2,
        types: 0,
        datetype: 0,
        id: id,
        dates: util.toDateString(new Date(), "yyyy-MM-dd"),
      })
      this.jinri = false
      if (day) {
        this.day = day.data.data
      }

      // 今日支路用水趋势
      const today = await this.$http.post("/energy/getQsDay", {
        dept_id: this.dept,
        road_id: 0,
        cate_id: 2,
        types: 0,
        id: id,
        dates: util.toDateString(new Date(), "yyyy-MM-dd"),
      })
      this.today_shui_load = false
      if (today) {
        this.today_branchData = today.data.data.b
        this.today_branch_threeData = today.data.data.b
      }

      /************************end******************** */
    },
    change () {
      // 选择日期触发
      this.typeSubOption(this.value1)
    },
    treeinput (value) {
      this.getCouts(value) // 总量查询
    },
    // 分项数据
    async typeSubOption (val = null) {
      // index =1
      this.echart1 = true
      this.echart2 = true
      this.echart3 = true
      this.echart4 = true
      this.echart5 = true

      let dates = {
        0: util.toDateString(new Date(), "yyyy-MM-dd"),
        1: util.toDateString(new Date(), "yyyy-MM"),
        2: util.toDateString(new Date(), "yyyy"),
      }
      // 分项 - 分项用水占比
      const proportion = await this.$http.post("/energy/getTjCouts", {
        dept_id: this.dept,
        road_id: 0,
        cate_id: 2,
        types: this.index,
        datetype: this.date, // 0 1 2
        dates: val || dates[this.date],
      })
      this.echart1 = false
      this.echart2 = false

      //
      this.electricityData = proportion.data.data
      this.electricity_ringData = proportion.data.data
      // 分项用水增幅
      const result_zf = await this.$http.post("/energy/getTjTop", {
        dept_id: this.dept,
        road_id: 0,
        cate_id: 2,
        types: this.index,
        datetype: this.date, // 0 1 2
        dates: val || dates[this.date],
      })
      if (result_zf) {
        this.electricity_increaseData = result_zf.data.data
        // 分项用水 top
        this.sub_optionData = result_zf.data.data
      }
      this.echart3 = false
      this.echart4 = false
      // 分项
      let url = {
        0: "/energy/getQsClassDay",
        1: "/energy/getQsClassMonth",
        2: "/energy/getQsClassYear",
      }
      const qushi = await this.$http.post(url[this.date], {
        dept_id: this.dept,
        road_id: 0,
        cate_id: 2,
        types: this.index,
        dates: val || dates[this.date],
      })
      if (qushi) {
        this.electricity_trendData = qushi.data.data
      }
      this.echart5 = false
    },
    async t1_datefunc (i, id = "") {
      console.log("----今日支路用水三图日月年------")
      this.t1_date = i
      // 今日支路用水趋势
      let url = {
        0: "/energy/getQsDay",
        1: "/energy/getQsMonth",
        2: "/energy/getQsYear",
      }
      let dates = {
        0: util.toDateString(new Date(), "yyyy-MM-dd"),
        1: util.toDateString(new Date(), "yyyy-MM"),
        2: util.toDateString(new Date(), "yyyy"),
      }

      this.today_shui_three = true
      const today = this.$http.post(url[i], {
        dept_id: this.dept,
        road_id: 0,
        cate_id: 2,
        types: 0,
        dates: dates[i],
        id: id,
      })
      // 平  谷  峰
      const pgf = this.$http.post("/energy/getCoutsGpf", {
        dept_id: this.dept,
        road_id: 0,
        cate_id: 2,
        datetype: i,
        dates: dates[i],
        id: id,
      })
      // 平  谷  峰
      const pgf1 = this.$http.post("/energy/getCoutsGpf", {
        dept_id: this.dept,
        road_id: 0,
        cate_id: 2,
        dates: this.lastDate(i), // 上
        datetype: i,
        id: id,
      })
      const [res, res1, res2] = await this.$http.all([pgf, pgf1, today])
      this.today_shui_three = false
      // 赋值
      this.pgfData = this.gfpFunc(res.data.data)
      this.pgfData1 = this.gfpFunc(res1.data.data)
      if (res2) {
        this.today_branch_threeData = res2.data.data.b
      }
    },
    lastDate (key) {
      let d = new Date()
      let day = d.getDate()
      let m = d.getMonth() + 1
      let y = d.getFullYear()
      let obj = {
        0: y + "-" + m + "-" + (day - 1),
        1: y + "-" + (m - 1),
        2: y - 1,
      }
      console.log(obj[key])
      return obj[key]
    },
    gfpFunc (data) {
      let obj = data
      let array = []
      for (const key in obj) {
        if (Object.hasOwnProperty.call(obj, key)) {
          const element = obj[key]
          array.push({
            name:
              key == "g" ? "谷" : key == "f" ? "峰" : key == "p" ? "平" : "谷",
            value: element,
          })
        }
      }
      return array
    },
    datesel (i) {
      // 年月日切换
      this.date = i
      let t = {
        0: "date",
        1: "month",
        2: "year",
      }
      let f = {
        0: "yyyy-MM-dd",
        1: "yyyy-MM",
        2: "yyyy",
      }
      this.dateType = t[i]
      this.valueFormat = f[i]
      //
      this.typeSubOption()
    },

    /******************************/
  },
};
</script>

<style scoped>
.el-row {
  margin-bottom: 15px;
}
.el-row:last-child {
  margin-bottom: 0;
}
.title {
  font-size: 26px;
  position: relative;
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
  /* padding: 30px 0; */
  padding-top: 50px;
  padding-bottom: 10px;
}
.bottombar {
  padding-top: 15px;
}
.ic {
  position: absolute;
  right: 0px;
  font-size: 50px;
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
.topbar {
  width: 100%;
  height: 40px;
  display: flex;
  align-content: center;
  align-items: center;
  justify-content: flex-start;
  padding: 10px 0;
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

.tree {
  width: 50%;
}
.depart {
  width: 300px;
  position: absolute;
  left: 75%;
}
</style>
