<template>
  <div>
    <el-menu
      :default-active="activeIndex2"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      v-for="(item, index) in navList"
      :key="index"
    >
      <el-submenu v-if="item.isSecond" :index="item.index">
        <template slot="title">{{ item.title }}</template>
        <el-menu-item
          v-for="(item1, index1) in item.kind"
          :key="index1"
          :index="item1"
          >{{ item1.title }}</el-menu-item
        >
      </el-submenu>
      <el-menu-item v-else :index="item.index">{{ item.title }}</el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {
      navList: [
        {
          title: "知识学习",
          index: "1",
          isSecond: true,
          kind: [
            {
              title: "理论学习",
              url: "/index",
              index: "11",
            },
            {
              title: "建筑设施",
              url: "/index",
              index: "12",
            },
            {
              title: "武器装备",
              url: "/index",
              index: "13",
            },
          ],
        },
        {
          title: "实操训练",
          url: "/index",
          index: "2",
        },
        {
          title: "学习统计",
          url: "/index",
          index: "3",
        },
        {
          title: "分享论坛",
          url: "/index",
          index: "4",
        },
      ],
    };
  },
  methods: {},
};
</script>

<style lang="less" scoped></style>
