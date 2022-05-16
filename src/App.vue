<template>
  <div id="app">
    <router-view v-if="isRouterAlive"></router-view>
  </div>
</template>

<script>
export default {
  provide () {
    return {
      reload: this.reload
    }
  },
  data () {
    return {
      isRouterAlive: true
    }
  },
  methods: {
    reload () {
      this.isRouterAlive = false
      this.$nextTick(function () {
        this.isRouterAlive = true
      })
    }
  },
}
</script>
<style lang="scss">
@import "./styles/eleadmin/index.scss";
@import "./styles/index.scss";
body {
  overflow: hidden;
}
.vue-treeselect__control {
  background: transparent !important;
  border-color: $--border-color-base !important; //$--border-color-base !important;; //rgba(255, 255, 255, 0.15) !important;;
}
.vue-treeselect__menu {
  background: #fff !important;
}
</style>