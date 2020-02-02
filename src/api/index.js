import apis from './apis.js';
import request from '@/lib/request';

export default {
  getUserInfo() {
    return request(apis.userInfo, {id: 1});
  }
};
