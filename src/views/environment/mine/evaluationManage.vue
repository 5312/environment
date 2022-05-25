<template>
  <div class="ele-body">
    <el-card>
      <el-form ref="form" :model="form" :inline="true" label-width="80px">
        <el-form-item>
          <el-input v-model="form.name" placeholder="请输入责任单位"></el-input>
        </el-form-item>

        <el-button type="primary">设置责任单位</el-button>
        <el-button type="primary">删除</el-button>
        <el-button type="primary">新增</el-button>
        <el-button type="primary">新建评价</el-button>
      </el-form>
      <ele-data-table
        ref="table"
        :data="tables"
        :choose.sync="choose"
        height="calc(100vh - 230px)"
        highlight-current-row
        v-loading="table_load"
      >
        <el-table-column
          type="selection"
          width="45"
          align="center"
          fixed="left"
        />
        <el-table-column label="一级" prop="name" />
        <el-table-column label="二级" prop="name" />
        <el-table-column label="三级指标" prop="name" />
        <el-table-column label="标准分" prop="name" />
        <el-table-column label="评分说明" prop="name" />
        <el-table-column label="考核方法" prop="name" />
        <el-table-column label="依据或标准" prop="name" />
        <el-table-column label="责任单位" prop="name" />
        <el-table-column label="操作">
          <template slot-scope="">
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
      tables: [],
      choose: [], // 表格选中数据
      table_load: false,
      form: {}
    }
  }
}
</script>