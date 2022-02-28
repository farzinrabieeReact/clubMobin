import AxiosCustom from "../../../../app/common/components/apiConfig"

export function removePayment(_data) {
    let config = {
        url: "delete_request"
    }

    let data = {
        table: "portfolio",
        method_type:"delete_payment_request",
        data: _data ?_data :{}
    }


    return AxiosCustom(config, data)
}