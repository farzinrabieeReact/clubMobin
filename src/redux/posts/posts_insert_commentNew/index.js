import AxiosCustom from "../../../app/common/components/apiConfig";
import { convertDigitToEnglish } from "../../../app/common/method/convertDigitToEnglish";
import { dateCurrentMiladi } from "../../../app/common/method/date";
import { timeCurrent } from "../../../app/common/method/time";



// console.log("dateCurrentMiladi",convertDigitToEnglish(dateCurrentMiladi()));

export function InsertComment(text, parent_post_id) {
    let config = {
        url: "insert_request"
    }

    let otherData = {
        "is_visible": null,
        "forum_name": null,
        "subgroup_id": null,
        "subgroup_name": null,
        "author_id": null,
        "author_first_name": null,
        "author_last_name": null,
        "select_permission_level": null,
        "update_permission_level": null,
        "delete_permission_level": null,
        "isin": null,
        "tags": null,
        "likes": null,
        "short_url": null
    }

    let data = {
        table: "post",
        method_type: "insert",
        data: {
            ...otherData,
            "title": text,
            "body": text,
            "abstract": text,
            "create_date": `${convertDigitToEnglish(dateCurrentMiladi())} ${timeCurrent()}`,
            "parent_post_id": parent_post_id,
        }
    }

    return AxiosCustom(config, data)

}


