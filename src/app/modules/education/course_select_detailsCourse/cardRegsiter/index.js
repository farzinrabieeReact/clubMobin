import React from "react";
import TimelapseIcon from "@material-ui/icons/Timelapse";
import PersonIcon from "@material-ui/icons/Person";

export default function Index({ data }) {
  return (
    <div>
      <p className={"mt-5"}>
        {/*{data.body.registration_date.split(" ")[0]}*/}
        {data.body.course_start_date}
      </p>
      <h3>{data.body.category}</h3>
      <p className={"mt-5"}>
        <span className={"mr-2"}>
          <TimelapseIcon />
        </span>
        <span className={"mr-2"}>کد ملی :</span>
        <span>{data.body.member_national_id}</span>
      </p>
      <p className={"mt-5"}>
        <span className={"mr-2"}>
          <PersonIcon />
        </span>
        <span className={"mr-2"}>نام شرکت کننده :</span>
        <span>
          {data.body.member_first_name} {data.body.member_last_name}
        </span>
      </p>
      <p className={"mt-5"}>
        <span className={"mr-2"}>
          <TimelapseIcon />
        </span>
        <span className={"mr-2"}>نام دوره :</span>
        <span>{data.body.course_name}</span>
      </p>
    </div>
  );
}
