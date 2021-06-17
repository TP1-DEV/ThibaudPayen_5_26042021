const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')

module.exports = {
  entry: {
    index: './src/js/index.js',
    product: './src/js/product.js',
    order: './src/js/order.js',
    sumorder: './src/js/sumorder.js',
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].min.css',
    }),
  ],
  watch: true,
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(woff2?|eot|ttf|jpe?g|png|svg)$/,
        type: 'asset/inline',
      },
    ],
  },
  optimization: {
    minimizer: [new CssMinimizerPlugin()],
    minimize: true,
  },
}
