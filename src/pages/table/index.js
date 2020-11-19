import "./style";

const options = {
  data: {
    showNavi: false,
    nowMenu: {},
    menu: [
      {
        id: "chef",
        title: "大厨推荐",
      },
      {
        id: "tasty",
        title: "必点美食",
      },
      {
        id: "hot",
        title: "热销好菜",
      },
      {
        id: "chill",
        title: "下饭凉菜",
      },
    ],
  },
  onLoad(opt) {
    console.log("onLoad", opt);
  },
  onMenuScroll(e) {
    const vm = this;
    const { menu } = vm.data;
    const y = e.detail.scrollTop;

    const list = [];
    const query = wx.createSelectorQuery();
    query.select("#top-navi").boundingClientRect();
    menu.forEach((item) => {
      list.push(item.id);
      query.select(`#${item.id}`).boundingClientRect();
    });
    query.exec((res) => {
      // console.log("res", res);
      const edge = res[0].top;
      let idx;
      res
        .map((el) => {
          const miss = y + el.top - 5 - edge;
          return miss;
        })
        .forEach((top, i) => {
          if (i === 0) return;
          // console.log(i + 'top - y', top - y)
          if (top - y < 10) {
            idx = i;
          }
        });

      vm.setData({
        nowMenu: idx ? menu[idx - 1] : {},
      });

      // console.log("now menu: ", vm.data.nowMenu);
    });
  },
  onTapList() {
    this.setData({
      showNavi: false,
    });
  },
  switchNavi() {
    this.setData({
      showNavi: !this.data.showNavi,
    });
  },
  toMenu() {
    this.setData({
      showNavi: false,
    });
  },
  scrollTo(e) {
    console.log(e);
    const vm = this;
    const tag = `#${e.target.dataset.id}`;
    const query = wx.createSelectorQuery();
    // query.selectViewport().scrollOffset()
    query.select("#container").scrollOffset();
    query.select(tag).boundingClientRect();
    query.select("#top-navi").boundingClientRect();
    query.exec((res) => {
      // console.log('res', res)
      const miss = res[0].scrollTop + res[1].top - res[2].top;

      console.log('res[1].top', res[1].top);
      console.log('res[2].bottom', res[2].top);

      vm.setData({
        showNavi: false,
        scrollY: miss,
      });
    });
  },
};

export default options;

Page(options);
