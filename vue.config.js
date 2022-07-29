const CompressionWebpackPlugin = require("compression-webpack-plugin");
module.exports = {
  devServer: {
    open: true,
    proxy: {
      "/api": {
        target: process.env.VUE_APP_API_BASE_URL, //;
        changeOrigin: true,
        // pathRewrite: {
        //   '^/api': '' // 匹配/api 替换
        // }
      },
    },
  },
  css: {
    loaderOptions: {},
  },
  configureWebpack: {
    devtool: "source-map",
  },
  productionSourceMap: false,
  transpileDependencies: ["element-ui"], // 需要兼容IE10要放开这个
  chainWebpack: (config) => {
    config.plugin("html").tap((options) => {
      options[0].title = "能耗环境在线监测系统";
      return options;
    });
    if (process.env.NODE_ENV === "production") {
      // 去除 console.log日志
      // config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true;
      config.plugin("compressionPlugin").use(
        new CompressionWebpackPlugin({
          filename: "[path][base].gz",
          test: /\.scss$/,
          // loader: "sass-loader!style-loader!css-loader",
          threshold: 10240, // 对超过10kb的文件压缩
          deleteOriginalAssets: false,
        })
      );
    }
  },
};
