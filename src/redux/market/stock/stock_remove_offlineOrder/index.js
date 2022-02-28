import AxiosCustom from "../../../../app/common/components/apiConfig"

export function removeOfflineOrder(_data) {
    let config = {
        url: "update_request"
    }

    let data = {
        table: "offlineorder",
        method_type:"cancel_offline_order_by_id",
        data: _data ?_data :{}
    }


    return AxiosCustom(config, data)
}