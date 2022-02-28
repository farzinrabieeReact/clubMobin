import AxiosCustom from "../../../../app/common/components/apiConfig";
import {
  handleNotificationAlertCatch,
  handleNotificationAlertTryUpdate
} from "../../../../app/common/method/handleNotificationAlert";
import { put, takeLatest } from "redux-saga/effects";
import { actionTypesSelectRegister } from "../ipo_select_registered";

export const actionTypesRegister = {
  ipoRegister: "[ipoRegister] Action",
  ipoRegisterAsync: "[ipoRegisterAsync] Action"
};

function* handleWorker(payload) {
  let dataApi = payload.payload;
  let config = {
    url: "insert_request"
  };
  let data = {
    table: "ipo",
    method_type: "register_ipo",
    data: {
      member_id: dataApi.memberId,
      member_first_name: null,
      member_last_name: null,
      member_national_id: null,
      member_bourse_code: null,
      member_bourse_account: null,
      ipo_id: dataApi.id,
      ipo_stock_name: null,
      ipo_end_date: null,
      registration_date: null,
      is_canceled: null,
      requested_price: dataApi.price,
      requested_quantity: dataApi.quantity,
      state: null
    }
  };

  try {
    let res = yield AxiosCustom(config, data);

    let flag = handleNotificationAlertTryUpdate(res);
    if (!flag) {
      return;
    }
    yield put({
      type: actionTypesSelectRegister.ipoSelectRegisterAsync,
      payload: { size: 12, from: 0 }
    });

    yield put({
      type: actionTypesRegister.ipoRegister,
      payload: res.data.response.data.results
    });
  } catch {
    handleNotificationAlertCatch();
  }
}
export function* insert_register_ipo() {
  yield takeLatest(actionTypesRegister.ipoRegisterAsync, handleWorker);
}
