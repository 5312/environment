// 电
<template>
  <div class="margin-top">
    <el-row
      element-loading-spinner="el-icon-loading"
      element-loading-text="拼命加载中"
      v-loading="topall"
    >
      <el-col :span="12">
        <el-card shadow="never">
          <div class="title text_overflow">
            <span>{{ category_name }}总能耗</span>
            <el-button class="right_title" type="text">
              <!-- 单位: 吨标准煤 -->
              <span>单位: 吨标准煤</span>
            </el-button>
          </div>
          <el-table :show-header="false" :data="mei">
            <el-table-column prop="" label="当">
              <template slot-scope="scope" class="text_overflow">
                {{ textData(0, scope.$index, scope.row) }}
              </template>
            </el-table-column>
            <el-table-column prop="" label="上">
              <template slot-scope="scope" class="text_overflow">
                {{ textData(1, scope.$index, scope.row) }}
              </template>
            </el-table-column>
            <el-table-column prop="" label="同">
              <template slot-scope="scope">
                <span class="numbertext text_overflow">
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
            {{ category_name }}
            <el-button class="right_title" type="text">
              <!-- 单位: kWh -->
              <span>{{ leftText }}</span>
            </el-button>
          </div>
          <el-table :show-header="false" :data="dian">
            <el-table-column>
              <template slot-scope="scope">
                {{ textData(0, scope.$index, scope.row) }}
              </template>
            </el-table-column>
            <el-table-column>
              <!-- 上 -->
              <template slot-scope="scope" class="text_overflow">
                {{ textData(1, scope.$index, scope.row) }}
              </template>
            </el-table-column>
            <el-table-column>
              <template slot-scope="scope">
                <span class="numbertext text_overflow">{{
                  textData(2, scope.$index, scope.row)
                }}</span>
                <PercentageIconColor :number="scope.row.z" />
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>
    <el-row>
      <el-card
        shadow="never"
        :header="'今日支路用' + category_name"
        class="use"
      >
        <el-row
          element-loading-spinner="el-icon-loading"
          element-loading-text="拼命加载中"
          v-loading="today_dian_three"
        >
          <el-col :span="2">
            <div class="typeselect_btn">
              <el-button
                v-if="connectiveTissue != 4"
                :type="t1_date == 0 ? 'primary' : ''"
                @click="t1_datefunc(0)"
                size="small"
                >日
              </el-button>
              <el-button
                :type="t1_date == 1 ? 'primary' : ''"
                @click="t1_datefunc(1)"
                size="small"
                >月
              </el-button>
              <el-button
                :type="t1_date == 2 ? 'primary' : ''"
                @click="t1_datefunc(2)"
                size="small"
                >年
              </el-button>
            </div>
          </el-col>
          <el-col :span="22">
            <ele-chart :option="today_branch_three" style="height: 323px" />
          </el-col>
        </el-row>
      </el-card>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from "vuex"
// echarts
import EleChart from "@/components/EleChart"
import PercentageIconColor from '@/components/percentageIconColor'
import util from "@/utils/util"

