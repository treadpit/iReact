import { isWechat, isAlipay } from '../../utils';
import weixin from './weixin';
import alipay from './alipay';
import EventEmitter from '../../lib/eventemitter';

let jssdk = {};

if (isWechat()) {
  jssdk = weixin;
}

if (isAlipay()) {
  jssdk = alipay;
}

export function isReady(callback) {
  jssdk.isReady && jssdk.isReady(callback);
}

export function setTitle(title) {
  EventEmitter.emit('$pageview', title);
  jssdk.setTitle && jssdk.setTitle(title);
}

export function scanQRCode(callback) {
  jssdk.scanQRCode && jssdk.scanQRCode(callback);
}

export function openLocation(name, address, lat, lng) {
  jssdk.openLocation && jssdk.openLocation(name, address, lat, lng);
}

export function getLocation(successCallback, failCallback) {
  jssdk.getLocation && jssdk.getLocation(successCallback, failCallback);
}

export function pay(channel, options, successCallback, errorCallback) {
  jssdk.pay && jssdk.pay(channel, options, successCallback, errorCallback);
}

export function share(options, successCallback, cancelCallback) {
  jssdk.share && jssdk.share(options, successCallback, cancelCallback);
}

export function updateUserInfo() {
  jssdk.updateUserInfo && jssdk.updateUserInfo();
}

export function showShareBtn(data) {
  jssdk.showShareBtn && jssdk.showShareBtn(data);
}

export function hideShareBtn() {
  jssdk.hideShareBtn && jssdk.hideShareBtn();
}
