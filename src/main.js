import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./config/plugins";

import VueLazyload from "vue-lazyload";
import moment from "moment";
moment.locale("zh-cn");

Vue.prototype.$moment = moment;
import "./styles/theme/blue-dark.scss";

// import Con from "./utils/console";
// Vue.use(Con);
import "./api/mock/mock";
// 百度地图
import BaiduMap from "@/components/vue-baidu-map";
Vue.use(BaiduMap, {
  ak: "wmW4GGRbIEoK7M5d9XAWbK1OXMqEtzWB",
});

Vue.config.productionTip = false;

Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: require("./assets/404.jpg"),
  loading: require("./assets/loading.svg"),
  attempt: 1,
  listenEvents: ["scroll"],
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
