import {put, takeLatest} from "redux-saga/effects";
import axiosCustom from "../../../../app/common/components/apiConfig";
import {handleNotificationAlertTrySelect , handleNotificationAlertCatch} from "../../../../app/common/method/handleNotificationAlert";

export const actionTypes = {
    bonusAsync: "[bonusAsync] Action",
    bonus: "[bonus] Action",
    bonusLoad: "[bonusLoad] Action"
}

const initialState = {
    data: [],
    load:false
}

export const reducer_bonus_select_list = (state = initialState, {type, payload}) => {
    switch (type) {
        case actionTypes.bonus:
            return {
                data: payload
            }
        case actionTypes.bonusLoad:
            return {
               ...state,
               load:payload
            }
        default:
            return state
    }

}

function* handleWorker({payload}) {
    let config = {
        url: "select_request"
    }
    let _data = {
        table: "bonus",
        method_type: "select",
        data: payload.data?payload.data:{},
    }
    yield put({type:actionTypes.bonusLoad,payload:true})
    try {
        let res = yield axiosCustom(config, _data)
        let flag = handleNotificationAlertTrySelect(res)
        if (!flag) return
        yield put({type: actionTypes.bonus, payload: res.data.response.data.results})
        yield put({type:actionTypes.bonusLoad,payload:false})
    } catch {
        handleNotificationAlertCatch()
    }
}


export function* bonus_select_list() {
    yield takeLatest(actionTypes.bonusAsync, handleWorker)
}