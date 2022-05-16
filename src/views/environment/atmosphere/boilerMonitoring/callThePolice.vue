<template>
  <div class="ele-body">
    <el-card>
      <ele-data-table
        ref="table"
        :data="tables"
        :choose.sync="choose"
        height="calc(100vh - 230px)"
        highlight-current-row
        v-loading="table_load"
      >
        <el-table-column
          type="selection"
          width="45"
          align="center"
          fixed="left"
        />
        <el-table-column label="监测指标" prop="name" />
        <el-table-column label="报警开始时间" prop="name" />
        <el-table-column label="报警结束时间" prop="name" />
        <el-table-column label="报警数值" prop="name" />
        <el-table-column label="阈值" prop="name" />
      </ele-data-table>
    </el-card>
  </div>
</template>
<script>
export default {
  data () {
    return {
      tables: [],
      choose: [], // 表格选中数据
      table_load: false,
    }
  }
}
</script>