import AxiosCustom from "../../../app/common/components/apiConfig";
import {
  handleNotificationAlertCatch,
  handleNotificationAlertTrySelect
} from "../../../app/common/method/handleNotificationAlert";
import { put, takeLatest } from "redux-saga/effects";

export const actionTypes = {
  symbolInformation: "[symbolInformation] Action",
  symbolInformationAsync: "[symbolInformationAsync] Action"
};

const initialState = {
  data: []
};


export const reducer_symbolInformation_select_list = (
  state = initialState, { type, payload }) => {
  switch (type) {
    case actionTypes.symbolInformation:
      return {
        data: payload
      };
    default:
      return state;
  }
};


function* handleWorker(payload) {
  let config = {
    url: "select_request"
  };

  let data = {
    table: "stock",
    method_type: "select_stock_details",
    data: {
      isin: payload.isin
      // isin: "IRO1SIPA0001"
    }
  };

  try {
    let res = yield AxiosCustom(config, data);
    let flag = handleNotificationAlertTrySelect(res);
    if (!flag) return;


    yield put({
      type: actionTypes.symbolInformation,
      payload: res.data.response.data.results
    });

  } catch {
    handleNotificationAlertCatch();
  }
}

export function* symbolInformation_select_list() {
  yield takeLatest(actionTypes.symbolInformationAsync, handleWorker);
}
