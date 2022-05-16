<template>
  <el-card class="box-table">
    <div class="warning">事件警告列表</div>
    <el-table :data="events" height="300" border>
      <el-table-column prop="time" label="时间" width="200px">
      </el-table-column>
      <el-table-column prop="events" label="事件"> </el-table-column>
      <el-table-column prop="equip" label="设备"> </el-table-column>
      <el-table-column prop="state" label="状态"> </el-table-column>
    </el-table>
  </el-card>
</template>

<script>

import errlist from './error'

export default {
  name: 'eventsErrorList',
  props: {

  },
  data () {
    return {
      // 底部告警 表格
      events: errlist,
    }
  }
}
</script>