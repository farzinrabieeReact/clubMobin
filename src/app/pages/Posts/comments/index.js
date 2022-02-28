import React from 'react';
import { useSelector } from 'react-redux';
import InsertComment from "../../../modules/posts/posts_insert_commentNew";
import ListComment from "../../../modules/posts/posts_select_commentList";

export default function Index() {
    const stateReducer = useSelector(state => state.reducerDetailPost.data)


    if (stateReducer.length === 0) {
        return null
    }
    
    return (
        <div className="bg-white rounded-lg shadow m-5 pb-5">
            <InsertComment />
            <ListComment />
        </div>
    )
}
