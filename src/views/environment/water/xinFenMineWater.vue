<template>
  <div class="ele-body">
    <el-card>
      <el-form ref="form" :model="form" :inline="true" label-width="80px">
        <el-form-item label="选择时间">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
      </el-form>
      <ele-data-table
        ref="table"
        :data="tables"
        :choose.sync="choose"
        height="calc(100vh - 230px)"
        highlight-current-row
        v-loading="table_load"
      >
        <el-table-column label="时间" prop="name" />
        <el-table-column label="调节池进水量" align="center">
          <el-table-column
            label="二盘区水仓2#排水系统1#管路"
            align="center"
          ></el-table-column>
          <el-table-column
            label="二盘区水仓2#排水系统2#管路"
            align="center"
          ></el-table-column>
        </el-table-column>
        <el-table-column label="处理水量">
          <el-table-column label="高效旋流多级净化器">
            <el-table-column label="1#"> </el-table-column>
            <el-table-column label="2#"> </el-table-column>
          </el-table-column>
        </el-table-column>
        <el-table-column label="出水量">
          <el-table-column label="井下生产回用量"> </el-table-column>
          <el-table-column label="5-2综采面用水量"> </el-table-column>
        </el-table-column>
        <el-table-column label="内循环量">
          <el-table-column label="净化器反冲洗,排泥"> </el-table-column>
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
      form: {}
    }
  }
}
</script>