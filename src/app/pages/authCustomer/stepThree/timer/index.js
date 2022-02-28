import { Refresh } from "@material-ui/icons";
import React from "react";
import { useState, useEffect } from "react";

const Timer = (props) => {
  const { initialMinute = 0, initialSeconds = 0 ,apicallSendCode} = props;
  const [minutes, setMinutes] = useState(initialMinute);
  const [seconds, setSeconds] = useState(initialSeconds);

  useEffect(() => {
    let myInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(myInterval);
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }
    }, 1000);
    return () => {
      clearInterval(myInterval);
    };
  });


  const handleRefresh =()=>{
    setMinutes(2)
    setSeconds(0)
    apicallSendCode("refresh")
  }

  return (
    <>
      {minutes === 0 && seconds === 0 && (
        <div
          style={{
            backgroundColor: "#ef6d2227",
            width: 130,
            height: 41,
            borderRadius: 5,
            cursor:'pointer'
          }}
          className="d-flex justify-content-center align-items-center"
        >
          <div className="d-flex justify-content-center" onClick={()=>handleRefresh()} >
            <div style={{ color: "#ef6d22", margin: 0, marginLeft: 2 }}>
              <Refresh />
              {"ارسال مجدد کد"}
            </div>
          </div>
        </div>
      )}
      {minutes !== 0 || seconds !== 0 ? (
          <div
            style={{
              backgroundColor: "#ef6d2227",
              width: 67,
              height: 41,
              borderRadius: 5,
            }}
            className="d-flex justify-content-center align-items-center"
          >
            <div>
              <h5 style={{ color: "#ef6d22", margin: 0 }}>
                {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
              </h5>
            </div>
          </div>
      ):(null)}
    </>
  );
};

export default Timer;
