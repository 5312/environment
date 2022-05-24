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
        { name: '烟尘折算', yu: '100000mg mg/m³', bao: '10000000 mg/m³' },
        { name: '烟气流速', yu: '100000 m/s', bao: '10000000 m/s' },
        { name: '烟气湿度', yu: '100000%', bao: '10000000%' },
        { name: '二氧化硫折算', yu: '100000 mg/m³', bao: '100000 mg/m³' },
        { name: '氮氧化物折算', yu: '100000 mg/m³', bao: '100000 mg/m³' },
        { name: '二氧化硫', yu: '100000 mg/m³', bao: '100000 mg/m³' },


      ]
    }
  }
}
</script>
<style lang="scss" scoped>
</style>