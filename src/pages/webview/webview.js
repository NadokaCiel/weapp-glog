// const app = getApp();
Page({
  data: {
    showWebView: false,
    url: 'https://nadokaciel.cn/#/lab/garden', // 个人开发者暂不能使用web-view组件
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
