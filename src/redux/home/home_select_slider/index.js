import { put, takeLatest } from "redux-saga/effects";
import axiosCustom from "../../../app/common/components/apiConfig";
import {
  handleNotificationAlertTrySelect,
  handleNotificationAlertCatch
} from "../../../app/common/method/handleNotificationAlert";

export const actionTypes = {
  slider: "[slider] Action",
  sliderLoading: "[sliderLoading] Action",
  sliderAsync: "[sliderAsync] Action"
};

const initialState = {
  data: [],
  loading: true
};

export const reducer_select_slider = (
  state = initialState,
  { type, payload }
) => {
  switch (type) {
    case actionTypes.slider:
      return {
        data: payload
      };
    case actionTypes.sliderLoading:
      return {
        ...state,
        loading: payload
      };

    default:
      return state;
  }
};

function* handleWorker() {
  yield put({ type: actionTypes.sliderLoading, payload: true });

  let config = {
    url: "select_request"
  };

  let data = {
    table: "static",
    method_type: "select",
    data: { name: "slider" }
  };

  try {
    let res = yield axiosCustom(config, data);
    let flag = handleNotificationAlertTrySelect(res);
    if (!flag) return;
    yield put({
      type: actionTypes.slider,
      payload: res.data.response.data.results
    });
  } catch {
    handleNotificationAlertCatch();
  } finally {
    yield put({ type: actionTypes.sliderLoading, payload: false });
  }
}

export function* watcherSelectSlider() {
  yield takeLatest(actionTypes.sliderAsync, handleWorker);
}
