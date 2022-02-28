import React, { useState } from "react";
import { useFormik } from "formik";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { injectIntl } from "react-intl";
import * as auth from "../_redux/authRedux";
import { forgetPasswordLevel1 } from "../_redux/authCrud";

const initialValues = {
  national_id: "",
  password: "",
  cPassword: "",
};

function ForgotPassword(props) {
  const { intl } = props;
  const [loading, setLoading] = useState(false);

  const ForgotPasswordSchema = Yup.object().shape({
    national_id: Yup.string()
      .min(3, "حداقل 3 کاراکتر")
      .max(50, "حداکثر 50 کاراکتر")
      .required(
        intl.formatMessage({
          id: "AUTH.VALIDATION.REQUIRED_FIELD",
        })
      ),
  });

  const getInputClasses = (fieldname) => {
    if (formik.touched[fieldname] && formik.errors[fieldname]) {
      return "is-invalid";
    }

    if (formik.touched[fieldname] && !formik.errors[fieldname]) {
      return "is-valid";
    }

    return "";
  };

  const handleAlertSuccess = (res) => {
    if (!res.data.response.data.sms_resp) {
      return "ایمیل"
    }

    let target =
      res.data.response.data.data.email_response.sent && res.data.response.data?.sms_resp.is_successful ? "ایمیل و اس ام اس" :
        res.data.response.data.data.email_response.sent && !res.data.response.data?.sms_resp.is_successful ? "ایمیل" :
          !res.data.response.data.data.email_response.sent && res.data.response.data?.sms_resp.is_successful ? "اس ام اس" : "(نا مشخص)"

    return target
  }

  const formik = useFormik({
    initialValues,
    validationSchema: ForgotPasswordSchema,
    onSubmit: (values, { setStatus, setSubmitting }) => {
      let data = {
        national_id: values.national_id,
        needs_sms: values.needs_sms ? "TRUE" : "FALSE"
      }
      setLoading(true)
      forgetPasswordLevel1(data)
        .then((res) => {
          setLoading(false)
          if (res.data.response.is_successful) {
            setStatus({
              success: `در خواست به ${handleAlertSuccess(res)} ارسال شد`
            })
            setSubmitting(true);
          }
          else {
            setSubmitting(false);
            if (res.data.response.error_description === "INVALID member_id") {
              setStatus(
                {
                  error: intl.formatMessage(
                    { id: "AUTH.VALIDATION.NOT_FOUND" },
                    { name: values.national_id }
                  )
                });
            } else {
              setStatus(
                { error: "شماره تلفن یا ایمیل ثبت نشده است، لطفا با پشتیبانی تماس بگیرید." }
              );
            }
          }

        })
        .catch(() => {
          setSubmitting(false);
          setLoading(false)

          setStatus(
            {
              error: intl.formatMessage(
                { id: "ERROR.SERVER" },
              )
            });
        });
    },
  });

  return (
    <>
      {/* {isRequested && <Redirect to="/auth" />} */}
      <div className="login-form login-forgot" style={{ display: "block" }}>
        <div className="text-center mb-10 mb-lg-20">
          <h3 className="font-size-h1">رمز عبور را فراموش کرده اید ؟</h3>
          <div className="text-muted font-weight-bold">
            کدملی را وارد کنید تا پسوردتان بازیابی شود
            </div>
        </div>
        <form
          onSubmit={formik.handleSubmit}
          className="form fv-plugins-bootstrap fv-plugins-framework animated animate__animated animate__backInUp"
        >
          {formik.status?.error && (
            <div className="mb-10 alert alert-custom alert-light-danger alert-dismissible">
              <div className="alert-text font-weight-bold">
                {formik.status.error}
              </div>
            </div>
          )}

          {formik.status?.success && (
            <div className="mb-10 alert alert-custom alert-light-success alert-dismissible">
              <div className="alert-text font-weight-bold">
                {formik.status.success}
              </div>
            </div>
          )}

          <div className="form-group fv-plugins-icon-container">
            <input
              type="text"
              placeholder="کد ملی"
              className={`form-control form-control-solid h-auto py-5 px-6 ${getInputClasses(
                "national_id"
              )}`}
              name="national_id"
              {...formik.getFieldProps("national_id")}
            />
            {formik.touched.national_id && formik.errors.national_id ? (
              <div className="fv-plugins-message-container">
                <div className="fv-help-block">{formik.errors.national_id}</div>
              </div>
            ) : null}
          </div>


          {/* begin: needs_sms */}
          <div className="form-group">
            <label className="checkbox d-flex align-items-center" >
              <input
                type="checkbox"
                name="needs_sms"
                className="m-1"
                {...formik.getFieldProps("needs_sms")}
              />
              <p
                className="mr-1 mt-0 mb-0"
                rel="noopener noreferrer"
              >
                ارسال از طریق پیامک
            </p>
              <span />
            </label>
          </div>
          {/* end: needs_sms */}

          <div className="form-group d-flex flex-wrap flex-center">
            <button
              id="kt_login_forgot_submit"
              type="submit"
              className="btn btn-primary font-weight-bold px-9 py-4 my-3 mx-4"
              disabled={formik.isSubmitting}
            >
              <span>
                {
                  formik.values.needs_sms && ('ارسال پیامک')
                }
                {
                  !formik.values.needs_sms && ('ارسال ایمیل')
                }
              </span>
              {loading && <span className="ml-3 spinner spinner-white"></span>}

            </button>
            <Link to="/auth">
              <button
                type="button"
                id="kt_login_forgot_cancel"
                className="btn btn-light-primary font-weight-bold px-9 py-4 my-3 mx-4"
              >
                لغو
                </button>
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}

export default injectIntl(connect(null, auth.actions)(ForgotPassword));
