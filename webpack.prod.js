const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
const path = require('path');
const autoprefixer = require('autoprefixer');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const extractSass = new ExtractTextPlugin('cookie.min.css');

module.exports = merge(common[0], {
    entry: {
        main: './build.js',
    },
    plugins: [
        extractSass,
        new webpack.HashedModuleIdsPlugin(),
        new CleanWebpackPlugin(['dist']),
    ],
    output: {
        filename: 'cookie.min.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use:  extractSass.extract({
                    fallback: 'style-loader',
                    use: [{
                        loader: 'css-loader',
                        options: {
                            minimize: true
                        }
                    }, {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true,
                            plugins: function () {
                                return [autoprefixer('last 6 versions')]
                            }
                        }

                    },'resolve-url-loader','sass-loader?sourceMap']
                })

            }
        ]
    }
});
