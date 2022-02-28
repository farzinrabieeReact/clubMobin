import { put, takeLatest } from "redux-saga/effects";
import AxiosCustom from "../../../../app/common/components/apiConfig";
import {
  handleNotificationAlertTrySelect,
  handleNotificationAlertCatch
} from "../../../../app/common/method/handleNotificationAlert";

export const actionTypes = {
  stockSelectProtfolio: "[stockSelectProtfolio] Action",
  stockSelectprotfPlioAsync: "[stockSelectprotfPlioAsync] Action"
};

const initialState = {
  data: []
};

export const reducerStockSelectProtfolio = (
  state = initialState,
  { type, payload }
) => {
  switch (type) {
    case actionTypes.stockSelectProtfolio:
      return {
        data: payload
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
    table: "portfolio",
    method_type: "select_portfolio_daily",
    data: {}
  };

  try {
    let res = yield AxiosCustom(config, data);

    let flag = handleNotificationAlertTrySelect(res);
    if (!flag) return;

    yield put({
      type: actionTypes.stockSelectProtfolio,
      payload: res.data.response.data.results
    });
  } catch {
    handleNotificationAlertCatch();
  }
}

export function* watcherStockSelectProtfolio() {
  yield takeLatest(actionTypes.stockSelectprotfPlioAsync, handleWorker);
}
