
import AxiosCustom from "../../../app/common/components/apiConfig"





export function LikesPost(id) {
    let config = {
        url: "update_request"
    }


    let data = {
        table: "post",
        method_type: "like_post",
        data: { _id: id }
    }


    return AxiosCustom(config, data)
}