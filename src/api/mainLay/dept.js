import http from "../../config/axios";

const mock = {
    mock: false,
    // 返回处理
    dealWithResponse: true
};

/* 获取部门 */
export const getUserDepList = params =>
    http.get("/dept/getUserDepList", { params: params, ...mock });