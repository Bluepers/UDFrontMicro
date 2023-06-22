const { merge } = require("webpack-merge");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

const commonConfig = require("./webpack.common");
const packageJSON = require("../package.json");

/** @type {import('webpack').Configuration} */
const prodConfig = {
    mode: "production",
    output: {
        filename: "[name].[contenthash].js",
        publicPath: "/dashboard/latest/",
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
    ],
};

/** @type {import('webpack').Configuration} */
module.exports = merge(commonConfig, prodConfig);
