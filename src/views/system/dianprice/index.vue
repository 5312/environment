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
              @click="showEdit = true"
              type="primary"
              icon="el-icon-plus"
              class="ele-btn-icon"
              size="small"
              v-if="permission.includes('sys:dianprice:add')"
              >添加
            </el-button>
            <el-button
              @click="remove()"
              type="danger"
              icon="el-icon-delete"
              class="ele-btn-icon"
              size="small"
              v-if="permission.includes('sys:dianprice:dall')"
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
                prop="dname"
                label="部门ID"
                sortable="custom"
                show-overflow-tooltip
                min-width="120"
              />
              <el-table-column
                prop="cname"
                label="类别"
                sortable="custom"
                show-overflow-tooltip
                min-width="120"
              />

              <el-table-column
                prop="dian_g1"
                label="谷区间开始"
                sortable="custom"
                show-overflow-tooltip
                min-width="120"
              />

              <el-table-column
                prop="dian_g2"
                label="谷区间结束"
                sortable="custom"
                show-overflow-tooltip
                min-width="120"
              />

              <el-table-column
                prop="dian_g_price"
                label="谷价格"
                sortable="custom"
                show-overflow-tooltip
                min-width="120"
              />

              <el-table-column
                prop="dian_p1"
                label="平区间开始"
                sortable="custom"
                show-overflow-tooltip
                min-width="120"
              />

              <el-table-column
                prop="dian_p2"
                label="平区间结束"
                sortable="custom"
                show-overflow-tooltip
                min-width="120"
              />

              <el-table-column
                prop="dian_p_price"
                label="平价格"
                sortable="custom"
                show-overflow-tooltip
                min-width="120"
              />

              <el-table-column
                prop="dian_f1"
                label="峰区间开始"
                sortable="custom"
                show-overflow-tooltip
                min-width="120"
              />

              <el-table-column
                prop="dian_f2"
                label="峰区间结束"
                sortable="custom"
                show-overflow-tooltip
                min-width="120"
              />

              <el-table-column
                prop="dian_f_price"
                label="峰价格"
                sortable="custom"
                show-overflow-tooltip
                min-width="120"
              />

              <el-table-column
                prop="sort"
                label="排序"
                sortable="custom"
                show-overflow-tooltip
                min-width="120"
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
                    v-if="permission.includes('sys:dianprice:edit')"
                    >修改</el-link
                  >
                  <el-popconfirm
                    title="确定要删除此电费价格区间吗？"
                    @confirm="remove(row)"
                    class="ele-action"
                  >
                    <el-link
                      slot="reference"
                      icon="el-icon-delete"
                      type="danger"
                      :underline="false"
                      v-if="permission.includes('sys:dianprice:delete')"
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
      :title="editForm.id ? '修改电费价格区间' : '修改电费价格区间'"
      :visible.sync="showEdit"
      width="650px"
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
        <el-form-item label="所属单位:">
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

        <el-form-item label="类别" prop="cate_id">
          <el-select
            filterable
            clearable
            v-model="editForm.cate_id"
            size="small"
            placeholder="-请选择监测分类-"
            class="ele-block"
          >
            <el-option
              v-for="item in adclassSortList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="谷开始：" prop="dian_g1">
          <el-col :span="12">
            <el-time-select
              placeholder="起始时间"
              v-model="editForm.dian_g1"
              :picker-options="{
                start: '00:00',
                step: '00:30',
                end: '24:59',
              }"
            >
            </el-time-select>
          </el-col>
          <el-col :span="12">
            <el-time-select
              placeholder="起始时间"
              v-model="editForm.dian_g2"
              :picker-options="{
                start: '00:00',
                step: '00:30',
                end: '24:59',
              }"
            >
            </el-time-select>
          </el-col>
        </el-form-item>

        <el-form-item label="谷价格：" prop="dian_g_price">
          <el-col :span="12">
            <el-input-number
              v-model="editForm.dian_g_price"
              controls-position="right"
              :min="0"
              placeholder="请输入谷价格"
              class="ele-fluid ele-text-left"
            />
          </el-col>
        </el-form-item>

        <el-form-item label="平开始：" prop="dian_p1">
          <el-col :span="12">
            <el-time-select
              placeholder="起始时间"
              v-model="editForm.dian_p1"
              :picker-options="{
                start: '00:00',
                step: '00:30',
                end: '24:59',
              }"
            >
            </el-time-select>
          </el-col>
          <el-col :span="12">
            <el-time-select
              placeholder="起始时间"
              v-model="editForm.dian_p2"
              :picker-options="{
                start: '00:00',
                step: '00:30',
                end: '24:59',
              }"
            >
            </el-time-select>
          </el-col>
        </el-form-item>

        <el-form-item label="平价格：" prop="dian_p_price">
          <el-col :span="12">
            <el-input-number
              v-model="editForm.dian_p_price"
              controls-position="right"
              :min="0"
              placeholder="请输入平价格"
              class="ele-fluid ele-text-left"
            />
          </el-col>
        </el-form-item>

        <el-form-item label="峰开始：" prop="dian_f1">
          <el-col :span="12">
            <el-time-select
              placeholder="起始时间"
              v-model="editForm.dian_f1"
              :picker-options="{
                start: '00:00',
                step: '00:30',
                end: '24:59',
              }"
            >
            </el-time-select>
          </el-col>
          <el-col :span="12">
            <el-time-select
              placeholder="起始时间"
              v-model="editForm.dian_f2"
              :picker-options="{
                start: '00:00',
                step: '00:30',
                end: '24:59',
              }"
            >
            </el-time-select>
          </el-col>
        </el-form-item>

        <el-form-item label="峰价格：" prop="dian_f_price">
          <el-col :span="12">
            <el-input-number
              v-model="editForm.dian_f_price"
              controls-position="right"
              :min="0"
              placeholder="请输入峰价格"
              class="ele-fluid ele-text-left"
            />
          </el-col>
        </el-form-item>

        <el-form-item label="排序：" prop="sort">
          <el-input-number
            v-model="editForm.sort"
            controls-position="right"
            :min="0"
            placeholder="请输入排序"
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
  name: "SysDianprice",
  data () {
    return {
      table: { url: "/dianprice/index", where: { dept_id: '' } },  // 表格配置
      choose: [],  // 表格选中数据
      showEdit: false,  // 是否显示表单弹窗
      editForm: {},  // 表单数据
      deptList: [], // 部门列表
      adclassSortList: [], //监测类别
      editRules: {  // 表单验证规则
        dept_id: [
          { required: true, message: "请输入部门ID", trigger: "blur" }
        ],


        dian_g_price: [
          { required: true, message: "请输入谷价格", trigger: "blur" }
        ],


        dian_p_price: [
          { required: true, message: "请输入平价格", trigger: "blur" }
        ],


        dian_f_price: [
          { required: true, message: "请输入峰价格", trigger: "blur" }
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
  mounted () {
    // this.getDeptList() // 查询部门列表
    this.get_DeptList()
    this.getAdclassSortList()  //查询监测分类
  },
  components: { Treeselect },
  methods: {
    infomark (e) {
      this.table.where.dept_id = e.id
      this.clickNodeKey = e
      this.$refs.table.reload()
    },
    /**
     * 显示编辑
     */
    edit (row) {
      this.$http.get("/dianprice/info?id=" + row.id).then(res => {
        if (res.data.code === 0) {
          this.editForm = res.data.data
          this.showEdit = true
        } else {
          this.$message.error(res.data.msg)
        }
      }).catch(e => {
        this.$message.error(e.message)
      })
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

    /**
     * 获取监测类别
     */
    getAdclassSortList () {
      this.$http.get("/itemcate/index").then(res => {
        if (res.data.code === 0) {
          this.adclassSortList = res.data.data
        } else {
          this.$message.error(res.data.msg)
        }
      }).catch(e => {
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
          this.$http.post("/dianprice/edit", this.editForm).then(res => {
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
    /**
     * 刪除(批量刪除)
     */
    remove (row) {
      console.log(row)
      if (!row) {  // 批量删除
        if (this.choose.length === 0) {
          return this.$message.error("请至少选择一条数据")
        }
        let ids = this.choose.map(d => d.id)
        this.$confirm("确定要删除选中的电费价格区间吗?", "提示", { type: "warning" }).then(() => {
          const loading = this.$loading({ lock: true })
          this.$http.post("/dianprice/delete", { id: ids }).then(res => {
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
        this.$http.post("/dianprice/delete", { id: row.id }).then(res => {
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
