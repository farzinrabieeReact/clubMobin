import { makeStyles } from "@material-ui/core";
import React from "react";

let useStyles = makeStyles((theme) => ({
  titleParent: {
    width: "100%",
    backgroundColor: "#FF6F00",
    height: 365,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    borderRadius: 10,
    position: "relative",
    "@media (max-width: 600px)": {
      height: 400,
    },
  },
  btn: {
    width: 210,
    height: 45,
    display:'block',
    color: "#FF6F00",
    backgroundColor: "white",
    borderRadius: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: 16,
    '&:hover':{
      color: "#FF6F00",
    },
    "@media (max-width: 600px)": {
      width: 190,
      height: 38,
      fontSize:13
    },
  },
  img:{
    
  },
  textParent: { 
      fontSize: 16, 
      color: "#ffffff", 
      width: "60%" },

      text:{
        fontSize:14,
        textAlign:'center',
        "@media (max-width: 600px)": {
          fontSize:12,
        },
      }
}));

const TitleBoxHadaf = () => {
  const classes = useStyles();
  return (
    <>
      <div className={classes.titleParent}>
        <div>
          <img src="media/hadaf/01.png" alt="" className="img-fluid"/>
        </div>
        <div className="text-light d-flex flex-column justify-content-around align-items-center position-absolute w-100 h-100">
          <h3 className="mt-5">اشتراک تحلیلی هدف حافظ</h3>
          <div className={classes.textParent}>
            <p className={classes.text} style={{marginBottom:30}}>
              شرکت مشاوره سرمایه‌گذاری هدف حافظ با بهره‌گیری از تحلیلگران
              حرفه‌ای بازار، در زمینه مدیریت اختصاصی دارایی و صندوق‌های
              سرمایه‌گذاری مشترک فعالیت می‌کند.{" "}
            </p>
            <p className={classes.text}>
              {" "}
              اگر برای تحلیل و بررسی بازار، فرصت و زمان کافی در اختیار ندارید،
              با استفاده از بسته‌های تحلیلی هدف حافظ، به‌روزترین تحلیل‌های
              بنیادی و تکنیکال در دسترس شما است.
            </p>
          </div>
          <a className={classes.btn} href='#hadaf'>تمدید اشتراک هدف حافظ</a>
        </div>
      </div>
    </>
  );
};

export default TitleBoxHadaf;
