const path = require("path");

module.exports =  {
  entry: [
    "./js/backend.js",
    "./js/util.js",
    "./js/data.js",
    "./js/image-downloader.js",
    "./js/pin.js",
    "./js/map.js",
    "./js/form.js",
    "./js/filter.js"
  ],
  output : {
    filename: "bundle.js",
    path: path.resolve(__dirname, "js"),
    iife: true
  },
  devtool: false
};