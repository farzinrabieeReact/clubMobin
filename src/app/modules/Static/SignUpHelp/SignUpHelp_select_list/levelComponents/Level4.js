import React from "react";

const Level4 = () => {
  return (
    <div>
      <div className="row">
        <div className="col-7">
          <h3>ورود به سایت</h3>
          <p>
            پس از ثبت نام می توانید به عنوان عضوی از باشگاه مشتریان ، وارد سایت
            شوید .
          </p>
        </div>
        <div className="col-5 text-right mb-5">
          <img
            src={"/media/common/signuphelp/register-09.jpg"}
            className="img-fluid"
            alt=""
          />
        </div>
      </div>
      <p>
        در صفحه ورود به سایت می توانید با استفاده از شناسه کاربری / کد ملی یا
        شناسه حقوقی و یا آدرس پست الکترونیک همچنین رمز عبور که در مرحله ثبت نام
        تعیین کرده اید ، وارد سایت شوید
      </p>
      <div className="w-100 text-right">
        <img src={"/media/common/signuphelp/registrer-10.jpg"} alt="" />
      </div>
    </div>
  );
};

export default Level4;
