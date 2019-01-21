import { queryCurrent, updateMerchant } from '@/services/merchant';
import { getToken } from '@/utils/authority';
import router from 'umi/router';
import { notification } from 'antd';
import { formatMessage } from 'umi/locale';

export default {
  namespace: 'merchant',
  state: {
    currentUser: {},
    completedInfo: false,
  },

  effects: {
    *fetchCurrent(_, { call, put }) {
      const token = yield getToken();
      if (!token) {
        // eslint-disable-next-line no-underscore-dangle
        window.g_app._store.dispatch({
          type: 'login/logout',
        });
        return;
      }
      const response = yield call(queryCurrent);

      if (response.merchantPending) {
        router.push({
          pathname: '/merchant/confirm-result',
        });
        return;
      }
      if (response) {
        yield put({
          type: 'saveCurrentUser',
          merchant: response,
        });
      }
    },

    *updateMerchantInfo({ payload }, { call, put }) {
      const success = yield call(updateMerchant, payload);
      if (success) {
        notification.success({
          message: formatMessage({ id: `app.settings.notification.update-merchant.success` }),
        });
        const response = yield call(queryCurrent);

        yield put({
          type: 'saveCurrentUser',
          merchant: response,
        });
      }
    },
  },

  reducers: {
    saveCurrentUser(state, action) {
      return {
        ...state,
        currentUser: action.merchant,
      };
    },
    completedHandler(state, action) {
      return {
        ...state,
        completedInfo: action.payload,
      };
    },
  },
};
