const path = require("path");

module.exports = {
  entry: {
    index: "./src/js/index.js",
    product: "./src/js/product.js",
    order: "./src/js/order.js",
    sumorder: "./src/js/sumorder.js",
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  watch: true,
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.(woff2?|eot|ttf|jpe?g|png|svg)$/,
        type: "asset/inline",
      },
    ],
  },
};
