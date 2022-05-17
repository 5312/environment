/**
 * 路由配置
 */
import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store";
import setting from "@/config/setting";
//import EleLayout from "@/views/common/layout/Layout";
import EleSidebar from "@/views/common/environmentLayout/Sidebar";

import EnrviLayout from "@/views/common/environmentLayout/EnrviLayout";
import NProgress from "nprogress";
// 侧边栏

Vue.use(VueRouter);
//获取原型对象上的push函数
const originalPush = VueRouter.prototype.push;
//修改原型对象中的push方法
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err);
};

/* 静态路由配置 */
const routes = [{
        path: "/login",
        component: () =>
            import ("@/views/login/login"),
        meta: { hide: true, title: "登录" }
    },
    {
        path: "/forget",
        component: () =>
            import ("@/views/login/forget"),
        meta: { hide: true, title: "忘记密码" }
    }
];

// 404路由在动态路由后面加
const route404 = {
    path: "",
    component: EnrviLayout,
    /*  {
                  EleSidebar: EleSidebar,
                  default: () =>
                      import ("@/views/common/exception/404")
              }, */
    meta: { hide: true },
    children: [{
        path: "*",
        components: {
            EleSidebar: EleSidebar,
            default: () =>
                import ("@/views/common/exception/404")
        },
        meta: { hide: true, title: "404" }
    }]
};

const router = new VueRouter({
    linkActiveClass: "router-active",
    routes,
    mode: "history" // 把这个删掉就是hash模式
});

/* 路由守卫 */
router.beforeEach(async(to, from, next) => {
    NProgress.start();
    document.title = `${to.meta.title || ""}${to.meta.title ? " - " : ""}${
    setting.name
  }`;
    // 判断是否登录
    if (store.state.user.token) {
        /* 判断 是否有菜单 */
        if (!store.state.user.menus) {
            // 判断是否已注册动态路由
            // 获取动态路由
            let route = await store.dispatch("user/getMenuRouters").catch(() => {
                next();
            });
            if (route && route.children) {
                route.component = EnrviLayout;
                // 去除已注册的路由
                let array = route.children;
                let obj = {};
                let a = array.reduce((cur, next) => {
                    obj[next.path] ? "" : (obj[next.path] = true && cur.push(next));
                    return cur;
                }, []);
                route.children = a;
                for (let i = route.children.length - 1; i >= 0; i--) {
                    if (router.resolve(route.children[i].path).resolved.matched.length) {
                        route.children.splice(i, 1);
                    }
                }
                router.addRoutes([route, route404]);
            }

            next({...to, replace: true });
        } else {
            next();
        }
    } else if (setting.whiteList.indexOf(to.path) !== -1) {
        // 判断是否在无需登录白名单
        next();
    } else {
        // 未登录跳转登录页面
        next({ path: "/login", query: to.path === "/" ? {} : { from: to.path } });
    }
});

router.afterEach((to, from) => {
    if (from.path != "/login" && from.path != "/" && to.path == "/login") {
        console.log("re");
        window.location.reload();
    }
    setTimeout(() => {
        NProgress.done();
    }, 150);
});

export default router;