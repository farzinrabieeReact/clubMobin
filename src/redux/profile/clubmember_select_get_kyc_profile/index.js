
import { put, takeLatest } from "redux-saga/effects";
import axiosCustom from "../../../app/common/components/apiConfig";
import { handleNotificationAlertTrySelect, handleNotificationAlertCatch } from '../../../app/common/method/handleNotificationAlert';



export const actionTypes = {
    get_kyc_profile: "[get_kyc_profile] Action",
    get_kyc_profileAsync: "[get_kyc_profileAsync] Action",
    remove_profileAsync: "[remove_profileAsync] Action",
};

const initialState = {
    data: [],
    isOk: false
};


export const reducer_get_kyc_profile = (state = initialState, { type, payload }) => {
    switch (type) {
        case actionTypes.get_kyc_profile:
            return {
                data: payload,
                isOk: true
            }
        case actionTypes.remove_profileAsync:
            return initialState

            
        default:
            return state
    }
}

function* handleWorker({ payload }) {

    let config = {
        url: "select_request",
    }

    let data = {
        table: "clubmember",
        method_type: "get_kyc_profile",
        token: "3cf61fab-b50a-410f-9d59-3357ee4706fe",
        member_id: "_0zehXYBdxxYGfkX5_wd",
        data: payload ? payload : {}
    }


    try {
        let res = yield axiosCustom(config, data)
        let flag = handleNotificationAlertTrySelect(res)
        if (!flag) return
        yield put({ type: actionTypes.get_kyc_profile, payload: res.data.response.data.results })
    } catch  {
        handleNotificationAlertCatch()
    }




}

export function* watcher_get_kyc_profile() {
    yield takeLatest(actionTypes.get_kyc_profileAsync, handleWorker)
}