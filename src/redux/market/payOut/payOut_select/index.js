import AxiosCustom from "../../../../app/common/components/apiConfig";
import {
  handleNotificationAlertCatch,
  handleNotificationAlertTrySelect
} from "../../../../app/common/method/handleNotificationAlert";
import { put, takeLatest } from "redux-saga/effects";

export const actionTypesSelect = {
  payOutSelect: "[payOutSelect] Action",
  payOutSelectLoading: "[payOutSelectLoading] Action",
  payOutRemove: "[payOutRemove] Action",
  payOutSelectAsync: "[payOutSelectAsync] Action"
};
const initialState = {
  data: [],
  size: 6,
  total: 0,
  loading: false
};

export const reducer_payOut_select = (
  state = initialState,
  { type, payload }
) => {
  switch (type) {
    case actionTypesSelect.payOutSelect:
      return {
        ...state,
        data: payload.results,
        total: payload.total ? payload.total : state.total
      };
    case actionTypesSelect.payOutRemove:
      return {
        ...state,
        data: payload.results,
        total: payload.total ? payload.total : state.total
      };
    case actionTypesSelect.payOutSelectLoading:
      return {
        ...state,
        loading: payload,
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
    table: "codal",
    method_type: "select_codal_participation",
    from: 0,
    // size: payload.size,
    data: payload.data ? payload.data : {}
  };

  try {

    yield put({ type: actionTypesSelect.payOutSelectLoading, payload: true });

    let res = yield AxiosCustom(config, data);
    let flag = handleNotificationAlertTrySelect(res);

    if (!flag) {
      return;
    }

    yield put({ type: actionTypesSelect.payOutSelect, payload: res.data.response.data });

  } catch {

    handleNotificationAlertCatch();

  } finally {

    yield put({ type: actionTypesSelect.payOutSelectLoading, payload: false });

  }
}
export function* select_payOut() {
  yield takeLatest(
    actionTypesSelect.payOutSelectAsync,
    handleWorker
  );
}
