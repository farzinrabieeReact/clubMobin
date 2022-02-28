
import { put, takeLatest } from "redux-saga/effects";
import axiosCustom from "../../../app/common/components/apiConfig";
import {  handleNotificationAlertCatch } from '../../../app/common/method/handleNotificationAlert';




export const actionTypes = {
    userNameSelect: "[userNameSelect] Action",
    userNameSelectClear: "[userNameSelectClear] Action",
    userNameSelectAsync: "[userNameSelectAsync] Action",
};

const initialState = {
    isOk: false
};


export const clubmember_select_userName_reducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case actionTypes.userNameSelect:
            return {
                isOk: true
            }
        case actionTypes.userNameSelectClear:
            return {
                isOk: false
            }

        default:
            return state
    }
}


function* handleWorker({ payload }) {

    let config = {
        url: "select_request",
    }
    //  
    let data = {
        table: "clubmember",
        method_type: "select_clubmember_by_username",
        data: payload.data ? payload.data : {},
        token: "3cf61fab-b50a-410f-9d59-3357ee4706fe",
    }



    try {
        let res = yield axiosCustom(config, data)

        if (!res.data.response.error_code) {
            if (res.data.response.data.results[0]) {
                if (res.data.response.data.results[0].body.state === 'Duplicate') {
                    yield put({ type: actionTypes.userNameSelect })
                   
                    return
                }
            }
        }

        // let flag = handleNotificationAlertTrySelect(res)
        // if (!flag) return

        yield put({ type: actionTypes.userNameSelectClear })
 

    } catch  {
        handleNotificationAlertCatch()
    }




}


export function* userNameSelect() {
    yield takeLatest(actionTypes.userNameSelectAsync, handleWorker)
}