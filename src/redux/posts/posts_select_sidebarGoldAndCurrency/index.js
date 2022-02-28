
import { put, takeLatest } from "redux-saga/effects";
import axiosCustom from "../../../app/common/components/apiConfig";
import { handleNotificationAlertCatch, handleNotificationAlertTrySelect } from "../../../app/common/method/handleNotificationAlert";




export const actionTypes = {
    postsGoldAndCurrency: "[postsGoldAndCurrency] Action",
    postsGoldAndCurrencyAsync: "[postsGoldAndCurrencyAsync] Action",
    changeLoading: "[changeLoading] Action",
};

const initialState = {
    data: [],
    loading: false
};


export const reducerPostGoldAndCurrency = (state = initialState, { type, payload }) => {
    switch (type) {
        case actionTypes.postsGoldAndCurrency:
            return {
                data: payload
            }
        case actionTypes.changeLoading:
            return {
                ...state,
                loading: payload
            }
        default:
            return state
    }
}


function* handleWorker() {
    let config = {
        url: "select_request",
    }

    let data = {
        table: "post",
        method_type: "select",
        from: 0,
        size: 6,
        data: {
            subgroup_name: "طلا و ارز",
            parent_post_id: "null"
        }
    }

    yield put({ type: actionTypes.changeLoading, payload: true })

    try {
        let res = yield axiosCustom(config, data)
        let flag = handleNotificationAlertTrySelect(res)
        yield put({ type: actionTypes.changeLoading, payload: false })
        if (!flag) return
        
        yield put({ type: actionTypes.postsGoldAndCurrency, payload: res.data.response.data.results })

    } catch {
        handleNotificationAlertCatch()
        yield put({ type: actionTypes.changeLoading, payload: false })
    }

}


export function* watcherPostGoldAndCurrency() {
    yield takeLatest(actionTypes.postsGoldAndCurrencyAsync, handleWorker)
}