
import { put, takeLatest } from "redux-saga/effects";
import axiosCustom from "../../../app/common/components/apiConfig";
import { handleNotificationAlertCatch, handleNotificationAlertTrySelect } from "../../../app/common/method/handleNotificationAlert";




export const actionTypes = {
    postSidebar: "[postSidebar] Action",
    postSidebarAsync: "[postSidebarAsync] Action",
    postSidebarRemove: "[postSidebarRemove] Action",
    changeLoading: "[changeLoading] Action",
};

const initialState = {
    data: [],
    loading: false
};


export const reducerPostSidebar = (state = initialState, { type, payload }) => {
    switch (type) {
        case actionTypes.postSidebar:
            return {
                data: payload
            }
        case actionTypes.changeLoading:
            return {
                ...state,
                loading: payload
            }
        case actionTypes.postSidebarRemove:
            return initialState
        default:
            return state
    }
}


function* handleWorker(payload) {
    let config = {
        url: "select_request",
    }

    let data = {
        table: "post",
        method_type: "select",
        from: 0,
        size: 6,
        data: {
            subgroup_name: payload.subgroup_name,
            parent_post_id: "null"
        }
    }

    yield put({ type: actionTypes.changeLoading, payload: true })

    try {
        let res = yield axiosCustom(config, data)
        let flag = handleNotificationAlertTrySelect(res)
        yield put({ type: actionTypes.changeLoading, payload: false })
        if (!flag) return

        yield put({ type: actionTypes.postSidebar, payload: res.data.response.data.results })

    } catch {
        handleNotificationAlertCatch()
        yield put({ type: actionTypes.changeLoading, payload: false })
    }

}


export function* watcherPostSidebar() {
    yield takeLatest(actionTypes.postSidebarAsync, handleWorker)
}