import { isAndroid, isIos } from '../../utils';

function isReady(cb) {
  wx.ready(cb);
}

function scanQRCode(callback) {
  wx.scanQRCode({
    needResult: 1,
    scanType: [ 'qrCode' ],
    success: (result) => {
      callback(result.resultStr);
    }
  });
}

function setTitle(title) {
  // no-op;
  if (isAndroid()) {
    document.title = title;
  } else if (isIos()) {
    const body = document.body;
    document.title = title; // hack在微信等webview中无法修改document.title的情况
    const $iframe = document.createElement('iframe');
    $iframe.src = '//hd.ankerjiedian.com/favicon.png'; // // cd.jumei.com/favicon.ico
    $iframe.style.display = 'none';
    $iframe.onload = () => {
      setTimeout(() => {
        $iframe.onload = null;
        body.removeChild($iframe);
      }, 0);
    };
    body.appendChild($iframe);
  }
}

function openLocation(name, address, lat, lng) {
  wx.openLocation({
    latitude: lat,
    longitude: lng,
    name,
    address,
    scale: 16
  });
}

function getLocation(successCallback, failCallback) {
  const failCb = failCallback || (() => { });
  wx.ready(() => {
    wx.getLocation({
      type: 'gcj02',
      success: (resp) => {
        const result = resp || {};
        successCallback(result);
      },
      fail: failCb
    });
  });
}

function pay(channel, options, successCallback, errorCallback) {
  wx.chooseWXPay({
    ...options,
    success: (res) => {
      if (res.errMsg === 'chooseWXPay:ok') {
        // 支付成功
        successCallback();
      } else {
        errorCallback();
      }
    },
    cancel: () => {
      errorCallback();
    }
  });
}

function share(options, successCallback, cancelCallback) {
  wx.ready(() => {
    const { title, link, imageUrl, desc } = options;
    wx.onMenuShareTimeline({
      title: title || '',
      link: link || '',
      imgUrl: imageUrl || '',
      success: successCallback,
      cancel: cancelCallback
    });
    wx.onMenuShareAppMessage({
      title: title || '',
      link: link || '',
      desc: desc || '',
      imgUrl: imageUrl || '',
      success: successCallback,
      cancel: cancelCallback
    });
  });
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
