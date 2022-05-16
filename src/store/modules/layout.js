// 主布局路由
let main_layout = localStorage.getItem("main_layout_route");
// 第二布局路由
let deputy_layout = localStorage.getItem("deputy_layout_route");

export default {
    namespaced: true,
    state: {
        mainRoute: main_layout ? main_layout : "/system/overview/map", //主布局
        deputyRoute: deputy_layout ? deputy_layout : "/oneOfpicture/index", // 第二布局
        showPath: null, // 即将push 的路径
        mainTheme: localStorage.getItem("theme") ?
            localStorage.getItem("theme").theme :
            null,
        navIndex: localStorage.getItem("navIndex") || null
    },
    mutations: {
        SET: (state, obj) => {
            localStorage.removeItem("navIndex");
            if (obj) localStorage.setItem("navIndex", obj);
            state.navIndex = obj;
        },
        /*
         * obj ={}
         * type : 切换布局
         * path : 路由
         */
        toggle: (state, obj) => {
            if (obj.type === "deputy") {
                // 缓存
                state.showPath = state.deputyRoute;
                // 切换
                localStorage.setItem("main_layout_route", obj.path);
                state.mainRoute = obj.path;
                // 主题 保存主主题
                state.mainTheme = obj.theme;
            } else {
                state.showPath = state.mainRoute;

                localStorage.setItem("deputy_layout_route", obj.path);
                state.deputyRoute = obj.path;
                // 主题
                state.mainTheme = obj.theme ? obj.theme : state.mainTheme;
            }
        }
    },
    actions: {
        setLayout(store, products) {
            const { commit } = store;
            commit("toggle", products);
        },
        setNavIndex({ commit }, products) {
            commit("SET", products);
        }
    }
};