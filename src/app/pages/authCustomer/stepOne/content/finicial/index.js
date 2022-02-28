import React from "react";
import Styles from "../../index.module.scss"

const StepOneFinicialContent = ({ financialInfo }) => {


  const handleTradingKnowledgeLevel = (text) => {
    switch (text) {
      case "Excellent":
        return "عالی"
      case "Good":
        return "خوب"
      case "Medium":
        return "متوسط"
      case "Low":
        return "کم"
      case "VeryLow":
        return "بسیار کم"
      default:
        return "نامشخص"
    }
  }


  const handleTransactionLevel = (text) => {
    switch (text) {
      case "One":
        return "کمتر از 250 میلیون ریال"
      case "Two":
        return "بین 250 تا 1000 میلیون ریال"
      case "Three":
        return "بین 1000 تا 5000 میلیون ریال"
      case "Four":
        return "بین 5000 تا 10000 میلیون ریال"
      case "Five":
        return "بیش از 10000 میلیون ریال"
      default:
        return "نامشخص"
    }
  }

  return (
    <>
      <div className="d-flex flex-column m-0 ms-md-5">
        <div style={{ color: "#888888" }} className={Styles["stepOne-content-text"]}>میزان آشنایی با بورس</div>
        <div className={Styles["stepOne-content-text"]}>{financialInfo?.tradingKnowledgeLevel ? handleTradingKnowledgeLevel(financialInfo?.tradingKnowledgeLevel) : "_"}</div>
      </div>
      <div className="d-flex flex-column m-0 ms-md-5">
        <div style={{ color: "#888888" }} className={Styles["stepOne-content-text"]}>پیش‌بینی مقدار<br className="d-block d-sm-none" /> گردش مالی در یک سال</div>
        <div className={Styles["stepOne-content-text"]}>{financialInfo?.transactionLevel ? handleTransactionLevel(financialInfo?.transactionLevel) : '_'}</div>
      </div>
    </>
  );
};

export default StepOneFinicialContent;
