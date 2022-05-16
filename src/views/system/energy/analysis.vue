<template>
  <div class="ele-body">
    <el-row :gutter="10">
      <el-col :span="5">
        <el-card shadow="never">
          <div class="left-top">
            <div class="flex">
              <div class="label">部门:</div>
              <treeselect
                v-loading="load"
                class="depart"
                v-model="dept"
                :options="depart"
                placeholder="请选择单位"
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
            <div class="flex">
              <div class="label">标签:</div>
              <el-button
                :type="index == 1 ? 'primary' : ''"
                @click="index = 1"
                size="mini"
                >分项</el-button
              >
              <el-button
                :type="index == 0 ? 'primary' : ''"
                @click="index = 0"
                size="mini"
                >区域</el-button
              >
              <el-button
                :type="index == 2 ? 'primary' : ''"
                @click="index = 2"
                size="mini"
                >部门</el-button
              >
            </div>
            <div class="flex inline">
              <div class="label">日期:</div>
              <el-date-picker
                v-model="date"
                :type="dateType"
                @change="change"
                format="yyyy"
                value-format="yyyy"
                placeholder="选择日期"
              >
              </el-date-picker>
            </div>
          </div>
          <el-tree
            ref="tree"
            :default-expand-all="true"
            :data="filterTreeData"
            :props="defaultProps"
            node-key="id"
            @node-click="handleNodeClick"
            :expand-on-click-node="false"
            :check-on-click-node="true"
            :check-strictly="true"
            :default-checked-keys="['1,2,3']"
            v-loading="tree"
          ></el-tree>
        </el-card>
      </el-col>

      <el-col :span="19">
        <el-card shadow="never">
          <!-- 搜索表单 -->
          <ele-chart :option="option" style="height: 200px" />

          <ele-data-table
            ref="table"
            :data="colmun"
            :choose.sync="choose"
            height="calc(100vh - 415px)"
            highlight-current-row
            v-loading="loadtables"
          >
            <el-table-column
              type="selection"
              width="45"
              align="center"
              fixed="left"
            />
            <el-table-column
              label="月"
              width="100"
              prop="amonth"
              align="center"
              fixed="left"
              show-overflow-tooltip
            />
            <el-table-column
              label="本期"
              width="300"
              prop="count"
              align="center"
              fixed="left"
              show-overflow-tooltip
            />
            <el-table-column
              label="同期"
              align="center"
              fixed="left"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <div>
                  {{
                    colmuny[scope.$index].count == 0
                      ? "-"
                      : colmuny[scope.$index].count
                  }}
                </div>
              </template>
            </el-table-column>
            <el-table-column
              label="同比"
              align="center"
              fixed="left"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <div
                  :style="{
                    color: round(scope.$index) > 0 ? 'red' : '#09f309',
                  }"
                >
                  {{
                    round(scope.$index) == 0 ? "-" : round(scope.$index) + "%"
                  }}
                  <i
                    v-if="round(scope.$index) == 0 ? false : true"
                    :class="{
                      'el-icon-caret-bottom':
                        round(scope.$index) * 1 <= 0 ? true : false,
                      'el-icon-caret-top':
                        round(scope.$index) * 1 < 0 ? false : true,
                    }"
                  ></i>
                </div>
              </template>
            </el-table-column>
          </ele-data-table>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from "vuex"
import util from "@/utils/util"
import XLSX from "xlsx"
import { getQsYear } from '@/api/mainLay/energy.js'
// echarts
import EleChart from "@/components/EleChart"
// 下拉树
import Treeselect from "@riophae/vue-treeselect"
import "@riophae/vue-treeselect/dist/vue-treeselect.css"

