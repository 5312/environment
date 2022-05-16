/**
 * Vuex状态管理
 */
import Vue from "vue";
import Vuex from "vuex";
import getters from "./getters";
import theme from "./modules/theme";
import user from "./modules/user";
import layout from "./modules/layout";
// 数据持久化 ---- 造成页面 空白问题， sockio问题
// import createPersistedState from "vuex-persistedstate";
Vue.use(Vuex);

export default new Vuex.Store({
    state: {},
    mutations: {},
    actions: {},
    modules: {
        theme,
        user,
        layout
    },
    getters
    //   plugins: [createPersistedState({
    //     storage: window.sessionStorage
    //   })]
});