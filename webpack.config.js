var webpack = require('webpack');
var path = require('path');

let loader = ["ts-loader"];
let plugins = [];
let entry = "./src/index.tsx";
if (process.env.NODE_ENV == "production") {
    loader = ["babel-loader", "ts-loader"];
    plugins = [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }),
        new webpack
            .optimize
            .UglifyJsPlugin()
    ];
    entry = ["babel-polyfill", "./src/main.tsx"];
}

module.exports = {
    entry,
    output: {
        path: path.join(__dirname, "dist"),
        filename: 'bundle.js'
    },
    module: {
        rules: [{
            test: /\.(jsx|js)$/,
            use: [{
                loader: "babel-loader"
            }]
        }, {
            test: /\.(tsx|ts)$/,
            use:loader,
            exclude:"/node_modules/"
        }, {
            test: /\.less$/,
            use: [
                "style-loader", "css-loader", "less-loader"
            ]
        }]
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"]
    },
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        compress: true,
        open: true,
        port: 9900,
        historyApiFallback: true,
        overlay: {
            warnings: true,
            errors: true
        }
    },	
	plugins
}