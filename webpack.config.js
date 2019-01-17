
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifiJsPlugin = require("uglifyjs-webpack-plugin");
const OptmizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const path = require('path');

module.exports = {
    watch:true,
    optimization:{
        minimizer:[
            new UglifiJsPlugin({
                cache:true,
                parallel: true,
                sourceMap: true
            }),
            new OptmizeCSSAssetsPlugin({})
        ]
    },
    entry:{ 
        main:['./src/js/index.js'],
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js'
    },
    plugins: [
        new MiniCssExtractPlugin(
            {
                filename: 'main.css',      
            }
        )
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: [
                    'style-loader',
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader',
                ]
            },
            {
                test: /\.css$/,
                use: [ 'style-loader', 'css-loader' ]
            },
        ]
    }
};