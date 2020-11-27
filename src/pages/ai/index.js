import "./style";
import { getToken } from 'mini-auth-v1';

const app = getApp();
const plugin = requirePlugin("chatbot");
// const defaultList = ["你是谁？",
//   "听点音乐",
//   "打开菜谱",
//   "收起菜谱",
//   "北京天气怎么样",
//   "上海今天有雨吗",
//   "中午吃啥呢",
//   "你知道如何排解压力吗",
//   "法国国土面积是多少",
//   "世界最高峰",
// ];

const options = {
  data: {
    flag: false,
  },
  onLoad(opt) {
    console.log("onLoad", opt);
    this.initAI();
  },
  onShow() {},
  initAI() {
    wx.showLoading();
    app.api.configInfo().then(({ data }) => {
      const list = data.ai_option;
      const { avatar = 'https://nadokaciel.cn/public/uploads/16063786679124vpk.jpeg' } = data;
      getToken({
        scopes: [],
      }).then(res => {
        console.log('data: ', res.data.openid);
        plugin.init({
          appid: "ja5HlVZqesjRcgVZLKToc6qfl1slKH",
          openid: res.data.openid, // 小程序的openid，必填项
          userHeader: "", // 用户头像
          userName: "", // 用户昵称
          textToSpeech: false,
          guideList: list,
          robotHeader: avatar,
          welcome: ["你好~~", "我是AI狗狗-托托，很高兴认识你😊！", "我会很多技能哦，点击下方的气泡就知道啦~"],
          success: (info) => {
            wx.hideLoading();
            console.log('AI init success: ', info);
            this.setData({
              flag: true,
            });
          },
          fail: (error) => {
            console.log('AI init failed: ', error);
          },
        });
      }).catch(e => {
        console.log('error', e);
      });
    }).catch(err => {
      wx.hideLoading();
      wx.showToast({
        title: err.msg || "托托失踪了QAQ！过会儿再来看看吧...",
        icon: "none",
        duration: 2000,
      });
    });
  },
  onShareAppMessage() {
    return {
      title: '我是AI狗狗-托托，来和我聊天吧(*^▽^*)',
      path: `/pages/ai/index?channel=share`,
      imageUrl: 'https://nadokaciel.cn/public/uploads/1606375705796nuxs.jpg',
    };
  },
  getQueryCallback(e) {
    console.log(e.detail);
  },
};

export default options;

Page(options);
