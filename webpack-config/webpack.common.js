const path = require("path");
const fs = require("fs");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { VueLoaderPlugin } = require("vue-loader");

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
                    template: `${PATH.src}/${page}`
                })
        ),
        new MiniCssExtractPlugin({
            filename: "./assets/css/[name].[hash].css",
            chunkFilename: "./assets/css/[id].[hash].css"
        }),
        new CopyWebpackPlugin([
            { from: `${PATH.src}/assets/img`, to: "assets/img" },
            { from: `${PATH.src}/assets/fonts`, to: "assets/fonts" },
            { from: `${PATH.src}/static`, to: "" }
        ]),
        new VueLoaderPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: "/node_modules/",
                loader: "babel-loader"
            },
            {
                test: /\.vue$/,
                loader: "vue-loader"
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: "../../"
                        }
                    },
                    "css-loader",
                    "resolve-url-loader",
                    "postcss-loader",
                    "sass-loader?sourceMap"
                ]
            },
            {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                loader: "file-loader",
                options: {
                    name: "./assets/fonts/[name].[ext]"
                }
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: "file-loader",
                options: {
                    name: "./assets/img/[name].[ext]"
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
