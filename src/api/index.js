import apis from './apis';
import request from './../lib/request';
import { buildParams } from './../lib/params';

/**
 * 需登录的接口请求
 * @param {object} data 请求参数
 */
function postWithSession(data = {}) {
  return request({ data });
}
/**
 * 无需登录的接口请求
 * @param {object} data 请求参数
 */
// function post(data = {}) {
//   return request({ requireLogin: false, data });
// }

export default {
  getUserInfo(label) {
    return postWithSession(buildParams(apis.getUserInfo, {
      label
    }));
  },
};
