import { put, takeLatest } from "@redux-saga/core/effects";
import AxiosCustom from "../../../app/common/components/apiConfig";

export const actionTypes = {
  selectTarde: "[selectTarde] Action",
  selectTardeLoad: "[selectTardeLoad] Action",
  selectTardeAsync: "[selectTardeAsync] Action",
};

const initialState = {
  data: [],
  size: 10,
  total: 0,
  loading: false,
};

export const bourse_select_trade_reducer = (
  state = initialState,
  { type, payload }
) => {
  switch (type) {
    case actionTypes.selectTarde:
      return {
        ...state,
        data: payload.results,
        total: payload.total
          ? payload.total > 10000
            ? 10000
            : payload.total
          : 0,
      };
    case actionTypes.selectTardeLoad:
      return {
        ...state,
        loading: payload,
      };
    default:
      return state;
  }
};

function* handleWorker({ payload }) {
  yield put({ type: actionTypes.selectTardeLoad, payload: true });

  let config = {
    url: "select_request",
  };

  let data = {
    table: "imetrade",
    method_type: "select_ime_trade",
    // from: payload?.from ? payload.from * 10 : payload.from,
    // size: payload?.size,
    data: payload?.data
      ? payload?.data
      : {
          contract_number: "",
          from_date: "",
          to_date: "",
          send_file: "",
          page_size: "",
          page_number: "",
          sort: "",
        },
    // sort_by: payload?.sort_by ? payload?.sort_by : {},
  };

  try {
    let res = yield AxiosCustom(config, data);

    // let flag = handleNotificationAlertTrySelect(res);

    // if (!flag) return;

    if (res.data.response.is_successful) {
      yield put({
        type: actionTypes.selectTarde,
        payload: res.data.response.data,
      });
    }

    yield put({ type: actionTypes.selectTardeLoad, payload: false });
  } catch {
    //   handleNotificationAlertCatch();
    yield put({ type: actionTypes.selectTardeLoad, payload: false });
  }
}

export function* bourseTardesSelect() {
  yield takeLatest(actionTypes.selectTardeAsync, handleWorker);
}
