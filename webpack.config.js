// "use strict";
// var webpack = require('webpack');
// var path = require('path');
// var loaders = require('./webpack.loaders');
// var HtmlWebpackPlugin = require('html-webpack-plugin');
// var DashboardPlugin = require('webpack-dashboard/plugin');
// var ExtractTextPlugin = require('extract-text-webpack-plugin');
//
// const HOST = process.env.HOST || "127.0.0.1";
// const PORT = process.env.PORT || "8888";
//
// loaders.push({
//   test: /\.scss$/,
//   loaders: ['style-loader', 'css-loader?importLoaders=1', 'sass-loader'],
//   exclude: ['node_modules']
// });
//
// module.exports = {
//   entry: [
//     'react-hot-loader/patch',
//     './src/index.jsx', // your app's entry point
//   ],
//   devtool: process.env.WEBPACK_DEVTOOL || 'eval-source-map',
//   output: {
//     publicPath: '/',
//     path: path.join(__dirname, 'public'),
//     filename: 'bundle.js'
//   },
//   resolve: {
//     extensions: ['.js', '.jsx']
//   },
//   module: {
//     loaders
//   },
//   devServer: {
//     contentBase: "./public",
//     // do not print bundle build stats
//     noInfo: true,
//     // enable HMR
//     hot: true,
//     // embed the webpack-dev-server runtime into the bundle
//     inline: true,
//     // serve index.html in place of 404 responses to allow HTML5 history
//     historyApiFallback: true,
//     port: PORT,
//     host: HOST
//   },
//   plugins: [
//     new webpack.NoEmitOnErrorsPlugin(),
//     new webpack.HotModuleReplacementPlugin(),
//     new ExtractTextPlugin({
//       filename: 'style.css',
//       allChunks: true
//     }),
//     new DashboardPlugin(),
//     new HtmlWebpackPlugin({
//       template: './src/template.html',
//       files: {
//         css: ['style.css'],
//         js: [ "bundle.js"],
//       }
//     }),
//   ]
// };

const webpack = require('webpack');
const path = require('path');
const autoprefixer = require('autoprefixer');

module.exports = {
  devtool: 'eval',
  entry: [
    './ui/theme/elements.scss',
    './ui/index.js'
  ],
  output: {
    publicPath: '/static/',
    path: path.join(__dirname, 'static'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: [
          'babel-loader'
        ]
      },
      {
        test: /\.css$/,
        loaders: [
          'style-loader',
          'css-loader'
        ]
      }, {
        test: /\.scss$/,
        exclude: /node_modules/,
        loaders: [
          'style-loader',
          {
            loader: 'css-loader',
            query: {
              sourceMap: true,
              module: true,
              localIdentName: '[local]___[hash:base64:5]'
            }
          },
          {
            loader: 'sass-loader',
            query: {
              outputStyle: 'expanded',
              sourceMap: true
            }
          },
          {
             loader: 'postcss-loader'
           }
        ]
      }
    ]
  },
  devServer: {
    historyApiFallback: true,
    proxy: {
      '/api/*': {
        target: 'http://127.0.0.1:5000'
      }
    }
  }
};
