import React from "react";
import Styles from "../../index.module.scss"

const StepOneBankContent = ({accounts}) => {
  return (
    <>
 <div className="d-flex flex-column m-0 ms-md-5">
        <div style={{ color: "#888888" }} className={Styles["stepOne-content-text"]}>بانک</div>
        <div className={Styles["stepOne-content-text"]}>{!accounts? '_' : accounts[0]?.bank.name}</div>
      </div>
      <div className="d-flex flex-column m-0 ms-md-5">
        <div style={{color: "#888888" }} className={Styles["stepOne-content-text"]}>شماره حساب</div>
        <div className={Styles["stepOne-content-text"]}>{!accounts? '_' : accounts[0]?.accountNumber}</div>
      </div>
      <div className="d-flex flex-column m-0 ms-md-5">
        <div style={{color: "#888888" }} className={Styles["stepOne-content-text"]}>شماره شبا</div>
        <div className={Styles["stepOne-content-text"]}>{!accounts? '_' : accounts[0]?.sheba}</div>
      </div>
      <div className="d-flex flex-column m-0 ms-md-5">
        <div style={{color: "#888888" }} className={Styles["stepOne-content-text"]}>حساب</div>
        <div className={Styles["stepOne-content-text"]}>{!accounts? '_' : accounts[0]?.bank.id}</div>
      </div>
      <div className="d-flex flex-column m-0 ms-md-5">
        <div style={{color: "#888888" }} className={Styles["stepOne-content-text"]}>نام شعبه</div>
        <div className={Styles["stepOne-content-text"]}>{!accounts? '_' : accounts[0]?.branchName}</div>
      </div>
      <div className="d-flex flex-column m-0 ms-md-5">
        <div style={{color: "#888888" }} className={Styles["stepOne-content-text"]}>کد شعبه</div>
        <div className={Styles["stepOne-content-text"]}>{!accounts? '_' : accounts[0]?.branchCode}</div>
      </div>
      <div className="d-flex flex-column m-0 ms-md-5">
        <div style={{color: "#888888" }} className={Styles["stepOne-content-text"]}>استان شعبه</div>
        <div className={Styles["stepOne-content-text"]}>{!accounts? '_' : accounts[0]?.branchCity.name}</div>
      </div>
      <div className="d-flex flex-column m-0 ms-md-5">
        <div style={{color: "#888888" }} className={Styles["stepOne-content-text"]}>شهر شعبه</div>
        <div className={Styles["stepOne-content-text"]}>{!accounts? '_' : accounts[0]?.branchCity.name}</div>
      </div>
    </>
  );
};

export default StepOneBankContent;
