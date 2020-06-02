// 问卷相关
import info from './info';
import list from './list';
import correct from './correct';

const Quiz = (version) => [
  info(version),
  list(version),
  correct(version),
];

export default Quiz;