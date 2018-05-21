function isReady(cb) {
  cb();
}

function scanQRCode(callback) {
  AlipayJSBridge.call('scan', {
    type: 'qr'
  }, (result) => {
    callback(result.qrCode);
  });
}

function setTitle(title) {
  document.addEventListener('AlipayJSBridgeReady', () => {
    if (typeof AlipayJSBridge !== 'undefined') {
      AlipayJSBridge.call('setTitle', {
        title
      });
    } else {
      // JSBridge未准备好
    }
  });
}

function openLocation() {
  return null;
}

function getLocation(successCallback, failCallback) {
  const failCb = failCallback || (() => {});
  navigator.geolocation.getCurrentPosition((pos) => {
    successCallback(pos.coords);
  }, (err) => {
    failCb(err);
  });
}

function pay(channel, options, successCallback, errorCallback = (() => {})) {
  // api参考：https://doc.open.alipay.com/docs/doc.htm?&docType=1&articleId=105591
  AlipayJSBridge.call('tradePay', {
    tradeNO: options.trade_no
  }, (result) => {
    switch (result.resultCode) {
      case '9000': // 订单支付成功
      case '8000': // 正在处理中
        successCallback();
        break;
      case '4000': // 支付失败
      case '6002': // 网络错误
      case '6001': // 用户中途取消
        errorCallback({
          res_code: 0,
          message: '支付失败，请重试'
        });
        break;
      default:
        break;
    }
  });
}

function share() {
  return null;
}

export default {
  isReady,
  scanQRCode,
  openLocation,
  getLocation,
  pay,
  share,
  setTitle
};
