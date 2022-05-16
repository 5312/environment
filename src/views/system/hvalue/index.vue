<template>
  <div class="ele-body">
    <el-card shadow="never">
      <el-row :gutter="40">
        <el-col :span="4">
          <ele-data-table
            ref="table_left"
            :config="table_left"
            :choose.sync="choose_left"
            height="calc(100vh - 315px)"
            highlight-current-row
            class="table_left"
            @row-click="rowClick"
          >
            <template slot-scope="{}">
              <el-table-column
                prop="hclass_name"
                label="类别名称"
                sortable="custom"
                show-overflow-tooltip
              />
            </template>
          </ele-data-table>
        </el-col>
        <el-col :span="20">
          <!-- 操作按钮 -->
          <div class="ele-table-tool ele-table-tool-default">
            <el-button
              @click="showEdit = true"
              type="primary"
              icon="el-icon-plus"
              class="ele-btn-icon"
              size="small"
              v-if="permission.includes('sys:hvalue:add')"
              >添加
            </el-button>
            <el-button
              @click="remove()"
              type="danger"
              icon="el-icon-delete"
              class="ele-btn-icon"
              size="small"
              v-if="permission.includes('sys:hvalue:dall')"
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
                prop="hvalue_dept"
                label="所属单位"
                sortable="custom"
                show-overflow-tooltip
                min-width="120"
              >
                <template slot-scope="scope">
                  <div
                    style="padding: 3px"
                    v-for="(x, y) in deptNmae(scope.row.hvalue_dept)"
                    :key="y"
                  >
                    <el-tag>{{ x }}</el-tag>
                  </div>
                  <!-- <span style="margin-left: 10px">{{
                deptNmae(row.hvalue_dept)
              }}</span> -->
                </template>
              </el-table-column>

              <el-table-column
                prop="cname"
                label="监测类别"
                sortable="custom"
                show-overflow-tooltip
                min-width="180"
              />
              <el-table-column
                prop="dname"
                label="采集元素"
                sortable="custom"
                show-overflow-tooltip
                min-width="120"
              />

              <el-table-column
                prop="hvalue_hgrain_max"
                label="最大值"
                sortable="custom"
                show-overflow-tooltip
                min-width="120"
              />

              <el-table-column
                prop="hvalue_hgrain_min"
                label="最小值"
                sortable="custom"
                show-overflow-tooltip
                min-width="120"
              />

              <el-table-column
                prop="hvalue_hgrain_dw"
                label="元素单位"
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
                    v-if="permission.includes('sys:hvalue:edit')"
                    >修改</el-link
                  >
                  <el-popconfirm
                    title="确定要删除此监测阀值吗？"
                    @confirm="remove(row)"
                    class="ele-action"
                  >
                    <el-link
                      slot="reference"
                      icon="el-icon-delete"
                      type="danger"
                      :underline="false"
                      v-if="permission.includes('sys:hvalue:delete')"
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
      :title="editForm.id ? '修改监测阀值' : '添加监测阀值'"
      :visible.sync="showEdit"
      width="850px"
      @closed="editForm = { hvalue_dept: [] }"
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
          <el-checkbox
            :indeterminate="isIndeterminate"
            v-model="checkAll"
            @change="handleCheckAllChange"
            >全选</el-checkbox
          >
          <el-checkbox-group
            v-model="editForm.hvalue_dept"
            @change="handleCheckedCitiesChange"
          >
            <el-checkbox
              v-for="(item, ind) in deptListPid"
              :key="ind"
              name="hvalue_dept"
              :label="String(item.id)"
              >{{ item.name }}</el-checkbox
            >
          </el-checkbox-group>
        </el-form-item>

        <el-form-item label="监测类别：" prop="hvalue_hclass">
          <el-select
            filterable
            clearable
            v-model="editForm.hvalue_hclass"
            size="small"
            placeholder="-请选择分类-"
            class="ele-block"
          >
            <el-option
              v-for="item in hclassList"
              :key="item.id"
              :label="item.hclass_name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="采集元素：" prop="hvalue_hgrain">
          <el-select
            filterable
            clearable
            v-model="editForm.hvalue_hgrain"
            size="small"
            placeholder="-请选择分类-"
            class="ele-block"
          >
            <el-option
              v-for="item in select_hgrainList"
              :key="item.id"
              :label="item.hgrain_name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="最大值：" prop="hvalue_hgrain_max">
          <el-input-number
            v-model="editForm.hvalue_hgrain_max"
            controls-position="right"
            :min="0"
            placeholder="请输入最大值"
            class="ele-fluid ele-text-left"
          />
        </el-form-item>

        <el-form-item label="最小值：" prop="hvalue_hgrain_min">
          <el-input-number
            v-model="editForm.hvalue_hgrain_min"
            controls-position="right"
            :min="0"
            placeholder="请输入最小值"
            class="ele-fluid ele-text-left"
          />
        </el-form-item>

        <el-form-item label="元素单位：" prop="hvalue_hgrain_dw">
          <el-input
            v-model="editForm.hvalue_hgrain_dw"
            placeholder="请输入元素单位"
            clearable
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
import { mapGetters } from "vuex" // 下拉树
/* import Treeselect from "@riophae/vue-treeselect"; */
import "@riophae/vue-treeselect/dist/vue-treeselect.css"
export default {
  name: "SysHvalue",
  data () {
    return {
      table_left: { url: "/hclass/index", where: {}, page: false }, // 表格配置
      choose_left: [], // 表格选中数据

      table: { url: "/hvalue/index", where: {} }, // 表格配置
      choose: [], // 表格选中数据
      showEdit: false, // 是否显示表单弹窗
      editForm: {
        hvalue_dept: []
      }, // 表单数据
      deptList: [], // 部门列表
      deptListPid: [],
      check: true,
      checked: false,
      hclassList: [], // 监测类别
      hgrainList: [], // 元素
      // 筛选元素
      select_hgrainList: [],
      editRules: {
        // 表单验证规则

        hvalue_dept: [
          { required: true, message: "请输入所属单位", trigger: "blur" }
        ],

        hvalue_hclass: [
          { required: true, message: "请输入监测类别", trigger: "blur" }
        ],

        hvalue_hgrain: [
          { required: true, message: "请输入采集元素", trigger: "blur" }
        ],

        hvalue_hgrain_max: [
          { required: true, message: "请输入最大值", trigger: "blur" }
        ],

        hvalue_hgrain_min: [
          { required: true, message: "请输入最小值", trigger: "blur" }
        ],

        hvalue_hgrain_dw: [
          { required: true, message: "请输入元素单位", trigger: "blur" }
        ]
      },
      nodeKey: null,
      // 全选
      isIndeterminate: true,
      checkAll: false,
    }
  },
  computed: {
    ...mapGetters(["permission"])
  },
  watch: {
    showEdit () {
      if (this.nodeKey) {
        // this.editForm.hvalue_hclass = this.nodeKey.id
        this.$set(this.editForm, "hvalue_hclass", this.nodeKey.id)
        let arr = this.nodeKey.hclass_hgrain_id ? this.nodeKey.hclass_hgrain_id.split(',') : []
        let array = this.hgrainList
        let categData = array.filter(item => {
          if (arr.includes(String(item.id))) {
            return item
          }
        })
        this.select_hgrainList = categData
      }
    },
    "editForm.hvalue_hclass": {
      handler (w) {
        console.error('监测类别切换--触发-采集元素改变')
        // w 类别id
        let classList = this.hclassList.filter(objId => {
          if (objId.id == w) {
            return objId
          }
        })
        let arr = classList[0] ? classList[0].hclass_hgrain_id.split(',') : []

        // 元素
        let array = this.hgrainList
        let cateData = array.filter(objVal => {
          // console.log(objVal)
          if (arr.includes(String(objVal.id))) {
            return objVal
          }
        })
        this.select_hgrainList = cateData

      }
    },
    "editForm.hvalue_dept": {
      handler (val) {
        let checkedCount = val.length
        // 所属单位 编辑时-全选状态触发
        this.checkAll = this.deptListPid.length == val.length
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.deptListPid.length
      }
    }
  },
  components: {
    /* Treeselect */
  },
  mounted () {
    this.getDeptList() // 查询部门列表
    this.gethclassList() // 查询类别
    this.gethgrainList() // 查询元素
  },
  methods: {
    // 全选事件 star
    handleCheckAllChange (val) {
      let all_data = this.deptListPid.map(val => {
        return String(val.id)
      })
      // set
      this.$set(this.editForm, "hvalue_dept", val ? all_data : [])
      this.isIndeterminate = false
    },
    handleCheckedCitiesChange (value) {
      let checkedCount = value.length
      this.checkAll = checkedCount === this.deptListPid.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.deptListPid.length
    },
    // ^ 全选事件 end
    rowClick (e) {
      this.table.where.hvalue_hclass = e.id
      this.nodeKey = e
      this.$refs.table.reload()
    },
    deptNmae (a) {
      let idList = a.split(",")
      let deplist = this.deptListPid
      let arr = []
      idList.forEach(element => {
        for (let index = 0; index < deplist.length; index++) {
          const obj = deplist[index]
          if (element == String(obj.id)) {
            arr.push(obj.name)
          }
        }
      })
      return arr
    },
    /**
     * 显示编辑
     */
    edit (row) {
      this.showEdit = true
      const loading = this.$loading({ lock: true })

      this.$http
        .get("/hvalue/info?id=" + row.id)
        .then(res => {
          loading.close()
          if (res.data.code === 0) {
            this.editForm = res.data.data
            let back = res.data.data.hvalue_dept
            let a = []
            String(back)
              .split(",")
              .forEach(d => {
                if (d == "undefined" || d == "") {
                  console.error("empty")
                } else {
                  a.push(d)
                }
              })

            this.editForm.hvalue_dept = a
          } else {
            this.$message.error(res.data.msg)
          }
        })
        .catch(e => {
          this.$message.error(e.message)
        })
    },

    /**
     * 获取部门列表
     */
    getDeptList () {
      this.$http
        .get("/dept/getDeptList")
        .then(res => {
          if (res.data.code === 0) {
            this.deptList = this.$util.toTreeData(res.data.data, "id", "pid")
            let dept = res.data.data
            dept.forEach(ele => {
              if (ele.level == 3) {
                this.deptListPid.push(ele)
              }
            })
            // this.deptList = res.data.data;
          } else {
            this.$message.error(res.data.msg)
          }
        })
        .catch(e => {
          this.deptListPid = []
          this.$message.error(e.message)
        })
    },
    /**
     * 获取类别
     */
    gethclassList () {
      this.$http
        .get("/hclass/index")
        .then(res => {
          if (res.data.code === 0) {
            this.hclassList = res.data.data
          } else {
            this.$message.error(res.data.msg)
          }
        })
        .catch(e => {
          this.$message.error(e.message)
        })
    },

    /**
     * 获取元素
     */
    gethgrainList () {
      this.$http
        .get("/hgrain/index")
        .then(res => {
          if (res.data.code === 0) {
            this.hgrainList = res.data.data
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

        let value_dept = this.editForm.hvalue_dept.join(",")
        if (valid) {
          const loading = this.$loading({ lock: true })
          let form = JSON.stringify(this.editForm)
          let aform = JSON.parse(form)
          // 参数
          let param = Object.assign(aform, {
            hvalue_dept: value_dept
          })
          this.$http
            .post("/hvalue/edit", param)
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
      // console.log(row);
      if (!row) {
        // 批量删除
        if (this.choose.length === 0)
          return this.$message.error("请至少选择一条数据")
        let ids = this.choose.map(d => d.id)
        this.$confirm("确定要删除选中的监测阀值吗?", "提示", {
          type: "warning"
        })
          .then(() => {
            const loading = this.$loading({ lock: true })
            this.$http
              .post("/hvalue/delete", { id: ids })
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
          .post("/hvalue/delete", { id: row.id })
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
.table_left >>> tr {
  cursor: pointer;
}
</style>
