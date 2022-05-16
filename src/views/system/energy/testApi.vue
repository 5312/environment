<template>
  <div>
    {{ api }}
  </div>
</template>
<script>
export default {
  data() {
    return {
      api: ""
    };
  },
  mounted() {
    this.get();
  },
  methods: {
    get() {

      // var url ='/energy/getCoutsIndex'; //总能耗概况-npm  // dept_id:22
      // var url ='/energy/getCoutsFeiyongIndex';
      //  var url ='/energy/getQsDayindex'; //当日/昨日   用电趋势-煤 电   //   dept_id:22, types:0,nian:2021,yue:03,ri:01

      // var url ='/energy/getQsMonthindex'; //当月/上月 用电趋势-煤 电   // dept_id:22, types:0,nian:2021,yue:03,ri:01
      //var url = '/energy/tests';
      // var url1 = '/energy/getCouts';//总量查询

      // var url1 = '/energy/getCoutsClass';//总量查询

      // var url2 = '/energy/getCoutsClassBili';//趋势查询

      // 在线监测--标题

      let url1 = "/sewage/serchinfo";//总量查询


      this.$http.get(url1, {params: {  sewage_hcaiji: "wu001"}}).then(result => {
        console.log(result);
      });

    }
  }
};
</script>
