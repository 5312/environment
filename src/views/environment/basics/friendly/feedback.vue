<template>
  <div class="ele-body">
    <el-card>
      <el-form ref="form" :model="form" :inline="true" label-width="80px">
        <el-form-item label="选择日期">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-button type="primary">查询</el-button>
        <el-button type="primary">新增</el-button>
        <el-button type="primary">下发</el-button>
        <el-button type="primary">删除</el-button>
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
        <el-table-column label="序号" type="index" />
        <el-table-column label="隐患或问题单位" prop="yh_w" />
        <el-table-column label="隐患或问题地点" prop="address" />
        <el-table-column label="下此通知单位" prop="dept" />
        <el-table-column label="下发时间" prop="time" />
        <el-table-column label="状态" prop="status" />
        <el-table-column label="操作">
          <template slot-scope="">
            <el-button size="mini" type="danger">查看</el-button>

            <el-button size="mini" type="danger">编辑</el-button>
          </template></el-table-column
        >
      </ele-data-table>
    </el-card>
  </div>
</template>
<script>
export default {
  data () {
    return {
      tables: [{
        yh_w: '大佛寺/机电部',
        address: '1',
        dept: '',
        time: "2021-11-13",
        status: '已反馈',

      }, {
        yh_w: '大佛寺/机电部',
        address: '1',
        dept: '',
        time: "2021-11-13",
        status: '已反馈',

      }, {
        yh_w: '大佛寺/机电部',
        address: '1',
        dept: '',
        time: "2021-11-13",
        status: '已反馈',

      }, {
        yh_w: '大佛寺/机电部',
        address: '1',
        dept: '',
        time: "2021-11-13",
        status: '已反馈',

      },],
      choose: [], // 表格选中数据
      table_load: false,
      /* form */
      form: {}
    }
  }
}
</script>