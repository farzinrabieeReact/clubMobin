import axiosCustom from "../../../app/common/components/apiConfig";
import {
  handleNotificationAlertCatch,
  handleNotificationAlertTrySelect
} from "../../../app/common/method/handleNotificationAlert";
import { put, takeLatest } from "redux-saga/effects";

export const actionTypes = {
  archive_competitions: "[archive_competitions] Action",
  archive_competitionsAsync: "[archive_competitionsAsync] Action"
};

const initialState = {
  data: []
};

export const reducer_select_archive_competitions = (
  state = initialState,
  { type, payload }
) => {
  switch (type) {
    case actionTypes.archive_competitions:
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
    table: "competition",
    method_type: "select_archive_competitions",
    data: {}
  };

  try {
    let res = yield axiosCustom(config, data);
    let flag = handleNotificationAlertTrySelect(res);
    if (!flag) return;
    if (res?.data?.response?.is_successful)
      yield put({
        type: actionTypes.archive_competitions,
        payload: res.data.response.data.results
      });
  } catch {
    handleNotificationAlertCatch();
  }
}

export function* watcher_archive_competitions() {
  yield takeLatest(actionTypes.archive_competitionsAsync, handleWorker);
}
