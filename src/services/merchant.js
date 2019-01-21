import request from '@/utils/request';
import constants from '../constants';
import { getToken, getMerchantBrokerId } from '@/utils/authority';

export async function logoutAccount() {
  const token = await getToken();
  const auth = `Bearer ${token}`;
  const headers = {
    Authorization: auth,
  };

  return request(`${constants.hosts}/api/v1/merchants/logout`, {
    method: 'DELETE',
    headers,
  });
}

export async function updateMerchant(params) {
  const token = await getToken();
  const brokerId = await getMerchantBrokerId();
  const auth = `Bearer ${token}`;
  const headers = {
    Authorization: auth,
  };

  return request(`${constants.hosts}/api/v1/merchants/info/${brokerId}`, {
    method: 'PUT',
    body: params,
    headers,
  });
}

export async function updateAccount(params) {
  const token = await getToken();
  const auth = `Bearer ${token}`;
  const headers = {
    Authorization: auth,
  };
  return request(`${constants.hosts}/api/v1/merchants/account`, {
    method: 'PUT',
    body: params,
    headers,
  });
}

export async function changePassword(params) {
  const token = await getToken();
  const auth = `Bearer ${token}`;
  const headers = {
    Authorization: auth,
  };
  return request(`${constants.hosts}/api/v1/merchants/password`, {
    method: 'PUT',
    body: params,
    headers,
  });
}

export async function accountLogin(params) {
  const url = `${constants.hosts}/admin/login`;

  return request(url, {
    method: 'POST',
    body: params,
  });
}

export async function queryCurrent() {
  const token = await getToken();
  const auth = `Bearer ${token}`;
  const header = {
    Authorization: auth,
  };

  return request(`${constants.hosts}/api/v1/merchants`, { headers: header });
}
