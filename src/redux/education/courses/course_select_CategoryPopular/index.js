
import { put, takeLatest } from "redux-saga/effects";
import axiosCustom from "../../../../app/common/components/apiConfig";
import { handleNotificationAlertTrySelect , handleNotificationAlertCatch } from '../../../../app/common/method/handleNotificationAlert/'




export const actionTypes = {
    categoryPopularCourse: "[categoryPopularCourse] Action",
    categoryPopularCourseAsync: "[categoryPopularCourseAsync] Action",
};

const initialState = {
    data: [

    ]
};


export const reducerCategoryPopularCourse = (state = initialState, { type, payload }) => {
    switch (type) {
        case actionTypes.categoryPopularCourse:
            let data = JSON.stringify(payload)
            return {
                data: JSON.parse(data)
            }
        default:
            return state
    }
}


function* handleWorker({ data }) {

    let config = {
        url: "select_request",
    }

    let _data = {
        table: "course",
        method_type: "select_popular_categories",
        data: data ? data : {}
    }

    try {
        let res = yield axiosCustom(config, _data)
        let flag = handleNotificationAlertTrySelect(res)
        if (!flag) return
        yield put({ type: actionTypes.categoryPopularCourse, payload: res.data.response.data.results })

    } catch  {
        handleNotificationAlertCatch()
    }
  
}


export function* watcherCategoryPopularCourse() {
    yield takeLatest(actionTypes.categoryPopularCourseAsync, handleWorker)
}