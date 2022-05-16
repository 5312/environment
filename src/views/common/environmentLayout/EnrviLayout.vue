<template>
  <div class="wrap" :class="layoutClass">
    <!-- 路由出口 -->
    <!-- 顶栏 -->
    <EnvHeader />
    <ele-header-nav />
    <el-container class="ele-admin-main">
      <!-- 侧边栏 -->
      <router-view name="EleSidebar"></router-view>
      <!-- <ele-sidebar v-if="showSidebar" /> -->
      <div class="ele-admin-body">
        <keep-alive :include="$setting.keepAliveList">
          <router-view v-if="!theme.reload" /><!-- 路由出口 -->
        </keep-alive>
      </div>
    </el-container>
  </div>
</template>

<script>
import { mapGetters } from "vuex"
// 组件
import EnvHeader from "./header"
// import EleSidebar from "./Sidebar"
import EleHeaderNav from "./HeaderNav"
export default {
  name: 'EnrviLayout',
  components: {
    EnvHeader,
    EleHeaderNav,
    // EleSidebar
  },
  computed: {
    /* 框架布局class */
    layoutClass () {
      return [
        "ele-admin-layout",
        { "ele-layout-collapse": this.theme.collapse }, // 折叠状态
        { "ele-layout-fixed": this.theme.fixedLayout }, // 固定顶栏和侧栏
        { "ele-side-dark": this.theme.sideStyle === 1 }, // 暗色侧栏
        { "ele-side-color-icon": this.theme.colorfulIcon }, // 侧栏彩色图标
        { "ele-head-dark": this.theme.headStyle !== 0 }, // 暗色顶栏
        {
          "ele-logo-auto-size":
            this.theme.logoAutoSize || this.theme.layoutStyle === 1
        }, // logo宽度自适应
        { "ele-tabs-show": this.theme.showTabs }, // 开启多页签
        ["", "ele-tab-dot", "ele-tab-card"][this.theme.tabStyle], // 页签风格
        { "ele-admin-body-limit": !this.theme.bodyFull } // 主体内容定宽
      ]
    },
    ...mapGetters(["theme", "user"]),
    /* 是否显示侧边栏 */
    showSidebar () {
      return this.theme.layoutStyle !== 1 || this.theme.screenWidth < 768 // 小屏幕强制左侧菜单模式
    },
  },
  methods: {
    /* 折叠/展开侧边栏 */
    collapse () {
      this.$store.dispatch("theme/toggle", "collapse")
    }
  }
};
</script>
<style lang="scss" scoped>
.ele-admin-body {
  height: calc(100vh - 120px);
  overflow-x: auto;
  padding-top: 0px !important;
}
</style>