import AxiosCustom from "../../../../app/common/components/apiConfig"

export function changeBrokerStock(_data) {
    let config = {
        url: "insert_request"
    }

    let data = {
        table: "changebroker",
        method_type:"insert_change_broker",
        data: _data ?_data :{}
    }


    return AxiosCustom(config, data)
}