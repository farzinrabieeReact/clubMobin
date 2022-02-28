
import { put, takeLatest } from "redux-saga/effects";
import axiosCustom from "../../../../app/common/components/apiConfig";
import { handleNotificationAlertTrySelect , handleNotificationAlertCatch } from '../../../../app/common/method/handleNotificationAlert';


export const actionTypes = {
    education: "[education] Action",
    educationAsync: "[educationAsync] Action",
};

const initialState = {
    data: []
};


export const reducer_education_select_list = (state = initialState, { type, payload }) => {
    switch (type) {
        case actionTypes.education:
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

    let data = {
        table: "static",
        method_type: "select",
        data: { name: 'education_software' }
    }

    try {
        let res = yield axiosCustom(config, data)
        let flag = handleNotificationAlertTrySelect(res)
        if (!flag) return
        yield put({ type: actionTypes.education, payload: res.data.response.data.results })
    } catch  {
        handleNotificationAlertCatch()
    }


}


export function* education_select_list() {

    yield takeLatest(actionTypes.educationAsync, handleWorker)
}