<!-- 顶栏导航部分 -->
<template>
  <div class="ele-admin-header margin-top-header">
    <el-menu
      :default-active="active"
      mode="horizontal"
      active-text-color="#000"
      @select="onMenuSelect"
      @mousewheel.native="onMousewheel"
      :class="[
        'ele-header-nav ele-scrollbar-hide',
        { 'ele-menu-dark': theme.headStyle !== 0 },
      ]"
      class="tablist_bar"
    >
      <template v-for="(menu, index) in menus">
        <ele-sidebar-item
          v-if="!menu.meta || !menu.meta.hide"
          :item="menu"
          :path="menu.path || index"
          :key="menu.path || index"
        />
      </template>
    </el-menu>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex"
import EleSidebarItem from "./SidebarItem"
import NProgress from "nprogress"

// import menusJson from './menus.js'
export default {
  name: "EleHeaderNav",
  components: { EleSidebarItem },
  data () {
    return {
      scroll: false, // 用于鼠标滚轮事件节流
      activeNo: false // 用于触发active更新
    }
  },
  computed: {
    ...mapGetters(["theme", "user", "layout"]),

    /* 菜单数据 */
    menus () {
      let useMenu = this.user.menus && this.user.menus.length
      let menus = useMenu ? this.user.menus : this.$router.options.routes.filter(d => !d.meta || !d.meta.hide)
      return menus.map(d => Object.assign({}, d, {
        /*path: null, */children: null
      }))
      /*  let arr = menusJson.map(d => {
         const obj = Object.assign({}, d)
         obj.children = []
         return obj
       })
       return arr */
    },
    /* 当前选中项 */
    active () {
      if (this.activeNo) {
        return ""
      }
      return String(this.layout.navIndex || '/environment/oneOfpicture/index')
    },
  },
  mounted () {
  },
  methods: {
    ...mapActions({
      navIndex: 'layout/setNavIndex'
    }),
    /* 菜单点击事件 */
    onMenuSelect (index) {
      if (isNaN(index)) {
        if (!index) {
          return
        }
        if (
          index.startsWith("http://") ||
          index.startsWith("https://") ||
          index.startsWith("//")
        ) {
          window.open(index)
          this.activeNo = true
          this.$nextTick(() => {
            this.activeNo = false
          })
        } else if (this.$route.fullPath === index) {
          this.refresh()
        } else {
          this.navIndex(index)
          this.$router.push(index)
        }
      } else {
        this.navIndex(index)
        /* 点击顶部菜单重定向 */
        // this.$router.push(menusJson[index].redirect)
      }
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
    /* 鼠标滚轮事件 */
    onMousewheel (e) {
      let elem = e.currentTarget
      if (!this.scroll) {
        // 加标识节流
        this.scroll = true
        let delta = e.wheelDelta || e.detail
        if (delta > 0) {
          elem.scrollLeft -= elem.clientWidth
        } else if (delta < 0) {
          elem.scrollLeft += elem.clientWidth
        }
        setTimeout(() => {
          this.scroll = false
        }, 300)
      }
      e.stopPropagation()
      e.preventDefault()
    }
  }
};
</script>
<style lang="scss" scoped>
$menu_off: 30px;
.margin-top-header {
  position: relative !important;
  padding: 0 50px;
  padding-top: 10px;
  background: url("~@/assets/header/menu_leftbg.png") 1% 80% / 15px 35px
      no-repeat,
    url("~@/assets/header/menu_leftbg.png") 99% 80% / 15px 35px no-repeat;

  .el-menu {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-content: center;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 20px;
    background: url("~@/assets/header/menu_BottomLine.png") 100% 90% / 112px 2px;
    background-repeat: repeat-x;
    &.el-menu--horizontal > .el-menu-item {
      font-size: 16px;
      font-weight: 700;
      color: #000;
      background: url("~@/assets/header/menu_off.png") 100% 100% / 100% 100%
        no-repeat;
      width: 221px;
      text-align: center;
      height: $menu_off;
      line-height: $menu_off;
      &:hover {
        color: #000;
      }
      &.is-active {
        color: #000;
        background: url("~@/assets/header/menu_on.png") 100% 100% / 100% 100%
          no-repeat;
      }
    }
  }
}
</style>
