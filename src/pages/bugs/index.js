// let app = getApp();

Page({
  data: {
    texts: ["“丝”餐厅", "“燃”全日制自助餐厅", "R-Bar", "“测试”测试餐厅测试餐厅标题长度的餐厅"],
    list: Array(100).fill(1).map((d, i) => i),
    showViewList: true,
    toView: '',
  },
  onLoad() {},
  onShow() {},
  onHide() {},
  switchList() {
    this.setData({
      showViewList: !this.data.showViewList,
    });
  },
  onPageScroll(e) {
    const vm = this;
    if (!vm.data.showViewList) return;
    const y = e.scrollTop;
    // console.log(y);
    if (y > (80)) {
      vm.setData({
        showTab: true,
      });
    } else {
      vm.setData({
        showTab: false,
      });
    }

    const list = ['list-title', 'text-android', 'text-ios'];
    const query = wx.createSelectorQuery();
    query.select('#scroll-tabs').boundingClientRect();
    query.select('#list-title').boundingClientRect();
    query.select('#text-android').boundingClientRect();
    query.select('#text-ios').boundingClientRect();
    query.exec((res) => {
      // console.log('res', res)
      const { bottom } = res[0];
      let idx;
      res.map((el) => {
        const miss = y + el.top - 10 - bottom;
        return miss;
      }).forEach((top, i) => {
        if (i === 0) return;
        // console.log(i + 'top - y', top - y)
        if (top - y < 20) {
          idx = i;
        }
      });

      vm.setData({
        toView: idx ? list[idx - 1] : '',
      });
      console.log('toView: ', vm.data.toView);
    });
  },
  onMyScroll(e) {
    const vm = this;
    if (vm.data.showViewList) return;
    const y = e.detail.scrollTop;
    // console.log(y);
    if (y > (80)) {
      vm.setData({
        showTab: true,
      });
    } else {
      vm.setData({
        showTab: false,
      });
    }

    const list = ['list-title', 'text-android', 'text-ios'];
    const query = wx.createSelectorQuery();
    query.select('#scroll-tabs').boundingClientRect();
    query.select('#list-title').boundingClientRect();
    query.select('#text-android').boundingClientRect();
    query.select('#text-ios').boundingClientRect();
    query.exec((res) => {
      // console.log('res', res)
      const { bottom } = res[0];
      let idx;
      res.map((el) => {
        const miss = y + el.top - 10 - bottom;
        return miss;
      }).forEach((top, i) => {
        if (i === 0) return;
        // console.log(i + 'top - y', top - y)
        if (top - y < 20) {
          idx = i;
        }
      });

      vm.setData({
        toView: idx ? list[idx - 1] : '',
      });
      console.log('toView: ', vm.data.toView);
    });
  },
  onUnload() {},
});