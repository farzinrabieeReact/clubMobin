import axiosCustom from "../../../app/common/components/apiConfig";



export  function  authCustomerInsertStepOne(data) {
    let config = {
        url: "insert_request",
    }

    let _data = {
        table: "clubmember",
        method_type: "send_kyc_otp",
        data: data ? data : {}
    }

    return axiosCustom(config, _data)

}
