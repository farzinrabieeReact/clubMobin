
import axiosCustom from "../../../app/common/components/apiConfig";



export  function  giftInsert(data) {

    let config = {
        url: "insert_request",
    }

    let _data = {
        table: "gift",
        method_type: "register",
        data: data ? data : {}
    }

    return axiosCustom(config, _data)

}
