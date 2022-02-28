import { put, takeLatest } from "redux-saga/effects";
import axiosCustom from "../../../app/common/components/apiConfig";
import {
  handleNotificationAlertTrySelect,
  handleNotificationAlertCatch
} from "../../../app/common/method/handleNotificationAlert/";

export const actionTypes = {
  giftSelectActiveList: "[giftSelectActiveList] Action",
  giftSelectActiveList1: "[giftSelectActiveList1] Action",
  giftSelectActiveListLoad: "[giftSelectActiveListLoad] Action",
  giftSelectActiveListAsync: "[giftSelectActiveListAsync] Action",
  giftSelectActiveListAsync1: "[giftSelectActiveListAsync1] Action",
  giftRemoveState: "[giftRemoveState] Action"
};

const initialState = {
  data: [],

  load: false,
  size: 8,
  total: 50
};

export const reducergiftSelectActiveList = (
  state = initialState,
  { type, payload }
) => {
  switch (type) {
    case actionTypes.giftSelectActiveList:
      return {
        ...state,
        data: payload.results,
        total: payload.total ? payload.total : 50
      };
    case actionTypes.giftSelectActiveList1:
      return {
        ...state,
        data: [...state.data, ...payload.results],
        total: payload.total ? payload.total : 50
      };
    case actionTypes.giftSelectActiveListLoad:
      return {
        ...state,
        load: payload
      };
    case actionTypes.giftRemoveState:
      return initialState;
    default:
      return state;
  }
};

function* handleWorker({ payload }) {
  let config = {
    url: "select_request"
  };

  let data = {
    table: "gift",
    method_type: "select_active_gifts",
    size: payload.size ? payload.size : 8,
    from: payload.from ? payload.from : 0,
    sort_by: { remained_capacity: "desc" },
    data: payload.data ? payload.data : {}
  };
  yield put({ type: actionTypes.giftSelectActiveListLoad, payload: true });
  try {
    let res = yield axiosCustom(config, data);

    let flag = handleNotificationAlertTrySelect(res);
    if (!flag) return;
    yield put({
      type: actionTypes.giftSelectActiveList,
      payload: res.data.response.data
    });

    yield put({ type: actionTypes.giftSelectActiveListLoad, payload: false });
  } catch {
    handleNotificationAlertCatch();
  }
}
function* handleWorker1({ payload }) {
  let config = {
    url: "select_request"
  };

  let data = {
    table: "gift",
    method_type: "select_active_gifts",
    size: payload.size ? payload.size : 8,
    from: payload.from ? payload.from : 0,
    sort_by: { remained_capacity: "desc" },
    data: payload.data ? payload.data : {}
  };
  yield put({ type: actionTypes.giftSelectActiveListLoad, payload: true });
  try {
    let res = yield axiosCustom(config, data);

    let flag = handleNotificationAlertTrySelect(res);
    if (!flag) return;
    yield put({
      type: actionTypes.giftSelectActiveList1,
      payload: res.data.response.data
    });

    yield put({ type: actionTypes.giftSelectActiveListLoad, payload: false });
  } catch {
    handleNotificationAlertCatch();
  }
}

export function* giftSelectActiveList() {
  yield takeLatest(actionTypes.giftSelectActiveListAsync, handleWorker);
  yield takeLatest(actionTypes.giftSelectActiveListAsync1, handleWorker1);
}
