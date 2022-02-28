import AxiosCustom from "../../../app/common/components/apiConfig";
import {
  handleNotificationAlertCatch,
  handleNotificationAlertTrySelect
} from "../../../app/common/method/handleNotificationAlert";
import { put, takeLatest } from "redux-saga/effects";

export const actionTypes = {
  selectTurnover: "[selectTurnover] Action",
  selectTurnoverAsync: "[selectTurnoverAsync] Action"
};

const initialState = {
  data: []
};

export const turnover_select_reducer = (
  state = initialState,
  { type, payload }
) => {
  switch (type) {
    case actionTypes.selectTurnover:
      return {
        data: payload.results
      };
    default:
      return state;
  }
};

function* handleWorker({ payload }) {
  let config = {
    url: "select_request"
  };

  let data = {
    table: "order",
    method_type: "select_details",
    from: payload.from ? (payload.from - 1) * payload.size : "0",
    size: payload.size ? payload.size : null,
    data: payload.data ? payload.data : {}
  };

  try {
    let res = yield AxiosCustom(config, data);
    let flag = handleNotificationAlertTrySelect(res);
    if (!flag) return;

    yield put({
      type: actionTypes.selectTurnover,
      payload: res.data.response.data
    });
  } catch {
    handleNotificationAlertCatch();
  }
}

export function* tuornoverSelect() {
  yield takeLatest(actionTypes.selectTurnoverAsync, handleWorker);
}
