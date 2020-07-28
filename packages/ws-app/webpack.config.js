const { merge } = require("webpack-merge");
const base = require("./script/webpack.base.config");
const dev = require("./script/webpack.dev.config");
const prod = require("./script/webpack.prod.config");

module.exports = (mode) => {
  if (mode === "production") {
    return merge(base, prod);
  } else {
    return merge(base, dev);
  }
};
