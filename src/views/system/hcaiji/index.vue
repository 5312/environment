<template>
  <div class="ele-body">
    <el-card shadow="never">
      <el-row :gutter="40">
        <el-col :span="6">
          <el-tree
            node-key="id"
            default-expand-all
            highlight-current
            :data="data"
            class="tree-line"
            :props="defaultProps"
            :empty-text="empty"
            @node-click="infomark"
          >
            <span slot-scope="{ data }">
              <span class="span">
                <i
                  class="i2"
                  :class="{
                    'el-icon-office-building': data.level == 1 ? true : false,
                    'el-icon-school': data.level == 2 ? true : false,
                    'el-icon-truck': data.level == 3 ? true : false,
                    span2: data.level == 3 ? true : false,
                    i: data.level == 3 ? true : false,
                  }"
                ></i>
                {{ data.name }}
              </span>
            </span>
          </el-tree>
        </el-col>
        <el-col :span="18">
          <!-- 操作按钮 -->
          <div class="ele-table-tool ele-table-tool-default">
            <el-button
              @click="pop"
              type="primary"
              icon="el-icon-plus"
              class="ele-btn-icon"
              size="small"
              v-if="permission.includes('sys:hcaiji:add')"
              >添加
            </el-button>
            <el-button
              @click="remove()"
              type="danger"
              icon="el-icon-delete"
              class="ele-btn-icon"
              size="small"
              v-if="permission.includes('sys:hcaiji:dall')"
              >批量删除
            </el-button>
          </div>
          <!-- 数据表格 -->
          <ele-data-table
            ref="table"
            :config="table"
            :choose.sync="choose"
            height="calc(100vh - 315px)"
            stripe
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
                label="编号"
                width="60"
                align="center"
                fixed="left"
                show-overflow-tooltip
              />

              <el-table-column
                prop="hcaiji_name"
                label="采集器名称"
                sortable="custom"
                show-overflow-tooltip
                min-width="120"
              />
              <el-table-column
                prop="hcaiji_bianhao"
                label="采集器编号"
                sortable="custom"
                show-overflow-tooltip
                min-width="120"
              />
              <el-table-column
                prop="bname"
                label="所属单位"
                sortable="custom"
                show-overflow-tooltip
                min-width="120"
              />
              <el-table-column
                prop="ename"
                label="监测点"
                sortable="custom"
                show-overflow-tooltip
                min-width="120"
              />

              <el-table-column
                prop="yuansu"
                label="监测元素"
                sortable="custom"
                show-overflow-tooltip
                min-width="220"
              >
                <template slot-scope="{ row }">
                  <el-tag
                    effect="dark"
                    size="mini"
                    v-for="(x, y) in row.yuansu ? row.yuansu.split(',') : []"
                    :key="y"
                    >{{ x }}</el-tag
                  >
                </template>
              </el-table-column>

              <!-- <el-table-column
            label="创建时间"
            sortable="custom"
            show-overflow-tooltip
            min-width="160"
          >
            <template slot-scope="{ row }">{{
              (row.create_time * 1000) | toDateString
            }}</template>
          </el-table-column> -->
              <el-table-column
                label="更新时间"
                sortable="custom"
                show-overflow-tooltip
                min-width="160"
              >
                <template slot-scope="{ row }">{{
                  (row.update_time * 1000) | toDateString
                }}</template>
              </el-table-column>
              <el-table-column
                label="操作"
                width="130px"
                align="center"
                :resizable="false"
                fixed="right"
              >
                <template slot-scope="{ row }">
                  <el-link
                    @click="edit(row)"
                    icon="el-icon-edit"
                    type="primary"
                    :underline="false"
                    v-if="permission.includes('sys:hcaiji:edit')"
                    >修改</el-link
                  >
                  <el-popconfirm
                    title="确定要删除此采集器吗？"
                    @confirm="remove(row)"
                    class="ele-action"
                  >
                    <el-link
                      slot="reference"
                      icon="el-icon-delete"
                      type="danger"
                      :underline="false"
                      v-if="permission.includes('sys:hcaiji:delete')"
                      >删除</el-link
                    >
                  </el-popconfirm>
                </template>
              </el-table-column>
            </template>
          </ele-data-table>
        </el-col>
      </el-row>
    </el-card>
    <!-- 编辑弹窗 -->
    <el-dialog
      :title="editForm.id ? '修改采集器' : '添加采集器'"
      :visible.sync="showEdit"
      width="520px"
      @closed="editForm = { hcaiji_hgrain: [] }"
      :destroy-on-close="true"
      :lock-scroll="false"
    >
      <el-form
        :model="editForm"
        ref="editForm"
        :rules="editRules"
        label-width="100px"
      >
        <el-form-item label="名称：" prop="hcaiji_name">
          <el-input
            v-model="editForm.hcaiji_name"
            placeholder="请输入采集器名称"
            clearable
          />
        </el-form-item>

        <el-form-item label="采集器编号：" prop="hcaiji_bianhao">
          <el-input
            v-model="editForm.hcaiji_bianhao"
            placeholder="请输入采集器编号"
            clearable
          />
        </el-form-item>

        <el-form-item label="所属部门:" prop="hcaiji_name">
          <treeselect
            v-model="editForm.hcaiji_dept"
            :options="departmentList"
            placeholder="请选择所属部门"
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
        </el-form-item>

        <el-form-item label="监测点：" v-loading="propdet" prop="hcaiji_hspot">
          <treeselect
            v-model="editForm.hcaiji_hspot"
            :options="deptList"
            placeholder="请选择上级菜单"
            :defaultExpandLevel="3"
            :normalizer="
              (d) => {
                return {
                  id: d.id,
                  label: d.hspot_name || null,
                  children: d.children || undefined,
                };
              }
            "
          />
        </el-form-item>
        <el-form-item label="监测元素：" prop="hcaiji_hgrain">
          <el-checkbox-group v-model="editForm.hcaiji_hgrain">
            <el-checkbox
              v-for="(item, ind) in arrays"
              :key="ind"
              name="hcaiji_hgrain"
              :label="String(item.id)"
              >{{ item.hgrain_name }}</el-checkbox
            >
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="showEdit = false">取消</el-button>
        <el-button type="primary" @click="save">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex"
