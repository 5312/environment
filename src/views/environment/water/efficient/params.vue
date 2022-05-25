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
        <el-table-column label="功能,设置值" align="center">
          <el-table-column label="超高限值" align="center" prop="max">
          </el-table-column>
          <el-table-column label="正常限值" align="center" prop="normal">
          </el-table-column>
          <el-table-column label="超低限值" align="center" prop="min">
          </el-table-column>
        </el-table-column>
        <el-table-column label="显示值" align="center" prop="show">
        </el-table-column>
        <el-table-column label="名称" align="center" prop="name">
        </el-table-column>
        <el-table-column label="功能,设置值" align="center">
          <el-table-column label="超高限值" align="center" prop="max">
          </el-table-column>
          <el-table-column label="正常限值" align="center" prop="normal">
          </el-table-column>
          <el-table-column label="超低限值" align="center" prop="min">
          </el-table-column>
        </el-table-column>
        <el-table-column label="显示值" align="center" prop="show">
        </el-table-column>
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
        { name: "1#浊度(单位 NTU)", max: 5, normal: 3, min: '-', show: '2.05' },
        { name: "1#浊度(单位 NTU)", max: 5, normal: 3, min: '-', show: '2.05' },
        { name: "1#浊度(单位 NTU)", max: 5, normal: 3, min: '-', show: '2.05' },
        { name: "1#浊度(单位 NTU)", max: 5, normal: 3, min: '-', show: '2.05' },
        { name: "1#浊度(单位 NTU)", max: 5, normal: 3, min: '-', show: '2.05' },
        { name: "1#浊度(单位 NTU)", max: 5, normal: 3, min: '-', show: '2.05' },
      ]
    }
  }
}
</script>
<style lang="scss" scoped>
</style>