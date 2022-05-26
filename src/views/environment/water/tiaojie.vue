<template>
  <div class="wrap">
    <!-- 顶部 切换栏 -->
    <div class="body">
      <img class="img" :src="require('@/assets/tiaojie.png')" alt="加载失败" />
    </div>
  </div>
</template>
<script>
// 组件

import { mapGetters } from "vuex"

export default {
  components: {
  },
  computed: {
    ...mapGetters(["theme", "user"]),
  }
}
</script>
<style lang="scss" scoped>
.wrap {
  height: 100%;
  .body {
    height: 100%;
    overflow: hidden;
    .img {
      height: 100%;
      width: 100%;
    }
  }
}
</style>