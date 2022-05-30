const CompressionWebpackPlugin = require("compression-webpack-plugin");
// const webpack = require("webpack");
module.exports = {
    devServer: {
        open: true,
        // host: "localhost",
        // port: "8080",
        proxy: {
            "/api": {
                // target: "http://ceshi.ydeshui.com/"
                // 这里可以写你自己的后端接口地址，如：
                target: "http://192.168.3.101:8089",
                changeOrigin: true,
                pathRewrite: {
                    "^/api": ""
                }
            }
        }
    },
    css: {
        loaderOptions: {}
    },
    configureWebpack: {
        devtool: "source-map"
    },
    productionSourceMap: false,
    transpileDependencies: ["element-ui"], // 需要兼容IE10要放开这个
    chainWebpack: config => {
        config.plugin("html").tap(options => {
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
                    deleteOriginalAssets: false
                })
            );
        }
    }
};