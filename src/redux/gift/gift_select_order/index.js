
import { put, takeLatest } from "redux-saga/effects";
import axiosCustom from "../../../app/common/components/apiConfig";
import { handleNotificationAlertTrySelect, handleNotificationAlertCatch } from '../../../app/common/method/handleNotificationAlert/'


export const actionTypes = {
    giftSelectOrder: "[giftSelectOrder] Action",
    giftSelectOrderLoading: "[giftSelectOrderLoading] Action",
    giftSelectOrderAsync: "[giftSelectOrderAsync] Action",

};

const initialState = {
    data: [],
    size: 7,
    total: 0,
    load: false
};


export const reducerGiftSelectOrder = (state = initialState, { type, payload }) => {
    switch (type) {
        case actionTypes.giftSelectOrder:
            return {
                ...state,
                data: payload.results,
                total: payload.total,
            }
        case actionTypes.giftSelectOrderLoading:
            return {
                ...state,
                load: payload
            }

        default:
            return state
    }
}

function* handleWorker({ payload }) {
    let config = {
        url: "select_request",
    }

    let data = {
        table: "gift",
        method_type: "select_registered_gifts",
        data: payload.data ? payload.data : {},
        ...payload
    }

    yield put({ type: actionTypes.giftSelectOrderLoading, payload: true })

    try {
        let res = yield axiosCustom(config, data)
        let flag = handleNotificationAlertTrySelect(res)
        if (!flag) return
        yield put({ type: actionTypes.giftSelectOrderLoading, payload: false })
        yield put({ type: actionTypes.giftSelectOrder, payload: res.data.response.data })
    } catch {
        handleNotificationAlertCatch()
        yield put({ type: actionTypes.giftSelectOrderLoading, payload: false })
    }


}


export function* giftSelectOrder() {
    yield takeLatest(actionTypes.giftSelectOrderAsync, handleWorker)
}