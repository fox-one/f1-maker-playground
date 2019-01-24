import { routerRedux } from 'dva/router';
import { stringify } from 'qs';
import { accountLogin, getAccountInfo } from '@/services/merchant';
import { setSession, setAuthority, removeSession, removeMerchantBrokerId } from '@/utils/authority';
import { getPageQuery } from '@/utils/utils';
import { reloadAuthorized } from '@/utils/Authorized';
// import router from 'umi/router';
import { removeAdminUUID } from '@/global';

export default {
  namespace: 'login',

  state: {
    status: undefined,
    email: '',
    mobile: '',
    user: {},
  },

  effects: {
    *login({ payload }, { call, put }) {
      const { password: rawPassword, mobile, email } = payload;

      if (mobile) {
        yield put({
          type: 'updateMobile',
          payload: mobile,
        });
      }
      if (email) {
        yield put({
          type: 'updateEmail',
          payload: email,
        });
      }

      const response = yield call(accountLogin, { password: rawPassword, mobile, email });
      if (!response) {
        yield put({
          type: 'changeLoginStatus',
          payload: {
            status: 'error',
          },
        });
        return;
      }

      const currentAuthority = 'admin';
      yield put({
        type: 'changeLoginStatus',
        payload: { ...response, currentAuthority },
      });

      const { session } = response;
      if (session != null) {
        setSession(session);
        reloadAuthorized();

        const urlParams = new URL(window.location.href);

        const params = getPageQuery();
        let { redirect } = params;
        if (redirect) {
          const redirectUrlParams = new URL(redirect);
          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length);
            if (redirect.startsWith('/#')) {
              redirect = redirect.substr(2);
            }
          } else {
            window.location.href = redirect;
            return;
          }
        }
        yield put(routerRedux.replace(redirect || '/'));
      } else {
        yield put({
          type: 'changeLoginStatus',
          payload: {
            status: 'error',
          },
        });
      }
    },

    *getAccount(_, { call, put }) {
      const response = yield call(getAccountInfo, null);
      yield put({
        type: 'updateUserInfo',
        payload: response,
      });
    },

    *logout(_, { put }) {
      yield put({
        type: 'changeLoginStatus',
        payload: {
          status: false,
        },
      });

      setAuthority('guest');
      removeSession();
      removeMerchantBrokerId();
      reloadAuthorized();
      removeAdminUUID();

      yield put(
        routerRedux.push({
          pathname: '/admin/login',
          search: stringify({
            redirect: window.location.href,
          }),
        })
      );
    },
  },

  reducers: {
    updateUserInfo(state, { payload }) {
      return {
        ...state,
        user: payload.user,
      };
    },
    changeLoginStatus(state, { payload }) {
      if (payload.currentAuthority) {
        setAuthority(payload.currentAuthority);
      }
      return {
        ...state,
        status: payload.status,
        type: payload.type,
      };
    },
    updateMobile(state, { payload }) {
      return {
        ...state,
        mobile: payload,
      };
    },
    updateEmail(state, { payload }) {
      return {
        ...state,
        email: payload,
      };
    },
    updateSuccessHandler(state) {
      return {
        ...state,
      };
    },
    changePasswordHandler(state) {
      return {
        ...state,
      };
    },
  },
};
