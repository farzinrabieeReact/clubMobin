import React from "react";
import FooterLayout from "./footer";
import HeaderLayout from "./header";
import Styles from "./index.module.scss";

const Layout = ({ children, step, setstep,sejamInfoState }) => {
  return (
    <>
      <div className={Styles["layout"]}>
        <HeaderLayout step={step} setstep={setstep} sejamInfoState={sejamInfoState}/>
        {children}
        <FooterLayout />
      </div>
    </>
  );
};

export default Layout;
