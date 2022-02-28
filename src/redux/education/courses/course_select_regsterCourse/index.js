
import { put, takeLatest } from "redux-saga/effects";
import axiosCustom from "../../../../app/common/components/apiConfig";
import { handleNotificationAlertTrySelect, handleNotificationAlertCatch } from '../../../../app/common/method/handleNotificationAlert/'




export const actionTypes = {
    regsterCourse: "[regsterCourse] Action",
    regsterCourseLoading: "[regsterCourseLoading] Action",
    regsterCourseAsync: "[regsterCourseAsync] Action",
    loading: false
};

const initialState = {
    data: []
};


export const reducerRegsterCourse = (state = initialState, { type, payload }) => {
    switch (type) {
        case actionTypes.regsterCourse:

            return {
                data: payload
            }
        case actionTypes.regsterCourseLoading:
            return {
                ...state,
                loading: payload
            }
        default:
            return state
    }
}


function* handleWorker() {
    yield put({ type: actionTypes.regsterCourseLoading, payload: true })

    let config = {
        url: "select_request",
    }

    let _data = {
        table: "course",
        method_type: "select_registrations",
        from: 0,
        size: 15,
        data: {}
    }

    try {
        let res = yield axiosCustom(config, _data)
        yield put({ type: actionTypes.regsterCourseLoading, payload: false })
        let flag = handleNotificationAlertTrySelect(res)
        if (!flag) return
        yield put({ type: actionTypes.regsterCourse, payload: res.data.response.data.results })

    } catch {
        handleNotificationAlertCatch()
        yield put({ type: actionTypes.regsterCourseLoading, payload: false })
    }

}


export function* watcherRegsterCourse() {
    yield takeLatest(actionTypes.regsterCourseAsync, handleWorker)
}