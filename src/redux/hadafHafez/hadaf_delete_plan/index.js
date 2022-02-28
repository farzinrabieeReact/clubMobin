import AxiosCustom from "../../../app/common/components/apiConfig"

export const hadaf_delete_plan = (_data)=>{
    let config = {
        url: "update_request",
    }

    let data = {
        table: "HADAFHAFEZ",
        method_type: "unregister",
        // from: 0,
        // size: ,
        data:_data?_data:{}
    }
    return AxiosCustom(config,data)
}