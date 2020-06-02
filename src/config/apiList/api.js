import Common from './Common';
import Article from './Article';
import Quiz from './Quiz';

const getApiList = (version) => [
  ...Common(version),
  ...Article(version),
  ...Quiz(version),
];

export default getApiList;