export default {
  name: 'electricty',
  components: { EleChart, PercentageIconColor },
  props: {
    category_name: String, // 名称
    connectiveTissue: Number, // 电 水 气 煤 油 类型
    departmentId: Number
  },
  data () {
    return {
      // 存数据 经 computed 换算
      coutsIndex: null,
      t1_date: this.connectiveTissue != 4 ? 0 : 1, // 0日1月2年 按钮状态
      // 统计图数据
      today_branch_threeData: [],
      yesterday_data: [],
      pgfData: [],
      pgfData1: [], // 昨日 
      // loading
      topall: false,
      today_dian_three: false,
      // loading -end
    }
  },
  watch: {
    departmentId (v) {
      console.info('elec:watch:departmentid', v)
      this.getCoutsIndex()
      this.t1_datefunc(this.t1_date)
    }
  },
  mounted () {
    console.log('electricity挂载:', this.departmentId)
    this.getCoutsIndex()
    this.t1_datefunc(this.t1_date)
  },
  computed: {
    ...mapGetters(["permission", "user"]),
    leftText () {
      let unit = {
        1: 'kw/h',
        2: 't',
        3: 'm³',
        4: 't'
      }
      return ' 单位: ' + unit[this.connectiveTissue]
    },
    // 左边计算的是 煤
    mei () {
      if (this.coutsIndex) {
        let retArr = []
        let array = this.coutsIndex.mei
        // 煤 没有 日 统计
        if (this.connectiveTissue != 4) retArr.push(array.dayc)
        retArr.push(array.mothc)
        retArr.push(array.yearc)
        // console.log()
        return retArr
      } else {
        return []
      }
    },
    // 右边计算的是量
    dian () {
      if (this.coutsIndex) {
        let retArr = []
        let array = this.coutsIndex.dian
        if (this.connectiveTissue != 4) retArr.push(array.dayc)
        retArr.push(array.mothc)
        retArr.push(array.yearc)
        return retArr
      } else {
        return []
      }
    },
    // charts -options
    today_branch_three () {
      let array = []
      const unit = {
        1: 'kw/h',
        2: 't',
        3: 'm³',
        4: 't'
      }
      const legendText = {
        0: ["今日", "昨日"],
        1: ["今月", "上月"],
        2: ["今年", "上年"]
      }
      if (this.connectiveTissue != 1) {
        array.push({
          type: "bar",
          name: legendText[this.t1_date][0],//"今日",
          data: this.today_branch_threeData.map(d =>
            d.count ? d.count : d.shu ? d.shu : ""
          )
        },
          {
            type: "bar",
            name: legendText[this.t1_date][1],
            data: this.yesterday_data.map(d =>
              d.count ? d.count : d.shu ? d.shu : ""
            )
          })
      } else {
        array = []
        array.push({
          name: legendText[this.t1_date][0],
          type: "bar",
          data: this.today_branch_threeData.map(d =>
            d.count ? d.count : d.shu ? d.shu : ""
          )
        }, {
          type: "bar",
          name: legendText[this.t1_date][1],
          data: this.yesterday_data.map(d =>
            d.count ? d.count : d.shu ? d.shu : ""
          )
        })
        array.push({
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: "#fff",
            borderWidth: 2
          },
          label: {
            show: true,
            position: "inside"
          },
          type: "pie",
          id: "pie",
          name: legendText[this.t1_date][0],
          radius: ["20%", "40%"],
          center: ["90%", "30%"],
          data: this.pgfData
        })
        array.push({
          label: {
            show: true,
            position: "inside"
          },
          type: "pie",
          name: legendText[this.t1_date][1],
          id: "pie2",
          radius: ["20%", "40%"],
          center: ["90%", "80%"],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 100,
            borderColor: "#fff",
            borderWidth: 2
          },
          data: this.pgfData1
        })
      }

      return {
        title: {
          text: "",
          subtext: unit[this.connectiveTissue], //电 kw/h 水 t 气 m³ 煤 t 
          top: "-4%"
        },
        tooltip: {
          trigger: "item"
        },
        legend: {
          type: "scroll",
          data: legendText[this.t1_date]// ["今日", "昨日"]
        },
        grid: {
          width: this.connectiveTissue != 1 ? '90%' : "75%"
        },
        calculable: true,
        xAxis: [
          {
            type: "category",
            data: this.today_branch_threeData.map(d =>
              d.ahour
                ? d.ahour + "时"
                : d.dates
                  ? d.dates + "日"
                  : d.amonth
                    ? d.amonth + "月"
                    : d.ahour + "时"
            ),
            axisLabel: {
              // textStyle: {
              color: "#fff"
              // }
            }
          }
        ],
        yAxis: [
          {
            type: "value",
            axisLabel: {
              // textStyle: {
              color: "#fff"
              // }
            },
            splitLine: {
              show: false
            }
          }
        ],
        series: array
      }
    },
  },
  methods: {

    // 总能耗
    async getCoutsIndex () {
      this.topall = true

      // 电总能耗 参数
      let params = {
        id: null, // 设备IDS（非必填）
        road_id: 0, //线路：默认0

        cate_id: this.connectiveTissue, //1电2水3气 4 煤 5 油

        dept_id: this.departmentId, // 单位ID
        types: 1,//int32 // 换算：0能耗  1煤 2费用      // 左边 1 右边 0 

        datetype: 0,// int32// true// 0天1月2年
        dates: 0, //  天：2021-05-2  // 月：2021-05  年：2021
      }
      // 日
      params.datetype = 0
      params.dates = util.toDateString(new Date(), "yyyy-MM-dd")
      const promise1 = this.$http.get("/energy/getCouts", {
        params: params
      })
      // 月
      params.datetype = 1
      params.dates = util.toDateString(new Date(), "yyyy-MM")
      const promise2 = this.$http.get("/energy/getCouts", {
        params: params
      })
      // 年
      params.datetype = 2
      params.dates = util.toDateString(new Date(), "yyyy")
      const promise3 = this.$http.get("/energy/getCouts", {
        params: params
      })

      /* 右侧 */
      params.types = 0
      // 日
      params.datetype = 0
      params.dates = util.toDateString(new Date(), "yyyy-MM-dd")
      const promise4 = this.$http.get("/energy/getCouts", {
        params: params
      })
      // 月
      params.datetype = 1
      params.dates = util.toDateString(new Date(), "yyyy-MM")
      const promise5 = this.$http.get("/energy/getCouts", {
        params: params
      })
      // 年
      params.datetype = 2
      params.dates = util.toDateString(new Date(), "yyyy")
      const promise6 = this.$http.get("/energy/getCouts", {
        params: params
      })

      /* end */
      // 开始请求
      let _this = this
      Promise.all([promise1, promise2, promise3, promise4, promise5, promise6]).then((values) => {
        // console.log(values)
        _this.topall = false
        _this.coutsIndex = {
          mei: {
            dayc: values[0].data.data,
            mothc: values[1].data.data,
            yearc: values[2].data.data
          },
          dian: {
            dayc: values[3].data.data,
            mothc: values[4].data.data,
            yearc: values[5].data.data
          },
        }

      })
    },
    // 
    async t1_datefunc (i, id = null) {
      this.t1_date = i
      // 今日支路用电趋势
      let url = {
        0: "/energy/getQsDay",
        1: "/energy/getQsMonth",
        2: "/energy/getQsYear"
      }
      // 当前时间
      let dates = {
        0: util.toDateString(new Date(), "yyyy-MM-dd"),
        1: util.toDateString(new Date(), "yyyy-MM"),
        2: util.toDateString(new Date(), "yyyy")
      }
      // 今日
      const today = this.$http.post(url[i], {
        dept_id: this.departmentId,
        road_id: 0,
        cate_id: this.connectiveTissue, // 电-1 水-2 气-3 煤-4
        types: 0, // 0能耗1煤2费用
        dates: dates[i],
        id: id
      })
      // 昨天
      const yesterday = this.$http.post(url[i], {
        dept_id: this.departmentId,
        road_id: 0,
        cate_id: this.connectiveTissue, // 电-1 水-2 气-3 煤-4
        types: 0, // 0能耗1煤2费用
        dates: this.lastDate(i),
        id: id
      })

      // 平  谷  峰
      const pgf = this.$http.post("/energy/getCoutsGpf", {
        road_id: 0,
        dept_id: this.departmentId,
        cate_id: this.connectiveTissue, // 电-1 水-2 气-3 煤-4
        dates: dates[i],
        datetype: i,
        id: id
      })
      // 平  谷  峰 昨日
      const pgf1 = this.$http.post("/energy/getCoutsGpf", {
        road_id: 0,
        dept_id: this.departmentId,
        cate_id: this.connectiveTissue, // 电-1 水-2 气-3 煤-4
        dates: this.lastDate(i), // 上一天
        datetype: i,
        id: id
      })
      this.today_dian_three = true

      if (this.connectiveTissue == 1) {
        /* 加载 */
        const [res, res1] = await this.$http.all([pgf, pgf1])
        this.pgfData = this.gfpFunc(res.data.data)
        this.pgfData1 = this.gfpFunc(res1.data.data)
      }
      /* 加载 */
      const [res2, res3] = await this.$http.all([today, yesterday])

      // 赋值
      this.today_branch_threeData = res2.data.data.b
      this.yesterday_data = res3.data.data.b

      this.today_dian_three = false

    },
    /* ************* 方法 ********************************* */
    textData (index, i, data) {
      if (!data) {
        return
      }
      let obj1 = {
        0: "当日:" + data.b,
        1: "当月:" + data.b,
        2: "当年:" + data.b
      }
      let obj2 = {
        0: "昨日:" + data.y,
        1: "上月:" + data.y,
        2: "上一年:" + data.y
      }
      let obj3 = {
        0: "同期环比:",
        1: "同期环比:",
        2: "同期环比:"
      }
      let array = [obj1, obj2, obj3]
      if (this.connectiveTissue == 4) i += 1
      return array[index][i]
    },
    // 上一天
    lastDate (key) {
      let d = new Date()
      let day = d.getDate()
      let m = d.getMonth() + 1
      let y = d.getFullYear()
      let obj = {
        0: y + "-" + util.digit(m) + "-" + util.digit(day - 1),
        1: y + "-" + util.digit(m - 1),
        2: y - 1
      }
      return obj[key]
    },
    // 
    gfpFunc (data) {
      let obj = data
      let array = []
      for (const key in obj) {
        if (Object.hasOwnProperty.call(obj, key)) {
          const element = obj[key]
          array.push({
            name:
              key == "g" ? "谷" : key == "f" ? "峰" : key == "p" ? "平" : "谷",
            value: element
          })
        }
      }
      return array
    }
    /* *************************************************** */
  }
}
</script>

<style lang="scss" scoped>
.margin-top {
  margin-top: 15px;
}

.title {
  font-size: 26px;
  position: relative;
  .right_title {
    float: right;
    padding: 3px 0;
  }
}
.use {
  margin-top: 15px;
  .typeselect_btn {
    display: flex;
    align-items: center;
    flex-direction: column;
    & > button {
      margin: 10px 0;
    }
  }
}
</style>