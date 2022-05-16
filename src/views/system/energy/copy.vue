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
          <el-form
            :model="table.where"
            label-width="77px"
            class="ele-form-search"
            @keyup.enter.native="$refs.table.reload()"
            @submit.native.prevent
          >
            <el-row :gutter="15">
              <el-col :md="6" :sm="12">
                <div class="ele-form-actions flex">
                  <div class="flex inline">
                    <el-date-picker
                      v-model="date"
                      type="daterange"
                      @change="change"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期"
                    >
                    </el-date-picker>
                  </div>
                  <el-button
                    style="margin-left: 10px"
                    type="primary"
                    @click="$refs.table.reload()"
                    icon="el-icon-search"
                    class="ele-btn-icon"
                    >查询
                  </el-button>
                  <el-button @click="(table.where = {}) && $refs.table.reload()"
                    >导出
                  </el-button>
                </div>
              </el-col>
            </el-row>
          </el-form>
          <!-- 数据表格 -->
          <ele-data-table
            ref="table"
            :config="table"
            :choose.sync="choose"
            height="calc(100vh - 215px)"
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
                    v-if="permission.includes('sys:energy:edit')"
                    >修改</el-link
                  >
                  <el-popconfirm
                    title="确定要删除此能耗吗？"
                    @confirm="remove(row)"
                    class="ele-action"
                  >
                    <el-link
                      slot="reference"
                      icon="el-icon-delete"
                      type="danger"
                      :underline="false"
                      v-if="permission.includes('sys:energy:delete')"
                      >删除</el-link
                    >
                  </el-popconfirm>
                </template>
              </el-table-column>
            </template>
          </ele-data-table>
        </el-card>
      </el-col>
    </el-row>

    <!-- 编辑弹窗 -->
    <el-dialog
      :title="editForm.id ? '修改能耗' : '修改能耗'"
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
export default {
  name: "SysEnergy",
  data() {
    return {
      dateType: "date",
      index: 0, // 树 - 标签
      report_data: 0,
      table: { url: "/energy/index", where: {} }, // 表格配置
      choose: [], // 表格选中数据
      showEdit: false, // 是否显示表单弹窗
      editForm: {}, // 表单数据
      date: "", // 日期
      editRules: {
        // 表单验证规则
      },
      defaultProps: {
        label: "title",
        children: "child",
      },
      data: [],
    };
  },
  computed: {
    ...mapGetters(["permission"]),
  },
  watch: {
    index() {
      this.getDeptList();
    },
  },
  mounted() {
    this.getDeptList();
  },
  methods: {
    getDeptList() {
      console.log("树");
      let url = {
        0: "/energy/getQyTreeCalss",
        1: "/energy/getFxTreeCalss",
        2: "/energy/getBmTreeCalss",
        3: "/energy/getQyTreeCalss",
      };
      // 区域查询
      this.$http
        .get(url[this.index], {
          params: {
            dept_id: "22",
            road_id: 0,
            cate_id: 1,
          },
        })
        .then((res) => {
          if (res.data.code === 0) {
            this.data = res.data.data;
          } else {
            this.$message.error(res.data.msg);
          }
        })
        .catch((e) => {
          this.$message.error(e.message);
        });
    },
    /*****树**********/
    typeSelect(i) {
      this.index = i;
    },
    report_dataFunc(i) {
      this.report_data = i;
    },
    /*树节点*/
    handleNodeClick() {},
    change() {},
    /**
     * 显示编辑
     */
    edit(row) {
      this.$http
        .get("/energy/info?id=" + row.id)
        .then((res) => {
          if (res.data.code === 0) {
            this.editForm = res.data.data;
            this.showEdit = true;
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
            .post("/energy/edit", this.editForm)
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
      console.log(row);
      if (!row) {
        // 批量删除
        if (this.choose.length === 0) {
          return this.$message.error("请至少选择一条数据");
        }
        let ids = this.choose.map((d) => d.id);
        this.$confirm("确定要删除选中的能耗吗?", "提示", { type: "warning" })
          .then(() => {
            const loading = this.$loading({ lock: true });
            this.$http
              .post("/energy/delete", { id: ids })
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
          .post("/energy/delete", { id: row.id })
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
