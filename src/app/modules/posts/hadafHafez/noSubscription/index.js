import { makeStyles } from "@material-ui/core";
import React from "react";
import { dateConvertMiladiToShamsi } from "../../../../common/method/date";

let useStyles = makeStyles((theme) => ({
  titleParent: {
    width: "100%",
    backgroundColor: "rgb(212, 212, 212)",
    height: 100,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    borderRadius: 10,
    position: "relative",
  
  },
  text:{

      fontSize:16
  }
}));

const NoSubscription = () => {
    const classes = useStyles()
  return (
    <>
      <div className="w-100 ">
        {/* <h5 className="text-center mb-4" style={{ fontWeight: 700, fontSize: 24 }}>
          اشتراک شما
        </h5> */}
        <div className={classes.titleParent}>
            <div className={classes.text}>اشتراکی وجود ندارد</div>
          {/* <ul className="d-flex justify-content-between align-items-center text-light list-unstyled w-100  m-0 p-0" style={{height:'65%'}}>
            <li className="d-flex flex-column align-items-center justify-content-between flex-fill h-100" style={{borderLeft:'1px solid #cecece85'}}>
              <div style={{fontSize:22}}>{reservedPlan?.body?.subscription_title}</div>
              <div className={classes.text}>روز باقی مانده</div>
            </li>
            <li className="d-flex flex-column align-items-center justify-content-between flex-fill h-100" style={{borderLeft:'1px solid #cecece85'}}>
              <div style={{fontSize:22}}>{reservedPlan?.body?.subscription_title}</div>
              <div className={classes.text}>نوع اشتراک</div>
            </li>
            <li className="d-flex flex-column align-items-center justify-content-between flex-fill h-100" style={{borderLeft:'1px solid #cecece85'}}>
              <div style={{fontSize:22}}>{dateConvertMiladiToShamsi(reservedPlan?.body?.start_date.split(" ")[0])}</div>
              <div className={classes.text}>شروع اعتبار</div>
            </li>
            <li className="d-flex flex-column align-items-center justify-content-between flex-fill h-100" style={{borderLeft:'1px solid #cecece85'}}>
              <div style={{fontSize:22}}>{dateConvertMiladiToShamsi(reservedPlan?.body?.end_date.split(" ")[0])}</div>
              <div className={classes.text}>پایان اعتبار</div>
            </li>
            <li className="d-flex flex-column align-items-center justify-content-between flex-fill h-100" >
              <div style={{fontSize:22}}>{reservedPlan?.body?.status === "FINALIZED" ? "فعال" :"غیرفعال"}</div>
              <div className={classes.text}>وضعیت</div>
            </li>
           
          </ul> */}
        </div>
      </div>
    </>
  );
};

export default NoSubscription;
