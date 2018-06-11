module.exports = {
  plugins: {
    // 需要使用的插件列表
    'postcss-import': {},
    'postcss-cssnext': {},
    'postcss-pxtorem': {
      rootValue: 32,
      unitPrecision: 5,
      propList: [ '*' ],
      selectorBlackList: [],
      replace: true,
      mediaQuery: false,
      minPixelValue: 0
    }
  }
};
