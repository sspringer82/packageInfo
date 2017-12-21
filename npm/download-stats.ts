import { promisedRequest } from '../util/promised-request';

function getDownloadUrl(pkg: string, period: string) {
  if (!['last-day', 'last-week', 'last-month'].includes(period)) {
    throw new Error(`Period ${period} is not allowed`);
  }
  return `https://api.npmjs.org/downloads/point/${period}/${pkg}`;
}

export async function getDownloadStats(packageName: string) {
  const [lastDay, lastWeek, lastMonth] = await Promise.all([
    promisedRequest(getDownloadUrl(packageName, 'last-day')),
    promisedRequest(getDownloadUrl(packageName, 'last-week')),
    promisedRequest(getDownloadUrl(packageName, 'last-month')),
  ]);
  return {
    lastDay: lastDay.body,
    lastWeek: lastWeek.body,
    lastMonth: lastMonth.body,
  };
}
