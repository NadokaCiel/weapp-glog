const app = getApp();

Page({
  data: {
    comment: '',
    transcript: {},
  },
  onLoad(opt) {
    if (!opt.id) return;
    this.getInfo(opt.id);
  },
  onShow() {
  },
  getInfo(id) {
    wx.showLoading();
    app.api.quizResult({
      restful: {
        id,
      },
    })
      .then(({ data }) => {
        const { score } = data;
        let comment = '';
        if (score < 60) {
          comment = '别灰心，相信下次的你能做的更好！';
        } else if (score < 80) {
          comment = '做得不错，你一定对这些问题十分了解！';
        } else if (score < 99) {
          comment = '做得很棒，你已经相当优秀了！';
        } else if (score === 100) {
          comment = '完美！悄悄问一句，你是不是和出题人很熟？';
        }
        this.setData({
          comment,
          transcript: data,
        });
      })
      .finally(() => {
        wx.hideLoading();
      });
  },
  onHide() {},
  onUnload() {},
});