import http from "../../config/axios";
const mock = {
  mock: false,
  // θΏεε€η
  dealWithResponse: true,
};
export const RawDataAddnew = (params) =>
  http.get("/basic/Places/Addnew", { params: params, ...mock });
