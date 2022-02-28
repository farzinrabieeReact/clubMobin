import { put, takeLatest } from "redux-saga/effects";
import AxiosCustom from "../../../../app/common/components/apiConfig";
import {
  handleNotificationAlertTrySelect,
  handleNotificationAlertCatch
} from "../../../../app/common/method/handleNotificationAlert";

export const actionTypes = {
  stockDetailsPortfolio: "[stockDetailsPortfolio] Action",
  stockDetailsPortfolioAsync: "[stockDetailsPortfolioAsync] Action"
};

const initialState = {
  data: []
};

export const reducerStockDetailsPortfolio = (
  state = initialState,
  { type, payload }
) => {
  switch (type) {
    case actionTypes.stockDetailsPortfolio:
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
    table: "stock",
    method_type: "select_stock_details",
    data: {
      isin: "IRO1VMDR0001"
    }
  };

  try {
    let res = yield AxiosCustom(config, data);
    let flag = handleNotificationAlertTrySelect(res);
    if (!flag) return;

    yield put({
      type: actionTypes.stockDetailsPortfolio,
      payload: res.data.response.data.results
    });
  } catch {
    handleNotificationAlertCatch();
  }
}

export function* watcherStockDetailsPortfolio() {
  yield takeLatest(actionTypes.stockDetailsPortfolioAsync, handleWorker);
}
