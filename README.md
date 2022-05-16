## 环保项目
 
 使用mock.js 模拟数据
 /api 接口集中管理 目录
 /api/mock  mock数据目录
 "echarts": "^4.9.0",

 
##　css 自定义全局样式

```/src/style/index.scss```

## 全局过滤器

数字格式化
[文档](http://numeraljs.com/)
[日期](http://momentjs.cn)

##　echarts tooltip 显示加单位

```
formatter: function (params) {
   var result = params[0].name + "<br>";
   params.forEach(function (item) {
       if (item.value) {
           result += item.marker + " " + item.seriesName + " : " + item.value + "KWh</br>";
       } else {
           result += item.marker + " " + item.seriesName + " :  - </br>";
       }
   });
   return result;
}
```





