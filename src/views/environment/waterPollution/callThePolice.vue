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
        <el-table-column label="监测指标" prop="index" />
        <el-table-column label="报警开始时间" prop="star" />
        <el-table-column label="报警结束时间" prop="end" />
        <el-table-column label="报警数值" prop="data" />
        <el-table-column label="阈值" prop="th" />
      </ele-data-table>
    </el-card>
  </div>
</template>
<script>
export default {
  data () {
    return {
      tables: [{
        index: 'PH值',
        star: '2021-11-11',
        end: '2021-11-11',
        data: '7.2030129',
        th: "1-10"
      }, {
        index: 'PH值',
        star: '2021-11-11',
        end: '2021-11-11',
        data: '7.2030129',
        th: "1-10"
      }, {
        index: 'PH值',
        star: '2021-11-11',
        end: '2021-11-11',
        data: '7.2030129',
        th: "1-10"
      }],
      choose: [], // 表格选中数据
      table_load: false,
    }
  }
}
</script>