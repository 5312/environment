import http from "../../config/axios";
const mock = {
  mock: false,
  // θΏεε€η
  dealWithResponse: true,
};

export const modify = (params) =>
  http.post("/basic/Items/Modify", { ...params }, mock);
export const addnew = (params) =>
  http.post("/basic/Items/Addnew", { ...params }, mock);
