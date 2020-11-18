
import "./style";

const options = {
  data: {},
  onLoad(opt) {
    console.log("onLoad", opt);
  },
};

export default options;

Page(options);
