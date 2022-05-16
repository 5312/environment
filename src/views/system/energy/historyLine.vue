<template>
  <div class="ele-body">
    <el-form
      :model="table.where"
      label-width="77px"
      class="ele-form-search"
      @keyup.enter.native="$refs.table.reload()"
      @submit.native.prevent
    >
      <el-row>
        <el-col :md="6" :sm="12">
          <div class="ele-form-actions flex">
            <el-button
              :type="report_data == 0 ? 'primary' : ''"
              @click="report_dataFunc(0)"
            >
              日
            </el-button>
            <el-button
              :type="report_data == 2 ? 'primary' : ''"
              @click="report_dataFunc(2)"
            >
              月
            </el-button>
            <el-button
              :type="report_data == 3 ? 'primary' : ''"
              @click="report_dataFunc(3)"
            >
              年
            </el-button>
            <el-button plain style="margin-right: 10px"> 日期： </el-button>
            <div class="flex inline">
              <el-date-picker
                v-model="date"
                :type="dateType"
                @change="change"
                placeholder="选择日期"
              >
              </el-date-picker>
            </div>
            <!-- <el-button
              style="margin-left:10px;"
              type="primary"
              @click="$refs.table.reload()"
              icon="el-icon-search"
              class="ele-btn-icon"
              >查询
            </el-button>
            <el-button @click="(table.where = {}) && $refs.table.reload()"
              >导出
            </el-button> -->
          </div>
        </el-col>
      </el-row>
    </el-form>
    <!-- <el-card class="echartBox"> -->
    <el-row class="echartBox">
      <!-- <el-col :span="11" :offset="1" class="echartItem">
          <ele-chart :option="electricity_trend" style="height:300px;padding: 1% 0;" />
        </el-col>
        <el-col :span="11" :offset="1" class="echartItem">
          <ele-chart :option="electricity_trend" style="height:300px;padding: 1% 0;" />
        </el-col>
        <el-col :span="11" :offset="1" class="echartItem">
          <ele-chart :option="electricity_trend" style="height:300px;padding: 1% 0;" />
        </el-col> -->
      <el-col
        :span="11"
        class="echartItem"
        v-for="(item, index) in chartList"
        :key="index"
        v-show="smalFlag"
      >
        <el-card shadow="never" :header="item.name">
          <!-- <div class="chartTitle">{{item.name}}</div> -->
          <ele-chart
            class="echartItems"
            name="echartItems"
            :isConnect="item.isConnect"
            @done="done"
            :connectCharts="connectCharts"
            :option="electricity_trend"
            style="height: 320px; padding: 2% 0 1%"
            :key="index"
          />
          <div class="chartFooter">
            <i class="el-icon-full-screen" @click="screen(index)"></i>
          </div>
        </el-card>
      </el-col>
      <transition name="el-zoom-in-top">
        <el-col :span="24" class="bigItem" v-if="bigFlag">
          <el-card shadow="never" :header="bigName">
            <!-- <div class="chartTitle">{{bigName}}</div> -->
            <ele-chart
              :option="option"
              style="height: 565px; padding: 2% 0 1%"
            />
            <div class="chartFooter bigFooter">
              <i class="el-icon-full-screen big" @click="smal"></i>
            </div>
          </el-card>
        </el-col>
      </transition>
    </el-row>
    <!-- </el-card> -->
  </div>
</template>
<script>
import EleChart from "@/components/EleChart";
// import { toDateString } from "@/utils/util";

