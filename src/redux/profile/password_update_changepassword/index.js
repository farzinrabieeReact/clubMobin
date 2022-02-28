
import { takeLatest } from "redux-saga/effects";
import axiosCustom from "../../../app/common/components/apiConfig";



export const actionTypes = {
    changePasswordAsync: "[changePassword] Action",
};


function* handleWorker({ member_id, old_password, new_password }) {
    let config = {
        url: "update_request",
    }

    let data = {
        table: "clubmember",
        method_type: "change_password",
        data: {
            member_id,
            old_password,
            new_password
        }
    }

    yield axiosCustom(config, data)

}

export function* changePassword() {
    yield takeLatest(actionTypes.changePasswordAsync, handleWorker)
}