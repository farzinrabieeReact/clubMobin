
import { put, takeLatest } from "redux-saga/effects";
import axiosCustom from "../../../app/common/components/apiConfig";
import { handleNotificationAlertTrySelect, handleNotificationAlertCatch } from '../../../app/common/method/handleNotificationAlert';


export const actionTypes = {
    marketViewAbnormalVolumeDescOne: "[marketViewAbnormalVolumeDescOne] Action",
    marketViewAbnormalVolumeDescMore: "[marketViewAbnormalVolumeDescMore] Action",
    marketViewAbnormalVolumeAsync: "[marketViewAbnormalVolumeAsync] Action",
    marketViewAbnormalVolumeLoading: "[marketViewAbnormalVolumeLoading] Action",
};

const initialState = {
    desc: [],
    loading: false ,
    size: 5,
    total: 0
};


export const reducermarketViewAbnormalVolume = (state = initialState, { type, payload }) => {
    switch (type) {
        case actionTypes.marketViewAbnormalVolumeDescOne:
            return {
                ...state,
                desc: payload.results,
                total: payload.total
            }
            case actionTypes.marketViewAbnormalVolumeDescMore:
                return {
                    ...state,
                    desc: [...state.desc , ...payload.results],
                    total: payload.total
                }
        case actionTypes.marketViewAbnormalVolumeLoading:
            return {
                ...state ,
                loading: payload
            }
        default:
            return state
    }
}


function* handleWorkerDesc({payload}) {
    yield put({ type: actionTypes.marketViewAbnormalVolumeLoading, payload: true })
    let { from, size , type } = payload


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
                "abnormal_volume": "desc"
            }
        }
    }

    try {
        let res = yield axiosCustom(config, data)
        yield put({ type: actionTypes.marketViewAbnormalVolumeLoading, payload: false })
        let flag = handleNotificationAlertTrySelect(res)
        if (!flag) return

        if (type === "MORE") {
            yield put({ type: actionTypes.marketViewAbnormalVolumeDescMore, payload: res.data.response.data })
        } else if (type === "ONE") {
            yield put({ type: actionTypes.marketViewAbnormalVolumeDescOne, payload: res.data.response.data })
        }

    } catch {
        handleNotificationAlertCatch()
        yield put({ type: actionTypes.marketViewAbnormalVolumeLoading, payload: false })
    }
}


export function* watcherMarketViewAbnormalVolume() {
    yield takeLatest(actionTypes.marketViewAbnormalVolumeAsync, handleWorkerDesc)
}