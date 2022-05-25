<template>
  <div class="ele-body">
    <el-card>
      <el-form ref="form" :model="form" :inline="true" label-width="80px">
        <el-form-item>
          <el-input v-model="form.name" placeholder="请输入查询内容"></el-input>
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
        <el-table-column label="考核项目" prop="item" />
        <el-table-column label="考核内容" prop="center" />
        <el-table-column label="标准分" prop="fen" />
        <el-table-column label="评分标准" prop="s" />
        <el-table-column label="责任部门" prop="dept" />
        <el-table-column label="下发单位" prop="getdown" />
        <el-table-column label="操作">
          <template slot-scope="">
            <el-button size="mini" type="danger">编辑</el-button>
            <el-button size="mini" type="danger">下载</el-button>
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
        item: '一,组织机构和制度建设100分',
        center: '1.有健全的环保组织机构,',
        fen: 20,
        s: '查文件,未成立领导小组或',
        dept: '机电部',
        getdown: '生态环保部',

      }, {
        item: '一,组织机构和制度建设100分',
        center: '1.有健全的环保组织机构,',
        fen: 20,
        s: '查文件,未成立领导小组或',
        dept: '机电部',
        getdown: '生态环保部',

      }, {
        item: '一,组织机构和制度建设100分',
        center: '1.有健全的环保组织机构,',
        fen: 20,
        s: '查文件,未成立领导小组或',
        dept: '机电部',
        getdown: '生态环保部',

      }, {
        item: '一,组织机构和制度建设100分',
        center: '1.有健全的环保组织机构,',
        fen: 20,
        s: '查文件,未成立领导小组或',
        dept: '机电部',
        getdown: '生态环保部',

      }, {
        item: '一,组织机构和制度建设100分',
        center: '1.有健全的环保组织机构,',
        fen: 20,
        s: '查文件,未成立领导小组或',
        dept: '机电部',
        getdown: '生态环保部',

      }, {
        item: '一,组织机构和制度建设100分',
        center: '1.有健全的环保组织机构,',
        fen: 20,
        s: '查文件,未成立领导小组或',
        dept: '机电部',
        getdown: '生态环保部',

      }, {
        item: '一,组织机构和制度建设100分',
        center: '1.有健全的环保组织机构,',
        fen: 20,
        s: '查文件,未成立领导小组或',
        dept: '机电部',
        getdown: '生态环保部',

      }, {
        item: '一,组织机构和制度建设100分',
        center: '1.有健全的环保组织机构,',
        fen: 20,
        s: '查文件,未成立领导小组或',
        dept: '机电部',
        getdown: '生态环保部',

      }, {
        item: '一,组织机构和制度建设100分',
        center: '1.有健全的环保组织机构,',
        fen: 20,
        s: '查文件,未成立领导小组或',
        dept: '机电部',
        getdown: '生态环保部',

      }],
      choose: [], // 表格选中数据
      table_load: false,
      /* form */
      form: {}
    }
  }
}
</script>