const { merge } = require("webpack-merge");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

const commonConfig = require("./webpack.common");
const packageJSON = require("../package.json");

const domain = process.env.PRODUCTION_DOMAIN;

console.log(`marketing@/${domain}/marketing/latest/remoteEntry.js`);

/** @type {import('webpack').Configuration} */
const prodConfig = {
    mode: "production",
    output: {
        filename: "[name].[contenthash].js",
        publicPath: "/container/latest/",
    },
    plugins: [
        new ModuleFederationPlugin({
            name: "container",
            remotes: {
                marketing: `marketing@/${domain}/marketing/latest/remoteEntry.js`,
            },
            shared: packageJSON.dependencies,
        }),
    ],
};

/** @type {import('webpack').Configuration} */
module.exports = merge(commonConfig, prodConfig);
