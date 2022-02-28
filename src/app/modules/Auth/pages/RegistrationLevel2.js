import React, { useState } from "react";
import { useFormik } from "formik";
import { connect, useDispatch } from "react-redux";
import * as Yup from "yup";
import { Link, useHistory } from "react-router-dom";
import { injectIntl } from "react-intl";
import * as auth from "../_redux/authRedux";
import { registerLevel2 } from "../_redux/authCrud";
import { actionTypes } from "./../../../../redux/profile/clubmember_update_resistrationLevel2"

import {textErrorNationalId} from './RegistrationLevel1'


const initialValues = {
    national_id: "",
    confirmation_token: "",
};

function Registration(props) {
    const { intl } = props;
    const [loading, setLoading] = useState(false);
    const { push } = useHistory()
    const dispatch = useDispatch()

    const RegistrationSchema = Yup.object().shape({
        national_id: Yup.string()
            .min(10, textErrorNationalId)
            .max(11, textErrorNationalId)
            .required(
                intl.formatMessage({
                    id: "AUTH.VALIDATION.REQUIRED_FIELD",
                })
            ),
        confirmation_token: Yup.string()
        .min(6, 'حداقل 6 کارکتر')
        .max(6, 'حداکثر 6 کارکتر')
            .required(
                intl.formatMessage({
                    id: "AUTH.VALIDATION.REQUIRED_FIELD",
                })
            )
    });

    const enableLoading = () => {
        setLoading(true);
    };

    const disableLoading = () => {
        setLoading(false);
    };

    const getInputClasses = (fieldname) => {
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
            setSubmitting(true);
            enableLoading();
            registerLevel2(values.national_id, values.confirmation_token)
                .then((res) => {
                    // props.register(authToken);
                    disableLoading();
                    setSubmitting(false);
                    if (res.data.response.is_successful) {
                        dispatch({type : actionTypes.registration , payload : res.data.response.data.member_data })
                        push("/auth/registrationlevel3")
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

    return (
        <div className="login-form login-signin" style={{ display: "block" }}>
            <div className="text-center mb-10 mb-lg-20">
                <h3 className="font-size-h1">
                    فعال سازی
                </h3>
                <p className="text-muted font-weight-bold">
                    {/* توضیحات */}
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

                {/* begin: confirmation_token */}
                <div className="form-group fv-plugins-icon-container">
                    <input
                        placeholder="کد فعال سازی"
                        type="text"
                        className={`form-control form-control-solid h-auto py-5 px-6 ${getInputClasses(
                            "confirmation_token"
                        )}`}
                        name="confirmation_token"
                        {...formik.getFieldProps("confirmation_token")}
                    />
                    {formik.touched.confirmation_token && formik.errors.confirmation_token ? (
                        <div className="fv-plugins-message-container">
                            <div className="fv-help-block text-danger">{formik.errors.confirmation_token}</div>
                        </div>
                    ) : null}
                </div>
                {/* end: confirmation_token */}


                <div className="form-group d-flex flex-wrap flex-center">
                    <button
                        type="submit"
                        disabled={
                            formik.isSubmitting ||
                            !formik.isValid
                        }
                        className="btn btn-primary font-weight-bold px-9 py-4 my-3 mx-4"
                    >
                        <span>ارسال</span>
                        {loading && <span className="ml-3 spinner spinner-white"></span>}
                    </button>

                    <Link to="/auth/registration">
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
