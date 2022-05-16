import http from "../config/axios";

const mock = {
    mock: true,
    dealWithResponse: true
};
export const tablist = params =>
    http.get("/tablist", { params: params, ...mock });