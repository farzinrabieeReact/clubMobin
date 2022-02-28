
import { put, takeLatest } from "redux-saga/effects";
import {  handleNotificationAlertCatch } from "./../../app/common/method/handleNotificationAlert"


export const actionTypes = {
    lightstreamer: "[lightstreamer] Action",
    lightstreamerAsync: "[lightstreamerAsync] Action",
    lightstreamerRemove: "[lightstreamerRemove] Action",
};

const initialState = {
    data: { lsClient: '', subscription: '' , token:'' }
};

export const reducerLightstreamer = (state = initialState, { type, payload }) => {
    switch (type) {
        case actionTypes.lightstreamer:
            return {
                data:{
                    ...state.data,
                    ...payload
                } 
            }

        case actionTypes.lightstreamerRemove:
            // console.log('unsubscribe------------->' , state.data.lsClient);
            if(state.data.lsClient)
            state.data.lsClient.unsubscribe(state.data.subscription);
            return {
                data:{  lsClient: null, subscription: null , token:null}
            }

        default:
            return state
    }
}


function* handleWorker({ payload }) {

    try {
        yield put({ type: actionTypes.lightstreamer, payload: payload })
    } catch {
        handleNotificationAlertCatch()
    }

}


export function* watcherLightstreamer() {
    yield takeLatest(actionTypes.lightstreamerAsync, handleWorker)
}