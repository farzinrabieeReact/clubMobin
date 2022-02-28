
import { put, takeLatest } from "redux-saga/effects";
import AxiosCustom from "../../../../app/common/components/apiConfig";
import { handleNotificationAlertTrySelect, handleNotificationAlertCatch } from "../../../../app/common/method/handleNotificationAlert";




export const actionTypes = {
    StockPaymentInfo: "[StockPaymentInfo] Action",
    StockPaymentInfoAsync: "[StockPaymentInfoAsync] Action",
};

const initialState = {
    data: []
};


export const reducerStockPaymentInfo = (state = initialState, { type, payload }) => {
    switch (type) {
        case actionTypes.StockPaymentInfo:
            return {
                data: payload
            }
        default:
            return state
    }
}


function* handleWorker({data}) {
    let config = {
        url: "select_request",
    }

    let _data = {
        table:  "portfolio",
        method_type: "select_payment_info",
        data: data ? data : {} 
    }

    try {

        let res = yield AxiosCustom(config, _data)
        let flag = handleNotificationAlertTrySelect(res)
        if (!flag) return

        yield put({ type: actionTypes.StockPaymentInfo, payload: res.data.response.data.results })
    }
    catch {
        handleNotificationAlertCatch()
    }

}


export function* watcherStockPaymentInfo() {
    yield takeLatest(actionTypes.StockPaymentInfoAsync, handleWorker)
}