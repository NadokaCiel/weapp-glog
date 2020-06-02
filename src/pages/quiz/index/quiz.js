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
    console.log("onMultiChange", value.sort());
    const path = `answerMap.${id}`;
    this.setData({
      [path]: value.sort(),
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
    const { quiz, answerMap, subjects } = this.data;
    console.log('answerMap', answerMap);
    // const answer = [];
    // Object.keys(answerMap).forEach(key => {

    //   answer.push({
    //     id: key,
    //     answer: answerMap[key],
    //   });
    // });
    if (Object.keys(answerMap).length < subjects.length) {
      wx.showToast({
        title: '问卷未完成哦~',
        icon: 'none',
        duration: 2000,
      });
      return;
    }
    wx.showLoading();
    app.api.quizCorrect({
      restful: {
        id: quiz.id,
      },
      data: {
        sheet: answerMap,
      },
    })
      .then(({ data }) => {
        console.log('quizCorrect', data);
        wx.showToast({
          title: `您的得分为：${data.score}`,
          icon: 'none',
          duration: 2000,
        });
      })
      .finally(() => {
        wx.hideLoading();
      });
  },
  onHide() {},
  onUnload() {},
});