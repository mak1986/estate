/**
 * Created by mak.punyachokchai on 5/27/2018 AD.
 */

var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/dist/'
    },
    module: {
        rules: [
            {
                test: /\.(html)$/,
                loader: 'html-loader',
                options: {
                    attrs: [':data-src']
                }
            }
        ]
    }
}