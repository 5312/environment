import http from "../../config/axios";

const mock = {
    mock: false,
    // 返回处理
    dealWithResponse: true
};
//总能耗
export const getCouts = params =>
    http.get("/energy/getCouts", { params: params, ...mock });

// 日趋势
export const getQsDay = params =>
    http.get("/energy/getQsDay", { params: params, ...mock });
// 月趋势
export const getQsMonth = params =>
    http.get("/energy/getQsMonth", { params: params, ...mock });
// 年趋势
export const getQsYear = params => http.post("/energy/getQsYear", params, mock);
// 按分类年趋势
export const getQsClassYear = params =>
    http.get("/energy/getQsClassYear", { params: params, ...mock });

// 年报表
export const getQsBiaoYear = params =>
    http.post("/energy/getQsBiaoYear", {...params }, mock);

// 月报表
export const getQsBiaoMonth = params =>
    http.post("/energy/getQsBiaoMonth", {...params }, mock);

// ri报表
export const getQsBiaoDay = params =>
    http.post("/energy/getQsBiaoDay", {...params }, mock);

// ri能源同比
export const getCoutsClass = params =>
    http.post("/energy/getCoutsClass", {...params }, mock);

// ri能源同比
export const getCoutsClassBili = params =>
    http.post("/energy/getCoutsClassBili", {...params }, mock);