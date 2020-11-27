const app = getApp();

const versions = [{
  tag: 'v1.1.2',
  text: '托托有了自己的头像和新的交互(*^▽^*)',
}, {
  tag: 'v1.1.1',
  text: '在后台为托托增加了动态配置的技能列表',
}, {
  tag: 'v1.1.0',
  text: '新增AI狗狗-托托，可以和托托一起愉快玩耍啦~',
}, {
  tag: 'v1.0.4',
  text: '调整了问卷多选功能的样式表现',
}, {
  tag: 'v1.0.3',
  text: '新增了问卷评分功能，可以查看问卷的评分结果',
}, {
  tag: 'v1.0.1',
  text: '新增了文章列表和问卷列表，可以查看现有的文章，进行问卷调查啦~',
}];

Page({
  data: {
    versions,
  },
  onLoad() {},
  onShow() {},
  onShareAppMessage() {
    return app.menuShare();
  },
  onUnload() {},
});