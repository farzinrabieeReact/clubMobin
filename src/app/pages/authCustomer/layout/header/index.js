import React, { useState } from "react";
import HeaderContent from "./headerContent";
import Styles from "./index.module.scss";
import Step from "./step";

const HeaderLayout = ({ step, setstep,sejamInfoState }) => {
  return (
    <>
      <div style={{height:180,width:'100%'}}>
        <div className={Styles["header"]}>
          <Step step={step} />
          <HeaderContent sejamInfoState={sejamInfoState}/>
        </div>
      </div>
    </>
  );
};

export default HeaderLayout;
