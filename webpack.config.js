const path = require('path');

module.exports = {
  entry: './src/index.tsx',
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devServer: {
    static: path.join(__dirname, "dist"),
    compress: true,
    port: 4000,
  },

};

// @see https://developers.google.com/web/tools/workbox/reference-docs/latest/module-workbox-webpack-plugin.InjectManifest
const WorkboxWebpackPlugin = require("workbox-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
module.exports = {
plugins: [
new CopyPlugin({
  patterns: [
    { from: "./src/favicon.ico", to: "" },
    { from: "./src/manifest.json", to: "" },
    { from: "./src/logo192.png", to: "" },
    { from: "./src/logo512.png", to: "" },
  ],
}),
new WorkboxWebpackPlugin.InjectManifest({
  swSrc: "./src/src-sw.js",
  swDest: "sw.js",
}),
]
}