export function isIos() {
  return !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
}

export function isAndroid() {
  return /Android/i.test(navigator.userAgent) || /Linux/i.test(navigator.userAgent);
}

export function isWechat() {
  return /MicroMessenger/i.test(navigator.userAgent);
}

export function isAlipay() {
  return /AlipayClient/i.test(navigator.userAgent);
}

/**
 * 是否是微信小程序H5环境
 */
export function isWxapp() {
  return window.__wxjs_environment === 'miniprogram'; // true
}

/**
 * 当前是否为支付宝小程序
 *
 * @export
 * @returns {Bloolean}
 */
export function isAliApp() {
  return isAlipay() && /MiniProgram/i.test(navigator.userAgent);
}

/* 判断对象是否为空对象
 * @param {object} o
 */
export function isEmptyObject(o) {
  if (typeof o !== 'object') {
    return false;
  }
  for (let i in o) {
    return false;
  }
  return true;
}

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
  const parameter = parseQuery(window.location).d;
  if (parameter && +parameter === 1) {
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
export function loadScript(src, cb) {
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

/**
 * 使用Cookie名称获取cookie值
 * 此处无法获取跨域的cookie
 * @export
 * @param {string} name Cookie名称
 * @returns {string|null}
 */
export function getCookieByName(name) {
  const pattern = RegExp(`${name}=.[^;]*`);
  const matched = document.cookie.match(pattern);
  if (matched) {
    const cookie = matched[0].split('=');
    return cookie[1];
  }
  return null;
}

/**
 * 删除所有Cookie
 * @export
 */
export function deleteAllCookies() {
  const cookies = document.cookie.split(';');

  for (let i = 0; i < cookies.length; i += 1) {
    const cookie = cookies[i];
    const eqPos = cookie.indexOf('=');
    const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT`;
  }
}

/**
* 生成UUID AA-A-A-A-AAA
* @return {string} guuid
*/
export function generateUUID() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1)
      .toUpperCase();
  }
  return `${s4() + s4()}-${s4()}-${s4()}-${
    s4()}-${s4()}${s4()}${s4()}`;
}

/**
 * 倒计时格式化
 * @param {number} countTime  倒计时当前时间
 * @param {boolean} millisecond 是否格式化为毫秒
 */
export function countDownFormat(countTime, millisecond) {
  // const t = countTime * 1000; // ms
  const t = +countTime; // m
  let d = Math.floor(t / 86400);
  let h = Math.floor((t - (d * 86400)) / 3600);
  let m = Math.floor((t - (d * 86400) - (h * 3600)) / 60);
  let s = Math.floor(t - (d * 86400) - (h * 3600) - (m * 60));
  d = (d ? `${d}天` : '');
  h = (h > 9 ? h : `0${h}`);
  m = (m > 9 ? m : `0${m}`);
  s = (s > 9 ? s : `0${s}`);
  if (millisecond) {
    const ts = countTime - (d * 86400) - (h * 3600) - (m * 60) - (s);
    const ms = Math.floor(ts / 100);
    return `${d}${h}:${m}:${s}.${ms}`;
  }
  if (d > 0) {
    return `${d}${h}:${m}:${s}`;
  }
  return `${h}:${m}:${s}`;
}

/**
 * url 字符串转对象
 * @param {string} param window.loaction对象或者url字符串
 * @returns
 */
export function query2Obj(param) {
  const pattern = /([^?&=]+)=([^&#]*)/g;
  const dict = {};
  let search = null;
  if (typeof param === 'object' && param instanceof Location) {
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
 * 对象转为 query 字符串
 * @param {object} obj
 */
export function obj2String(obj) {
  if (Object.prototype.toString.call(obj) !== '[object Object]') {
    console.warn('obj2String 方法参数类型必须为 object');
    return '';
  }
  let str = '';
  for (let k in obj) {
    if (typeof obj[ k ] !== 'object') {
      str += `${k}=${obj[ k ]}&`;
    } else if (Object.prototype.toString.call(obj) !== '[object Array]') {
      str += `${k}=${JSON.stringify(obj[ k ])}&`;
    }
  }
  return str.replace(/&$/, '');
}
