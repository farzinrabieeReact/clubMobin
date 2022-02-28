import React from "react";

import { useHistory } from "react-router-dom";
import { actionTypes } from "./../../../../redux/notificationAlert";
import { useDispatch } from "react-redux";

export default function Card(props) {
  let backColor = props.backColor;
  let widgetHeight = "150px";

  const dispatch = useDispatch();
  const { push } = useHistory();

  const handelRoute = (page) => {
    if (!page) {
      dispatch({
        type: actionTypes.info,
        textAlert: "صفحه مورد نظر در دسترس نمی باشد",
      });
      return;
    }


    if (page === "courses") {
      push({
        pathname: "/courses",
      });
    }else{
      push({
        pathname: "/stock",
        state: { tabPanel: page },
      });
    }

  };

  return (
    <div
      className={`card card-custom cursor-pointer mt-3 mt-lg-0 rounded-lg shadow`}
      style={{ height: widgetHeight, backgroundColor: backColor }}
      onClick={() => handelRoute(props.link)}
    >
      <div className="d-flex p-3 pr-5">
        {props.icon}
        <div
          className={`font-weight-bolder font-size-h2 mt-4`}
          style={{ color: "white" }}
        >
          {props.title}
        </div>
        {/* <a
            href="#"
            className={`text-inverse-${baseColor} font-weight-bold font-size-lg mt-1`}
          >
            New Products
          </a> */}
      </div>
      <p className="pl-26 text-light">{props.text}</p>
      {/* <span className="svg-icon svg-icon-3x svg-icon-white ">
        <SVG src={toAbsoluteUrl("/media/common/icon/LeftCircle.svg")} />
      </span> */}
    </div>
  );
}
