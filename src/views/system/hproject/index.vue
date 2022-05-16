/* eslint-disable vue/script-setup-uses-vars */
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
          <div class="ele-table-tool ele-table-tool-default">
            <el-button
              @click="showEdit = true"
              type="primary"
              icon="el-icon-plus"
              class="ele-btn-icon"
              size="small"
              v-if="permission.includes('sys:hproject:add')"
              >添加</el-button
            >
            <el-button
              @click="remove()"
              type="danger"
              icon="el-icon-delete"
              class="ele-btn-icon"
              size="small"
              v-if="permission.includes('sys:hproject:dall')"
              >批量删除</el-button
            >
          </div>
          <!-- 数据表格 -->
          <ele-data-table
            ref="table"
            :config="table"
            :choose.sync="choose"
            height="calc(100vh - 315px)"
            highlight-current-row
            stripe
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
                prop="hproject_name"
                label="监测名称"
                show-overflow-tooltip
                min-width="140"
              />
              <el-table-column
                prop="bname"
                label="所属单位"
                show-overflow-tooltip
                min-width="120"
              />

              <el-table-column
                prop="cname"
                label="监测类别"
                show-overflow-tooltip
                min-width="120"
              />
              <el-table-column
                prop="hproject_hspot_name"
                label="采集点"
                show-overflow-tooltip
                min-width="180"
              >
                <template slot-scope="{ row }">
                  <div
                    style="padding: 5px"
                    v-for="(x, y) in rowsplit(row, 'hproject_hspot_name')"
                    :key="y"
                  >
                    <el-tag v-show="x !== ''" type="success">{{ x }}</el-tag>
                  </div>
                  <!-- {{ row.hproject_hspot_name.replace(/,$/gi, "") }} -->
                </template>
              </el-table-column>

              <el-table-column
                prop="hproject_hcaiji_name"
                label="采集器"
                show-overflow-tooltip
                min-width="220"
              >
                <template slot-scope="{ row }">
                  <div
                    style="padding: 5px"
                    v-for="(x, y) in rowsplit(row, 'hproject_hcaiji_name')"
                    :key="y"
                  >
                    <el-tag v-show="x !== ''" type="warning">{{ x }}</el-tag>
                  </div>
                  <!-- {{ row.hproject_hcaiji_name.replace(/,$/gi, "") }} -->
                </template>
              </el-table-column>

              <!-- <el-table-column
            label="创建时间"
            sortable="custom"
            show-overflow-tooltip
            min-width="160"
          >
            <template slot-scope="{ row }">
              {{ (row.create_time * 1000) | toDateString }}
            </template>
          </el-table-column> -->
              <el-table-column
                label="更新时间"
                sortable="custom"
                show-overflow-tooltip
                min-width="160"
              >
                <template slot-scope="{ row }">
                  {{ (row.update_time * 1000) | toDateString }}
                </template>
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
                    v-if="permission.includes('sys:hproject:edit')"
                    >修改</el-link
                  >
                  <el-popconfirm
                    title="确定要删除此监测项目吗？"
                    @confirm="remove(row)"
                    class="ele-action"
                  >
                    <el-link
                      slot="reference"
                      icon="el-icon-delete"
                      type="danger"
                      :underline="false"
                      v-if="permission.includes('sys:hproject:delete')"
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
      :title="editForm.id ? '修改监测项目' : '添加监测项目'"
      :visible.sync="showEdit"
      width="450px"
      @closed="
        editForm = {
          hproject_hspot: [],
          hproject_hcaiji: [],
        }
      "
      :destroy-on-close="true"
      :lock-scroll="false"
    >
      <!-- @closed="editForm = {hproject_hcaiji:[],hproject_hspot:[]}" -->
      <el-form
        v-loading="dialog"
        :model="editForm"
        ref="editForm"
        :rules="editRules"
        label-width="100px"
      >
        <el-form-item label="监测名称：" prop="hproject_name">
          <el-input
            v-model="editForm.hproject_name"
            placeholder="请输入名称"
            clearable
          />
        </el-form-item>

        <el-form-item label="监测类别：" prop="hproject_hclass">
          <el-select
            filterable
            clearable
            v-model="editForm.hproject_hclass"
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

        <el-form-item label="所属单位:">
          <treeselect
            v-model="editForm.hproject_dept"
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

        <el-form-item label="采集点：" v-loading="hspot" prop="hproject_hspot">
          <el-select
            multiple
            filterable
            clearable
            v-model="editForm.hproject_hspot"
            size="small"
            placeholder="-请选择位置-"
            class="ele-block"
            value-key="id"
          >
            <el-option
              v-for="item in hspotList"
              :key="item.id"
              name="hproject_hspot"
              :label="item.hspot_name"
              :value="item"
            />
            <!-- String(item.id) -->
          </el-select>
        </el-form-item>

        <el-form-item
          label="采集器："
          v-loading="hcaiji"
          prop="hproject_hcaiji"
        >
          <el-select
            v-model="editForm.hproject_hcaiji"
            multiple
            clearable
            filterable
            allow-create
            default-first-option
            placeholder="-请选择采集器-"
            class="ele-caiji"
            value-key="id"
          >
            <el-option
              v-for="item in collector"
              :key="item.id"
              :label="item.hcaiji_name"
              :value="item"
            ></el-option>
          </el-select>
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
  name: "SysHproject",
  components: { Treeselect },

  data () {
    return {
      dialog: false,
      hspot: false,
      hcaiji: false,
      table: { url: "/hproject/index", where: {} }, // 表格配置
      choose: [], // 表格选中数据
      showEdit: false, // 是否显示表单弹窗
      editForm: {
        hproject_hspot: [],
        hproject_hcaiji: []
      }, // 表单数据
      deptList: [], // 部门列表
      hclassList: [], // 监测类别
      collector: "",
      hspotList: "", // 监测点
      editRules: {
        // 表单验证规则
        hproject_name: [
          { required: true, message: "请输名称", trigger: "blur" }
        ],

        hproject_hclass: [
          { required: true, message: "请输入监测类别", trigger: "blur" }
        ],

        hproject_hspot: [
          { required: true, message: "请输入采集点", trigger: "blur" }
        ],

        hproject_hcaiji: [
          { required: true, message: "请输入采集器", trigger: "blur" }
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
    this.get_DeptList() // 查询部门列表
    this.gethclassList() // 查询类别
    this.gethspotList() // 查询监测点
    this.collect() //查询采集器
  },
  watch: {
    "editForm.hproject_dept": {
      handler (val) {
        // 采集点
        let dep_id = val //.hproject_dept
        this.gethspotList(dep_id)
        // 采集器
        this.collect(dep_id)
      }
      // deep: true,
    },
    clickNodeKey (val) {
      if (val) {
        if (!this.form) {
          this.editForm.hproject_dept = val.id
        }
      }
    }
  },
  methods: {
    rowsplit (row, str) {
      return row[str] ? row[str].split(',') : []
    },
    infomark (e) {
      this.table.where.dept_id = e.id
      // 选择
      this.clickNodeKey = e
      this.$refs.table.reload()
    },
    // 获取采集器
    collect (val = '') {
      this.hcaiji = true
      this.$http
        .get("/hcaiji/index?hcaiji_dept=" + val)
        .then(res => {
          this.hcaiji = false
          if (res.data.code === 0) {
            this.collector = res.data.data
          } else {
            this.$message.error(res.data.msg)
          }
        })
        .catch(e => {
          this.$message.error(e.message)
        })
    },
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
     * 获取区域列表
     */
    gethspotList (vel = '') {
      this.hspot = true
      this.$http
        .get("/hspot/index?hspot_dept=" + vel)
        .then(res => {
          this.hspot = false
          if (res.data.code === 0) {
            this.hspotList = res.data.data
          } else {
            this.$message.error(res.data.msg)
          }
        })
        .catch(e => {
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
     * 显示编辑
     */
    edit (row) {
      this.showEdit = true
      this.dialog = true
      this.$http
        .get("/hproject/info?id=" + row.id)
        .then(res => {
          this.dialog = false
          if (res.data.code === 0) {
            // 正则删除最后一个逗号
            var str = res.data.data.hproject_hcaiji
            var str1 = res.data.data.hproject_hspot
            var reg = /,$/gi
            str = str.replace(reg, "")
            str1 = str1.replace(reg, "")
            //
            this.editForm = res.data.data
            // 采集器
            let arr = str.split(",")
            let ar = []
            arr.forEach((item, i) => {
              ar.push({
                id: Number(item),
                hcaiji_name: res.data.data.hproject_hcaiji_name.split(",")[i]
              })
            })
            this.editForm.hproject_hcaiji = [...ar]
            // 采集点
            let arr1 = str1.split(",")
            let a = []
            arr1.forEach((element, i) => {
              a.push({
                id: Number(element),
                hspot_name: res.data.data.hproject_hspot_name.split(",")[i]
              })
            })

            this.editForm.hproject_hspot = [...a]

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
          let obj = this.changeArrJoin()
          this.$http.post("/hproject/edit", Object.assign({}, this.editForm, obj))
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
    changeArrJoin () {
      // 采集点
      let idarr = this.editForm.hproject_hspot
      console.log(this.editForm)
      let idArrJoin = []
      let idArrNmaeJoin = []
      for (let index = 0; index < idarr.length; index++) {
        const element = idarr[index]
        idArrJoin.push(element.id)
        idArrNmaeJoin.push(element.hspot_name)
      }
      // this.editForm.hproject_hspot = idArrJoin.join(',')+',';
      this.editForm.hproject_hspot_name = idArrNmaeJoin.join(",") + ","
      // 采集器
      let caijiAdarr = this.editForm.hproject_hcaiji
      let caijiArrJoin = []
      let caiJiArrJoinName = []
      for (let index = 0; index < caijiAdarr.length; index++) {
        const element = caijiAdarr[index]
        caijiArrJoin.push(element.id)
        caiJiArrJoinName.push(element.hcaiji_name)
      }
      // this.editForm.hproject_hcaiji = caijiArrJoin.join(',')+','
      this.editForm.hproject_hcaiji_name = caiJiArrJoinName.join(",") + ","
      return {
        hproject_hspot: idArrJoin.join(",") + ",",
        hproject_hcaiji: caijiArrJoin.join(",") + ","
      }
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
        this.$confirm("确定要删除选中的监测项目吗?", "提示", {
          type: "warning"
        })
          .then(() => {
            const loading = this.$loading({ lock: true })
            this.$http
              .post("/hproject/delete", { id: ids })
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
          .post("/hproject/delete", { id: row.id })
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
.ele-caiji {
  width: 100%;
}
.tree-line {
  height: 560px;
  overflow-y: scroll;
}
</style>
