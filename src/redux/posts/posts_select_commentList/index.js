
import { put, takeLatest } from "redux-saga/effects";
import axiosCustom from "../../../app/common/components/apiConfig";
import { handleNotificationAlertTrySelect, handleNotificationAlertCatch } from "../../../app/common/method/handleNotificationAlert"
import { actionTypes as actionTypesNotif } from "../../notificationAlert"




export const actionTypes = {
    selectComment: "[selectComment] Action",
    selectCommentAsync: "[selectCommentAsync] Action",
    clickLikeComment: "[clickLikeComment] Action",
    selectCommentRemove: "[selectCommentRemove] Action",
};

const initialState = {
    data: []
};


export const reducerSelectComments = (state = initialState, { type, payload, level1 }) => {
    switch (type) {
        case actionTypes.selectComment:
            if (level1) {
                return {
                    data: payload
                }
            } else {
                let result = payload.filter(o1 => !state.data.some(o2 => o1.id === o2.id));
                return {
                    data: [...state.data, ...result]
                }
            }

        case actionTypes.clickLikeComment:
            let result = state.data.map(item => {
                if (item.id === payload.id) {
                    return {id : item.id , body : {...item.body , is_liked: item.body.is_liked === "FALSE" ? "TRUE" : "FALSE", likes: item.body.is_liked === "FALSE" ? item.body.likes + 1 : item.body.likes - 1  }}
                    // return { ...item, is_liked: item.is_liked === "FALSE" ? "TRUE" : "FALSE", likes: item.is_liked === "FALSE" ? item.likes + 1 : item.likes - 1 }
                }
                return item
            })

            return {
                data: result
            }

        case actionTypes.selectCommentRemove:
            return initialState

        default:
            return state
    }
}


function* handleWorker(payload) {
    let config = {
        url: "select_request",
    }


    let data = {
        table: "post",
        method_type: "select",
        data: payload.filter ? payload.filter : {}
    }

    try {
        let res = yield axiosCustom(config, data)
        let flag = handleNotificationAlertTrySelect(res)
        if (!flag) return

        if (!payload.level1 && res.data.response.data.results.length === 0) {
            yield put({ type: actionTypesNotif.info, textAlert: "پاسخ به این کامنت وجود ندارد" })
            return
        }

        yield put({ type: actionTypes.selectComment, payload: res.data.response.data.results, level1: payload.level1 })

    } catch {
        handleNotificationAlertCatch()
    }



}


export function* watcherSelectComments() {
    yield takeLatest(actionTypes.selectCommentAsync, handleWorker)
}