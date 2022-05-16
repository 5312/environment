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
        :type="index == 0 ? 'primary' : ''"
        @click="
          index = 0;
          dateType = 'date';
        "
        size="small"
      >
        按日
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
    <div v-if="index == 3" key="123132" class="type-zhilu">
      <el-row :gutter="10" v-loading="topall">
        <el-col :span="12">
          <el-card shadow="never">
            <div class="title">
              <span v-if="twobtn == '1'">电总能耗</span>
              <span v-else>总费用</span>
              <i class="el-icon-refresh gree"> </i>
              <el-button style="float: right; padding: 3px 0" type="text">
                <!-- 单位: 吨标准煤 -->
                <span v-if="twobtn == '1'"> 单位: 吨标准煤</span>
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
              <el-button style="float: right; padding: 3px 0" type="text">
                <!-- 单位: kWh -->
                <span v-if="twobtn == '1'"> 单位: kWh</span>
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
                  <span style="margin-left: 10px">{{
                    textData(2, scope.$index, scope.row)
                  }}</span>
                  <PercentageIconColor :number="scope.row.z" />
                </template>
              </el-table-column>
            </el-table>
          </el-card>
        </el-col>
      </el-row>

      <!-- 当日用量趋势 -->
      <el-row :gutter="30">
        <el-col :span="24">
          <el-card shadow="never" v-loading="todayLoad">
            <div slot="header" class="clearfix">
              <i class="el-icon-_trending-up gree"></i>
              <span>当日用量趋势</span>
              <el-button-group style="float: right; 0;margin:0;">
                <el-button
                  style="padding: 5px 10px"
                  :type="today == 1 ? 'primary' : ''"
                  @click="today = 1"
                >
                  {{ twobtn == "1" ? "总能耗" : "总费用" }}
                </el-button>
                <el-button
                  style="padding: 5px 10px"
                  :type="today == 0 ? 'primary' : ''"
                  @click="today = 0"
                  >电
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
                    <span>当日总用量</span>
                    <el-button style="float: right; padding: 3px 0" type="text">
                      吨标准煤
                    </el-button>
                  </div>
                  <div slot="header" class="clearfix" v-else>
                    <span>当日电量</span>
                    <el-button style="float: right; padding: 3px 0" type="text">
                      kWh
                    </el-button>
                  </div>
                  <div class="right-center" v-if="today == 1">
                    {{ mei.length != 0 ? mei[0].b : "0" }}
                  </div>
                  <div class="right-center" v-else>
                    {{ dian.length != 0 ? dian[0].b : "0" }}
                  </div>
                </el-card>
                <el-card class="box-card">
                  <div slot="header" class="clearfix" v-if="today == 1">
                    <span>昨日同期总用量</span>
                    <el-button style="float: right; padding: 3px 0" type="text">
                      吨标准煤
                    </el-button>
                  </div>
                  <div slot="header" class="clearfix" v-else>
                    <span>昨日同期电量</span>
                    <el-button style="float: right; padding: 3px 0" type="text">
                      kWh
                    </el-button>
                  </div>
                  <div class="right-center" v-if="today == 1">
                    <!-- {{ mei.length != 0 ? mei[0].s : "0" }} -->
                    <PercentageIconColor
                      :number="mei.length != 0 ? mei[0].z : 0"
                    />
                  </div>
                  <div class="right-center" v-else>
                    <!-- {{ dian.length != 0 ? dian[0].s : "0" }} -->
                    <PercentageIconColor
                      :number="dian.length != 0 ? dian[0].z : 0"
                    />
                  </div>
                </el-card>
              </el-col>
            </el-row>
          </el-card>
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
                >
                  {{ twobtn == "1" ? "总能耗" : "总费用" }}
                </el-button>
                <el-button
                  style="padding: 5px 10px"
                  :type="month == 0 ? 'primary' : ''"
                  @click="month = 0"
                  >电
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
                    <span>当月电量</span>
                    <el-button style="float: right; padding: 3px 0" type="text">
                      kWh
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
                    <span>上月同期电量</span>
                    <el-button style="float: right; padding: 3px 0" type="text">
                      kWh
                    </el-button>
                  </div>
                  <div class="right-center">
                    <!-- {{ yesTadaySame[0] }} -->
                    <PercentageIconColor :number="yesTadaySame[1]" />
                  </div>
                </el-card>
              </el-col>
            </el-row>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <div
      v-if="index == 0 ? true : index == 1 ? true : index == 2 ? true : false"
      class="type-zhilu"
      key="1qewqe"
      v-loading="threeLoad"
    >
      <el-row :gutter="10">
        <el-col :span="8">
          <!-- :header="'当'+{{text}}+'总能耗'" -->
          <el-card shadow="never">
            <div slot="header" class="clearfix flex">
              <i class="el-icon-refresh gree f"> </i>
              <span>当{{ text }}总能耗</span>
            </div>
            <div class="tadayAll" style="height: 200px">
              <div class="tnum">
                {{ couts.b }}
              </div>
              <div class="detail">
                {{this.twobtn === "1" ? "标准吨煤" : "元",}}
              </div>
            </div>
            <div class="c-bottom" style="height: 50px">
              <span>昨日同期</span>
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
              <i class="el-icon-refresh gree f"> </i>
              <span>当{{ text }}能源同比</span>
            </div>
            <!-- table   :row-class-name="tableRowClassName" -->
            <el-table :data="tableData" style="width: 100%" height="250">
              <el-table-column prop="class" label="能源类型" width="180">
              </el-table-column>
              <el-table-column prop="classname" label="能源用途" width="180">
              </el-table-column>
              <el-table-column
                v-if="twobtn == '1'"
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
                  <span
                    style="margin-left: 10px"
                    :style="{
                      color: scope.row.tbi > 0 ? 'red' : '#09f309',
                    }"
                  >
                    {{ scope.row.tbi * 100 }}%<i
                      :class="{
                        'el-icon-caret-top': scope.row.tbi > 0 ? true : false,
                        'el-icon-caret-bottom':
                          scope.row.tbi < 0 ? true : false,
                      }"
                    ></i>
                  </span>
                </template>
              </el-table-column>
            </el-table>
            <!-- table -->
          </el-card>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="8">
          <el-card shadow="never">
            <div slot="header" class="clearfix flex">
              <i class="el-icon-pie-chart gree f"> </i>
              <span>当{{ text }}用能能源占比</span>
            </div>
            <ele-chart :option="electricity" style="height: 323px" />
          </el-card>
        </el-col>
        <el-col :span="16">
          <el-card shadow="never">
            <div slot="header" class="clearfix flex">
              <i class="el-icon-data-line gree f"> </i>
              <span>当{{ text }}能源趋势</span>
            </div>
            <ele-chart :option="electricity_trend" style="height: 323px" />
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script> 
import Treeselect from "@riophae/vue-treeselect" // 下拉树
import "@riophae/vue-treeselect/dist/vue-treeselect.css"
import EleChart from "@/components/EleChart"
// 
import PercentageIconColor from '@/components/percentageIconColor'


