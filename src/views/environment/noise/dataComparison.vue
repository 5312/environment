<template>
  <div class="ele-body">
    <el-card>
      <ele-data-table
        ref="table"
        :data="table"
        :choose.sync="choose"
        height="calc(100vh - 300px)"
        highlight-current-row
        v-loading="table_load"
      >
        <el-table-column label="监测对象" prop="obj" />
        <el-table-column label="噪声(dB)" prop="db" />
        <el-table-column label="时间" prop="time" />
      </ele-data-table>
      <div class="flex levelType">
        <div>离线</div>
        <div>优</div>
        <div>良</div>
        <div>轻度</div>
        <div>中度</div>
        <div>重度</div>
      </div>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      table: [
        {
          obj: '八号路灯杆',
          db: '0',
          time: '2021-11-11 10:11:11'
        }
      ],
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

.levelType {
  div {
    padding: 10px 20px;
  }
}
</style>
