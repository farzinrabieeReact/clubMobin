import AxiosCustom from "../../../../app/common/components/apiConfig"

export function registerOfflineOrder(_data) {
    let config = {
        url: "insert_request"
    }

    let data = {
        table: "offlineorder",
        method_type:"insert_offline_order",
        data: _data ?_data :{}
    }


    return AxiosCustom(config, data)
}