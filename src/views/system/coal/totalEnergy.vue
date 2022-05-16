<template>
  <div class="ele-body">
    <div class="topbar">
      <el-button
        :type="index == 3 ? 'primary' : ''"
        size="small"
        @click="index = 3"
      >
        概览
      </el-button>
      <el-button
        :type="index == 1 ? 'primary' : ''"
        @click="
          index = 1;
          dateType = 'month';
        "
        size="small"
      >
        按月
      </el-button>
      <el-button
        :type="index == 2 ? 'primary' : ''"
        @click="
          index = 2;
          dateType = 'year';
        "
        size="small"
      >
        按年
      </el-button>
      <div class="sel selbtn" v-if="index != 3">
        <div class="clas t2">日期:</div>
        <el-date-picker
          v-if="dateType == 'date'"
          v-model="dateValue"
          type="date"
          @change="change"
          :value-format="vformat"
          :default-value="defvalue"
          placeholder="选择日期"
        >
        </el-date-picker>
        <el-date-picker
          v-if="dateType == 'month'"
          v-model="dateValue"
          type="month"
          @change="change"
          :value-format="vformat"
          :default-value="defvalue"
          placeholder="选择日期"
        >
        </el-date-picker>
        <el-date-picker
          v-if="dateType == 'year'"
          v-model="dateValue"
          type="year"
          @change="change"
          :value-format="vformat"
          :default-value="defvalue"
          placeholder="选择日期"
        >
        </el-date-picker>
      </div>
      <el-button-group class="flex" style="margin-left: 10px">
        <el-button
          :type="twobtn == '1' ? 'primary' : ''"
          size="small"
          @click="twobtn = '1'"
        >
          用量
        </el-button>
        <el-button
          :type="twobtn == '2' ? 'primary' : ''"
          size="small"
          @click="twobtn = '2'"
        >
          费用
        </el-button>
      </el-button-group>

      <treeselect
        v-if="permission.includes('sys:xiala:view')"
        class="depart"
        v-model="value"
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
    <div v-if="index == 3">
      <el-row :gutter="10" v-loading="topall">
        <el-col :span="12">
          <el-card shadow="never">
            <div class="title">
              <span v-if="twobtn == '1'">煤总能耗</span>
              <span v-else>总费用</span>
              <i class="el-icon-refresh gree"> </i>
              <el-button style="float: right; padding: 3px 0" type="text">
                <!-- 单位: 吨标准煤 -->
                <span v-if="twobtn == '1'"> 单位: 吨标准煤</span>
                <span v-else>单位:元</span>
              </el-button>
            </div>
            <el-table :show-header="false" :data="meiall" style="width: 100%">
              <!-- 当月 -->
              <el-table-column prop="b" label="" width="180">
                <template slot-scope="scope">
                  {{ textData(0, scope.$index, scope.row) }}
                </template>
              </el-table-column>
              <el-table-column prop="s" label="" width="180">
                <!-- 上月 -->
                <template slot-scope="scope">
                  {{ textData(1, scope.$index, scope.row) }}
                </template>
              </el-table-column>
              <el-table-column prop="z" label="">
                <!-- 同期 -->
                <template slot-scope="scope" style="white-space: nowrap">
                  <span style="margin-left: 10px">
                    {{ textData(2, scope.$index, scope.row) }}
                  </span>
                  <span
                    style="margin-left: 10px"
                    :style="{
                      color: scope.row.z > 0 ? 'red' : '#09f309',
                    }"
                  >
                    {{ (scope.row.z * 100) | numberLength }}%<i
                      :class="{
                        'el-icon-caret-top': scope.row.z > 0 ? true : false,
                        'el-icon-caret-bottom': scope.row.z < 0 ? true : false,
                      }"
                    ></i>
                  </span> </template
              ></el-table-column>
            </el-table>
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-card shadow="never">
            <div class="title">
              煤
              <i class="el-icon-_flash gree"> </i>
              <el-button style="float: right; padding: 3px 0" type="text">
                <!-- 单位: kWh -->
                <span v-if="twobtn == '1'"> 单位: t</span>
                <span v-else>单位:元</span>
              </el-button>
            </div>
            <el-table :show-header="false" :data="mei" style="width: 100%">
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
                  <span style="margin-left: 10px">{{
                    textData(2, scope.$index, scope.row)
                  }}</span>
                  <span
                    style="margin-left: 10px"
                    :style="{
                      color: scope.row.z > 0 ? 'red' : '#09f309',
                    }"
                  >
                    {{ (scope.row.z * 100) | numberLength }}%
                    <i
                      :class="{
                        'el-icon-caret-top': scope.row.z > 0 ? true : false,
                        'el-icon-caret-bottom': scope.row.z < 0 ? true : false,
                      }"
                    ></i>
                  </span> </template
              ></el-table-column>
            </el-table>
          </el-card>
        </el-col>
      </el-row>
      <!-- 当月用量趋势 -->
      <el-row :gutter="30">
        <el-col :span="24">
          <!-- 当月用量趋势 -->
          <el-card shadow="never" header="当月用量趋势" v-loading="monthLoad">
            <div slot="header" class="clearfix">
              <i class="el-icon-_trending-up gree"></i>
              <span>当月用量趋势</span>
              <el-button-group style="float: right; 0;margin:0;">
                <el-button
                  style="padding: 5px 10px"
                  :type="month == 1 ? 'primary' : ''"
                  @click="month = 1"
                  >总能耗
                </el-button>
                <el-button
                  style="padding: 5px 10px"
                  :type="month == 0 ? 'primary' : ''"
                  @click="month = 0"
                  >煤
                </el-button>
              </el-button-group>
            </div>
            <el-row>
              <el-col :span="20">
                <ele-chart :option="monthOption" style="height: 323px" />
              </el-col>
              <el-col :span="4">
                <el-card class="box-card">
                  <div slot="header" class="clearfix" v-if="month == 1">
                    <span>当月总用量</span>
                    <el-button style="float: right; padding: 3px 0" type="text">
                      吨标准煤
                    </el-button>
                  </div>
                  <div slot="header" class="clearfix" v-else>
                    <span>当月用量</span>
                    <el-button style="float: right; padding: 3px 0" type="text">
                      t
                    </el-button>
                  </div>
                  <div class="right-center">
                    {{ monthAllTopCardData }}
                  </div>
                </el-card>
                <el-card class="box-card">
                  <div slot="header" class="clearfix" v-if="month == 1">
                    <span>上月同期总用量</span>
                    <el-button style="float: right; padding: 3px 0" type="text">
                      吨标准煤
                    </el-button>
                  </div>
                  <div slot="header" class="clearfix" v-else>
                    <span>上月同期用量</span>
                    <el-button style="float: right; padding: 3px 0" type="text">
                      t
                    </el-button>
                  </div>
                  <div class="right-center">
                    {{ yesTadaySame[0] }}
                    <div
                      class="text-color"
                      :style="{
                        color:
                          mei.length != 0
                            ? mei[1].z > 0
                              ? 'red'
                              : '#09f309'
                            : '',
                      }"
                    >
                      <!-- #09f309 -->
                      {{ yesTadaySame[1] * 100 }}%
                      <i
                        v-if="month == 1"
                        :class="{
                          'el-icon-caret-top':
                            mei.length != 0
                              ? mei[1].z > 0
                                ? true
                                : false
                              : true,
                          'el-icon-caret-bottom':
                            mei.length != 0
                              ? mei[1].z < 0
                                ? true
                                : false
                              : true,
                        }"
                      ></i>
                      <i
                        v-else
                        :class="{
                          'el-icon-caret-top':
                            mei.length != 0
                              ? mei[1].z > 0
                                ? true
                                : false
                              : true,
                          'el-icon-caret-bottom':
                            mei.length != 0
                              ? mei[1].z < 0
                                ? true
                                : false
                              : true,
                        }"
                      ></i>
                    </div>
                  </div>
                </el-card>
              </el-col>
            </el-row>
          </el-card>
          <!-- 当年 -->
          <el-card shadow="never" v-loading="todayLoad">
            <div slot="header" class="clearfix">
              <i class="el-icon-_trending-up gree"></i>
              <span>当年用量趋势</span>
              <el-button-group style="float: right; 0;margin:0;">
                <el-button
                  style="padding: 5px 10px"
                  :type="today == 1 ? 'primary' : ''"
                  @click="today = 1"
                >
                  总能耗
                </el-button>
                <el-button
                  style="padding: 5px 10px"
                  :type="today == 0 ? 'primary' : ''"
                  @click="today = 0"
                  >煤
                </el-button>
              </el-button-group>
            </div>
            <el-row>
              <el-col :span="20">
                <ele-chart :option="today_branch_three" style="height: 323px" />
              </el-col>
              <el-col :span="4">
                <el-card class="box-card">
                  <div slot="header" class="clearfix" v-if="today == 1">
                    <span>当年总用量</span>
                    <el-button style="float: right; padding: 3px 0" type="text">
                      吨标准煤
                    </el-button>
                  </div>
                  <div slot="header" class="clearfix" v-else>
                    <span>当年用量</span>
                    <el-button style="float: right; padding: 3px 0" type="text">
                      t
                    </el-button>
                  </div>
                  <div class="right-center" v-if="today == 1">
                    {{ meiall.length != 0 ? meiall[1].b : "0" }}
                  </div>
                  <div class="right-center" v-else>
                    {{ mei.length != 0 ? mei[1].b : "0" }}
                  </div>
                </el-card>
                <el-card class="box-card">
                  <div slot="header" class="clearfix" v-if="today == 1">
                    <span>上年同期总用量</span>
                    <el-button style="float: right; padding: 3px 0" type="text">
                      吨标准煤
                    </el-button>
                  </div>
                  <div slot="header" class="clearfix" v-else>
                    <span>上年同期电量</span>
                    <el-button style="float: right; padding: 3px 0" type="text">
                      t
                    </el-button>
                  </div>
                  <div class="right-center" v-if="today == 1">
                    {{ mei.length != 0 ? mei[0].s : "0" }}
                    <div
                      class="text-color"
                      :style="{
                        color:
                          mei.length != 0
                            ? mei[0].z * 1 > 0
                              ? 'red'
                              : '#09f309'
                            : 0,
                      }"
                    >
                      {{ (mei.length != 0 ? mei[0].z : "0") * 100 }}%
                      <i
                        :class="{
                          'el-icon-caret-top':
                            mei.length != 0
                              ? mei[1].z > 0
                                ? true
                                : false
                              : true,
                          'el-icon-caret-bottom':
                            mei.length != 0
                              ? mei[1].z < 0
                                ? true
                                : false
                              : true,
                        }"
                      ></i>
                    </div>
                  </div>
                  <div class="right-center" v-else>
                    {{ mei.length != 0 ? mei[0].s : "0" }}
                    <div
                      class="text-color"
                      :style="{
                        color:
                          mei.length != 0
                            ? mei[0].z * 1 > 0
                              ? 'red'
                              : '#09f309'
                            : 0,
                      }"
                    >
                      {{ (mei.length != 0 ? mei[0].z : "0") * 100 }}%
                      <i
                        :class="{
                          'el-icon-caret-top':
                            mei.length != 0
                              ? mei[1].z > 0
                                ? true
                                : false
                              : true,
                          'el-icon-caret-bottom':
                            mei.length != 0
                              ? mei[1].z < 0
                                ? true
                                : false
                              : true,
                        }"
                      ></i>
                    </div>
                  </div>
                </el-card>
              </el-col>
            </el-row>
          </el-card>
          <!-- 年 -->
        </el-col>
      </el-row>
    </div>
    <TimeType
      :twobtn="twobtn"
      :index="index"
      :department="value"
      :dateValue="dateValue"
    />
  </div>
