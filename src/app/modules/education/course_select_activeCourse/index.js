import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { actionTypes } from "../../../../redux/education/courses/course_select_activeCourse";
import Swiper from "./swiper";
import { useHistory } from "react-router-dom";


const useStyles = makeStyles({
  rootActive: {
    height: 840,
    overflowY: "auto",
    padding: 50
  },
  line: {
    flexGrow: 1,
    marginRight: "10px",
    marginLeft: "10px",
  },
  spinner: {
    display: "inline-block",
    width: "25px"
  }
});

export default function Index() {
  const classes = useStyles();
  const { push } = useHistory();
  const dispatch = useDispatch();
  const ActiveCourse = useSelector(state => state.reducerActiveCourse);

  // search filter data api
  useEffect(() => {
    dispatch({ type: actionTypes.activeCourseAsync });
  }, []); //eslint-disable-line react-hooks/exhaustive-deps


  const handelClick = data => {
    push({
      pathname: "/courses/detailsCourse",
      state: { data: data, status: "ActiveCourse" }
    });
  };


  return (
    <div className={`bg-white rounded-lg p-2 ${classes.rootActive} mb-5`}>
      <div className={"d-flex p-3"}>
        <div>
          <h3 className="d-inline-block">
            رویدادهای پیش‌رو
          </h3>
          {
            ActiveCourse.loading && (
              <div className={classes.spinner}>
                <span className="ml-2 spinner"></span>
              </div>
            )
          }
        </div>
        <hr className={classes["line"]} />
      </div>
      <Swiper
        handelClick={handelClick}
        data={ActiveCourse.data}
        loading={ActiveCourse.loading}
      />
    </div>
  );
}
