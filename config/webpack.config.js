const path = require('path') // 调用node.js中的路径
const Webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')

const nodeEnv = process.env.NODE_ENV
const development = nodeEnv === 'development'
console.log('--- webpack --- ', nodeEnv)
module.exports = {
  mode: development ? 'development' : 'production',
  entry: {
    index: './index.js' // 需要打包的入口文件
  },
  output: {
    filename: '[name]-[chunkhash:5].js',    // 输入的文件名是什么，生成的文件名也是什么
    path: path.resolve(__dirname, '../dist') // 指定生成的文件目录
  },
  target: development ? 'web' : ['web', 'es5'], // 开发模式时，注意不影响热更新
  module: {
    rules: [
      {
        test: /\.js$/, // 匹配所有 js 文件
        exclude: /node_modules/,
        loader: 'babel-loader', // 使用 babel-loader 处理 js 文件
        options: {
          presets: [
            [
              '@babel/preset-env',
              {
                // 需要兼容到以下浏览器的什么版本
                targets: { ie: 7, edge: '17', firefox: '60', chrome: '67', safari: '11.1' }
              }
            ]
          ],
          plugins :['@babel/transform-runtime']
        }
      },
      {
        test: /\.(less|css)$/,
        use: [
          development ? { loader: 'style-loader' }  // 用来将css-loader 转换后的结果通过 style 标签追加到页面上 ,
            : MiniCssExtractPlugin.loader, // css独立打包
          {
            loader: 'css-loader', // 将 CSS 模块转换为一个 JS 模块
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'less-loader' // less 转换和加载
          },
          {
            loader: 'postcss-loader'
          }
        ]
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/,
        loader: 'url-loader',
        options: {
          limit: 10000 // 大小限制
        }
      }
    ]
  },
  plugins: [
    new Webpack.DefinePlugin({
      MY_ENV: JSON.stringify(development ? 'dev' : 'pro')
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, '../index.html'),
      chunks: ['index'], // 默认加载entry中的设置
      inject: 'body', // 插入位置
      scriptLoading: 'blocking', // script标签属性
      minify: {
        removeComments: true, // 清除注释
        collapseWhitespace: true // 清理空格
      }
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[hash].css', // 对应entry中的
      chunkFilename: '[id].[hash].css' // 未在entry中，有需要打包出来的，例如分包懒加载
    }),
    new OptimizeCssAssetsWebpackPlugin(), // 压缩css文件
    new Webpack.HotModuleReplacementPlugin(),
    new CleanWebpackPlugin() // 清理构建文件夹
  ],
  devServer: {
    contentBase: path.join(__dirname, '../dist/'), // 设置服务器访问的基本目录
    host: 'localhost', // host or ip，例如127.0.0.1、0.0.0.0
    port: 8000, // 端口
    compress: true, // gzip
    hot: true, // 热更新
    open: true, // 自动打开页面
    overlay: true, // 错误显示方式
    proxy: {
      '/users': {
        target: 'https://api.github.com',
        changeOrigin: true,
        logLevel: 'debug',
        headers: {
          Cookie: ''
        }
      }
    },
    historyApiFallback: true //  支持单页面的路由访问,也可以设置重定向的配置
  }
}
