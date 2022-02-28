import { put, takeLatest } from "redux-saga/effects";
import axiosCustom from "../../../../app/common/components/apiConfig";
import {
  handleNotificationAlertTryUpdate,
  handleNotificationAlertCatch
} from "../../../../app/common/method/handleNotificationAlert";
import { actionTypes as bounusUpdater } from "../../../profile/clubmember_select_bonus";

export const actionTypes = {
  regsterInsertCourse: "[regsterInsertCourse ] Action",
  regsterInsertCourseAsync: "[regsterInsertCourseAsync ] Action",
  registerLoading: "[registerLoading ] Action",
  registerDone: "[registerDone] Action",
  registerRest: "[registerRest] Action"
};

const initialState = {
  data: [],
  loading: false,
  done: false
};

export const reducerRegsterInsertCourse = (
  state = initialState,
  { type, payload }
) => {
  switch (type) {
    case actionTypes.regsterInsertCourse:
      let data = JSON.stringify(payload);
      return {
        ...state,
        data: JSON.parse(data)
      };
    case actionTypes.registerLoading:
      return {
        ...state,
        loading: payload
      };

    case actionTypes.registerDone:
      return {
        ...state,
        done: payload
      };

    case actionTypes.registerRest:
      return initialState;

    default:
      return state;
  }
};

function* handleWorker({ data }) {
  yield put({ type: actionTypes.registerLoading, payload: true });

  let config = {
    url: "insert_request"
  };

  let _data = {
    table: "course",
    method_type: "register",
    data: data ? data : {}
  };

  let res;

  try {
    res = yield axiosCustom(config, _data);
    handleNotificationAlertTryUpdate(res);
    yield put({ type: actionTypes.registerLoading, payload: false });

    if (res && res.data.response.is_successful) {
      yield put({ type: actionTypes.registerDone, payload: true });
    }
    yield put({ type: bounusUpdater.bonusSelectAsync });
  } catch {
    handleNotificationAlertCatch();
    yield put({ type: actionTypes.registerLoading, payload: false });

  }
}

export function* watcherRegsterInsertCourse() {
  yield takeLatest(actionTypes.regsterInsertCourseAsync, handleWorker);
}
