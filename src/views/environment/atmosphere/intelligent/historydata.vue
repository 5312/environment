<template>
  <div class="ele-body">
    <el-card>
      <el-form ref="form" :model="form" :inline="true" label-width="80px">
        <el-form-item label="开始时间">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="form.date1"
            style="width: 100%"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="form.date1"
            style="width: 100%"
          ></el-date-picker>
        </el-form-item>
        <el-form-item> <el-button type="primary">查询</el-button></el-form-item>
        <el-form-item>
          <el-button type="primary">实时数据</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">小时数据</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">日均值</el-button>
        </el-form-item>
        <el-form-item> <el-button type="primary">导出</el-button></el-form-item>
      </el-form>
      <el-row :gutter="20">
        <el-col :span="6">
          <el-input placeholder="输入关键字进行过滤" v-model="filterText">
          </el-input>
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
            <el-table-column label="点位名称" prop="name" />
            <el-table-column label="PM10" prop="pm10" />
            <el-table-column label="PM2.5" prop="pm2" />
            <el-table-column label="温度" prop="wendu" />
            <el-table-column label="湿度" prop="shidu" />
            <el-table-column label="风速" prop="fengsu" />
            <el-table-column label="风向" prop="fengxiang" />
            <el-table-column label="时间" prop="time" />
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
        name: '地销仓库车辆出口',
        pm10: '57.32',
        pm2: '23.40',
        wendu: '-2.31',
        shidu: '67.09',
        fengsu: '0.80',
        fengxiang: "0.0",
        time: '2021-11-11'
      }, {
        name: '地销仓库车辆出口',
        pm10: '57.32',
        pm2: '23.40',
        wendu: '-2.31',
        shidu: '67.09',
        fengsu: '0.80',
        fengxiang: "0.0",
        time: '2021-11-11'
      }, {
        name: '地销仓库车辆出口',
        pm10: '57.32',
        pm2: '23.40',
        wendu: '-2.31',
        shidu: '67.09',
        fengsu: '0.80',
        fengxiang: "0.0",
        time: '2021-11-11'
      }],
      choose: [],
      table_load: false,
      /* tree */
      data: [{
        label: '全部监测点位名称',
        children: [
          {
            label: '地销仓库车辆出口'
          },
          {
            label: '洗煤厂办公楼'
          }
        ]
      }],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      filterText: '',
    }
  }
}
</script>