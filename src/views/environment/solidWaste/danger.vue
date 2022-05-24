<template>
  <div class="ele-body">
    <el-card>
      <el-form ref="form" :model="form" :inline="true" label-width="80px">
        <el-form-item label="开始时间">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="结束时间">
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
        <el-table-column label="年月" prop="name" />
        <el-table-column label="危废代码" prop="name" />
        <el-table-column label="类别" prop="name" />
        <el-table-column label="产生量" prop="name" />
        <el-table-column label="转移量" prop="name" />
        <el-table-column label="回收率" prop="name" />
        <el-table-column label="备注" prop="name" />
        <el-table-column label="填报时间" prop="name" />
        <el-table-column label="填报人" prop="name" />
        <el-table-column label="操作" prop="name" />
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