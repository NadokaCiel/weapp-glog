const app = getApp();
const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
Page({
  data: {
    alphabet,
    quiz: {},
    subjects: [],
    answerMap: {},
    userInfo: {},
  },
  onLoad(opt) {
    console.log(opt);
    let quizId = "";
    if (opt.id) {
      quizId = opt.id;
    }
    if (opt.scene) {
      const scene = decodeURIComponent(opt.scene);
      quizId = scene;
    }
    if (!quizId) return;
    this.getInfo(quizId);
  },
  onShow() {
    // const vm = this;
    console.log(this.data.answerMap);
  },
  getInfo(id) {
    const vm = this;
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
      .catch((err) => {
        console.log('catch', err);
        if (err.retcode === 42000) {
          wx.showModal({
            title: '提示',
            content: '您已经提交过本问卷啦，将为您跳转至结果页',
            showCancel: false,
            success() {
              vm.toGrade(err.data.old_id);
            },
          });
        } else {
          wx.showToast({
            title: err.msg || '问卷获取失败',
            icon: 'none',
            duration: 2000,
          });
        }
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
  bindGetUserInfo(e) {
    const vm = this;
    const {
      detail: {
        errMsg,
        userInfo,
      },
    } = e;
    if (errMsg.indexOf('fail') >= 0) {
      wx.showToast({
        title: '请同意授权后再提交问卷哦~',
        icon: 'none',
        duration: 2000,
      });
      return;
    }
    console.log('userInfo', userInfo);

    vm.setData({
      userInfo: {
        user_name: userInfo.nickName,
        user_avatar: userInfo.avatarUrl,
      },
    });

    wx.showModal({
      title: '提示',
      content: '请确认您是否已经完成问卷的全部内容~',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定');
          vm.submitQuiz();
        } else if (res.cancel) {
          console.log('用户点击取消');
        }
      },
    });
  },
  submitQuiz() {
    const vm = this;
    const {
      quiz,
      answerMap,
      subjects,
      userInfo,
    } = vm.data;
    console.log('answerMap', answerMap);
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
        ...userInfo,
        sheet: answerMap,
      },
    })
      .then(({ data }) => {
        console.log('quizCorrect', data);
        vm.toGrade(data.id);
        // wx.showToast({
        //   title: `您的得分为：${data.score}`,
        //   icon: 'none',
        //   duration: 2000,
        // });
      })
      .catch((err) => {
        console.log('catch', err);
        if (err.retcode === 42000) {
          wx.showModal({
            title: '提示',
            content: '您已经提交过本问卷啦，将为您跳转至结果页',
            showCancel: false,
            success() {
              vm.toGrade(err.data.old_id);
            },
          });
        } else {
          wx.showToast({
            title: err.msg || '提交失败',
            icon: 'none',
            duration: 2000,
          });
        }
      })
      .finally(() => {
        wx.hideLoading();
      });
  },
  toGrade(id) {
    console.log('toGrade', id);
    wx.redirectTo({
      url: `/pages/quiz/result/result?id=${id}`,
    });
  },
  onHide() {},
  onUnload() {},
});