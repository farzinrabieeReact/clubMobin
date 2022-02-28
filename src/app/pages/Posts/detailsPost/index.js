import React from 'react';
import DetailsPost from "./../../../modules/posts/posts_select_detailsPost";
import { PostSidebarGoldAndCurrency } from "../../../modules/posts/posts_select_sidebarGoldAndCurrency";
import { PostSidebarList } from "../../../modules/posts/posts_select_sidebar";
import Comments from "./../comments"

export default function Index() {
    return (
        <div>
            <div className="d-flex flex-column flex-lg-row">
                <div className="flex-row-fluid">
                    <div className="">
                        <DetailsPost />
                    </div>
                    <div>
                        <Comments />
                    </div>
                </div>
                <div className="flex-row-auto w-lg-350px">
                    <div>
                        <PostSidebarGoldAndCurrency />
                    </div>
                    <div>
                        <PostSidebarList />
                    </div>
                </div>
            </div>
        </div>
    )
}
