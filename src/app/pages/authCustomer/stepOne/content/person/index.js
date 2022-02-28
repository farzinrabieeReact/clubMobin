import React from "react";
import { dateConvertMiladiToShamsi } from "../../../../../common/method/date";
import Styles from "../../index.module.scss"

const StepOnePersonContent = ({privatePerson,nationalId}) => {

  const handleDate = (birthDate)=>{
    let date = dateConvertMiladiToShamsi(birthDate.split("T")[0].replaceAll("-","/"))
    return date
  }
  return (
    <>
      <div className="d-flex flex-column m-0 ms-md-5">
        <div style={{color: "#888888" }} className={Styles["stepOne-content-text"]}>نام</div>
        <div className={Styles["stepOne-content-text"]}>{privatePerson?.firstName? privatePerson.firstName:"_"}</div>
      </div>
      <div className="d-flex flex-column m-0 ms-md-5">
        <div style={{color: "#888888" }} className={Styles["stepOne-content-text"]}>نام خانوادگی</div>
        <div className={Styles["stepOne-content-text"]}>{privatePerson?.lastName?privatePerson?.lastName:"_"}</div>
      </div>
      <div className="d-flex flex-column m-0 ms-md-5">
        <div style={{ color: "#888888" }} className={Styles["stepOne-content-text"]}>کد ملی</div>
        <div className={Styles["stepOne-content-text"]}>{nationalId?nationalId:"_"}</div>
      </div>
      <div className="d-flex flex-column m-0 ms-md-5">
        <div style={{color: "#888888" }} className={Styles["stepOne-content-text"]}>تاریخ تولد</div>
        <div className={Styles["stepOne-content-text"]}>{privatePerson?.birthDate?handleDate(privatePerson?.birthDate):'_'}</div>
      </div>
    </>
  );
};

export default StepOnePersonContent;