export default {
  components: { EleChart, Treeselect },
  name: "SysEnergy",
  data () {
    return {
      index: 1, // 树 -支路0 分项1部门2分区3
      wtypes: 0,
      colmun: [],
      colmuny: [],
      load: false,
      url: {
        0: "/energy/getQsDay",
        1: "/energy/getQsMonth",
        2: "/energy/getQsYear",
        3: "/energy/getQsClassYear",
      },
      choose: [], // 表格选中数据
      dateType: "year",
      date: util.toDateString(new Date(), "yyyy"), // 日期
      seleTree: [],
      defaultProps: {
        label: "title",
        children: "child",
      },
      treedata: [],
      dept: "",
      tree: false, // 树加载
      // 下拉树
      laod: false,
      loadtables: false,
      depart: [],
    }
  },
  watch: {
    dept (v) {
      if (v && v != this.user.user.dept_id) {
        this.queryDevice()
      }
    },
    index () {
      this.table = []
      this.queryDevice()
    },
    wtypes () {
      this.table = []
      this.queryDevice()
    },
  },
  computed: {
    ...mapGetters(["permission", "user"]),
    filterTreeData () {
      util.eachTreeData(this.treedata, function (d) {
        d.equipment_id = d.id == false ? '-1' : d.id
        d.id = Math.random() * (100 - 0) + 0
      }, 'child')
      return this.treedata
    },
    option () {
      if (!this.colmun) {
        return
      }
      return {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow", // 默认为直线，可选为：'line' | 'shadow'

          },
          valueFormatter: (value) => value + 'kw h'
        },

        legend: {
          data: ["本期", "上期"],
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
            data: this.colmun.map((i) =>
              i.ahour
                ? String(i.ahour) + "时"
                : i.dates
                  ? String(i.dates)
                  : i.amonth
                    ? String(i.amonth) + "月"
                    : String(i.ahour) + "时"
            ),
            axisLabel: {
              // textStyle: {
              color: "#fff",
              // },
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            axisLabel: {
              // textStyle: {
              color: "#fff",
              // },
              formatter: '{value} kw h'
            },
          },
        ],
        series: [
          {
            name: "本期",
            type: "bar",
            emphasis: {
              focus: "series",
            },
            data: this.colmun.map((i) =>
              i.count ? i.count : i.shu ? i.shu : i.count
            ),
          },
          {
            name: "上期",
            type: "bar",
            emphasis: {
              focus: "series",
            },
            data: this.colmuny.map((i) =>
              i.count ? i.count : i.shu ? i.shu : i.count
            ),
          },
        ],
      }
    },
  },
  mounted () {
    this.dept = this.user.user.dept_id
    /* 设备 */
    this.queryDevice()
    this.department()
  },
  methods: {
    // 部门列表
    async department () {
      this.load = true
      const res = await this.$http.get("/dept/getUserDepList", {
        params: {
          dept_id: this.dept
        }
      })
      this.load = false
      let data = res.data.data
      this.depart = util.toTreeData(data, "id", "pid", "children")
    },
    /**/
    round (i) {
      let d = 0
      if (this.colmuny[i].count == 0) {
        d = 0
      } else if (this.colmun[i].count == this.colmuny[i].count) {
        d = 100
      } else {
        d =
          ((this.colmun[i].count - this.colmuny[i].count) /
            this.colmuny[i].count) *
          100
      }

      return d.toFixed(2)
    },
    /*树节点*/
    handleNodeClick (d) {
      this.seleTree = this.$refs.tree.getCheckedNodes()[0]
      // console.log(d) ==
      // console.log(this.seleTree[0])
      /* 表格 图表 */
      this.tableFunc(d)
      return false
    },
    /* 表格 图表 */
    async tableFunc (id = "") {
      this.loadtables = true
      const result = await getQsYear({
        dept_id: this.dept,
        road_id: 0,
        cate_id: 1,
        types: 0,
        dates: this.date,
        id: id.equipment_id,
      }).catch((e) => console.log(e))
      this.loadtables = false
      if (result.data) {
        if (result.data[0]) {
          this.colmun = result.data[0]
        } else {
          this.colmun = result.data.b
          this.colmuny = result.data.y
        }
        this.$refs.table.reload()
        this.$refs.table.doLayout()
      }
    },
    /* 查询设备 */
    queryDevice () {
      this.tree = true
      /* 分类查询设备 接口 */
      let url = {
        0: "/energy/getQyTreeCalss",
        1: "/energy/getFxTreeCalss",
        2: "/energy/getBmTreeCalss",
        3: "/energy/getQyTreeCalss",
      }
      // 区域查询
      this.$http
        .get(url[this.index], {
          params: {
            dept_id: this.dept,
            road_id: 0,
            cate_id: 1,
          },
        })
        .then((res) => {
          this.tree = false
          if (res.data.code === 0) {
            this.treedata = res.data.data
            // 表格
            this.tableFunc()
          } else {
            this.$message.error(res.data.msg)
          }
        })
        .catch((e) => {
          this.$message.error(e.message)
        })
    },
    /*********************/
    change () {
      this.tableFunc()
    },
    /* 导出数据 */
    exportData () {
      let array = []
      let arr = []
      this.colmun.forEach((i) => {
        arr.push(
          i.ahour
            ? String(i.ahour) + "时"
            : i.dates
              ? String(i.dates)
              : i.amonth
                ? String(i.amonth)
                : String(i.ahour) + "时"
        )
      })
      array.push(arr) // 表头
      this.tables.forEach((d) => {
        array.push(d.data)
      })
      let sheet = XLSX.utils.aoa_to_sheet(array)
      this.$util.exportSheet(XLSX, sheet, "能源报表")
    },


  },
};
</script>

<style scoped>
.ele-block >>> .el-upload,
.ele-block >>> .el-upload-dragger {
  width: 100%;
}
.flex {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin: 10px 0;
}
.label {
  margin-right: 10px;
  white-space: nowrap;
}
</style>
