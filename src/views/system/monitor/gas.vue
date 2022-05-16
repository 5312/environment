<template>
  <div class="container ele-body">
    <el-card class="name">
      <el-tree
        :data="data"
        show-checkbox
        node-key="id"
        :default-expanded-keys="[]"
        :default-checked-keys="[]"
        :props="defaultProps"
      >
      </el-tree>
    </el-card>
    <el-card class="enter">
      <div class="top">
        <div class="img">
          <img src="../../../assets/avatar.png" alt="加载出错了" />
        </div>
        <div class="tab">
          <p>南昌有色金属有限公司</p>
          <table border="1" height="100" rules="rows">
            <tr>
              <td>地址：</td>
              <td>江西南昌市西湖区八一路6号</td>
              <td>监测点：</td>
              <td>1</td>
            </tr>
            <tr>
              <td>企业负责人：</td>
              <td></td>
              <td>产污监测点：</td>
              <td>0</td>
            </tr>
            <tr>
              <td>所属行业：</td>
              <td>铸造</td>
              <td>污处监测点：</td>
              <td>1</td>
            </tr>
          </table>
        </div>
      </div>
      <div class="btn">
        <el-button type="primary" plain>监制点信息</el-button>
        <el-button type="primary" plain>排口信息</el-button>
      </div>
      <div class="table">
        <el-table :data="monitor" height="200" border style="width: 100%">
          <el-table-column prop="num" label="" width="100"> </el-table-column>
          <el-table-column prop="monit" label="监测点名称" width="189">
          </el-table-column>
          <el-table-column prop="category" label="类别" width="160">
          </el-table-column>
          <el-table-column prop="state" label="状态" width="160">
          </el-table-column>
          <el-table-column prop="ct" label="CT" width="160"> </el-table-column>
          <el-table-column prop="thre" label="功率启停阈值" width="160">
          </el-table-column>
          <el-table-column prop="shold" label="功率门限时间" width="160">
          </el-table-column>
          <el-table-column prop="rated" label="额定功率" width="160">
          </el-table-column>
        </el-table>
      </div>
      <div class="paging">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="10"
          layout="total, sizes, prev, pager, next, jumper"
          :total="1"
        >
        </el-pagination>
      </div>
    </el-card>
    <el-card class="pic">
      <div class="top">
        <div class="btn">
          <el-button type="primary" plain>实时数据</el-button>
        </div>
        <div class="date">
          <el-time-picker
            v-model="value"
            :picker-options="{
              selectableRange: '00:00:00 - 23:59:59',
            }"
            placeholder="时间间隔（分）"
            class="clock"
          >
          </el-time-picker>
          <el-date-picker v-model="value1" type="date" placeholder="选择日期">
          </el-date-picker>
        </div>
      </div>
      <div class="chart"></div>
    </el-card>
  </div>
</template>
<script>
export default {
  data () {
    return {
      data: [
        {
          id: 1,
          label: "南昌有色金属有限公司",
          children: [
            {
              id: 4,
              label: "一车间",
              children: [
                {
                  id: 9,
                  label: "治污监测点",
                  children: [
                    {
                      id: 10,
                      label: "一车间废气排风机",
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          id: 2,
          label: "渭南市中心医院",
          children: [
            {
              id: 5,
              label: "外科",
              children: [
                {
                  id: 11,
                  label: "骨科（一）",
                  children: [
                    {
                      id: 15,
                      label: "腿骨",
                    },
                    {
                      id: 16,
                      label: "脚趾骨",
                    },
                  ],
                },
                {
                  id: 12,
                  label: "骨科（二）",
                  children: [
                    {
                      id: 17,
                      label: "臂骨",
                    },
                    {
                      id: 18,
                      label: "手骨",
                    },
                  ],
                },
                {
                  id: 13,
                  label: "耳鼻喉科（一）",
                  children: [
                    {
                      id: 19,
                      label: "耳朵",
                    },
                    {
                      id: 20,
                      label: "鼻子",
                    },
                    {
                      id: 23,
                      label: "喉咙",
                    },
                  ],
                },
                {
                  id: 14,
                  label: "耳鼻喉科（二）",
                  children: [
                    {
                      id: 21,
                      label: "耳朵内",
                    },
                    {
                      id: 22,
                      label: "鼻孔内",
                    },
                    {
                      id: 24,
                      label: "喉咙内",
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
      defaultProps: {
        children: "children",
        label: "label",
      },
      monitor: [
        {
          num: 1,
          monit: "一车间废气排风机",
          category: "治污",
          state: "失联",
          ct: 1,
          thre: 10,
          shold: 10,
          rated: 0,
        },
      ],
      value: new Date(),
      pickerOptions: {
        disabledDate (time) {
          return time.getTime() > Date.now()
        },
        shortcuts: [
          {
            text: "今天",
            onClick (picker) {
              picker.$emit("pick", new Date())
            },
          },
          {
            text: "昨天",
            onClick (picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24)
              picker.$emit("pick", date)
            },
          },
          {
            text: "一周前",
            onClick (picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit("pick", date)
            },
          },
        ],
      },
      value1: "",
    }
  },
};
</script>
<style scoped>
.name {
  width: 20%;
  height: 850px;
  float: left;
}
.enter {
  width: 79%;
  float: left;
  margin-left: 15px;
  position: relative;
  bottom: 15px;
}
.enter .top {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.enter img {
  width: 150px;
  height: 150px;
}
.tab {
  width: 85%;
  margin-top: 15px;
}
.tab table {
  width: 100%;
  height: 100px;
}
.pic {
  width: 79%;
  float: left;
  margin-left: 15px;
  position: relative;
  bottom: 15px;
}
.pic .top {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.clock {
  margin-right: 10px;
}
.chart {
  width: 100%;
  height: 317px;
}
</style>