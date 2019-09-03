const app = getApp();
Page({
  data: {
    loaded: false,
    loading: false,
    page: 1,
    mode: 'list',
    articles: [1, 3],
  },
  onLoad() {},
  onShow() {},
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
      page: 1,
      loaded: false,
    });
    // this.getList();
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
      });
  },
  onUnload() {},
});
