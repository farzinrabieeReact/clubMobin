import React, { useState } from 'react';
import DateRangeIcon from '@material-ui/icons/DateRange';
import ReplyIcon from '@material-ui/icons/Reply';
import { Box, IconButton, Button } from '@material-ui/core';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import { dateConvertMiladiToShamsi } from '../../../common/method/date';
import { actionTypes } from "../../../../redux/posts/posts_select_commentList"
import { useDispatch } from 'react-redux';
import ModalCustom from "./../../../common/components/ModalCustom";
import ReplyReponse from "./replyResponse";
import { LikesPost } from '../../../../redux/posts/posts_update_likes';
import { handleNotificationAlertCatch, handleNotificationAlertTryUpdate } from '../../../common/method/handleNotificationAlert';
import { actionTypes as actionTypesCommentList } from "../../../../redux/posts/posts_select_commentList";


const borderBottom = {
    borderTop: "1px solid lightgray"
}



export default function Card({ data, subComment, parentID }) {
    const dispatch = useDispatch()
    const [openModal, setOpenModal] = useState(false)

    const handleShowReply = () => {
        dispatch({
            type: actionTypes.selectCommentAsync,
            filter: { parent_post_id: data.id },
            level1: false
        })
    }

    const handleLike = () => {
        LikesPost(data.id)
            .then(res => {
                let resOk = handleNotificationAlertTryUpdate(res)
                if (resOk) {
                    dispatch({ type: actionTypesCommentList.clickLikeComment, payload: { id: data.id } })
                }

            })
            .catch(() => {
                handleNotificationAlertCatch()
            })
    }

    return (
        <div className={`pt- my-1 pb-5 mb-5 ${subComment ? "bg-light border-top" : ""}`} style={borderBottom}>
            <div className="d-flex my-10">
                <p className="mx-2 px-2 h5">
                    {data.body.author_first_name}{" "}{data.body.author_last_name}
                </p>
                <p className="mx-2 px-2 text-muted-custom border-left">
                    <span className="px-1"><DateRangeIcon /></span>
                    <span className="px-1">{dateConvertMiladiToShamsi(data.body.create_date.split(" ")[0])}</span>
                    <span className="px-1">{data.body.create_date.split(" ")[1].split(".")[0]}
                    </span>
                </p>
            </div>

            <Box width="90%" className="text-height-30 mx-auto mx-auto text-justify">{data.body.title}</Box>

            <Box width="90%" className="text-right mx-auto">
                {
                    !subComment && (
                        <>
                            <span className="px-1">
                                <Button
                                    className="color-g"
                                    onClick={handleShowReply}
                                >
                                    نمایش پاسخ
                                </Button>

                            </span>
                            <span className="px-1 border-left border-right">
                                <IconButton
                                    onClick={() => setOpenModal(true)}
                                >
                                    <ReplyIcon className="color-g" />

                                </IconButton>
                            </span>
                        </>
                    )
                }
                <span className="px-1">
                    <IconButton
                        onClick={handleLike}
                    >
                        <ThumbUpIcon
                            className={data.body.is_liked === "FALSE" ? "text-muted" : "color-g"}
                        />
                        <span className="pl-1" style={{ fontSize: 14 }}>{data.body.likes}</span>
                    </IconButton>
                </span>
            </Box>

            <ModalCustom
                open={openModal}
                setOpen={setOpenModal}
            >
                <ReplyReponse
                    parent_post_id={data.id}
                    setClose={setOpenModal}
                />
            </ModalCustom>
        </div>
    )
}


