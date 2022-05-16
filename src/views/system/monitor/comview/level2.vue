<template>
  <div class="margin-top">
    <el-card>
      <div slot="header">
        <div class="left">{{ deptName }}</div>
        <div class="flex flex_h_between btnwrap">
          <el-button
            :type="connectiveTissue == 1 ? 'primary' : ''"
            :class="[{ dian: connectiveTissue == 1 }]"
            @click="connectiveTissue = 1"
            size="small"
            >电
          </el-button>
          <el-button
            :type="connectiveTissue == 2 ? 'primary' : ''"
            :class="[{ shui: connectiveTissue == 2 }]"
            @click="connectiveTissue = 2"
            size="small"
            >水
          </el-button>
          <el-button
            :type="connectiveTissue == 3 ? 'primary' : ''"
            :class="[{ qi: connectiveTissue == 3 }]"
            @click="connectiveTissue = 3"
            size="small"
            >气
          </el-button>
          <el-button
            :type="connectiveTissue == 4 ? 'primary' : ''"
            :class="[{ mei: connectiveTissue == 4 }]"
            @click="connectiveTissue = 4"
            size="small"
            >煤
          </el-button>
          <el-button
            :type="connectiveTissue == 5 ? 'primary' : ''"
            :class="[{ you: connectiveTissue == 5 }]"
            @click="connectiveTissue = 5"
            size="small"
            >油
          </el-button>
        </div>
      </div>
      <el-row>
        <el-col :span="24">
          <ele-chart
            ref="chart"
            :option="options"
            style="height: calc(100vh - 285px)"
          />
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>
<script>

import EleChart from "@/components/EleChart"

import util from "@/utils/util"
/* api */
import { getUserDepList } from '@/api/mainLay/dept'
import { getCoutsDept } from '@/api/mainLay/energyzong'
export default {
  name: 'level2',
  props: {
    departmentId: Number,
    deptName: String
  },
  data () {
    return {
      connectiveTissue: 1,
      chartsData: null,
      urlType: 0,

      /* charts scoure */
      chartsScoure: []
    }
  },
  watch: {
    /* 左侧 选中的tree 父级传递的id */
    departmentId () {
      /* 获取当前 局 下级矿  */
      this.deptList()

      this.coutsDept()
    },
    connectiveTissue () {
      this.coutsDept()
    },

  },
  components: { EleChart },
  computed: {
    options () {
      let array = this.chartsScoure
      /* 维度 */
      let legend = ['电', '水', '气', '煤', '油']
      let dimensions = ['x', legend[this.connectiveTissue - 1]]

      let color = ''
      switch (legend[this.connectiveTissue - 1]) {
        case '电':
          color = '#FFDF25'
          break
        case '水':
          color = '#36A9CE'
          break
        case '气':
          color = '#D0E17D'
          break
        case '煤':
          color = '#FCD8E8'
          break
        case '油':
          color = '#F2637B'
          break
      }
      return {
        title: {
          // text: '陕西煤业',
          subtext: ['kW·h', 't', 'm³', 't', 'L'][this.connectiveTissue - 1],
          textStyle: {
            color: '#fff'
          }
        },
        color: [color],
        grid: {
          left: '10%',
          bottom: '10%'
        },
        legend: {},
        tooltip: {},
        dataset: [
          {
            dimensions: dimensions,
            source: array,
            /* 
            ['1时',1,2,3,4,5],
            []
            */
            /* 
            {'1时','电':1,'水',2},
            {'2时','电':2,'水',3}
            */
          }
        ],
        xAxis: {
          type: 'category',
          axisTick: { show: false },
          //修改坐标系字体颜色
          axisLabel: {
            interval: 0,
            rotate: 45,
            show: true,
            color: "#fff",
          },
        },
        yAxis: {
          axisLabel: {
            show: true,
            color: "#fff",
          },
        },
        series: [
          {
            type: 'bar',
            itemStyle: {
              color: function (params) {
                let color = ''
                switch (params.seriesName) {
                  case '电':
                    color = '#FFDF25'
                    break
                  case '水':
                    color = '#36A9CE'
                    break
                  case '气':
                    color = '#D0E17D'
                    break
                  case '煤':
                    color = '#FCD8E8'
                    break
                  case '油':
                    color = '#F2637B'
                    break
                }
                return color

              }
            },
            label: {
              show: true,
              position: 'top',
            },
          },
        ]
      }
    }
  },

  methods: {
    /* 当天各类能源 趋势 */
    // 获取部门
    async deptList () {
      this.selectName = null
      this.tree = true
      let current = this.departmentId
      const deptArray_pid = await getUserDepList({
        dept_id: current
      })
      this.tree = false
      /* 过滤第一级 */
      let filterFirstLevel = deptArray_pid.data.filter(d => {
        if (d.id != Number(current)) {
          return d
        }
      })
      this.tree_depart = util.toTreeData(filterFirstLevel, "id", "pid", "children")
    },
    /* 获取矿统计 */
    async coutsDept () {
      let myChart = this.$refs.chart.chart
      myChart.showLoading()
      /* 矿能耗趋势 */
      const k_aungdata = await getCoutsDept({
        level: 3,
        dept_id: this.departmentId
      })
      myChart.hideLoading()
      if (k_aungdata.code == 0) {
        this.dataToDimensions([k_aungdata.data])
      }
    },
    /* func 把请求结果处理成维度数据 */
    dataToDimensions (options) {
      const [elec/* , watter, gas, mine, oil */] = options
      /* 格式相同 */
      /* 创建 容器 */
      let ArrayObject = []
      let reuqestData = elec
      for (let index = 0; index < reuqestData.length; index++) {
        const element = reuqestData[index]

        const Object = {
          x: element.deptname,
          '电': element.dian,
          '水': element.shui,
          '气': element.qi,
          '煤': element.mei,
          '油': element.you
        }
        ArrayObject.push(Object)
      }
      this.chartsScoure = ArrayObject
    }
  }
}
</script>
<style lang="scss" scoped>
.margin-top {
  margin-top: 15px;
  .left {
    float: left;
    width: 200px;
  }
  .btnwrap {
    flex-direction: row;
    flex-wrap: nowrap;
    align-content: center;
    justify-content: flex-end;
    align-items: center;
  }
}
.typeselect_btn {
  display: flex;
  align-items: center;
  flex-direction: column;
  & > button {
    margin: 10px 0;
  }
}
.dian {
  background: #ffdf25;
  border-color: #ffdf25;
}
.shui {
  background: #36a9ce;
  border-color: #36a9ce;
}
.qi {
  background: #d0e17d;
  border-color: #d0e17d;
}
.mei {
  background: #fcd8e8;
  border-color: #fcd8e8;
}
.you {
  background: #f2637b;
  border-color: #f2637b;
}
</style>