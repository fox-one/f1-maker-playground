import { queryCurrent } from '@/services/merchant';
import { getSession } from '@/utils/authority';
import router from 'umi/router';

export default {
  namespace: 'merchant',
  state: {
    currentUser: {},
    completedInfo: false,
  },

  effects: {
    *fetchCurrent(_, { call, put }) {
      const token = yield getSession();
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
  },

  reducers: {
    completedHandler(state, action) {
      return {
        ...state,
        completedInfo: action.payload,
      };
    },
  },
};
