<template>
  <div class="ele-body">
    <el-card>
      <ele-data-table
        ref="table"
        :data="table"
        :choose.sync="choose"
        height="calc(100vh - 230px)"
        highlight-current-row
        v-loading="load"
      >
        <el-table-column label="参数设定" prop="name" align="center" />
        <el-table-column label="高位报警值(m)" prop="hieght" align="center" />
        <el-table-column label="高位报警回差值(m)" prop="back" align="center" />
        <el-table-column label="启泵高度值(m)" prop="qi" align="center" />
        <el-table-column label="停泵高度值(m)" prop="stop" align="center" />
      </ele-data-table>
    </el-card>
  </div>
</template>
<script>
export default {
  data () {
    return {
      load: false,
      choose: [], // 表格选中数据
      table: [
        { name: 'JMY1污泥界面仪', hieght: '1.5(m)', back: '0.1(m)', qi: '2.00(m)', stop: '1.10(m)' },
        { name: 'JMY2污泥界面仪', hieght: '1.5(m)', back: '0.1(m)', qi: '2.00(m)', stop: '1.10(m)' },
        { name: 'JMY3污泥界面仪', hieght: '1.5(m)', back: '0.1(m)', qi: '2.00(m)', stop: '1.10(m)' },
        { name: '调节水池液位仪', hieght: '4.3(m)', back: '0.9(m)', qi: '0.80(m)', stop: '0.00(m)' },
      ]
    }
  }
}
</script>
<style lang="scss" scoped>
</style>