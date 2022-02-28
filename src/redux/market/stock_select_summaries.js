
import { put, takeEvery, takeLatest } from "redux-saga/effects";
import AxiosCustom from "../../app/common/components/apiConfig";
import { handleNotificationAlertTrySelect, handleNotificationAlertCatch } from "../../app/common/method/handleNotificationAlert";




export const actionTypes = {
    stockList: "[stockList] Action",
    stockListAsync: "[stockListAsync] Action",
    stockListMore: "[stockListMore] Action",
    stockListMoreAsync: "[stockListMore] ActionAsync",
};

const initialState = {
    data: [],
    isinJson: {}
};


export const reducerStockList = (state = initialState, { type, payload }) => {
    switch (type) {
        case actionTypes.stockList:
            let obj = {}

            payload.forEach(element => {
                obj[element.body.isin] = element.body.short_name
            });

            return {
                data: payload,
                isinJson: { ...state.isinJson, ...obj }
            }

        case actionTypes.stockListMore:
            let objMore = {}
            // let resArray = payload.map(item => {
            //     if(!state.data.includes(item)){
            //         return 
            //     }
            // })

            payload.forEach(element => {
                objMore[element.body.isin] = element.body.short_name
            });

            return {
                data: [...state.data, ...payload],
                isinJson: { ...state.isinJson, ...objMore }
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
        table: "stock",
        method_type: "select_summaries",
        from: 0,
        size: 2000,
        data: {}
    }


    try {

        let res = yield AxiosCustom(config, data)
        // console.log("res",res)
        let flag = handleNotificationAlertTrySelect(res)
        if (!flag) return

        yield put({ type: actionTypes.stockList, payload: res.data.response.data.results })

    }
    catch {
        handleNotificationAlertCatch()
    }

}

function* handleWorkerMore({ payload }) {

    let config = {
        url: "select_request",
    }

    let data = {
        table: "stock",
        method_type: "select_summaries",
        data: {
            isin: payload
        }
    }


    try {

        let res = yield AxiosCustom(config, data)
        let flag = handleNotificationAlertTrySelect(res)
        if (!flag) return

        yield put({ type: actionTypes.stockListMore, payload: res.data.response.data.results })

    }
    catch {
        handleNotificationAlertCatch()
    }

}


export function* watcherStockList() {
    yield takeLatest(actionTypes.stockListAsync, handleWorker)
    yield takeEvery(actionTypes.stockListMoreAsync, handleWorkerMore)
}