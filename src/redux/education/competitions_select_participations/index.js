
import { put, takeLatest } from "redux-saga/effects";
import axiosCustom from "../../../app/common/components/apiConfig";
import { handleNotificationAlertTrySelect, handleNotificationAlertCatch } from '../../../app/common/method/handleNotificationAlert';


export const actionTypes = {
    archive_participations: "[archive_participations] Action",
    archive_participationsAsync: "[archive_participationsAsync] Action",
};

const initialState = {
    data: []
};


export const reducer_select_archive_participations = (state = initialState, { type, payload }) => {
    switch (type) {
        case actionTypes.archive_participations:
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
        method_type: "select_participations",
        data: {
        }
    }

    try {
        let res = yield axiosCustom(config, data)
        let flag = handleNotificationAlertTrySelect(res)
        if (!flag) return
        if (res?.data?.response?.is_successful)
            yield put({ type: actionTypes.archive_participations, payload: res.data.response.data.results })
    } catch  {
        handleNotificationAlertCatch()
    }


}


export function* watcher_archive_participations() {
    yield takeLatest(actionTypes.archive_participationsAsync, handleWorker)
}