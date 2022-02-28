
import { put, takeLatest } from "redux-saga/effects";
import axiosCustom from "../../../../app/common/components/apiConfig";
import { handleNotificationAlertTrySelect, handleNotificationAlertCatch } from '../../../../app/common/method/handleNotificationAlert';


export const actionTypes = {
    faq: "[faq] Action",
    faqAsync: "[faqAsync] Action",
    faqEmpty: "[faqEmpty] Action",
};

const initialState = {
    data: []
};


export const reducer_faq_select_list = (state = initialState, { type, payload }) => {
    switch (type) {
        case actionTypes.faq:
            return {
                data: payload
            }
        case actionTypes.faqEmpty:
            return { data: [] }
        default:
            return state
    }
}

function* handleWorker({ data }) {

    let config = {
        url: "select_request",
    }

    let _data = {
        table: "faq",
        method_type: "select",
        data: data ? data : {}


    }

    try {

        let res = yield axiosCustom(config, _data)
        let flag = handleNotificationAlertTrySelect(res)
        if (!flag) return
        yield put({ type: actionTypes.faq, payload: res.data.response.data.results })
    } catch  {
        handleNotificationAlertCatch()
    }


}


export function* faq_select_list() {

    yield takeLatest(actionTypes.faqAsync, handleWorker)
}