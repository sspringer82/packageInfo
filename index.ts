import { getDownloadStats } from './npm/download-stats';
import { getRepoStats } from './github/repo-stats';
import { getMetaData } from './npm/meta';

(async () => {
  console.log(await getDownloadStats('gulp'));
  console.log(await getRepoStats('gulpjs', 'gulp'));
  console.log(await getMetaData('gulp'));
})();

process.on('unhandledRejection', rejection => console.log(rejection));
