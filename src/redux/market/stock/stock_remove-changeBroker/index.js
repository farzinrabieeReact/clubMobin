import AxiosCustom from "../../../../app/common/components/apiConfig"

export function removeChangeBroker(_data) {
    let config = {
        url: "update_request"
    }

    let data = {
        table: "changebroker",
        method_type:"cancel_change_broker_request_by_id",
        data: _data ?_data :{}
    }


    return AxiosCustom(config, data)
}