<template>
  <div class="ele-body">
    <el-card shadow="never">
      <div class="ele-table-tool ele-table-tool-default">
        <el-button
          @click="showEdit = true"
          type="primary"
          icon="el-icon-plus"
          class="ele-btn-icon"
          size="small"
          >添加
        </el-button>
      </div>
      <!-- 数据表格 -->
      <ele-data-table
        ref="table"
        :config="table"
        :choose.sync="choose"
        height="calc(100vh - 315px)"
      >
        <template slot-scope="{ index }">
          <el-table-column
            type="selection"
            width="45"
            align="center"
            fixed="left"
          />
          <el-table-column
            width="105"
            align="center"
            prop="name"
            label="姓名"
          />
          <el-table-column
            label="操作"
            width="130px"
            align="center"
            :resizable="false"
            fixed="right"
          >
            <template slot-scope="{ row }">
              <el-button
                type="primary"
                icon="el-icon-edit"
                @click="openEdit(row)"
              >
                修改
              </el-button>
            </template>
          </el-table-column>
        </template>
      </ele-data-table>
    </el-card>
    <edit :data="current" :visible.sync="showEdit" @done="reload"></edit>
  </div>
</template>
<script>
import edit from "./edit";

export default {
  name: "basis",
  components: {
    edit,
  },
  data() {
    return {
      table: {
        url: "/basic/Items/GetList",
        where: {},
        parseData: (res) => {
          return {
            code: res.code,
            data: res.data.items,
            msg: "",
          };
        },
      },
      choose: [],
      /* edit */
      showEdit: false,
      // 当前编辑数据
      current: null,
    };
  },
  methods: {
    reload() {
      this.$refs.table.reload({ where: this.where });
    },
    /* 显示编辑 */
    openEdit(row) {
      this.current = row;
      this.showEdit = true;
    },
  },
};
</script>
<style>
.eleprotable {
  width: 100%;
}
</style>
