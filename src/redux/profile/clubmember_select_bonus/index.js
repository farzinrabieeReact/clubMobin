
import { put, takeLatest } from "redux-saga/effects";
import axiosCustom from "../../../app/common/components/apiConfig";
import {handleNotificationAlertTrySelect , handleNotificationAlertCatch} from "../../../app/common/method/handleNotificationAlert";





export const actionTypes = {
    bonusSelect: "[bonusSelect] Action",
    bonusSelectAsync: "[bonusSelectAsync] Action",
    bonusLoading: "[bonusLoading] Action",
};

const initialState = {
    data:{},
    loading:false,
};


export const reducer_clubmember_select_bonus = (state = initialState, { type, payload }) => {
    switch (type) {
        case actionTypes.bonusSelect:
            return {
                data:payload,
            }
        // case actionTypes.bonusLoading:
        //     return {
        //         loading:payload
        //     }

        default:
            return state
    }
}


function* handleWorker({}) {

    let config = {
        url: "select_request",
    }
    //  
    let data = {
        table: "clubmember",
        method_type: "select_bonus",
        data:{},
       
    }

    // yield put({type:actionTypes.bonusLoading,payload:true})
    try {
        let res = yield axiosCustom(config, data)
        let flag = handleNotificationAlertTrySelect(res)
        if (!flag) return
        yield put({type: actionTypes.bonusSelect, payload: res.data.response.data.results})
        // yield put({type:actionTypes.bonusLoading,payload:false})
    } catch {
        handleNotificationAlertCatch()
    }




}


export function* bonusSelect() {
    yield takeLatest(actionTypes.bonusSelectAsync, handleWorker)
}