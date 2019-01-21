import request from '@/utils/request';
import constants from '@/constants';

export async function getPairList() {
  return request(`${constants.hosts}/market/pairs`, {
    method: 'GET',
  });
}

export default {};
