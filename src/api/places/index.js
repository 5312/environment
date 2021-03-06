import http from "../../config/axios";
const mock = {
  mock: false,
  // 返回处理
  dealWithResponse: true,
};
// ! 获取监测点列表
export const GetList = (params) =>
  http.get("/basic/Places/GetList", { params: params, ...mock });

export const modify = (params) =>
  http.post("/basic/Places/Modify", { ...params }, mock);
export const addnew = (params) =>
  http.post("/basic/Places/Addnew", { ...params }, mock);
