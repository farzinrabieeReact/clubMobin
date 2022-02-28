
import { put, takeLatest } from "redux-saga/effects";
import axiosCustom from "../../../app/common/components/apiConfig";
import { handleNotificationAlertCatch, handleNotificationAlertTrySelect } from "../../../app/common/method/handleNotificationAlert";



export const actionTypes = {
    forum: "[forum] Action",
    forumAsync: "[forumAsync] Action",
};

const initialState = {
    data: []
};


export const reducer_select_forum = (state = initialState, { type, payload }) => {
    switch (type) {
        case actionTypes.forum:
            return {
                data: payload
            }
        default:
            return state
    }
}


function* handleWorker(payload) {
    let config = {
        url: "select_request",
    }

    let data = {
        table: "forum",
        method_type: "select",
        data: payload.filter ? payload.filter : {}
    }


    try {
        let res = yield axiosCustom(config, data)
        if (!handleNotificationAlertTrySelect(res)) return

        yield put({ type: actionTypes.forum, payload: res.data.response.data.results })
    } catch {
        handleNotificationAlertCatch()
    }
}


export function* watcher_select_forum() {
    yield takeLatest(actionTypes.forumAsync, handleWorker)
}