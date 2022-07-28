<template>
  <div class="ele-body">
    <el-card shadow="never">
      <!-- 数据表格 -->
      <!-- <ele-pro-table :datasource="url" :columns="columns"> </ele-pro-table> -->
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
    };
  },
  methods: {},
};
</script>
