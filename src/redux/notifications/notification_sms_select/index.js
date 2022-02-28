
import { put , takeLatest } from "redux-saga/effects";
import axiosCustom from "../../../app/common/components/apiConfig";
import { handleNotificationAlertTrySelect , handleNotificationAlertCatch } from '../../../app/common/method/handleNotificationAlert'


export const actionTypes = {
    notificationSms: "[notificationSms] Action",
    notificationSmsAsync: "[notificationSmsAsync] Action",
};

const initialState = {
    data: []
};


export const notification_sms_select_reducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case actionTypes.notificationSms:
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
        from:0,
        // size:10,
        data: payload.data?payload.data:{}
    }

       
    try {
        let res = yield axiosCustom(config, data)
        let flag = handleNotificationAlertTrySelect(res)
        if (!flag) return
        yield put({type:actionTypes.notificationSms , payload : res.data.response.data.results})


    } catch  {
        handleNotificationAlertCatch()
    }
  

}


export function* notification_sms_select(){

    yield takeLatest(actionTypes.notificationSmsAsync, handleWorker)
}