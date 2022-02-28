
import { put, takeLatest } from "redux-saga/effects";
import AxiosCustom from "../../../../app/common/components/apiConfig";
import { handleNotificationAlertTrySelect, handleNotificationAlertCatch } from "../../../../app/common/method/handleNotificationAlert";




export const actionTypes = {
    stockRemain: "[stockRemain] Action",
    stockRemainAsync: "[stockRemainAsync] Action",
};

const initialState = {
    data: []
};


export const reducerStockRemain = (state = initialState, { type, payload }) => {
    switch (type) {
        case actionTypes.stockRemain:
            return {
                data: payload
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
        table:  "portfolio",
        method_type: "select_portfolio_remain",
        data: {}
    }


    try {

        let res = yield AxiosCustom(config, data)
        let flag = handleNotificationAlertTrySelect(res)
        if (!flag) return

        yield put({ type: actionTypes.stockRemain, payload: res.data.response.data.results })
    }
    catch {
        handleNotificationAlertCatch()
    }

}


export function* watcherStockRemain() {
    yield takeLatest(actionTypes.stockRemainAsync, handleWorker)
}