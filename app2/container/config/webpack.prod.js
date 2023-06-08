const { merge } = require("webpack-merge");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

const commonConfig = require("./webpack.common");
const packageJSON = require("../package.json");

const domain = process.env.PRODUCTION_DOMAIN;

/** @type {import('webpack').Configuration} */
const prodConfig = {
    mode: "production",
    output: {
        filename: "[name].[contenthash].js",
    },
    plugins: [
        new ModuleFederationPlugin({
            name: "contaienr",
            remotes: {
                marketing: `marketing@/${domain}/marketing/remoteEntry.js`,
            },
            shared: packageJSON.dependencies,
        }),
    ],
};

/** @type {import('webpack').Configuration} */
module.exports = merge(commonConfig, prodConfig);
