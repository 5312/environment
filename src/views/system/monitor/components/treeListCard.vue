<template>
  <el-card
    class="kuang"
    element-loading-spinner="el-icon-loading"
    element-loading-text="拼命加载中"
    v-loading="listNum"
  >
    <!-- <treeselect
      v-if="permission.includes('sys:xiala:view')"
      v-loading="load"
      class="depart"
      v-model="selectName"
      :options="depart"
      placeholder="请选择单位"
      :defaultExpandLevel="3"
      :normalizer="
        (d) => {
          return {
            id: d.id,
            label: d.name,
            children: d.children || undefined,
          };
        }
      "
    /> -->
    <el-row :gutter="5">
      <el-col :span="6">
        <div class="linetext">{{ vElsePermission }}</div>
      </el-col>
      <el-col :span="6">
        监测点：
        <span class="span">{{ jiance.counts1 }}</span> 个
      </el-col>
      <el-col :span="6">
        设备： <span class="span">{{ shebei.counts1 }}</span> 个
      </el-col>
      <el-col :span="6">
        离线设备数： <span class="span">{{ abnor.count1 }}</span
        >个
      </el-col>
    </el-row>
  </el-card>
</template>
<script>
import { mapGetters } from "vuex"
// 下拉树
// import Treeselect from "@riophae/vue-treeselect"
// import "@riophae/vue-treeselect/dist/vue-treeselect.css"

import util from "@/utils/util"

export default {
  name: "treeListCard",
  props: {
    departmentId: {
      type: Number
    },
    departmentList: Array
  },
  components: { /* Treeselect */ },
  data () {
    return {
      selectName: null,
      depart: [],
      jiance: { counts1: 0 },
      shebei: { counts1: 0 },
      abnor: { count1: 0 },
      /* load */
      load: false,
      // 监测点
      listNum: false
      /* load -end  */
    }
  },
  computed: {
    ...mapGetters(["permission", "user"]),
    vElsePermission () {
      if (this.departmentId) {
        return this.isDepartmentName(this.departmentId)
      } else {
        return ''
      }
    }
  },
  watch: {
    departmentId (v) {
      console.log('tree', v)
      this.surveymonit(v)
    },
    selectName (v) { /* 弃用 */
      // 部门用 v-model 在次监听 通过 selectNane
      // 切换时 父组件也切换
      this.$emit('update:departmentId', Number(v))
      // 这个数据 应该 跟着 选择走
      this.surveymonit(v)
    }
  },
  created () {
    this.surveymonit(this.departmentId)
    // 部门 不需要跳转参数
    // let params = this.user.user.dept_id
    // this.department(params)
  },
  methods: {
    // 部门列表
    async department (deptId) {
      // 所有数据加载完后- 加载默认 不会出现 unknowen
      const routerParams = this.$route.query.id
      this.selectName = routerParams || this.user.user.dept_id

      this.load = true
      const res = await this.$http.get("/dept/getUserDepList", {
        params: {
          dept_id: deptId
        }
      })
      this.load = false
      let data = res.data.data
      this.depart = util.toTreeData(data, "id", "pid", "children")

    },
    // 监测点：  设备：  离线设备数
    async surveymonit (deptId) {
      this.listNum = true
      const promise1 = this.$http.get("/Tongji/getCoutsSpot", {
        params: {
          dept_id: deptId
        }
      })
      const promise2 = this.$http.get("/Tongji/getCoutsShebi", {
        params: {
          dept_id: deptId
        }
      })
      const promise3 = this.$http.get("/Tongji/getCoutsErrShebei", {
        params: {
          dept_id: deptId
        }
      })

      Promise.all([promise1, promise2, promise3]).then((values) => {
        // console.log(values)
        this.jiance = values[0].data.data
        this.shebei = values[1].data.data
        this.abnor = values[2].data.data
        /* 加载完毕 */
        this.listNum = false
      })
    },
    // 矿名
    isDepartmentName (select_id) {
      let name = null
      if (this.departmentList.length <= 0) return ''
      if (this.departmentList.length > 0) {
        let children = this.departmentList
        util.eachTreeData(
          children,
          function (i) {
            if (Number(i.id) === Number(select_id)) {
              name = i.name
            }
          },
          "children"
        )
        return name
      }
    },
  }
};
</script>
<style lang="scss" scoped>
.kuang {
  margin-top: 15px;
  .linetext {
    font-size: 20px;
    padding-left: 10px;
  }
  .el-col {
    .span {
      font-size: 20px;
      color: #f00;
      font-weight: bold;
      margin-left: 10px;
    }
  }

  .depart {
    width: 26%;
    position: absolute;
    margin-top: -5px;
    z-index: 988;
  }
}
</style>