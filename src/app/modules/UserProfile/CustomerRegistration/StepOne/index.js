import React, { useState } from "react";
import Radio from "@material-ui/core/Radio";
import { makeStyles } from "@material-ui/core";
import { clubmember_send_kyc_otp } from "../../../../../redux/profile/clubmember_insert_send_kyc_otp";
import {
  handleNotificationAlertTryUpdate,
  handleNotificationAlertCatch
} from "./../../../../common/method/handleNotificationAlert";
import LinearProgress from "@material-ui/core/LinearProgress";

const useStyles = makeStyles({
  root: {
    maxWidth: 650,
    position: "relative"
  }
});

export default function Index({ setIndexChild, data }) {
  let classes = useStyles();
  const [loading, setloading] = useState(false);
  const [selectedValue, setSelectedValue] = useState("b");

  const handleChange = value => {
    setSelectedValue(value);
  };

  const handelSubmit = () => {
    if (selectedValue !== "a") {
      return null;
    }

    let _data = {
      national_id: data.body.national_id
    };

    setloading(prev => !prev);
    clubmember_send_kyc_otp(_data)
      .then(res => {
        let resOk = handleNotificationAlertTryUpdate(res);
        if (resOk) {
          setIndexChild(1);
        }
        setloading(prev => !prev);
      })
      .catch(() => {
        handleNotificationAlertCatch();
        setloading(prev => !prev);
      });
  };

  return (
    <>
      <div className={classes["root"]}>
        <div>
          <h3>بروزرسانی اطلاعات </h3>
        </div>
        <hr />
        <div style={{ position: "absolute", top: 33, width: "100%" }}>
          {loading && <LinearProgress />}
        </div>
        <div>
          <p className={"text-justify h6"}>
            آیا در
            <a href="https://www.sejam.ir" target="_blanck" className={"mx-1"}>
              سامانه سجام
            </a>
            ثبت نام کرده و احراز هویت شده‌اید؟ ( برای شروع فرآیند مشتری شدن باید
            در سامانه سجام ثبت نام کرده باشید).
          </p>
        </div>
        <div className={"d-flex"}>
          <div>
            <Radio
              checked={selectedValue === "a"}
              onChange={() => handleChange("a")}
              value={"a"}
              name="radio-button-demo"
              inputProps={{ "aria-label": "A" }}
            />
            <span>بله</span>
          </div>
          <div>
            <Radio
              checked={selectedValue === "b"}
              onChange={() => handleChange("b")}
              value={"b"}
              name="radio-button-demo"
              inputProps={{ "aria-label": "B" }}
            />
            <span>خیر</span>
          </div>
        </div>
        <div>
          <p className={"text-danger mt-3 h6"}>
            کاربر گرامی توجه فرمایید برای دریافت اطلاعات سجام بایستی شماره تماس
            ثبت نامی شما در سامانه سجام و وبسایت باشگاه مشتریان یکی باشد.
          </p>
        </div>
        <div className={"mt-3 text-right"}>
          <button
            className={`btn btn-${
              selectedValue === "a" ? "primary" : "secondary"
            }`}
            onClick={() => handelSubmit()}
          >
            ارسال کد تایید
          </button>
        </div>
      </div>
    </>
  );
}
