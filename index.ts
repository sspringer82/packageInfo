import { getDownloadStats } from './npm/download-stats';

(async () => {
  console.log(await getDownloadStats('gulp'));
})();
