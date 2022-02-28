import { put, takeLatest } from "redux-saga/effects";
import axiosCustom from "../../../app/common/components/apiConfig";
import {
  handleNotificationAlertCatch,
  handleNotificationAlertTrySelect
} from "../../../app/common/method/handleNotificationAlert";
import { actionTypes as actionTypesNotif } from "./../../notificationAlert";

export const actionTypes = {
  posts: "[posts] Action",
  posts2: "[posts2] Action",
  posts3: "[posts3] Action",
  postsAsync: "[postsAsync] Action",
  postsAsync2: "[postsAsync2] Action",
  postsAsync3: "[postsAsync3] Action",
  postsRemove: "[postsRemove] Action",
  changeLoading: "[changeLoading] Action",
  changeLoading2: "[changeLoading2] Action"
};

const initialState = {
  data: [],
  data2: [],
  loading: false,
  loading2: false,
  size: 8,
  total: 20
};

export const reducerPostLast6 = (state = initialState, { type, payload }) => {
  switch (type) {
    case actionTypes.posts:
      return {
        ...state,
        data: payload.results,
        total: payload.total
          ? payload.total > 10000
            ? 10000
            : payload.total
          : 20
      };
    case actionTypes.posts2:
      return {
        ...state,
        data2: payload.results,
        total: payload.total
          ? payload.total > 10000
            ? 10000
            : payload.total
          : 20
      };
    case actionTypes.posts3:
      return {
        ...state,
        data: payload.results,
        size: 12,
        total: payload.total
          ? payload.total > 10000
            ? 10000
            : payload.total
          : 20
      };
    case actionTypes.changeLoading:
      return {
        ...state,
        loading: payload
      };
    case actionTypes.changeLoading2:
      return {
        ...state,
        loading2: payload
      };

    case actionTypes.postsRemove:
      return initialState;

    default:
      return state;
  }
};

function* handleWorker(payload) {
  const axiosInfo = Info(payload);

  yield put({ type: actionTypes.changeLoading, payload: true });

  try {
    let res = yield axiosCustom(axiosInfo[0], axiosInfo[1]);
    let flag = handleNotificationAlertTrySelect(res);

    yield put({ type: actionTypes.changeLoading, payload: false });

    if (!flag) return;

    // if (res.data.response?.data?.results?.length === 0) {
    //     yield put({ type: actionTypesNotif.info, textAlert: "پست بیشتری وجود ندارد." })
    // }

    yield put({ type: actionTypes.posts, payload: res.data.response.data });
  } catch {
    handleNotificationAlertCatch();
    yield put({ type: actionTypes.changeLoading, payload: false });
  }
}
function* handleWorker2(payload) {
  const axiosInfo = Info(payload);
  yield put({ type: actionTypes.changeLoading2, payload: true });

  try {
    let res = yield axiosCustom(axiosInfo[0], axiosInfo[1]);
    let flag = handleNotificationAlertTrySelect(res);

    yield put({ type: actionTypes.changeLoading2, payload: false });

    if (!flag) return;

    if (res.data.response?.data?.results?.length === 0) {
      yield put({
        type: actionTypesNotif.info,
        textAlert: "پست بیشتری وجود ندارد."
      });
    }

    yield put({ type: actionTypes.posts2, payload: res.data.response.data });
  } catch {
    handleNotificationAlertCatch();
    yield put({ type: actionTypes.changeLoading2, payload: false });
  }
}
function* handleWorker3(payload) {
  const axiosInfo = Info(payload);
  yield put({ type: actionTypes.changeLoading2, payload: true });

  try {
    let res = yield axiosCustom(axiosInfo[0], axiosInfo[1]);
    let flag = handleNotificationAlertTrySelect(res);

    yield put({ type: actionTypes.changeLoading2, payload: false });

    if (!flag) return;

    if (res.data.response?.data?.results?.length === 0) {
      yield put({
        type: actionTypesNotif.info,
        textAlert: "پست بیشتری وجود ندارد."
      });
    }

    yield put({ type: actionTypes.posts3, payload: res.data.response.data });
  } catch {
    handleNotificationAlertCatch();
    yield put({ type: actionTypes.changeLoading2, payload: false });
  }
}

const Info = payload => {
  let config = {
    url: "select_request"
  };

  let data = {
    table: "post",
    method_type: "select",
    from: payload.from ? ((payload.from - 1) * payload.size).toString() : "0",
    size: payload.size,
    data: payload.filter
  };
  let info = [config, data];
  return info;
};

export function* watcherPostLast6() {
  yield takeLatest(actionTypes.postsAsync, handleWorker);
  yield takeLatest(actionTypes.postsAsync2, handleWorker2);
  yield takeLatest(actionTypes.postsAsync3, handleWorker3);
}
