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
            label="辅运队,洗煤厂,雨水收集池进水量"
            align="center"
          ></el-table-column>
          <el-table-column label="一盘区水仓" align="center"></el-table-column>
          <el-table-column
            label="二盘区水仓1#排水系统2#管路"
            align="center"
          ></el-table-column>
          <el-table-column
            label="二盘区水仓1#排水系统1#管路"
            align="center"
          ></el-table-column>
        </el-table-column>
        <el-table-column label="处理水量">
          <el-table-column label="高密度迷宫斜板净水器">
            <el-table-column label="1#"> </el-table-column>
            <el-table-column label="2#"> </el-table-column>
          </el-table-column>
          <el-table-column label="高效旋流净水器">
            <el-table-column label="1#"> </el-table-column>
            <el-table-column label="2#"> </el-table-column>
            <el-table-column label="2#"> </el-table-column>
          </el-table-column>
        </el-table-column>
        <el-table-column label="出水量">
          <el-table-column label="回用量(绿化)"> </el-table-column>
          <el-table-column label="外排量(水质在线监测站)"> </el-table-column>
        </el-table-column>
        <el-table-column label="内循环量">
          <el-table-column label="集水池(综合时间)"> </el-table-column>
          <el-table-column label="1#滤液箱"> </el-table-column>
          <el-table-column label="2#滤液箱"> </el-table-column>
          <el-table-column label="净化器反冲洗"> </el-table-column>
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