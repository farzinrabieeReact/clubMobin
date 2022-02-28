import AxiosCustom from "../../../../app/common/components/apiConfig";
import {
  handleNotificationAlertCatch,
  handleNotificationAlertTrySelect
} from "../../../../app/common/method/handleNotificationAlert";
import { put, takeLatest } from "redux-saga/effects";

export const actionTypes = {
  ipo: "[ipo] Action",
  ipoLoading: "[ipoLoading] Action",
  ipoAsync: "[ipoAsync] Action"
};

const initialState = {
  data: [],
  total: 20,
  loading: false
};
export const reducer_ipo_select_list = (
  state = initialState,
  { type, payload }
) => {
  switch (type) {
    case actionTypes.ipo:
      return {
        ...state,
        data: payload.results,
        total: payload.total
          ? payload.total > 10000
            ? 10000
            : payload.total
          : 20
      };
    case actionTypes.ipoLoading:
      return {
        ...state,
        loading: payload
      };
    default:
      return state;
  }
};

function* handleWorker() {
  let config = {
    url: "select_request"
  };
  let data = {
    table: "ipo",
    method_type: "select_active_ipos",
    data: {}
  };

  try {
    let res = yield AxiosCustom(config, data);
    let flag = handleNotificationAlertTrySelect(res);
    if (!flag) {
      return;
    }
    yield put({ type: actionTypes.ipoLoading, payload: true });

    yield put({
      type: actionTypes.ipo,
      payload: res.data.response.data
    });
  } catch {
    handleNotificationAlertCatch();
  } finally {
    yield put({ type: actionTypes.ipoLoading, payload: false });
  }
}

export function* select_active_ipo() {
  yield takeLatest(actionTypes.ipoAsync, handleWorker);
}
