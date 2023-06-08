const { merge } = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

const commonConfig = require("./webpack.common");
const packageJSON = require("../package.json");

/** @type {import('webpack').Configuration} */
const devConfig = {
    mode: "development",
    devServer: {
        port: 8080,
        historyApiFallback: {
            index: "index.html",
        },
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./public/index.html",
        }),
        new ModuleFederationPlugin({
            name: "contaienr",
            remotes: {
                marketing: "marketing@http://localhost:8081/remoteEntry.js",
            },
            shared: packageJSON.dependencies,
        }),
    ],
};

/** @type {import('webpack').Configuration} */
module.exports = merge(commonConfig, devConfig);
