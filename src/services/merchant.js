import request from '@/utils/request';
import { Passport } from 'f1-passport';
import constants from '../constants';
import { getSession, getMerchantBrokerId } from '@/utils/authority';

const passport = new Passport({ ApiHost: constants.passportHost, merchantId: '5c8a9491dca25af694004d5e1711b217' })

export async function getAccountInfo() {
  return request('https://dev-cloud.fox.one/api/account/detail', {
    method: 'GET',
  })
}

export async function accountLogin(params) {
  return passport.login('86', params.mobile, params.password)
}

export async function requestRegisterSMS(regionCode, mobile, captchaId, captchaCode){
  return passport.requestRegisterSMS(regionCode, mobile, captchaId, captchaCode)
}

export async function requestLoginSMS(regionCode, mobile, captchaId, captchaCode){
  return passport.requestLoginSMS(regionCode, mobile, captchaId, captchaCode)
}

export async function getCaptcha(){
  return passport.getCaptcha()
}

export async function register(name, mobileCode, password, token){
  return passport.register(name,mobileCode,password,token)
}

export async function captchaLogin(token,mobileCode){
  return passport.mobileLogin(token,mobileCode)
}
