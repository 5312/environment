<template>
  <div class="ele-body">
    <el-row :gutter="10">
      <el-col :span="5">
        <el-card shadow="never">
          <div class="left-top">
            <div class="flex">
              <div class="label">类别:</div>
              <el-button
                type="primary"
                size="mini"
                icon="el-icon-position"
              ></el-button>
            </div>
            <div class="flex">
              <div class="label">标签:</div>
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
              <el-button
                :type="index == 3 ? 'primary' : ''"
                @click="typeSelect(3)"
                size="small"
                >分区</el-button
              >
            </div>
          </div>
          <el-tree
            :default-expand-all="true"
            :data="data"
            :props="defaultProps"
            show-checkbox
            @node-click="handleNodeClick"
          ></el-tree>
        </el-card>
      </el-col>

      <el-col :span="19">
        <el-card shadow="never">
          <!-- 图表 -->
          <ele-chart :option="option" style="height: 200px" />
          <ele-data-table
            ref="table"
            :config="table"
            :choose.sync="choose"
            height="calc(100vh - 415px)"
            highlight-current-row
          >
            <template slot-scope="{ index }">
              <el-table-column
                type="selection"
                width="45"
                align="center"
                fixed="left"
              />
              <el-table-column
                type="index"
                :index="index"
                label="支路名称"
                width="100"
                align="center"
                fixed="left"
                show-overflow-tooltip
              />

              <el-table-column
                label="创建时间"
                sortable="custom"
                show-overflow-tooltip
                min-width="160"
              >
                <template slot-scope="{ row }">{{
                  (row.create_time * 1000) | toDateString
                }}</template>
              </el-table-column>
              <el-table-column
                type="index"
                :index="index"
                label="合计"
                width="60"
                align="center"
                fixed="left"
                show-overflow-tooltip
              />
            </template>
          </ele-data-table>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from "vuex"
import EleChart from "@/components/EleChart"

export default {
  name: "SysEnergy",
  components: { EleChart },

  data () {
    return {
      dateType: "date",
      index: 0, // 树 - 标签

      report_data: 0,
      table: { url: "/datainfo/index", where: {} }, // 表格配置
      choose: [], // 表格选中数据
      date: "", // 日期

      defaultProps: {
        label: "title",
        children: "child"
      },
      data: []
    }
  },
  watch: {
    index () {
      this.getDeptList()
    }
  },
  computed: {
    ...mapGetters(["permission"]),
    // 分项用电占比 pie1
    option () {
      return {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          data: [""]
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
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
          }
        ],
        yAxis: [
          {
            type: "value",
            axisLabel: {
              textStyle: {
                color: "#fff",
              },
            },
          }
        ],
        series: [
          {
            name: "",
            type: "bar",
            stack: "广告",
            emphasis: {
              focus: "series"
            },
            data: [120, 132, 101, 134, 90, 230, 210]
          }
        ]
      }
    }
  },
  mounted () {
    this.getDeptList()
  },
  methods: {
    getDeptList () {
      console.log("树")
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
            dept_id: "22"
          }
        })
        .then(res => {
          if (res.data.code === 0) {
            this.data = res.data.data
          } else {
            this.$message.error(res.data.msg)
          }
        })
        .catch(e => {
          this.$message.error(e.message)
        })
    },
    /*****树**********/
    // 数据
    typeSubOption () {
      console.log("--")
      let pie1 = {
        1: [{ value: 1048, name: "电" }],
        2: [{ value: 1048, name: "电" }],
        3: [{ value: 1048, name: "电" }]
      }
      this.electricityData = pie1[this.index]
    },
    typeSelect (i) {
      this.index = i
    },

    report_dataFunc (i) {
      this.report_data = i
    },
    /*树节点*/
    handleNodeClick () { },
    /**
     * 显示编辑
     */
    edit (row) {
      this.$http
        .get("/energy/info?id=" + row.id)
        .then(res => {
          if (res.data.code === 0) {
            this.editForm = res.data.data
            this.showEdit = true
          } else {
            this.$message.error(res.data.msg)
          }
        })
        .catch(e => {
          this.$message.error(e.message)
        })
    },
    /**
     * 保存编辑
     */
    save () {
      this.$refs["editForm"].validate(valid => {
        if (valid) {
          const loading = this.$loading({ lock: true })
          this.$http
            .post("/energy/edit", this.editForm)
            .then(res => {
              loading.close()
              if (res.data.code === 0) {
                this.showEdit = false
                this.$message({ type: "success", message: res.data.msg })
                this.$refs.table.reload()
              } else {
                this.$message.error(res.data.msg)
              }
            })
            .catch(e => {
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
      console.log(row)
      if (!row) {
        // 批量删除
        if (this.choose.length === 0) {
          return this.$message.error("请至少选择一条数据")
        }
        let ids = this.choose.map(d => d.id)
        this.$confirm("确定要删除选中的能耗吗?", "提示", { type: "warning" })
          .then(() => {
            const loading = this.$loading({ lock: true })
            this.$http
              .post("/energy/delete", { id: ids })
              .then(res => {
                loading.close()
                if (res.data.code === 0) {
                  this.$message({ type: "success", message: res.data.msg })
                  this.$refs.table.reload()
                } else {
                  this.$message.error(res.data.msg)
                }
              })
              .catch(e => {
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
          .then(res => {
            loading.close()
            if (res.data.code === 0) {
              this.$message({ type: "success", message: res.data.msg })
              this.$refs.table.reload()
            } else {
              this.$message.error(res.data.msg)
            }
          })
          .catch(e => {
            loading.close()
            this.$message.error(e.message)
          })
      }
    }
  }
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
</style>
