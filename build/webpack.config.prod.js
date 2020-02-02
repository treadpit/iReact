const Merge = require('webpack-merge');
const WebpackStylish = require('webpack-stylish');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');
const RemoveSourceWebpackPlugin = require('remove-source-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const commonConfig = require('./webpack.config.common');

const config = Merge({}, commonConfig);
config.stats = 'none';
config.module.rules[0].use = [
  {
    loader: MiniCssExtractPlugin.loader
  },
  {
    loader: 'css-loader',
    options: { minimize: true }
  },
  'postcss-loader',
  'sass-loader'
];
config.module.rules[1].use = [
  {
    loader: MiniCssExtractPlugin.loader
  },
  {
    loader: 'css-loader',
    options: { minimize: true }
  },
  'postcss-loader'
];
config.plugins.push(
  new ScriptExtHtmlWebpackPlugin({
    inline: [/runtime\.[a-z0-9]{8}\.js$/, /styles\.[a-z0-9]{8}\.js$/],
    prefetch: {
      chunks: 'async',
      test: /commons\.[a-z0-9]{8}\.(js|css)$/
    },
    preload: {
      chunks: 'initial',
      test: [/vendors\.[a-z0-9]{8}\.js$/, /main\.[a-z0-9]{8}\.js$/]
    }
  }),
  new MiniCssExtractPlugin({
    filename: 'css/[name].[contenthash:8].css',
    chunkFilename: 'css/[name].[contenthash:8].css'
  }),
  new OptimizeCssAssetsPlugin({
    cssProcessorOptions: {
      zindex: false,
      normalizeUrl: false,
      discardUnused: false,
      mergeIdents: false,
      reduceIdents: false,
      autoprefixer: false
    }
  }),
  new RemoveSourceWebpackPlugin([
    /runtime\.[a-z0-9]{8}\.js.map$/,
    /styles\.[a-z0-9]{8}\.js\.map$/
  ]),
  new ParallelUglifyPlugin({
    uglifyJS: {
      output: {
        comments: false,
      },
      warnings: true,
      compress: {
        drop_console: true,
        collapse_vars: true,
        reduce_vars: true,
      }
    },
    cacheDir: '',
    sourceMap: false
  }),
  new WebpackStylish()
);
config.optimization = {
  runtimeChunk: { name: 'runtime' },
  splitChunks: {
    chunks: 'all',
    cacheGroups: {
      commons: {
        minChunks: 2,
        name: 'commons',
        reuseExistingChunk: true
      },
      vendors: {
        priority: 1,
        name: 'vendors',
        chunks: 'initial',
        test: /[\\/]node_modules[\\/]/
      },
      styles: {
        priority: 2,
        enforce: true,
        name: 'styles',
        chunks: 'initial',
        test: /\.(css|scss)$/
      }
    }
  }
};

module.exports = config;
