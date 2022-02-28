
import { put, takeLatest } from "redux-saga/effects";
import AxiosCustom from "../../../../app/common/components/apiConfig";
import { handleNotificationAlertTrySelect, handleNotificationAlertCatch } from "../../../../app/common/method/handleNotificationAlert";




export const actionTypes = {
    stockOfflineOrders: "[stockOfflineOrders] Action",
    stockOfflineOrdersAsync: "[stockOfflineOrdersAsync] Action",
};

const initialState = {
    data: []
};


export const reducerStockOfflineOrders = (state = initialState, { type, payload }) => {
    switch (type) {
        case actionTypes.stockOfflineOrders:
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
        table:  "offlineorder",
        method_type: "select_offline_orders",
        data: {}
    }


    try {

        let res = yield AxiosCustom(config, data)
        let flag = handleNotificationAlertTrySelect(res)
        if (!flag) return

        yield put({ type: actionTypes.stockOfflineOrders, payload: res.data.response.data.results })
    }
    catch {
        handleNotificationAlertCatch()
    }

}


export function* watcherStockOfflineOrders() {
    yield takeLatest(actionTypes.stockOfflineOrdersAsync, handleWorker)
}