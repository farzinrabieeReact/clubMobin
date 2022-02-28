import AxiosCustom from "../../../../app/common/components/apiConfig";
import {handleNotificationAlertCatch, handleNotificationAlertTrySelect} from "../../../../app/common/method/handleNotificationAlert";
import { put, takeLatest } from "redux-saga/effects";

export const actionTypes = {
  brochure: "[brochure] Action",
  brochureAsync: "[brochureAsync] Action"
};

const initialState = {
  data: []
};
export const reducer_brochure_select_list = (
  state = initialState,
  { type, payload }
) => {
  switch (type) {
    case actionTypes.brochure:
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
  }
  let data = {
    table: "static",
    method_type: "select",
    data:{name:"education_brochure"}
  }
  try {
    let res = yield AxiosCustom(config, data);
    let flag = handleNotificationAlertTrySelect(res);
    if (!flag) return;
    yield put({type: actionTypes.brochure,payload:res.data.response.data.results});
  } catch {
    handleNotificationAlertCatch();
  }
}
export function* brochure_select_list() {
  yield takeLatest(actionTypes.brochureAsync, handleWorker);
}
