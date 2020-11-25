// 登录
import ticket from './ticket';
import config from './config';

const Common = () => [
  ticket(),
  config(),
];

export default Common;