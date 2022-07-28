import menu from "./menus";
// 导入mockjs
const Mock = require("mockjs");
console.log(menu);
//* 拦截该url，就可以返回menu
Mock.mock("/api/index/getMenuList", {
  code: 0,
  data: menu,
  msg: "",
  success: true,
});
//! 验证码
Mock.mock("/api/login/captcha", {
  code: 0,
  data: {
    captcha:
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAAA+BAMAAACcvUmpAAAAG1BMVEXz+/5FM3nd4u3Hydycl7taTIlwZZqxsMyGfqqkyBVpAAAACXBIWXMAAA7EAAAOxAGVKw4bAAACE0lEQVRYhe2Wz0/CMBTHl45tXJ+6wXEoeMaf8QgmA48MjGemJHBk8QcenRrjn+1rO4jrdBSWejD9JiSs7d6n71dXw9DS0tL6LzrwlSNIAJ5ySgAAY8WMQ2TAjloGCSlkVy2kBX8AiaBmqg6XA9AmAAOlEAvqBnrSUQo5gpphA/hKIQkMEVRft6zcJsI3/K3N+znM2iUgc8OoAswL15AeFnkZCCoGr2h60aPtWivHIMVdUmXNCi+5iX1/A4hVHK2YMURfyTO6N5HHJFhb5OW3WewhD+0NBUbC0bIUtDIwI7HjV7Fw+sdmLu0pQ/7IwwPyJBK+JxchuNPVUwNgL/vOGQVM6HfIN6SUsHBkITY1sjIcimmv0OlXNlFc+0uZ3O+OSEaN+H8sLzc/6/VpWUpCLMa4E0Yr14tomYhYLHGb76velA5XnLqeUyW1beb2u8z6yIkkWzQSGA51igQjGiWWlZaYdocG6/6JBVHurMF9upffB2IMHa3QGxqQdBfjzCsWdy2UP84q4HYyA/juLenyeNTYAnD9zIq0oqVLC5PoZlcSVmkkYpAx80zsuAZLli3fJIYtuEwh3BDANH0WNmzRODphrkM3UMSMdpemzatQ/GrScnN/Pphl1UpLZ2WC5NL7yDO2vSPphbKwl0nAetHfHsIPJii+Wpx+zPolEKgm9cWVLc9tRR4+30teG7S0tLS0tMrrCyG6TICDHJeyAAAAAElFTkSuQmCC",
    key: "0da8cd64-2a35-42e1-99f4-9776924a84da",
  },
  msg: "",
  success: true,
});
// ! 登录
Mock.mock("/api/login/login", {
  code: 0,
  data: {
    access_token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJqd3RfeWgiLCJleHAiOjE2NTMyNzU4MTQsInN1YiI6IllIIiwiYXVkIjoiZXZlcnkiLCJuYmYiOjE2NTI2NzEwMTQsImlhdCI6MTY1MjY3MTAxNCwianRpIjoxMDAwMSwidWlkIjoxfQ.uCuwaO1w86mDMWfU8MFr-HXX-WVbiRtyiFYU_Uxk3Us",
  },
  msg: "",
  success: true,
});
// ! 用户信息
Mock.mock("/api/index/getUserInfo", {
  code: 0,
  msg: "",
  data: {
    address: "江苏省",
    avatar: "",
    city_code: "2792",
    city_name: "",
    create_user_name: "管理员",
    dept_name: "陕西煤业股份有限公司",
    district_code: "2793",
    email: "222222@qq.com",
    gender_name: "男",
    intro: "个人简介",
    level_name: "总裁办",
    mobile: "13222222222",
    nickname: "王能1",
    note: "暂无备注",
    password: "062a8e08dfa50dccb57b7fbd37b48790",
    position_name: "设备科长",
    province_code: "2791",
    realname: "管理员",
    salt: "",
    update_user_name: "管理员",
    username: "admin",
  },
  success: true,
});

// ! 退出登录
Mock.mock("/api/login/logout", {
  code: 0,
  msg: "",
  data: 49,
  success: true,
});
