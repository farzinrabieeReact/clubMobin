/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import SVG from "react-inlinesvg";
import { ModalProgressBar } from "../../../_metronic/_partials/controls";
import { toAbsoluteUrl } from "../../../_metronic/_helpers";
import * as auth from "../Auth";
import { ChangePassword as ChangePasswordApi } from "../../../app/modules/Auth/_redux/authCrud";
import { getDataInLocalstorage } from "../../common/method/getDataInLocalstorage";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import { handleNotificationAlertTryUpdate } from "../../common/method/handleNotificationAlert";

function ChangePassword() {
  // Fields
  const [loading, setloading] = useState(false);
  const [isError, setisError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { push } = useHistory();
  // const user = useSelector((state) => state.auth.user, shallowEqual);
  // useEffect(() => { }, [user]);
  // Methods
  const saveUser = (values, setStatus, setSubmitting, resetForm) => {
    setloading(true);
    setisError(false);
    setIsSuccess(false);

    if (getDataInLocalstorage("member_id")) {
      let member_id = getDataInLocalstorage("member_id");
      ChangePasswordApi(member_id, values.currentPassword, values.password)
        .then(res => {
          let isOk = handleNotificationAlertTryUpdate(res);
          setloading(false);
          setSubmitting(false);
          if (isOk) {
            setIsSuccess(true);
            setisError(false);
            setStatus({ success: true });
            resetForm(values);
          } else {
            setStatus({ success: false });
            setisError(true);
          }
        })
        .catch(err => {
          setloading(false);
          setSubmitting(false);
          setStatus({ success: false });
          setisError(true);
        });
    } else {
      setisError(true);
    }
  };

  const initialValues = {
    currentPassword: "",
    password: "",
    cPassword: ""
  };

  const Schema = Yup.object().shape({
    currentPassword: Yup.string().required("گذرواژه فعلی لازم است"),
    password: Yup.string()
      .required("گذرواژه جدید لازم است")
      .min(8, "حداقل 8 کاراکتر"),
    cPassword: Yup.string()
      .required("تأیید رمز عبور لازم است")
      .when("password", {
        is: val => (val && val.length > 0 ? true : false),
        then: Yup.string().oneOf(
          [Yup.ref("password")],
          "گذرواژه و تأیید گذرواژه مطابقت نداشت"
        )
      })
  });

  const getInputClasses = fieldname => {
    if (formik.touched[fieldname] && formik.errors[fieldname]) {
      return "is-invalid";
    }

    if (formik.touched[fieldname] && !formik.errors[fieldname]) {
      return "is-valid";
    }

    return "";
  };

  const formik = useFormik({
    initialValues,
    validationSchema: Schema,
    onSubmit: (values, { setStatus, setSubmitting, resetForm }) => {
      saveUser(values, setStatus, setSubmitting, resetForm);
    }
  });

  return (
    <form className="card card-custom" onSubmit={formik.handleSubmit}>
      {loading && <ModalProgressBar />}

      {/* begin::Header */}
      <div className="card-header py-3">
        <div className="card-title align-items-start flex-column">
          <h3 className="card-label font-weight-bolder text-dark">
            رمز عبور را تغییر دهید
          </h3>
          <span className="text-muted font-weight-bold font-size-sm mt-1">
            رمز ورود حساب خود را تغییر دهید
          </span>
        </div>

        <div className="card-toolbar">
          <button
            type="submit"
            className="btn backGroundOrange mr-2"
            disabled={
              formik.isSubmitting || (formik.touched && !formik.isValid)
            }
          >
            ذخیره تغییرات
            {formik.isSubmitting}
          </button>
          {/* <button
            className="btn btn-secondary"
          >
            لغو
          </button> */}

        </div>
      </div>
      {/* end::Header */}
      {/* begin::Form */}

      <div className="form">
        <div className="card-body">
          {/* begin::Alert */}
          {isError && (
            <div
              className="alert alert-custom alert-light-danger fade show mb-10"
              role="alert"
            >
              <div className="alert-icon">
                <span className="svg-icon svg-icon-3x svg-icon-danger">
                  <SVG
                    src={toAbsoluteUrl("/media/svg/icons/Code/Info-circle.svg")}
                  ></SVG>{" "}
                </span>
              </div>
              <div className="alert-text font-weight-bold">
                متاسفانه انجام نشد
              </div>
              <div className="alert-close" onClick={() => setisError(false)}>
                <button
                  type="button"
                  className="close"
                  data-dismiss="alert"
                  aria-label="Close"
                >
                  <span aria-hidden="true">
                    <i className="ki ki-close"></i>
                  </span>
                </button>
              </div>
            </div>
          )}
          {/* end::Alert */}

          {/* begin::Alert */}
          {isSuccess && (
            <div
              className="alert alert-custom alert-light-success fade show mb-10"
              role="alert"
            >
              <div className="alert-icon">
                <span className="svg-icon svg-icon-3x svg-icon-danger">
                  <CheckCircleIcon color="primary" />{" "}
                </span>
              </div>
              <div className="alert-text font-weight-bold">
                با موفقیت انجام شد.
              </div>
              <div className="alert-close" onClick={() => setisError(false)}>
                <button
                  type="button"
                  className="close"
                  data-dismiss="alert"
                  aria-label="Close"
                  onClick={() => setIsSuccess(false)}
                >
                  <span aria-hidden="true">
                    <i className="ki ki-close"></i>
                  </span>
                </button>
              </div>
            </div>
          )}
          {/* end::Alert */}

          <div className="form-group row">
            <label className="col-xl-3 col-lg-3 col-form-label text-alert">
              رمز عبور فعلی
            </label>
            <div className="col-lg-9 col-xl-6">
              <input
                type="password"
                placeholder="رمز عبور فعلی"
                className={`form-control form-control-lg form-control-solid mb-2 ${getInputClasses(
                  "currentPassword"
                )}`}
                name="currentPassword"
                {...formik.getFieldProps("currentPassword")}
              />
              {formik.touched.currentPassword &&
              formik.errors.currentPassword ? (
                <div className="invalid-feedback">
                  {formik.errors.currentPassword}
                </div>
              ) : null}
              <span
                // to="auth/forgot-password"
                role="button"
                className="text-sm 
                font-weight-bold 
                text-hover-primary"
                onClick={() => push("/auth/forgot-password")}
              >
                رمز عبور خود را فراموش کرده اید؟
              </span>
            </div>
          </div>
          <div className="form-group row">
            <label className="col-xl-3 col-lg-3 col-form-label text-alert">
              رمز عبور جدید
            </label>
            <div className="col-lg-9 col-xl-6">
              <input
                type="password"
                placeholder="رمز عبور جدید"
                className={`form-control form-control-lg form-control-solid ${getInputClasses(
                  "password"
                )}`}
                name="password"
                {...formik.getFieldProps("password")}
              />
              {formik.touched.password && formik.errors.password ? (
                <div className="invalid-feedback">{formik.errors.password}</div>
              ) : null}
            </div>
          </div>
          <div className="form-group row">
            <label className="col-xl-3 col-lg-3 col-form-label text-alert">
              تائید رمز عبور
            </label>
            <div className="col-lg-9 col-xl-6">
              <input
                type="password"
                placeholder="تائید رمز عبور"
                className={`form-control form-control-lg form-control-solid ${getInputClasses(
                  "cPassword"
                )}`}
                name="cPassword"
                {...formik.getFieldProps("cPassword")}
              />
              {formik.touched.cPassword && formik.errors.cPassword ? (
                <div className="invalid-feedback">
                  {formik.errors.cPassword}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
      {/* end::Form */}
    </form>
  );
}

export default connect(null, auth.actions)(ChangePassword);
