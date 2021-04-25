const path = require('path') // 调用node.js中的路径
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')

module.exports = {
  entry: {
    index: './index.js' // 需要打包的入口文件
  },
  output: {
    filename: '[name]-[chunkhash:5].js',    // 输入的文件名是什么，生成的文件名也是什么
    path: path.resolve(__dirname, '../dist') // 指定生成的文件目录
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, '../index.html'),
      chunks: ['index'],
      inject: 'body',
      scriptLoading: 'blocking',
      minify: {
        removeComments: true, // 清除注释
        collapseWhitespace: true // 清理空格
      }
    }),
    new CleanWebpackPlugin() // 清理构建文件夹
  ],
  mode: 'development'    // 开发模式，没有对js等文件压缩，默认生成的是压缩文件
}
