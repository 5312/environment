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
          <!-- 搜索表单 -->
          <el-form
            :model="table.where"
            label-width="90px"
            class="ele-form-search"
            @keyup.enter.native="$refs.table.reload()"
            @submit.native.prevent
          >
            <el-row :gutter="15">
              <el-col :md="6" :sm="12">
                <el-form-item label="区域名称:">
                  <el-input
                    v-model="table.where.name"
                    placeholder="请输入区域名称"
                    clearable
                  />
                </el-form-item>
              </el-col>
              <el-col :md="9" :sm="12">
                <div class="ele-form-actions">
                  <el-button
                    type="primary"
                    @click="$refs.table.reload()"
                    icon="el-icon-search"
                    class="ele-btn-icon"
                    >查询
                  </el-button>
                  <el-button @click="(table.where = {}) && $refs.table.reload()"
                    >重置</el-button
                  >
                </div>
              </el-col>
            </el-row>
          </el-form>
          <!-- 操作按钮 -->
          <div class="ele-table-tool ele-table-tool-default">
            <el-button
              @click="showEdit = true"
              type="primary"
              icon="el-icon-plus"
              class="ele-btn-icon"
              size="small"
              v-if="permission.includes('sys:adsort:add')"
              >添加
            </el-button>
            <el-button
              @click="remove()"
              type="danger"
              icon="el-icon-delete"
              class="ele-btn-icon"
              size="small"
              v-if="permission.includes('sys:adsort:dall')"
              >批量删除
            </el-button>
          </div>
          <!-- 数据表格 -->
          <ele-data-table
            ref="table"
            :config="table"
            :choose.sync="choose"
            height="calc(100vh - 315px)"
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
                prop="bname"
                label="单位"
                sortable="custom"
                show-overflow-tooltip
                min-width="200"
              />
              <el-table-column
                prop="name"
                label="区域名称"
                sortable="custom"
                show-overflow-tooltip
                min-width="200"
              />
              <el-table-column
                prop="sort"
                label="排序"
                sortable="custom"
                show-overflow-tooltip
                align="center"
                min-width="100"
              />
              <el-table-column
                label="创建时间"
                sortable="custom"
                show-overflow-tooltip
                align="center"
                min-width="160"
              >
                <template slot-scope="{ row }">{{
                  (row.create_time * 1000) | toDateString
                }}</template>
              </el-table-column>
              <el-table-column
                label="更新时间"
                sortable="custom"
                show-overflow-tooltip
                align="center"
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
                    v-if="permission.includes('sys:adsort:edit')"
                    >修改</el-link
                  >
                  <el-popconfirm
                    title="确定要删除吗？"
                    @confirm="remove(row)"
                    class="ele-action"
                  >
                    <el-link
                      slot="reference"
                      icon="el-icon-delete"
                      type="danger"
                      :underline="false"
                      v-if="permission.includes('sys:adsort:delete')"
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
      :title="editForm.id ? '修改区域' : '修改'"
      :visible.sync="showEdit"
      width="400px"
      @closed="editForm = {}"
      :destroy-on-close="true"
      :lock-scroll="false"
    >
      <el-form
        :model="editForm"
        ref="editForm"
        :rules="editRules"
        label-width="100px"
      >
        <el-form-item label="所属单位:" label-width="130px">
          <treeselect
            v-model="editForm.dept_id"
            :options="deptList"
            placeholder="请选择所属单位"
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
        <el-form-item label="监测区域名称:" prop="name" label-width="130px">
          <el-input
            v-model="editForm.name"
            placeholder="请输入区域名称"
            clearable
          />
        </el-form-item>

        <el-form-item label="排序号:" prop="sort" label-width="130px">
          <el-input-number
            v-model="editForm.sort"
            controls-position="right"
            :min="0"
            placeholder="请输入排序号"
            class="ele-fluid ele-text-left"
          />
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
import Treeselect from "@riophae/vue-treeselect"  // 下拉树
import "@riophae/vue-treeselect/dist/vue-treeselect.css"
import unit from "../../../../src/utils/util"

