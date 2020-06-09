// 问卷相关
import info from './info';
import list from './list';
import correct from './correct';
import result from './result';

const Quiz = (version) => [
  info(version),
  list(version),
  correct(version),
  result(version),
];

export default Quiz;