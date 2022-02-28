
import { put, takeLatest } from "redux-saga/effects";
import axiosCustom from "../../../app/common/components/apiConfig";
import { handleNotificationAlertTrySelect , handleNotificationAlertCatch } from '../../../app/common/method/handleNotificationAlert';



export const actionTypes = {
    hadafSelectdetails: "[hadafSelectdetails] Action",
    hadafSelectdetailsAsync: "[hadafSelectdetailsAsync] Action",
};

const initialState = {
    data: []
};


export const hadaf_select_details_reducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case actionTypes.hadafSelectdetails:
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
        table: "HADAFHAFEZ",
        method_type: "get_document_details",
        // from: 0,
        // size: ,
        data:payload.data?payload.data:{}
    }

           
    try {
        let res = yield axiosCustom(config, data)
        let flag = handleNotificationAlertTrySelect(res)
        if (!flag) return
        yield put({ type: actionTypes.hadafSelectdetails, payload: res.data.response.data.results })
    } catch  {
        handleNotificationAlertCatch()
    }
  



}

export function* hadafSelectdetails() {
    yield takeLatest(actionTypes.hadafSelectdetailsAsync, handleWorker)
}