const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const BrotliPlugin = require('brotli-webpack-plugin');
const CompressionsPlugin = require('compression-webpack-plugin');
const webpack = require('webpack');

const IS_DEV = process.env.NODE_ENV !== 'production';

const APP_PATH = path.resolve(__dirname, 'src/client');

module.exports = {
  entry: APP_PATH,
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  mode: IS_DEV ? 'development' : 'production',
  devtool: IS_DEV ? 'inline-source-map' : 'source-map',
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        include: path.join(__dirname, 'src/client'),
        use: 'babel-loader',
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin({cleanStaleWebpackAssets: false}),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'public/index.html'),
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: process.env.ANALYZE ? 'server' : 'disabled',
    }),
    !IS_DEV &&
      new CompressionsPlugin({
        filename: '[name].gz',
        algorithm: 'gzip',
        test: /\.(js|css|html)$/,
        minRatio: 0.7,
      }),
    !IS_DEV &&
      new BrotliPlugin({
        asset: '[file].br',
        test: /\.(js|css|html)$/,
        minRatio: 0.7,
      }),
    IS_DEV && new webpack.HotModuleReplacementPlugin(),
    IS_DEV && new ReactRefreshWebpackPlugin(),
  ].filter(Boolean),
  resolve: {
    extensions: ['.js', '.jsx', '.tsx', '.ts', '.json'],
  },
  devServer: {
    hot: true,
    liveReload: false,
    port: 3000,
    historyApiFallback: true,
  },
};
