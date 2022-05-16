<template>
  <el-container>
    <el-aside>
      <el-card class="box-tree">
        <div class="top">环境监测类别</div>
        <ul class="ele-clear ele-clear-after" v-loading="!element.length">
          <li
            v-for="(item, index) in element"
            :key="index"
            @click="node(item.id, item.hclass_name, index)"
            :class="[
              'left',
              'text_overflow',
              { 'ele-bg-primary': item.id == hclass },
            ]"
          >
            <i :class="iconlist[index]"></i>
            {{ item.hclass_name }}
          </li>
        </ul>
      </el-card>
    </el-aside>
    <el-main>
      <el-row :gutter="10">
        <el-col :span="24">
          <el-card v-loading="right">
            <div slot="header">
              <span>环境监测名称：</span>
              <span class="span">{{ classname }}</span>
            </div>
            <div class="elect">
              <div
                class="li"
                v-for="(item, index) in dep"
                :key="index"
                :name="String(item.id)"
              >
                <div class="ele" :style="{ background: item.hgrain_color }">
                  {{ item.hgrain_name }}
                  <p>{{ item.hgrain_en }}</p>
                </div>
                <div class="volt">
                  <div>
                    <span> 当前值：</span>
                    <span>{{ item.hgrain_new }}</span>
                    <span>{{
                      item.hgrain_new != "-" ? item.hgrain_dw : null
                    }}</span>
                  </div>
                  <div>
                    <span>最高值：</span>
                    <span>{{ item.hgrain_max }}</span>
                    <span>{{
                      item.hgrain_max != "-" ? item.hgrain_dw : null
                    }}</span>
                  </div>
                  <div>
                    <span> 最低值：</span>
                    <span>{{ item.hgrain_min }}</span>
                    <span>{{
                      item.hgrain_min != "-" ? item.hgrain_dw : null
                    }}</span>
                  </div>
                </div>
              </div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="24">
          <EchartsList :element="dep" :huanjing="hclass" :dept="dept" />
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>
<script>
// 组件
import EchartsList from "@/views/system/overview/components/echartsList.vue"

import { getHclassData } from '@/api/mainLay/Hjing'
import { mapGetters } from "vuex"
export default {
  components: { EchartsList },

  data () {
    return {
      element: [],
      dep: [],
      defaultProps: {
        children: "children",
        label: "hclass_name"
      },
      dept: null,
      /* 当前选中 类别id */
      hclass: null,
      classname: "",
      iconlist: [
        "el-icon-moon-night",
        "el-icon-light-rain",
        "el-icon-heavy-rain",
        "el-icon-chat-round",
        "el-icon-soccer",
        "el-icon-turn-off-microphone",
        "el-icon-partly-cloudy",
      ],
      right: false
    }
  },
  computed: {
    ...mapGetters(["user"]),
  },
  created () {
    /* 获取默认 单位信息 */
    this.dept = this.$route.query.id || this.user.user.dept_id
  },
  mounted () {
    this.ele().then(() => {
      this.hclassLeftPanel()
    })
  },

  methods: {
    // 点击左侧列表
    node (id, name) {
      this.hclass = id
      this.classname = name
      /* 监测类别 */
      this.hclassLeftPanel()
    },
    async ele () {
      // 面板元素 内容 左
      const res = await this.$http.get("/hclass/index")
      if (res) {
        this.element = res.data.data
        this.hclass = res.data.data[0].id

        /* 右侧面板显示 */
        this.element.forEach(j => {
          if (Number(j.id) === Number(this.hclass)) {
            this.classname = j.hclass_name
          }
        })
      }
    },
    /* 环境监测类别 */
    async hclassLeftPanel () {
      this.right = true
      // 面板元素 内容  右
      const res = await getHclassData({
        dept_id: this.dept,
        hclass_id: this.hclass
      })
      this.dep = res.data
      this.right = false
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
    .box-tree {
      height: 100%;
      .top {
        height: 30px;
        border-bottom: 1px solid #ddd;
        font-weight: bold;
        .left {
          margin-left: 20px;
          margin-top: 20px;
          cursor: pointer;
        }
      }
      li {
        width: 78%;
        height: 30px;
        line-height: 30px;
        padding: 5px 20px;
        list-style: none;
        cursor: pointer;
      }
    }
  }
  .el-main {
    padding: 10px;
    height: calc(100vh - 60px);
    .span {
      font-weight: bold;
    }
    .elect {
      width: 100%;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      align-content: center;
      justify-content: space-between;
      align-items: center;

      .li {
        cursor: pointer;
        list-style: none;
        width: calc(100% / 3 - 20px);
        display: flex;
        justify-content: space-between;
        margin: 10px 0;
        .ele {
          width: 46%;
          padding: 5px;
          font-size: 12px;
          p {
            font-size: 30px;
            font-weight: bold;
            text-align: center;
            line-height: 50px;
          }
        }
        .volt {
          width: 75%;
          background-color: rgba(0, 0, 0, 0.1);
          display: flex;
          flex-direction: column;
          flex-wrap: wrap;
          align-content: flex-start;
          justify-content: space-between;
          align-items: flex-start;

          padding-left: 10px;
          & > div {
            font-size: 0;
            padding: 5px;
            span {
              font-size: 15px;
            }
          }
        }
      }
    }
  }
}
</style>
