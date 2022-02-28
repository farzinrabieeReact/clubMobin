import React from "react";
import Styles from "../../index.module.scss"

const StepOneJobContent = ({jobInfo}) => {
  return (
    <>
      <div className="d-flex flex-column m-0 ms-md-5">
        <div style={{color: "#888888" }}>شغل</div>
        <div  className={Styles["stepOne-content-text"]}>{jobInfo?.job?.title?jobInfo?.job?.title:'_'}</div>
      </div>
      <div className="d-flex flex-column m-0 ms-md-5">
        <div style={{  color: "#888888" }} className={Styles["stepOne-content-text"]}>آدرس محل کار</div>
        <div  className={Styles["stepOne-content-text"]}>{jobInfo?.companyAddress?jobInfo?.companyAddress:'_'}</div>
      </div>
      <div className="d-flex flex-column m-0 ms-md-5">
        <div style={{color: "#888888" }}>کد پستی شرکت</div>
        <div className={Styles["stepOne-content-text"]}>{jobInfo?.companyPostalCode?jobInfo?.companyPostalCode:'_'}</div>
      </div>
      <div className="d-flex flex-column m-0 ms-md-5">
        <div style={{ color: "#888888" }} className={Styles["stepOne-content-text"]}>ایمیل</div>
        <div className={Styles["stepOne-content-text"]}>{jobInfo?.companyEmail?jobInfo?.companyEmail:'_'}</div>
      </div>
      <div className="d-flex flex-column m-0 ms-md-5">
        <div style={{color: "#888888" }} className={Styles["stepOne-content-text"]}>تلفن شرکت</div>
        <div className={Styles["stepOne-content-text"]}>{jobInfo?.companyPhone?jobInfo?.companyPhone:"_"}</div>
      </div>
    </>
  );
};

export default StepOneJobContent;
