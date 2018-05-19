const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const NamedModulesPlugin = require('webpack/lib/NamedModulesPlugin');

// const HappyPack = require('happypack');
// const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');
// 构造出共享进程池，进程池中包含5个子进程
// const happyThreadPool = HappyPack.ThreadPool({ size: 5 });

const NODE_ENV = process.env.NODE_ENV || 'production';
const _DEV_ = NODE_ENV === 'development';
const config = {
  mode: 'none',
  entry: [
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
    './src/index.js'
  ],
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: _DEV_ ? '/' : process.env.STATIC,
    filename: _DEV_ ? '[name].js' : 'js/[name].[hash:8].js',
    chunkFilename: _DEV_ ? '[name].js' : 'js/[name].[chunkhash:8].js'
  },
  module: {
    rules: [
      {
        test: /\.s?[ac]ss$/,
        use: [
          _DEV_ ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.jsx?$/,
        use: ['babel-loader?cacheDirectory'],
        exclude: /node_modules/,
        include: path.resolve(__dirname, './src'),
        // enforce:'post' 把该 Loader 的执行顺序放到最后, pre，代表把 Loader 的执行顺序放到最前面
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 1024 * 10,
            fallback: 'file-loader',
          }
        }]
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: 'fonts/[name].[hash:8].[ext]'
          }
        }]
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'react demo',
      filename: 'index.html',
      template: './src/index.ejs',
    }),
    new webpack.NoEmitOnErrorsPlugin(),
  ],
  resolve: {
    modules: [path.resolve(__dirname, './node_modules')]
  },
  watch: _DEV_,
  watchOptions: {
    ignored: /node_modules/,
    aggregateTimeout: 300,
    poll: 1000
  },
};

if (_DEV_) {
  config.devtool = 'cheap-module-eval-source-map';
  config.devServer = {
    port: 8080,
    stats: 'errors-only',
    overlay: true,
    host: '0.0.0.0',
    historyApiFallback: true,
    disableHostCheck: true,
    hot: true,
    proxy: {
      '/api/v1': {
        target: 'http://xxx.com',
        pathRewrite: {'^/api/v1': ''},
        changeOrigin: true
      }
    }
  };
  config.plugins.push(new NamedModulesPlugin());
} else {
  config.devtool = 'hidden-source-map';
  config.plugins.push(new MiniCssExtractPlugin({
    filename: 'css/[name].[hash].css',
    chunkFilename: 'css/[id].[hash].css',
  }));
  config.plugins.push(new webpack.optimize.ModuleConcatenationPlugin());
}

module.exports = config;
