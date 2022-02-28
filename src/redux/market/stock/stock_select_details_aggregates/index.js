import { put, takeLatest } from "redux-saga/effects";
import AxiosCustom from "../../../../app/common/components/apiConfig";
import {
  handleNotificationAlertTrySelect,
  handleNotificationAlertCatch
} from "../../../../app/common/method/handleNotificationAlert";

export const actionTypes = {
  OrderDetailsAggregates: "[OrderDetailsAggregates] Action",
  OrderDetailsAggregatesLoading: "[OrderDetailsAggregatesLoading] Action",
  OrderDetailsAggregatesAsync: "[OrderDetailsAggregatesAsync] Action"
};

const initialState = {
  data: [],
  size: 20,
  total: 20,
  loading: false
};

export const reducerOrderDetailsAggregates = (
  state = initialState,
  { type, payload }
) => {
  switch (type) {
    case actionTypes.OrderDetailsAggregates:
      return {
        ...state,
        data: payload.results,
        total: payload.total
          ? payload.total > 10000
            ? 10000
            : payload.total
          : 10000
      };
    case actionTypes.OrderDetailsAggregatesLoading:
      return {
        ...state,
        loading: payload
      };
    default:
      return state;
  }
};

function* handleWorker({ payload }) {
  yield put({ type: actionTypes.OrderDetailsAggregatesLoading, payload: true });
  let config = {
    url: "select_request"
  };

  let data = {
    table: "order",
    method_type: payload.method_type,
    from: payload.from ? payload.from : 0,
    size: payload.size ? payload.size : 50,
    data: payload.data ? payload.data : {}
  };

  try {
    let res = yield AxiosCustom(config, data);
    let flag = handleNotificationAlertTrySelect(res);
    if (!flag) return;

    yield put({
      type: actionTypes.OrderDetailsAggregates,
      payload: res.data.response.data
    });
  } catch {
    handleNotificationAlertCatch();
  } finally {
    yield put({
      type: actionTypes.OrderDetailsAggregatesLoading,
      payload: false
    });
  }
}

export function* watcherOrderDetailsAggregates() {
  yield takeLatest(actionTypes.OrderDetailsAggregatesAsync, handleWorker);
}
