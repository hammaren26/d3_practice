const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const isDev = process.env.NODE_ENV === "development"
const isProd = !isDev
const optimization = () => {

    const config = {
        splitChunks: {
            chunks: "all"
        }
    }

    if (isProd) {
        config.minimizer = [
            new CssMinimizerPlugin()
        ]
    }
    return config;
}

const filename = ext => isDev ? `[name].${ext}` : `[name].[fullhash].${ext}`;


const babelOptions = () => {
    return {}
}


const cssLoaders = (extra) => {
    const loaders = {
        test: /\.css$/,
        // use: ["style-loader", "css-loader"]
        // use: [MiniCssExtractPlugin.loader, "css-loader"]
        use: [
            {
                loader: MiniCssExtractPlugin.loader,
                options: {
                    // hmr: isDev,
                    // reloadAll: true,
                },
            }, "css-loader"
        ]
    }

    if (extra) {
        loaders.push(extra)
    }
    return loaders;
}


module.exports = {
    // entry: "./src/index.jsx",
    context: path.resolve(__dirname, "src"),
    stats: "errors-only",
    entry: {
        main: ["@babel/polyfill", "./index.jsx"],
        analytics: "./analytics.ts"
    },
    mode: "development",
    output: {
        filename: filename("js"),
        path: path.resolve(__dirname, "dist")
    },
    resolve: {
        extensions: [".js", ".json", ".png"],
        alias: {
            "@models": path.resolve(__dirname, "src/models"),
            "@": path.resolve(__dirname, "src")
        }
    },
    optimization: optimization(),
    // ??? когда включаю его, не минимизируются скрипты
    // minimizer: [
    //    new CssMinimizerPlugin(),
    // ],

    // devServer: {
    //    port: 8080
    // },
    devServer: {
        static: {
            directory: path.join(__dirname, "src"),
        },
        compress: true,
        port: 8080,
        open: true,
        hot: isDev
    },
    devtool: isDev ? "source-map" : '',
    plugins: [
        new HTMLWebpackPlugin({
            //не работает если используем template
            title: "Ebat Koney Ebat",
            template: "./index.html",
            minify: {
                collapseWhitespace: isProd
            }
        }),
        new CleanWebpackPlugin(),
        // new CopyPlugin([
        //    {
        //       from: path.resolve(__dirname, "src/favicon.ico"),
        //       to: path.resolve(__dirname, "dist")
        //    }
        // ])
        new CopyPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, "src/favicon.ico"),
                    to: path.resolve(__dirname, "dist/favicons")
                },
            ],
        }),
        new MiniCssExtractPlugin({
            filename: filename("css")
        })
    ],
    module: {
        rules: [
            cssLoaders(),
            {
                test: /\.(png|jpg|svg|gif)$/,
                loader: "file-loader",
                // use: ["file-loader"],
                type: "asset/resource",
                options: {
                    outputPath: "images",
                },
            },
            {
                test: /\.html$/,
                use: ["html-loader"]
            },
            {
                test: /\.(ttf|woff|woff2|eot)$/,
                use: ["file-loader"]
            },

            {
                test: /\.xml$/,
                use: ["xml-loader"]
            },

            {
                test: /\.csv$/,
                use: ["csv-loader"]
            },


            {
                test: /\.less$/,
                // use: ["style-loader", "css-loader"]
                // use: [MiniCssExtractPlugin.loader, "css-loader"]
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            // hmr: isDev,
                            // reloadAll: true,
                        },
                    },
                    "css-loader",
                    "less-loader"
                ]
            },

            {
                test: /\.s[ac]ss$/i,
                use: [
                    // Creates `style` nodes from JS strings
                    "style-loader",
                    // Translates CSS into CommonJS
                    "css-loader",
                    // Compiles Sass to CSS
                    "sass-loader",
                ],
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"]
                    }
                }
            },

            {
                test: /\.m?ts$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "babel-loader",
                        options: {
                            presets: [
                                "@babel/preset-env",
                                "@babel/preset-typescript",
                            ]
                        }
                    }
                ]
            },

            {
                test: /\.jsx$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            "@babel/preset-env",
                            "@babel/preset-react",
                        ]
                    }
                }
            }
        ]
    }
}

