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
        <el-table-column label="监测指标" prop="zhibiao" />
        <el-table-column label="报警开始时间" prop="star" />
        <el-table-column label="报警结束时间" prop="end" />
        <el-table-column label="报警数值" prop="param" />
        <el-table-column label="阈值" prop="yu" />
      </ele-data-table>
    </el-card>
  </div>
</template>
<script>
export default {
  data () {
    return {
      tables: [{
        zhibiao: '二氧化硫折算',
        star: '2021-11-02',
        end: '2021-11-02',
        param: '9.0587111',
        yu: '100000'
      }, {
        zhibiao: '二氧化硫折算',
        star: '2021-11-02',
        end: '2021-11-02',
        param: '9.0587111',
        yu: '100000'
      }],
      choose: [], // 表格选中数据
      table_load: false,
    }
  }
}
</script>