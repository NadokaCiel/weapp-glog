// 问卷相关
import info from './info';
import list from './list';

const Quiz = (version) => [
  info(version),
  list(version),
];

export default Quiz;