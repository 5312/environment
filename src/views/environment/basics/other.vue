<template>
  <div class="ele-body">
    <el-card>
      <el-form ref="form" :model="form" :inline="true" label-width="80px">
        <el-form-item label="选择日期">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="form.date1"
            style="width: 100%"
          ></el-date-picker>
        </el-form-item>
        <el-form-item> <el-button type="primary">查询</el-button></el-form-item>
      </el-form>
      <el-row :gutter="20">
        <el-col :span="6">
          <!-- <el-input placeholder="输入关键字进行过滤" v-model="filterText"> -->
          <!-- </el-input> -->
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
            <el-table-column
              type="selection"
              width="45"
              align="center"
              fixed="left"
            />
            <el-table-column label="序号" type="index" />
            <el-table-column label="报表标题" prop="title" />
            <el-table-column label="数据时间" prop="time" />
            <el-table-column label="创建人" prop="create" />
            <el-table-column label="更新时间" prop="remark" />
            <el-table-column label="创建时间" prop="remark" />
            <el-table-column label="操作">
              <template slot-scope="">
                <el-button size="mini" type="danger">编辑</el-button>
                <el-button size="mini" type="danger">下载</el-button>
              </template>
            </el-table-column>
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
      table: [{
        title: '地销仓库车辆出口',
        time: '2021-11-11',
        create: 'admin',
        remark: ''
      }, {
        title: '地销仓库车辆出口',
        time: '2021-11-11',
        create: 'admin',
        remark: ''
      }, {
        title: '地销仓库车辆出口',
        time: '2021-11-11',
        create: 'admin',
        remark: ''
      }],
      choose: [],
      table_load: false,
      /* tree */
      data: [{ label: '报表一', }, { label: '报表一' }],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      filterText: '',
    }
  }
}
</script>