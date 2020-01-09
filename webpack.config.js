const path = require('path')

module.exports = {
  entry: './src/js/main.js',
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  output: {
    filename: 'content.js',
    path: path.resolve(__dirname, './src/js/')
  }
}
