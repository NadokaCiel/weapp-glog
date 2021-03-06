const app = getApp();

Page({
  data: {
    loaded: false,
    loading: false,
    page: 1,
    mode: 'box',
    articles: [],
    defaultPic: "http://a2.att.hudong.com/36/48/19300001357258133412489354717.jpg",
  },
  onLoad() {
    // this.setData({
    //   articles: Array(8).fill(1),
    // });
    this.getList();
  },
  onShow() {
  },
  changeMode(event) {
    const {
      currentTarget: {
        dataset: {
          mode,
        },
      },
    } = event;
    this.setData({
      mode,
    });
    console.log(this.data.mode);
  },
  onPullDownRefresh() {
    console.log('下拉刷新~');
    if (this.data.loading) return;
    this.setData({
      articles: [],
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
    this.getList();
  },
  getList() {
    const { page, loading } = this.data;
    if (loading) return;
    this.setData({
      loading: true,
    });
    app.api.articleList({
      data: {
        page,
      },
    })
      .then(res => {
        const articleList = res.data.list;
        if (!articleList || articleList.length == 0) {
          this.setData({
            loaded: true,
          });
          return;
        }
        this.setData({
          articles: this.data.articles.concat(articleList),
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
      url: `/pages/article/view/view?id=${id}`,
    });
  },
  onShareAppMessage() {
    return app.menuShare();
  },
  onUnload() {},
});
