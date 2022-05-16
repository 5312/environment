<template>
  <el-container>
    <el-aside v-if="slider != 3">
      <el-tree
        ref="tree"
        class="calc_height"
        :data="department"
        node-key="id"
        highlight-current
        :props="defaultProps"
        default-expand-all
        :expand-on-click-node="false"
        :current-node-key="checkedKeys"
        @node-click="node"
        style="cursor: hand"
        empty-text="正在加载"
        element-loading-spinner="el-icon-loading"
        v-loading="!department.length"
      ></el-tree>
    </el-aside>
    <el-main>
      <!-- 顶部渐变卡 -->
      <ListShowCardVue :routeDept="departmentId" :level="level" />
      <!-- v-if departmentId watch 不到 -->
      <Level2
        v-show="level != 3"
        :departmentId="departmentId"
        :deptName="deptName"
      >
      </Level2>

      <Level3 v-if="level == 3">
        <el-row>
          <TreeListCard
            :departmentId="departmentId"
            :departmentList="department"
          />
        </el-row>
        <el-row>
          <Electricty
            :category_name="'电'"
            :connectiveTissue="1"
            :departmentId="departmentId"
          />
        </el-row>
        <el-row>
          <Electricty
            :category_name="'水'"
            :connectiveTissue="2"
            :departmentId="departmentId"
          />
        </el-row>
        <el-row>
          <Electricty
            :category_name="'气'"
            :connectiveTissue="3"
            :departmentId="departmentId"
          />
        </el-row>
        <el-row>
          <Electricty
            :category_name="'煤'"
            :connectiveTissue="4"
            :departmentId="departmentId"
          />
        </el-row>
        <el-row>
          <Electricty
            :category_name="'油'"
            :connectiveTissue="5"
            :departmentId="departmentId"
          />
        </el-row>
      </Level3>

      <!-- 底部表格 -->
      <!-- <el-row>
        <EventsErrorList />
      </el-row> -->
    </el-main>
  </el-container>
</template>
<script>
import { mapGetters } from "vuex"
import Level3 from "./comview/level3"
import Level2 from "./comview/level2"

// 底部表格
// import EventsErrorList from "./components/eventsErrorList"
// 渐变卡
import ListShowCardVue from "./components/listShowCard.vue"

import TreeListCard from "./components/treeListCard.vue"
// 电
import Electricty from "./components/electricity.vue"
// 工具
import unit from "@/utils/util"
/* api */
import { getUserDepList } from '@/api/mainLay/dept'


export default {
  components: { Level3, Level2, ListShowCardVue, TreeListCard, Electricty, /* EventsErrorList, */ },
  data () {
    return {
      // 部门id 本页全局 部门id 由 tree组件变更
      departmentId: null,
      deptName: null,
      department: [],
      defaultProps: {
        children: "children",
        label: "name"
      },
      checkedKeys: null,
    }
  },

  computed: {
    ...mapGetters(["permission", "user"]),

    level () {
      let index = this.checkedKeys
      let a = 1
      unit.eachTreeData(this.department, function (e) {
        if (e.id == index) {
          a = e.level
        }
      }, 'children')

      return a
    },
    slider () {
      let index = this.user.user.dept_id
      let lev = 1
      unit.eachTreeData(this.department, function (e) {
        if (e.id == index) {
          lev = e.level
        }
      }, 'children')
      return lev
    }
  },
  watch: {
    departmentId (v) {
      // 查看到 子组件的变更
      console.log('watch:departmentid', v)
    },
    checkedKeys (v) {
      let text = ''
      unit.eachTreeData(this.department, function (e) {
        if (e.id == v) {
          text = e.name
        }
      }, 'children')
      this.deptName = text
    }
  },
  created () {

    let n = this.$route.query.id || this.user.user.dept_id

    this.checkedKeys = Number(n)
    this.$nextTick(() => {
      this.$refs.tree.setCurrentKey(Number(n))
    })

    this.deptList().then(() => {
      /*  */
      let text = ''
      unit.eachTreeData(this.department, function (e) {
        if (e.id == Number(n)) {
          text = e.name
        }
      }, 'children')
      this.deptName = text
    })
  },
  mounted () {
    /* 挂载后 部门id */
    let n = this.$route.query.id || this.user.user.dept_id
    this.departmentId = Number(n)

  },
  methods: {
    // 获取部门
    async deptList () {
      this.tree = true
      let d = this.user.user.dept_id
      const deptArray_pid = await getUserDepList({
        dept_id: d
      })
      this.tree = false
      this.department = unit.toTreeData(deptArray_pid.data, "id", "pid", "children")

    },
    // 点击左侧矿业公司
    node (e) {
      this.departmentId = e.id
      /* 修改 */
      this.checkedKeys = Number(e.id)
      this.$nextTick(() => {
        this.$refs.tree.setCurrentKey(Number(e.id))
      })
    },
  }
};
</script>


<style lang="scss" scoped>
.el-container {
  .el-aside {
    margin: 10px;
    margin-right: 0;
    height: calc(100vh - 80px);
  }
  .el-main {
    padding: 10px;
    height: calc(100vh - 60px);
  }
}
</style>
