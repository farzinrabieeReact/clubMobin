
import { put, takeLatest } from "redux-saga/effects";
import axiosCustom from "../../../../app/common/components/apiConfig";
import { handleNotificationAlertTrySelect , handleNotificationAlertCatch } from '../../../../app/common/method/handleNotificationAlert';


export const actionTypes = {
    branchPage: "[branchPage] Action",
    branchPageAsync: "[branchPageAsync] Action",
    branchPageallData: "[branchPageallData] Action",
    branchPageAsyncallData: "[branchPageAsyncallData] Action",
};

const initialState = {
    data: [],
    allData : [] // lenght pagination page
};


export const reducer_branch_select_list = (state = initialState, { type, payload }) => {
    switch (type) {
        case actionTypes.branchPage:
            return {
                ...state,
                data: payload,
            }
            case actionTypes.branchPageallData:
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
        table: "shoab",
        method_type: "select",
        data: data ? data : {},
        ...pagination // from and size 

    }

    
    try {
        let res = yield axiosCustom(config, _data)
        let flag = handleNotificationAlertTrySelect(res)
        if (!flag) return
        yield put({ type: actionTypes.branchPage, payload: res.data.response.data.results })
    } catch  {
        handleNotificationAlertCatch()
    }



}


function* handleWorkerAllData({data}) {

    let config = {
        url: "select_request",
    }

    let value = {
        table: "shoab",
        method_type: "select",
        data: data ? data : {},
    }

    let res = yield axiosCustom(config, value)
    yield put({ type: actionTypes.branchPageallData, payload: res.data.response.data.results })
}


export function* branch_select_list() {

    yield takeLatest(actionTypes.branchPageAsync, handleWorker)
    yield takeLatest(actionTypes.branchPageAsyncallData, handleWorkerAllData)

}