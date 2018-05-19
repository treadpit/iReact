/**
 * query string 转对象
 * @param {string} param query string
 */
export function parseQuery(param) {
  const pattern = /([^?&=]+)=([^&#]*)/g;
  const dict = {};
  let search = null;
  if (typeof param === 'object') {
    search = param.search;
  } else if (typeof param === 'string') {
    search = param;
  } else {
    throw new Error('参数类型非法！请传入window.loaction对象或者url字符串。');
  }
  search.replace(pattern, (rs, $1, $2) => {
    const key = decodeURIComponent($1);
    const value = decodeURIComponent($2);
    dict[key] = value;
    return rs;
  });
  return dict;
}

/**
 * 打开vconsole面板
 *
 * @export
 */
export function openDebug() {
  const parameter = queryString2Obj(window.location).jmdebug;
  if (parameter && parameter === 'true') {
    loadScript('//res.wx.qq.com/mmbizwap/zh_CN/htmledition/js/vconsole/3.0.0/vconsole.min.js', () => {
      /* eslint-disable */
      const vConsole = new VConsole();
      console.log(vConsole);
    });
  };
}

/**
 * 加载JavaScript
 *
 * @param {string} src
 * @param {function} cb
 */
function loadScript(src, cb) {
  let s;
  let t;
  let first = false;
  s = document.createElement('script');
  s.type = 'text/javascript';
  s.src = src;
  s.onload = s.onreadystatechange = function () {
    if (!first && (this.readyState === 'complete' || !this.readyState)) {
      first = true;
      cb();
    }
  };
  t = document.getElementsByTagName('script')[0];
  t.parentNode.insertBefore(s, t);
}
