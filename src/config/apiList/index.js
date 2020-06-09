import vsApi from 'cnfapi-mini-vs';
import { getToken } from 'mini-auth-v1';
import { defaultSign } from 'mksign';
import conf from '../index';
import getApiList from './api';

const TICKET_ERROR_CODE = [41000];

const initData = (res) => {
  const app = getApp();
  if (app.globalData.isInit) {
    return;
  }
  console.log(res);
  if (res.data.ticket) {
    app.setTicket(res.data.ticket);
    app.storeData('openId', res.data.openid);
    app.storeData('unionId', res.data.unionid);
    app.globalData.isInit = true;
  }
};

const api = vsApi({
  baseURL: conf.domain,
  env: 'weapp', // env 取值范围：[weapp, aliapp, swan, ttapp]；weapp -- 微信小程序，aliapp -- 支付宝小程序，swan -- 百度小程序，ttapp -- 头条小程序
  appKey: conf.apiKey,
  appCode: conf.apiCode,
  apiList: getApiList(),
  resSuccessCallback(data, next) {
    // next接受3个参数
    // 第一个参数是代表error
    // 第二个参数是代表传递给 resolve 的数据
    // 第三个参数是自定义数据
    // console.log("resSuccessCallback", this);
    if (data.retcode === 200) {
      next(null, data.data, data.retcode);
    } else {
      next(
        {
          msg: data.msg,
          retcode: data.retcode,
          data: data.data,
        },
        {},
        data.retcode,
      );
    }
  },
  // 是否开启拦截器，return true时会执行resInterceptor方法
  // 所有接口公用的拦截器
  // 建议这里处理token过期的逻辑
  openResInterceptor(res) {
    return TICKET_ERROR_CODE.includes(res.retcode);
  },
  // 拦截器serverData为服务端的数据
  resInterceptor(serverData, next) {
    // 建议这里重新获取token
    // 执行next，将重新发起原请求
    // next(err, data); next接受两个参数
    // err是返回错误数据，将中止请求，
    // data为传递给接口请求的数据，比如：
    // 接口A第一次发送请求token过期，执行了拦截器，我们获取到新的token值需要传递给重试请求
    // next(null, { data: { token: 'newToken' });
    if (TICKET_ERROR_CODE.includes(serverData.retcode)) {
      getToken({
        isRefresh: true,
        scopes: [],
      })
        .then(res => {
          initData(res);
          next(null, { data: { ticket: res.data.ticket } });
        })
        .catch(e => {
          console.log('error', e);
          next(e, e);
        });
    }
  },
});

const addSign = (apiOpts, apiConf, ticket) => {
  const signKey = apiConf.signKey || [];
  const signData = {};
  let { data } = apiOpts;
  if (!data) {
    data = {};
  }
  data.app_key = conf.apiKey;
  data.ticket = ticket;
  Object.keys(data).forEach((item) => {
    if (signKey.indexOf(item) < 0 && item != 'sign') {
      signData[item] = data[item];
    }
  });
  data.sign = defaultSign(signData, [conf.apiCode]);
  return data;
};

// eslint-disable-next-line
api._before = (apiOpts, apiConf, next) => {
  const opts = apiOpts;
  getToken({
    scopes: [],
  })
    .then(res => {
      initData(res);
      opts.data = addSign(apiOpts, apiConf, res.data.ticket);
      next(opts);
    })
    .catch(e => {
      console.log('error', e);
      next(opts);
    });
};

export default api;