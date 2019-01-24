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
  if (authority === null || authority === undefined) {
    authority = 'guest';
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

const merchantId = 'merchantId';
// 存储 Fox.One Token
export function setSession(session) {
  return localforage.setItem(constants.storage.session, session);
}

export function removeSession() {
  return localforage.removeItem(constants.storage.session);
}

export async function getSession() {
  return localforage.getItem(constants.storage.session);
}

export function setMerchantBrokerId(brokerId) {
  return localforage.setItem(merchantId, brokerId);
}

export async function getMerchantBrokerId() {
  return localforage.getItem(merchantId);
}

export function removeMerchantBrokerId() {
  return localforage.removeItem(merchantId);
}
