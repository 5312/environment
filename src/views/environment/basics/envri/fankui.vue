<template>
  <div class="ele-body">
    <el-card>
      <el-form ref="form" :model="form" :inline="true" label-width="80px">
        <el-form-item label="选择日期">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="form.name" placeholder="请输入查询内容"></el-input>
        </el-form-item>
        <el-button type="primary">查询</el-button>
        <el-button type="primary">反馈</el-button>
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
        <el-table-column label="项目名称" prop="title" />
        <el-table-column label="施工单位" prop="dept" />
        <el-table-column label="负责人" prop="name" />
        <el-table-column label="预计完成时间" prop="overtime" />
        <el-table-column label="操作">
          <template slot-scope="">
            <el-button size="mini" type="danger">查看</el-button>

            <el-button size="mini" type="danger">反馈</el-button>
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
        title: '测试',
        dept: '施工',
        name: 'admin',
        overtime: '2021-11-12',
      }, {
        title: '测试',
        dept: '施工',
        name: 'admin',
        overtime: '2021-11-12',
      }, {
        title: '测试',
        dept: '施工',
        name: 'admin',
        overtime: '2021-11-12',
      }, {
        title: '测试',
        dept: '施工',
        name: 'admin',
        overtime: '2021-11-12',
      }, {
        title: '测试',
        dept: '施工',
        name: 'admin',
        overtime: '2021-11-12',
      }, {
        title: '测试',
        dept: '施工',
        name: 'admin',
        overtime: '2021-11-12',
      }],
      choose: [], // 表格选中数据
      table_load: false,
      /* form */
      form: {}
    }
  }
}
</script>
