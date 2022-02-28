import React, { useState } from "react";
import { useFormik } from "formik";
import { connect, useDispatch } from "react-redux";
import { Link, useHistory, useLocation } from "react-router-dom";
import * as Yup from "yup";
import { injectIntl } from "react-intl";
import * as auth from "../_redux/authRedux";
import { forgetPasswordLevel2 } from "../_redux/authCrud";
import { actionTypes as actionTypesNotif } from './../../../../redux/notificationAlert'


function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const initialValues = {
    national_id: "",
    password: "",
    cPassword: "",
};

function ForgotPassword(props) {
    const { intl } = props;
    const [loading, setLoading] = useState(false);
    let query = useQuery();
    let { push } = useHistory()
    const dispatch = useDispatch()

    const ForgotPasswordSchema = Yup.object().shape({
        national_id: Yup.string()
            .min(3, "حداقل 3 کاراکتر")
            .max(50, "حداکثر 50 کاراکتر")
            .required(
                intl.formatMessage({
                    id: "AUTH.VALIDATION.REQUIRED_FIELD",
                })
            ),
        password: Yup.string().required("گذرواژه جدید لازم است").min(8, "حداقل 8 کاراکتر"),
        cPassword: Yup.string()
            .required("تأیید رمز عبور لازم است")
            .when("password", {
                is: (val) => (val && val.length > 0 ? true : false),
                then: Yup.string().oneOf(
                    [Yup.ref("password")],
                    "گذرواژه و تأیید گذرواژه مطابقت نداشت"
                ),
            }),
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


    const formik = useFormik({
        initialValues,
        validationSchema: ForgotPasswordSchema,
        onSubmit: (values, { setStatus, setSubmitting }) => {
            let data = {
                national_id: values.national_id,
                new_pass: values.password,
                new_pass_confirm: values.cPassword,
                a_param: query.get("a"),
                b_param: query.get("b")
            }

            setLoading(true)
            forgetPasswordLevel2(data)
                .then((res) => {
                    setLoading(false)
                    if (res.data.response.is_successful) {
                        setSubmitting(false);
                        dispatch({ type: actionTypesNotif.success })
                        push("/auth/login")
                    }
                    else {
                        setSubmitting(false);
                        setStatus(
                            {
                                error: intl.formatMessage(
                                    { id: "AUTH.VALIDATION.NOT_FOUND" },
                                    { name: values.national_id }
                                )
                            });
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
                    <h3 className="font-size-h1">رمز عبورتان را تغییر دهید</h3>
                    {/* <div className="text-muted font-weight-bold">
            ایمیل تان را وارد کنید تا پسوردتان بازیابی شود
            </div> */}
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

                    <div className="form-group fv-plugins-icon-container">
                        <input
                            type="password"
                            placeholder="رمز عبور جدید"
                            className={`form-control form-control-solid h-auto py-5 px-6 ${getInputClasses(
                                "password"
                            )}`}
                            name="password"
                            {...formik.getFieldProps("password")}
                        />
                        {formik.touched.password && formik.errors.password ? (
                            <div className="invalid-feedback">{formik.errors.password}</div>
                        ) : null}
                    </div>


                    <div className="form-group fv-plugins-icon-container">
                        <input
                            type="password"
                            placeholder="تائید رمز عبور"
                            className={`form-control form-control-solid h-auto py-5 px-6 ${getInputClasses(
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



                    <div className="form-group d-flex flex-wrap flex-center">
                        <button
                            id="kt_login_forgot_submit"
                            type="submit"
                            className="btn btn-primary font-weight-bold px-9 py-4 my-3 mx-4"
                            disabled={formik.isSubmitting}
                        >
                            <span>ارسال</span>
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
