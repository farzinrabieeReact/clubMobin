
import { put, takeLatest } from "redux-saga/effects";
import axiosCustom from "../../../../app/common/components/apiConfig";
import { handleNotificationAlertTrySelect , handleNotificationAlertCatch } from '../../../../app/common/method/handleNotificationAlert';


export const actionTypes = {
    goverments: "[goverments] Action",
    govermentsAsync: "[govermentsAsync] Action",
    govermentsallData: "[govermentsallData] Action",
    govermentsAsyncallData: "[govermentsAsyncallData] Action",
};

const initialState = {
    data: [],
    allData : [] // lenght pagination page
};


export const reducer_goverments_select_list = (state = initialState, { type, payload }) => {
    switch (type) {
        case actionTypes.goverments:
            return {
                ...state,
                data: payload,
            }
            case actionTypes.govermentsallData:
                return {
                    ...state,
                    allData: payload,
                }
        default:
            return state
    }

}

function* handleWorker({data , pagination }) {

    let config = {
        url: "select_request",

    }

    let _data = {
        table: "pishkhan",
        method_type: "select",
        data: data ? data : {},
        ...pagination // from and size 

    }


    try {
        let res = yield axiosCustom(config, _data)
        let flag = handleNotificationAlertTrySelect(res)
        if (!flag) return
        yield put({ type: actionTypes.goverments, payload: res.data.response.data.results })

    } catch  {
        handleNotificationAlertCatch()
    }

}


function* handleWorkerAllData({data}) {

    let config = {
        url: "select_request",
    }

    let value = {
        table: "pishkhan",
        method_type: "select",
        data: data ? data : {},
    }

    let res = yield axiosCustom(config, value)
    yield put({ type: actionTypes.govermentsallData, payload: res.data.response.data.results })
}


export function* goverments_select_list() {

    yield takeLatest(actionTypes.govermentsAsync, handleWorker)
    yield takeLatest(actionTypes.govermentsAsyncallData, handleWorkerAllData)

}