import React from "react";
import GroupIcon from "@material-ui/icons/Group";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import ScheduleIcon from "@material-ui/icons/Schedule";
import TimelapseIcon from "@material-ui/icons/Timelapse";
import PersonIcon from "@material-ui/icons/Person";
import { handleNumber } from "../../../../common/method/displayData";
// import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';

export default function Index({ data }) {
  return (
    <div>
      {/*<p>{data.body.start_date}</p>*/}
      <h3>{data.body.category}</h3>
      {data.body.location !== "" ? (
        <p className={"mt-10"}>
          <span className={"mr-2"}>
            <LocationOnIcon />
          </span>
          <span>
            {data.body.location === "0" ? "آنلاین" : data.body.location}
          </span>
        </p>
      ) : null}
      <p className={"mt-5"}>
        <span className={"mr-2"}>
          <LocalOfferIcon />
        </span>
        <span>{data.body.cost ? handleNumber(data.body.cost) : "رایگان"}</span>
      </p>
      <p className={"mt-5"}>
        <span className={"mr-2"}>
          <GroupIcon />
        </span>
        <span className={"mr-2"}>برگزار کننده :</span>
        <span>شرکت کارگزاری مبین سرمایه</span>
      </p>
      <p className={"mt-5"}>
        <span className={"mr-2"}>
          <GroupIcon />
        </span>
        <span className={"mr-2"}>امتیاز مورد نیاز :</span>
        <span>{handleNumber(data.body.required_bonus)}</span>
      </p>
      <p className={"mt-5"}>
        <span className={"mr-2"}>
          <ScheduleIcon />
        </span>
        <span className={"mr-2"}>شروع :</span>
        <span>{data.body.start_date}</span>
      </p>
      <p className={"mt-5"}>
        <span className={"mr-2"}>
          <TimelapseIcon />
        </span>
        <span className={"mr-2"}>زمان برگزاری :</span>
        <span>{data.body.holding_time}</span>
      </p>
      <p className={"mt-5"}>
        <span className={"mr-2"}>
          <PersonIcon />
        </span>
        <span className={"mr-2"}>مدرس :</span>
        <span>{data.body.teacher_name}</span>
      </p>
    </div>
  );
}
