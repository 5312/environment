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
        v-if="pri"
      >
        <el-row :gutter="15">
          <el-col :md="6" :sm="12">
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
          v-if="permission.includes('sys:hmoney:add')"
          >添加
        </el-button>
        <el-button
          @click="remove()"
          type="danger"
          icon="el-icon-delete"
          class="ele-btn-icon"
          size="small"
          v-if="permission.includes('sys:hmoney:dall')"
          >批量删除
        </el-button>
      </div>
      <!-- 数据表格 -->
      <ele-data-table
        ref="table"
        :data="table"
        :choose.sync="choose"
        height="calc(100vh - 315px)"
        highlight-current-row
      >
        <template slot-scope="{}">
          <el-table-column
            type="selection"
            width="80"
            align="center"
            fixed="left"
          />

          <el-table-column
            prop="p_year"
            width="120"
            label="拨款年份"
            sortable="custom"
            show-overflow-tooltip
            min-width="120"
            align="center"
          />
          <el-table-column
            prop="pname"
            label="局"
            sortable="custom"
            show-overflow-tooltip
            min-width="120"
            align="center"
          />
          <el-table-column
            prop="dname"
            label="单位"
            sortable="custom"
            show-overflow-tooltip
            min-width="120"
            align="center"
          />

          <el-table-column
            prop="p_money"
            width="150"
            label="拨款金额(万)"
            sortable="custom"
            show-overflow-tooltip
            min-width="120"
            align="center"
          />

          <el-table-column
            prop="a_quarter"
            width="160"
            label="第一季度使用(万)"
            sortable="custom"
            show-overflow-tooltip
            min-width="120"
            align="center"
          />

          <el-table-column
            prop="b_quarter"
            width="160"
            label="第二季度使用(万)"
            sortable="custom"
            show-overflow-tooltip
            min-width="120"
            align="center"
          />

          <el-table-column
            prop="c_quarter"
            width="160"
            label="第三季度使用(万)"
            sortable="custom"
            show-overflow-tooltip
            min-width="120"
            align="center"
          />
          <el-table-column
            prop="d_quarter"
            width="160"
            label="第四季度使用(万)"
            sortable="custom"
            show-overflow-tooltip
            min-width="120"
            align="center"
          />

          <el-table-column
            prop="syl"
            width="150"
            label="使用率(百分比)"
            sortable="custom"
            show-overflow-tooltip
            min-width="120"
            align="center"
          >
            <template slot-scope="scope" style="white-space: nowrap">
              <span
                style="margin-left: 10px"
                :style="{
                  color: scope.row.syl > 0 ? 'red' : '#09f309',
                }"
              >
                {{ scope.row.syl * 100 }}%<i
                  :class="{
                    'el-icon-caret-top': scope.row.syl > 0 ? true : false,
                    'el-icon-caret-bottom': scope.row.syl < 0 ? true : false,
                  }"
                ></i>
              </span>
            </template>
          </el-table-column>

          <el-table-column
            prop="sort"
            label="排序"
            sortable="custom"
            show-overflow-tooltip
            min-width="120"
            align="center"
          />

          <el-table-column
            label="创建时间"
            sortable="custom"
            show-overflow-tooltip
            min-width="160"
            align="center"
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
            align="center"
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
                v-if="permission.includes('sys:hmoney:edit')"
                >修改</el-link
              >
              <el-popconfirm
                title="确定要删除此环保专项资金吗？"
                @confirm="remove(row)"
                class="ele-action"
              >
                <el-link
                  slot="reference"
                  icon="el-icon-delete"
                  type="danger"
                  :underline="false"
                  v-if="permission.includes('sys:hmoney:delete')"
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
      :title="editForm.id ? '修改环保专项资金' : '添加环保专项资金'"
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
        <el-form-item label="单位ID：" prop="dept_id">
          <treeselect
            class="depart"
            v-model="editForm.dept_id"
            :options="depart"
            placeholder="请选择单位ID"
            :defaultExpandLevel="3"
            :disabled="this.dept == 1 ? false : true"
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
        <el-form-item label="拨款年份：" prop="p_year">
          <el-date-picker
            v-model="editForm.p_year"
            type="year"
            placeholder="请选择年份"
            value-format="yyyy"
            :disabled="this.dept == 1 ? false : true"
          >
          </el-date-picker>
        </el-form-item>

        <el-form-item label="拨款金额：" prop="p_money">
          <el-input-number
            v-model="editForm.p_money"
            controls-position="right"
            :min="0"
            placeholder="请输入拨款金额"
            :disabled="this.dept == 1 ? false : true"
            class="ele-fluid ele-text-left"
          />
        </el-form-item>

        <el-form-item label="第一季度使用：" prop="a_quarter" v-if="isShow">
          <el-input-number
            v-model="editForm.a_quarter"
            controls-position="right"
            :min="0"
            placeholder="请输入第一季度使用情况"
            class="ele-fluid ele-text-left"
          />
        </el-form-item>

        <el-form-item label="第二季度使用：" prop="b_quarter" v-if="isShow">
          <el-input-number
            v-model="editForm.b_quarter"
            controls-position="right"
            :min="0"
            placeholder="请输入第二季度使用情况"
            class="ele-fluid ele-text-left"
          />
        </el-form-item>

        <el-form-item label="第三季度使用：" prop="c_quarter" v-if="isShow">
          <el-input-number
            v-model="editForm.c_quarter"
            controls-position="right"
            :min="0"
            placeholder="请输入第三季度使用情况"
            class="ele-fluid ele-text-left"
          />
        </el-form-item>

        <el-form-item label="第四季度使用：" prop="d_quarter" v-if="isShow">
          <el-input-number
            v-model="editForm.d_quarter"
            controls-position="right"
            :min="0"
            placeholder="请输入第四季度使用情况"
            class="ele-fluid ele-text-left"
          />
        </el-form-item>

        <el-form-item label="排序：" prop="sort" v-if="isShow">
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
import { mapGetters } from "vuex";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
import Treeselect from "@riophae/vue-treeselect"; // 下拉树
import util from "../../../../src/utils/util";
export default {
  components: { Treeselect },
  name: "SysHmoney",
  data() {
    return {
      pri: false,
      dept: "",
      level: "",
      list: [],
      depart: [],
      table: [], // 表格配置
      // table: { url: "/hmoney/index", where: {} }, // 表格配置
      choose: [], // 表格选中数据
      isShow: false, //弹框季度拨款是否显示
      showEdit: false, // 是否显示表单弹窗
      // 表单数据
      editForm: {
        dept_id: null,
        p_year: null,
      },
      editRules: {
        // 表单验证规则
        p_year: [
          { required: true, message: "请输入拨款年份", trigger: "blur" },
        ],

        p_money: [
          { required: true, message: "请输入拨款金额", trigger: "blur" },
        ],

        dept_id: [{ required: true, message: "请输入单位ID", trigger: "blur" }],
      },
    };
  },
  computed: {
    ...mapGetters(["permission", "user"]),
  },
  created() {
    this.getId();
    this.getTab();
    this.department();
  },
  watch: {
    "user.dept_id"(old) {
      if (old) {
        this.getId();
        this.department();
        this.getTab();
      }
    },
  },
  methods: {
    // 获取部门ID
    getId() {
      this.dept = this.user.dept_id;
      this.level = this.user.user.level_id;
      if (this.level != 2) {
        this.isShow = true;
      } else {
        this.isShow = false;
      }
    },
    // 获取表格数据
    getTab() {
      this.$http
        .get("/hmoney/index", {
          params: {
            dept_id: this.dept,
          },
        })
        .then((res) => {
          this.table = res.data.data;
        });
    },
    // 获取部门列表
    async department() {
      const res = await this.$http.get("/dept/getUserDepList", {
        params: {
          dept_id: this.dept,
        },
      });
      let data = res.data.data;
      this.depart = util.toTreeData(data, "id", "pid", "children");
    },
    /**
     * 显示编辑
     */
    edit(row) {
      this.$http
        .get("/hmoney/info?id=" + row.id)
        .then((res) => {
          if (res.data.code === 0) {
            this.editForm = res.data.data;
            this.editForm.p_year = String(this.editForm.p_year);
            this.showEdit = true;
            this.getId();
            this.department();
          } else {
            this.$message.error(res.data.msg);
          }
        })
        .catch((e) => {
          this.$message.error(e.message);
        });
    },
    /**
     * 保存编辑
     */
    save() {
      this.$refs["editForm"].validate((valid) => {
        if (valid) {
          const loading = this.$loading({ lock: true });
          this.$http
            .post("/hmoney/edit", this.editForm)
            .then((res) => {
              loading.close();
              if (res.data.code === 0) {
                this.showEdit = false;
                this.$message({ type: "success", message: res.data.msg });
                this.$refs.table.reload();
              } else {
                this.$message.error(res.data.msg);
              }
            })
            .catch((e) => {
              loading.close();
              this.$message.error(e.message);
            });
        } else {
          return false;
        }
      });
    },
    /**
     * 刪除(批量刪除)
     */
    remove(row) {
      if (!row) {
        // 批量删除
        if (this.choose.length === 0)
          return this.$message.error("请至少选择一条数据");
        let ids = this.choose.map((d) => d.id);
        this.$confirm("确定要删除选中的环保专项资金吗?", "提示", {
          type: "warning",
        })
          .then(() => {
            const loading = this.$loading({ lock: true });
            this.$http
              .post("/hmoney/delete", { id: ids })
              .then((res) => {
                loading.close();
                if (res.data.code === 0) {
                  this.$message({ type: "success", message: res.data.msg });
                  this.$refs.table.reload();
                } else {
                  this.$message.error(res.data.msg);
                }
              })
              .catch((e) => {
                loading.close();
                this.$message.error(e.message);
              });
          })
          .catch(() => 0);
      } else {
        // 单个删除
        const loading = this.$loading({ lock: true });
        this.$http
          .post("/hmoney/delete", { id: row.id })
          .then((res) => {
            loading.close();
            if (res.data.code === 0) {
              this.$message({ type: "success", message: res.data.msg });
              this.$refs.table.reload();
            } else {
              this.$message.error(res.data.msg);
            }
          })
          .catch((e) => {
            loading.close();
            this.$message.error(e.message);
          });
      }
    },
  },
};
</script>

<style scoped>
.ele-block >>> .el-upload,
.ele-block >>> .el-upload-dragger {
  width: 100%;
}
</style>