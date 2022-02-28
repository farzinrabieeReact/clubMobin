import React, { useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import DeleteIcon from "@material-ui/icons/Delete";
import { CircularProgress, IconButton } from "@material-ui/core";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import { actionTypes } from "./../../../../redux/posts/posts_select_detailsPost";
import { useDispatch, useSelector } from "react-redux";
import { dateConvertMiladiToShamsi } from "./../../../common/method/date";
import { getDataInLocalstorage } from "./../../../common/method/getDataInLocalstorage";
import { LikesPost } from "../../../../redux/posts/posts_update_likes";
import {
    handleNotificationAlertCatch,
    handleNotificationAlertTryUpdate,
} from "../../../common/method/handleNotificationAlert";
import { DelettePost } from "../../../../redux/posts/posts_update_delete";

export default function Index() {
    const { state } = useLocation();
    const { push } = useHistory();
    const dispatch = useDispatch();
    const stateReducer = useSelector((state) => state.reducerDetailPost.data);

    useEffect(() => {
        return () => dispatch({ type: actionTypes.detailsPostRemove });
    }, [state]); //eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if (!state) {
            push("/posts");
        }

        dispatch({ type: actionTypes.detailsPostAsync, id: state?.id });
    }, [state]); //eslint-disable-line react-hooks/exhaustive-deps

    const handleLike = () => {
        LikesPost(state?.id)
            .then((res) => {
                let resOk = handleNotificationAlertTryUpdate(res);
                if (resOk) {
                    dispatch({ type: actionTypes.detailsPostAsync, id: state?.id });
                }
            })
            .catch(() => {
                handleNotificationAlertCatch();
            });
    };

    const handleDelete = () => {
        DelettePost(state?.id)
            .then((res) => {
                let resOk = handleNotificationAlertTryUpdate(res);
                if (resOk) {
                    push("/posts");
                }
            })
            .catch(() => {
                handleNotificationAlertCatch();
            });
    };

    if (!state) {
        return null;
    }

    if (stateReducer.length === 0) {
        return <CircularProgress />;
    }

    return (
        <div className="bg-white rounded-lg p-5 shadow m-5">
            <div className="d-flex justify-content-between align-items-center">
                <h5 className="font-weight-bolder">{stateReducer[0].body.title}</h5>
                {stateReducer[0].body.author_id ===
                    getDataInLocalstorage("member_id") && (
                        <IconButton onClick={handleDelete} aria-label="delete">
                            <DeleteIcon className="text-danger" />
                        </IconButton>
                    )}
            </div>

            <div className="d-flex justify-content-between align-items-center mt-3 mb-2 border-bottom">
                <div>
                    <p>
                        {stateReducer[0].body.author_first_name}{" "}
                        {stateReducer[0].body.author_last_name}
                    </p>
                    <div className="text-muted">
                        <p>
                            {stateReducer[0].body.create_date.split(" ")[1].split(".")[0]}{" "}
                            {dateConvertMiladiToShamsi(
                                stateReducer[0].body.create_date.split(" ")[0]
                            )}
                        </p>
                    </div>
                </div>
                <div className="pr-5">
                    <IconButton onClick={handleLike}>
                        <ThumbUpIcon className={stateReducer[0].body.is_liked === "TRUE"?"color-g":"disabled"} />
                        <span className="align-sub pl-1" style={{ fontSize: 14 }}>
            
                            {stateReducer[0].body.likes}
                        </span>
                    </IconButton>
                </div>
            </div>
            <div className="my-2 border-bottom py-1">
                <div
                    className="text-height-30 overflow-auto htmlContent"
                    dangerouslySetInnerHTML={{ __html: stateReducer[0].body.body }}
                ></div>
            </div>

            <div className="py-2">
                <LocalOfferIcon /> برچسب ها: {"  "}
                {!stateReducer[0].body.tags || stateReducer[0].body.tags === "null"
                    ? ""
                    : stateReducer[0].body.tags.split(",").map((item, ind) => (
                        <span key={ind} className="px-2 py-1 border rounded mx-1">
                            {item}
                        </span>
                    ))}
            </div>
        </div>
    );
}
