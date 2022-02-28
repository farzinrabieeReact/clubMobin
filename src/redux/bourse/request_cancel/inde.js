import AxiosCustom from "../../../app/common/components/apiConfig"

export const ime_request_cancel = (_data)=>{
    let config = {
        url: "insert_request",
    }

    let data = {
        table: "imetrade",
        method_type: "ime_request_cancel",
        // from: 0,
        // size: ,
        data:_data?_data:{}
    }
    return AxiosCustom(config,data)
}