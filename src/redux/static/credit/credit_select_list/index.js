
import { put, takeLatest } from "redux-saga/effects";
import axiosCustom from "../../../../app/common/components/apiConfig";
import { handleNotificationAlertTrySelect , handleNotificationAlertCatch } from '../../../../app/common/method/handleNotificationAlert';


export const actionTypes = {
    credit: "[credit] Action",
    creditAsync: "[creditAsync] Action",
};

const initialState = {
    data: []
};


export const reducer_credit_select_list = (state = initialState, { type, payload }) => {
    switch (type) {
        case actionTypes.credit:
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
        table: "static",
        method_type: "select",
        data: { name: 'credit' }
    }


    try {
        let res = yield axiosCustom(config, data)
        let flag = handleNotificationAlertTrySelect(res)
        if (!flag) return
        yield put({ type: actionTypes.credit, payload: res.data.response.data.results })
    } catch  {
        handleNotificationAlertCatch()
    }


}


export function* credit_select_list() {

    yield takeLatest(actionTypes.creditAsync, handleWorker)
}