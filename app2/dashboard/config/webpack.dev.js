const { merge } = require("webpack-merge");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

const commonConfig = require("./webpack.common");
const packageJSON = require("../package.json");
const { DefinePlugin } = require("webpack");

/** @type {import('webpack').Configuration} */
const devConfig = {
    mode: "development",
    devServer: {
        port: 8083,
        historyApiFallback: {
            index: "/index.html",
        },
        headers: {
            "Access-Control-Allow-Origin": "*",
        },
    },
    output: {
        publicPath: "http://localhost:8083/",
    },
    plugins: [
        new ModuleFederationPlugin({
            name: "dashboard",
            filename: "remoteEntry.js",
            exposes: {
                "./DashboardApp": "./src/bootstrap",
            },
            shared: packageJSON.dependencies,
        }),
        new DefinePlugin({
            __VUE_OPTIONS_API__: true,
            __VUE_PROD_DEVTOOLS__: true,
        }),
    ],
};
/** @type {import('webpack').Configuration} */
module.exports = merge(commonConfig, devConfig);
