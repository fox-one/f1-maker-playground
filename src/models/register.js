import { register, getCaptcha, requestRegister } from '@/services/merchant';
import { reloadAuthorized } from '@/utils/Authorized';
import { setSession, setAuthority } from '@/utils/authority';

export default {
  namespace: 'register',

  state: {
    name: null,
    status: undefined,
    captchaUrl: '',
    captchaId: '',
    email: '',
    activity: false,
    token: null,
  },

  effects: {
    *submit({ payload }, { call, put }) {
      const { name, token, captcha, password } = payload;
      const response = yield call(register, {
        name,
        code: captcha,
        password,
        token,
      });

      if (response != null) {
        setAuthority('admin');
        reloadAuthorized();
        setSession(response.session);
        const status = 'ok';
        yield put({
          type: 'handleRegister',
          payload: { response, status, name },
        });
        yield put({
          type: 'updateUserInfo',
          payload: {
            user: response.user,
          },
        });
        yield put({
          type: 'clearState',
        });
      }
    },

    *requestRegist({ payload }, { call, put }) {
      const response = yield call(requestRegister, payload);
      yield put({
        type: 'handlerRequestRegister',
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
  },

  reducers: {
    handlerRequestRegister(state, { payload }) {
      return {
        ...state,
        token: payload.token,
      };
    },

    handleRegister(state, { payload }) {
      reloadAuthorized();
      return {
        ...state,
        status: payload.status,
        name: payload.name,
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
        token: false,
      };
    },
  },
};