export default {
  name: "historyLine",
  components: { EleChart },

  data() {
    return {
      table: { url: "/energy/index", where: {} }, // 表格配置
      report_data: 0,
      dateType: "date",
      date: new Date(),
      connectCharts: [],
      chartList: [
        {
          code: "01",
          name: "1#进线 负荷曲线",
          isConnect: true,
        },
        {
          code: "02",
          name: "3#进线 负荷曲线",
          isConnect: true,
        },
        {
          code: "03",
          name: "丁1线 负荷曲线",
          isConnect: true,
        },
        {
          code: "04",
          name: "丁2线 负荷曲线",
          isConnect: true,
        },
        {
          code: "05",
          name: "丙1线 负荷曲线",
          isConnect: true,
        },
        {
          code: "06",
          name: "丙2线 负荷曲线",
          isConnect: true,
        },
      ],
      smalFlag: true,
      bigFlag: false,
      bigName: "",
      option: {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
          },
          // formatter: function (params) {
          //   // console.log(params,"params")
          //   let date = new Date();
          //   var year = date.getFullYear()+'年';
          //   var month = date.getMonth()+1+'月';
          //   var dates = date.getDate()+'日';
          //   var day = [year,month,dates].join('-');
          //   let title = params[0].name;
          //   if (params.length == 3) {
          //     return `
          //       ${day} ${title}</br>
          //       <span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:#407FFF;"></span>${params[0].seriesName} : ${params[0].value}</br>
          //       <span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:#407FFF;"></span>${params[1].seriesName} : ${params[1].value}</br>
          //       <span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:#00CCCD;"></span>${params[2].seriesName} : ${params[2].value}
          //     `
          //   } else {
          //     return `
          //       ${day} ${title}</br>
          //       <span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:#407FFF;"></span>${params[0].seriesName} : ${params[0].value}</br>
          //       <span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:#407FFF;"></span>${params[1].seriesName} : ${params[1].value}
          //     `
          //   }
          // },
        },
        legend: {
          data: ["", "每日总电量趋势1", "每日总电量趋势2"],
          color: "#666666",
          x: "center", //可设定图例在左、右、居中
          y: "bottom", //可设定图例在上、下、居中
          padding: [0, 0, 0, 0], //可设定图例[距上方距离，距右方距离，距下方距离，距左方距离]
        },
        grid: {
          top: "10%",
          left: "3%",
          right: "3%",
          bottom: "8%",
          containLabel: true,
        },
        xAxis: [
          {
            axisLabel: {
              textStyle: {
                color: "#fff",
              },
            },
            type: "category",
            data: [
              "00:00",
              "02:00",
              "04:00",
              "06:00",
              "08:00",
              "09:00",
              "10:00",
              "12:00",
              "14:00",
              "16:00",
              "18:00",
              "20:00",
              "22:00",
              "00:00",
            ],
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
            // name: "每日总电量趋势1"
          },
          {
            type: "value",
            axisLabel: {
              textStyle: {
                color: "#fff",
              },
            },
            // name: "每日总电量趋势2"
          },
        ],
        series: [
          {
            name: "每日总电量",
            type: "bar",
            stack: "广告",
            emphasis: {
              focus: "series",
            },
            data: [
              132, 101, 134, 90, 230, 100, 50, 250, 300, 350, 280, 200, 150,
              180,
            ],
          },
          {
            name: "每日总电量趋势1",
            type: "line",
            stack: "广告",
            emphasis: {
              focus: "series",
            },
            data: [
              120, 132, 101, 134, 90, 230, 210, 30, 150, 320, 90, 100, 90, 45,
            ],
            markPoint: {
              data: [
                { type: "max", name: "最大值" },
                { type: "min", name: "最小值" },
              ],
            },
          },
          {
            name: "每日总电量趋势2",
            type: "line",
            stack: "广告",
            emphasis: {
              focus: "series",
            },
            data: [
              110, 122, 151, 124, 70, 200, 205, 40, 180, 260, 100, 165, 85, 95,
            ],
            markPoint: {
              data: [
                { type: "max", name: "最大值" },
                { type: "min", name: "最小值" },
              ],
            },
          },
        ],
      },
    };
  },
  watch: {
    report_data() {
      if (this.report_data == 0) {
        this.dateType = "date";
      } else if (this.report_data == 2) {
        this.dateType = "month";
      } else if (this.report_data == 3) {
        this.dateType = "year";
      } else {
        // this.dateType = "daterange";
        // let date = new Date();
        // let year = date.getFullYear();
        // this.date = [new Date(String(year)), new Date()];
      }
    },
  },
  computed: {
    electricity_trend() {
      return {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
          },
          // formatter: function (params) {
          //   // console.log(params,"params")
          //   let date = new Date();
          //   var year = date.getFullYear()+'年';
          //   var month = date.getMonth()+1+'月';
          //   var dates = date.getDate()+'日';
          //   var day = [year,month,dates].join('-');
          //   let title = params[0].name;
          //   return `
          //   ${day} ${title}</br>
          //   <span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:#407FFF;"></span>${params[0].seriesName} : ${params[0].value}</br>
          //   <span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:#407FFF;"></span>${params[1].seriesName} : ${params[1].value}</br>
          //   <span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:#00CCCD;"></span>${params[2].seriesName} : ${params[2].value}
          //   `
          // },
        },
        legend: {
          data: ["", "每日总电量趋势1", "每日总电量趋势2"],
          x: "center", //可设定图例在左、右、居中
          y: "bottom", //可设定图例在上、下、居中
          padding: [0, 0, 0, 0], //可设定图例[距上方距离，距右方距离，距下方距离，距左方距离]
        },
        grid: {
          top: "10%",
          left: "3%",
          right: "3%",
          bottom: "8%",
          containLabel: true,
        },
        xAxis: [
          {
            axisLabel: {
              textStyle: {
                color: "#fff",
              },
            },
            type: "category",
            data: [
              "00:00",
              "02:00",
              "04:00",
              "06:00",
              "08:00",
              "09:00",
              "10:00",
              "12:00",
              "14:00",
              "16:00",
              "18:00",
              "20:00",
              "22:00",
              "00:00",
            ],
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
            // name: "每日总电量趋势1"
          },
          {
            type: "value",
            textStyle: {
              // color: "#8DB6DB",
              color: "#fff",
            },
            // name: "每日总电量趋势2"
          },
        ],
        series: [
          {
            name: "每日总电量",
            type: "bar",
            stack: "广告",
            emphasis: {
              focus: "series",
            },
            // data: [ 132, 101, 134, 90, 230, 100, 50, 250, 300, 350, 280, 200, 150, 180]
            data: this.random(10),
          },
          {
            name: "每日总电量趋势1",
            type: "line",
            stack: "广告",
            emphasis: {
              focus: "series",
            },
            // data: [120, 132, 101, 134, 90, 230, 210, 30, 150, 320, 90, 100, 90, 45],
            data: this.random(12),
            markPoint: {
              data: [
                { type: "max", name: "最大值" },
                { type: "min", name: "最小值" },
              ],
            },
          },
          {
            name: "每日总电量趋势2",
            type: "line",
            stack: "广告",
            emphasis: {
              focus: "series",
            },
            // data: [110, 122, 151, 124, 70, 200, 205, 40, 180, 260, 100, 165, 85, 95],
            data: this.random(14),
            markPoint: {
              data: [
                { type: "max", name: "最大值" },
                { type: "min", name: "最小值" },
              ],
            },
          },
        ],
      };
    },
  },
  mounted() {},
  methods: {
    done(echertD, isConnect) {
      console.log(echertD, isConnect);
      if (isConnect) {
        this.connectCharts.push(echertD);
      }
      console.log(this.connectCharts);
    },
    change() {},
    report_dataFunc(i) {
      this.report_data = i;
    },
    screen(msg) {
      const t = this;
      console.log(t.option, msg);
      t.smalFlag = false;
      t.bigFlag = true;
      t.bigName = this.chartList[msg].name;
    },
    smal() {
      const t = this;
      t.smalFlag = true;
      t.bigFlag = false;
    },
    random(n) {
      let a = [
        200, 300, 400, 500, 600, 700, 80, 90, 105, 115, 125, 135, 145, 155, 165,
        175, 185, 195, 205, 215, 225,
      ]; //生成的随机数的集合
      let res = [];
      for (let i = 0; i < n; i++) {
        let index = parseInt(Math.random() * a.length); //生成一个的随机索引，索引值的范围随数组a的长度而变化
        res.push(a[index]);
        a.splice(index, 1); //已选用的数，从数组a中移除， 实现去重复
      }
      return res;
    },
  },
};
</script>
<style scoped>
.ele-form-actions {
  position: relative;
}
.flex {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin: 10px 0;
}
.echartBox {
  width: 100%;
  height: 100%;
  /* background-color: #f0f0f0; */
}
.echartItem {
  margin: 1% 4% 0.5% 0;
  color: #666666 !important;
  background: rgb(255, 255, 255, 0);
  /* box-shadow: 0 0 2px 0.5px #e1e1e1; */
  border-radius: 5px;
}
.echartItem .el-card /deep/ .el-card__body {
  padding: 0px !important;
}
.bigItem .el-card /deep/ .el-card__body {
  padding: 0px !important;
}
/* .chartTitle {
  width: 100%;
  padding: 13px 20px;
  font-size: 15px;
  color: #262626;
  border-color: #EDEDED;
  text-align: left;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  border-bottom: 1px solid rgb(237, 237, 237,0.5);
} */
.chartFooter {
  width: 100%;
  text-align: right;
  box-sizing: border-box;
  padding: 0 4% 1.5% 0;
}
.el-icon-full-screen {
  cursor: pointer;
  font-size: 25px;
  font-weight: 600;
  color: #f9f9f9;
}
.big {
  font-size: 30px;
}
.el-icon-full-screen:hover {
  color: #409eff;
}
</style>
