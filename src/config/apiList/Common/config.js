export default function(version = '') {
  return {
    name: 'configInfo',
    interval: 2000, // 每隔2秒重试一次
    retryTimes: 3, // 重试3次
    apiName: `${version}/mini/config`, // 接口pathurl
    desc: '', // 接口描述
    method: 'post',
    params: {
      // post参数
      post: [{
        param: 'app_key', // 参数名
        isNeed: 1, // 是否必须 1 为必须、0为非必须
      }, {
        param: 'ticket',
        isNeed: 1,
      }, {
        param: 'sign',
        isNeed: 1,
      }],
    },
    // 不需要参数签名的参数字段
    signKeys: [],
  };
}