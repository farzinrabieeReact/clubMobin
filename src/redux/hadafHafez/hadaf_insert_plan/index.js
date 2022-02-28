import AxiosCustom from "../../../app/common/components/apiConfig"

export const hadaf_insert_plan = (_data)=>{
    let config = {
        url: "insert_request",
    }

    let data = {
        table: "HADAFHAFEZ",
        method_type: "register",
        // from: 0,
        // size: ,
        data:_data?_data:{}
    }
    return AxiosCustom(config,data)
}