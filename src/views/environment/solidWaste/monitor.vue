<template>
  <div class="ele-body">
    <el-row>
      <el-col :span="24">
        <el-card class="center">
          <img class="img" :src="require('@/assets/shipin.png')" alt="加载失败" />
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  data() {
    return {}
  }
}
</script>
<style lang="scss" scoped>
$text-color: #07d3dd;
.img {
  width: 100%;
  height: 100%;
}
.ele-body {
  .el-card {
    &__header {
      border-color: transparent;
      .title {
        font-size: 18px;
        text-align: center;
        color: $text-color;
      }
    }
  }
  .el-card:deep.el-card__body {
    height: 100%;
  }
  .center {
    height: calc(100vh - 150px);
  }

  .right {
    .center {
      height: calc(100vh / 2 - 83px);
    }
    .el-card:deep.el-card__body {
      height: calc(100% - 83px);
    }
  }
}
</style>
