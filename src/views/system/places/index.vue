<template>
  <div class="ele-body">
    <el-card shadow="never">
      <!-- 数据表格 -->
      <ele-pro-table class="eleprotable" :datasource="url" :columns="columns">
      </ele-pro-table>
    </el-card>
  </div>
</template>
<script>
import { columns } from "./columns";
export default {
  name: "basis",
  data() {
    return {
      data: [],
      columns: columns,
      url: "/basic/Items/GetList",
    };
  },
  methods: {},
};
</script>
<style>
.eleprotable {
  width: 100%;
}
</style>
