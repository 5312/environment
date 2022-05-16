import Mock from "mockjs";

let configArray = [];

// 使用webpack的require.context() 遍历所有mock文件
const files = require.context(".", true, /\.js$/);
files.keys().forEach(key => {
    if (key === "./mockAxios.js") return;

    for (const keys in files(key)) {
        if (Object.hasOwnProperty.call(files(key), keys)) {
            const element = files(key)[keys];
            configArray = configArray.concat(element);
        }
    }
});

// 注册所有的mock服务
configArray.forEach(item => {
    for (let [path, target] of Object.entries(item)) {
        let protocol = path.split("|");
        //    "http://ceshi.ydeshui.com/mock" + protocol[1],
        Mock.mock(
            new RegExp("(\\D*|\\S*)/mock" + protocol[1]),
            protocol[0],
            target
        );
    }
});