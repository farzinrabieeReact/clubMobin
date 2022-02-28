import { Box } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import OpenInNewIcon from "@material-ui/icons/OpenInNew";
import { useDispatch, useSelector } from "react-redux";
import { actionTypes } from "./../../../../redux/posts/posts_select_forum";
import { distinctMethod } from "../../../common/method/distinctMethod";
import CardNoData from "./../../../common/components/cardNoData";
import { useHistory } from "react-router-dom";

export function PostsSelectForum() {
  const state = useSelector(state => state.reducer_select_forum);
  const dispatch = useDispatch();
  const { push } = useHistory();
  const [category, setCategory] = useState([]);

  useEffect(() => {
    dispatch({ type: actionTypes.forumAsync });
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (state.data.length) {
      let distinctCategory = distinctMethod(state.data, ["body", "name"]);
      setCategory(distinctCategory);
    }
  }, [state]);

  return (
    <div className="bg-white rounded-lg py-5 shadow mt-5">
      <h3 className="text-center font-weight-bolder mb-3">
        فروم باشگاه مشتریان
      </h3>

      <div className="d-flex flex-wrap">
        {category.length > 0 ? (
          category.map((item, ind) => (
            <Box className="col-md-3 my-3 d-flex w-100" key={ind}>
              <div className="bg-white rounded-lg shadow mx-2 my-2 p-2 w-100">
                <h3 className="font-weight-bolder px-2 py-5">{item}</h3>
                {state.data
                  .filter(subItem => subItem.body.name === item)
                  .map((subGroup, index) => (
                    <p
                      key={index}
                      className="border-top px-2 py-3 cursor-pointer color-hover"
                      onClick={() =>
                        push({
                          pathname: "/posts/list",
                          state: {
                            id: subGroup.id,
                            subgroup_name: subGroup.body.subgroup_name
                          }
                        })
                      }
                    >
                      <OpenInNewIcon className="color-g pr-1" />
                      <span>{subGroup.body.subgroup_name}</span>
                    </p>
                  ))}
              </div>
            </Box>
          ))
        ) : (
          <CardNoData />
        )}
      </div>
    </div>
  );
}
