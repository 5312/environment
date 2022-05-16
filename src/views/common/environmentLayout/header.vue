<!-- 顶栏 -->
<template>
  <div
    :class="['ele-admin-header', { 'ele-bg-primary': theme.headStyle === 2 }]"
  >
    <!-- 左侧功能区 -->
    <div class="top_color_bar-left">
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
    </div>

    <div class="ele-admin-logo">
      <img src="@/assets/logo.png" alt="logo" /><span>{{ $setting.name }}</span>
    </div>
    <div class="top_color_bar-right">
      <i
        class="el-icon-sort cursor skew_text transfrom_x"
        @click="EleLayout"
      ></i>

      <!-- 右侧功能区 -->
      <ele-header-right />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex"


import EleHeaderRight from "./HeaderRight"

import NProgress from "nprogress"

export default {
  name: "EnvHeader",
  components: {

    EleHeaderRight,
  },
  data () {
    return {}
  },
  computed: {
    ...mapGetters(["theme", "layout"]),
    showLeft () {
      // 是否显示左侧部分menu
      return this.theme.layoutStyle !== 1 || this.theme.screenWidth < 768 // 小屏幕强制显示
    }
  },
  mounted () {
    if (console.warning) console.warning('main ---> ' + this.layout.mainTheme)
    if (!this.layout.mainTheme) {

      this.setTheme('layout-dark', true)
    }
  },
  methods: {
    ...mapActions({
      setLayout: 'layout/setLayout'
    }),
    EleLayout () {
      // 切花当前主题
      this.setLayout({ type: 'main', path: this.$route.path })
      if (this.layout.showPath) {
        this.$router.push(this.layout.showPath)
        this.setTheme(this.layout.mainTheme, true)

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
          // this.$message.error("主题加载失败");
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
    },

  }
};
</script>
<style scope lang="scss">
.transfrom_x {
  transform: skew(309deg) rotate(90deg) !important;
}

.ele-admin-header {
  justify-content: space-between;
  overflow: hidden;
  .top_color_bar {
    width: 30%;
    height: 30px;
    line-height: 30px;
    padding-left: 20px;
    display: flex;
    flex-direction: row;
    align-content: center;
    justify-content: flex-end;
    align-items: center;
    &-left {
      @extend .top_color_bar;
      transform: skewX(309deg);
      background: linear-gradient(to right, #051d3f, #425269);
      // background: linear-gradient(to right, #9266f9, #f2f6fc);
      .skew_text,
      ul {
        transform: skewX(-309deg);
      }
    }
    &-right {
      @extend .top_color_bar;
      transform: skewX(-309deg);
      background: linear-gradient(to left, #051d3f, #425269);
      // background: linear-gradient(to left, #9266f9, #f2f6fc);
      .skew_text,
      ul {
        transform: skewX(309deg);
      }
    }
  }
}
</style>
