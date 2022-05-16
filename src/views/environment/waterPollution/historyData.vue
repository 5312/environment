<template>
  <div class="ele-body">
    <el-card>
      <el-form ref="form" :model="form" :inline="true" label-width="80px">
        <el-form-item label="开始时间">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="form.date1"
            style="width: 100%"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="form.date1"
            style="width: 100%"
          ></el-date-picker>
        </el-form-item>
        <el-form-item> <el-button type="primary">查询</el-button></el-form-item>
        <el-form-item>
          <el-button type="primary">实时数据</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">小时数据</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">日均值</el-button>
        </el-form-item>
        <el-form-item> <el-button type="primary">导出</el-button></el-form-item>
      </el-form>
      <el-row :gutter="20">
        <el-col :span="6">
          <el-input placeholder="输入关键字进行过滤" v-model="filterText">
          </el-input>

          <el-tree
            class="filter-tree"
            :data="data"
            :props="defaultProps"
            default-expand-all
            ref="tree"
          >
          </el-tree>
        </el-col>
        <el-col :span="18">
          <ele-data-table
            ref="table"
            :data="table"
            :choose.sync="choose"
            height="calc(100vh - 290px)"
            highlight-current-row
            v-loading="table_load"
          >
            <el-table-column label="点位名称" prop="name" />
            <el-table-column label="PM10" prop="name" />
            <el-table-column label="PM2.5" prop="name" />
            <el-table-column label="温度" prop="name" />
            <el-table-column label="湿度" prop="name" />
            <el-table-column label="风速" prop="name" />
            <el-table-column label="风向" prop="name" />
            <el-table-column label="时间" prop="name" />
          </ele-data-table>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>
<script>
export default {

  data () {
    return {
      form: {},
      table: [],
      choose: [],
      table_load: false,
      /* tree */
      data: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      filterText: '',
    }
  }
}
</script>
