
import { put, takeLatest } from "redux-saga/effects";
import axiosCustom from "../../../app/common/components/apiConfig";
import { handleNotificationAlertTrySelect , handleNotificationAlertCatch } from '../../../app/common/method/handleNotificationAlert';



export const actionTypes = {
    followedList: "[followedList] Action",
    followedListAsync: "[followedListAsync] Action",
};

const initialState = {
    data: []
};


export const reducerProfilefollowedList = (state = initialState, { type, payload }) => {
    switch (type) {
        case actionTypes.followedList:
            return {
                data: payload
            }

        default:
            return state
    }
}

function* handleWorker({ payload: id }) {
    let config = {
        url: "select_request",
    }

    let data = {
        table: "clubmember",
        method_type: "select",
        from: 0,
        size: 6,
        data: {
            introducing_member_id: id
        }
    }

           
    try {
        let res = yield axiosCustom(config, data)
        let flag = handleNotificationAlertTrySelect(res)
        if (!flag) return
        yield put({ type: actionTypes.followedList, payload: res.data.response.data.results })
    } catch  {
        handleNotificationAlertCatch()
    }
  



}

export function* profilefollowedList() {
    yield takeLatest(actionTypes.followedListAsync, handleWorker)
}