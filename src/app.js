/**
 * 全局
 */
import { creatMiniAuth } from 'mini-auth-v1';
import { updateApp } from 'miniapp-utils';
import conf from './config';
import api from './config/apiList';

updateApp();
console.log(process.env.ENV_DATA);
console.log(conf);
App({
  settings: conf,
  onLaunch(opt) {
    console.log('onLaunch', opt);
    creatMiniAuth({
      appid: conf.appId,
      url: `${conf.domain}/mini/ticket`, // 此处为服务端获取ticket的接口url
      appKey: conf.apiKey, // 生成签名用的app_key
      appCode: conf.apiCode, // 生成签名用的app_code
      env: 'weapp', // 目前支持微信小程序(weapp)、支付宝小程序(aliapp);
    });
    this.api = api;
  },
  onShow() {
  },
  onError(msg) {
    console.log(msg, ' -----> onError');
  },
  storeData(key, value = '') {
    this.globalData[key] = value;
    wx.setStorageSync(key, value);
  },
  getData(key) {
    return wx.getStorageSync(key);
  },
  removeData(key) {
    this.globalData[key] = '';
    wx.removeStorageSync(key);
  },
  clearAllData() {
    wx.clearStorageSync();
  },
  setTicket(value = '') {
    this.storeData('ticket', {
      value,
      expire: 6800 * 1000 + new Date().getTime(),
    });
  },
  getTicket() {
    const app = this;
    const data = app.getData('ticket');
    if (data && data.expire && data.expire > new Date().getTime()) {
      app.globalData.ticket = data.value;
      app.globalData.ticketExpire = data.expire;
      return data.value;
    }
    return null;
  },
  menuShare() {
    return {
      title: 'ciel的个人实验室',
      path: `/pages/user/info?channel=share`,
      imageUrl: 'https://nadokaciel.cn/public/uploads/1606375705796nuxs.jpg',
    };
  },
  globalData: {
    initData: null,
  },
});
