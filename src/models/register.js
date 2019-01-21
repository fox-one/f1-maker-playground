import {
  register,
  requestImageCaptcha,
  activateMerchant,
  reActivateMerchant,
} from '@/services/merchant';
import { reloadAuthorized } from '@/utils/Authorized';
import { setFoxToken, setAuthority } from '@/utils/authority';
import md5 from 'blueimp-md5';

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
      const { name, captchaId, mail, password, captcha } = payload;

      const response = yield call(register, {
        name,
        email: mail,
        password: md5(password),
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

    *getImageCaptcha(payload, { call, put }) {
      const captcha = yield call(requestImageCaptcha);
      yield put({
        type: 'updateCaptcha',
        payload: captcha,
      });
    },

    *activate({ payload }, { call, put }) {
      const { email, code } = payload;
      const validationCode = code;
      const validationType = 0;

      const response = yield call(activateMerchant, {
        email,
        validationCode,
        validationType,
      });

      if (response != null) {
        const { token } = response;
        if (token) {
          setFoxToken(token);
          setAuthority('admin');
          yield put({
            type: 'activateHandle',
            payload: true,
          });
        }
      }
    },

    *reactivate({ payload }, { call, put }) {
      const response = yield call(reActivateMerchant, payload);

      if (response != null) {
        const { token } = response;
        if (token) {
          setFoxToken(token);
          setAuthority('admin');
          yield put({
            type: 'activateHandle',
            payload: true,
          });
        }
      }
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
        captchaUrl: payload.captchaUrl,
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
