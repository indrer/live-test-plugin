const path = require('path')

module.exports = {
  entry: './src/js/main.js',
  output: {
    filename: 'content.js',
    path: path.resolve(__dirname, './src/js/')
  }
}
