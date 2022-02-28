import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { connect, useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { Link, useHistory, useLocation } from "react-router-dom";
import { FormattedMessage, injectIntl } from "react-intl";
import * as auth from "../_redux/authRedux";
import { registerLevel1 } from "../_redux/authCrud";
import { regx_phone } from "../../../common/method/regex";
import { actionTypes } from "../../../../redux/profile/clubmember_select_ref_code";

import { actionTypes as actionTypesNotif } from '../../../../redux/notificationAlert'


const initialValues = {
  phone: "",
  email: "",
  national_id: "",
  introducing_member_national_id: "",
  is_individual: "TRUE",
  acceptTerms: false,
};


export const textErrorNationalId = 'کدملی را به درستی وارد نمایید';

function Registration(props) {



  
  const { intl } = props;
  const { push, } = useHistory()
  const dispatch = useDispatch()
  const search = useLocation().search;
  const [loading, setLoading] = useState(false);
  
  const reducerRefCode = useSelector(state => state.clubmember_select_refCode_reducer)


  useEffect(() => {

    const ref_code = new URLSearchParams(search).get('ref_code');

    if (ref_code) {
      formik.setFieldValue('introducing_member_national_id', ref_code)
      findRefCode(ref_code)
    }
  }, [])//eslint-disable-line  react-hooks/exhaustive-deps


  const RegistrationSchema = Yup.object().shape({
    national_id: Yup.string()
      .min(10, textErrorNationalId)
      .max(11, textErrorNationalId)
      .required(
        intl.formatMessage({
          id: "AUTH.VALIDATION.REQUIRED_FIELD",
        })
      ),
    phone: Yup.string().matches(regx_phone, 'شماره تلفن را به درستی وارد نمایید')
      // .max(13, 'حداکثر 13 کارکتر')
      .required(
        intl.formatMessage({
          id: "AUTH.VALIDATION.REQUIRED_FIELD",
        })
      ),
    email: Yup.string()
      .email('ایمیل را به درستی وارد نمایید')
      .min(3, "حداقل 3 کاراکتر")
      .max(50, "حداکثر 50 کاراکتر")
      .required(
        intl.formatMessage({
          id: "AUTH.VALIDATION.REQUIRED_FIELD",
        })
      ),
    introducing_member_national_id: Yup.string()
      .min(5, "حداقل 5 کاراکتر")
      .max(11, "حداکثر 11 کاراکتر")
    // .required(
    //   intl.formatMessage({
    //     id: "AUTH.VALIDATION.REQUIRED_FIELD",
    //   })
    // ),
    // is_individual: Yup.string()
    //   .required(
    //     intl.formatMessage({
    //       id: "AUTH.VALIDATION.REQUIRED_FIELD",
    //     })
    //   )
    // 
    ,
    acceptTerms: Yup.bool().required(
      "شما باید قوانین و ضوابط را بپذیرید"
    ),
  });

  const enableLoading = () => {
    setLoading(true);
  };

  const disableLoading = () => {
    setLoading(false);
  };

  const getInputClasses = (fieldname, value) => {


    if (fieldname === 'introducing_member_national_id' &&  !value) {
        return "";
      
    }
    if (fieldname === 'introducing_member_national_id' && formik.touched[fieldname] && value) {
      if (!reducerRefCode.data.first_name) {
        return "is-invalid";
      }
    }

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
    validationSchema: RegistrationSchema,
    onSubmit: (values, { setStatus, setSubmitting }) => {

      if (values.introducing_member_national_id) {
        if (!reducerRefCode.data.first_name) {
          dispatch({
            type: actionTypesNotif.warning,
            textAlert: "کد معرف را به درستی وارد نمایید"
          });
          setSubmitting(false);
          return
        }
      }

      setSubmitting(true);
      enableLoading();
      registerLevel1(values.national_id, values.phone, values.email, values.introducing_member_national_id, values.is_individual)
        .then((res) => {
          // props.register(authToken);
          disableLoading();
          setSubmitting(false);
          if (res.data.response.is_successful) {
            setStatus("انجام شد")
            push("/auth/registrationlevel2")
          } else if (res.data.response.error_description === "Club member is already registered.") {
            setStatus("شما قبلا ثبت نام کرده اید از فراموشی رمز استفاده کنید.")
          }
          else {
            setStatus("متاسفانه ثبت نام انجام نشد.")
          }
        })
        .catch(() => {
          disableLoading();
          setSubmitting(false);
          setStatus(
            intl.formatMessage({
              id: "ERROR.SERVER",
            })
          );
        });
    },
  });


  const findRefCode = (introducing_member_national_id) => {

    let { setFieldTouched } = formik
    setFieldTouched('introducing_member_national_id', true);


    if (introducing_member_national_id.length >= 5) {
      let _data = {
        data: {
          introducing_member_national_id: introducing_member_national_id
        }
      }

      dispatch({ type: actionTypes.refCodeSelectAsync, payload: _data })

    } else {
      dispatch({ type: actionTypes.refCodeSelectClear })
    }

  }

  return (
    <div className="login-form login-signin" style={{ display: "block" }}>
      <div className="text-center mb-10 mb-lg-20">
        <h3 className="font-size-h1">
          <FormattedMessage id="AUTH.REGISTER.TITLE" />
        </h3>
        <p className="text-muted font-weight-bold">
          {/* برای ایجاد حساب کاربری اطلاعات  خود را وارد نمایید */}
        </p>
      </div>

      <form
        id="kt_login_signin_form"
        className="form fv-plugins-bootstrap fv-plugins-framework animated animate__animated animate__backInUp"
        onSubmit={formik.handleSubmit}
      >
        {/* begin: Alert */}
        {formik.status && (
          <div className="mb-10 alert alert-custom alert-light-danger alert-dismissible">
            <div className="alert-text font-weight-bold">{formik.status}</div>
          </div>
        )}
        {/* end: Alert */}

        {/* begin: national_id */}
        <div className="form-group fv-plugins-icon-container">
          <input
            placeholder="کدملی"
            type="text"
            className={`form-control form-control-solid h-auto py-5 px-6 ${getInputClasses(
              "national_id"
            )}`}
            name="national_id"
            {...formik.getFieldProps("national_id")}
          />
          {formik.touched.national_id && formik.errors.national_id ? (
            <div className="fv-plugins-message-container">
              <div className="fv-help-block text-danger">{formik.errors.national_id}</div>
            </div>
          ) : null}
        </div>
        {/* end: national_id */}

        {/* begin: phone */}
        <div className="form-group fv-plugins-icon-container">
          <input
            placeholder="شماره همراه"
            type="text"
            className={`form-control form-control-solid h-auto py-5 px-6 ${getInputClasses("phone")}`}
            name="phone"
            {...formik.getFieldProps("phone")}
          />
          {formik.touched.phone && formik.errors.phone ? (
            <div className="fv-plugins-message-container">
              <div className="fv-help-block text-danger">{formik.errors.phone}</div>
            </div>
          ) : null}
        </div>
        {/* end: phone */}

        {/* begin: Email */}
        <div className="form-group fv-plugins-icon-container">
          <input
            placeholder="ایمیل"
            type="email"
            className={`form-control form-control-solid h-auto py-5 px-6 ${getInputClasses(
              "email"
            )}`}
            name="email"
            {...formik.getFieldProps("email")}
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="fv-plugins-message-container">
              <div className="fv-help-block text-danger">{formik.errors.email}</div>
            </div>
          ) : null}
        </div>
        {/* end: Email */}


        {/* begin: introducing_member_national_id */}
        <div className="form-group fv-plugins-icon-container">
          <input

            placeholder="کد معرف یا کد ملی معرف"
            type="introducing_member_national_id"
            id="introducing_member_national_id"
            className={`form-control form-control-solid h-auto py-5 px-6 ${getInputClasses("introducing_member_national_id", formik.values.introducing_member_national_id)}`}

            name="introducing_member_national_id"
            {...formik.getFieldProps("introducing_member_national_id")}
            onBlur={() => findRefCode(formik.values.introducing_member_national_id)}
          />
          {formik.touched.introducing_member_national_id && formik.errors.introducing_member_national_id ? (
            <div className="fv-plugins-message-container">
              <div className="fv-help-block text-danger">{formik.errors.introducing_member_national_id}</div>
            </div>
          ) : null}

          {
            reducerRefCode.data.first_name && (
              <div className={'m-2'}>
                <p>
                  <span>معرف :</span>
                  <span>
                    {reducerRefCode.data.first_name}
                    {' '}
                    {reducerRefCode.data.last_name}
                  </span>
                </p>

              </div>
            )

          }
        </div>
        {/* end: introducing_member_national_id */}

        {/* begin: Confirm introducing_member_national_id */}
        <div className="form-group fv-plugins-icon-container">
          <select
            className={`form-control form-control-lg form-control-solid`}
            name="is_individual"
            {...formik.getFieldProps("is_individual")}
          >
            <option value="TRUE">حقیقی</option>
            <option value="FALSE">حقوقی</option>
          </select>

          {/*          
          {formik.touched.is_individual && formik.errors.is_individual ? (
            <div className="fv-plugins-message-container">
              <div className="fv-help-block">
                {formik.errors.is_individual}
              </div>
            </div>
          ) : null} */}
        </div>
        {/* end: Confirm introducing_member_national_id */}

        {/* begin: Terms and Conditions */}
        <div className="form-group" style={{ display: 'flex' }}>
          <label className="checkbox" style={{ direction: 'ltr' }}>
            <input
              type="checkbox"
              name="acceptTerms"
              className="m-1"
              {...formik.getFieldProps("acceptTerms")}
            />
            <Link
              to="/terms"
              target="_blank"
              className="ml-2"
              rel="noopener noreferrer"
            >
              من با شرایط و ضوابط موافقم
            </Link>
            <span />

          </label>
          {formik.touched.acceptTerms && formik.errors.acceptTerms ? (
            <div className="fv-plugins-message-container">
              <div className="fv-help-block text-danger">{formik.errors.acceptTerms}</div>
            </div>
          ) : null}
        </div>
        {/* end: Terms and Conditions */}
        <div className="form-group d-flex flex-wrap flex-center">
          <button
            type="submit"
            disabled={
              formik.isSubmitting ||
              !formik.isValid ||
              !formik.values.acceptTerms
            }
            className="btn btn-primary font-weight-bold px-9 py-4 my-3 mx-4"
          >
            <span>ارسال</span>
            {loading && <span className="ml-3 spinner spinner-white"></span>}
          </button>

          <Link to="/auth/login">
            <button
              type="button"
              className="btn btn-light-primary font-weight-bold px-9 py-4 my-3 mx-4"
            >
              لفو
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default injectIntl(connect(null, auth.actions)(Registration));
