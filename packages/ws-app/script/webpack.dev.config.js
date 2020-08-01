const path = require("path");

module.exports = {
  mode: "development", // production
  devServer: {
    contentBase: [path.join(__dirname, "../dist"), path.join(__dirname, "../public")],
    compress: true,
    port: 8000,
    host: "0.0.0.0",
    disableHostCheck: true,
  },
  devtool: "source-map", //eval-source-map
};
