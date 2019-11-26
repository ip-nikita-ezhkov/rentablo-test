const path = require('path');
const autoprefixer = require('autoprefixer');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isDev = true;
const buildDir = 'build';
const cwd = __dirname;

module.exports = (env, options) => ({
    entry: {
        index: './src/app/index.ts'
    },
    output: {
        filename: '[name].[contenthash].js',
        path: path.resolve(cwd, buildDir),
        strictModuleExceptionHandling: true,
    },
    module: {
        rules: [
            {
                test: /\.ts(x?)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'ts-loader'
                    }
                ]
            },
            {
                test: /\.scss/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [
                                autoprefixer()
                            ],
                        },
                    },
                    'sass-loader'
                ],
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json']
    },
    devtool: isDev ? false : 'source-map',
    devServer: {
        contentBase: './build',
        proxy: {
            '/api/' : {
                target : 'https://sandbox.rentablo.de/',
                secure : true,
                changeOrigin : true
            }
        }
    },
    mode: isDev ? 'development' : 'production',
    context: cwd,
    stats: options.watch ? 'normal' : 'errors-only',
    plugins: [
        new CleanWebpackPlugin({
            verbose: false,
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css',
        }),
        new HtmlWebpackPlugin({
            inject: true,
            template: 'src/index.html',
        }),
        function donePlugin() {
            this.hooks.done.tap('donePlugin', (stats) => {
                const { errors } = stats.compilation;

                if (!options.watch) {
                    if (!Array.isArray(errors) || errors.length === 0) {
                        const time = stats.endTime - stats.startTime;

                        console.log(`Build is succeeded (${time}ms)`);
                    }
                }
            });
        },
    ],
    bail: true,
});
