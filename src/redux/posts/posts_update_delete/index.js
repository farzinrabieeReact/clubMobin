
import AxiosCustom from "../../../app/common/components/apiConfig"





export function DelettePost(id) {
    let config = {
        url: "update_request"
    }


    let data = {
        table: "post",
        method_type: "remove_post",
        data: { _id: id }
    }


    return AxiosCustom(config, data)
}