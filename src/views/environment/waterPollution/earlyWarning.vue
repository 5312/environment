<template>
  <div class="ele-body">
    <el-card>
      <ele-data-table
        ref="table"
        :data="table"
        :choose.sync="choose"
        height="calc(100vh - 230px)"
        highlight-current-row
        v-loading="load"
      >
        <el-table-column label="监测指标" prop="index" align="center" />
        <el-table-column label="预警开始时间" prop="star" />
        <el-table-column label="预警结束时间" prop="end" />
        <el-table-column label="预警数据" prop="data" />
        <el-table-column label="阈值" prop="th" />
      </ele-data-table>
    </el-card>
  </div>
</template>
<script>
export default {
  data () {
    return {
      load: false,
      choose: [], // 表格选中数据
      table: [
        { index: 'PH值', star: '2021', end: '2021', data: '7.235', th: '1-100' },
        { index: 'PH值', star: '2021', end: '2021', data: '7.235', th: '1-100' },
        { index: '污水流量', star: '2021', end: '2021', data: '7.235', th: '10000' },
      ]
    }
  }
}
</script>
<style lang="scss" scoped>
</style>