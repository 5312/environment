<template>
  <!-- 告警统计 -->
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
        <el-row :gutter="15">
          <el-col :md="6" :sm="12"> </el-col>
        </el-row>
      </el-form>

      <!-- 数据表格 -->
      <ele-data-table
        ref="table"
        :config="table"
        :choose.sync="choose"
        height="calc(100vh - 315px)"
        highlight-current-row
      >
        <template slot-scope="{}">
          <el-table-column
            prop="username"
            label="站点名称"
            sortable="custom"
            show-overflow-tooltip
          />
          <el-table-column
            prop="realname"
            label="总数"
            sortable="custom"
            show-overflow-tooltip
          />
          <el-table-column label="一级告警" min-width="60" align="center">
          </el-table-column>
          <el-table-column
            prop="gender_name"
            label="二级告警"
            sortable="custom"
            show-overflow-tooltip
            min-width="80"
          />
          <el-table-column
            prop="mobile"
            label="三级告警"
            sortable="custom"
            show-overflow-tooltip
            min-width="110"
          />
          <el-table-column
            prop="mobile"
            label="四级告警"
            sortable="custom"
            show-overflow-tooltip
            min-width="110"
          />
          <el-table-column
            prop="mobile"
            label="五级告警"
            sortable="custom"
            show-overflow-tooltip
            min-width="110"
          />
          <el-table-column
            prop="mobile"
            label="六级告警"
            sortable="custom"
            show-overflow-tooltip
            min-width="110"
          />
          <el-table-column
            prop="level_name"
            label="故障"
            sortable="custom"
            show-overflow-tooltip
            min-width="100"
          />
        </template>
      </ele-data-table>
    </el-card>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
export default {
  name: "SysUser",
  data() {
    return {
      /* citySelect */
      city: [], // 选中的省市区
      table: { url: "", where: {} }, // 表格配置
      choose: [], // 表格选中数据
      showEdit: false, // 是否显示表单弹窗
      editForm: {}, // 表单数据
      editRules: {
        // 表单验证规则
        username: [
          { required: true, message: "请输入用户账号", trigger: "blur" }
        ],
        realname: [
          { required: true, message: "请输入用户姓名", trigger: "blur" }
        ],
        gender: [{ required: true, message: "请选择性别", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      },
      roleList: [], // 角色列表
      levelList: [], // 职级列表
      positionList: [], // 岗位列表
      deptList: [] // 部门列表
    };
  },
  computed: {
    ...mapGetters(["permission"])
  },
  components: {},
  mounted() {
    this.queryRoles(); // 查询角色列表
    this.getLevelList(); // 查询职级列表
    this.getPositionList(); // 查询岗位列表
    this.getDeptList(); // 查询部门列表
  },
  methods: {
    propval(val) {
      this.city = val;
    },
    /* 显示编辑 */
    edit(row) {
      this.editForm = Object.assign({}, row, {
        role_ids: row.roles.map(d => d.id)
      });

      this.showEdit = true;
      // 取值赋予城市组件
      this.city = row.city;
    },
    /* 保存编辑 */
    save() {
      this.$refs["editForm"].validate(valid => {
        if (valid) {
          const loading = this.$loading({ lock: true });
          this.editForm = Object.assign({}, this.editForm, {
            city: this.city
          });
          this.$http
            .post("/user/edit", this.editForm)
            .then(res => {
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
    /* 删除 */
    remove(row) {
      if (!row) {
        // 批量删除
        if (this.choose.length === 0) {
          return this.$message.error("请至少选择一条数据"); 
        }
        let ids = this.choose.map(d => d.id);
        this.$confirm("确定要删除选中的用户吗?", "提示", { type: "warning" })
          .then(() => {
            const loading = this.$loading({ lock: true });
            this.$http
              .post("/user/delete", { id: ids })
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
          .post("/user/delete", { id: row.id })
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
    },

    /**
     * 重置密码
     */
    resetPwd(row) {
      const loading = this.$loading({ lock: true });
      this.$http
        .post("/user/resetPwd", { id: row.id })
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
    },
    /* 更改状态 */
    editStatus(row) {
      const loading = this.$loading({ lock: true });
      let params = Object.assign({}, row);
      this.$http
        .post("/user/status", params)
        .then(res => {
          loading.close();
          if (res.data.code === 0) {
            this.$message({ type: "success", message: res.data.msg });
          } else {
            row.status = !row.status ? 2 : 1;
            this.$message.error(res.data.msg);
          }
        })
        .catch(e => {
          loading.close();
          this.$message.error(e.message);
        });
    },
    /* 查询角色列表 */
    queryRoles() {
      this.$http
        .get("/role/getRoleList")
        .then(res => {
          if (res.data.code === 0) {
            this.roleList = res.data.data;
          } else {
            this.$message.error(res.data.msg);
          }
        })
        .catch(e => {
          this.$message.error(e.message);
        });
    },
    /**
     * 获取职级列表
     */
    getLevelList() {
      this.$http
        .get("/level/getLevelList")
        .then(res => {
          if (res.data.code === 0) {
            this.levelList = res.data.data;
          } else {
            this.$message.error(res.data.msg);
          }
        })
        .catch(e => {
          this.$message.error(e.message);
        });
    },
    /**
     * 获取岗位列表
     */
    getPositionList() {
      this.$http
        .get("/position/getPositionList")
        .then(res => {
          if (res.data.code === 0) {
            this.positionList = res.data.data;
          } else {
            this.$message.error(res.data.msg);
          }
        })
        .catch(e => {
          this.$message.error(e.message);
        });
    },
    /**
     * 获取部门列表
     */
    getDeptList() {
      this.$http
        .get("/dept/getDeptList")
        .then(res => {
          if (res.data.code === 0) {
            this.deptList = this.$util.toTreeData(res.data.data, "id", "pid");
          } else {
            this.$message.error(res.data.msg);
          }
        })
        .catch(e => {
          this.$message.error(e.message);
        });
    }
  }
};
</script>

<style scoped>
.ele-block >>> .el-upload,
.ele-block >>> .el-upload-dragger {
  width: 100%;
}
/* 用户资料卡片 */
.user-info-card {
  padding-top: 8px;
  text-align: center;
}

.user-info-card .user-info-avatar-group {
  position: relative;
  cursor: pointer;
  margin: 0 auto;
  width: 110px;
  height: 110px;
  border-radius: 50%;
  overflow: hidden;
}

.user-info-card .user-info-avatar {
  width: 110px;
  height: 110px;
  border-radius: 50%;
  object-fit: cover;
}

.user-info-card .user-info-avatar-group > i {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #fff;
  font-size: 30px;
  display: none;
  z-index: 2;
}

.user-info-card .user-info-avatar-group:hover > i {
  display: block;
}

.user-info-card .user-info-avatar-group:hover:after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
}
</style>
