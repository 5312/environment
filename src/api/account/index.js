import http from "../../config/axios";
const mock = {
  mock: false,
  // 返回处理
  dealWithResponse: true,
};
export const Acc = (params) => http.get("", { params: params, ...mock });
