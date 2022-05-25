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
        <el-table-column label="序号" type="index" />
        <el-table-column label="开始时间" prop="start" />
        <el-table-column label="最后时间" prop="end" />
        <el-table-column label="节点" prop="leaf" />
        <el-table-column label="标签名" prop="label" />
        <el-table-column label="状态" prop="status" />
        <el-table-column label="值" prop="z" />
        <el-table-column label="描述" prop="remark" />
      </ele-data-table>
    </el-card>
  </div>
</template>
<script>
export default {
  data () {
    return {
      tables: [{
        start: '2021-07-22',
        end: '2021-07-23',
        leaf: '安全环保部',
        label: 'BPGZ2',
        status: 'COS',
        z: 'COS',
        remark: 'COS'
      }],
      choose: [], // 表格选中数据
      table_load: false,
      /* form */
      form: {}
    }
  }
}
</script>