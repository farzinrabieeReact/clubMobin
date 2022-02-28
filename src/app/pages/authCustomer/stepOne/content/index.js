import React from "react";
import Styles from "../index.module.scss";
import StepOneBankContent from "./bank";
import StepOneContactContent from "./contact";
import StepOneFinicialContent from "./finicial";
import StepOneInfoContent from "./info";
import StepOneJobContent from "./job";
import StepOnePersonContent from "./person";

const StepOneContent = ({sejamInfoState}) => {
  return (
    <>
      <div className="w-100 h-100 d-flex flex-column align-items-center">
        <h6 className="mt-4 mb-8 ">لطفا اطلاعات خود را بررسی و تایید نمایید</h6>
        <div className={Styles["stepOne-content-header"]}>اطلاعات فردی</div>
        <div className={Styles["stepOne-content-box"]}>
          <StepOnePersonContent privatePerson={sejamInfoState?.body?.privatePerson} nationalId={sejamInfoState?.body?.uniqueIdentifier}/>
        </div>
        <div className={Styles["stepOne-content-header"]}>اطلاعات شناسنامه</div>
        <div className={Styles["stepOne-content-box"]}>
          <StepOneInfoContent privatePerson={sejamInfoState?.body?.privatePerson}/>
        </div>
        <div className={Styles["stepOne-content-header"]}>اطلاعات تماس</div>
        <div className={Styles["stepOne-content-box"]}>
          <StepOneContactContent addresses={sejamInfoState?.body?.addresses}/>
        </div>
        <div className={Styles["stepOne-content-header"]}>اطلاعات شغلی</div>
        <div className={Styles["stepOne-content-box"]}>
          <StepOneJobContent jobInfo={sejamInfoState?.body?.jobInfo}/>
        </div>
        <div className={Styles["stepOne-content-header"]}>
          اطلاعات حساب بانکی
        </div>
        <div className={Styles["stepOne-content-box"]}>
          <StepOneBankContent accounts={sejamInfoState?.body?.accounts}/>
        </div>
        <div className={Styles["stepOne-content-header"]}>اطلاعات مالی</div>
        <div className={Styles["stepOne-content-box"]}>
          <StepOneFinicialContent financialInfo={sejamInfoState?.body?.financialInfo}/>
        </div>
      </div>
    </>
  );
};

export default StepOneContent;
