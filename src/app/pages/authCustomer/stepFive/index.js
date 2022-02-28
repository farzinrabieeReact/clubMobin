import React from "react";
import Styles from "./index.module.scss";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import { Button } from "@material-ui/core";

const StepFive = () => {
  return (
    <>
      <div className={Styles["stepFive-Parent"]}>
        <div className={Styles["stepFive-main"]}>
          <div
            className={`${Styles["stepFive-box_green"]} d-flex flex-column mt-3`}
          >
            <img
              src="/media/authCustomer/Group 369@2x.png"
              alt=""
              style={{ width: 51, height: 51 }}
            />
            <div className="d-flex flex-column align-items-center mt-5">
              <span>{`${"فرهاد ربیعی"} عزیز`}</span>
              <span>ثبت نام شما با موفقیت انجام شد</span>
            </div>
          </div>
          <div className={`${Styles["stepFive-box_blue"]} d-flex mt-5`}>
            <InfoOutlinedIcon
              style={{ position: "absolute", top: 25, right: 5 }}
            />
            <div>
              جزئیات دسترسی شما به سامانه معاملات آنلاین (نام کاربری و رمز عبور)
              حداکثر تا 5 روز کاری آینده برای شما ارسال می‌شود و نیازی به مراجعه
              حضوری نیست.
            </div>
          </div>
          <div className="d-flex justify-content-around w-100">
            <Button
              className={`${Styles["stepFive-footer-button-active"]} mt-5`}
              disabled={false}
              // onClick={handleNextStep}
            >
              ورود
            </Button>
            <Button
              className={`${Styles["stepFive-footer-button-active"]} mt-5`}
              disabled={false}
              // onClick={handleNextStep}
            >
              تکمیل ثبت نام
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default StepFive;
