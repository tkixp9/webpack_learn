module.exports = {
  plugins: [
    require('autoprefixer')({
      overrideBrowserslist: [
        ">0.2%",
        "not dead",
        "not ie <= 11",
        "not op_mini all"
      ]
    })
  ]
}
