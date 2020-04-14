// let app = getApp();
Page({
  data: {
    alpha: null,
    beta: null,
    gamma: null,
    direction: 'unknown',
    rotate: 'unknown',
    text: 'unknown',
  },
  onLoad() {},
  onShow() {
    const vm = this;
    wx.startDeviceMotionListening({
      interval: 'ui',
      success() {
        console.log('开始设备方向监听 成功');
      },
      fail() {
        console.log('开始设备方向监听 失败');
      },
    });
    vm.checkingMotion();
  },
  checkingMotion() {
    const vm = this;
    wx.onDeviceMotionChange(({
      alpha,
      beta,
      gamma,
    }) => {
      console.log('alpha', alpha);
      console.log('beta', beta);
      console.log('gamma', gamma);
      let direction = 'unknown';
      let rotate = 'unknown';
      let { text } = vm.data;
      if (beta < -50 && beta > -100 && Math.abs(gamma) < 45) {
        direction = '垂直向上';
      } else if (beta > 40 && beta < 100 && Math.abs(gamma) < 45) {
        direction = '垂直向下';
      }
      const old_b = Number(vm.data.beta);
      const old_g = Number(vm.data.gamma);
      if (old_g && Number(old_g) < 0 && old_b && Number(old_b) < beta) {
        text = '向右倾';
        if (old_g >= gamma) {
          // text += ' 未过半';
          rotate = Math.abs(gamma).toFixed(2);
        } else {
          // text += ' 过半';
          rotate = (180 + gamma).toFixed(2);
        }
      } else if (old_g && Number(old_g) < 0 && old_b && Number(old_b) > beta) {
        text = '向右倾';
        if (old_g <= gamma) {
          // text += ' 未过半';
          rotate = Math.abs(gamma).toFixed(2);
        } else {
          // text += ' 过半';
          rotate = (180 + gamma).toFixed(2);
        }
      } else if (old_g && Number(old_g) > 0 && old_b && Number(old_b) < beta) {
        text = '向左倾';
        if (old_g <= gamma) {
          // text += ' 未过半';
          rotate = Math.abs(gamma).toFixed(2);
        } else {
          // text += ' 过半';
          rotate = (180 - gamma).toFixed(2);
        }
      } else if (old_g && Number(old_g) > 0 && old_b && Number(old_b) > beta) {
        text = '向左倾';
        if (old_g >= gamma) {
          // text += ' 未过半';
          rotate = Math.abs(gamma).toFixed(2);
        } else {
          // text += ' 过半';
          rotate = (180 - gamma).toFixed(2);
        }
      }

      if (Math.abs(gamma) < 10) {
        rotate = Math.abs(gamma).toFixed(2);
        text = '垂直';
      }
      vm.setData({
        alpha: alpha.toFixed(2),
        beta: beta.toFixed(2),
        gamma: gamma.toFixed(2),
        direction,
        rotate,
        text,
      });
    });
  },
  onHide() {
    wx.offDeviceMotionChange(() => {
      console.log('取消设备方向监听');
    });
    wx.stopDeviceMotionListening({
      success() {
        console.log('结束设备方向监听 成功');
      },
      fail() {
        console.log('结束设备方向监听 失败');
      },
    });
  },
  onUnload() {},
});