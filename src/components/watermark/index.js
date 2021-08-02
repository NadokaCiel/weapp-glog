Component({
  properties: {
    // 是否显示水印
    showMark: {
      type: Boolean,
      value: true,
    },
    // token内容
    token: {
      type: String,
      value: 'testtoken',
    },
    // token颜色
    tokenColor: {
      type: String,
      value: 'rgba(120, 120, 120, 0.8)',
    },
    // token字号
    tokenSize: {
      type: String,
      value: '24rpx',
    },
    // 水印内容
    mark: {
      type: String,
      value: 'testmark',
    },
    // 水印颜色
    color: {
      type: String,
      value: 'rgba(120, 120, 120, 0.4)',
    },
    // 水印字号
    size: {
      type: String,
      value: '28rpx',
    },
    // 每行几个水印
    row: {
      type: Number,
      value: 4,
    },
    // 水印的总行数
    column: {
      type: Number,
      value: 6,
    },
    // 水印的旋转角度，单位deg
    rotate: {
      type: Number,
      value: -30,
    },
    // 水印的整体位置偏移 x
    xoffset: {
      type: String,
      value: '-15%',
    },
    // 水印的整体位置偏移 y
    yoffset: {
      type: String,
      value: '0',
    },
    // 水印的层级
    zindex: {
      type: Number,
      value: 999,
    },
  },
  data: {
  },
  methods: {
    fake() {},
  },
});