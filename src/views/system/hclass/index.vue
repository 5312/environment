<template>
  <div class="ele-body">
    <el-card shadow="never">
      <!-- 操作按钮 -->
      <div class="ele-table-tool ele-table-tool-default">
        <el-button
          @click="showEdit = true"
          type="primary"
          icon="el-icon-plus"
          class="ele-btn-icon"
          size="small"
          v-if="permission.includes('sys:hclass:add')"
          >添加
        </el-button>
        <el-button
          @click="remove()"
          type="danger"
          icon="el-icon-delete"
          class="ele-btn-icon"
          size="small"
          v-if="permission.includes('sys:hclass:dall')"
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
            prop="hclass_name"
            label="类别名称"
            sortable="custom"
            show-overflow-tooltip
            width="180"
          />
          <el-table-column
            prop="hclass_hgrain_name"
            label="监测元素"
            sortable="custom"
            show-overflow-tooltip
            min-width="120"
          >
            <template slot-scope="{ row }">
              <el-tag
                effect="dark"
                size="mini"
                v-for="(x, y) in row.hclass_hgrain_name
                  ? row.hclass_hgrain_name.split(',')
                  : []"
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
            width="160"
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
                v-if="permission.includes('sys:hclass:edit')"
                >修改</el-link
              >
              <el-popconfirm
                title="确定要删除此监测类别吗？"
                @confirm="remove(row)"
                class="ele-action"
              >
                <el-link
                  slot="reference"
                  icon="el-icon-delete"
                  type="danger"
                  :underline="false"
                  v-if="permission.includes('sys:hclass:delete')"
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
      :title="editForm.id ? '修改监测类别' : '修改监测类别'"
      :visible.sync="showEdit"
      width="450px"
      @closed="editForm = { hclass_hgrain: [] }"
      :destroy-on-close="true"
      :lock-scroll="false"
    >
      <el-form
        :model="editForm"
        ref="editForm"
        :rules="editRules"
        label-width="100px"
      >
        <el-form-item label="类别名称：" prop="hclass_name">
          <el-input
            v-model="editForm.hclass_name"
            controls-position="right"
            placeholder="请输入类别名称"
            class="ele-fluid ele-text-left"
          />
        </el-form-item>
        <el-form-item label="监测元素：" prop="hclass_hgrain">
          <el-checkbox-group v-model="editForm.hclass_hgrain">
            <el-checkbox
              v-for="(item, ind) in comArr"
              :key="ind"
              name="hclass_hgrain"
              :label="item.id"
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
import { mapGetters } from "vuex";
export default {
  name: "SysHclass",
  data() {
    return {
      table: { url: "/hclass/index", where: {} }, // 表格配置
      choose: [], // 表格选中数据
      showEdit: false, // 是否显示表单弹窗
      editForm: {
        hclass_name: "",
        hclass_hgrain: []
      }, // 表单数据
      editRules: {
        // 表单验证规则
        hclass_name: [
          { required: true, message: "请输入类别名称", trigger: "blur" }
        ],
        hclass_hgrain: [
          { required: true, message: "请输入监测元素", trigger: "blur" }
        ]
      },
      arrays: []
    };
  },
  computed: {
    ...mapGetters(["permission"]),
    comArr() {
      this.arrays.map(d => {
        d.id = String(d.id);
      });
      return this.arrays;
    }
  },
  created() {},
  mounted() {
    this.getArray();
  },
  methods: {
    getArray() {
      this.$http.get("/hgrain/index").then(res => {
        var arr = res.data.data;
        if (arr) {
          this.arrays = arr;
        } else {
          this.arrays = [];
        }
      });
    },
    /**
     * 显示编辑
     */
    edit(row) {
      this.showEdit = true;
      this.$http
        .get("/hclass/info?id=" + row.id)
        .then(res => {
          if (res.data.code === 0) {
            let arr = res.data.data.hclass_hgrain_id.split(",");
            this.editForm = {
              id: res.data.data.id,
              hclass_name: res.data.data.hclass_name,
              hclass_hgrain: arr
            };
          } else {
            this.$message.error(res.data.msg);
          }
        })
        .catch(e => {
          this.$message.error(e.message);
        });
      // console.log(this.editFrom);
    },
    /**
     * 保存编辑
     */
    save() {
      this.$refs["editForm"].validate(valid => {
        this.editForm.hclass_hgrain_id =
          this.editForm.hclass_hgrain.join(",") + ",";

        let ids = this.editForm.hclass_hgrain;
        let nameArr = [];
        for (let i = 0; i < ids.length; i++) {
          const element = ids[i];
          for (let x = 0; x < this.arrays.length; x++) {
            const item = this.arrays[x];
            if (Number(item.id) == Number(element)) {
              nameArr.push(item.hgrain_name);
            }
          }
        }
        this.editForm.hclass_hgrain_name = nameArr.join(",");
        if (valid) {
          const loading = this.$loading({ lock: true });
          this.$http
            .post("/hclass/edit", Object.assign({}, this.editForm))
            .then(res => {
              console.log(res);
              loading.close();
              if (res.data.code === 0) {
                this.showEdit = false;
                this.$message({ type: "success", message: res.data.msg });
                this.$refs.table.reload();
              } else {
                this.$message.error(res.data.msg);
              }
            })
            .catch(e => {
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
        if (this.choose.length === 0)
          return this.$message.error("请至少选择一条数据");
        let ids = this.choose.map(d => d.id);
        this.$confirm("确定要删除选中的监测类别吗?", "提示", {
          type: "warning"
        })
          .then(() => {
            const loading = this.$loading({ lock: true });
            this.$http
              .post("/hclass/delete", { id: ids })
              .then(res => {
                loading.close();
                if (res.data.code === 0) {
                  this.$message({ type: "success", message: res.data.msg });
                  this.$refs.table.reload();
                } else {
                  this.$message.error(res.data.msg);
                }
              })
              .catch(e => {
                loading.close();
                this.$message.error(e.message);
              });
          })
          .catch(() => 0);
      } else {
        // 单个删除
        const loading = this.$loading({ lock: true });
        this.$http
          .post("/hclass/delete", { id: row.id })
          .then(res => {
            loading.close();
            if (res.data.code === 0) {
              this.$message({ type: "success", message: res.data.msg });
              this.$refs.table.reload();
            } else {
              this.$message.error(res.data.msg);
            }
          })
          .catch(e => {
            loading.close();
            this.$message.error(e.message);
          });
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
</style>
