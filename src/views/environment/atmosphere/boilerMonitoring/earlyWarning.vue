<template>
  <div class="ele-body">
    <el-card>
      <ele-data-table
        ref="table"
        :data="tables"
        :choose.sync="choose"
        height="calc(100vh - 230px)"
        highlight-current-row
        v-loading="table_load"
      >
        <!-- <el-table-column
          type="selection"
          width="45"
          align="center"
          fixed="left"
        /> -->
        <el-table-column label="监测指标" prop="zhi" />
        <el-table-column label="预警开始时间" prop="star" />
        <el-table-column label="预警结束时间" prop="end" />
        <el-table-column label="预警数值" prop="shu" />
        <el-table-column label="阈值" prop="yu" />
      </ele-data-table>
    </el-card>
  </div>
</template>
<script>
export default {
  data () {
    return {
      tables: [{
        zhi: '烟尘折算',
        star: '2021-11-11',
        end: '2021-11-11',
        shu: "29301.26548",
        yu: '10000'
      }, {
        zhi: '烟尘折算',
        star: '2021-11-11',
        end: '2021-11-11',
        shu: "29301.26548",
        yu: '10000'
      }, {
        zhi: '烟尘折算',
        star: '2021-11-11',
        end: '2021-11-11',
        shu: "29301.26548",
        yu: '10000'
      }, {
        zhi: '烟尘折算',
        star: '2021-11-11',
        end: '2021-11-11',
        shu: "29301.26548",
        yu: '10000'
      }],
      choose: [], // 表格选中数据
      table_load: false,
    }
  }
}
</script>