import React, { useEffect, useState } from "react";
import { AssignmentTurnedIn, CalendarToday, Event } from "@material-ui/icons";
import { useSelector } from "react-redux";

const Consecutive = () => {
  const [show2, setshow2] = useState(true);
  const auth = useSelector((state) => state.auth);

  const [state, setstate] = useState({
    user: {
      member_available_bonus: "-",
      member_continuous_login_count: "-",
    },
  });

  useEffect(() => {
    if (auth.user !== undefined) {
      setstate(auth);
    }
  }, [auth]);

  //handle week login
  let valueLogin = state.user.member_continuous_login_count;

  let data = [];

  if (valueLogin === 0) {
    data.push(
      { flag: "true" },
      { flag: "true" },
      { flag: "true" },
      { flag: "true" },
      { flag: "true" },
      { flag: "true" },
      { flag: "true" }
    );
  } else {
    for (let i = 1; i <= 7; i++) {
      if (i <= valueLogin) {
        data.push({ flag: "true", id: i });
      } else {
        data.push({ flag: "false", id: i });
      }
    }
  }

  return (
    <li
      className="nav-item mb-2"
      data-placement="left"
      onMouseEnter={() => setshow2(false)}
      onMouseLeave={() => setshow2(true)}
      style={{ position: "relative" }}
    >
      <div
        style={{
          width: "240px",
          height: "160px",
          backgroundColor: "white",
          borderRadius: "7px",
          position: "absolute",
          top: "0",
          right: "50px",
          boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
        }}
        className={show2 ? "handleHover" : null}
      >
        <div className="mt-3 p-2 ml-3">
          <Event color="action" fontSize="small" />
          <span className="d-inline-block ml-2">
             7 روز ورود متوالی = 5 امتیاز جایزه
            {/* {valueLogin === 0 ? "7" : valueLogin} روز ورود متوالی ={" "}
            {state.user.member_available_bonus} امتیاز جایزه */}
          </span>
          <div
            className="d-flex justify-content-between flex-row-reverse px-3"
            style={{ marginTop: "30px" }}
          >
            {data.map((data, index) => (
              <span className="shadow" key={index}>
                {data.flag === "true" ? (
                  <AssignmentTurnedIn color="primary" />
                ) : (
                  <span className="badge">{data.id}</span>
                )}
              </span>
            ))}
          </div>
        </div>
        <div
          className="py-4 text-center text-light w-100 "
          style={{
            backgroundColor: "gray",
            position: "absolute",
            bottom: "0",
            borderRadius: "0 0 7px 7px",
          }}
        >
          {valueLogin === 0
            ? "شما 5 امتیاز دریافت کردید"
            : `تنها ${7 - valueLogin} روز تا برنده شدن شما باقیست`}
        </div>
        <span className="flash"></span>
      </div>
      <div className="btn btn-sm btn-icon btn-bg-light btn-text-warning btn-hover-info">
        <CalendarToday color="action" fontSize="large" />
      </div>
    </li>
  );
};

export default Consecutive;
