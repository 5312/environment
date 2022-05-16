<template>
  <div class="el-main">
    <el-row :gutter="20">
      <el-col :span="5">
        <el-card class="box-tree">
          <div class="top">组织机构</div>
          <el-tree
            v-loading="!department.length"
            class="calc_height"
            :data="department"
            node-key="id"
            highlight-current
            :props="defaultProps"
            default-expand-all
            :current-node-key="checkedKeys"
            @node-click="node"
            style="cursor: hand"
          ></el-tree>
        </el-card>
      </el-col>
      <!-- 右 -->
      <el-col :span="19" class="wrap">
        <el-row :gutter="20">
          <el-col :span="24">
            <el-tabs v-model="activeName" type="border-card" @tab-click="tab">
              <el-tab-pane
                v-for="(item, index) in arr1"
                :key="index"
                :label="item.hclass_name"
                :name="String(item.id)"
                v-loading="tabs_card"
              >
                <div class="funct">
                  <div class="current">
                    <p>
                      矿场名称：
                      <span class="span">{{ name }}</span>
                    </p>
                    <p>数据更新时间：{{ nowDate | dateFormatter }}</p>
                  </div>
                  <div class="elect">
                    <ul class="flex ele-clear ele-clear-after">
                      <li
                        v-for="(item, index) in element"
                        :key="index"
                        :name="String(item.id)"
                      >
                        <div
                          class="ele"
                          :style="{ background: item.hgrain_color }"
                        >
                          {{ item.hgrain_name }}
                          <p>{{ item.hgrain_en }}</p>
                        </div>
                        <div class="volt">
                          <p>
                            当前值：{{ item.hgrain_new }}&nbsp;&nbsp;{{
                              item.hgrain_new != "-" ? item.hgrain_dw : null
                            }}
                          </p>
                          <p>
                            最高值：{{ item.hgrain_max }}&nbsp;&nbsp;{{
                              item.hgrain_max != "-" ? item.hgrain_dw : null
                            }}
                          </p>
                          <p>
                            最低值：{{ item.hgrain_min }}&nbsp;&nbsp;{{
                              item.hgrain_min != "-" ? item.hgrain_dw : null
                            }}
                          </p>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </el-tab-pane>
            </el-tabs>
          </el-col>
          <el-col :span="24">
            <EchartsList
              :element="element"
              :huanjing="Number(activeName)"
              :dept="dept"
            />
          </el-col>
        </el-row>
      </el-col>
      <!-- </div> -->
    </el-row>
  </div>
</template>
<script>

// 组件
import EchartsList from "./components/echartsList.vue"
// 工具
import unit from "../../../../src/utils/util"
import { mapGetters } from "vuex"
// 请求
import { getHclassData } from '@/api/mainLay/Hjing'
export default {
  components: { EchartsList },

  data () {
    return {
      // 部门
      dept: null,
      activeName: "",
      department: [],
      defaultProps: {
        children: "children",
        label: "name"
      },
      checkedKeys: [],
      tabList: [],
      nowDate: new Date(),
      element: [],
      name: "",
      // 树加载
      tree: true,
      tabs_card: true,
      // 定时器
      timer: null
    }
  },
  //过滤器
  filters: {
    dateFormatter (v) {
      return unit.toDateString(v, 'yyyy/MM/dd HH:mm:ss')
    }
  },
  created () {
    this.dept = Number(this.$route.query.id) || this.user.user.dept_id
    this.name = this.$route.query.name || this.user.user.dept_name
    // 树默认选中
    let defa = Number(this.$route.query.id) || this.user.user.dept_id
    this.checkedKeys = defa

    this.init()
    this.deptList()

  },
  mounted () {
    // 实时时间
    let _this = this
    this.timer = setInterval(function () {
      _this.nowDate = new Date()
    }, 500)
  },
  beforeDestroy () {
    if (this.timer) {
      clearInterval(this.timer) // 在Vue实例销毁前，清除时间定时器
      this.timer = null
    }
  },
  computed: {
    ...mapGetters(["user"]),
    /* 右侧面板tab */
    arr1: function () {
      return this.sortKey(this.tabList, "id")
    },
  },
  methods: {
    async init () {
      let that = this
      this.getTab().then(() => {
        that.eleTablePenalCard()
      })
    },
    // 环境列表
    async getTab () {
      const res = await this.$http.get("/hclass/index")
      this.tabList = res.data.data
      this.activeName = String(res.data.data[0].id)
    },
    // 获取面板 元素内容
    async eleTablePenalCard () {
      this.tabs_card = true
      // 面板元素 内容
      const res = await getHclassData({
        dept_id: String(this.dept),         // 单位ID
        hclass_id: String(this.activeName) // 环境类别
      })
      this.tabs_card = false
      this.element = res.data
    },
    // 点击tab导航栏
    tab () {
      this.eleTablePenalCard()
    },
    // 点击左侧矿业公司
    node (e) {
      this.dept = e.id
      if (e.level == 3) {
        this.tabs_card = true
        // 面板元素 内容
        this.eleTablePenalCard()
        // 显示矿名
        this.name = e.name
      } else {
        return
      }
    },
    /* 排序 */
    sortKey (array, key) {
      return array.sort(function (a, b) {
        var x = a[key]
        var y = b[key]
        return y < x ? 1 : x > y ? -1 : 0 //从小到大排序
      })
    },
    // 获取部门
    async deptList () {
      this.tree = true
      let d = this.user.user.dept_id
      const res = await this.$http.get("/dept/getUserDepList", {
        params: {
          dept_id: d
        }
      })
      this.tree = false
      this.department = unit.toTreeData(res.data.data, "id", "pid", "children")
    },


  },

}

</script>
<style lang="scss" scoped>
$header: 100px;
.calc_height {
  height: calc(100vh - #{$header} - 61px);
  overflow-x: auto;
}
.wrap {
  height: calc(100vh - #{$header});
  overflow-x: auto;
}

* {
  list-style: none;
}
.top {
  height: 30px;
  border-bottom: 1px solid #ddd;
  font-weight: bold;
}
.box-tabs {
  width: 95%;
  margin-left: 55px;
}
.funct {
  width: 97%;
  margin-top: 5px;
  padding-left: 20px;
  padding-right: 20px;
}
.funct .current {
  display: flex;
  justify-content: space-between;
}
.flex {
  display: flex;
  flex-wrap: wrap;
  align-content: space-between;
  justify-content: flex-end;
  align-items: center;
  flex-direction: row-reverse;
  li {
    width: 27%;
    // float: left;
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
    margin-right: 60px;
  }
}

.funct .ele {
  width: 35%;
  height: 80px;
  padding-top: 5px;
  padding-left: 5px;
  font-size: 12px;
}
.ele p {
  font-size: 30px;
  font-weight: bold;
  text-align: center;
  line-height: 50px;
}
.funct .volt {
  width: 75%;
  height: 85px;
  background-color: rgba(0, 0, 0, 0.1);
}
.volt p {
  margin-left: 20px;
  margin-top: 6px;
}

.span {
  font-weight: bold;
}
</style>
