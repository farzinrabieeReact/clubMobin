import { put, takeLatest } from "@redux-saga/core/effects";
import AxiosCustom from "../../../app/common/components/apiConfig";

export const actionTypes = {
  selectRequesStatus: "[selectRequesStatus] Action",
  selectRequesStatusLoad: "[selectRequesStatussLoad] Action",
  selectRequesStatussAsync: "[selectRequesStatusAsync] Action",
};

const initialState = {
  data: [],
  size: 10,
  total: 0,
  loading: false,
};

export const select_ime_request_status_reducer = (
  state = initialState,
  { type, payload }
) => {
  switch (type) {
    case actionTypes.selectRequesStatus:
      return {
        ...state,
        data: payload.results,
        total: payload.total
          ? payload.total > 10000
            ? 10000
            : payload.total
          : 0,
      };
    case actionTypes.selectRequesStatusLoad:
      return {
        ...state,
        loading: payload,
      };
    default:
      return state;
  }
};

function* handleWorker() {

  yield put({ type: actionTypes.selectRequesStatusLoad, payload: true });

  let config = {
    url: "select_request",
  };

  let data = {
    table: "imetrade",
    method_type: "select_ime_request_status",
    // from: payload?.from ? payload.from * 10 : payload.from,
    // size: payload?.size,
    data:  {
    trade_type_code:"",
        offer_code:"",
        from_date:"",
        to_date:"",
    },
    // sort_by: payload?.sort_by ? payload?.sort_by : {},
  };

  try {
    let res = yield AxiosCustom(config, data);
    console.log("resStatus",res);

    // let flag = handleNotificationAlertTrySelect(res);

    // if (!flag) return;

    if (res.data.response.is_successful) {
      yield put({
        type: actionTypes.selectRequesStatus,
        payload: res.data.response.data,
      });
    }

    yield put({ type: actionTypes.selectRequesStatusLoad, payload: false });
  } catch {
    //   handleNotificationAlertCatch();
    yield put({ type: actionTypes.selectRequesStatusLoad, payload: false });
  }
}

export function* selectImeRequesStattus() {


  yield takeLatest(actionTypes.selectRequesStatussAsync, handleWorker);
}
