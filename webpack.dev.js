const merge = require('webpack-merge');
const common = require('./webpack.common');
const path = require('path');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const webpack = require('webpack');


var devBase = {
    devtool: 'eval-source-map', // https://webpack.js.org/configuration/devtool/
    plugins: [
        new ExtractTextPlugin('css/[name].css'),
        new webpack.HotModuleReplacementPlugin(),
        new BrowserSyncPlugin(
            // BrowserSync options
            {
                // browse to http://localhost:3000/ during development
                host: 'localhost',
                port: 3001,
                open: false,
                // proxy the Webpack Dev Server endpoint
                // (which should be serving on http://localhost:3100/)
                // through BrowserSync
                server: { baseDir: [path.join(__dirname, 'src')]}
            },
            // plugin options
            {
                // prevent BrowserSync from reloading the page
                // and let Webpack Dev Server take care of this
                reload: true
            }
        )
    ],
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader',
                        {
                            loader: 'postcss-loader',
                            options: {
                                sourceMap: true,
                                plugins: function () {
                                    return [autoprefixer('last 6 versions')]
                                }
                            }

                        }, 'resolve-url-loader', 'sass-loader?sourceMap']
                })

            }

        ]
    }
};

var devWeb = merge(devBase, {
    plugins: [
        new CleanWebpackPlugin(['web/dist'])
    ]
});

var devWp = merge(devBase, {
    plugins: [
        new CleanWebpackPlugin(['wp/wp-content/themes/vacuum/dist'])
    ]
});


module.exports = [
    merge(common[0], devWeb),
    /* merge(common[1], devWp) */
];