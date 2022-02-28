
import { put, takeLatest } from "redux-saga/effects";
import AxiosCustom from "../../../../app/common/components/apiConfig";
import { handleNotificationAlertTrySelect, handleNotificationAlertCatch } from "../../../../app/common/method/handleNotificationAlert";




export const actionTypes = {
    StockPaymentDetails: "[StockPaymentDetails] Action",
    StockPaymentDetailsAsync: "[StockPaymentDetailsAsync] Action",
};

const initialState = {
    data: []
};


export const reducerStockPaymentDetails = (state = initialState, { type, payload }) => {
    switch (type) {
        case actionTypes.StockPaymentDetails:
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
        method_type: "select_payment_detail",
        data: data ? data : {} ,
    }

    try {

        let res = yield AxiosCustom(config, _data)
        let flag = handleNotificationAlertTrySelect(res)
        if (!flag) return

        yield put({ type: actionTypes.StockPaymentDetails, payload: res.data.response.data.results })
    }
    catch {
        handleNotificationAlertCatch()
    }

}


export function* watcherStockPaymentDetails() {
    yield takeLatest(actionTypes.StockPaymentDetailsAsync, handleWorker)
}