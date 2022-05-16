<template>
  <div class="ele-body">
    <el-row :gutter="10">
      <el-col :span="5">
        <el-card shadow="never">
          <div class="left">
            <div class="left-top">
              <div class="margintb flex flex_h_between">
                <div class="label">单位:</div>
                <treeselect
                  v-loading="treeselectload"
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
              <div class="margintb flex flex_flex_h_start" v-loading="tree">
                <div class="label">标签:</div>
                <el-button
                  :type="index == 0 ? 'primary' : ''"
                  @click="index = 0"
                  size="mini"
                  >支路</el-button
                >
                <el-button
                  :type="index == 1 ? 'primary' : ''"
                  @click="index = 1"
                  size="mini"
                  >分项</el-button
                >
                <el-button
                  :type="index == 2 ? 'primary' : ''"
                  @click="index = 2"
                  size="mini"
                  >部门</el-button
                >
              </div>
              <div class="margintb flex flex_h_between">
                <div class="label">
                  电 - {{ ["支路", "分项", "部门"][index] }}
                </div>
                <el-checkbox v-model="checked">全选</el-checkbox>
              </div>
            </div>

            <!--  @node-click="handleNodeClick"-->
            <el-tree
              ref="tree"
              :default-expand-all="true"
              :data="filterTreeData"
              :props="defaultProps"
              node-key="id"
              show-checkbox
              :expand-on-click-node="false"
              :check-on-click-node="true"
              :check-strictly="true"
              @check="handleNodeCheck"
              v-loading="tree"
            ></el-tree>
          </div>
        </el-card>
      </el-col>

      <el-col :span="19">
        <el-card shadow="never">
          <!-- 搜索表单 -->
          <el-form
            :model="table.where"
            label-width="77px"
            class="ele-form-search"
            @keyup.enter.native="$refs.table.reload()"
            @submit.native.prevent
          >
            <el-row :gutter="15">
              <el-col :md="6" :sm="12">
                <div class="ele-form-actions flex flex_h_between">
                  <el-button
                    :type="report_data == 0 ? 'primary' : ''"
                    @click="report_dataFunc(0)"
                    size="mini"
                  >
                    日报表
                  </el-button>
                  <el-button
                    :type="report_data == 1 ? 'primary' : ''"
                    @click="report_dataFunc(1)"
                    size="mini"
                  >
                    月报表
                  </el-button>
                  <el-button
                    :type="report_data == 2 ? 'primary' : ''"
                    @click="report_dataFunc(2)"
                    size="mini"
                    >年报表
                  </el-button>
                  <div class="flex inline flex_h_between">
                    <div class="label">日期:</div>
                    <el-date-picker
                      v-model="date"
                      :type="dateType"
                      @change="change"
                      :format="dateFormat"
                      :value-format="dateFormat"
                      placeholder="选择日期"
                    >
                    </el-date-picker>
                  </div>
                  <el-button
                    style="margin-left: 10px"
                    type="primary"
                    size="mini"
                    @click="$refs.table.reload()"
                    icon="el-icon-search"
                    class="ele-btn-icon"
                    >查询
                  </el-button>
                  <el-button :disabled="yuanshi" size="mini" @click="exportData"
                    >导出
                  </el-button>

                  <el-button-group class="btn flex flex_h_between">
                    <el-button
                      :type="wtypes == 0 ? 'primary' : ''"
                      size="mini"
                      @click="wtypes = 0"
                      >电量</el-button
                    >
                    <el-button
                      :type="wtypes == 2 ? 'primary' : ''"
                      size="mini"
                      @click="wtypes = 2"
                      >电费</el-button
                    >
                  </el-button-group>
                  <el-checkbox v-model="yuanshi" style="margin-left: 10px">
                    显示原始值
                  </el-checkbox>
                  <el-button-group class="btn flex flex_h_between">
                    <el-button
                      :type="viewtable ? 'primary' : ''"
                      size="mini"
                      @click="viewtable = true"
                    >
                      表格
                    </el-button>
                    <el-button
                      :type="!viewtable ? 'primary' : ''"
                      size="mini"
                      @click="viewtable = false"
                    >
                      图表
                    </el-button>
                  </el-button-group>
                </div>
              </el-col>
            </el-row>
          </el-form>
          <el-card v-if="viewtable">
            <!-- 数据表格 -->
            <ele-data-table
              ref="table"
              :data="table"
              :choose.sync="choose"
              height="calc(100vh - 250px)"
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
                label="支路名称"
                width="100"
                prop="name"
                align="center"
                fixed="left"
                show-overflow-tooltip
              />
              <!-- 显示原始值 -->
              <div v-if="yuanshi">
                <el-table-column
                  v-for="(i, y) in colmun"
                  :key="y"
                  :label="text(i)"
                  width="150"
                  prop="count"
                  align="center"
                >
                  <el-table-column prop="count" label="原始值">
                    {{ i.count ? i.count : i.shu }}
                  </el-table-column>
                  <el-table-column
                    v-if="wtypes == 0"
                    prop="eqcont"
                    label="电量"
                  >
                    {{ i.eqcont }}
                  </el-table-column>
                  <el-table-column v-else prop="summoney" label="电费">
                    {{ i.summoney }}
                  </el-table-column>
                </el-table-column>
              </div>
              <!-- 不显示原始值 -->
              <div v-else>
                <el-table-column
                  v-for="(i, y) in colmun"
                  :key="y + 10000"
                  :label="text(i)"
                  width="150"
                  prop="count"
                  align="center"
                >
                  <template slot-scope="{ row }">
                    {{ row.data | costToMete(y, wtypes) }}
                  </template>
                </el-table-column>
              </div>
            </ele-data-table>
          </el-card>
          <el-card v-else>
            <ele-chart
              :option="tablechart"
              style="height: calc(100vh - 200px)"
            ></ele-chart>
          </el-card>
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
import { getQsBiaoYear, getQsBiaoMonth, getQsBiaoDay } from '@/api/mainLay/energy'
// 下拉树
import Treeselect from "@riophae/vue-treeselect"
import "@riophae/vue-treeselect/dist/vue-treeselect.css"
export default {
  name: "SysEnergy",
  components: { Treeselect, EleChart },
  data () {
    return {
      index: 0, // 树 -支路0 分项1部门2分区3
      report_data: 0, // 日 - 月 - 年 报表
      tree: false, // 树加载
      treeselectload: false,
      wtypes: 0,
      table: [],
      colmun: [],
      load: false,
      url: {
        0: "/energy/getQsDay",
        1: "/energy/getQsMonth",
        2: "/energy/getQsYear"
      },
      choose: [], // 表格选中数据
      dateType: "date",
      date: '', // 日期
      dateFormat: 'yyyy-MM-dd',

      defaultProps: {
        label: "title",
        children: "child"
      },
      treedata: [],

      dept: null,
      depart: [],
      checked: false,
      yuanshi: false,
      viewtable: true
    }
  },
  watch: {
    yuanshi () {
      this.$nextTick(() => {
        this.$refs.table.doLayout()
      })
    },
    checked (v) {
      if (v) {
        let arr = []
        util.eachTreeData(this.treedata, function (d) {
          arr.push(d)
        }, 'child')
        this.$refs.tree.setCheckedNodes(arr)
      } else {
        this.$refs.tree.setCheckedNodes([])
      }
      this.tableFunc()
    },
    dept (v) {
      if (v && v != this.user.user.dept_id) {
        this.queryDevice()
      }
    },
    index () {
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
    tablechart () {
      const array = this.table.map(d => {
        return {
          name: d.name,
          data: d.data.map(d => {
            if (this.wtypes == 2) {
              return d.summoney
            } else {
              return d.eqcont ?? d.shu
            }
          }),
          type: 'line',
          smooth: 0.7,
          symbol: 'circle',
          symbolSize: 10,
          markPoint: {
            data: [{
              type: "max"
            }],
            symbol: "pin",
            symbolSize: 40
          }
        }
      })
      let str = this.wtypes == 0 ? 'KWh' : '元'

      return {
        grid: {
          top: '10%'
        },
        legend: {
          type: 'scroll',
          show: true
        },
        tooltip: {
          show: true,
          trigger: 'axis',
          formatter: function (params) {
            var result = params[0].name + "<br>"
            params.forEach(function (item) {
              if (item.value) {
                result += item.marker + " " + item.seriesName + " : " + item.value + str + "</br>"
              } else {
                result += item.marker + " " + item.seriesName + " :  - </br>"
              }
            })
            return result
          }
        },
        xAxis: {
          type: 'category',
          data: this.colmun.map(d => {
            return this.text(d)
          })
        },
        yAxis: {
          type: 'value'
        },
        series: array
      }
    }
  },
  mounted () {
    this.date = util.toDateString(new Date(), this.dateFormat)

    this.dept = this.user.user.dept_id
    /* 设备 */
    this.queryDevice()
    /* 部门 */
    this.department()
  },
  methods: {
    // 部门列表
    async department () {
      this.treeselectload = true
      const res = await this.$http.get("/dept/getUserDepList", {
        params: {
          dept_id: this.dept
        }
      })
      this.treeselectload = false
      let data = res.data.data
      this.depart = util.toTreeData(data, "id", "pid", "children")
    },
    handleNodeCheck () {
      this.tableFunc()
    },
    /*树节点*/
    handleNodeClick (e) {
      /* 选中的 */
      let seleTree = this.$refs.tree.getCheckedNodes()
      /* 手动设置选中 */
      this.$refs.tree.setCheckedNodes([e, ...seleTree])

      this.tableFunc()

      return false
    },
    async tableFunc (i = this.report_data) {
      /* 选中的 */
      let select = this.$refs.tree.getCheckedNodes()

      let dates = {
        0: util.toDateString(new Date(), "yyyy-MM-dd"),
        1: util.toDateString(new Date(), "yyyy-MM"),
        2: util.toDateString(new Date(), "yyyy")
      }
      this.load = true
      /*  */
      const params = {
        cate_id: 1,
        dept_id: this.dept,
        types: this.wtypes,
        dates: this.date || dates[i],
        id: select.map(d => d.equipment_id).join('|') || this.filterTreeData[0].equipment_id
      }
      let respone = null
      try {
        /*  */
        if (this.report_data == 2) {/* 年 */
          respone = await getQsBiaoYear(params)
        } else if (this.report_data == 1) { /* 月 */
          respone = await getQsBiaoMonth(params)
        } else { /* 0 日 */
          respone = await getQsBiaoDay(params)
        }
      } catch (e) {
        this.$message.error(e.message)
      }
      if (respone && respone.code == 0) {
        /* 表头 */
        this.colmun = respone.data[0]
        /* 表格数据 */
        this.table = this.tables(respone.data)
        /* 刷新样式 */
        this.$nextTick(() => {
          if (this.$refs.table) {

            this.$refs.table.reload()
            this.$refs.table.doLayout()
          }
        })
      }
      this.load = false

    },
    tables (requestData) {
      if (!this.$refs.tree) return []
      let table = requestData
      let seleTree = this.$refs.tree.getCheckedNodes()
      if (seleTree.length <= 0) return []
      // console.log(seleTree.length)
      let arr = []

      for (let i = 0; i < table.length; i++) {
        const element = table[i]
        arr.push({
          name: seleTree[i].title,
          data: element
        })
      }
      return arr
    },
    /* 设备 */
    queryDevice () {
      this.tree = true
      let url = {
        0: "/energy/getQyTreeCalss",
        1: "/energy/getFxTreeCalss",
        2: "/energy/getBmTreeCalss",
        3: "/energy/getQyTreeCalss"
      }
      // 区域查询
      this.$http
        .get(url[this.index], {
          params: {
            dept_id: this.dept,
            road_id: 0,
            cate_id: 1
          }
        })
        .then(res => {
          this.tree = false
          if (res.data.code === 0) {
            this.treedata = res.data.data
            /* 默认选中 第一个 */
            this.$nextTick(() => {
              this.$refs.tree.setCheckedNodes([this.treedata[0]])
              // 表格
              this.tableFunc()
            })

          } else {
            this.$message.error(res.data.msg)
          }
        })
        .catch(e => {
          this.$message.error(e.message)
        })
    },
    report_dataFunc (i) {
      /* 日期格式 */
      const obj = ['yyyy-MM-dd', 'yyyy-MM', 'yyyy']
      this.dateFormat = obj[i]
      /* 日期选择框类型 */
      this.dateType = ['date', 'month', 'year'][i]
      /* 切换 */
      this.report_data = i
      /* 时间 */
      this.date = util.toDateString(new Date(), this.dateFormat)

      this.table = []
      this.tableFunc()
    },
    /*  */
    text (i) {
      const a = Object.prototype.hasOwnProperty.call(i, "ahour") ? i.ahour + '时' :
        Object.prototype.hasOwnProperty.call(i, "dates") ? util.toDateString(i.dates, 'yyyy-MM-dd') :
          Object.prototype.hasOwnProperty.call(i, "amonth") ? i.amonth + '月' : ''
      return a
    },
    change () {
      this.tableFunc()
    },
    /* 导出数据 */
    exportData () {
      let array = []
      let arr = ['支路名称']
      this.colmun.forEach(i => {
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
      this.table.forEach(d => {
        const row = d.data.map(d => {
          return d.count ? d.count :
            d.shu ? d.shu : 0
        })
        row.unshift(d.name)
        array.push(row)
      })
      console.log(array)
      let sheet = XLSX.utils.aoa_to_sheet(array)
      this.$util.exportSheet(XLSX, sheet, "能源报表")
    },
  },
  /* 过滤器 */
  filters: {
    costToMete (data, y, wtypes) {
      if (wtypes == 0) {
        return data[y].eqcont
        // return data[y].count ? data[y].count :
        //   data[y].shu ? data[y].shu :
        //     ''
      }
      return data[y].summoney

    }
  }
};
</script>

<style scoped>
.ele-block >>> .el-upload,
.ele-block >>> .el-upload-dragger {
  width: 100%;
}
.btn {
  display: flex;
  margin-left: 30px;
}
.left {
  height: calc(100vh - 135px);
}
.margintb {
  margin: 15px 0;
}
.label {
  margin-right: 10px;
  white-space: nowrap;
}
.inline {
  padding-left: 20px;
}
</style>
