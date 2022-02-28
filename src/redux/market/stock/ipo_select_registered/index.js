import AxiosCustom from "../../../../app/common/components/apiConfig";
import {
  handleNotificationAlertCatch,
  handleNotificationAlertTrySelect
} from "../../../../app/common/method/handleNotificationAlert";
import { put, takeLatest } from "redux-saga/effects";

export const actionTypesSelectRegister = {
  ipoSelectRegister: "[ipoSelectRegister] Action",
  ipoSelectRegisterLoad: "[ipoSelectRegisterLoad] Action",
  ipoSelectRegisterAsync: "[ipoSelectRegisterAsync] Action"
};
const initialState = {
  data: [],
  size: 6,
  total: 100,
  load: false
};
export const reducer_ipo_selectRegister_list = (
  state = initialState,
  { type, payload }
) => {
  switch (type) {
    case actionTypesSelectRegister.ipoSelectRegister:
      return {
        ...state,
        data: payload.results,
        total: payload.total ? payload.total : state.total
      };
    case actionTypesSelectRegister.ipoSelectRegisterLoad:
      return {
        ...state,
        load: payload
      };
    default:
      return state;
  }
};
function* handleWorker({ payload }) {
  yield put({
    type: actionTypesSelectRegister.ipoSelectRegisterLoad,
    payload: true
  });
  let config = {
    url: "select_request"
  };
  let data = {
    table: "ipo",
    method_type: "select_registered_ipos",
    from: payload.from,
    size: payload.size,
    data: {}
  };

  try {
    let res = yield AxiosCustom(config, data);
    let flag = handleNotificationAlertTrySelect(res);
    if (!flag) {
      return;
    }
    yield put({
      type: actionTypesSelectRegister.ipoSelectRegister,
      payload: res.data.response.data
    });
  } catch {
    handleNotificationAlertCatch();
  } finally {
    yield put({
      type: actionTypesSelectRegister.ipoSelectRegisterLoad,
      payload: false
    });
  }
}
export function* select_register_ipo() {
  yield takeLatest(
    actionTypesSelectRegister.ipoSelectRegisterAsync,
    handleWorker
  );
}
