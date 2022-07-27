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
          <el-input v-model="form.name" placeholder="请输入标题"></el-input>
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
        <el-table-column label="标题" prop="name" />
        <el-table-column label="评价开始时间" prop="star" />
        <el-table-column label="评价结束时间" prop="end" />
        <el-table-column label="创建人" prop="create" />
        <el-table-column label="创建时间" prop="createtime" />
        <el-table-column label="评价进度" prop="eva" />
        <el-table-column label="操作">
          <template slot-scope="">
            <el-button size="mini" type="danger">查看</el-button>
          </template>
        </el-table-column>
      </ele-data-table>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tables: [
        {
          name: "111",
          star: "2021",
          end: "2021",
          create: "admin",
          createtime: "2021",
          eva: "进行中",
        },
      ],
      choose: [], // 表格选中数据
      table_load: false,
      /* form */
      form: {},
    };
  },
};
</script>
