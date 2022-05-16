<template>
  <div class="container ele-body">
    <el-card class="contop">
      <div class="top">
        <el-button type="primary" plain>企业</el-button>
        <el-button type="primary" plain>用水分类</el-button>
      </div>
    </el-card>
    <el-row>
      <el-card class="tit">
        <div class="titop">
          <p>
            <el-select v-model="value" placeholder="请选择">
              <el-option
                v-for="(item, index) in pri"
                :key="index"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </p>
          <!-- <p>
            <el-dropdown>
              <el-button type="primary">
                全部<i class="el-icon-arrow-down el-icon--right"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item v-for="(item, index) in pri" :key="index">{{
                  item.name
                }}</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </p> -->
        </div>
        <el-col :span="4">
          <div class="titleft">
            <div class="peak">
              <p>用水峰值</p>
              <div class="today">
                <div class="tod">
                  <p class="day">今日</p>
                  <div class="toright">
                    <p>0&nbsp;m³</p>
                    <p>14:45</p>
                  </div>
                </div>
                <div class="tod">
                  <p class="day">昨日</p>
                  <div class="toright">
                    <p>0&nbsp;m³</p>
                    <p>23:45</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="peak">
              <p>用水峰值</p>
              <div class="today">
                <div class="tod">
                  <p class="day">今日</p>
                  <div class="toright">
                    <p>0&nbsp;m³</p>
                    <p>14:00</p>
                  </div>
                </div>
                <div class="tod">
                  <p class="day">昨日</p>
                  <div class="toright">
                    <p>0&nbsp;m³</p>
                    <p>23:00</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="20">
          <div class="titright">
            <p>功率曲线</p>
            <div class="quxian">
              <ele-chart :option="use_option" style="height: 400px" />
            </div>
          </div>
        </el-col>
      </el-card>
    </el-row>
    <el-card class="tread">
      <div class="water">
        <p>水能趋势</p>
        <ul>
          <li><el-button type="primary" plain>日</el-button></li>
          <li><el-button type="primary" plain>月</el-button></li>
          <li><el-button type="primary" plain>年</el-button></li>
        </ul>
      </div>
      <div class="energy">
        <ele-chart :option="use_option" style="height: 400px" />
      </div>
    </el-card>
    <el-card class="ranking">
      <div class="use">
        <p>用水排名</p>
        <ul>
          <li><el-button type="primary" plain>车间</el-button></li>
          <li><el-button type="primary" plain>回路</el-button></li>
        </ul>
      </div>
      <div class="rank">
        <ele-chart :option="use_option" style="height: 400px" />
      </div>
    </el-card>
  </div>
</template>
<script>
import EleChart from "@/components/EleChart"
export default {
  data () {
    return {
      pri: [],
      value: ""
    }
  },
  mounted () {
    this.kuang()
  },
  components: { EleChart },
  methods: {
    kuang () {
      this.$http.get("/dept/getDeptList").then((res) => {
        this.pri = res.data.data
        // console.log(this.pri);
      })
    },
  },
  computed: {
    use_option () {
      return {
        title: {
          subtext: "m³",
        },
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: ["水能"],
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        toolbox: {
          feature: {
            saveAsImage: {},
          },
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: [
            "00:00",
            "00:45",
            "01:30",
            "02:15",
            "03:00",
            "03:45",
            "04:30",
            "05:15",
            "06:00",
            "06:45",
            "07:30",
            "08:15",
            "09:00",
            "09:45",
            "10:30",
            "11:15",
            "12:00",
            "12:45",
            "13:30",
            "14:15",
            "15:00",
          ],
          axisLabel: {
            textStyle: {
              color: "#fff",
            },
          },
        },
        yAxis: {
          type: "value",
          axisLabel: {
            textStyle: {
              color: "#fff",
            },
          },
        },
        series: [
          {
            name: "水能",
            type: "line",
            stack: "总量",
            data: [
              32, 45, 234, 12, 433, 56, 112, 35, 536, 21, 344, 56, 324, 23, 45,
              65, 67, 123, 413, 221, 34,
            ],
          },
        ],
      }
    },
  },
};
</script>
<style scoped>
* {
  list-style: none;
}
.contop {
  width: 100%;
}
.top {
  width: 200px;
  display: flex;
  justify-content: space-between;
}
.top p {
  width: 80px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  border: 1px solid #ddd;
  border-radius: 5px;
}
.tit {
  width: 100%;
  margin-top: 15px;
  padding-bottom: 30px;
}
.tit .titop {
  width: 240px;
  display: flex;
  justify-content: space-between;
}
.tit .p {
  width: 30px;
  height: 40p;
  background-color: #33cc99;
}
.tit .p1 {
  width: 10px;
  height: 40p;
  background-color: #33cc99;
}
.inner {
  display: flex;
  justify-content: space-between;
}
.titleft {
  width: 100%;
}
.titleft .peak {
  margin-top: 10px;
}
.peak .today {
  margin-top: 10px;
}
.today .tod {
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}
.tod .day {
  width: 150px;
  height: 80px;
  text-align: center;
  line-height: 80px;
  background-color: #33cc99;
}
.tod .toright {
  width: 400px;
  height: 50px;
  padding-right: 20px;
  padding-top: 28px;
  text-align: right;
  border: 1px solid #ccc;
  border-left: none;
}
.titright {
  width: 99%;
  margin-top: 10px;
  margin-left: 15px;
}
.titright p {
  margin-bottom: 10px;
}
.titright .quxian {
  width: 100%;
  height: 378px;
}
.tread {
  width: 100%;
  margin-top: 15px;
}
.tread .water {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.tread p {
  margin-top: 10px;
}
.tread ul {
  width: 200px;
  display: flex;
  justify-content: space-between;
}
.tread .energy {
  width: 100%;
  height: 400px;
  margin-top: 20px;
}
.ranking {
  width: 100%;
}
.ranking .use {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.ranking p {
  margin-top: 10px;
}
.ranking ul {
  width: 150px;
  display: flex;
  justify-content: space-between;
}
.ranking .rank {
  width: 100%;
  margin-top: 20px;
}
</style>