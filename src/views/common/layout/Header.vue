<!-- 顶栏 -->
<template>
  <div
    :class="['ele-admin-header', { 'ele-bg-primary': theme.headStyle === 2 }]"
  >
    <div class="ele-admin-logo">
      <img src="@/assets/logo.png" alt="logo" /><span>{{ $setting.name }}</span>
    </div>
    <!-- 左侧功能区 -->
    <el-menu
      v-if="showLeft"
      mode="horizontal"
      :class="['ele-header-left', { 'ele-menu-dark': theme.headStyle !== 0 }]"
    >
      <el-menu-item index="fold" @click="collapse"
        ><i :class="theme.collapse ? 'el-icon-_unfold' : 'el-icon-_fold'"></i>
      </el-menu-item>
      <el-menu-item index="refresh" @click="refresh"
        ><i class="el-icon-refresh-right"></i
      ></el-menu-item>
    </el-menu>
    <!-- 面包屑导航 -->
    <ele-breadcrumb v-if="theme.layoutStyle === 0" />
    <i
      v-if="change == 'development'"
      class="cursor el-icon-sort transfrom_r"
      @click="environmentLayout"
    ></i>
    <!-- 顶部菜单区 -->
    <ele-header-nav v-if="theme.layoutStyle !== 0" />
    <!-- 右侧功能区 -->
    <ele-header-right />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex"
import EleBreadcrumb from "./Breadcrumb"
import EleHeaderNav from "./HeaderNav"
import EleHeaderRight from "../fragment/HeaderRight"
import NProgress from "nprogress"

export default {
  name: "EleHeader",
  components: { EleBreadcrumb, EleHeaderNav, EleHeaderRight },
  data () {
    return {
      change: process.env.NODE_ENV
    }
  },
  computed: {
    showLeft () {
      // 是否显示左侧部分menu
      return this.theme.layoutStyle !== 1 || this.theme.screenWidth < 768 // 小屏幕强制显示
    },
    ...mapGetters(["theme", "layout"])
  },
  methods: {
    ...mapActions({
      setLayout: 'layout/setLayout'
    }),
    // 切换主题
    environmentLayout () {
      // 路由切换
      this.setLayout({ type: 'deputy', path: this.$route.path, theme: this.theme.theme })

      if (this.layout.showPath) {
        this.$router.push(this.layout.showPath)

        // 环境页面暂无 动态主题
        this.setTheme('layout-dark', true)
      }

    },
    /* 切换主题色 */
    setTheme (theme, force) {
      if (!force && theme === this.$store.state.theme.color) {
        return
      }

      const loading = this.$loading({ lock: true, background: "transparent" })
      this.$store
        .dispatch("theme/setTheme", theme)
        .then(() => {
          loading.close()
        })
        .catch(e => {
          console.error(e)
          loading.close()
          this.$message.error("主题加载失败")
        })
    },
    /* 折叠 */
    collapse () {
      this.$store.dispatch("theme/toggle", "collapse")
    },
    /* 刷新 */
    refresh () {
      NProgress.start()
      if (this.theme.reload) {
        return
      }
      this.$store.dispatch("theme/toggle", "reload")
      this.$nextTick(() => {
        this.$store.dispatch("theme/toggle", "reload")
        setTimeout(() => {
          NProgress.done()
        }, 150)
      })
    }
  }
};
</script>
<style lang="scss" scoped>
.transfrom_r {
  transform: rotate(90deg);
}
</style>
