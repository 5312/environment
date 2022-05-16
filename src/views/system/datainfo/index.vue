<template>
  <div class="ele-body">
    <el-card shadow="never">
      <!-- 搜索表单 -->
      <el-form
        :model="table.where"
        label-width="77px"
        class="ele-form-search"
        @keyup.enter.native="$refs.table.reload()"
        @submit.native.prevent
      >
        <el-row :gutter="10">
          <el-col :span="4">
            <div class="ele-form-actions">
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
          </el-col>
          <el-col :span="4">
            <div class="ele-form-actions">
              <el-select
                filterable
                clearable
                v-model="quyu"
                size="small"
                placeholder="-请选择位置-"
                class="ele-block"
                v-loading="quyus"
                element-loading-spinner="el-icon-loading"
              >
                <el-option
                  v-for="item in adSortList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
            </div>
          </el-col>
          <el-col :span="4">
            <div class="ele-form-actions">
              <el-select
                filterable
                clearable
                v-model="jc_cate"
                size="small"
                placeholder="-请选择监测分类-"
                class="ele-block"
                v-loading="jcCate"
                element-loading-spinner="el-icon-loading"
              >
                <el-option
                  v-for="item in adclassList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
            </div>
          </el-col>
          <el-col :span="4">
            <div class="ele-form-actions">
              <el-input
                v-model="sbnumber"
                placeholder="系统内部编号"
                clearable
                size="small"
              />
            </div>
          </el-col>
          <el-col :span="4">
            <div class="elle-form-actions">
              <el-date-picker
                v-model="start_time"
                type="datetime"
                placeholder="开始时间"
                size="small"
                value-format="timestamp"
                format="yyyy-MM-dd HH:mm:ss"
              >
              </el-date-picker>
            </div>
          </el-col>
          <el-col :span="4">
            <div class="elle-form-actions">
              <el-date-picker
                v-model="end_time"
                type="datetime"
                placeholder="结束时间"
                size="small"
                value-format="timestamp"
                format="yyyy-MM-dd HH:mm:ss"
              >
              </el-date-picker>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="4">
            <el-select
              filterable
              clearable
              size="small"
              v-model="jiance_type"
              placeholder="请选择监测类别"
            >
              <el-option
                v-for="(item, y) in type_data"
                :key="y"
                :label="item.name"
                :value="item.id"
                v-loading="cateload"
              >
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="4">
            <div class="ele-form-actions">
              <el-select
                v-loading="fx"
                element-loading-spinner="el-icon-loading"
                filterable
                clearable
                v-model="catecalss_id"
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
            </div>
          </el-col>
          <!-- 按钮 -->
          <el-col :span="5">
            <div class="ele-form-actions nowrap">
              <el-button
                size="small"
                type="primary"
                @click="search"
                icon="el-icon-search"
                class="ele-btn-icon"
                >查询
              </el-button>
              <el-button
                size="small"
                @click="(table.where = {}) && $refs.table.reload()"
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
          v-if="permission.includes('sys:datainfo:add')"
          >添加
        </el-button>
        <el-button
          @click="remove()"
          type="danger"
          icon="el-icon-delete"
          class="ele-btn-icon"
          size="small"
          v-if="permission.includes('sys:datainfo:dall')"
          >批量删除
        </el-button>
      </div>
      <!-- 数据表格 -->
      <ele-data-table
        ref="table"
        :config="table"
        :choose.sync="choose"
        height="calc(100vh - 280px)"
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
            prop="id"
            label="序号"
            sortable="custom"
            show-overflow-tooltip
            min-width="120"
          />
          <el-table-column
            prop="datainfo_sbnumber"
            label="设备编号"
            sortable="custom"
            show-overflow-tooltip
            min-width="120"
          />
          <!-- <el-table-column
            prop="datainfo_sheng"
            label="省"
            sortable="custom"
            show-overflow-tooltip
            min-width="120"
          />

          <el-table-column
            prop="datainfo_shi"
            label="市"
            sortable="custom"
            show-overflow-tooltip
            min-width="120"
          />

          <el-table-column
            prop="datainfo_qu"
            label="县"
            sortable="custom"
            show-overflow-tooltip
            min-width="120"
          /> -->
          <!-- 
          <el-table-column
            prop="datainfo_dept_a"
            label="集团"
            sortable="custom"
            show-overflow-tooltip
            min-width="120"
          /> -->

          <el-table-column
            prop="datainfo_dept_b"
            label="局"
            sortable="custom"
            show-overflow-tooltip
            min-width="120"
          />

          <el-table-column
            prop="datainfo_dept_id"
            label="单位"
            sortable="custom"
            show-overflow-tooltip
            min-width="120"
          />

          <el-table-column
            prop="datainfo_cate_id"
            label="监控类别"
            sortable="custom"
            show-overflow-tooltip
            min-width="120"
          />

          <el-table-column
            prop="datainfo_catecalss_id"
            label="监控分项"
            sortable="custom"
            show-overflow-tooltip
            min-width="120"
          />

          <el-table-column
            prop="datainfo_sort_id"
            label="监控区域"
            sortable="custom"
            show-overflow-tooltip
            min-width="120"
          />

          <el-table-column
            prop="datainfo_adclass_id"
            label="监控分类"
            sortable="custom"
            show-overflow-tooltip
            min-width="120"
          />

          <el-table-column
            prop="datainfo_adid"
            label="设备序号"
            sortable="custom"
            show-overflow-tooltip
            min-width="120"
          />

          <el-table-column
            prop="datainfo_amount"
            label="总量"
            sortable="custom"
            show-overflow-tooltip
            min-width="120"
          />

          <el-table-column
            prop="datainfo_price"
            label="价格"
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
          <!-- <el-table-column
            label="更新时间"
            sortable="custom"
            show-overflow-tooltip
            min-width="160"
          >
            <template slot-scope="{ row }">{{
              (row.update_time * 1000) | toDateString
            }}</template>
          </el-table-column> -->
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
                v-if="permission.includes('sys:datainfo:edit')"
                >修改</el-link
              >
              <el-popconfirm
                title="确定要删除此采集数据吗？"
                @confirm="remove(row)"
                class="ele-action"
              >
                <el-link
                  slot="reference"
                  icon="el-icon-delete"
                  type="danger"
                  :underline="false"
                  v-if="permission.includes('sys:datainfo:delete')"
                  >删除</el-link
                >
              </el-popconfirm>
            </template>
          </el-table-column>
        </template>
      </ele-data-table>
    </el-card>
    <!-- 编辑弹窗 -->
    <el-dialog
      :title="editForm.id ? '修改采集数据' : '修改采集数据'"
      :visible.sync="showEdit"
      width="450px"
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
        <el-form-item label="采集器编号：" prop="sewage_hcaiji">
          <el-input
            v-model="editForm.sewage_hcaiji"
            controls-position="right"
            placeholder="请输入编号"
            class="ele-fluid ele-text-left"
          />
        </el-form-item>

        <el-form-item label="采集数值：" prop="sewage_hgrain_val">
          <el-input
            v-model="editForm.sewage_hgrain_val"
            controls-position="right"
            placeholder="请输入采集数值"
            class="ele-fluid ele-text-left"
          />
        </el-form-item>

        <el-form-item label="元素编号：" prop="sewage_hgrain">
          <el-input
            v-model="editForm.sewage_hgrain"
            controls-position="right"
            placeholder="元素编号"
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
// 下拉树
import Treeselect from "@riophae/vue-treeselect"
import "@riophae/vue-treeselect/dist/vue-treeselect.css"
import util from "@/utils/util"
export default {
  name: "SysDatainfo",
  components: {
    Treeselect,
  },
  data () {
    return {
      table: { url: "/datainfo/index", where: {} }, // 表格配置
      choose: [], // 表格选中数据
      showEdit: false, // 是否显示表单弹窗
      editForm: {}, // 表单数据
      editRules: {
        // 表单验证规则

        datainfo_id: [{ required: true, message: "请输入", trigger: "blur" }],

        datainfo_sheng: [
          { required: true, message: "请输入省", trigger: "blur" }
        ],

        datainfo_qu: [{ required: true, message: "请输入市", trigger: "blur" }],

        datainfo_xian: [
          { required: true, message: "请输入县", trigger: "blur" }
        ],

        datainfo_dept_a: [
          { required: true, message: "请输入集团", trigger: "blur" }
        ],

        datainfo_dept_b: [
          { required: true, message: "请输入局", trigger: "blur" }
        ],

        datainfo_dept_id: [
          { required: true, message: "请输入单位", trigger: "blur" }
        ],

        datainfo_cate_id: [
          { required: true, message: "请输入监控类别", trigger: "blur" }
        ],

        datainfo_catecalss_id: [
          { required: true, message: "请输入监控分项", trigger: "blur" }
        ],

        datainfo_sort_id: [
          { required: true, message: "请输入监控区域", trigger: "blur" }
        ],

        datainfo_adclass_id: [
          { required: true, message: "请输入监控分类", trigger: "blur" }
        ],

        datainfo_adid: [
          { required: true, message: "请输入设备序号", trigger: "blur" }
        ],

        datainfo_sbnumber: [
          { required: true, message: "请输入设备编号", trigger: "blur" }
        ],

        datainfo_data: [
          { required: true, message: "请输入总量", trigger: "blur" }
        ],

        datainfo_price: [
          { required: true, message: "请输入价格", trigger: "blur" }
        ],

        datainfo_date: [
          { required: true, message: "请输入创建时间", trigger: "blur" }
        ]
      },
      depart: [],
      load: false,
      dept: null,
      // 监测类别 data
      type_data: [],
      jiance_type: null,
      cateLoad: false,
      /* 区域列表 */
      adSortList: [],
      quyu: null,
      quyus: false,
      /* 监测分类 */
      jc_cate: null,
      adclassList: [],
      jcCate: false,
      /* 分项 */
      catecalss_id: null,
      array: [],
      fx: false,
      /* 编号 */
      sbnumber: null,
      start_time: null,
      end_time: null
    }
  },
  watch: {
    dept (d) {
      // 区域
      this.quyu = null
      this.getAdSortList(d)
      /* 分类 */
      this.jc_cate = null
      this.getAdclassList(d)
      // this.$refs.table.reload()
    },
    jiance_type () {
      this.catecalss_id = null
      this.getAdClassType()
    }
  },
  computed: {
    ...mapGetters(["permission", 'user'])
  },
  mounted () {
    this.dept = this.user.dept_id
    this.department(this.user.dept_id)
    this.get_type()
  },
  methods: {
    search () {
      let { jiance_type, quyu, catecalss_id, jc_cate, sbnumber, start_time, end_time } = this
      // this.table.where 
      this.$set(this.table, 'where', {
        cate_id: jiance_type,
        ad_sort_id: quyu,
        catecalss_id,
        adclass_id: jc_cate,
        sbnumber,
        start_time,
        end_time,
        dept_id: this.dept
      })
      this.$refs.table.reload()
    },
    indexType (e, y) {
      this.table.where.cate_id = e.id
      // this.table.url = this.url
      // 切换类别
      this.class_type = y
      this.$refs.table.reload()
    },

    // 监测类别
    async get_type () {
      this.cateload = true
      const res = await this.$http.get('/itemcate/index', { params: { pid: 0 } }).catch(e => this.$message.error(e))
      this.cateload = false
      if (res.data.code == 0) {
        this.type_data = res.data.data
      } else {
        this.$message.error(res.data.msg)
      }
    },
    async department (d = 1) {
      this.load = true
      const res = await this.$http.get("/dept/getUserDepList", {
        params: {
          dept_id: d
        }
      })
      this.load = false
      let data = res.data.data
      this.depart = util.toTreeData(data, "id", "pid", "children")

    },
    /**
     * 显示编辑
     */
    edit (row) {
      this.$http
        .get("/datainfo/info?id=" + row.id)
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
 * 获取区域列表
 */
    getAdSortList (vel) {
      this.quyus = true
      this.$http
        .get("/adsort/index", { params: { dept_id: vel } })
        .then(res => {
          this.quyus = false
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
 * 获取监测分类
 */
    getAdclassList (val) {
      this.jcCate = true
      this.$http
        .get("/link/index", { params: { dept_id: val } })

        .then(res => {
          this.jcCate = false
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
    /* 监测分项 */
    getAdClassType () {
      this.fx = true
      this.$http.get("/itemcate/index", {
        params: { pid: this.jiance_type }
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
    },
    /**
     * 保存编辑
     */
    save () {
      this.$refs["editForm"].validate(valid => {
        if (valid) {
          const loading = this.$loading({ lock: true })
          this.$http
            .post("/datainfo/edit", this.editForm)
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
        this.$confirm("确定要删除选中的采集数据吗?", "提示", {
          type: "warning"
        })
          .then(() => {
            const loading = this.$loading({ lock: true })
            this.$http
              .post("/datainfo/delete", { id: ids })
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
          .post("/datainfo/delete", { id: row.id })
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

<style scoped lang="scss">
.ele-block >>> .el-upload,
.ele-block >>> .el-upload-dragger {
  width: 100%;
}
.nowrap {
  white-space: nowrap;
}
.depart {
  /deep/.vue-treeselect__control {
    font-size: 13px;
    // border: 1px solid rgba(255, 255, 255, 0.15) !important;
    height: 32px !important;
  }
}
</style>