import Treeselect from "@riophae/vue-treeselect" // 下拉树
import "@riophae/vue-treeselect/dist/vue-treeselect.css"
import unit from "../../../../src/utils/util"

export default {
  name: "SysHcaiji",
  components: { Treeselect },

  data () {
    return {
      propdet: false,
      table: { url: "/hcaiji/index", where: {} }, // 表格配置
      choose: [], // 表格选中数据
      showEdit: false, // 是否显示表单弹窗
      editForm: {
        hcaiji_name: "",
        hcaiji_hspot: null,
        hcaiji_hgrain: []
      }, // 表单数据
      arrays: [],
      checked: false,
      checkedList: [],
      deptList: [],
      dept_id: [],
      depId: "",

      departmentList: [], // 所属部门

      editRules: {
        // 表单验证规则
        hcaiji_name: [
          { required: true, message: "请输入采集器名称", trigger: "blur" }
        ],

        hcaiji_hspot: [
          { required: true, message: "请输入采集点", trigger: "blur" }
        ],

        hcaiji_hgrain: [
          { required: true, message: "请输入监测元素", trigger: "blur" }
        ]
      },
      // 部门树
      data: [],
      defaultProps: {
        children: "children",
        label: "name"
      },
      clickNodeKey: null
    }
  },
  computed: {
    ...mapGetters(["user", "permission"]),
    empty () {
      if (this.data != []) {
        return "正在加载"
      } else {
        return "暂无数据"
      }
    }
  },
  watch: {
    editForm: {
      handler (val) {
        let dep_id = val.hcaiji_dept
        // console.log(val)
        this.getDeptList(dep_id)
      },
      deep: true
    },
    clickNodeKey (val) {
      if (val) {
        if (!this.form) {
          this.editForm.hcaiji_dept = val.id
        }
      }
    }
  },
  mounted () {
    this.getArray()
    this.get_DeptList() // 查询部门列表
    this.getId()
    this.getDeptList()
  },
  created () { },
  methods: {
    getId () {
      this.depId = this.user.dept_id
    },
    pop () {
      //depId
      this.showEdit = true
    },
    getArray () {
      this.$http.get("/hgrain/index").then(res => {
        var arr = res.data.data
        if (arr) {
          this.arrays = arr
        } else {
          this.arrays = []
        }
      })
    },
    getDeptList (dep_id) {
      this.propdet = true
      //采集点
      this.$http
        .get("/hspot/index?hspot_dept=" + dep_id)
        .then(res => {
          this.propdet = false
          if (res.data.code === 0) {
            if (res.data.data) {
              this.deptList = res.data.data
              // console.log(this.deptList)
            } else {
              this.deptList = []
            }
          } else {
            this.$message.error(res.data.msg)
          }
        })
        .catch(e => {
          this.$message.error(e.message)
        })
    },
    infomark (e) {
      this.table.where.dept_id = e.id
      // 选择
      this.clickNodeKey = e
      this.$refs.table.reload()
    },
    // 左侧树形单位名称
    async get_DeptList () {
      const list_data = await this.$http.get("/dept/getUserDepList", {
        params: {
          dept_id: this.user.dept_id
        }
      }).catch(e => {
        this.$message.error(e.message)
      })
      if (list_data) {
        // 弹窗部门
        this.departmentList = unit.toTreeData(list_data.data.data, "id", "pid")
        // 左侧部门树
        this.data = unit.toTreeData(list_data.data.data, "id", "pid", "children")
      }
    },
    /**
     * 获取部门列表
     */
    // getDepartmentList () {
    //   this.$http
    //     .get("/dept/getDeptList")
    //     .then(res => {
    //       if (res.data.code === 0) {
    //         this.departmentList = this.$util.toTreeData(
    //           res.data.data,
    //           "id",
    //           "pid"
    //         )
    //       } else {
    //         this.$message.error(res.data.msg)
    //       }
    //     })
    //     .catch(e => {
    //       this.$message.error(e.message)
    //     })
    // },
    /**
     * 显示编辑
     */
    edit (row) {
      this.$http
        .get("/hcaiji/info?id=" + row.id)
        .then(res => {
          if (res.data.code === 0) {
            this.editForm = res.data.data
            let arr = res.data.data.hcaiji_hgrain.split(",")

            this.editForm.hcaiji_hgrain = [...arr]
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
        this.editForm.hcaiji_hgrain = this.editForm.hcaiji_hgrain.join(",")
        if (valid) {
          const loading = this.$loading({ lock: true })
          this.$http
            .post("/hcaiji/edit", Object.assign({}, this.editForm))
            .then(res => {
              console.log(res)
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
        if (this.choose.length === 0)
          return this.$message.error("请至少选择一条数据")
        let ids = this.choose.map(d => d.id)
        this.$confirm("确定要删除选中的采集器吗?", "提示", { type: "warning" })
          .then(() => {
            const loading = this.$loading({ lock: true })
            this.$http
              .post("/hcaiji/delete", { id: ids })
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
          .post("/hcaiji/delete", { id: row.id })
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
.tree-line {
  height: 560px;
  overflow-y: scroll;
}
</style>
