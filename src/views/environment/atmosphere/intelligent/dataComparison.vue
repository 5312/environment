<template>
  <div class="ele-body">
    <el-card>
      <ele-data-table
        ref="table"
        :data="table"
        :choose.sync="choose"
        height="calc(100vh - 210px)"
        highlight-current-row
        v-loading="table_load"
      >
        <el-table-column type="index" width="50"> </el-table-column>
        <el-table-column label="监测对象" prop="obj" />
        <el-table-column label="PM10" prop="pm10">
          <template slot-scope="scope">
            <div style="background: #84ef36; text-align: center">
              {{ scope.row.pm10 }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="时间" prop="time" />
      </ele-data-table>
    </el-card>
  </div>
</template>
<script>
export default {
  data () {
    return {
      table: [{
        obj: '十二号路灯杆',
        pm10: '8'
        , time: '2021-11-22'
      },
      {
        obj: '十二号路灯杆',
        pm10: '8'
        , time: '2021-11-22'
      }],
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