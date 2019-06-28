const path = require("path");
const fs = require("fs");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const PATH = {
    src: path.join(__dirname, "../src"),
    dist: path.join(__dirname, "../dist")
};

const PAGES = fs
    .readdirSync(PATH.src)
    .filter(fileName => fileName.endsWith(".html"));

module.exports = {
    entry: {
        app: `${PATH.src}/js/index.js`
    },
    output: {
        filename: "js/[name].js",
        path: PATH.dist
    },
    plugins: [
        new CleanWebpackPlugin(),
        ...PAGES.map(
            page =>
                new HtmlWebpackPlugin({
                    template: `${PATH.src}/${page}`,
                    filename: `./${page}`
                })
        ),
        new MiniCssExtractPlugin({
            filename: "css/[name].[hash].css",
            chunkFilename: "[id].[hash].css"
        }),
        new CopyWebpackPlugin([
            { from: `${PATH.src}/assets/img`, to: "assets/img" },
            { from: `${PATH.src}/assets/fonts`, to: "assets/fonts" },
            { from: `${PATH.src}/static`, to: "" }
        ])
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: "/node_modules/",
                loader: "babel-loader"
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "postcss-loader",
                    "sass-loader"
                ]
            },
            {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                loader: "file-loader",
                options: {
                    name: "[name].[ext]"
                }
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: "file-loader",
                options: {
                    name: "[name].[ext]"
                }
            }
        ]
    },
    optimization: {
        splitChunks: {
            chunks: "initial"
        }
    }
};
