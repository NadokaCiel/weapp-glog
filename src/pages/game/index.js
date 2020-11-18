
import "./style";

const IMG_ROW = 7; // 图片的行数
const IMG_COL = 16; // 每行图片的数量
const IMG_MAX = IMG_ROW * IMG_COL; // 所有图片的总数量
let lastScrollIndex = -1;
let currentImageNumber = 0;

const options = {
  data: {
    imageStyleArray: [],
    scrollContentHeight: 0,
    scrollTop: 0,
    gifOpacity: 0.8, // 透明度
  },
  onLoad() {
    console.log("onLoad");
    const res = wx.getSystemInfoSync();
    const step1 = (res.windowHeight - res.windowWidth / 750 * 1624);
    const step2 = res.windowHeight < 750 ? 35 : 0;
    const top = step1 + step2;
    const coverHeight = res.windowHeight * 50;
    const canvasHeight = res.windowWidth / 750 * 1624;
    setTimeout(() => {
      this.setData({
        top,
        canvasWidth: res.windowWidth,
        canvasHeight,
        coverHeight,
        scrollContentHeight: coverHeight - canvasHeight,
      });
      this.updateImageStyle(0);
    }, 1000);
  },
  bindScrollY(e) {
    const y = e.detail.scrollTop;
    console.log('bindScrollY', y, parseInt(this.data.scrollContentHeight / 2, 10) + 50);
    if (currentImageNumber > 2) {
      this.setData({
        gifOpacity: 0,
      });
    }
    if (lastScrollIndex >= 0 && lastScrollIndex <= this.data.scrollContentHeight) {
      this.updateImageStyle(lastScrollIndex - e.detail.scrollTop);
    }
    lastScrollIndex = e.detail.scrollTop;
  },
  bindScrollStart() {
    lastScrollIndex = -1;
  },
  updateImageStyle(n) {
    // // console.log('n = ', n);
    // let num = n;
    let num = n < 0 ? currentImageNumber += 1 : currentImageNumber -= 1;
    const itemWidth = this.data.canvasWidth;
    const itemHeight = this.data.canvasHeight;
    if (num < 0) {
      num = 0;
      currentImageNumber = 0;
      this.setData({ scrollTop: 0 });
      // // console.log("s=", this.data.scrollTop);
    }
    // // console.log('numnumnum', num);
    if (num >= IMG_MAX - 1) {
      num = IMG_MAX - 1;
      currentImageNumber = IMG_MAX - 1;
      this.setData({ scrollTop: this.data.scrollContentHeight });
      // // console.log("e=", this.data.scrollTop);
    }
    if (num >= IMG_MAX - 10) {
      this.setData({ isFinished: true });
      // // console.log("e=", this.data.scrollTop);
    } else {
      this.setData({
        isFinished: false,
      });
    }
    const rowIndex = parseInt(num / IMG_COL, 10); // 第n行
    const colIndex = num % IMG_COL; // 某一行的第n个图片的位置
    const bottom = -(IMG_ROW - rowIndex - 1) * itemHeight;
    // // console.log(`${num}-${rowIndex}-${colIndex}-h=${itemHeight}`, bottom);

    this.data.imageStyleArray[0] = `width:${this.data.canvasWidth}px;height:${this.data.canvasHeight}px;background-position: bottom ${bottom + this.data.top}px left ${-colIndex * itemWidth}px;background-size:${IMG_COL * itemWidth}px ${IMG_ROW * itemHeight}px`;
    this.setData({ imageStyleArray: this.data.imageStyleArray });
  },
};

export default options;

Page(options);
