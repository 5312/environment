<template>
  <div v-loading="dialog">
    <el-cascader
      v-if="isShowAddressInfo"
      v-model="formdata"
      :options="cityData"
      :props="{
        value: 'id',
        label: 'name',
        lazy: true,
        leaf: 'leaf',
        lazyLoad: lazyLoad
      }"
      clearable
    />
  </div>
</template>
<script>
export default {
  name: "city",
  props: {
    formcity: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      formdata: this.editData,
      isShowAddressInfo: true,
      cityData: [], // 省市区数据
      dialog: false // 加载状态
    };
  },
  watch: {
    formdata() {
      // 西安2792
      this.$emit("citydata", this.formdata);
    }
  },
  computed: {
    editData() {
      let array = [];
      for (let index = 0; index < this.formcity.length; index++) {
        const element = this.formcity[index] * 1;
        array.push(element);
      }
      return array;
    }
  },
  mounted() {
    this.showData();
  },
  methods: {
    async showData() {
      let array = this.editData;
      this.dialog = true;

      // 省
      const result = await this.$http.get("/city/index", {
        params: { pid: 0 }
      });
      // 添加省
      this.cityData = [];
      this.cityData = result.data.data;
      // 添加市

      const result2 = await this.$http.get("/city/index", {
        params: { pid: array[0] } // 省的id 出来市
      });
      let sheng = this.cityData;
      let shi = result2.data.data;
      let index; // 选中省下标
      for (let i = 0; i < sheng.length; i++) {
        const sheng_item = sheng[i];
        if (sheng_item.id == array[0]) {
          index = i;
          this.cityData[i].children = shi; // 1省 有 2市
        }
      }
      this.isShowAddressInfo = false;
      // 添加县
      const result3 = await this.$http.get("/city/index", {
        params: { pid: array[1] } // 省的id 出来市
      });
      for (let i = 0; i < shi.length; i++) {
        const element = shi[i];
        if (element.id == array[1]) {
          let data_leaf = result3.data.data;
          data_leaf.map(item => {
            item.leaf = item.level == 3;
          });
          this.cityData[index].children[i].children = data_leaf;
        }
      }
      this.formdata = this.editData;
      this.isShowAddressInfo = true;
      this.dialog = false;
    },
    lazyLoad(node, resolve) {
      let pid = node ? (node.data ? node.data.id : 0) : 0;
      this.$http
        .get("/city/index", {
          params: { pid: pid }
        })
        .then(result => {
          let data_leaf = result.data.data;
          data_leaf.map(item => {
            item.leaf = item.level == 3;
          });
          resolve(data_leaf);
        });
    }
  }
};
</script>
<style lang=""></style>
