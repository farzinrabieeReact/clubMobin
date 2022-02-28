
import { put, takeLatest } from "redux-saga/effects";
import axiosCustom from "../../../../app/common/components/apiConfig";
import { handleNotificationAlertTrySelect , handleNotificationAlertCatch } from '../../../../app/common/method/handleNotificationAlert';


export const actionTypes = {
    job_opportunities: "[job_opportunities] Action",
    job_opportunitiesAsync: "[job_opportunitiesAsync] Action",
};

const initialState = {
    data: [
       
    ]
};


export const reducer_job_opportunities_select_list = (state = initialState, { type, payload }) => {
    switch (type) {
        case actionTypes.job_opportunities:
            return {
                data: payload
            }

        default:
            return state
    }
}

function* handleWorker() {

    let config = {
        url: "select_request",
    }

    let _data = {
        table: "static",
        method_type: "select",
        data: { name : 'job_opportunities'}          
    }


    try {
        let res = yield axiosCustom(config, _data)
        let flag = handleNotificationAlertTrySelect(res)
        if (!flag) return
        yield put({ type: actionTypes.job_opportunities, payload: res.data.response.data.results })


    } catch  {
        handleNotificationAlertCatch()
    }

}


export function* job_opportunities_select_list() {

    yield takeLatest(actionTypes.job_opportunitiesAsync, handleWorker)
}