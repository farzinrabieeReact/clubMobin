import axiosCustom from "../../../app/common/components/apiConfig";



export  function  authCustomerUpdateStepThree(data) {

    let config = {
        url: "update_request",
    }

    let _data = {
        table: "clubmember",
        method_type: "confirm_sign_code",
        token: "3cf61fab-b50a-410f-9d59-3357ee4706fe",
        member_id: "_0zehXYBdxxYGfkX5_wd",
        data: data ? data : {}
    }

    return axiosCustom(config, _data)

}
