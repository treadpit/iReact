export default {
  get: item => JSON.parse(window.localStorage.getItem(item)),
  set: (key, value) => window.localStorage.setItem(key, JSON.stringify(value)),
  remove: item => window.localStorage.removeItem(item),
  clear: () => window.localStorage.clear()
};
