import AxiosCustom from "../../../../app/common/components/apiConfig"

export function stockInsertPayment(_data) {
    let config = {
        url: "insert_request"
    }

    let data = {
        table: "portfolio",
        method_type:"payment_request",
        data: _data ?_data :{}
    }


    return AxiosCustom(config, data)
}