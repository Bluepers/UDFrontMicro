const { merge } = require("webpack-merge");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

const commonConfig = require("./webpack.common");
const packageJSON = require("../package.json");

/** @type {import('webpack').Configuration} */
const devConfig = {
    mode: "development",
    devServer: {
        port: 8081,
        historyApiFallback: {
            index: "/index.html",
        },
    },
    output: {
        publicPath: "http://localhost:8081/",
    },
    plugins: [
        new ModuleFederationPlugin({
            name: "marketing",
            filename: "remoteEntry.js",
            exposes: {
                "./MarketingApp": "./src/bootstrap",
            },
            shared: packageJSON.dependencies,
        }),
    ],
};
/** @type {import('webpack').Configuration} */
module.exports = merge(commonConfig, devConfig);
