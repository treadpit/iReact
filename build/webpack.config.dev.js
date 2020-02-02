const Merge = require('webpack-merge');
const commonConfig = require('./webpack.config.common');

const config = Merge({}, commonConfig);
config.devtool = 'cheap-module-eval-source-map';
config.devServer = {
  port: 8080,
  index: 'index.html',
  stats: 'errors-only',
  overlay: true,
  host: '0.0.0.0',
  historyApiFallback: { index: '/index.html' },
  disableHostCheck: true,
  proxy: {
    '/api/v1': {
      target: 'http://isfeer.com',
      pathRewrite: { '^/api/v1': '' },
      changeOrigin: true
    }
  }
};

module.exports = config;
