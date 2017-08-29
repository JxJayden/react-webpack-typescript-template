const webpack = require('webpack')
const path = require('path')

const baseConfig = {
    entry: './src/index.js',
    output: {
        path: path.join(__dirname, "dist"),
        filename: 'bundle.js'
    },
    module: {
        rules: [{
            test: /\.less$/,
            use: [
                "style-loader", "css-loader", "less-loader"
            ]
        }]
    },
    resolve: {
        extensions: [".js"]
    }
}

module.exports = (env = 'dev') => {
    if (env.indexOf('prod') > -1) {
        env = 'production'
    }
    if (env.indexOf('dev') > -1) {
        env = 'development'
    }
    const plugins = [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(env)
            }
        })
    ]

    if (env === 'development') {
        const devConfig = {
            plugins,
            devtool: 'source-map',
            devServer: {
                contentBase: path.join(__dirname, "dist"),
                compress: true,
                open: false,
                port: 9900,
                historyApiFallback: true,
                overlay: {
                    warnings: true,
                    errors: true
                }
            }
        }
        baseConfig.module.rules.push({
            test: /\.js$/,
            use: [{
                loader: "babel-loader"
            }]
        })
        return Object.assign(baseConfig, devConfig)
    } else if (env === 'production') {
        plugins.push(new webpack.optimize.UglifyJsPlugin())
        const prodConfig = {
            plugins,
            entry: ['babel-polyfill', './dist/src/index.js']
        }
        baseConfig.module.rules.push({
            test: /\.js$/,
            use: [{
                loader: "babel-loader",
                options: {
                    presets: ['es2015', 'stage-0', 'stage-1', 'stage-2', 'stage-3']
                }
            }]
        })
        return Object.assign(baseConfig, prodConfig)
    }
}