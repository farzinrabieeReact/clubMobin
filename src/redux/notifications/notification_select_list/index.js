
import { put, takeLatest } from "redux-saga/effects";
import axiosCustom from "../../../app/common/components/apiConfig";
import { handleNotificationAlertTrySelect, handleNotificationAlertCatch } from '../../../app/common/method/handleNotificationAlert/'


export const actionTypes = {
    notificationSelect: "[notificationSelect] Action",
    notificationSelectAsync: "[notificationSelectAsync] Action",
};


const initialState = {
    data: []
};


export const reducerNotificationSelectList = (state = initialState, { type, payload }) => {
    switch (type) {
        case actionTypes.notificationSelect:
            return {
                data: payload
            }

        default:
            return state
    }
}

function* handleWorker({payload}) {

    let config = {
        url: "select_request",
    }

    let data = {
        table: "notification",
        method_type: "select_notifications",
        from: 0,
        // size: 10,
        data: payload.data?payload.data:{}

    }


    try {
        let res = yield axiosCustom(config, data)
        let flag = handleNotificationAlertTrySelect(res)
        if (!flag) return
        yield put({ type: actionTypes.notificationSelect, payload: res.data.response.data.results })


    } catch  {
        handleNotificationAlertCatch()
    }


}


export function* notificationSelectList() {

    yield takeLatest(actionTypes.notificationSelectAsync, handleWorker)
}