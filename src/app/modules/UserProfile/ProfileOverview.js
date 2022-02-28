import React from "react";
import { ClubmemberSelectInvitedlist } from "./Clubmember_select_invitedlist";
import { ClubmemberSelectFollowedlist } from "./Clubmember_select_followedlist";
import { PostsSelectLastpost } from "../posts/posts_select_lastpost";
import { getDataInLocalstorage } from "../../common/method/getDataInLocalstorage";


export function ProfileOverview() {
  let author_id = getDataInLocalstorage("member_id")


  return (
    <div className="row m-0">
      <div className="card card-custom card-stretch mb-4">
       
        <div className="card-header py-1">
          <div className="card-title align-items-start flex-column">
            <h3 className="card-label font-weight-bolder text-dark">
              وضعیت من
            </h3>
            <span className="text-muted font-weight-bold font-size-sm mt-1">
              وضعیت خود را مشاهده کنید
               </span>
          </div>
        </div>

        <div className="col-lg-12 d-flex">
          <ClubmemberSelectInvitedlist
          ></ClubmemberSelectInvitedlist>

          <ClubmemberSelectFollowedlist
          ></ClubmemberSelectFollowedlist>
        </div>
      </div>

      <div className="col-lg-12 px-0">
        <PostsSelectLastpost
          title="آخرین پست های شما"
          className="card-stretch"
          paginationShow={false}
          payload={{
            size: "6",
            filter: {
              author_id,
              parent_post_id: "null"
            }
          }}
        />
      </div>

    </div>
  );
}


