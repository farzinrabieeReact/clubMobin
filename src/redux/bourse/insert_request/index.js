import AxiosCustom from "../../../app/common/components/apiConfig"

export const ime_insert_request = (_data)=>{
    let config = {
        url: "insert_request",
    }

    let data = {
        table: "imetrade",
        method_type: "insert_ime_request",
        // from: 0,
        // size: ,
        data:_data?_data:{}
    }
    return AxiosCustom(config,data)
}