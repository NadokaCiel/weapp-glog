// let app = getApp();

let timer = null;

Page({
  data: {
    marqueePace: 2,
    marqueeDistance: 0,
    marqueeDistance2: 0,
    size: 14,
    orientation: 'left',
    interval: 20,
    text: '这是滚动字幕这是滚动字幕这是滚动字幕这是滚动字幕结束',
    needsRolling: true,
    d1rolling: true,
    d2rolling: false,
    gap: 20, // 数值越小，间隔越短
    boxTrack: null,
    giftTrack: null,
    sparkleTrack: null,
  },
  rolling() {
    const vm = this;
    timer = setInterval(() => {
      let {
        d1rolling,
        d2rolling,
      } = vm.data;
      const {
        gap,
        length,
        barWidth,
        marqueeDistance,
        marqueeDistance2,
      } = vm.data;
      let d1 = marqueeDistance,
        d2 = marqueeDistance2;

      if (d1rolling) {
        // 第一条滚动中
        d1 = vm.data.marqueeDistance - vm.data.marqueePace;
        // console.log('第一条滚动中');

        // 判断第一条滚动完毕
        if (length + vm.data.marqueeDistance < 4) {
          d1rolling = false;
          // console.log('第一条滚动完毕');
        }

        // 当第一条滚动至快结束时，第二条开始
        if (!d2rolling && vm.data.marqueeDistance < 0
          && length - barWidth < Math.abs(vm.data.marqueeDistance) - gap) {
          d2rolling = true;
          d2 = length;
          // console.log('------第二条开始------', vm.data.marqueeDistance);
        }
      }

      if (d2rolling) {
        // 第二条滚动中
        d2 = vm.data.marqueeDistance2 - vm.data.marqueePace;
        // console.log('第二条滚动中');

        // 判断第二条滚动完毕
        if (length + vm.data.marqueeDistance2 < 4) {
          d2 = length;
          d2rolling = false;
          // console.log('第二条滚动完毕');
        }

        // 当第二条滚动至快结束时，第一条开始
        if (!d1rolling && vm.data.marqueeDistance2 < 0
          && length - barWidth < Math.abs(vm.data.marqueeDistance2) - gap) {
          d1rolling = true;
          d1 = length;
          // console.log('------第一条开始------', vm.data.marqueeDistance2);
        }
      }

      vm.setData({
        d1rolling,
        d2rolling,
        marqueeDistance: d1,
        marqueeDistance2: d2,
      });
    }, vm.data.interval);
  },
  onLoad() {
    const vm = this;
    const length = vm.data.text.length * vm.data.size;
    const { windowWidth } = wx.getSystemInfoSync();
    vm.setData({
      length,
      barWidth: windowWidth * 0.8,
      needsRolling: length > windowWidth * 0.8,
      marqueeDistance: length,
      marqueeDistance2: length,
    });
    vm.rolling();
  },
  onShow() {},
  moveOut() {
    const vm = this;
    const boxTrack = wx.createAnimation({
      duration: 400,
      timingFunction: 'easeInOut',
    });
    const giftTrack = wx.createAnimation({
      duration: 400,
      timingFunction: 'easeInOut',
    });
    const sparkleTrack = wx.createAnimation({
      duration: 400,
      timingFunction: 'easeInOut',
    });

    // 盒子动画
    boxTrack.opacity(0).width(100).height(100).step();

    // 礼物箱动画
    giftTrack.opacity(1).height(100).step();

    // 彩花动画
    sparkleTrack.opacity(1).translateY(-90).scale(1.5).step();

    vm.setData({
      boxTrack,
      giftTrack,
      sparkleTrack,
    });
  },
  onHide() {},
  onUnload() {
    clearInterval(timer);
  },
});