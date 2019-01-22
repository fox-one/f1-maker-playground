import { register, getCaptcha, requestRegisterSMS } from '@/services/merchant';
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
    token: null,
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
          payload: { ...response, status, mobile },
        });
      }
    },

    *requestRegister({ payload }, { call, put }) {
      const response = yield call(requestRegisterSMS, payload);
      yield put({
        type: 'requestRegisterSMS',
        payload: response,
      });
    },

    *getImageCaptcha(_, { call, put }) {
      const captcha = yield call(getCaptcha);
      yield put({
        type: 'updateCaptcha',
        payload: captcha,
      });
    },

    *resetState(_, { put }) {
      yield put({
        type: 'clearState',
      });
    },
  },

  reducers: {
    requestRegisterSMS(state, { payload }) {
      console.log(payload.token);
      return {
        ...state,
        token: payload.token,
      };
    },

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
    clearState(state, _) {
      return {
        ...state,
        requestSMS: false,
      };
    },
  },
};
