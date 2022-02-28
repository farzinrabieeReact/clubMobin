import React from "react";
import Styles from "./index.module.scss";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";

const StepFour = ({ sejamInfoState }) => {
  return (
    <>
      <div className={Styles["stepFour-Parent"]}>
        <div className={Styles["stepFour-main"]}>
          <div
            className={`${Styles["stepFour-box_green"]} d-flex flex-column mt-3`}
          >
            <img
              src="/media/authCustomer/Group 369@2x.png"
              alt=""
              style={{ width: 51, height: 51 }}
            />
            <div className="d-flex flex-column align-items-center mt-5">
              <span>{`${sejamInfoState?.body?.privatePerson?.firstName} ${sejamInfoState?.body?.privatePerson?.lastName} عزیز`}</span>
              <span>ثبت نام شما با موفقیت انجام شد</span>
            </div>
          </div>
          <div className={`${Styles["stepFour-box_blue"]} d-flex mt-5`}>
            <InfoOutlinedIcon
              style={{ position: "absolute", top: 25, right: 5 }}
            />
            <div>
              جزئیات دسترسی شما به سامانه معاملات آنلاین (نام کاربری و رمز عبور)
              حداکثر تا 5 روز کاری آینده برای شما ارسال می‌شود و نیازی به مراجعه
              حضوری نیست.
            </div>
          </div>
          <Button
            className={`${Styles["stepFour-footer-button-active"]} mt-5`}
            disabled={false}
            // onClick={handleNextStep}
          >
            <Link to={"/home"} style={{color:'white'}}>ورود به مرکز خدمات کارگزاری</Link>
          </Button>
        </div>
      </div>
    </>
  );
};

export default StepFour;
