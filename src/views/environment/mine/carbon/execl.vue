<template>
  <div class="ele-body">
    <el-card>
      <el-form ref="form" :model="form" :inline="true" label-width="80px">
        <el-form-item label="选择日期">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-button type="primary">查询</el-button>
      </el-form>
      <ele-data-table
        ref="table"
        :data="tables"
        :choose.sync="choose"
        height="calc(100vh - 290px)"
        highlight-current-row
        v-loading="table_load"
      >
        <el-table-column
          type="selection"
          width="45"
          align="center"
          fixed="left"
        />
        <el-table-column label="序号" type="index" />
        <el-table-column label="报表标题" prop="name" />
        <el-table-column label="数据时间" prop="name" />
        <el-table-column label="创建人" prop="name" />
        <el-table-column label="更新时间" prop="name" />
        <el-table-column label="创建时间" prop="name" />
        <el-table-column label="操作">
          <template slot-scope="">
            <el-button size="mini" type="danger">打开</el-button>
          </template>
        </el-table-column>
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