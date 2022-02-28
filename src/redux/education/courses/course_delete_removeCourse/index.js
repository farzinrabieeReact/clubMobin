
import { put, takeLatest } from "redux-saga/effects";
import axiosCustom from "../../../../app/common/components/apiConfig";
import { handleNotificationAlertTryUpdate, handleNotificationAlertCatch } from '../../../../app/common/method/handleNotificationAlert';



export const actionTypes = {
    removeCourse: "[removeCourse ] Action",
    removeCourseAsync: "[removeCourseAsync ] Action",
    removeCourseLoading: "[registerLoading ] Action",
    removeCourseDone: "[registerDone] Action",
    removeCourseRest: "[registerRest] Action"
};

const initialState = {
    data: [],
    loading: false,
    done: false
};


export const reducerRemoveCourse = (state = initialState, { type, payload }) => {
    switch (type) {
        case actionTypes.removeCourse:

            return {
                data: payload
            }
        case actionTypes.removeCourseLoading:
            return {
                ...state,
                loading: payload
            }

        case actionTypes.removeCourseDone:
            return {
                ...state,
                done: payload
            }

        case actionTypes.removeCourseRest:
            return initialState


        default:
            return state
    }
}


function* handleWorker({ data }) {

    yield put({ type: actionTypes.removeCourseLoading, payload: true })

    let config = {
        url: "update_request",
    }

    let _data = {
        table: "course",
        method_type: "unregister",
        data: data ? data : {}
    }

    let res;
    try {
        res = yield axiosCustom(config, _data)
        handleNotificationAlertTryUpdate(res)
        yield put({ type: actionTypes.removeCourseLoading, payload: false })

        if (res && res.data.response.is_successful) {
            yield put({ type: actionTypes.registerDone, payload: true })
        }
    } catch {
        handleNotificationAlertCatch()
        yield put({ type: actionTypes.removeCourseLoading, payload: false })

    }



}


export function* watcherRemoveCourse() {
    yield takeLatest(actionTypes.removeCourseAsync, handleWorker)
}