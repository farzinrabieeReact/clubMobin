import { makeStyles } from "@material-ui/core";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { dateConvertMiladiToShamsi } from "../../../../common/method/date";

let useStyles = makeStyles((theme) => ({
  titleParent: {
    width: "100%",
    backgroundColor: "#60418a",
    height: 100,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    overflow: 'auto',
    borderRadius: 10,
    position: "relative",
    '@media (max-width: 780px)' : {
      width: "150%",
    },
    "@media (min-width: 0px) and (max-width: 500px)": {
      width: "200%",
      overflow: "auto",
    },
  },
  ul:{
    width:'100%',
    '@media (max-width: 780px)' : {
      width: "150%",
    },
    "@media (min-width: 0px) and (max-width: 500px)": {
      width: "200%",
    },
  },
  
  
  text: {
    color: "#ffffff",
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
  }
}));

const StatusHadaf = ({ reservedPlan }) => {
  const [endDate, setendDate] = useState();

  const handdleDate = () => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0");
    var yyyy = today.getFullYear();
    today = yyyy + "/" + mm + "/" + dd;
    let endDate = reservedPlan?.body?.end_date.split(" ")[0];
    let startDate = reservedPlan?.body?.start_date.split(" ")[0];
    datediff(today, endDate);
  };

  function datediff(first, second) {
    var start = moment(first);
    var end = moment(second);
    let dif = end.diff(start, "days");
    setendDate(dif);
  }

  useEffect(() => {
    if (reservedPlan) {
      handdleDate();
    }
  }, [reservedPlan]);


  const classes = useStyles();
  return (
    <>
      <div className="w-100" style={{overflow:'auto' }}>
       
        <div className={`${classes.titleParent}`}>
          <ul
            className={`${classes.ul} d-flex justify-content-between align-items-center text-light list-unstyled m-0 p-0`}
            style={{ height: "65%" }}
          >
            <li
              className="d-flex flex-column align-items-center justify-content-between flex-fill h-100"
              style={{ borderLeft: "1px solid #cecece85" }}
            >
              <div className={classes.title}>
                {reservedPlan?.body?.status === "FINALIZED"
                  ? "فعال"
                  : "غیرفعال"}
              </div>
              <div className={classes.text}>وضعیت</div>
            </li>

            <li
              className="d-flex flex-column align-items-center justify-content-between flex-fill h-100"
              style={{ borderLeft: "1px solid #cecece85" }}
            >
              <div className={classes.title}>
                {reservedPlan?.body?.subscription_title}
              </div>
              <div className={classes.text}>نوع اشتراک</div>
            </li>
            <li
              className="d-flex flex-column align-items-center justify-content-between flex-fill h-100"
              style={{ borderLeft: "1px solid #cecece85" }}
            >
              <div className={classes.title}>
                {dateConvertMiladiToShamsi(
                  reservedPlan?.body?.start_date.split(" ")[0]
                )}
              </div>
              <div className={classes.text}>شروع اعتبار</div>
            </li>
            <li
              className="d-flex flex-column align-items-center justify-content-between flex-fill h-100"
              style={{ borderLeft: "1px solid #cecece85" }}
            >
              <div className={classes.title}>
                {dateConvertMiladiToShamsi(
                  reservedPlan?.body?.end_date.split(" ")[0]
                )}
              </div>
              <div className={classes.text}>پایان اعتبار</div>
            </li>

            <li className="d-flex flex-column align-items-center justify-content-between flex-fill h-100">
              <div  className={classes.title}>
                {/* {reservedPlan?.body?.subscription_title} */}
                {endDate + 1}
              </div>
              <div className={classes.text}>روز باقی مانده</div>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default StatusHadaf;
