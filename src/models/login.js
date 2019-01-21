import { routerRedux } from 'dva/router';
import { stringify } from 'qs';
import { accountLogin, changePassword, updateAccount } from '@/services/merchant';
import { setToken, setAuthority, removeFoxToken, removeMerchantBrokerId } from '@/utils/authority';
import { getPageQuery } from '@/utils/utils';
import { reloadAuthorized } from '@/utils/Authorized';
// import router from 'umi/router';
import { removeAdminUUID } from '@/global';
import md5 from 'blueimp-md5';
import { notification } from 'antd';
import { formatMessage } from 'umi/locale';

export default {
  namespace: 'login',

  state: {
    status: undefined,
    email: '',
  },

  effects: {
    *login({ payload }, { call, put }) {
      const { password: rawPassword, email } = payload;
      const password = md5(`f1ex_admin_${rawPassword}`);

      yield put({
        type: 'updateEmail',
        payload: email,
      });

      const response = yield call(accountLogin, { password, email });

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

      const { token } = response;
      if (token != null) {
        setToken(token);
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

    *updateAccount(payload, { call, put }) {
      const { param } = payload;
      const success = yield call(updateAccount, param);
      if (success) {
        notification.success({
          message: formatMessage({ id: `app.settings.notification.update-name.success` }),
        });

        window.g_app._store.dispatch({
          type: 'merchant/fetchCurrent',
        });

        yield put({
          type: 'updateSuccessHandler',
        });
      }
    },

    *changePassword(payload, { call, put }) {
      const {
        payload: { oldpassword, password: newRawPassword, confirm },
      } = payload;
      if (confirm !== newRawPassword) {
        return;
      }
      const success = yield call(changePassword, {
        password: md5(oldpassword),
        newPassword: md5(newRawPassword),
      });
      if (success) {
        yield put({
          type: 'changePasswordHandler',
        });

        notification.success({
          message: formatMessage({ id: `app.settings.notification.update-password.success` }),
        });
      }
    },

    *logout(val, { put }) {
      yield put({
        type: 'changeLoginStatus',
        payload: {
          status: false,
        },
      });

      // yield call(logoutAccount);

      setAuthority('guest');
      removeFoxToken();
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
