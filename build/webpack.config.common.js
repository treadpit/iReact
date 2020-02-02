const path = require('path');
const HappyPack = require('happypack');
const WebpackBar = require('webpackbar');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const DefinePlugin = require('webpack/lib/DefinePlugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;

const NODE_ENV = process.env.NODE_ENV || 'production';
const NEED_ANALYZ = +process.env.NEED_ANALYZ === 1;
const _DEV_ = NODE_ENV === 'development';
const STATIC_ENV = process.env.MODE; // 静态资源部署环境

const resolve = dir => path.resolve(__dirname, dir);

const CDN = {
  dev: 'https://isfeer.com/dev/',
  pub: 'https://isfeer.com/pub/',
  prod: 'https://isfeer.com/'
};
let config = {
  mode: NODE_ENV,
  entry: './src/index.js',
  output: {
    path: resolve('../dist'),
    publicPath: STATIC_ENV ? CDN[STATIC_ENV] : '/',
    filename: _DEV_ ? '[name].js' : 'js/[name].[chunkhash:8].js',
    chunkFilename: _DEV_ ? '[name].js' : 'js/[name].[chunkhash:8].js'
  },
  watch: true,
  watchOptions: {
    ignored: /node_modules/,
    aggregateTimeout: 300,
    poll: 1000
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ['happypack/loader?id=scss']
      },
      {
        test: /\.css/,
        use: ['happypack/loader?id=css']
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: ['happypack/loader?id=babel']
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: 'images/[name].[hash:8].[ext]'
            }
          }
        ]
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: 'fonts/[name].[hash:8].[ext]'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new WebpackBar(),
    new HtmlWebpackPlugin({
      title: 'iReact demo',
      filename: 'index.html',
      template: 'src/index.ejs'
    }),
    new HappyPack({
      id: 'babel',
      loaders: ['babel-loader?cacheDirectory']
    }),
    new HappyPack({
      id: 'scss',
      loaders: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
    }),
    new HappyPack({
      id: 'css',
      loaders: ['style-loader', 'css-loader', 'postcss-loader']
    }),
    new DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(NODE_ENV)
      }
    })
  ],
  resolve: {
    extensions: ['.js', '.json'],
    modules: ['./src/components', 'node_modules'],
    alias: {
      '@': resolve('../src')
    }
  }
};

if (NEED_ANALYZ) {
  config.plugins.push(new BundleAnalyzerPlugin({
    analyzerMode: 'server',
    analyzerHost: '127.0.0.1',
    analyzerPort: 8889,
    reportFilename: 'report.html',
    defaultSizes: 'parsed',
    openAnalyzer: true,
    generateStatsFile: false,
    statsFilename: 'stats.json',
    statsOptions: null,
    logLevel: 'info'
  }));
}

module.exports = config;
