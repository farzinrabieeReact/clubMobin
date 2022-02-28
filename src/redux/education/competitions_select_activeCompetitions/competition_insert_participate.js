
import { put, takeLatest } from "redux-saga/effects";
import axiosCustom from "../../../app/common/components/apiConfig";
import { handleNotificationAlertTryUpdate, handleNotificationAlertCatch } from "../../../app/common/method/handleNotificationAlert";
import { actionTypes as bounusUpdater} from "../../profile/clubmember_select_bonus";



export const actionTypes = {
    insert_participateAsync: "[insert_participateAsync] Action",
};


function* handleWorker({ payload }) {
    let config = {
        url: "insert_request",
    }

    let otherData = {
        "competition_title": null,
        "member_first_name": null,
        "member_last_name": null,
        "member_national_id": null,
        "participation_date": null,
        "participation_deadline": null,
        "is_correct": null,
        "status": null,
        "participation_bonus_id": null,
        "reward_bonus_id": null
    }

    let data = {
        table: "competition",
        method_type: "participate",
        data: {
            ...otherData,
            ...payload
        }
    }



    try {
        let res = yield axiosCustom(config, data);
        handleNotificationAlertTryUpdate(res);
        yield put({type:bounusUpdater.bonusSelectAsync});
    } catch {
        handleNotificationAlertCatch()
    }
}


export function* watcher_insert_participate() {
    yield takeLatest(actionTypes.insert_participateAsync, handleWorker)
}