import storage from '@/utils/storage';
import { isEmptyObject, obj2String } from '@/utils';

export function buildOptions(apiOpt, opts = {}) {
  const api = Object.assign({}, apiOpt);
  if (isEmptyObject(api)) return;
  if (api.login) {
    const session = storage.get('session');
    if (session) {
      opts.access_token = session;
    }
  }
  if (!isEmptyObject(opts)) {
    if (api.method === 'POST') {
      return Object.assign({}, api, {
        data: opts,
      }, {
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        }
      });
    } else {
      let url = obj2String(opts);
      if (/\?.+=/.test(api.url)) {
        api.url = `${api.url}&${url}`;
      } else {
        api.url = `${api.url}?${url}`;
      }
      return Object.assign({}, api);
    }
  }
  return api;
};
