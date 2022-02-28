import AxiosCustom from "../../../app/common/components/apiConfig"

export function registerPost(newData) {
    let config = {
        url: "insert_request"
    }

    let otherData = {
        "is_visible": null,
        "parent_post_id": null,
        "forum_name": null,
        "subgroup_name": null,
        "author_id": null,
        "author_first_name": null,
        "author_last_name": null,
        "select_permission_level": null,
        "update_permission_level": null,
        "delete_permission_level": null,
        "likes": null,
        "short_url": null
    }


    let data = {
        table: "post",
        method_type: "insert",
        data: {
            ...otherData,
            ...newData
        }
    }


    return AxiosCustom(config, data)
    // return axios.post(REGISTER_URL, { email, fullname, username, password });
}