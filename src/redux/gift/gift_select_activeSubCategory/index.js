import { put, takeLatest } from "redux-saga/effects";
import axiosCustom from "../../../app/common/components/apiConfig";
import {
  handleNotificationAlertTrySelect,
  handleNotificationAlertCatch
} from "../../../app/common/method/handleNotificationAlert/";

export const actionTypes = {
  giftSelectActiveSubCategory: "[giftSelectActiveSubCategory] Action",
  giftSelectActiveSubCategoryLoading:
    "[giftSelectActiveSubCategoryLoading] Action",
  giftSelectActiveSubCategoryAsync: "[giftSelectActiveSubCategoryAsync] Action",
  giftSelectActiveSubCategoryRemove:
    "[giftSelectActiveSubCategoryRemove] Action"
};

const initialState = {
  data: [],
  loading: false
};

export const reducerGiftSelectActiveSubCategoryList = (
  state = initialState,
  { type, payload }
) => {
  switch (type) {
    case actionTypes.giftSelectActiveSubCategory:
      return {
        data: payload
      };
    case actionTypes.giftSelectActiveSubCategoryLoading:
      return {
        ...state,
        loading: payload
      };
    case actionTypes.giftSelectActiveSubCategoryRemove:
      return {
        ...state,
        data: []
      };
    default:
      return state;
  }
};

function* handleWorker({ payload }) {
  yield put({
    type: actionTypes.giftSelectActiveSubCategoryLoading,
    payload: true
  });

  let config = {
    url: "select_request"
  };

  let data = {
    table: "gift",
    method_type: "select_active_subcategories",
    data: payload ? payload : {}
  };

  try {
    let res = yield axiosCustom(config, data);
    let flag = handleNotificationAlertTrySelect(res);
    if (!flag) return;
    yield put({
      type: actionTypes.giftSelectActiveSubCategory,
      payload: res.data.response.data.results
    });
  } catch {
    handleNotificationAlertCatch();
  } finally {
    yield put({
      type: actionTypes.giftSelectActiveSubCategoryLoading,
      payload: false
    });
  }
}

export function* giftSelectActiveSubCategoryList() {
  yield takeLatest(actionTypes.giftSelectActiveSubCategoryAsync, handleWorker);
}
