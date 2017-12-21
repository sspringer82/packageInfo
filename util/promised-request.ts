import * as request from 'request';
import { promisify } from 'util';

export const promisedRequest = <any>promisify(request);
