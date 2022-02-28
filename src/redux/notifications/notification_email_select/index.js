
import { put , takeLatest } from "redux-saga/effects";
import axiosCustom from "../../../app/common/components/apiConfig";
import { handleNotificationAlertTrySelect , handleNotificationAlertCatch } from '../../../app/common/method/handleNotificationAlert'


export const actionTypes = {
    notificationEmail: "[notificationEmail] Action",
    notificationEmailAsync: "[notificationEmailAsync] Action",
};

const initialState = {
    data: [],
    from:0,
    // size:30,
};


export const notification_email_select_reducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case actionTypes.notificationEmail:
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
        // size:4,
        data: payload.data?payload.data:{}
    }

       
    try {
        let res = yield axiosCustom(config, data)
        let flag = handleNotificationAlertTrySelect(res)
        if (!flag) return
        yield put({type:actionTypes.notificationEmail , payload : res.data.response.data.results})


    } catch  {
        handleNotificationAlertCatch()
    }
  

}


export function* notification_email_select() {

    yield takeLatest(actionTypes.notificationEmailAsync, handleWorker)
}