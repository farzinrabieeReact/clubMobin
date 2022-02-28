
import { put, takeLatest } from "redux-saga/effects";
import axiosCustom from "../../../app/common/components/apiConfig";
import { handleNotificationAlertTrySelect, handleNotificationAlertCatch } from '../../../app/common/method/handleNotificationAlert/'


export const actionTypes = {
    giftSelectActiveCategoris: "[giftSelectActiveCategoris] Action",
    giftSelectActiveCategorisAsync: "[giftSelectActiveCategorisAsync] Action",
    giftSelectActiveCategoriLoading: "[giftSelectActiveCategoriLoading] Action",
};

const initialState = {
    data: [],
    loading: false,
};


export const reducergiftSelectActiveCategorisList = (state = initialState, { type, payload }) => {
    switch (type) {
        case actionTypes.giftSelectActiveCategoris:
            return {
                ...state,
                data: payload
            }
        case actionTypes.giftSelectActiveCategoriLoading:
            return {
                ...state,
                loading: payload
            }
        default:
            return state
    }
}

function* handleWorker() {

    yield put({ type: actionTypes.giftSelectActiveCategoriLoading, payload: true })


    let config = {
        url: "select_request",
    }

    let data = {
        table: "gift",
        method_type: "select_active_categories",
        data: {}
    }


    try {

        let res = yield axiosCustom(config, data)
        let flag = handleNotificationAlertTrySelect(res)

        yield put({ type: actionTypes.giftSelectActiveCategoriLoading, payload: false })

        if (!flag) return
        yield put({ type: actionTypes.giftSelectActiveCategoris, payload: res.data.response.data.results })


    } catch  {
        handleNotificationAlertCatch()
    }


}


export function* giftSelectActiveCategorisList() {

    yield takeLatest(actionTypes.giftSelectActiveCategorisAsync, handleWorker)
}