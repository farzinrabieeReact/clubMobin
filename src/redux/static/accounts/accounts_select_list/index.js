import { put, takeLatest } from "redux-saga/effects";
import axiosCustom from "../../../../app/common/components/apiConfig";
import {
  handleNotificationAlertTrySelect,
  handleNotificationAlertCatch
} from "../../../../app/common/method/handleNotificationAlert";

export const actionTypes = {
  accounts: "[accounts] Action",
  accountsLoad: "[accountsLoad] Action",
  accountsAsync: "[accountsAsync] Action"
};

const initialState = {
  data: [],
  loading: false
};

export const reducer_accounts_select_list = (
  state = initialState,
  { type, payload }
) => {
  switch (type) {
    case actionTypes.accounts:
      return {
        data: payload
      };

    case actionTypes.accountsLoad:
      return {
        ...state,
        loading: payload
      };

    default:
      return state;
  }
};

function* handleWorker() {
  yield put({ type: actionTypes.accountsLoad, payload: true });

  let config = {
    url: "select_request"
  };

  let data = {
    table: "static",
    method_type: "select",
    data: { name: "accounts" }
  };

  try {
    let res = yield axiosCustom(config, data);
    let flag = handleNotificationAlertTrySelect(res);
    if (!flag) return;
    yield put({
      type: actionTypes.accounts,
      payload: res.data.response.data.results
    });
  } catch {
    handleNotificationAlertCatch();
  } finally {
    yield put({ type: actionTypes.accountsLoad, payload: false });
  }
}

export function* accounts_select_list() {
  yield takeLatest(actionTypes.accountsAsync, handleWorker);
}
