import Common from './Common';
import Article from './Article';

const getApiList = (version) => [
  ...Common(version),
  ...Article(version),
];

export default getApiList;