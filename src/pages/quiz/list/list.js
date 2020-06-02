const app = getApp();

Page({
  data: {
    loaded: false,
    loading: false,
    page: 1,
    quizs: [],
    defaultPic: "http://a2.att.hudong.com/36/48/19300001357258133412489354717.jpg",
  },
  onLoad() {
    // this.setData({
    //   quizs: Array(8).fill(1),
    // });
    this.getList();
  },
  onShow() {
  },
  onPullDownRefresh() {
    console.log('下拉刷新~');
    if (this.data.loading) return;
    this.setData({
      quizs: [],
      page: 1,
      loaded: false,
    });
    this.getList();
  },
  onReachBottom() {
    console.log('到底啦~');
    if (this.data.loaded) {
      return;
    }
    this.setData({
      page: this.data.page + 1,
    });
    // this.getList();
  },
  getList() {
    const { page, loading } = this.data;
    if (loading) return;
    this.setData({
      loading: true,
    });
    app.api.quizList({
      data: {
        page,
      },
    })
      .then(res => {
        const quizList = res.data.list;
        if (!quizList || quizList.length == 0) {
          this.setData({
            loaded: true,
          });
          return;
        }
        this.setData({
          quizs: this.data.quizs.concat(quizList),
        });
      })
      .finally(() => {
        this.setData({
          loading: false,
        });
        wx.stopPullDownRefresh();
      });
  },
  toView(e) {
    console.log(e);
    const {
      currentTarget: {
        dataset: {
          id,
        },
      },
    } = e;
    console.log('id', id);
    wx.navigateTo({
      url: `/pages/quiz/index/quiz?id=${id}`,
    });
  },
  onUnload() {},
});
