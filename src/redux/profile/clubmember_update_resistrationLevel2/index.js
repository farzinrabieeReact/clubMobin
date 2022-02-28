
// import { put , takeLatest } from "redux-saga/effects";
// import axiosCustom from "../../../app/common/components/apiConfig";




export const actionTypes = {
    registration: "[registration] Action",
};

const initialState = {
    data: []
};


export const reducerRegistration = (state = initialState, { type, payload }) => {
    switch (type) {
        case actionTypes.registration:
            return {
                data: payload
            }

        default:
            return state
    }
}

