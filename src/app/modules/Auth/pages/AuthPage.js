/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Link, Switch, Redirect } from "react-router-dom";
import { toAbsoluteUrl } from "../../../../_metronic/_helpers";
import { ContentRoute } from "../../../../_metronic/layout";
import Login from "./Login";
import RegistrationLevel1 from "./RegistrationLevel1";
import RegistrationLevel2 from "./RegistrationLevel2";
import RegistrationLevel3 from "./RegistrationLevel3";

import ForgotPassword from "./ForgotPassword";
import "../../../../_metronic/_assets/sass/pages/login/classic/login-1.scss";
import ForgotPasswordChange from "./ForgotPasswordChange";

import { useLocation } from 'react-router-dom'

export function AuthPage() {
  const location = useLocation();
  return (
    <>
      <div className="d-flex flex-column flex-root">
        {/*begin::Login*/}
        <div
          className="login login-1 login-signin-on d-flex flex-column flex-lg-row flex-column-fluid bg-white"
          id="kt_login"
        >
          {/*begin::Aside*/}
          <div
            className="login-aside d-flex flex-row-auto bgi-size-cover bgi-no-repeat p-10 p-lg-10"
            style={{
              backgroundImage: `url(${toAbsoluteUrl("/media/bg/bg-4.jpg")})`
            }}
          >
            {/*begin: Aside Container*/}
            <div className="d-flex flex-row-fluid flex-column justify-content-between">
              {/* start:: Aside header */}
              <Link to="/home" className="flex-column-auto mt-5 pb-lg-0 pb-10">
                <img
                  alt="Logo"
                  className="max-h-70px"
                  src={toAbsoluteUrl("/media/common/logo.png")}
                />
              </Link>
              {/* end:: Aside header */}

              {/* start:: Aside content */}
              <div className="flex-column-fluid d-flex flex-column justify-content-center">
                <h3 className="font-size-h1 mb-5 text-white">
                  به باشگاه مشتریان کارگزاری مبین سرمایه خوش آمدید.
                </h3>
                {/* <p className="font-weight-lighter text-white opacity-80">
                  The ultimate Bootstrap & React 16 admin theme framework for
                  next generation web apps.
                </p> */}
              </div>
              {/* end:: Aside content */}

              {/* start:: Aside footer for desktop */}
              <div className="d-none flex-column-auto d-lg-flex justify-content-between mt-10">
                <div className="opacity-70 font-weight-bold	text-white">
                  &copy; تمامی حقوق این سایت محفوظ و متعلق به شرکت داده پردازی
                  گرادیان می باشد
                </div>
                {/* <div className="d-flex">
                  <Link to="/terms" className="text-white">
                    Privacy
                  </Link>
                  <Link to="/terms" className="text-white ml-10">
                    Legal
                  </Link>
                  <Link to="/terms" className="text-white ml-10">
                    Contact
                  </Link>
                </div> */}
              </div>
              {/* end:: Aside footer for desktop */}
            </div>
            {/*end: Aside Container*/}
          </div>
          {/*begin::Aside*/}

          {/*begin::Content*/}
          <div className="d-flex flex-column flex-row-fluid position-relative p-7 overflow-hidden">
            {/*begin::Content header*/}
            <div className="position-absolute top-0 right-0 text-right mt-5 mb-15 mb-lg-0 flex-column-auto justify-content-center py-5 px-10">
              {
                location.pathname === '/auth/login' && (
                  <>
                    <span className="font-weight-bold text-dark-50">
                      حساب کاربری ندارید؟
                     </span>
                    <Link
                      to="/auth/registration"
                      className="font-weight-bold ml-2"
                      id="kt_login_signup"
                    >
                      ثبت نام
                   </Link>
                  </>
                )
              }
              {
                location.pathname !== '/auth/login' && (
                  <>
                    <Link
                      to="/auth/login"
                      className="font-weight-bold ml-2"
                      id="kt_login_signup"
                    >
                     ورود
                   </Link>
                  </>
                )
              }
            </div>
            {/*end::Content header*/}

            {/* begin::Content body */}
            <div className="d-flex flex-column-fluid flex-center mt-30 mt-lg-0">
              <Switch>
                <ContentRoute path="/auth/login" component={Login} />
                {/* /////////////////////registration//////////////// */}
                <ContentRoute
                  path="/auth/registration"
                  component={RegistrationLevel1}
                />
                <ContentRoute
                  path="/auth/registrationLevel2"
                  component={RegistrationLevel2}
                />
                <ContentRoute
                  path="/auth/registrationLevel3"
                  component={RegistrationLevel3}
                />
                {/* ////////////////////////////////////////////////////////// */}
                <ContentRoute
                  path="/auth/forgot-password"
                  component={ForgotPassword}
                />
                <ContentRoute
                  path="/auth/forgot-password-change"
                  component={ForgotPasswordChange}
                />
                <Redirect from="/auth" exact={true} to="/auth/login" />
                <Redirect to="/auth/login" />
              </Switch>
            </div>
            {/*end::Content body*/}

            {/* begin::Mobile footer */}
            <div className="d-flex d-lg-none flex-column-auto flex-column flex-sm-row justify-content-between align-items-center mt-5 p-5">
              <div className="text-dark-50 font-weight-bold order-2 order-sm-1 my-2">
                &copy; تمامی حقوق این سایت محفوظ و متعلق به شرکت داده پردازی
                گرادیان می باشد
              </div>
              {/* <div className="d-flex order-1 order-sm-2 my-2">
                <Link to="/terms" className="text-dark-75 text-hover-primary">
                  Privacy
                </Link>
                <Link
                  to="/terms"
                  className="text-dark-75 text-hover-primary ml-4"
                >
                  Legal
                </Link>
                <Link
                  to="/terms"
                  className="text-dark-75 text-hover-primary ml-4"
                >
                  Contact
                </Link>
              </div> */}
            </div>
            {/* end::Mobile footer */}
          </div>
          {/*end::Content*/}
        </div>
        {/*end::Login*/}
      </div>
    </>
  );
}
