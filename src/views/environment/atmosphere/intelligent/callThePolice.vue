<template>
  <div class="ele-body">
    <el-card>
      <el-form ref="form" :model="form" :inline="true" label-width="80px">
        <el-form-item label="开始时间">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="结束时间">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="点位">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-button type="primary">查询</el-button>
      </el-form>
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
        <el-table-column label="点位" prop="dianwei" />
        <el-table-column label="类型" prop="type" />
        <el-table-column label="报警值" prop="baojing" />
        <el-table-column label="阈值" prop="yuzhi" />
      </ele-data-table>
    </el-card>
  </div>
</template>
<script>
export default {
  data () {
    return {
      tables: [{
        dianwei: '北门消防楼',
        type: 'PM2.5|PM10',
        baojing: '5.67|153.24',
        yuzhi: '150|150'
      }, {
        dianwei: '北门消防楼',
        type: 'PM2.5|PM10',
        baojing: '5.67|153.24',
        yuzhi: '150|150'
      }, {
        dianwei: '北门消防楼',
        type: 'PM2.5|PM10',
        baojing: '5.67|153.24',
        yuzhi: '150|150'
      }],
      choose: [], // 表格选中数据
      table_load: false,
      /* form */
      form: {}
    }
  }
}
</script>