<template>
  <div class="ele-body">
    <el-card>
      <el-form ref="form" :model="form" :inline="true" label-width="80px">
        <el-form-item>
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
        <el-table-column label="序号" type="index"> </el-table-column>
        <el-table-column label="摄像头名称" prop="name" />
        <el-table-column label="ip" prop="ip" />
        <el-table-column label="端口" prop="port" />
        <el-table-column label="登录名" prop="loginname" />
        <el-table-column label="密码" prop="password" />
        <el-table-column label="通道" prop="pass" />
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
      tables: [{
        name: '洗车装置',
        ip: '192.168.30.2',
        port: '8000',
        loginname: 'admin',
        password: 'admin',
        pass: '1',
      }, {
        name: '洗车装置',
        ip: '192.168.30.2',
        port: '8000',
        loginname: 'admin',
        password: 'admin',
        pass: '1',
      }, {
        name: '洗车装置',
        ip: '192.168.30.2',
        port: '8000',
        loginname: 'admin',
        password: 'admin',
        pass: '1',
      }],
      choose: [], // 表格选中数据
      table_load: false,
      /* form */
      form: {}
    }
  }
}
</script>