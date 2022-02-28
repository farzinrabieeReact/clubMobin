import { makeStyles } from "@material-ui/core";
import moment from "moment-timezone";
import React, { useEffect, useState } from "react";
import { dateConvertMiladiToShamsi } from "../../../../common/method/date";

let useStyles = makeStyles((theme) => ({
  titleParent: {
    width: "100%",
    backgroundColor: "#f2f2f2",
    height: 100,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    position: "relative",
    overflow: "hidden",
    "@media (max-width: 780px)": {
      width: "150%",
    },
    "@media (min-width: 0px) and (max-width: 500px)": {
      width: "200%",
    },
  },
  ul: {
    width: "100%",
    "@media (max-width: 780px)": {
      width: "150%",
    },
    "@media (min-width: 0px) and (max-width: 500px)": {
      width: "200%",
    },
  },
  text: {
    color: "gray",
    opacity: 0.51,
    fontSize: 16,
    '@media (max-width: 780px)' : {
      fontSize: 14,
    }
  },
  title:{
    fontSize:22,
    '@media (max-width: 780px)' : {
      fontSize:18,
    }
  },
  close: {
    width: 90,
    height: 50,
    backgroundColor: "rgba(250, 67, 67, 0.699)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    position: "absolute",
    bottom: 65,
    right: -40,
    transform: "rotate(45deg)",
    cursor: "pointer",
    zIndex:10,
    "@media (max-width: 780px)": {
      right: "-38px",
      bottom: "72px",
    },
  },
  closeIcon: {
    transform: "rotate(-45deg)",

    position: "absolute",
    width: "fit-content",
    top: "30px",
      right: "46px",
    bottom: "14px",
    "@media (max-width: 780px)": {
      top: "31px",
      right: "41px",
    },
  },
}));

const BuyHadaf = ({ reservePlan, handelFlagModalDelete }) => {
  const [endDate, setendDate] = useState();

  function datediff(first, second) {
   
    var start = moment(first);
    var end = moment(second);
    let dif = end.diff(start, "days");
    setendDate(dif);
  }

  useEffect(() => {
    if (reservePlan) {
      let start = reservePlan?.body?.start_date.split(" ")[0];
      let end = reservePlan?.body?.end_date.split(" ")[0];
      datediff(start, end);
    }
  }, []);
  const classes = useStyles();
  return (
    <>
      <div className="w-100 " style={{ marginTop: 10, overflow: "auto" }}>
        <div className={classes.titleParent}>
          <div
            className={classes.close}
            onClick={(e) => handelFlagModalDelete(e, reservePlan?.id)}
          >
            <div className={classes.closeIcon}>X</div>
          </div>
          <ul
            className={`${classes.ul} d-flex justify-content-between align-items-center text-light list-unstyled position-relative  m-0 p-0`}
            style={{ height: "65%" }}
          >
            <li
              className="d-flex flex-column align-items-center justify-content-between flex-fill h-100"
              style={{ borderLeft: "1px solid rgba(128, 128, 128, 0.527)" }}
            >
              <div style={{ color: "black" }} className={classes.title}>
                {reservePlan?.body?.status === "FINALIZED"
                  ? "رزرو"
                  : "غیر فعال"}
              </div>
              <div className={classes.text}>وضعیت</div>
            </li>
            <li
              className="d-flex flex-column align-items-center justify-content-between flex-fill h-100"
              style={{ borderLeft: "1px solid rgba(128, 128, 128, 0.527)" }}
            >
              <div style={{ color: "black" }} className={classes.title}>
                {reservePlan?.body?.subscription_title}
              </div>
              <div className={classes.text}>نوع اشتراک</div>
            </li>
            <li
              className="d-flex flex-column align-items-center justify-content-between flex-fill h-100"
              style={{ borderLeft: "1px solid rgba(128, 128, 128, 0.527)" }}
            >
              <div style={{  color: "black" }} className={classes.title}>
                {dateConvertMiladiToShamsi(
                  reservePlan?.body?.start_date.split(" ")[0]
                )}
              </div>
              <div className={classes.text}>شروع اعتبار</div>
            </li>
            <li
              className="d-flex flex-column align-items-center justify-content-between flex-fill h-100"
              style={{ borderLeft: "1px solid rgba(128, 128, 128, 0.527)" }}
            >
              <div style={{ color: "black" }} className={classes.title}>
                {dateConvertMiladiToShamsi(
                  reservePlan?.body?.end_date.split(" ")[0]
                )}
              </div>
              <div className={classes.text}>پایان اعتبار</div>
            </li>

            <li className="d-flex flex-column align-items-center justify-content-between flex-fill h-100">
              <div style={{ color: "black" }} className={classes.title}>{endDate+1}</div>
              <div className={classes.text}>روز باقی مانده</div>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default BuyHadaf;