export default {
  name: "SysAdSort",
  inject: ["reload"],
  data () {
    return {
      table: { url: "/adsort/index", where: {} },  // 表格配置
      choose: [],  // 表格选中数据
      showEdit: false,  // 是否显示表单弹窗
      editForm: {},  // 表单数据
      deptList: [], // 部门列表
      editRules: {  // 表单验证规则
        name: [
          { required: true, message: "请输入区域名称", trigger: "blur" }
        ],

        sort: [
          { required: true, message: "请输入排序", trigger: "blur" }
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
  watch: {
    clickNodeKey (val) {
      if (val) {
        if (!this.form) {
          this.editForm.dept_id = val.id
        }
      }
    }
  },
  computed: {
    ...mapGetters(["permission", "user"]),
    empty () {
      if (this.data != []) {
        return "正在加载"
      } else {
        return "暂无数据"
      }
    }
  },
  components: { Treeselect },
  mounted () {
    // this.getDeptList() // 查询部门列表
    this.get_DeptList()
  },
  methods: {
    /* 显示编辑 */
    edit (row) {
      this.editForm = Object.assign({}, row)
      this.showEdit = true
    },
    infomark (e) {
      this.table.where.dept_id = e.id
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
        this.deptList = unit.toTreeData(list_data.data.data, "id", "pid")
        // 左侧部门树
        this.data = unit.toTreeData(list_data.data.data, "id", "pid", "children")
      }
    },
    /**
    * 获取部门列表
    */
    // getDeptList () {
    //   this.$http.get("/dept/getDeptList").then(res => {
    //     if (res.data.code === 0) {
    //       this.deptList = this.$util.toTreeData(res.data.data, "id", "pid")
    //     } else {
    //       this.$message.error(res.data.msg)
    //     }
    //   }).catch(e => {
    //     this.$message.error(e.message)
    //   })
    // },
    /* 保存编辑 */
    save () {
      this.$refs["editForm"].validate((valid) => {
        if (valid) {
          const loading = this.$loading({ lock: true })
          this.$http.post("/adsort/edit", this.editForm).then(res => {
            loading.close()
            if (res.data.code === 0) {
              this.showEdit = false
              this.$message({ type: "success", message: res.data.msg })
              this.$refs.table.reload()
            } else {
              this.$message.error(res.data.msg)
            }
          }).catch(e => {
            loading.close()
            this.$message.error(e.message)
          })
        } else {
          return false
        }
      })
    },
    /* 删除 */
    remove (row) {
      if (!row) {  // 批量删除
        if (this.choose.length === 0) {
          return this.$message.error("请至少选择一条数据")
        }
        let ids = this.choose.map(d => d.id)
        this.$confirm("确定要删除选中的广告位吗?", "提示", { type: "warning" }).then(() => {
          const loading = this.$loading({ lock: true })
          this.$http.post("/adsort/delete", { id: ids }).then(res => {
            loading.close()
            if (res.data.code === 0) {
              this.$message({ type: "success", message: res.data.msg })
              this.$refs.table.reload()
            } else {
              this.$message.error(res.data.msg)
            }
          }).catch(e => {
            loading.close()
            this.$message.error(e.message)
          })
        }).catch(() => 0)
      } else {  // 单个删除
        const loading = this.$loading({ lock: true })
        this.$http.post("/adsort/delete", { id: row.id }).then(res => {
          loading.close()
          if (res.data.code === 0) {
            this.$message({ type: "success", message: res.data.msg })
            this.$refs.table.reload()
          } else {
            this.$message.error(res.data.msg)
          }
        }).catch(e => {
          loading.close()
          this.$message.error(e.message)
        })
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.tree-line {
  height: 560px;
  overflow-y: scroll;
}
</style>