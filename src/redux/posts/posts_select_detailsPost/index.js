
import { put, takeLatest } from "redux-saga/effects";
import axiosCustom from "../../../app/common/components/apiConfig";
import { handleNotificationAlertTrySelect, handleNotificationAlertCatch } from "./../../../app/common/method/handleNotificationAlert"




export const actionTypes = {
    detailsPost: "[detailsPost] Action",
    detailsPostAsync: "[detailsPostAsync] Action",
    detailsPostRemove: "[detailsPostRemove] Action",
};

const initialState = {
    data: []
};


export const reducerDetailPost = (state = initialState, { type, payload }) => {
    switch (type) {
        case actionTypes.detailsPost:
            return {
                data: payload
            }

        case actionTypes.detailsPostRemove:
            return initialState

        default:
            return state
    }
}


function* handleWorker(payload) {
    if (!payload.id) {
        return
    }
    let config = {
        url: "select_request",
    }


    let data = {
        table: "post",
        method_type: "select",
        data: {
            _id: payload.id
        }
    }

    try {
        let res = yield axiosCustom(config, data)
        let flag = handleNotificationAlertTrySelect(res)
        if (!flag) return
        yield put({ type: actionTypes.detailsPost, payload: res.data.response.data.results })
    } catch {
        handleNotificationAlertCatch()
    }



}


export function* watcherDetailPost() {
    yield takeLatest(actionTypes.detailsPostAsync, handleWorker)
}