</template>

<script>
// 组件
import EleChart from "@/components/EleChart"
import Treeselect from "@riophae/vue-treeselect" // 下拉树
import "@riophae/vue-treeselect/dist/vue-treeselect.css"
import TimeType from './components/timeType'
// 工具
import util from "@/utils/util"
import { mapGetters } from "vuex"

export default {
  components: { EleChart, Treeselect, TimeType },
  name: "test",
  data () {
    return {
      twobtn: "1", //用量-费用 1煤2费用
      index: 3, // 概览-顶行
      dateValue: "2021-05-14", // 日期
      defvalue: "", // 默认日期
      vformat: "yyyy-MM-dd",
      today: 1, // 当日用电
      month: 1, //当月用电
      coutsIndex: "", //总能耗 ajax数据
      dateType: "date",

      today_branch_threeData: {
        // 当日
        dyearc: [],
        yearc: []
      },
      monthData: {
        // 当日
        monthc: "",
        ymonthc: ""
      },
      topall: false,
      threeLoad: false,
      todayLoad: false,
      monthLoad: false,

      couts: "",
      tableData: [],
      /****************/
      dept: "",
      value: "",
      depart: [],
      // timetype 组件
      text: "日", // 按 日 月 年的文字
    }
  },
  watch: {
    twobtn () {
      if (this.index == 3) {
        //总能耗
        this.getCoutsIndex()
        this.todayMei()
        this.mountAll()
      }
    },
    index (old) {
      if (old == 1) {

        this.dateValue = util.toDateString(new Date(), "yyyy-MM")
        this.vformat = "yyyy-MM"

        // this.typeSubOption()
        this.text = "月"
      }
      if (old == 2) {

        this.dateValue = util.toDateString(new Date(), "yyyy")
        this.vformat = "yyyy"

        // this.typeSubOption()
        this.text = "年"
      }
      if (old == 3) {
        //总能耗
        this.getCoutsIndex()
        this.todayMei()
        this.mountAll()
      }
    },
    today () {
      this.todayMei()
    },
    month () {
      this.mountAll()
    },
    value () {
      if (this.index == 3) {
        this.departs()
        this.getCoutsIndex()
        this.todayMei()
        this.mountAll()
      }
    }
  },
  mounted () {
    //总能耗
    this.getCoutsIndex()
    this.todayMei()
    this.mountAll()
    this.getId()
    this.departs()
    this.department()
  },
  computed: {
    ...mapGetters(["permission", "user"]),
    monthAllTopCardData () {

      if (this.month == 1) {
        return this.meiall.length != 0 ? this.meiall[0].b : "0"
      } else {
        return this.mei.length != 0 ? this.mei[0].b : "0"
      }
    },
    yesTadaySame () {
      if (this.month == 1) {
        return this.meiall.length != 0 ? [this.meiall[0].y, this.meiall[0].z] : [0, 0]
      } else {
        return this.mei.length != 0 ? [this.mei[0].y, this.mei[0].z] : [0, 0]
      }
    },
    mei () {
      if (this.coutsIndex != "") {
        let retArr = []
        let array = this.coutsIndex.mei
        // retArr.push(array.dayc)
        retArr.push(array.mothc)
        retArr.push(array.yearc)
        return retArr
      } else {
        return []
      }
    },
    meiall () {
      if (this.coutsIndex != "") {
        let retArr = []
        let array = this.coutsIndex.meiall
        // retArr.push(array.dayc)
        retArr.push(array.mothc)
        retArr.push(array.yearc)
        return retArr
      } else {
        return []
      }
    },
    today_branch_three () {
      // 当日总用煤量
      if (this.today_branch_threeData.dyearc) {
        let day = this.today_branch_threeData.dyearc
        let yesday = this.today_branch_threeData.yearc
        return {
          title: {
            text: "",
            subtext: this.twobtn == 1 ? "t" : "元"
          },
          tooltip: {
            trigger: "axis"
          },
          legend: {
            data: ["当年", "上年"]
          },
          toolbox: {
            show: true,
            feature: {
              dataView: { show: true, readOnly: false },
              magicType: { show: true, type: ["line", "bar"] },
              restore: { show: true },
              saveAsImage: { show: true }
            }
          },
          calculable: true,
          xAxis: [
            {
              type: "category",
              data: day.map(d => d.amonth + "月"),
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
              },
              splitLine: {
                show: false
              }
            }
          ],
          series: [
            {
              name: "当年",
              type: "bar",
              data: day.map(d => d.count),
            },
            {
              name: "上年",
              type: "bar",
              data: yesday.map(d => d.count),
            }
          ]
        }
      } else {
        return {}
      }
    },
    monthOption () {
      // 当日总用煤量
      if (this.monthData.monthc) {
        let day = this.monthData.monthc
        let yesday = this.monthData.ymonthc
        return {
          title: {
            text: "",
            subtext: this.twobtn == 1 ? "t" : "元"
          },
          tooltip: {
            trigger: "axis"
          },
          legend: {
            data: ["当月", "上月"]
          },
          grid: {
            // width: "1000px"
          },
          toolbox: {
            show: true,
            feature: {
              dataView: { show: true, readOnly: false },
              magicType: { show: true, type: ["line", "bar"] },
              restore: { show: true },
              saveAsImage: { show: true }
            }
          },
          calculable: true,
          xAxis: [
            {
              type: "category",
              data: day.map(d => d.dates + "日"),
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
              },
              splitLine: {
                show: false
              }
            }
          ],
          series: [
            {
              name: "当月",
              type: "bar",
              data: day.map(d => d.shu),

            },
            {
              name: "上月",
              type: "bar",
              data: yesday.map(d => d.shu),

            }
          ]
        }
      } else {
        return {}
      }
    },


  },
  methods: {
    getId () {
      this.value = this.user.user.dept_id
    },
    change () {

    },
    // 矿名
    async departs () {
      this.name = []
      this.depart.forEach(i => {
        if (Number(i.id) === Number(this.value)) {
          this.name = i.name
        }
      })
    },
    // 部门列表
    async department () {
      const res = await this.$http.get("/dept/getUserDepList", {
        params: {
          dept_id: this.value
        }
      })
      let data = res.data.data
      this.depart = util.toTreeData(data, "id", "pid", "children")
    },

    /*************** start***************/
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
      return array[index][i + 1]
    },
    async getCoutsIndex () {
      //总能耗
      this.coutsIndex = ""
      this.topall = true


      const result_m = this.$http.get("/energy/getCouts", {
        params: {
          dept_id: this.value,
          road_id: 0,
          cate_id: 4,
          types: this.twobtn,
          datetype: 1,
          dates: util.toDateString(new Date(), "yyyy-MM")
        }
      })
      const result_y = this.$http.get("/energy/getCouts", {
        params: {
          dept_id: this.value,
          road_id: 0,
          cate_id: 4,
          types: this.twobtn,
          datetype: 2,
          dates: util.toDateString(new Date(), "yyyy")
        }
      })

      const result_m2 = this.$http.get("/energy/getCouts", {
        params: {
          dept_id: this.value,
          road_id: 0,
          cate_id: 4,
          types: 0,
          datetype: 1,
          dates: util.toDateString(new Date(), "yyyy-MM")
        }
      })
      const result_m3 = this.$http.get("/energy/getCouts", {
        params: {
          dept_id: this.value,
          road_id: 0,
          cate_id: 4,
          types: 0,
          datetype: 2,
          dates: util.toDateString(new Date(), "yyyy")
        }
      })
      // 
      const [res2, res3, res5, res6] = await this.$http.all([result_m, result_y, result_m2, result_m3])
      this.topall = false
      this.coutsIndex = {
        meiall: {
          mothc: res2.data.data,
          yearc: res3.data.data
        },
        mei: {
          mothc: res5.data.data,
          yearc: res6.data.data
        }
      }
    },
    typeSelect (i) {
      this.index = i
    },
    async todayMei () { // -->> year 
      this.todayLoad = true
      const result_c = await this.$http.get("/energy/getQsYear", {
        params: {
          dept_id: this.value,
          road_id: 0,
          cate_id: 4,
          types: this.today,
          dates: util.toDateString(new Date(), "yyyy")
        }
      })
      let myDate = new Date()
      let tYear = myDate.getFullYear() - 1

      const result_y = await this.$http.post("/energy/getQsYear", {
        dept_id: this.value,
        road_id: 0,
        cate_id: 4,
        types: this.today,
        dates: tYear
      })
      this.todayLoad = false
      this.$set(this.today_branch_threeData, "dyearc", result_c.data.data.b)
      this.$set(this.today_branch_threeData, "yearc", result_y.data.data.b)
    },
    async mountAll () {
      this.monthLoad = true
      const result_m = await this.$http.get("/energy/getQsMonth", {
        params: {
          dept_id: this.value,
          road_id: 0,
          cate_id: 4,
          types: this.month,
          dates: util.toDateString(new Date(), "yyyy-MM")
        }
      })
      const result_ym = await this.$http.get("/energy/getQsMonth", {
        params: {
          dept_id: this.value,
          road_id: 0,
          cate_id: 4,
          types: this.month,
          dates: util.getLastMonth()
        }
      })
      this.monthLoad = false
      this.monthData.monthc = result_m.data.data.b
      this.monthData.ymonthc = result_ym.data.data.b
    },
  }
};
</script>

<style lang="scss" scoped>
.el-row {
  margin-bottom: 15px;
  &:last-child {
    margin-bottom: 0;
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
.gree {
  color: #2ad9b2;
}
.red {
  color: red;
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
.topbar {
  width: 100%;
  height: 40px;
  display: flex;
  align-content: center;
  align-items: center;
  justify-content: flex-start;
  padding: 10px 0;
}
.tadayAll {
  text-align: center;
}
.tnum {
  font-size: 60px;
  padding-top: 80px;
}
.detail {
  font-size: 14px;
  color: #c0c4cc;
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
.depart {
  width: 300px;
  margin-left: 30px;
  z-index: 9999;
}
</style>
