import http from "../../config/axios";

const mock = {
    mock: false,
    // 返回处理
    dealWithResponse: true
};

// 面板内容 /*环境监测类别 */
export const getHclassData = params =>
    http.get("/Hjing/getHclassData", { params: params, ...mock });
// 日环境元素查询趋势
export const getHjDay = params =>
    http.get("/Hjing/getHjDay", { params: params, ...mock });