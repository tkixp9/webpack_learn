const path = require('path') // 调用node.js中的路径
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')

module.exports = {
  entry: {
    index: './index.js' // 需要打包的入口文件
  },
  output: {
    filename: '[name]-[chunkhash:5].js',    // 输入的文件名是什么，生成的文件名也是什么
    path: path.resolve(__dirname, '../dist') // 指定生成的文件目录
  },
  module: {
    rules: [
      {
        test: /\.(less|css)$/,
        use: [
          // { loader: 'style-loader' // 用来将css-loader 转换后的结果通过 style 标签追加到页面上 },
          MiniCssExtractPlugin.loader, // css独立打包
          {
            loader: 'css-loader', // 将 CSS 模块转换为一个 JS 模块
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'less-loader' // less 转换和加载
          }
        ]
      },
    ]
  },
  plugins: [
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
      filename:  '[name].[hash].css' , // 对应entry中的
      chunkFilename: '[id].[hash].css' // 未在entry中，有需要打包出来的，例如分包懒加载
    }),
    new OptimizeCssAssetsWebpackPlugin(), // 压缩css文件
    new CleanWebpackPlugin() // 清理构建文件夹
  ],
  mode: 'development'    // 开发模式
}
