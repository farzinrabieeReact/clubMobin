
import { put , takeLatest } from "redux-saga/effects";
import axiosCustom from "../../../app/common/components/apiConfig";
import { handleNotificationAlertTrySelect , handleNotificationAlertCatch } from '../../../app/common/method/handleNotificationAlert/'


export const actionTypes = {
    notification: "[notification] Action",
    notificationAsync: "[notificationAsync] Action",
};

const initialState = {
    data: []
};


export const reducer_notification_select_notificationLast4 = (state = initialState, { type, payload }) => {
    switch (type) {
        case actionTypes.notification:
            return {
                data: payload
            }

        default:
            return state
    }
}

function* handleWorker(payload) {
    

    let config = {
        url: "select_request",
    }

    let data = {
        table: "notification",
        method_type: "select_notifications",
        from:0,
        size:4,
        data: {
            type:"WEB",
         }
    }

       
    try {
        let res = yield axiosCustom(config, data)
        let flag = handleNotificationAlertTrySelect(res)
        if (!flag) return
        yield put({type:actionTypes.notification , payload : res.data.response.data.results})


    } catch  {
        handleNotificationAlertCatch()
    }
  

}


export function* notification_select_notificationLast4() {

    yield takeLatest(actionTypes.notificationAsync, handleWorker)
}