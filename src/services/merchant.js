import request, { handleRequestError } from '@/utils/request';
import { Passport } from 'f1-passport';
import constants from '../constants';
import { getSession } from '@/utils/authority';

const passport = new Passport({ host: constants.passportHost, merchantId: '5c8a9491dca25af694004d5e1711b217' });

export async function getAccountInfo() {
  const session = await getSession();
  return passport.getUserDetail(session).catch(e => {
    handleRequestError(e);
  });
}

/**
 * @param {regionCode,mobile,password} params
 */
export async function accountLogin(params) {
  return passport.login(params).catch(e => {
    handleRequestError(e);
  });
}

/**
 * @param {regionCode, mobile, captchaId, captchaCode} params
 */
export async function requestRegisterSMS(params) {
  return passport.requestRegisterSMS(params).catch(e => {
    handleRequestError(e);
  });
}

/**
 * @param {regionCode, mobile, captchaId, captchaCode} params
 */
export async function requestLoginSMS(params) {
  return passport.requestLoginSMS(params).catch(e => {
    handleRequestError(e);
  });
}

export async function getCaptcha() {
  return passport.getCaptcha().catch(e => {
    handleRequestError(e);
  });
}

/**
 * @param {name, code, password, token} params
 */
export async function register(params) {
  return passport.register(params).catch(e => {
    handleRequestError(e);
  });
}

/**
 * @param {token,mobileCode} params
 */
export async function captchaLogin(params) {
  return passport.mobileLogin(params).catch(e => {
    handleRequestError(e);
  });
}
