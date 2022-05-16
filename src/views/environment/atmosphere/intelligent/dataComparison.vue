<template>
  <div class="ele-body">
    <el-card>
      <div slot="header" class="title">
        <span>多测点PM10小时曲线对比</span>
      </div>
      <ele-data-table
        ref="table"
        :data="table"
        :choose.sync="choose"
        height="calc(100vh - 340px)"
        highlight-current-row
        v-loading="table_load"
      >
        <el-table-column label="监测对象" prop="name" />
        <el-table-column label="PM10" prop="name" />
        <el-table-column label="时间" prop="name" />
      </ele-data-table>
    </el-card>
  </div>
</template>
<script>
export default {
  data () {
    return {
      table: [],
      choose: [],
      table_load: false
    }
  }

}
</script>
<style lang="scss" scoped>
$text-color: #07d3dd;
.el-card {
  height: calc(100% / 3);
  .title {
    padding: 30px;
    font-size: 18px;
    text-align: center;
    color: $text-color;
  }
}
</style>