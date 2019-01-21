import { getPairList } from '@/services/pair';

export default {
  namespace: 'pairs',

  state: {
    pairList: [],
    pairMap: {},
  },

  effects: {
    *getPairList({ payload }, { call, put }) {
      const response = yield call(getPairList, payload);
      yield put({
        type: 'pairListHandle',
        payload: response,
      });
    },
  },

  reducers: {
    pairListHandle(state, { payload }) {
      const pairList = payload;
      if (pairList) {
        const pairMap = {};
        pairList.forEach(pair => {
          pairMap[pair.symbol] = pair;
        });
        return {
          ...state,
          pairList,
          pairMap,
        };
      }
      return state;
    },
  },
};
