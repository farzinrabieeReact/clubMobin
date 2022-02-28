import React from "react";
import Styles from "../../index.module.scss"

const StepOneInfoContent = ({privatePerson}) => {
  return (
    <>
      <div className="d-flex flex-column m-0 ms-md-5">
        <div style={{color: "#888888" }} className={Styles["stepOne-content-text"]}>جنسیت</div>
        <div className={Styles["stepOne-content-text"]}>{privatePerson?.gender === "Male"? "مرد" :"زن"}</div>
      </div>
      <div className="d-flex flex-column m-0 ms-md-5">
        <div style={{ color: "#888888" }} className={Styles["stepOne-content-text"]}>شماره شناسنامه</div>
        <div className={Styles["stepOne-content-text"]}>{privatePerson?.shNumber?privatePerson?.shNumber:"_"}</div>
      </div>
      <div className="d-flex flex-column m-0 ms-md-5">
        <div style={{ color: "#888888" }} className={Styles["stepOne-content-text"]}>سری و سريال شناسنامه</div>
        <div className={Styles["stepOne-content-text"]}>{ privatePerson?.serial?`${privatePerson?.serial}${"-"}${privatePerson?.seriSh}`:"_"}</div>
      </div>
      <div className="d-flex flex-column m-0 ms-md-5">
        <div style={{color: "#888888" }} className={Styles["stepOne-content-text"]}>محل صدور</div>
        <div className={Styles["stepOne-content-text"]}>{privatePerson?.placeOfIssue?privatePerson?.placeOfIssue:"_"}</div>
      </div>
      <div className="d-flex flex-column m-0 ms-md-5">
        <div style={{ color: "#888888" }} className={Styles["stepOne-content-text"]}>محل تولد</div>
        <div className={Styles["stepOne-content-text"]}>{privatePerson?.placeOfBirth?privatePerson?.placeOfBirth:'_'}</div>
      </div>
    </>
  );
};

export default StepOneInfoContent;
