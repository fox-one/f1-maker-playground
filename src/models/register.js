import {
  register,
  getCaptcha,
  requestRegisterSMS,
} from '@/services/merchant';
import { reloadAuthorized } from '@/utils/Authorized';
import { setSession, setAuthority } from '@/utils/authority';

export default {
  namespace: 'register',

  state: {
    status: undefined,
    captchaUrl: '',
    captchaId: '',
    email: '',
    activity: false,
  },

  effects: {
    *submit({ payload }, { call, put }) {
      const { name, captchaId, mobile, password, captcha } = payload;

      const response = yield call(register, {
        name,
        mobile,
        password,
        captchaId,
        captcha,
      });

      if (response != null) {
        setAuthority('user');
        const status = 'ok';
        yield put({
          type: 'registerHandle',
          payload: { ...response, status, email: mail },
        });
      }
    },

    *requestRegister({payload},{call,put}){
      const response = yield call(requestRegisterSMS, payload)
      
    },

    *getImageCaptcha(payload, { call, put }) {
      const captcha = yield call(getCaptcha);
      yield put({
        type: 'updateCaptcha',
        payload: captcha,
      });
    },
  },

  reducers: {
    registerHandle(state, { payload }) {
      reloadAuthorized();
      return {
        ...state,
        status: payload.status,
        email: payload.email,
      };
    },
    updateCaptcha(state, { payload }) {
      return {
        ...state,
        captchaUrl: payload.captchaURL,
        captchaId: payload.captchaId,
      };
    },
    activateHandle(state, { payload }) {
      return {
        ...state,
        activity: payload,
      };
    },
  },
};
