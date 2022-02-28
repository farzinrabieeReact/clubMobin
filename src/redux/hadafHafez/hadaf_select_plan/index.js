
import { put, takeLatest } from "redux-saga/effects";
import axiosCustom from "../../../app/common/components/apiConfig";
import { handleNotificationAlertTrySelect , handleNotificationAlertCatch } from '../../../app/common/method/handleNotificationAlert';



export const actionTypes = {
    hadafSelectPlan: "[hadafSelectPlan] Action",
    hadafSelectPlanAsync: "[hadafSelectPlanAsync] Action",
};

const initialState = {
    data: []
};


export const hadaf_select_plan_reducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case actionTypes.hadafSelectPlan:
            return {
                data: payload
            }
        default:
            return state
    }
}

function* handleWorker({}) {
    let config = {
        url: "select_request",
    }

    let data = {
        table: "HADAFHAFEZ",
        method_type: "select_subscription_plans",
        // from: 0,
        // size: ,
        data: {}
    }

           
    try {
        let res = yield axiosCustom(config, data)
        let flag = handleNotificationAlertTrySelect(res)
        if (!flag) return
        yield put({ type: actionTypes.hadafSelectPlan, payload: res.data.response.data.results })
    } catch  {
        handleNotificationAlertCatch()
    }
  



}

export function* hadafSelectPlan() {
    yield takeLatest(actionTypes.hadafSelectPlanAsync, handleWorker)
}