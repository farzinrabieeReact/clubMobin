import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { actionTypes } from "../../../../redux/posts/posts_select_commentList";
import CardNoData from "./../../../common/components/cardNoData"
import Process from './Process';


export default function Index() {
    const stateReducer = useSelector(state => state.reducerSelectComments.data)
    const dispatch = useDispatch()
    const { state } = useLocation()

    useEffect(() => {
        if (state) {
            dispatch({
                type: actionTypes.selectCommentAsync,
                filter: { parent_post_id: state.id },
                level1: true
            })
        } 

        return () => dispatch({ type: actionTypes.selectCommentRemove })
    }, [state]) //eslint-disable-line react-hooks/exhaustive-deps

    if (!stateReducer.length) return <div className="mx-3"><CardNoData text="دیدگاهی برای نمایش وجود ندارد." /></div>

    return (
        <div>     
                <Process stateReducer={stateReducer} />
        </div>
    )
}
