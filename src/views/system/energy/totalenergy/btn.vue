<template>
  <div class="topbar">
    <el-button :type="primary(0)" @click="timeTypeChange(0)" size="small">
      概览
    </el-button>
    <el-button :type="primary(1)" @click="timeTypeChange(1)" size="small">
      按日
    </el-button>
    <el-button :type="primary(2)" @click="timeTypeChange(2)" size="small">
      按月
    </el-button>
    <el-button :type="primary(3)" @click="timeTypeChange(3)" size="small">
      按年
    </el-button>
    <div class="sel selbtn" v-show="index != 0">
      <div class="clas t2">日期:</div>
      <el-date-picker
        v-model="dateValue"
        :type="dateType"
        @change="change"
        :value-format="valueFormat"
        placeholder="选择日期"
      >
      </el-date-picker>
    </div>
    <el-button-group class="flex" style="margin-left: 10px">
      <!-- convert = 0 -->
      <el-button
        :type="energyTypeChange(0)"
        @click="$emit('update:convert', 0)"
        size="small"
      >
        用量
      </el-button>
      <!-- convert = 1 -->
      <el-button
        :type="energyTypeChange(1)"
        @click="$emit('update:convert', 1)"
        size="small"
      >
        费用
      </el-button>
    </el-button-group>

    <treeselect
      v-if="permission.includes('sys:xiala:view')"
      class="depart"
      v-model="selectDept"
      :options="department"
      placeholder="请选择"
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
    />
  </div>
</template>
<script>
import Treeselect from "@riophae/vue-treeselect" // 下拉树
import "@riophae/vue-treeselect/dist/vue-treeselect.css"
// tool
import util from "@/utils/util"
// vuex
import { mapGetters } from "vuex"
// api
import { getUserDepList } from '@/api/mainLay/dept'

export default {
  name: 'Btn',
  model: {
    prop: 'index',
    event: 'changeIndex'
  },
  props: {
    index: Number,
    convert: Number,
    departmentId: Number,
    dates: String
  },
  components: { Treeselect },
  data () {
    return {
      dateValue: new Date(),
      vformat: "yyyy-MM-dd",
      /*  */
      department: [],
      selectDept: null,
    }
  },
  watch: {
    selectDept (v) {
      /* 修改部门 */
      this.$emit('update:departmentId', v)
    },
    index () {
      this.dateValue = null
      this.dateValue = new Date()
    }

  },
  created () {
    this.treeSelectData()
    this.$nextTick(() => {
      this.selectDept = this.user.user.dept_id
    })
  },
  computed: {
    ...mapGetters(["permission", "user"]),
    dateType: {
      get: function () {
        let t = ['', 'date', 'month', 'year'][this.index]
        return t
      },
      set: function () { }
    },
    valueFormat () {
      return ['', 'yyyy-MM-dd', 'yyyy-MM', 'yyyy'][this.index]
    }
  },
  methods: {
    async treeSelectData () {
      let loginDept = this.user.user.dept_id
      const res = await getUserDepList({
        dept_id: loginDept,
      })
      let data = res.data
      this.department = util.toTreeData(data, "id", "pid", "children")
    },
    change (d) { this.$emit('update:dates', d) },
    /*  element change methods*/
    timeTypeChange (i) {
      this.$emit('changeIndex', i)
    },
    /* 用量 -- 费用 类型 */
    energyTypeChange (i) {
      if (this && i == this.convert) {
        return 'primary'
      } else {
        return ''
      }
    },
    primary (i) {
      if (this && i == this.index) {
        return 'primary'
      } else {
        return ''
      }
    },
    /* end */
  },

}
</script>
<style lang="scss" scoped>
.flexCenter {
  display: flex;
  align-content: center;
  align-items: center;
  justify-content: flex-start;
}
.topbar {
  @extend .flexCenter;
  width: 100%;
  height: 40px;
  padding-bottom: 10px;

  .clas {
    white-space: nowrap;
    padding-right: 10px;
  }
  .t2 {
    padding: 10px 10px;
  }
  .flex {
    @extend .flexCenter;
  }

  .sel {
    @extend .flexCenter;

    flex-direction: row;
    flex-wrap: nowrap;
  }

  .selbtn {
    margin-left: 20px;
  }
  .selbtn::before {
    content: "";
    height: 20px;
    padding: 10px;
    color: #ddd;
    border-left: 1px solid #ddd;
  }

  .depart {
    z-index: 9999;
    width: 300px;
    margin-left: 30px;
  }
}
</style>