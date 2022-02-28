import { LinearProgress, TextareaAutosize } from '@material-ui/core'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { actionTypes } from "../../../../redux/notificationAlert";
import { actionTypes as actionTypesSelectComments } from "../../../../redux/posts/posts_select_commentList";
import { InsertComment } from '../../../../redux/posts/posts_insert_commentNew';
import { handleNotificationAlertTryUpdate, handleNotificationAlertCatch } from "../../../common/method/handleNotificationAlert";


export default function Index() {
    const [data, setData] = useState("")
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false);
    let location = useLocation()


    const handleSubmitComment = () => {
        if (!data) {
            dispatch({ type: actionTypes.info, textAlert: "دیدگاه خود را وارد نکرده اید." })
            return
        }

        if (!location.state?.id) {
            dispatch({ type: actionTypes.info, textAlert: "پست مورد نظر یافت نشد." })
            return
        }

        setLoading(true)

        InsertComment(data, location.state?.id)
            .then(res => {
                let resOk = handleNotificationAlertTryUpdate(res)
                if (resOk) {
                    dispatch({
                        type: actionTypesSelectComments.selectCommentAsync,
                        filter: { parent_post_id: location.state.id },
                        level1: true
                    })
                }
                setLoading(false)
            })
            .catch(() => {
                handleNotificationAlertCatch()
                setLoading(false)
            })
    }

    return (
        <>
            {
                loading && (
                    <LinearProgress className="mx-3" />
                )
            }
            <div className="p-5 pb-20">
                <TextareaAutosize
                    rowsMax={10}
                    className={`w-100 rounded-lg p-5`}
                    onChange={(event) => setData(event.target.value)}
                    placeholder="دیدگاه خود را وارد کنید"
                    value={data}
                    style={{ minHeight: 200, resize: "none", border: "1px solid #707070", marginTop: 30 }}
                />

                <div className="text-center">
                    <button
                        className="btn btn-success mt-3 text-center"
                        onClick={handleSubmitComment}
                    >
                        ارسال دیدگاه
                    </button>
                </div>

            </div>
        </>
    )
}