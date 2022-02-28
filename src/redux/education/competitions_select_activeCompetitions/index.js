
import { put, takeLatest, } from "redux-saga/effects";
import axiosCustom from "../../../app/common/components/apiConfig";
import { handleNotificationAlertTrySelect, handleNotificationAlertCatch } from '../../../app/common/method/handleNotificationAlert';


export const actionTypes = {
    activeCompetitions: "[activeCompetitions] Action",
    activeCompetitionsAsync: "[activeCompetitionsAsync] Action",
};

const initialState = {
    data: []
};


export const reducer_select_activeCompetitions = (state = initialState, { type, payload }) => {
    switch (type) {
        case actionTypes.activeCompetitions:
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
        table: "competition",
        method_type: "select_active_competitions",
        data: {
        }
    }


    try {
        let res = yield axiosCustom(config, data)
        let flag = handleNotificationAlertTrySelect(res)
        if (!flag) return

        if (res?.data?.response?.is_successful)
            yield put({ type: actionTypes.activeCompetitions, payload: res.data.response.data.results })
    } catch  {
        handleNotificationAlertCatch()
    }





}


export function* watcher_activeCompetitions() {
    yield takeLatest(actionTypes.activeCompetitionsAsync, handleWorker)
}