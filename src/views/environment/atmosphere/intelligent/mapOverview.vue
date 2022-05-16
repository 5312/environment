/* 地图概览 */
<template>
  <div class="ele-body">
    <el-row :gutter="10">
      <el-col :span="24">
        <el-card class="left">
          <img :src="require('@/assets/mapOverview.png')" alt="" />
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<style lang="scss" scoped>
$wrap-height: calc(100vh - 183px);
.ele-body {
  .left {
    img {
      width: 100%;
      height: $wrap-height;
    }
  }
}
</style>