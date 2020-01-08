const path = require('path')

module.exports = {
  entry: {
    content: './src/js/main.js',
    testwin: './src/js/testwin-pre.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, './src/js/')
  }
}