
import { put, takeLatest } from "redux-saga/effects";
import axiosCustom from "../../../app/common/components/apiConfig";
import { handleNotificationAlertCatch } from '../../../app/common/method/handleNotificationAlert';




export const actionTypes = {
    refCodeSelect: "[refCodeSelect] Action",
    refCodeSelectClear: "[refCodeSelectClear] Action",
    refCodeSelectAsync: "[refCodeSelectAsync] Action",
};

const initialState = {
    data: { first_name: '', last_name: '' }
};


export const clubmember_select_refCode_reducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case actionTypes.refCodeSelect:
            return {
                data: {
                    first_name: payload[0].body.first_name,
                    last_name: payload[0].body.last_name,
                }
            }
        case actionTypes.refCodeSelectClear:
            return {
                data: {
                    first_name: '',
                    last_name: '',
                }
            }

        default:
            return state
    }
}


function* handleWorker({ payload }) {

    let config = {
        url: "select_request",
    }

    let data = {
        table: "clubmember",
        method_type: "select_member_by_ref_code_or_national_id",
        data: payload.data ? payload.data : {},
        token: "3cf61fab-b50a-410f-9d59-3357ee4706fe",
    }



    try {
        let res = yield axiosCustom(config, data)


        if (res.data.response.error_code) {
            yield put({ type: actionTypes.refCodeSelectClear })
            return
        }

        // let flag = handleNotificationAlertTrySelect(res)
        // if (!flag) return
        yield put({ type: actionTypes.refCodeSelect, payload: res.data.response.data.results })

    } catch  {
        handleNotificationAlertCatch()
    }




}


export function* refCodeSelect() {
    yield takeLatest(actionTypes.refCodeSelectAsync, handleWorker)
}