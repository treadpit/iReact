import axios from 'axios';
import config from './../config/index';

const defaultRequestOptions = {
  requireLogin: true,
  method: 'POST',
  doAction: true // 默认采用底层处理弹窗和跳转
};

const _fetch = axios.create({
  timeout: config.apiTimeout,
  validateStatus: status => status >= 200 && status < 300
});

function fetch(opts) {
  let options = opts;
  options = { ...defaultRequestOptions, ...options };
  options.url = config.apiUrl;
  return _fetch(options);
};

/**
 * 发送请求
 * @param {object} opts 请求参数
 * @return {Promise} promise
 */
const request = (opts) => {
  return new Promise((resolve, reject) => {
    function success(data) {
      if (data) resolve(data);
    }
    // 实际进行请求的方法
    function doRequest(isFail) {
      // 登录或刷新 token 失败
      if (isFail) return reject();
      // const session = '';
      // if (session)
      fetch(options).then(res => success(res.data), reject);
    };
    // const session = getSession();
    const options = { ...defaultRequestOptions, ...opts };
    // if (!session && options.requireLogin) {
    // 先登录
    // } else {
    doRequest();
    // }
  });
};

export default request;
