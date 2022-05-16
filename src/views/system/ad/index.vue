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
              <el-col :md="7" :sm="8">
                <el-button
                  circle
                  v-for="(x, y) in type_data"
                  :type="['primary'][class_type == y ? 0 : 1]"
                  :key="y"
                  @click="indexType(x, y)"
                >
                  {{ x.name }}
                </el-button>
              </el-col>
              <el-col :md="8" :sm="8">
                <el-form-item label="设备名称:">
                  <el-input
                    v-model="table.where.title"
                    placeholder="请输入名称"
                    clearable
                  />
                </el-form-item>
              </el-col>
              <el-col :md="9" :sm="8">
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
              :disabled="currentNodeKey ? false : true"
              v-if="permission.includes('sys:ad:add')"
              >添加
            </el-button>
            <el-button
              @click="remove()"
              type="danger"
              icon="el-icon-delete"
              class="ele-btn-icon"
              size="small"
              v-if="permission.includes('sys:ad:dall')"
              >批量删除
            </el-button>
          </div>
          <!-- 数据表格 -->
          <ele-data-table
            ref="table"
            :config="table"
            :choose.sync="choose"
            border
            style="width: 100%"
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

              <el-table-column prop="status" label="状态" align="center">
                <template slot-scope="{ row }">
                  <ele-dot
                    :type="['danger', 'success'][row.status]"
                    :ripple="row.status === 0"
                    :text="['禁用', '正常'][row.status]"
                  />
                </template>
              </el-table-column>
              <el-table-column
                prop="sbnumber"
                label="设备编号"
                align="center"
              />

              <el-table-column
                prop="dname"
                label="单位"
                sortable="custom"
                show-overflow-tooltip
                min-width="150"
              />

              <!-- <el-table-column
                prop="cname"
                label="监测类别"
                align="center"
                sortable="custom"
                show-overflow-tooltip
                min-width="120"
              /> -->
              <el-table-column prop="title" label="设备名称" min-width="120" />
              <!-- catecalss_id -->
              <el-table-column
                prop="cname"
                label="监测分项"
                align="center"
                sortable="custom"
                show-overflow-tooltip
                min-width="120"
              />
              <el-table-column
                prop="bname"
                label="监测区域"
                sortable="custom"
                show-overflow-tooltip
                min-width="120"
              />
              <el-table-column
                prop="ename"
                label="监测分类"
                sortable="custom"
                show-overflow-tooltip
                min-width="120"
              />
              <el-table-column
                prop="road_id"
                label="线路"
                sortable="custom"
                show-overflow-tooltip
                min-width="120"
              />

              <el-table-column
                prop="title"
                label="设备名称"
                sortable="custom"
                show-overflow-tooltip
                min-width="150"
              />

              <el-table-column
                prop="description"
                label="设备描述"
                align="center"
                show-overflow-tooltip
                min-width="150"
              />

              <el-table-column
                prop="start_time"
                label="采集时间"
                align="center"
                show-overflow-tooltip
                min-width="150"
              >
                <template slot-scope="{ row }">{{
                  row.start_time | toDateString
                }}</template>
              </el-table-column>
              <el-table-column
                prop="end_time"
                label="安装时间"
                align="center"
                show-overflow-tooltip
                min-width="150"
              >
                <template slot-scope="{ row }">{{
                  row.end_time | toDateString
                }}</template>
              </el-table-column>

              <el-table-column
                prop="sort"
                label="排序"
                sortable="custom"
                show-overflow-tooltip
              />
              <el-table-column
                label="创建时间"
                sortable="custom"
                show-overflow-tooltip
                min-width="150"
              >
                <template slot-scope="{ row }">{{
                  (row.create_time * 1000) | toDateString
                }}</template>
              </el-table-column>
              <el-table-column
                label="更新时间"
                sortable="custom"
                show-overflow-tooltip
                min-width="150"
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
                    v-if="permission.includes('sys:ad:edit')"
                    >修改</el-link
                  >
                  <el-popconfirm
                    title="确定要删除此吗？"
                    @confirm="remove(row)"
                    class="ele-action"
                  >
                    <el-link
                      slot="reference"
                      icon="el-icon-delete"
                      type="danger"
                      :underline="false"
                      v-if="permission.includes('sys:ad:delete')"
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
      :title="editForm.id ? '修改设备' : '修改设备'"
      :visible.sync="showEdit"
      width="700px"
      @closed="editForm = {}"
      :destroy-on-close="true"
      custom-class="ele-dialog-form"
      :lock-scroll="false"
    >
      <el-form
        :model="editForm"
        ref="editForm"
        :rules="editRules"
        label-width="100px"
      >
        <el-row :gutter="15">
          <el-col :sm="12">
            <el-form-item label="设备名称:" prop="title">
              <el-input
                v-model="editForm.title"
                placeholder="请输入名称"
                clearable
              />
            </el-form-item>
            <el-form-item
              label="监测区域"
              prop="ad_sort_id"
              :rules="{
                required: true,
                message: '所属区域不能为空',
                trigger: 'change',
              }"
            >
              <el-select
                filterable
                clearable
                v-model="editForm.ad_sort_id"
                size="small"
                placeholder="-请选择位置-"
                class="ele-block"
                v-loading="quyu"
                element-loading-spinner="el-icon-loading"
              >
                <el-option
                  v-for="item in adSortList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
            <el-form-item
              label="监测类别"
              prop="cate_id"
              :rules="{
                required: true,
                message: '监测类别不能为空',
                trigger: 'change',
              }"
            >
              <el-select
                filterable
                clearable
                v-model="editForm.cate_id"
                size="small"
                placeholder="-请选择类别-"
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

            <el-form-item label="设备编号:" prop="sbnumber">
              <el-input
                v-model="editForm.sbnumber"
                placeholder="系统内部编号"
                clearable
              />
            </el-form-item>

            <el-form-item label="线路" prop="road_id">
              <el-select
                v-model="editForm.road_id"
                placeholder="请选择线路"
                clearable
                class="ele-fluid"
              >
                <el-option label="总线路" value="0" />
                <el-option label="1号进线" value="1" />
                <el-option label="2号进线" value="2" />
              </el-select>
            </el-form-item>

            <el-form-item label="采集时间:" prop="start_time">
              <el-date-picker
                v-model="editForm.start_time"
                type="datetime"
                placeholder="采集时间"
                size="small"
              >
              </el-date-picker>
            </el-form-item>
            <el-form-item label="排序号:" prop="sort">
              <el-input-number
                v-model="editForm.sort"
                controls-position="right"
                :min="0"
                placeholder="请输入排序号"
                class="ele-fluid ele-text-left"
              />
            </el-form-item>
          </el-col>
          <el-col :sm="12">
            <!--
            -->
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

            <el-form-item
              label="监测分类"
              prop="adclass_id"
              :rules="{
                required: true,
                message: '监测分类不能为空',
                trigger: 'change',
              }"
            >
              <el-select
                filterable
                clearable
                v-model="editForm.adclass_id"
                size="small"
                placeholder="-请选择监测分类-"
                class="ele-block"
              >
                <el-option
                  v-for="item in adclassList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>

            <el-form-item
              label="监测分项:"
              prop="catecalss_id"
              :rules="{
                required: true,
                message: '监测分项不能为空',
                trigger: 'change',
              }"
            >
              <el-select
                v-loading="fx"
                element-loading-spinner="el-icon-loading"
                filterable
                clearable
                v-model="editForm.catecalss_id"
                size="small"
                placeholder="-请选择分项-"
                class="ele-block"
              >
                <el-option
                  v-for="items in array"
                  :key="items.create_time"
                  :label="items.name"
                  :value="items.id"
                />
              </el-select>
            </el-form-item>

            <el-form-item label="设备信息:" prop="description">
              <el-input
                v-model="editForm.description"
                placeholder="请输入设备型号，厂家等"
                clearable
              />
            </el-form-item>
            <el-form-item label="状态:">
              <el-radio-group v-model="editForm.status">
                <el-radio :label="1">正常</el-radio>
                <el-radio :label="2">禁用</el-radio>
              </el-radio-group>
            </el-form-item>

            <el-form-item label="安装时间:" prop="end_time">
              <el-date-picker
                v-model="editForm.end_time"
                type="datetime"
                placeholder="选择安装时间"
                size="small"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
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
  components: { Treeselect },

  name: "SysAd",
  data () {
    return {
      url: "/ad/index",
      table: {
        url: "/ad/index",
        where: {
          // 部门
          dept_id: '',
          // 类别
          cate_id: ''
        }
      }, // 表格配置
      choose: [], // 表格选中数据
      showEdit: false, // 是否显示表单弹窗
      editForm: { status: 1 },
      deptList: [], // 部门列表
      adclassSortList: [], //监测类别
      adclassList: [], //监测分类
      // 部门树
      data: [],
      defaultProps: {
        children: "children",
        label: "name"
      },
      currentNodeKey: null,
      // 监测类别 data
      type_data: [],
      // 按钮选中状态
      class_type: 0,
      // v-loading
      quyu: false,
      fx: false,
      array: "",
      editRules: {
        // 表单验证规则
        title: [{ required: true, message: "请输入名称", trigger: "blur" }],
        cate_id: [
          { required: true, message: "请选择监测类别", trigger: "blur" }
        ],

        description: [
          { required: true, message: "请输入设备信息", trigger: "blur" }
        ],
        catecalss_id: [
          { required: true, message: "请选择监测分项", trigger: "blur" }
        ],

        sbnumber: [
          { required: true, message: "请输入设备编号", trigger: "blur" }
        ],
        sort: [{ required: true, message: "请输入排序", trigger: "blur" }]
      },
      // 区域列表
      adSortList: []
    }
  },
  watch: {
    "editForm.cate_id": {
      handler () {
        this.fx = true
        this.$http.get("/itemcate/index", {
          params: { pid: this.editForm.cate_id }
        }).then(res => {
          this.fx = false
          if (res.data.code === 0) {
            this.array = res.data.data
          } else {
            this.$message.error(res.data.msg)
          }
        })
          .catch(e => {
            this.$message.error(e.message)
          })
      }
      //immediate:true
    },
    "editForm.dept_id": {
      handler (vel) {
        if (vel && vel !== "") {
          this.getAdSortList(vel) // 查询区域列表
          this.getAdclassList(vel)
        }
      }
    },
    showEdit () {
      if (this.currentNodeKey) {
        this.$set(this.editForm, "dept_id", this.currentNodeKey.id)
        this.$set(this.editForm, "cate_id", this.type_data[this.class_type].id)
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
    this.getAdclassSortList() // 查询设备分类列表
    this.getAdclassList() //查询监测分类
    // 请求部门树
    this.get_DeptList()
    this.get_type()
  },
  methods: {
    indexType (e, y) {
      this.table.where.cate_id = e.id

      // this.table.url = this.url
      // 切换类别
      this.class_type = y
      this.$refs.table.reload()
    },
    // 监测类别
    async get_type () {
      const res = await this.$http.get('/itemcate/index', { params: { pid: 0 } }).catch(e => this.$message.error(e))
      if (res.data.code == 0) {
        this.type_data = res.data.data
      } else {
        this.$message.error(res.data.msg)
      }
    },
    // 左侧树形单位名称
    async get_DeptList () {
      const list_data = await this.$http
        .get("/dept/getUserDepList", {
          params: {
            dept_id: this.user.dept_id
          }
        })
        .catch(e => {
          this.$message.error(e.message)
        })
      if (list_data) {
        // 弹窗部门
        this.deptList = unit.toTreeData(list_data.data.data, "id", "pid")
        // 左侧部门树
        // this.list = list_data.data.data
        this.data = unit.toTreeData(list_data.data.data, "id", "pid", "children")
      }
    },
    infomark (e) {
      // 部门
      this.table.where.dept_id = e.id
      // 类别
      this.table.where.cate_id = this.type_data[this.class_type].id
      // this.table.url = this.url
      // 选中部门
      this.currentNodeKey = e
      this.$refs.table.reload()
    },
    /* 显示编辑 */
    edit (row) {
      this.editForm = Object.assign({}, row)
      this.showEdit = true

    },

    /* 保存编辑 */
    save () {
      this.$refs["editForm"].validate(valid => {
        if (valid) {
          const loading = this.$loading({ lock: true })
          this.$http
            .post("/ad/edit", this.editForm)
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
    /* 删除 */
    remove (row) {
      if (!row) {
        // 批量删除
        if (this.choose.length === 0) {
          return this.$message.error("请至少选择一条数据")
        }
        let ids = this.choose.map(d => d.id)
        this.$confirm("确定要删除选中吗?", "提示", { type: "warning" })
          .then(() => {
            const loading = this.$loading({ lock: true })
            this.$http
              .post("/ad/delete", { id: ids })
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
          .post("/ad/delete", { id: row.id })
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
    },
    /**
     * 获取区域列表
     */
    getAdSortList (vel) {
      this.quyu = true
      //  /adsort/getAdSortList
      this.$http

        .get("/adsort/index", { params: { dept_id: vel } })

        .then(res => {
          this.quyu = false
          if (res.data.code === 0) {
            this.adSortList = res.data.data
          } else {
            this.$message.error(res.data.msg)
          }
        })
        .catch(e => {
          this.$message.error(e.message)
        })
    },
    /**
     * 获取监测类别
     */
    getAdclassSortList () {
      this.$http
        .get("/itemcate/index", { params: { pid: 0 } })
        .then(res => {
          if (res.data.code === 0) {
            this.adclassSortList = res.data.data
          } else {
            this.$message.error(res.data.msg)
          }
        })
        .catch(e => {
          this.$message.error(e.message)
        })
    },

    /**
     * 获取监测分类
     */
    getAdclassList (val) {
      // /link/getAdClassList
      this.$http
        .get("/link/index", { params: { dept_id: val } })

        .then(res => {
          if (res.data.code === 0) {
            this.adclassList = res.data.data
          } else {
            this.$message.error(res.data.msg)
          }
        })
        .catch(e => {
          this.$message.error(e.message)
        })
    },

  }
};
</script>

<style lang="scss" scoped>
.ele-block >>> .el-upload,
.ele-block >>> .el-upload-dragger {
  width: 100%;
}
.tree-line {
  height: 560px;
  overflow-y: scroll;
}
</style>


 
