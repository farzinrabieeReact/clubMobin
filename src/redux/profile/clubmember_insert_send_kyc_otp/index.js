import AxiosCustom from "../../../app/common/components/apiConfig"

export function clubmember_send_kyc_otp(_data) {
    let config = {
        url: "insert_request"
    }

    let data = {
        table: "clubmember",
        method_type:"send_kyc_otp",
        token: "3cf61fab-b50a-410f-9d59-3357ee4706fe",
        member_id: "_0zehXYBdxxYGfkX5_wd",
        data: _data ?_data :{}
    }


    return AxiosCustom(config, data)
}