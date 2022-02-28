
import { takeLatest } from "redux-saga/effects";
import axiosCustom from "../../../../app/common/components/apiConfig";
import { handleNotificationAlertCatch, handleNotificationAlertTryUpdate } from "../../../../app/common/method/handleNotificationAlert";



export const insertInvitationLink = (payload)=>{
    let config = {
        url: "insert_request",
    }

    let data = {
        table: "clubmember",
        method_type: "send_invitation_link",
        data:  payload.data ?  payload.data : {}
    }

    return axiosCustom(config, data)
}



export const actionTypes = {
    invitationAsync: "[invitationAsync] Action",
};


function* handleWorker({ payload }) {

    let config = {
        url: "insert_request",
    }

    let data = {
        table: "clubmember",
        method_type: "send_invitation_link",
        data: {
            receiver_email: payload
        }
    }

    try {
        let res = yield axiosCustom(config, data)
        handleNotificationAlertTryUpdate(res)
    } catch {
   
        handleNotificationAlertCatch()
    }


}

export function* profileInvitation() {
    yield takeLatest(actionTypes.invitationAsync, handleWorker)
}