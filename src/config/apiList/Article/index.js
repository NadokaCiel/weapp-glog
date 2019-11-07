// 文章相关
import info from './info';
import list from './list';

const Article = (version) => [
  info(version),
  list(version),
];

export default Article;