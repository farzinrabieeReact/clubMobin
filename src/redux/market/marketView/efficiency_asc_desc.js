
import { put, takeLatest } from "redux-saga/effects";
import axiosCustom from "../../../app/common/components/apiConfig";
import { handleNotificationAlertTrySelect, handleNotificationAlertCatch } from '../../../app/common/method/handleNotificationAlert';




export const actionTypes = {
    marketViewEfficiencyDesc: "[marketViewEfficiencyDesc] Action",
    marketViewEfficiencyAsc: "[marketViewEfficiencyAsc] Action",
    marketViewEfficiencyAsync: "[marketViewEfficiencyAsync] Action",
    marketViewEfficiencyLoading: "[marketViewEfficiencyLoading] Action",
};

const initialState = {
    asc: [],
    desc: [],
    loading: false

};


export const reducermarketViewEfficiency = (state = initialState, { type, payload }) => {
    switch (type) {
        case actionTypes.marketViewEfficiencyDesc:
            return {
                ...state,
                desc: payload,
                loading: state.loading
            }
        case actionTypes.marketViewEfficiencyAsc:
            return {
                ...state,
                asc: payload,
                loading: state.loading
            }
        case actionTypes.marketViewEfficiencyLoading:
            return {
                ...state ,
                loading: payload
            }


        default:
            return state
    }
}


function* handleWorkerDesc() {
    yield put({ type: actionTypes.marketViewEfficiencyLoading, payload: true })

    let config = {
        url: "select_request",
    }

    let data = {
        "table": "stock",
        "method_type": "select_stock_details",
        "from": 0,
        "size": 3,
        "data": {
            "sorts": {
                "daily_stock_return": "desc"
            }
        }
    }

    try {
        let res = yield axiosCustom(config, data)
        let flag = handleNotificationAlertTrySelect(res)
        if (!flag) return
        yield put({ type: actionTypes.marketViewEfficiencyDesc, payload: res.data.response.data.results })

    } catch {
        handleNotificationAlertCatch()
    }
}


function* handleWorkerAsc() {

    let config = {
        url: "select_request",
    }

    let data = {
        "table": "stock",
        "method_type": "select_stock_details",
        "from": 0,
        "size": 3,
        "data": {
            "sorts": {
                "daily_stock_return": "asc"
            }
        }
    }

    try {
        let res = yield axiosCustom(config, data)
        yield put({ type: actionTypes.marketViewEfficiencyLoading, payload: false })
        let flag = handleNotificationAlertTrySelect(res)
        if (!flag) return

        yield put({ type: actionTypes.marketViewEfficiencyAsc, payload: res.data.response.data.results })

    } catch {
        yield put({ type: actionTypes.marketViewEfficiencyLoading, payload: false })
        handleNotificationAlertCatch()
    }
}


export function* watcherMarketViewEfficiency() {
    yield takeLatest(actionTypes.marketViewEfficiencyAsync, handleWorkerDesc)
    yield takeLatest(actionTypes.marketViewEfficiencyAsync, handleWorkerAsc)
}