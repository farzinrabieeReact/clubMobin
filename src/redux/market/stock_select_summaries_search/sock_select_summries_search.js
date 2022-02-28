import { put, takeLatest } from "redux-saga/effects";
import AxiosCustom from "../../../app/common/components/apiConfig";
import {
  handleNotificationAlertTrySelect,
  handleNotificationAlertCatch,
} from "../../../app/common/method/handleNotificationAlert";

export const actionTypes = {
  stockListSearch: "[stockListSearch] Action",
  stockListSearchLoad: "[stockListSearch] Action",
  stockListSearchAsync: "[stockListSearchAsync] Action",
};

const initialState = {
  data: [],
  data2: [],
  isinJson: {},
};

export const reducerStockListSearch = (
  state = initialState,
  { type, payload }
) => {
  switch (type) {
    case actionTypes.stockListSearch:
      let obj = {};
      payload.forEach((element) => {
        obj[element.body.isin] = element.body.short_name;
      });
      return {
        ...state,
        data: payload,
        isinJson: obj,
      };
    // case actionTypes.stockListSearch2:
    //   return {
    //       ...state,
    //     data2: payload,
    //   };
    default:
      return state;
  }
};

function* handleWorker({ payload }) {
  let config = {
    url: "select_request",
  };

  //   console.log("payload",payload)

  let data = { ...payload };
  

 
  try {
    let res = yield AxiosCustom(config, data);
    let flag = handleNotificationAlertTrySelect(res);
    if (!flag) return;

    yield put({
      type: actionTypes.stockListSearch,
      payload: res.data.response.data.results,
    });

  } catch {
    handleNotificationAlertCatch();
  }
}

export function* watcherStockListSearch() {
  yield takeLatest(actionTypes.stockListSearchAsync, handleWorker);
}
