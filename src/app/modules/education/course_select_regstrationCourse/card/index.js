import React from "react";
import { makeStyles } from "@material-ui/core";
import GroupIcon from "@material-ui/icons/Group";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import { handleNumber } from "../../../../common/method/displayData";

const useStyles = makeStyles({
  card: {
    maxWidth: 270,
    height: "auto",
    cursor: "pointer"
  },
  images: {
    width: "100%",
    "& > img": {
      width: "100%",
      borderRadius: 5,
      minHeight: 152
    }
  },
  colorText: {
    color: "#909090"
  },
  ellipsis: {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis"
  }
});

export default function Index({ data, handelClick }) {
  const classes = useStyles();

  return (
    <div
      className={`${classes["card"]} rounded-lg shadow mx-2 my-5`}
      onClick={() => handelClick(data)}
    >
      <div className={`${classes["images"]}`}>
        <img src="/media/common/courses1.png" alt="" />
      </div>
      <div className={"p-3"}>
        <p className={`${classes["colorText"]} mt-5`}>
          {data.body.course_start_date ? data.body.course_start_date.split(' ')[0] : ''}
        </p>
        <p className={classes["ellipsis"]}>{data.body.course_name}</p>
        <p className={"mt-10"}>
          {data.body.course_location !== "" ? (
            <>
              <span className={"mr-2"}>
                <LocationOnIcon />
              </span>
              <span>
                {data.body.course_location === "0"
                  ? "آنلاین"
                  : data.body.course_location}
              </span>
            </>
          ) : null}
        </p>
        <p>
          <span className={"mr-2"}>
            <LocalOfferIcon />
          </span>
          <span>
            {data.body.course_cost
              ? `هزینه شرکت در دوره ${handleNumber(
                  data.body.course_cost
                )} می باشد`
              : "رایگان"}
          </span>
        </p>

        <p>
          <span className={"mr-2"}>
            <GroupIcon />
          </span>
          <span>شرکت کارگزاری مبین سرمایه</span>
        </p>
      </div>
    </div>
  );
}
