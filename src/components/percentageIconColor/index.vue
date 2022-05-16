<template>
  <span
    class="numbertext text_overflow"
    :style="{
      color: number > 0 ? '#F56C6C' : '#67C23A',
    }"
  >
    <!-- number == 1 ? '#909399' :number > 0 ? '#F56C6C' : '#67C23A' -->
    {{ (number * 100) | numberLength }}%
    <i
      :class="{
        'el-icon-caret-top': number > 0 ? true : false,
        'el-icon-caret-bottom': number < 0 ? true : false,
      }"
    ></i>
  </span>
</template>
<script>
export default {
  name: 'percentageIconColor',
  props: {
    number: Number
  }
}
</script>
<style lang="scss" scoped>
.numbertext {
  margin-left: 10px;
}
</style>