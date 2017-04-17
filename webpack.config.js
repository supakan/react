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
    // patch hot-loader
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:8080',
    // ยังจำได้ไหม webpack-der-server เราทำได้ทั้ง hot และ inline
    // แต่เราต้องการแค่ hot module replacement
    // เราไม่ต้องการ inline ที่จะแอบทะลึ่งไป reload เพจของเรา
    // เราจึงบอกว่าใช้ hot เท่านั้นนะ
    'webpack/hot/only-dev-server',
    './ui/common/theme/elements.scss',
    './ui/client/index.js'
  ],
  output: {
    publicPath: 'http://127.0.0.1:8081/static/',
      path: path.join(__dirname, 'static'),
      filename: 'bundle.js'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: [
          {
            loader: 'babel-loader',
            query: {
              babelrc: false,
              presets: ["es2015", "stage-0", "react"]
            }
          }
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
              localIdentName: '[name]__[local]___[hash:base64:5]'
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
    hot: true,
   // เมินไปซะ ชาตินี้อย่าได้บังอาจมา reload เพจอีกเลย
   inline: false,
   historyApiFallback: true,
  //  proxy: {
  //    '/api/*': {
  //      target: 'http://127.0.0.1:5000'
  //     }
  //   }
  }
};
