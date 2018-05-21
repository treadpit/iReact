
class EventEmitter {
  constructor() {
    this.onEmitEvents = {};
    this.count = 0;
    this.hasOwnKey = Function.call.bind(Object.hasOwnProperty);
    this.slice = Function.call.bind(Array.prototype.slice);
  }
  /**
   * 存储订阅事件
   * @param {string} eventName 事件名称
   * @param {function} callback 回调
   * @param {number} isOne 是否为一次性订阅
   * @param {any} context 上下文
   * @returns [array] 当前储存的订阅事件
   * @memberof EventEmitter
   */
  _bind(eventName, callback, isOne, context) {
    if (typeof eventName !== 'string' || typeof callback !== 'function') {
      throw new Error('eventName需为string, callback必须是function');
    }
    if (!this.hasOwnKey(this.onEmitEvents, eventName)) {
      this.onEmitEvents[eventName] = {};
    }
    this.onEmitEvents[eventName][++this.count] = [callback, isOne, context];

    return [eventName, this.count];
  }
  _each(obj, callback) {
    for (let key in obj) {
      if (this.hasOwnKey(obj, key)) callback(key, obj[key]);
    }
  }
  _fireFunc(eventName, args) {
    if (this.hasOwnKey(this.onEmitEvents, eventName)) {
      this._each(this.onEmitEvents[eventName], (key, item) => {
        item[0].apply(item[2], args);
        if (item[1] && this.onEmitEvents[eventName]) delete this.onEmitEvents[eventName][key]; // 当为一次性触发时，触发后立刻删除
      });
    }
  }
  /**
   * 订阅事件
   * @param {string} eventName 事件名称
   * @param {function} callback 回调
   * @param {any} context 上下文
   */
  on(eventName, callback, context) {
    return this._bind(eventName, callback, 0, context);
  }
  /**
   * 订阅事件，触发一次，一次之后自动失效
   * @param {string} eventName 事件名称
   * @param {function} callback 回调
   * @param {any} context 上下文
   */
  one(eventName, callback, context) {
    return this._bind(eventName, callback, 1, context);
  }
  /**
   * 触发事件
   * @param {string} eventName 事件名称
   */
  emit(eventName) {
    setTimeout(() => {
      this._fireFunc(eventName, this.slice(arguments, 1));
    });
  }
  /**
   * 触发事件
   * @param {string} eventName 取消指定订阅事件
   */
  un(event) {
    let eventName;
    let key;
    let r = false;
    let type = typeof event;
    if (type === 'string') {
      if (this.hasOwnKey(this.onEmitEvents, event)) {
        delete this.onEmitEvents[event];
        return true;
      }
      return false;
    } else if (type === 'object') {
      eventName = event[0];
      key = event[1];
      if (this.hasOwnKey(this.onEmitEvents, eventName) && this.hasOwnKey(this.onEmitEvents[eventName], key)) {
        delete this.onEmitEvents[eventName][key];
        return true;
      }
      return false;
    } else if (type === 'function') {
      this._each(this.onEmitEvents, (key1, item1) => {
        this._each(item1, (key2, item2) => {
          if (item2[0] === event) {
            delete this.onEmitEvents[key1][key2];
            r = true;
          }
        });
      });
      return r;
    }
    return true;
  }
  /**
   * 清空所有订阅事件
   */
  clear() {
    this.onEmitEvents = {};
  }
}

export default new EventEmitter();
