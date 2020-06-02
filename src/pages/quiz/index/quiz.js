const app = getApp();
const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
Page({
  data: {
    alphabet,
    quiz: {},
    subjects: [],
    answerMap: {},
  },
  onLoad(opt) {
    if (!opt.id) return;
    this.getInfo(opt.id);
  },
  onShow() {
    // const vm = this;
    console.log(this.data.answerMap);
  },
  getInfo(id) {
    wx.showLoading();
    app.api.quizInfo({
      restful: {
        id,
      },
    })
      .then(({ data }) => {
        this.setData({
          quiz: data,
          subjects: data.subjects,
        });
      })
      .finally(() => {
        wx.hideLoading();
      });
  },
  onMultiChange(e) {
    console.log(e);
    const {
      currentTarget: {
        dataset: {
          id,
        },
      },
      detail: {
        value,
      },
    } = e;
    console.log("onMultiChange", value);
    const path = `answerMap.${id}`;
    this.setData({
      [path]: value,
    });
  },
  onSingleChange(e) {
    const {
      currentTarget: {
        dataset: {
          id,
        },
      },
      detail: {
        value,
      },
    } = e;
    console.log("onSingleChange", value);
    const path = `answerMap.${id}`;
    this.setData({
      [path]: [value],
    });
  },
  submitQuiz() {
    console.log('answerMap', this.data.answerMap);
  },
  onHide() {},
  onUnload() {},
});