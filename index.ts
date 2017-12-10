import { getDownloadStats } from './npm/download-stats';
import { getRepoStats } from './github/repo-stats';

(async () => {
  console.log(await getDownloadStats('gulp'));
  console.log(await getRepoStats('gulpjs', 'gulp'));
})();
