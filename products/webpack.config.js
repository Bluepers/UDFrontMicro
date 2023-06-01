const htmlWebpackPlugin = require("html-webpack-plugin") 

module.exports = {
    mode: "development",
    devServer: {
        port: 8081,
    },
    plugins: [ 
        new htmlWebpackPlugin({
            template:"./public/index.html"
        })
    ]
};