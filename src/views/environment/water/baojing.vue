<template>
  <div class="ele-body">
    <el-card>
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
        <el-table-column label="开始时间" prop="star" />
        <el-table-column label="最后时间" prop="end" />
        <el-table-column label="节点" prop="leaf" />
        <el-table-column label="标签名" prop="label" />
        <el-table-column label="状态" prop="status" />
        <el-table-column label="值" prop="params" />
        <el-table-column label="描述" prop="remark" />
      </ele-data-table>
    </el-card>
  </div>
</template>
<script>
export default {
  data () {
    return {
      tables: [
        { star: '2021-07-22', end: '2021-07-22', leaf: 'F1X', label: 'BPCZ2', status: 'OPEN', params: 'OPEN', remark: '2#变频器' },
        { star: '2021-07-22', end: '2021-07-22', leaf: 'F1X', label: 'BPCZ2', status: 'OPEN', params: 'OPEN', remark: '2#变频器' },
        { star: '2021-07-22', end: '2021-07-22', leaf: 'F1X', label: 'BPCZ2', status: 'OPEN', params: 'OPEN', remark: '2#变频器' },
        { star: '2021-07-22', end: '2021-07-22', leaf: 'F1X', label: 'BPCZ2', status: 'OPEN', params: 'OPEN', remark: '2#变频器' },
        { star: '2021-07-22', end: '2021-07-22', leaf: 'F1X', label: 'BPCZ2', status: 'OPEN', params: 'OPEN', remark: '2#变频器' },
        { star: '2021-07-22', end: '2021-07-22', leaf: 'F1X', label: 'BPCZ2', status: 'OPEN', params: 'OPEN', remark: '2#变频器' },
        { star: '2021-07-22', end: '2021-07-22', leaf: 'F1X', label: 'BPCZ2', status: 'OPEN', params: 'OPEN', remark: '2#变频器' },
      ],
      choose: [], // 表格选中数据
      table_load: false,
      /* form */
      form: {}
    }
  }
}
</script>