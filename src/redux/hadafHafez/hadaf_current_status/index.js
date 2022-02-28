
import { put, takeLatest } from "redux-saga/effects";
import axiosCustom from "../../../app/common/components/apiConfig";
import { handleNotificationAlertTrySelect , handleNotificationAlertCatch } from '../../../app/common/method/handleNotificationAlert';



export const actionTypes = {
    hadafCurrentStatus: "[hadafCurrentStatus] Action",
    hadafCurrentStatusAsync: "[hadafCurrentStatusAsync] Action",
};

const initialState = {
    data: []
};


export const hadaf_current_status_reducer = (state = initialState, { type, payload }) => {

    switch (type) {
        case actionTypes.hadafCurrentStatus:
            let info = payload
            return {
                data:[...info]
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
        table: "HADAFHAFEZ",
        method_type: "select_current_status",
        // from: 0,
        // size: ,
        data:payload.data?payload.data:{}
    }

           
    try {
        let res = yield axiosCustom(config, data)
        let flag = handleNotificationAlertTrySelect(res)
        if (!flag) return
        yield put({ type: actionTypes.hadafCurrentStatus, payload: res.data.response.data.results })
    } catch  {
        handleNotificationAlertCatch()
    }
  



}

export function* hadafCurrentStatus() {
    yield takeLatest(actionTypes.hadafCurrentStatusAsync, handleWorker)
}