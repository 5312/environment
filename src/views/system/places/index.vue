<template>
  <div class="ele-body">
    <el-card shadow="never">
      <!-- 数据表格 -->
      <el-table
        ref="table"
        :data="data"
        row-key="id"
        default-expand-all
        border
        height="calc(100vh - 215px)"
        highlight-current-row
        lazy
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      ></el-table
    ></el-card>
  </div>
</template>
<script>
export default {
  name: "basis",
  data() {
    return {
      data: [],
    };
  },
  methods: {},
};
</script>
