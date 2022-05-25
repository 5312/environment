<template>
  <div class="ele-body">
    <el-card>
      <el-form ref="form" :model="form" :inline="true" label-width="80px">
        <el-form-item label="选择日期">
          <el-input v-model="form.name" placeholder="请选择完结日期"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="form.name" placeholder="请输入项目名称"></el-input>
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
        <el-table-column label="序号" type="index" />
        <el-table-column label="重点科研项目" prop="title" />
        <el-table-column label="实施单位" prop="dept" />
        <el-table-column label="项目级别" prop="level" />
        <el-table-column label="完结时间" prop="overtime" />
        <el-table-column label="合作单位" prop="getdept" />
        <el-table-column label="商务/方案进度" prop="schedule" />
        <el-table-column label="操作">
          <template slot-scope="">
            <el-button size="mini" type="danger">查看</el-button>
            <el-button size="mini" type="danger">编辑</el-button>
          </template>
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
        title: '项目测试更新',
        dept: "",
        level: '集团级',
        overtime: '2021-08-09',
        getdept: '合作单位',
        schedule: ''

      }],
      choose: [], // 表格选中数据
      table_load: false,
      /* form */
      form: {}
    }
  }
}
</script>
