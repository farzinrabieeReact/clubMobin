import axiosCustom from "./../../../app/common/components/apiConfig";
import {
  handleNotificationAlertTrySelect,
  handleNotificationAlertCatch,
} from "../../../app/common/method/handleNotificationAlert/";
import { put, takeLatest } from "redux-saga/effects";

//-----------------------actionTypes-------------------------------------------------------------------------
export const actionTypes = {
  tradesCreditSelect: "[tradesCreditSelect] action",
  tradesCreditSelectAsync: "[tradesCreditSelectAsync] action",
};
//-----------initialState-------------------------------------------------------------------------------------
const initialState = {
  data: [],
  from: 100000,
  size: 10,
};
//-----------reducer----------------------------------------------------------------------------------------
export const reducer_trades_credit_select = (
  state = initialState,
  { type, payload }
) => {
  switch (type) {
    case actionTypes.tradesCreditSelect:
      return {
        ...state,
        data: payload.results,
        total: payload.total
          ? payload.total > 10000
            ? 10000
            : payload.total
          : 10000,
      };
    default:
      return state;
  }
};
//----------handleWorker--------------------------------------------------------------------------------------
function* handleWorker({ payload }) {
  let config = {
    url: "select_request",
  };

  let data = {
    table: "credit",
    method_type: "select",
    from: payload.from ? (payload.from - 1) * payload.size : 0,
    size: payload.size,
    data: {},
  };

  try {
    let res = yield axiosCustom(config, data);
    let flag = handleNotificationAlertTrySelect(res);
    if (!flag) return;
    yield put({
      type: actionTypes.tradesCreditSelect,
      payload: res.data.response.data,
    });
  } catch {
    handleNotificationAlertCatch();
  }
}
//---------------wacher----------------------------------------------------------------------------------
export function* tradesCreditSelect() {
  yield takeLatest(actionTypes.tradesCreditSelectAsync, handleWorker);
}
