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
              v-if="permission.includes('sys:hspot:add')"
              >添加
            </el-button>
            <el-button
              @click="remove()"
              type="danger"
              icon="el-icon-delete"
              class="ele-btn-icon"
              size="small"
              v-if="permission.includes('sys:hspot:dall')"
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
                prop="hspot_name"
                label="监测点名称"
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
                    v-if="permission.includes('sys:hspot:edit')"
                    >修改</el-link
                  >
                  <el-popconfirm
                    title="确定要删除此监测点吗？"
                    @confirm="remove(row)"
                    class="ele-action"
                  >
                    <el-link
                      slot="reference"
                      icon="el-icon-delete"
                      type="danger"
                      :underline="false"
                      v-if="permission.includes('sys:hspot:delete')"
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
      :title="editForm.id ? '修改监测点' : '添加监测点'"
      :visible.sync="showEdit"
      width="450px"
      @closed="editForm = {}"
      :destroy-on-close="true"
      :lock-scroll="false"
    >
      <el-form
        v-loading="form"
        :model="editForm"
        ref="editForm"
        :rules="editRules"
        label-width="100px"
      >
        <el-form-item label="所属单位:">
          <treeselect
            v-model="editForm.hspot_dept"
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
          >
          </treeselect>
        </el-form-item>
        <el-form-item label="监测点：" prop="hspot_name">
          <el-input
            v-model="editForm.hspot_name"
            placeholder="请输入监测点名称"
            clearable
          />
        </el-form-item>
        <el-form-item label="经纬度：" prop="level" class="latlng" @trans="clo">
          <div @click="mapbullet = true">
            <el-col :span="11">
              <el-input placeholder="点击选择经纬度" v-model="lng" />
            </el-col>
            <el-col class="line" :span="2">-</el-col>
            <el-col :span="11">
              <el-input
                placeholder="点击选择经纬度"
                v-model="lat"
                style="width: 100%"
              />
            </el-col>
            <!-- <p class="p1">{{ lng }}-{{ lat }}</p> -->
          </div>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="showEdit = false">取消</el-button>
        <el-button type="primary" @click="save">保存</el-button>
      </div>
    </el-dialog>
    <popup v-show="mapbullet" @trans="clo" class="assemap"></popup>
  </div>
</template>

<script>
import { mapGetters } from "vuex"
import Treeselect from "@riophae/vue-treeselect" // 下拉树
import "@riophae/vue-treeselect/dist/vue-treeselect.css"
import unit from "../../../../src/utils/util"

import popup from "../assembly/popup.vue"
export default {
  components: { popup, Treeselect },
  name: "SysHspot",
  data () {
    return {
      lng: "",
      lat: "",
      form: false,
      mapbullet: false,
      table: { url: "/hspot/index", where: {} }, // 表格配置
      choose: [], // 表格选中数据
      showEdit: false, // 是否显示表单弹窗
      deptList: [], // 部门列表
      editForm: {}, // 表单数据
      editRules: {
        // 表单验证规则

        hspot_name: [
          { required: true, message: "请输入监测点名称", trigger: "blur" }
        ],

        hspot_dept: [
          { required: true, message: "请输入所属单位", trigger: "blur" }
        ]
      },
      // 部门树
      clickNodeKey: null,
      data: [],
      defaultProps: {
        children: "children",
        label: "name"
      },
    }
  },
  watch: {
    clickNodeKey (val) {
      if (val) {
        if (!this.form) {
          this.editForm.hspot_dept = val.id
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
    this.get_DeptList() // 查询部门列表
  },

  methods: {
    clo (msg, long, latit, addres) {
      this.mapbullet = msg
      this.lng = long
      this.lat = latit
      this.address = addres
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
    //   this.$http
    //     .get("/dept/getDeptList")
    //     .then(res => {
    //       // console.log(res.data.data);
    //       if (res.data.code === 0) {
    //         this.deptList = this.$util.toTreeData(res.data.data, "id", "pid")
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
      this.showEdit = true
      this.form = true

      this.$http
        .get("/hspot/info?id=" + row.id)
        .then(res => {
          this.form = false
          if (res.data.code === 0) {
            this.editForm = res.data.data
            console.log(this.editForm)
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
          this.editForm.lng = this.lng
          this.editForm.lat = this.lat
          this.$http
            .post("/hspot/edit", this.editForm)
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
          console.log(this.editForm)
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
        this.$confirm("确定要删除选中的监测点吗?", "提示", { type: "warning" })
          .then(() => {
            const loading = this.$loading({ lock: true })
            this.$http
              .post("/hspot/delete", { id: ids })
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
          .post("/hspot/delete", { id: row.id })
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
.assemap {
  z-index: 99999;
}
.latlng {
  width: 100%;
}
.latlng p {
  width: 100%;
  height: 20px;
  border: 1px solid #bfbfbf;
  float: right;
  position: relative;
  top: 10px;
}
.line {
  text-align: center;
}
.p1 {
  line-height: 20px;
  /* padding-left: 20px; */
}

.tree-line {
  height: 560px;
  overflow-y: scroll;
}
</style>
