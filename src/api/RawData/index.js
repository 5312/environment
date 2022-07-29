import http from "../../config/axios";
const mock = {
  mock: false,
  // 返回处理
  dealWithResponse: true,
};
export const RawDataAddnew = (params) =>
  http.get("/basic/Places/Addnew", { params: params, ...mock });
