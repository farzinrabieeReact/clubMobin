import { put, takeLatest } from "redux-saga/effects";
import axiosCustom from "../../../app/common/components/apiConfig";
import {
  handleNotificationAlertTrySelect,
  handleNotificationAlertCatch
} from "../../../app/common/method/handleNotificationAlert/";

export const actionTypes = {
  giftHomeSelect: "[giftHomeSelect] Action",
  giftHomeSelectLoad: "[giftHomeSelectLoad] Action",
  giftHomeSelectAsync: "[giftHomeSelectAsync] Action"
};

const initialState = {
  data: [],
  load: false
};

export const homeGift_select_activeGift = (
  state = initialState,
  { type, payload }
) => {
  switch (type) {
    case actionTypes.giftHomeSelect:
      return {
        data: payload
      };
    case actionTypes.giftHomeSelectLoad:
      return {
        ...state,
        load: payload
      };

    default:
      return state;
  }
};

function* handleWorker({ payload }) {
  yield put({ type: actionTypes.giftHomeSelectLoad, payload: true });
  let config = {
    url: "select_request"
  };

  let data = {
    table: "gift",
    method_type: "select_popular_gifts",
    size: 20,
    data: payload ? payload : {}
  };

  try {
    let res = yield axiosCustom(config, data);

    let flag = handleNotificationAlertTrySelect(res);
    if (!flag) return;
    yield put({
      type: actionTypes.giftHomeSelect,
      payload: res.data.response.data.results
    });

    yield put({ type: actionTypes.giftHomeSelectLoad, payload: false });
  } catch {
    handleNotificationAlertCatch();
  } finally {
    yield put({ type: actionTypes.giftHomeSelectLoad, payload: false });
  }
}

export function* homeGiftSelectActive() {
  yield takeLatest(actionTypes.giftHomeSelectAsync, handleWorker);
}
