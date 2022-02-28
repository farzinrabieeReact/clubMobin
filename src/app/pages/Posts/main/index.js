import React from "react";
import { PostsSelectLastpost } from "../../../modules/posts/posts_select_lastpost";
import { PostsSelectForum } from "../../../modules/posts/posts_select_forum";
import { useHistory } from "react-router-dom";

export default function Index() {
  const { push } = useHistory();

  const handleCLick = () => {
    push({
      pathname: "/posts/newPost"
    });
  };

  return (
    <div>
      <div className="bg-white rounded-lg p-10 shadow">
        <div>
          <button className="btn backGroundOrange" onClick={handleCLick}>
            پست جدید
          </button>
        </div>
        <PostsSelectLastpost
          title="آخرین پست ها"
          paginationShow={true}
          payload={{
            size: "8",
            filter: { parent_post_id: "null" }
          }}
        />

        <PostsSelectForum />
      </div>
    </div>
  );
}
