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
        <el-table-column label="时间" prop="time" />
        <el-table-column label="净水车间">
          <el-table-column label="取水量" prop="qu"> </el-table-column>
          <el-table-column label="排泥,反洗量" prop="qu"> </el-table-column>
        </el-table-column>
        <el-table-column label="生活污水处理站">
          <el-table-column label="生活区">
            <el-table-column label="调节池治水量" prop="qu"> </el-table-column>
            <el-table-column label="回用量" prop="qu"> </el-table-column>
            <el-table-column label="内循环">
              <el-table-column label="A/O设备排泥净水车排泥" prop="qu">
              </el-table-column>
            </el-table-column>
          </el-table-column>
          <el-table-column label="工业区">
            <el-table-column label="调节池治水量" prop="qu"> </el-table-column>
            <el-table-column label="回用量">
              <el-table-column label="地面回用量" prop="qu"> </el-table-column>
              <el-table-column label="井下回用量" prop="qu"> </el-table-column>
            </el-table-column>
            <el-table-column label="内循环量">
              <el-table-column label="净水器反冲洗" prop="qu">
              </el-table-column>
              <el-table-column label="A/O设备排泥净水车排泥" prop="qu">
              </el-table-column>
            </el-table-column>
          </el-table-column>
        </el-table-column>
      </ele-data-table>
    </el-card>
  </div>
</template>
<script>
export default {
  data () {
    return {
      tables: [{
        time: '0:00',
        qu: 1,
      }, {
        time: '0:00',
        qu: 1,
      }, {
        time: '0:00',
        qu: 1,
      }],
      choose: [], // 表格选中数据
      table_load: false,
      form: {}
    }
  }
}
</script>