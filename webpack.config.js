const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const webpack = require('webpack');

const IS_DEV = process.env.NODE_ENV !== 'production';

module.exports = {
  entry: {
    main: './src/index.js'
  },
  mode: IS_DEV ? 'development' : 'production',
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  devtool: IS_DEV ? 'inline-source-map' : 'source-map',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: path.join(__dirname, 'src'),
        use: 'babel-loader'
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'public/index.html')
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: process.env.ANALYZE ? 'server' : 'disabled'
    }),
    IS_DEV && new webpack.HotModuleReplacementPlugin(),
    IS_DEV && new ReactRefreshWebpackPlugin()
  ].filter(Boolean),
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  devServer: {
    hot: true,
    liveReload: false,
    port: 3000,
    historyApiFallback: true
  }
}