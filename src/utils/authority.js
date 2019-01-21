import localforage from 'localforage';
import constants from '@/constants';

// use localStorage to store the authority info, which might be sent from server in actual project.
export function getAuthority(str) {
  // return localStorage.getItem('foxone-authority') || ['admin'];
  const authorityString = typeof str === 'undefined' ? localStorage.getItem(constants.storage.authority) : str;
  // authorityString could be admin, "admin", ["admin", "guest"]
  let authority;
  try {
    authority = JSON.parse(authorityString);
  } catch (e) {
    authority = authorityString;
  }
  if (typeof authority === 'string') {
    return [authority];
  }
  return authority || ['admin'];
}

export function setAuthority(authority) {
  const proAuthority = typeof authority === 'string' ? [authority] : authority;
  return localStorage.setItem(constants.storage.authority, JSON.stringify(proAuthority));
}

const foxBrokerId = 'fox-brokerId';
// 存储 Fox.One Token
export function setToken(token) {
  return localforage.setItem(constants.storage.token, token);
}

export function removeFoxToken() {
  return localforage.removeItem(constants.storage.token);
}

export async function getToken() {
  return localforage.getItem(constants.storage.token);
}

export function setMerchantBrokerId(brokerId) {
  return localforage.setItem(foxBrokerId, brokerId);
}

export async function getMerchantBrokerId() {
  return localforage.getItem(foxBrokerId);
}

export function removeMerchantBrokerId() {
  return localforage.removeItem(foxBrokerId);
}
