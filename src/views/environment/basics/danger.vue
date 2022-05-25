<template>
  <div class="ele-body">
    <el-card>
      <el-form ref="form" :model="form" :inline="true" label-width="80px">
        <el-form-item label="选择日期">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-button type="primary">导出</el-button>
      </el-form>
      <ele-data-table
        ref="table"
        :data="tables"
        :choose.sync="choose"
        height="calc(100vh - 290px)"
        highlight-current-row
        v-loading="table_load"
      >
        <el-table-column label="单位" prop="dept" />
        <el-table-column label="危废代码" prop="code" />
        <el-table-column label="名称" prop="name" />
        <el-table-column label="回收限值" prop="back" />
        <el-table-column label="本月" align="center">
          <el-table-column label="生产量" prop="get" />
          <el-table-column label="转移量" prop="move" />
        </el-table-column>
        <el-table-column label="年度累计" align="center">
          <el-table-column label="生产量" prop="get" />
          <el-table-column label="转移量" prop="move" />
          <el-table-column label="贮存量" prop="move" />
          <el-table-column label="回收率" prop="move" />
        </el-table-column>
        <el-table-column label="备注" prop="remark" />
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
      /* form */
      form: {}
    }
  }
}
</script>