// const app = getApp();
Page({
  data: {
    showWebView: false,
    url: 'http://120.27.3.78/#/lab/garden',
  },
  onLoad() {
  },
  onShow() {
    this.setData({
      showWebView: true,
    });
  },
  onUnload() {},
});
