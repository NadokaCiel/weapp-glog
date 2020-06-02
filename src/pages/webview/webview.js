// const app = getApp();
Page({
  data: {
    showWebView: false,
    url: 'http://nadokaciel.cn/#/lab/garden',
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
