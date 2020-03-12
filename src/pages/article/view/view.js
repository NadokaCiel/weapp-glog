const app = getApp();
Page({
  data: {
    article: {},
  },
  onLoad(opt) {
    console.log(opt);
    if (!opt.id) return;
    this.getInfo(opt.id);
  },
  onShow() {
  },
  getInfo(id) {
    wx.showLoading();
    app.api.articleInfo({
      restful: {
        id,
      },
    })
      .then(({ data }) => {
        this.setData({
          article: data,
        });
      })
      .finally(() => {
        wx.hideLoading();
      });
  },
  onUnload() {},
});
