<template>
  <div class="ele-body">
    <el-row :gutter="10">
      <el-col :span="5">
        <el-card shadow="never" class="card">
          <div class="left-top">
            <div class="flex">
              <div class="label">类别:</div>
              <!-- -->
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
              <!-- <el-button
                type="primary"
                size="mini"
                icon="el-icon-position"
              ></el-button> -->
            </div>
            <div class="flex">
              <div class="label">标签:</div>
              <div class="flex btn_wrap">
                <el-button
                  :type="index == 0 ? 'primary' : ''"
                  @click="typeSelect(0)"
                  size="mini"
                  >支路</el-button
                >
                <el-button
                  :type="index == 1 ? 'primary' : ''"
                  @click="typeSelect(1)"
                  size="mini"
                  >分项</el-button
                >
                <el-button
                  :type="index == 2 ? 'primary' : ''"
                  @click="typeSelect(2)"
                  size="mini"
                  >部门</el-button
                >
              </div>
            </div>
            <div class="flex">
              <div class="label">日期:</div>
              <el-date-picker
                v-model="date"
                :type="dateType"
                @change="change"
                format="yyyy"
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
            v-loading="tree"
            :default-checked-keys="['1,2,3']"
          ></el-tree>
        </el-card>
      </el-col>

      <el-col :span="19">
        <el-card shadow="never">
          <ele-chart ref="bar" :option="option" style="height: 250px" />

          <ele-data-table
            ref="table"
            :data="colmun"
            :choose.sync="choose"
            height="calc(100vh - 460px)"
            highlight-current-row
            v-loading="load"
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
import EleChart from "@/components/EleChart"

// 下拉树
import Treeselect from "@riophae/vue-treeselect"
import "@riophae/vue-treeselect/dist/vue-treeselect.css"


export default {
  components: { EleChart, Treeselect },
  name: "SysEnergy",
  data () {
    return {
      index: 0, // 树 -支路0 分项1部门2分区3
      report_data: 2, // 日 - 月 - 年 报表
      tree: false, // 树加载
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
      date: "", // 日期
      seleTree: [],

      defaultProps: {
        label: "title",
        children: "child",
      },
      treedata: [],
      dept: null,
      // 下拉树
      laod: false,
      depart: [],

    }
  },
  watch: {
    dept (v) {
      if (v && v != this.user.user.dept_id) {
        this.getTreeClassList()
      }
    },
    index () {
      this.table = []
      this.getTreeClassList()
    },
    wtypes () {
      this.table = []
      this.getTreeClassList()
    },
  },
  computed: {
    ...mapGetters(["permission", "user"]),
    // 过滤 id 为 false  el-tree 组件报错
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
            type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
          },
        },
        legend: {
          // data: ["邮件营销", "联盟广告", "视频广告"],
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
  created () {
    this.dept = this.user.user.dept_id
  },
  mounted () {
    this.getTreeClassList()
    // 
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
      this.seleTree = this.$refs.tree.getCheckedNodes()
      this.tableFunc(this.report_data, d)
      return false
    },
    tableFunc (i = this.report_data, id = "", date) {
      let dates = {
        0: util.toDateString(new Date(), "yyyy-MM-dd"),
        1: util.toDateString(new Date(), "yyyy-MM"),
        2: util.toDateString(new Date(), "yyyy"),
      }
      // 
      this.load = true
      this.$refs.bar.chart.showLoading({
        maskColor: '#021132'
      })
      // 
      this.$http
        .post(this.url[this.report_data], {
          dept_id: this.dept,
          road_id: 0,
          cate_id: 4,
          types: Number(this.index) + 1,
          dates: date || dates[i],
          id: id.equipment_id,
        })
        .then((res) => {
          if (res.data.data) {
            this.load = false
            this.$refs.bar.chart.hideLoading()

            if (res.data.data[0]) {
              this.colmun = res.data.data[0]
            } else {
              this.colmun = res.data.data.b
              this.colmuny = res.data.data.y
            }
            this.$refs.table.reload()
            // 重新布局
            // this.$refs.table.doLayout()
          }
        })
        .catch((e) => console.log(e))
    },
    getTreeClassList () {
      this.tree = true
      let url = {
        0: "/energy/getQyTreeCalss",
        1: "/energy/getFxTreeCalss",
        2: "/energy/getBmTreeCalss",
        3: "/energy/getQyTreeCalss",
      }
      this.load = true

      // 区域查询
      this.$http
        .get(url[this.index], {
          params: {
            dept_id: this.dept,
            road_id: 0,
            cate_id: 4,
          },
        })
        .then((res) => {
          this.tree = false
          if (res.data.code === 0) {
            this.treedata = res.data.data
            // 表格
            this.tableFunc(0)
          } else {
            this.$message.error(res.data.msg)
          }
        })
        .catch((e) => {
          this.tree = false
          this.$message.error(e.message)
        })
    },
    /*********************/
    typeSelect (i) {
      this.index = i
    },
    report_dataFunc (i) {
      this.report_data = i
      this.table = []
      this.tableFunc(i)
    },
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
    /**
     * 显示编辑
     */
    edit (row) {
      this.$http
        .get("/energy/info?id=" + row.id)
        .then((res) => {
          if (res.data.code === 0) {
            this.editForm = res.data.data
            this.showEdit = true
          } else {
            this.$message.error(res.data.msg)
          }
        })
        .catch((e) => {
          this.$message.error(e.message)
        })
    },
    /**
     * 保存编辑
     */
    save () {
      this.$refs["editForm"].validate((valid) => {
        if (valid) {
          const loading = this.$loading({ lock: true })
          this.$http
            .post("/energy/edit", this.editForm)
            .then((res) => {
              loading.close()
              if (res.data.code === 0) {
                this.showEdit = false
                this.$message({ type: "success", message: res.data.msg })
                this.$refs.table.reload()
              } else {
                this.$message.error(res.data.msg)
              }
            })
            .catch((e) => {
              loading.close()
              this.$message.error(e.message)
            })
        } else {
          return false
        }
      })
    },
    /**
     * 刪除(批量刪除)
     */
    remove (row) {
      if (!row) {
        // 批量删除
        if (this.choose.length === 0) {
          return this.$message.error("请至少选择一条数据")
        }
        let ids = this.choose.map((d) => d.id)
        this.$confirm("确定要删除选中的能耗吗?", "提示", { type: "warning" })
          .then(() => {
            const loading = this.$loading({ lock: true })
            this.$http
              .post("/energy/delete", { id: ids })
              .then((res) => {
                loading.close()
                if (res.data.code === 0) {
                  this.$message({ type: "success", message: res.data.msg })
                  this.$refs.table.reload()
                } else {
                  this.$message.error(res.data.msg)
                }
              })
              .catch((e) => {
                loading.close()
                this.$message.error(e.message)
              })
          })
          .catch(() => 0)
      } else {
        // 单个删除
        const loading = this.$loading({ lock: true })
        this.$http
          .post("/energy/delete", { id: row.id })
          .then((res) => {
            loading.close()
            if (res.data.code === 0) {
              this.$message({ type: "success", message: res.data.msg })
              this.$refs.table.reload()
            } else {
              this.$message.error(res.data.msg)
            }
          })
          .catch((e) => {
            loading.close()
            this.$message.error(e.message)
          })
      }
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
.inline {
  padding-left: 20px;
}
.card {
  min-height: 500px;
}
.btn_wrap {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-content: center;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
}
</style>
