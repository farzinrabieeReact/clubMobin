import { put, takeLatest } from "redux-saga/effects";
import axiosCustom from "../../../app/common/components/apiConfig";
import {
  handleNotificationAlertTrySelect,
  handleNotificationAlertCatch,
} from "../../../app/common/method/handleNotificationAlert";

export const actionTypes = {
  hadafSelectDocument: "[hadafSelectDocument] Action",
  hadafSelectDocumentLoading: "[hadafSelectDocumentLoading] Action",
  hadafSelectDocumentAsync: "[hadafSelectDocumentAsync] Action",
};

const initialState = {
  data: [],
  total: 0,
  loading: false,
};

export const hadaf_select_document_reducer = (
  state = initialState,
  { type, payload }
) => {
  switch (type) {
    case actionTypes.hadafSelectDocument:
      return {
        ...state,
        data: payload.results,
        total: payload.total,
      };
    case actionTypes.hadafSelectDocumentLoading:
      return {
        ...state,
        loading: payload,
      };
    default:
      return state;
  }
};

function* handleWorker({ payload }) {
    yield put({type:actionTypes.hadafSelectDocumentLoading,payload:true})
  let config = {
    url: "select_request",
  };

  let data = {
    table: "HADAFHAFEZ",
    method_type: "select_documents",
    from: payload.from ? payload.from : 0,
    size: payload.size ? payload.size : 20,
    data: {},
  };

  try {
    let res = yield axiosCustom(config, data);
    let flag = handleNotificationAlertTrySelect(res);
    if (!flag) return;
    yield put({
      type: actionTypes.hadafSelectDocument,
      payload: res.data.response.data,
    });
  } catch {
    handleNotificationAlertCatch();
  }finally{
    yield put({type:actionTypes.hadafSelectDocumentLoading,payload:false})
  }
}

export function* hadafSelectdocument() {
  yield takeLatest(actionTypes.hadafSelectDocumentAsync, handleWorker);
}