import util from "../../../utils/util"
import { mapGetters } from "vuex"
import { getQsDay } from '@/api/mainLay/energy'
export default {
  components: { EleChart, Treeselect, PercentageIconColor },
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
      text: "日", // 按 日 月 年的文字
      today_branch_threeData: {
        // 当日
        dayc: "",
        ydayc: [],
      },
      monthData: {
        // 当日
        monthc: "",
        ymonthc: "",
      },
      topall: false,
      threeLoad: false,
      todayLoad: false,
      monthLoad: false,

      couts: "",
      tableData: [],
      /****************/
      electricityData: [], // [12, 32, 23, 2, 32, 3, 2, 3], // 用电占比数据
      electricity_trendData: "",
      dept: "",
      value: "",
      depart: [],
    }
  },
  watch: {
    "editForm.dept_id": {
      handler () {
        console.log(this.editForm)
      },
    },
    twobtn () {
      if (this.index != 3) {
        this.typeSubOption()
      } else {
        //总能耗
        this.getCoutsIndex()
        /* 当日 */
        this.todayDian()
        /* 当月 */
        this.mountAll()
      }
    },
    index (old) {
      if (old == 0) {
        this.threeLoad = true

        this.dateValue = util.toDateString(new Date(), "yyyy-MM-dd")
        this.vformat = "yyyy-MM-dd"
        this.typeSubOption()
        this.text = "日"
      }
      if (old == 1) {
        this.threeLoad = true

        this.dateValue = util.toDateString(new Date(), "yyyy-MM")
        this.vformat = "yyyy-MM"

        this.typeSubOption()
        this.text = "月"
      }
      if (old == 2) {
        this.threeLoad = true

        this.dateValue = util.toDateString(new Date(), "yyyy")
        this.vformat = "yyyy"

        this.typeSubOption()
        this.text = "年"
      }
      if (old == 3) {
        // this.threeLoad = false;
        //总能耗
        this.getCoutsIndex()
        this.todayDian()
        this.mountAll()
      }
    },
    today () {
      this.todayDian()
    },
    month () {
      this.mountAll()
    },
    value () {
      this.departs()
      // this.department();
      this.getCoutsIndex()
      this.todayDian()
      this.mountAll()
      this.typeSubOption()
    },
  },
  created () {
    this.value = this.user.user.dept_id
  },
  mounted () {
    //总能耗
    this.getCoutsIndex()
    this.todayDian()
    this.mountAll()
    // this.departs();
    this.department()

  },
  computed: {
    ...mapGetters(["permission", "user"]),
    monthAllTopCardData () {
      if (this.month == 1) {
        return this.mei.length != 0 ? this.mei[1].b : "0"
      } else {
        return this.dian.length != 0 ? this.dian[1].b : "0"
      }
    },
    yesTadaySame () {
      if (this.month == 1) {
        return this.mei.length != 0 ? [this.mei[1].s, this.mei[1].z] : [0, 0]
      } else {
        return this.dian.length != 0
          ? [this.dian[1].s, this.dian[1].z]
          : [0, 0]
      }
    },
    mei () {
      if (this.coutsIndex != "") {
        let retArr = []
        let array = this.coutsIndex.mei

        retArr.push(array.dayc)
        retArr.push(array.mothc)
        retArr.push(array.yearc)
        return retArr
      } else {
        return []
      }
    },
    dian () {
      if (this.coutsIndex != "") {
        let retArr = []
        let array = this.coutsIndex.dian
        retArr.push(array.dayc)
        retArr.push(array.mothc)
        retArr.push(array.yearc)
        return retArr
      } else {
        return []
      }
    },
    today_branch_three () {
      // 当日总用电量
      if (this.today_branch_threeData.dayc) {
        let day = this.today_branch_threeData.dayc
        let yesday = this.today_branch_threeData.ydayc
        return {
          title: {
            text: "",
            subtext: this.twobtn == 1 ? "kWh" : "元",
          },
          tooltip: {
            trigger: "axis",
          },
          legend: {
            data: ["今日", "昨日"],
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
              saveAsImage: { show: true },
            },
          },
          calculable: true,
          xAxis: [
            {
              type: "category",
              data: day.map((d) => d.ahour + "时"),
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
              splitLine: {
                show: false
              }
            },
          ],
          series: [
            {
              name: "今日",
              type: "bar",
              data: day.map((d) => d.count),

            },
            {
              name: "昨日",
              type: "bar",
              data: yesday.map((d) => d.count),

            },
          ],
        }
      } else {
        return {}
      }
    },
    monthOption () {
      // 当日总用电量
      if (this.monthData.monthc) {
        let day = this.monthData.monthc
        let yesday = this.monthData.ymonthc
        return {
          title: {
            text: "",
            subtext: this.twobtn == 1 ? "kWh" : "元",
          },
          tooltip: {
            trigger: "axis",
            valueFormatter: (value) => value.toFixed(4)
          },
          legend: {
            data: ["当月", "上月"],
          },
          toolbox: {
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
              data: day.map((d) => d.dates + "日"),
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
              splitLine: {
                show: false
              }
            },
          ],
          series: [
            {
              name: "当月",
              type: "bar",
              data: day.map((d) => d.shu),
            },
            {
              name: "上月",
              type: "bar",
              data: yesday.map((d) => d.shu),
            },
          ],
        }
      } else {
        return {}
      }
    },
    // 分项用电占比 pie1
    electricity () {
      let data = []
      this.electricityData.map((d) => {
        let obj = { name: d.classname, value: d.datas }
        data.push(obj)
      })
      // 用电占比配置
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
            type: "pie",
            radius: ["40%", "70%"],
            avoidLabelOverlap: false,
            label: {
              show: true,
              position: "center",
              normal: {
                show: true,
                formatter: this.twobtn == 1 ? "kWh" : "元",
                position: "center",
                lineHeght: 30,
              },
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
            data: data,
          },
        ],
      }
    },
    electricity_trend () {
      if (this.electricity_trendData == "") {
        return {
          tooltip: {
            trigger: "axis",
            axisPointer: {
              // 坐标轴指示器，坐标轴触发有效
              type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
            },
          },
          title: {
            show: true,
            text: "",
            subtext: this.twobtn == 1 ? "吨标准煤" : "元",
            top: "-2.5%",
          },

          grid: {
            left: "3%",
            right: "4%",
            bottom: "0%",
            containLabel: true,
          },
          xAxis: [
            {
              type: "category", //d.dates || d.amonth/
              data: [],
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
              // name: "电",
              type: "bar",
              stack: "电",
              emphasis: {
                focus: "series",
              },
              data: [],
            },
          ],
        }
      }
      return {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
          },
        },
        title: {
          show: true,
          subtext: this.twobtn === "1" ? "标准吨煤" : "元",
          top: "-2.5%",
        },
        legend: {
          data: ["电"],
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category", //d.dates || d.amonth/
            data: this.electricity_trendData.map((d) =>
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
            // name: "电",
            type: "bar",
            stack: "电",
            emphasis: {
              focus: "series",
            },
            data: this.electricity_trendData.map((d) =>
              d.count ? d.count : d.shu ? d.shu : ""
            ),
          },
        ],
      }
    },
  },
  methods: {
    // 矿名
    async departs () {
      this.name = []
      this.depart.forEach((i) => {
        if (Number(i.id) === Number(this.value)) {
          this.name = i.name
        }
      })
    },
    // 部门列表
    async department () {
      const res = await this.$http.get("/dept/getUserDepList", {
        params: {
          dept_id: this.value,
        },
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
    async getCoutsIndex () {
      //总能耗
      this.coutsIndex = ""
      this.topall = true
      const result_d = await this.$http.get("/energy/getCouts", {
        params: {
          dept_id: this.value,
          road_id: 0,
          cate_id: 1,
          types: this.twobtn,
          datetype: 0,
          dates: util.toDateString(new Date(), "yyyy-MM-dd"),
        },
      })
      const result_m = await this.$http.get("/energy/getCouts", {
        params: {
          dept_id: this.value,
          road_id: 0,
          cate_id: 1,
          types: this.twobtn,
          datetype: 1,
          dates: util.toDateString(new Date(), "yyyy-MM"),
        },
      })
      const result_y = await this.$http.get("/energy/getCouts", {
        params: {
          dept_id: this.value,
          road_id: 0,
          cate_id: 1,
          types: this.twobtn,
          datetype: 2,
          dates: util.toDateString(new Date(), "yyyy"),
        },
      })
      // 用电
      const result_dd = await this.$http.get("/energy/getCouts", {
        params: {
          dept_id: this.value,
          road_id: 0,
          cate_id: 1,
          types: this.twobtn == 1 ? 0 : 2,
          datetype: 0,
          dates: util.toDateString(new Date(), "yyyy-MM-dd"),
        },
      })
      const result_dm = await this.$http.get("/energy/getCouts", {
        params: {
          dept_id: this.value,
          road_id: 0,
          cate_id: 1,
          types: this.twobtn == 1 ? 0 : 2,
          datetype: 1,
          dates: util.toDateString(new Date(), "yyyy-MM"),
        },
      })
      const result_dy = await this.$http.get("/energy/getCouts", {
        params: {
          dept_id: this.value,
          road_id: 0,
          cate_id: 1,
          types: this.twobtn == 1 ? 0 : 2,
          datetype: 2,
          dates: util.toDateString(new Date(), "yyyy"),
        },
      })
      this.topall = false
      this.coutsIndex = {
        dian: {
          dayc: result_dd.data.data,
          mothc: result_dm.data.data,
          yearc: result_dy.data.data,
        },
        mei: {
          dayc: result_d.data.data,
          mothc: result_m.data.data,
          yearc: result_y.data.data,
        },
      }
    },
    typeSelect (i) {
      this.index = i
    },
    async todayDian () {
      this.todayLoad = true

      // 部门id
      let deptId = this.value
      // 今天
      let toDayTime = this.$moment().format('YYYY-MM-DD')
      // 昨天
      let lastDate = this.$moment().subtract(1, 'days').format('YYYY-MM-DD')
      // let types = this.twobtn == '1'?this.today
      /* 今天 */
      const httpToday = getQsDay({
        dept_id: deptId,
        road_id: 0,
        cate_id: 1,
        types: Number(this.twobtn),
        dates: toDayTime,
      })
      /* 昨天 */
      const httpYsToday = getQsDay({
        dept_id: deptId,
        road_id: 0,
        cate_id: 1,
        types: Number(this.twobtn),
        dates: lastDate,
      })
      const [today, yesToday] = await this.$http.all([httpToday, httpYsToday])

      this.today_branch_threeData.dayc = today.data.b
      this.today_branch_threeData.ydayc = yesToday.data.b

      /* end */
      this.todayLoad = false
    },
    async mountAll () {
      this.monthLoad = true
      const result_m = await this.$http.get("/energy/getQsMonth", {
        params: {
          dept_id: this.value,
          road_id: 0,
          cate_id: 1,
          types: this.month,
          dates: util.toDateString(new Date(), "yyyy-MM"),
        },
      })
      const result_ym = await this.$http.get("/energy/getQsMonth", {
        params: {
          dept_id: this.value,
          road_id: 0,
          cate_id: 1,
          types: this.month,
          dates: util.getLastMonth(),
        },
      })
      this.monthLoad = false
      this.monthData.monthc = result_m.data.data.b
      this.monthData.ymonthc = result_ym.data.data.b
    },
    change () {
      // 选择日期后
      this.typeSubOption()
    },
    /*************** end ***************/

    // 数据
    async typeSubOption () {
      this.threeLoad = true
      let url = {
        0: "/energy/getQsDay",
        1: "/energy/getQsMonth",
        2: "/energy/getQsYear",
      }
      if (this.index == 3) return
      this.$http
        .post(url[this.index], {
          dept_id: this.value,
          road_id: 0,
          cate_id: 1,
          types: Number(this.twobtn),
          dates: this.dateValue,
        })
        .then((res) => {
          this.threeLoad = false

          let data = res.data.data
          this.electricity_trendData = data.b
        })
      // unit
      const result = await this.$http.post("/energy/getCouts", {
        dept_id: this.value,
        road_id: 0,
        cate_id: 1,
        types: Number(this.twobtn),
        datetype: this.index,
        dates: this.dateValue,
      })
      this.couts = result.data.data
      const result_h = await this.$http.post("/energy/getCoutsClass", {
        dept_id: this.value,
        road_id: 0,
        cate_id: 1,
        types: this.twobtn == "1" ? "0" : this.twobtn == "2" ? "1" : "0",
        datetype: this.index,
        dates: this.dateValue,
      })
      this.tableData = result_h.data.data

      const result_z = await this.$http.post("/energy/getCoutsClassBili", {
        dept_id: this.value,
        road_id: 0,
        cate_id: 1,
        types: this.twobtn == "1" ? "0" : this.twobtn == "2" ? "1" : "0",
        datetype: this.index,
        dates: this.dateValue,
      })
      this.electricityData = result_z.data.data
      this.threeLoad = false
    },
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
.right-center {
  padding: 30px;
  text-align: center;
  font-size: 30px;
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
</style>