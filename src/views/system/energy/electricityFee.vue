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
              年度
            </el-button>
            <el-button
              :type="report_data == 1 ? 'primary' : ''"
              @click="report_dataFunc(1)"
            >
              任意时段
            </el-button>
            <div class="flex inline">
              <el-date-picker
                v-model="date"
                :type="dateType"
                @change="change"
                placeholder="选择日期"
              >
              </el-date-picker>
            </div>
            <el-button
              style="margin-left: 10px"
              type="primary"
              @click="$refs.table.reload()"
              icon="el-icon-search"
              class="ele-btn-icon"
              >查询
            </el-button>
            <el-button @click="(table.where = {}) && $refs.table.reload()"
              >导出
            </el-button>

            <div class="depart">
              <treeselect
                v-if="permission.includes('sys:xiala:view')"
                class="departs"
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
          </div>
        </el-col>
      </el-row>
    </el-form>
    <el-card>
      <el-row>
        <el-col :span="24">
          <ele-chart :option="electricity_trend" style="height: 300px" />
        </el-col>
        <el-col>
          <!-- table   :row-class-name="tableRowClassName" -->
          <el-table
            :data="tableData"
            style="width: 100%"
            height="calc(100vh - 515px)"
          >
            <el-table-column prop="date" label="日期" width="180">
            </el-table-column>
            <el-table-column prop="name" label="姓名" width="180">
            </el-table-column>
            <el-table-column prop="address" label="地址"> </el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>
<script>
import EleChart from "@/components/EleChart";
import { mapGetters } from "vuex";
import Treeselect from "@riophae/vue-treeselect"; // 下拉树
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
import util from "../../../../src/utils/util";
// import { toDateString } from "@/utils/util";

export default {
  name: "electricityFee",
  components: { EleChart, Treeselect },

  data() {
    return {
      table: { url: "/energy/index", where: {} }, // 表格配置
      report_data: 0,
      dateType: "date",
      date: new Date(),
      /****************/
      tableData: [],
      dept: "",
      depart: [],
    };
  },
  mounted() {
    this.getId();
    this.departs();
    this.department();
  },
  watch: {
    report_data() {
      if (this.report_data == 0) {
        this.dateType = "date";
      } else {
        this.dateType = "daterange";
        let date = new Date();
        let year = date.getFullYear();
        this.date = [new Date(String(year)), new Date()];
      }
    },
    dept() {
      this.getId();
      this.departs();
      // this.department();
    },
  },
  computed: {
    ...mapGetters(["permission", "user"]),
    electricity_trend() {
      return {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
          },
        },
        legend: {
          data: ["每月总电费趋势"],
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
            data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
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
            name: "每月总电费趋势",
            type: "bar",
            stack: "广告",
            emphasis: {
              focus: "series",
            },
            data: [120, 132, 101, 134, 90, 230, 210],
          },
        ],
      };
    },
  },
  methods: {
    change() {},
    report_dataFunc(i) {
      this.report_data = i;
    },
    getId() {
      this.dept = this.user.user.dept_id;
      // console.log(this.dept);
    },

    // 矿名
    async departs() {
      this.name = [];
      // if (this.depart.length <= 0) {
      //   const det = await this.department();
      //   if (det) {
      //     this.departs();
      //   }
      //   return;
      // }
      this.depart.forEach((i) => {
        if (Number(i.id) === Number(this.dept)) {
          this.name = i.name;
        }
      });
    },
    // 部门列表
    async department() {
      const res = await this.$http.get("/dept/getUserDepList", {
        params: {
          dept_id: this.dept,
        },
      });
      let data = res.data.data;
      this.depart = util.toTreeData(data, "id", "pid", "children");
    },
  },
};
</script>
<style scoped>
.flex {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin: 10px 0;
}
.departs {
  width: 300px;
  margin-left: 30px;
}
</style>
