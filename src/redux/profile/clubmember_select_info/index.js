
import { put , takeLatest } from "redux-saga/effects";
import axiosCustom from "../../../app/common/components/apiConfig";
import { handleNotificationAlertTrySelect , handleNotificationAlertCatch } from '../../../app/common/method/handleNotificationAlert';




export const actionTypes = {
    profile: "[profile] Action",
    profileAsync: "[profileAsync] Action",
};

const initialState = {
    data: []
};


export const reducerProfile = (state = initialState, { type, payload }) => {
    switch (type) {
        case actionTypes.profile:
            return {
                data: payload
            }

        default:
            return state
    }
}


function* handleWorker({national_id}) {

    let config = {  
        url: "select_request",
    }

    let data = {
        table: "clubmember",
        method_type: "select_with_profile_picture",
        data: {
            national_id
        }
    }


               
    try {
        let res = yield axiosCustom(config, data)
        let flag = handleNotificationAlertTrySelect(res)
        if (!flag) return
        yield put({type:actionTypes.profile , payload : res.data.response.data.results})

    } catch  {
        handleNotificationAlertCatch()
    }
  



}


export function* profile() {
    yield takeLatest(actionTypes.profileAsync, handleWorker)
}