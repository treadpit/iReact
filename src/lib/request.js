import axios from 'axios';
import storage from '@/utils/storage';
import config from '@/config';

const defaultOpt = {
  method: 'POST'
};

const axiosInstance = axios.create({
  timeout: config.apiTimeout,
  validateStatus: status => status >= 200 && status < 300
});

function fetch(opts) {
  let options = opts;
  options = { ...defaultOpt, ...options };
  options.url = config.apiUrl;
  return axiosInstance(options);
}

function handleResponse(data) {
  return new Promise((resolve, reject) => {
    const { code } = data;
    if (+code === 0) {
      resolve(data.body);
    } else {
      reject();
    }
  });
}

export default opts => {
  return new Promise((resolve, reject) => {
    function success(data) {
      const promise = handleResponse(data, request, options);
      if (promise) promise.then(resolve, reject);
    }
    function request() {
      fetch(options).then(res => success(res.data), reject);
    }
    const session = storage.get('session');
    const options = { ...defaultOpt, ...opts };
    if (!session && options.login) {
      // login(request)
    } else {
      request();
    }
  });
};
