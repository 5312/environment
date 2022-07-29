<template>
  <div class="ele-body">
    <el-card shadow="never">
      <!-- 数据表格 -->
      <ele-data-table
        ref="table"
        :config="table"
        :choose.sync="choose"
        height="calc(100vh - 315px)"
        highlight-current-row
      >
        <template slot-scope="{ index }">
          <el-table-column
            type="selection"
            width="45"
            align="center"
            fixed="left"
          />
          <el-table-column
            v-for="(item, y) in columns"
            :key="y"
            type="index"
            :index="index"
            :label="item.label"
            :prop="item.prop"
            :width="item.width"
            show-overflow-tooltip
          ></el-table-column>
          <!-- <el-table-column
            type="index"
            :index="index"
            label="编号"
            width="60"
            align="center"
            fixed="left"
            show-overflow-tooltip
          /> -->
        </template>
      </ele-data-table>
    </el-card>
  </div>
</template>
<script>
import { columns } from "./columns";
export default {
  name: "basis",
  data() {
    return {
      table: {
        url: "/basic/Items/GetList",
        where: {},
        parseData: (res) => {
          console.log(res);
          return {
            code: res.code,
            data: res.data.items,
            msg: "",
          };
        },
      },
      columns: columns,
      choose: [],
    };
  },
  methods: {},
};
</script>
<style>
.eleprotable {
  width: 100%;
}
</style>
