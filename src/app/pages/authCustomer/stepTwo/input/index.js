import React from "react";

import Styles from "../index.module.scss";

const StepTwoInput = ({ handleClickInput, handelChangeInput, input1 }) => {
  return (
    <>
      <div
        className={Styles["stepTwo-content-file-green"]}
        onClick={handleClickInput}
      >
        <div className={`${Styles["stepTwo-content-file-circle-green"]} d-flex justify-content-center align-items-center`}>
          <img
            src="/media/authCustomer/Path 2554@2x.png"
            alt=""
            style={{width:13,height:13}}
          />
        </div>
        <input
          type="file"
          className="d-none"
          ref={input1}
          onChange={(event) => handelChangeInput(event)}
        />
        <img
          src="/media/authCustomer/XMLID_10_@2x.png"
          style={{ width: 19, height: 18 }}
          alt=""
        />
      </div>
      <div
        className={Styles["stepTwo-content-file"]}
        onClick={handleClickInput}
      >
        <input
          type="file"
          className="d-none"
          ref={input1}
          onChange={(event) => handelChangeInput(event)}
        />
        <img
          src="/media/authCustomer/XMLID_10_@2x.png"
          style={{ width: 19, height: 18 }}
          alt=""
        />
      </div>
      <div
        className={Styles["stepTwo-content-file"]}
        onClick={handleClickInput}
      >
        <input
          type="file"
          className="d-none"
          ref={input1}
          onChange={(event) => handelChangeInput(event)}
        />
        <img
          src="/media/authCustomer/XMLID_10_@2x.png"
          style={{ width: 19, height: 18 }}
          alt=""
        />
      </div>
      <div
        className={Styles["stepTwo-content-file"]}
        onClick={handleClickInput}
      >
        <input
          type="file"
          className="d-none"
          ref={input1}
          onChange={(event) => handelChangeInput(event)}
        />
        <img
          src="/media/authCustomer/XMLID_10_@2x.png"
          style={{ width: 19, height: 18 }}
          alt=""
        />
      </div>
    </>
  );
};

export default StepTwoInput;
