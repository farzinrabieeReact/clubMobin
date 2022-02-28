import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { actionTypes } from "../../../../redux/education/courses/course_select_CategoryPopular";

import Card from "./card";

const useStyles = makeStyles({
  line: {
    width: "80%"
  }
});

export default function Index({ children }) {
  const classes = useStyles();

  const dispatch = useDispatch();
  const CategoryPopularCourse = useSelector(
    state => state.reducerCategoryPopularCourse
  );

  const [state, setstate] = useState([]);

  useEffect(() => {
    dispatch({ type: actionTypes.categoryPopularCourseAsync });
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (CategoryPopularCourse.data)
      if (CategoryPopularCourse.data.length > 0) {
        setstate(CategoryPopularCourse.data);
      }
  }, [CategoryPopularCourse]);

  const handelClick = data => {
    children(data);
  };

  let defaulteItem = {
    id: 0,
    body: {
      category: "همه"
    }
  };

  return (
    <div className={"bg-white rounded-lg shadow my-5 px-5"}>
      <div className={"d-flex align-itmes-center pt-5"}>
        <h3>محبوب ترین دسته بندی ها</h3>
        <hr className={classes["line"]} />
      </div>
      <div className={"d-flex flex-wrap p-10 justify-content-center"}>
        {state.map((item, index) => {
          return (
            <Card
              key={index}
              index={index + 1}
              data={item}
              handelClick={handelClick}
            />
          );
        })}
        <Card index={6} data={defaulteItem} handelClick={handelClick} />
      </div>
    </div>
  );
}
