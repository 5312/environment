/**
 * axios配置
 */
import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
import store from "@/store";
import router from "@/router";
import setting from "./setting";
import { MessageBox } from "element-ui";

Vue.use(VueAxios, axios);

axios.defaults.baseURL = setting.baseURL;
axios.defaults.headers.common[setting.tokenHeaderName] = store.state.user.token;

axios.defaults.headers.common[setting.xtokenname] = store.state.user.token;
/* 请求拦截 */
axios.interceptors.request.use(
    config => {
        if (config.mock) {
            config.baseURL = "/mock"; //"http: //127.0.0.1:4523/mock/828239"-- > 'apifox;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);
/* 响应拦截器 */
axios.interceptors.response.use(
    res => {
        if (res.data.code === 401) {
            // 登录过期处理
            if (res.config.url === setting.menuUrl) {
                store.dispatch("user/setToken").then(() => {
                    location.replace("/");
                });
                return;
            }
            console.error("错误url" + res.config.url);
            MessageBox.alert("登录状态已过期，请退出重新登录！", "系统提示", {
                confirmButtonText: "重新登录",
                callback: action => {
                    if (action === "confirm") {
                        store.dispatch("user/setToken").then(() => {
                            router.push({ path: "/login" });
                        });
                    }
                },
                beforeClose: () => {
                    MessageBox.close();
                }
            });
            return Promise.reject(new Error(res.data.msg));
        }
        // token自动续期
        let access_token = res.headers[setting.tokenHeaderName];
        if (access_token) {
            store.dispatch("user/setToken", access_token);
        }
        if (res.config.dealWithResponse) {
            return res.data;
        } else {
            return res;
        }
    },
    error => {
        return Promise.reject(error);
    }
);

export default axios;