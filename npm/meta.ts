import { NpmMeta } from './meta.model';
import { promisedRequest } from '../util/promised-request';

function getDownloadUrl(packageName: string) {
  return `https://registry.npmjs.org/${packageName}`;
}

export async function getMetaData(packageName: string): Promise<NpmMeta> {
  const response = await promisedRequest(getDownloadUrl(packageName));
  const allMeta = JSON.parse(response.body);
  const latestVersion = allMeta['dist-tags'].latest;
  require('fs').writeFileSync('foo', JSON.stringify(allMeta));
  const latestVersionInfo = {
    latestNumOfDeps: Object.keys(allMeta.versions[latestVersion].dependencies)
      .length,
    latestNumOfDevDeps: Object.keys(
      allMeta.versions[latestVersion].devDependencies,
    ).length,
    latestDeprecated: !!allMeta.versions[latestVersion].deprecated,
  };
  const metaData = new NpmMeta(
    allMeta.name,
    latestVersion,
    Object.keys(allMeta.versions).length,
    allMeta.time.modified,
    allMeta.license,
    allMeta.repository.url,
    allMeta.homepage,
    latestVersionInfo.latestNumOfDeps,
    latestVersionInfo.latestNumOfDevDeps,
    latestVersionInfo.latestDeprecated,
  );
  return metaData;
}
