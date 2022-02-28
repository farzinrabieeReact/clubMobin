import { put, takeLatest } from "redux-saga/effects";
import AxiosCustom from "../../../../app/common/components/apiConfig";
import {
  handleNotificationAlertTrySelect,
  handleNotificationAlertCatch
} from "../../../../app/common/method/handleNotificationAlert";

export const actionTypes = {
  StockChangeBroker: "[StockChangeBroker] Action",
  StockChangeBrokerAsync: "[StockChangeBrokerAsync] Action",
  StockChangeBrokerLoading: "[StockChangeBrokerLoading] Action",
};

const initialState = {
  data: [],
  total: 50,
  size: 10,
  loading : false
};

export const reducerStockChangeBroker = (
  state = initialState,
  { type, payload }
) => {
  switch (type) {
    case actionTypes.StockChangeBroker:
      return {
        ...state,
        data: payload.results,
        total: payload.total ? payload.total : state.total,
      };
      case actionTypes.StockChangeBrokerLoading:
        return {
          ...state,
          loading: payload
        };
    default:
      return state;
  }
};

function* handleWorker({ payload }) {
  yield put({ type: actionTypes.StockChangeBrokerLoading, payload: true });
  let config = {
    url: "select_request"
  };

  let _data = {
    table: "changebroker",
    method_type: "select_change_brokers",
    from: payload.from ? (payload.from - 1) * payload.size : 0,
    size: payload.size ? payload.size : 50, 
    data:  {}
  };

  try {
    let res = yield AxiosCustom(config, _data);
    let flag = handleNotificationAlertTrySelect(res);
    if (!flag) return;

    yield put({
      type: actionTypes.StockChangeBroker,
      payload: {
        results: res.data.response.data.results,
        total: res.data.response.data?.total
      }
    });
  } catch {
    handleNotificationAlertCatch();
  }finally {
    yield put({
      type: actionTypes.StockChangeBrokerLoading,
      payload: false
    });
  }
}

export function* watcherStockChangeBroker() {
  yield takeLatest(actionTypes.StockChangeBrokerAsync, handleWorker);
}
