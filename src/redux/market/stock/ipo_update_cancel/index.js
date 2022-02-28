import AxiosCustom from "../../../../app/common/components/apiConfig";
import {
  handleNotificationAlertCatch,
  handleNotificationAlertTryUpdate
} from "../../../../app/common/method/handleNotificationAlert";
import { put, takeLatest } from "redux-saga/effects";
import { actionTypesSelectRegister } from "../ipo_select_registered";

export const actionTypesUpdateRegister = {
  ipoUpdateRegister: "[ipoUpdateRegister] Action",
  ipoUpdateRegisterAsync: "[ipoUpdateRegisterAsync] Action"
};

function* handleWorker(payload) {
  let config = {
    url: "update_request"
  };
  let data = {
    table: "ipo",
    method_type: "cancel_ipo",

    data: {
      _id: payload.id
    }
  };

  try {
    let res = yield AxiosCustom(config, data);
    let flag = handleNotificationAlertTryUpdate(res);
    if (!flag) return;

    yield put({
      type: actionTypesSelectRegister.ipoSelectRegisterAsync,
      payload: { size: 12, from: 0 }
    });
  } catch {
    handleNotificationAlertCatch();
  }
}
export function* update_register_ipo() {
  yield takeLatest(
    actionTypesUpdateRegister.ipoUpdateRegisterAsync,
    handleWorker
  );
}
