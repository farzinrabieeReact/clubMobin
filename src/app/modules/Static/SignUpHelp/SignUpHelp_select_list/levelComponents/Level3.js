import React from "react";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  section: {}
}));

const Level3 = () => {
  const classes = useStyles();
  return (
    <div className={classes.section}>
      <h3 className="mb-20">ثبت نام در باشگاه مشتریان</h3>

      <h5>ثبت نام از طریق لینک عضویت :</h5>
      <p>
        پس از ورود به صندوق پست الکترونیکی خود ، ایمیل دریافتی از باشگاه مشتریان
        را باز نمایید و بر روی لینک دریافتی کلیک کنید این لینک شما را به صفحه
        ثبت نام عضو جدید هدایت می کند.
      </p>

      <div className="row">
        <div className="col-lg-12">
          <div className="row mb-10 mb-lg-0">
            <div className="col-lg col-12 pt-5">
              <h5>ثبت نام از طریق کد فعال سازی </h5>

              <p>
                چنانچه می خواهید از طریق کد فعال سازی که به تلفن همراهتان پیامک
                شده است ، اقدام به ثبت نام کنید در بخش ورود به سایت ، بر روی
                لینک وارد کردن کد فعال سازی کلیک نمایید .
              </p>
            </div>
            <div className="col-lg col-12 text-right ">
              <img
                src={"/media/common/signuphelp/register-04.jpg"}
                className="img-fluid"
                alt=""
              />
            </div>
          </div>
          <div className="row mb-10 mb-lg-0">
            <div className="col-lg col-12">
              <div>
                <h5>
                  در ادامه فرایند ثبت نام ، فرم فعال سازی کاربر در صفحه جدید را
                  تکمیل نمایید.
                </h5>
                <ul>
                  <li>نوع کاربری خود را (حقیقی-حقوقی) را انتخاب نمایید.</li>
                  <li>کد ملی/ شناسه حقوقی خود را وارد نمایید.</li>
                  <li>کد 5 رقمی دریافتی توسط ایمیل یا پیامک را وارد نمایید.</li>
                  <li>کد امنیتی را وارد نمایید.</li>
                  <li>بر روی دکمه فعال سازی کاربر کلیک نمایید.</li>
                </ul>
              </div>
              <p>
                لازم به ذکر است اطلاعات وارد شده در فرم بالا می بایست مطابق با
                اطلاعات ثبت شده در زمان درخواست عضویت در باشگاه باشد چنانچه کد
                وارد شده معتبر بود ، به صفحه ثبت نام عضو جدید هدایت می شوید. با
                توجه به نوع کاربر حقیقی/حقوقی فرم ثبت نام متفاوت خواهد بود که با
                کادر سبز رنگ نمایش داده شده است. به راهنمای تعیین شناسه کاربری
                که با رنگ آبی قابل مشاهده است توجه نمایید.ّ
              </p>
            </div>
            <div className="col-12 col-lg text-right">
              <img
                src={"/media/common/signuphelp/register-05.jpg"}
                className="img-fluid"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Level3;
