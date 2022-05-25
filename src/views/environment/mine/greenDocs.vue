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
        <el-form-item>
          <el-input v-model="form.name" placeholder="请输入名称"></el-input>
        </el-form-item>
        <el-button type="primary">查询</el-button>
        <el-button type="primary">删除</el-button>
        <el-button type="primary">上传</el-button>
        <el-button type="primary">下载</el-button>
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
        <el-table-column label="名称" prop="name" />
        <el-table-column label="上传时间" prop="name" />
        <el-table-column label="文档类型" prop="name" />
        <el-table-column label="提交人" prop="name" />
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
      /* form */
      form: {}
    }
  }
}
</script>