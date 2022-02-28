import axiosCustom from "../../../../app/common/components/apiConfig";
import {
  handleNotificationAlertCatch,
  handleNotificationAlertTrySelect
} from "../../../../app/common/method/handleNotificationAlert";
import { put, takeLatest } from "redux-saga/effects";

export const actionTypes = {
  telegramLinks: "[telegramLinks] Action",
  telegramLinksLoad: "[telegramLinksLoad] Action",
  telegramLinksAsync: "[telegramLinksAsync] Action"
};

const initialState = {
  data: [],
  loading: false
};

export const telegramLinks_Select_reducer = (
  state = initialState,
  { type, payload }
) => {
  switch (type) {
    case actionTypes.telegramLinks:
      return {
        data: payload
      };
    case actionTypes.telegramLinksLoad:
      return {
        ...state,
        loading: payload
      };

    default:
      return state;
  }
};

function* handleWorker() {
  yield put({ type: actionTypes.telegramLinksLoad, payload: true });
  let config = {
    url: "select_request"
  };

  let data = {
    table: "static",
    method_type: "select",
    data: { name: "telegram_links" }
  };

  try {
    let res = yield axiosCustom(config, data);
    let flag = handleNotificationAlertTrySelect(res);
    if (!flag) return;
    yield put({
      type: actionTypes.telegramLinks,
      payload: res.data.response.data.results
    });
  } catch {
    handleNotificationAlertCatch();
  } finally {
    yield put({ type: actionTypes.telegramLinksLoad, payload: false });
  }
}

export function* telegtramLinksSelect() {
  yield takeLatest(actionTypes.telegramLinksAsync, handleWorker);
}
