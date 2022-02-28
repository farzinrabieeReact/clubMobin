
import { put, takeLatest } from "redux-saga/effects";
import axiosCustom from "../../../../app/common/components/apiConfig";
import { handleNotificationAlertTrySelect, handleNotificationAlertCatch } from '../../../../app/common/method/handleNotificationAlert/'



export const actionTypes = {
    activeCourse: "[activeCourse] Action",
    activeCourseLoading: "[activeCourseLoading] Action",
    activeCourseAsync: "[activeCourseAsync] Action",
};

const initialState = {
    data: [],
    loading: false
};


export const reducerActiveCourse = (state = initialState, { type, payload }) => {
    switch (type) {
        case actionTypes.activeCourse:
            let data = JSON.stringify(payload.results)
            return {
                data: JSON.parse(data)
            }
        case actionTypes.activeCourseLoading:
            return {
                ...state,
                loading: payload
            }
        default:
            return state
    }
}


function* handleWorker() {
    yield put({ type: actionTypes.activeCourseLoading, payload: true })

    let config = {
        url: "select_request",
    }

    let _data = {
        table: "course",
        method_type: "select_active_courses",
        from: 0,
        size: 50,
        data: {}
    }
    try {
        let res = yield axiosCustom(config, _data)
        yield put({ type: actionTypes.activeCourseLoading, payload: false })
        let flag = handleNotificationAlertTrySelect(res)
        if (!flag) return
        yield put({ type: actionTypes.activeCourse, payload: res.data.response.data })

    } catch {
        handleNotificationAlertCatch()
        yield put({ type: actionTypes.activeCourseLoading, payload: false })
    }
}


export function* watcherActiveCourse() {
    yield takeLatest(actionTypes.activeCourseAsync, handleWorker)
}