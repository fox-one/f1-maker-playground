import request from '@/utils/request';
import constants from '../constants';

export async function queryAssets() {
  const url = `${constants.hosts}/market/assets`;
  return request(url);
}

export async function queryCurrency() {
  const url = `https://api.gbi.news/currency`;
  return request(url);
}
