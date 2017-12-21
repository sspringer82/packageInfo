import { promisedRequest } from '../util/promised-request';

function getDownloadUrl(pkg: string, period: string) {
  if (!['last-day', 'last-week', 'last-month'].includes(period)) {
    throw new Error(`Period ${period} is not allowed`);
  }
  return `https://api.npmjs.org/downloads/point/${period}/${pkg}`;
}

export async function getDownloadStats(pkg: string) {
  const [lastDay, lastWeek, lastMonth] = await Promise.all([
    promisedRequest(getDownloadUrl(pkg, 'last-day')),
    promisedRequest(getDownloadUrl(pkg, 'last-week')),
    promisedRequest(getDownloadUrl(pkg, 'last-month')),
  ]);
  return {
    lastDay: lastDay.body,
    lastWeek: lastWeek.body,
    lastMonth: lastMonth.body,
  };
}
