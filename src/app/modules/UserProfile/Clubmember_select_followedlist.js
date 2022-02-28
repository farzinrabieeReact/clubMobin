/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React, { useEffect } from "react";
import { toAbsoluteUrl } from "../../../_metronic/_helpers";
import { actionTypes } from "./../../../redux/profile/clubmember_select_followedlist";
import { useDispatch, useSelector } from "react-redux";
import { getDataInLocalstorage } from "../../common/method/getDataInLocalstorage";
import OutlinedCard from "../../common/components/cardNoData";

export function ClubmemberSelectFollowedlist() {
  const data = useSelector(state => state.reducerProfilefollowedList);

  const dispatch = useDispatch();

  useEffect(() => {
    if (getDataInLocalstorage("member_id"))
      dispatch({
        type: actionTypes.followedListAsync,
        payload: getDataInLocalstorage("member_id")
      });
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {/* begin::List Widget 14 */}
      <div className={`flex-grow-1`}>
        {/* begin::Header */}
        <div className="card-header border-0">
          <h3 className="card-title font-weight-bolder text-dark">
            لیست دنبال شده ها
          </h3>
        </div>
        {/* end::Header */}

        {/* begin::Body */}
        <div className="card-body pt-2">
          {data.data.length ? (
            data?.data?.map((item, ind) => (
              <div
                key={ind}
                className="d-flex flex-wrap align-items-center mb-10"
              >
                <div className="symbol symbol-60 symbol-2by3 flex-shrink-0 mr-4">
                  <div
                    className="symbol-label"
                    style={{
                      backgroundImage: `url('${
                        item.body?.profile_picture
                          ? item.body?.profile_picture
                          : toAbsoluteUrl("/media/common/Avatar.png")
                      }')`,
                      backgroundSize: "contain",
                      width: "60px"
                    }}
                  ></div>
                </div>

                <div className="d-flex flex-column flex-grow-1 my-lg-0 my-2 pr-3">
                  <span className="text-dark-75 font-weight-bolder text-hover-primary font-size-lg">
                    {item.body?.first_name} {item.body?.last_name}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <OutlinedCard />
          )}
        </div>
        {/* end::Body */}
      </div>
      {/* end::List Widget 14 */}
    </>
  );
}
