
import { put, takeLatest } from "redux-saga/effects";
import axiosCustom from "../../../app/common/components/apiConfig";
import { handleNotificationAlertTrySelect, handleNotificationAlertCatch } from '../../../app/common/method/handleNotificationAlert';




export const actionTypes = {
    marketViewTradeCount: "[marketViewTradeCount] Action",
    marketViewTradeCountLoading: "[marketViewTradeCountLoading] Action",
    marketViewTradeCountAsync: "[marketViewTradeCountAsync] Action",
};

const initialState = {
    data: [],
    loading: false
};


export const reducermarketViewTradeCount = (state = initialState, { type, payload }) => {
    switch (type) {
        case actionTypes.marketViewTradeCount:
            return {
                data: payload,
                loading: state.loading
            }
        case actionTypes.marketViewTradeCountLoading:
            return {
                data: state.data,
                loading: payload
            }

        default:
            return state
    }
}


function* handleWorker() {
    yield put({ type: actionTypes.marketViewTradeCountLoading, payload: true })


    let config = {
        url: "select_request",
    }

    let data = {
        "table": "stock",
        "method_type": "select_stock_details",
        "from": 0,
        "size": 7,
        "data": {
            "sorts": {
                "trade_count": "desc"
            }
        }
    }


    try {
        let res = yield axiosCustom(config, data)
        yield put({ type: actionTypes.marketViewTradeCountLoading, payload: false })
        let flag = handleNotificationAlertTrySelect(res)
        if (!flag) return

        yield put({ type: actionTypes.marketViewTradeCount, payload: res.data.response.data.results })

    } catch {
        yield put({ type: actionTypes.marketViewTradeCountLoading, payload: false })
        handleNotificationAlertCatch()
    }




}


export function* watcherMarketViewTradeCount() {
    yield takeLatest(actionTypes.marketViewTradeCountAsync, handleWorker)
}