
import { put, takeLatest } from "redux-saga/effects";
import axiosCustom from "../../../app/common/components/apiConfig";
import { handleNotificationAlertTrySelect, handleNotificationAlertCatch } from '../../../app/common/method/handleNotificationAlert';




export const actionTypes = {
    marketViewnMainContentTabpanel1DescMore: "[marketViewnMainContentTabpanel1DescMore] Action",
    marketViewnMainContentTabpanel1AscMore: "[marketViewnMainContentTabpanel1AscMore] Action",
    marketViewnMainContentTabpanel1DescOne: "[marketViewnMainContentTabpanel1DescOne] Action",
    marketViewnMainContentTabpanel1AscOne: "[marketViewnMainContentTabpanel1AscOne] Action",
    marketViewnMainContentTabpanel1Async: "[marketViewnMainContentTabpanel1Async] Action",
    marketViewnMainContentTabpanel1Loading: "[marketViewnMainContentTabpanel1Loading] Action",
};

const initialState = {
    asc: [],
    desc: [],
    loading: false,
    size: 5,
    total: 0
};


export const reducermarketViewnMainContentTabpanel1 = (state = initialState, { type, payload }) => {
    switch (type) {
        case actionTypes.marketViewnMainContentTabpanel1DescOne:
            return {
                ...state,
                desc: payload.results,
                loading: state.loading,
                total: payload.total

            }
        case actionTypes.marketViewnMainContentTabpanel1AscOne:
            return {
                ...state,
                asc: payload.results,
                loading: state.loading,
                total: payload.total
            }
        case actionTypes.marketViewnMainContentTabpanel1DescMore:
            return {
                ...state,
                desc: [...state.desc, ...payload.results],
                loading: state.loading,
                total: payload.total
            }
        case actionTypes.marketViewnMainContentTabpanel1AscMore:
            return {
                ...state,
                asc: [...state.asc, ...payload.results],
                loading: state.loading,
                total: payload.total
            }
        case actionTypes.marketViewnMainContentTabpanel1Loading:
            return {
                ...state,
                loading: payload
            }


        default:
            return state
    }
}

function* handleWorkerDesc({ payload }) {
    let { from, size, type, key, flow } = payload

    if (key === "total_sell_power") {
        key = "total_buy_power"
    } else if (key === "sell_count_individual") {
        key = "buy_count_individual"
    }

    yield put({ type: actionTypes.marketViewnMainContentTabpanel1Loading, payload: true })

    let config = {
        url: "select_request",
    }

    let data = {
        "table": "stock",
        "method_type": "select_stock_details",
        "from": (from - 1) * size,
        "size": size,
        "data": {
            "sorts": {
                [key]: "desc",
            },
            flow: Number(flow) ? Number(flow) : undefined
        }
    }

    try {
        let res = yield axiosCustom(config, data)
        let flag = handleNotificationAlertTrySelect(res)
        if (!flag) return

        if (type === "MORE") {
            yield put({ type: actionTypes.marketViewnMainContentTabpanel1DescMore, payload: res.data.response.data })
        }
        else if (type === "ONE") {
            yield put({ type: actionTypes.marketViewnMainContentTabpanel1DescOne, payload: res.data.response.data })
        }

    } catch {
        handleNotificationAlertCatch()
    }
}


function* handleWorkerAsc({ payload }) {
    let { from, size, type, key, flow } = payload
    let flag = false
    if (key === "total_sell_power" || key === "sell_count_individual") {
        flag = true
    }


    let config = {
        url: "select_request",
    }

    let data = {
        "table": "stock",
        "method_type": "select_stock_details",
        "from": (from - 1) * size,
        "size": size,
        "data": {
            "sorts": {
                [key]: flag ? "desc" : "asc",
            },
            flow: Number(flow) ? Number(flow) : undefined
        }
    }

    try {
        let res = yield axiosCustom(config, data)
        yield put({ type: actionTypes.marketViewnMainContentTabpanel1Loading, payload: false })
        let flag = handleNotificationAlertTrySelect(res)
        if (!flag) return

        if (type === "MORE") {
            yield put({ type: actionTypes.marketViewnMainContentTabpanel1AscMore, payload: res.data.response.data })
        }
        else if (type === "ONE") {
            yield put({ type: actionTypes.marketViewnMainContentTabpanel1AscOne, payload: res.data.response.data })
        }

    } catch {
        yield put({ type: actionTypes.marketViewnMainContentTabpanel1Loading, payload: false })
        handleNotificationAlertCatch()
    }
}


export function* watcherMarketViewnMainContentTabpanel1() {
    yield takeLatest(actionTypes.marketViewnMainContentTabpanel1Async, handleWorkerDesc)
    yield takeLatest(actionTypes.marketViewnMainContentTabpanel1Async, handleWorkerAsc)
}