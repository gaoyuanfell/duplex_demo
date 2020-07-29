const path = require("path");

module.exports = {
  mode: "development", // production
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 8000,
    // publicPath: path.join(__dirname, "assets"),
  },
  devtool: "source-map", //eval-source-map
};
