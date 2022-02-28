import { put, takeLatest } from "redux-saga/effects";
import axiosCustom from "../../../app/common/components/apiConfig";
import {
  handleNotificationAlertTrySelect,
  handleNotificationAlertCatch
} from "../../../app/common/method/handleNotificationAlert";

export const actionTypes = {
  giftMeSelectAffordable: "[giftMeSelectAffordable] Action",
  giftMeSelectAffordable1: "[giftMeSelectAffordable1] Action",
  giftMeSelectAffordableAsync: "[giftMeSelectAffordableAsync] Action",
  giftMeSelectAffordableAsync1: "[giftMeSelectAffordableAsync1] Action",
  giftMeSelectAffordableLoadin: "[giftMeSelectAffordableLoadin] Action"
};

const initialState = {
  data: [],
  loading: false,
  size: 8,
  total: 50
};

export const reducergiftMeSelectAffordable = (
  state = initialState,
  { type, payload }
) => {
  switch (type) {
    case actionTypes.giftMeSelectAffordable:
      return {
        ...state,
        data: payload.results,
        total: payload.total ? payload.total : 50
      };
    case actionTypes.giftMeSelectAffordable1:
      return {
        ...state,
        data: [...state.data, ...payload.results],
        total: payload.total ? payload.total : 50
      };
    case actionTypes.giftMeSelectAffordableLoadin:
      return {
        ...state,
        loading: payload
      };
    default:
      return state;
  }
};

function* handleWorker({ payload }) {
  yield put({ type: actionTypes.giftMeSelectAffordableLoadin, payload: true });

  let config = {
    url: "select_request"
  };

  let data = {
    table: "gift",
    method_type: "select_affordable_gifts",
    size: payload.size ? payload.size : 8,
    from: payload.from ? payload.from : 0,
    sort_by: { remained_capacity: "desc" },
    data: payload.data ? payload.data : {}
  };

  try {
    let res = yield axiosCustom(config, data);
    let flag = handleNotificationAlertTrySelect(res);

    if (!flag) return;
    yield put({
      type: actionTypes.giftMeSelectAffordable,
      payload: res.data.response.data
    });
  } catch {
    handleNotificationAlertCatch();
  } finally {
    yield put({
      type: actionTypes.giftMeSelectAffordableLoadin,
      payload: false
    });
  }
}
function* handleWorker1({ payload }) {
  yield put({ type: actionTypes.giftMeSelectAffordableLoadin, payload: true });

  let config = {
    url: "select_request"
  };

  let data = {
    table: "gift",
    method_type: "select_affordable_gifts",
    size: payload.size ? payload.size : 8,
    from: payload.from ? payload.from : 0,
    sort_by: { remained_capacity: "desc" },

    data: payload.data ? payload.data : {}
  };

  try {
    let res = yield axiosCustom(config, data);
    let flag = handleNotificationAlertTrySelect(res);

    if (!flag) return;
    yield put({
      type: actionTypes.giftMeSelectAffordable1,
      payload: res.data.response.data
    });
  } catch {
    handleNotificationAlertCatch();
  } finally {
    yield put({
      type: actionTypes.giftMeSelectAffordableLoadin,
      payload: false
    });
  }
}

export function* giftMeSelectAffordable() {
  yield takeLatest(actionTypes.giftMeSelectAffordableAsync, handleWorker);
  yield takeLatest(actionTypes.giftMeSelectAffordableAsync1, handleWorker1);
}
