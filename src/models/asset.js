import { queryAssets, queryCurrency } from '@/services/api';

export default {
  namespace: 'assets',

  state: {
    assets: [],
    currency: {},
  },

  effects: {
    *getAssets({ payload }, { call, put }) {
      const response = yield call(queryAssets, payload);
      yield put({ type: 'updateAssets', payload: response });
    },
    *getCurrentcy({ payload }, { call, put }) {
      const response = yield call(queryCurrency, payload);
      yield put({ type: 'updateCurrency', payload: response });
    },
  },

  reducers: {
    updateAssets(state, { payload }) {
      payload.sort();
      return {
        ...state,
        assets: payload,
      };
    },
    updateCurrency(state, { payload }) {
      return {
        ...state,
        currency: payload,
      };
    },
  },
};
