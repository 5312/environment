<!-- 职级编辑弹窗 -->
<template>
  <el-dialog
    :title="isUpdate ? '修改职级' : '添加职级'"
    :visible="visible"
    width="460px"
    :destroy-on-close="true"
    :lock-scroll="false"
    @update:visible="updateVisible"
  >
    <el-form ref="form" :model="form" :rules="rules" label-width="102px">
      <el-form-item label="监测点名称:" prop="name">
        <el-input
          :maxlength="20"
          v-model="form.name"
          placeholder="请输入监测点名称"
          clearable
        />
      </el-form-item>
    </el-form>
    <div slot="footer">
      <el-button @click="updateVisible(false)">取消</el-button>
      <el-button type="primary" @click="save" :loading="loading"
        >保存
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
import { addnew, modify } from "@/api/items/index";
export default {
  name: "edit",
  props: {
    // 弹窗是否打开
    visible: Boolean,
    // 修改回显的数据
    data: Object,
  },
  data() {
    return {
      // 表单数据
      form: Object.assign({ status: 1 }, this.data),
      // 表单验证规则
      rules: {
        name: [
          { required: true, message: "请输入监测点名称", trigger: "blur" },
        ],
      },
      // 提交状态
      loading: false,
      // 是否是修改
      isUpdate: false,
    };
  },
  watch: {
    data() {
      if (this.data) {
        this.form = Object.assign({}, this.data);
        this.isUpdate = true;
      } else {
        this.form = {};
        this.isUpdate = false;
      }
    },
  },
  methods: {
    /* 保存编辑 */
    save() {
      // console.log(this.form)
      this.$refs["form"].validate(async (valid) => {
        if (valid) {
          this.loading = true;
          let result = null;
          if (this.form.id) {
            /* 修改 */
            result = await modify(this.form).catch((e) => {
              this.loading = false;
              this.$message.error(e.message);
            });
          } else {
            /* 添加 */
            result = await addnew(this.form).catch((e) => {
              this.loading = false;
              this.$message.error(e.message);
            });
          }
          /* -- */
          this.loading = false;
          if (result.code === 0) {
            this.$message.success(result.msg);
            this.form = {};
            // if (!this.isUpdate) {}
            this.updateVisible(false);
            this.$emit("done");
          } else {
            this.$message.error(result.msg);
          }
        } else {
          return false;
        }
      });
    },
    /* 更新visible */
    updateVisible(value) {
      this.$emit("update:visible", value);
    },
  },
};
</script>

<style scoped></style>
