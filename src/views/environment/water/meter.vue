<template>
  <div class="wrap">
    <EnvHeader />
    <!-- 顶部 切换栏 -->
    <div class="body">
      <img class="img" :src="require('@/assets/yibiao.png')" alt="加载失败" />
    </div>
  </div>
</template>
<script>
// 组件
import EnvHeader from "../../common/environmentLayout/header"

import { mapGetters } from "vuex"

export default {
  components: {
    EnvHeader
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