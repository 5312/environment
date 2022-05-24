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
        <el-table-column label="名称" prop="name" align="center" />
        <el-table-column label="预警值" prop="yu" align="center" />
        <el-table-column label="报警值" prop="bao" align="center" />
        <el-table-column label="预警上限" prop="bao" align="center" />
        <el-table-column label="预警下限" prop="bao" align="center" />
        <el-table-column label="报警上限" prop="bao" align="center" />
        <el-table-column label="报警下限" prop="bao" align="center" />
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
        { name: '污水流量', yu: '100000mg L/s', bao: '10000000 L/s' },
        { name: 'COD', yu: '100000 mg/L', bao: '10000000 mg/L' },
        { name: 'PH值', yu: '100000', bao: '10000000' },
        { name: '悬浮物', yu: '100000 mg/L', bao: '100000 mg/L' },
      ]
    }
  }
}
</script>
<style lang="scss" scoped>
</style>