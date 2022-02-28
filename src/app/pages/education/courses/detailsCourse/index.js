import React from "react";
import { useSubheader } from "../../../../../_metronic/layout";
import DetailsCourse from "./../../../../modules/education/course_select_detailsCourse";
import { makeStyles } from "@material-ui/core";
import CourseRegisterCourse from "../../../../modules/education/course_insert_registerCourse";

const useStyles = makeStyles({
  root: {
    position: "relative",
    minHeight: "100%"
  },
  img: {
    width: "100%"
  }
});
export default function Index() {
  const suhbeader = useSubheader();
  suhbeader.setTitle("دوره های آموزشی");

  let classes = useStyles();

  return (
    <div className=" row">
      <div className="col-12 col-md-4 mb-5">
        <div
          className={`${classes["root"]} flex-row-auto   mb-5 bg-white rounded-lg `}
          id="kt_profile_aside"
        >
          <DetailsCourse />
        </div>
      </div>
      <div className="col-12 col-md-8">
        <div className="flex-row-fluid ml-lg-8">
          <div className="flex-row-fluid  bg-white rounded-lg">
            <img
              src="/media/common/courses1.png"
              alt=""
              className={`${classes["img"]} rounded-lg `}
            />
          </div>
          <div className="flex-row-fluid  bg-white rounded-lg mt-5 ">
            <CourseRegisterCourse />
          </div>
        </div>
      </div>
    </div>
  );
}
