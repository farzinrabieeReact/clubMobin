
import { put, takeLatest } from "redux-saga/effects";
import axiosCustom from "../../../app/common/components/apiConfig";
import { handleNotificationAlertTrySelect, handleNotificationAlertCatch } from '../../../app/common/method/handleNotificationAlert/'


export const actionTypes = {
    notificationDeactiveSelect: "[notificationDeactiveSelect] Action",
    notificationDeactiveSelectAsync: "[notificationDeactiveSelectAsync] Action",
};


const initialState = {
    data: []
};


export const notification_web_select_deactivate_reducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case actionTypes.notificationDeactiveSelect:
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
        table: "notification",
        method_type: "select_deactivate_web_notifications",
        from: 0,
        // size: 10,
        data: {
        }

    }


    try {
        let res = yield axiosCustom(config, data)
        let flag = handleNotificationAlertTrySelect(res)
        if (!flag) return
        yield put({ type: actionTypes.notificationDeactiveSelect, payload: res.data.response.data.results })


    } catch  {
        handleNotificationAlertCatch()
    }


}


export function* notification_web_select_deactivate() {

    yield takeLatest(actionTypes.notificationDeactiveSelectAsync, handleWorker)
}