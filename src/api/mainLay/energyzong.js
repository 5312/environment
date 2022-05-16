import http from "../../config/axios";

const mock = {
    mock: false,
    // 返回处理
    dealWithResponse: true
};
// 总能耗
export const getCouts = params =>
    http.get("/energyzong/getCouts", { params: params, ...mock });
//分类能耗
export const getCoutsClass = params =>
    http.get("/energyzong/getCoutsClass", { params: params, ...mock });
// 局能耗趋势
export const getCoutsDeptClass = params =>
    http.get("/energyzong/getCoutsDeptClass", { params: params, ...mock });
// 矿能耗趋势
export const getCoutsDept = params =>
    http.get("/energyzong/getCoutsDept", { params: params, ...mock });