import React, { useState } from "react";
import { useFormik } from "formik";
import { connect, useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { Link, useHistory } from "react-router-dom";
import { injectIntl } from "react-intl";
import * as auth from "../../_redux/authRedux";
import { registerLevel3 } from "../../_redux/authCrud";
import { actionTypes as actionTypesNotif } from './../../../../../redux/notificationAlert'
import DatePicker from './../../../../common/components/DatePicker';
import { convertDigitToEnglish } from './../../../../common/method/convertDigitToEnglish';
import { regx_password, regx_phone } from "../../../../common/method/regex";
import { dateConverttShamsiToMiladi } from "../../../../common/method/date";
import { textErrorNationalId } from "../RegistrationLevel1";
import { actionTypes } from "../../../../../redux/profile/clubmember_select_userName";

const isNull = (item) => {
    if (item !== "null") return item
    return ""
}


function Registrationlevel3(props) {

    const { intl } = props;
    const [loading, setLoading] = useState(false);
    const { push } = useHistory()
    const { data } = props;
    const dispatch = useDispatch()

    const reducerUserName = useSelector(state => state.clubmember_select_userName_reducer)

    const initialValues = {
        first_name: isNull(data.first_name),
        last_name: isNull(data.last_name),
        national_id: isNull(data.national_id),
        user: isNull(data.user),
        phone: isNull(data.phone),
        email: isNull(data.email),
        gender: isNull(data.gender),
        pass_salt: "",
        pass_hash: "",
        birth_date: null
    };

    const RegistrationSchema = Yup.object().shape({
        first_name: Yup.string()
            .required(
                intl.formatMessage({
                    id: "AUTH.VALIDATION.REQUIRED_FIELD",
                })
            ),
        last_name: Yup.string()
            .required(
                intl.formatMessage({
                    id: "AUTH.VALIDATION.REQUIRED_FIELD",
                })
            ),
        national_id: Yup.string()
            .min(10, textErrorNationalId)
            .max(11, textErrorNationalId)
            .required(
                intl.formatMessage({
                    id: "AUTH.VALIDATION.REQUIRED_FIELD",
                })
            ),
        user: Yup.string()
            .required(
                intl.formatMessage({
                    id: "AUTH.VALIDATION.REQUIRED_FIELD",
                })
            ),
        phone: Yup.string().matches(regx_phone, 'شماره تلفن را به درستی وارد نمایید')
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
        gender: Yup.string()
            .required(
                intl.formatMessage({
                    id: "AUTH.VALIDATION.REQUIRED_FIELD",
                })
            ),
        pass_salt: Yup.string()
            .required(
                intl.formatMessage({
                    id: "AUTH.VALIDATION.REQUIRED_FIELD",
                })
            )
            .min(8, "حداقل 8 کاراکتر")
            .matches(
                regx_password,
                "رمز عبور باید شامل حروف، اعداد، کاراکترهای غیر الفبایی باشد"
            ),

        pass_hash: Yup.string()
            .required(
                intl.formatMessage({
                    id: "AUTH.VALIDATION.REQUIRED_FIELD",
                })
            )
            .when("pass_salt", {
                is: (val) => (val && val.length > 0 ? true : false),
                then: Yup.string().oneOf(
                    [Yup.ref("pass_salt")],
                    "گذرواژه و تأیید گذرواژه مطابقت نداشت"
                ),
            }),
        birth_date: Yup.string()
            .required(
                intl.formatMessage({
                    id: "AUTH.VALIDATION.REQUIRED_FIELD",
                })
            ),

    })

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

            if (reducerUserName.isOk) {
                dispatch({
                    type: actionTypesNotif.warning,
                    textAlert: "نام کاربری تکراری می باشد"
                  });
                disableLoading();
                setSubmitting(false);
                return
            }

            setSubmitting(true);
            enableLoading();
            let data = {
                ...values,
                birth_date: `${dateConverttShamsiToMiladi(convertDigitToEnglish(values['birth_date'].format("jYYYY/jMM/jDD")))} 00:00:00.000000`
            }

            registerLevel3(data)
                .then((res) => {
                    // props.register(authToken);
                    disableLoading();
                    setSubmitting(false);
                    if (res.data.response.is_successful) {
                        dispatch({ type: actionTypesNotif.success })

                        push({
                            pathname: "/auth/login",
                            state: { national_id: values.national_id, password: values.pass_salt }
                        })
                    } else if (res.data.response.error_description === "Club member is already registered.") {
                        setStatus("شما قبلا ثبت نام کرده اید از فراموشی رمز استفاده کنید.")

                    }
                    else {
                        setStatus("متاسفانه  ثبت نام انجام نشد.")
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


    const findUserName = (user) => {

        let { setFieldTouched } = formik
        setFieldTouched('user', true);


        if (user.length) {
            let _data = {
                data: {
                    user: user
                }
            }

            dispatch({ type: actionTypes.userNameSelectAsync, payload: _data })

        } else {

            dispatch({ type: actionTypes.userNameSelectClear })
        }

    }


    return (
        <div className="login-form login-signin" style={{ display: "block" }}>
            <div className="text-center mb-10 mb-lg-20">
                <h3 className="font-size-h1">
                    تکمیل پروفایل
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

                {/* begin: first_name */}
                <div className="form-group fv-plugins-icon-container">
                    <input
                        placeholder="نام"
                        type="text"
                        className={`form-control form-control-solid h-auto py-5 px-6 ${getInputClasses(
                            "first_name"
                        )}`}
                        name="first_name"
                        {...formik.getFieldProps("first_name")}
                        disabled={data.first_name !== "null" ? true : false}
                    />
                    {formik.touched.first_name && formik.errors.first_name ? (
                        <div className="fv-plugins-message-container">
                            <div className="fv-help-block text-danger">{formik.errors.first_name}</div>
                        </div>
                    ) : null}
                </div>
                {/* end: national_id */}

                {/* begin: last_name */}
                <div className="form-group fv-plugins-icon-container">
                    <input
                        placeholder="نام خانوادگی"
                        type="text"
                        className={`form-control form-control-solid h-auto py-5 px-6 ${getInputClasses(
                            "last_name"
                        )}`}
                        name="last_name"
                        {...formik.getFieldProps("last_name")}
                        disabled={data.last_name !== "null" ? true : false}
                    />
                    {formik.touched.last_name && formik.errors.last_name ? (
                        <div className="fv-plugins-message-container">
                            <div className="fv-help-block text-danger">{formik.errors.last_name}</div>
                        </div>
                    ) : null}
                </div>
                {/* end: national_id */}

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
                        disabled={data.national_id !== "null" ? true : false}
                    />
                    {formik.touched.national_id && formik.errors.national_id ? (
                        <div className="fv-plugins-message-container">
                            <div className="fv-help-block text-danger">{formik.errors.national_id}</div>
                        </div>
                    ) : null}
                </div>
                {/* end: national_id */}


                {/* begin: user */}
                <div className="form-group fv-plugins-icon-container">
                    <DatePicker
                        label={"تاریخ تولد"}
                        value={formik.values.birth_date}
                        setValue={(data) => formik.setFieldValue('birth_date', data)}>
                    </DatePicker>

                    {formik.touched.birth_date && formik.errors.birth_date ? (
                        <div className="fv-plugins-message-container">
                            <div className="fv-help-block text-danger">{formik.errors.birth_date}</div>
                        </div>
                    ) : null}
                </div>
                {/* end: user */}


                {/* begin: user */}
                <div className="form-group fv-plugins-icon-container">
                    <input
                        placeholder="نام کاربری"
                        type="text"
                        className={`form-control form-control-solid h-auto py-5 px-6 ${getInputClasses(
                            "user"
                        )}`}
                        name="user"
                        {...formik.getFieldProps("user")}
                        // disabled={data.user !== "null" ? true : false}
                        onBlur={() => findUserName(formik.values.user)}

                    />
                    {formik.touched.user && formik.errors.user ? (
                        <div className="fv-plugins-message-container">
                            <div className="fv-help-block text-danger">{formik.errors.user}</div>
                        </div>
                    ) : null}

                    {
                        reducerUserName.isOk && (
                            <div className="fv-plugins-message-container">
                                <div className="fv-help-block text-danger" style={{ color: 'red', fontSize: 12 }}>نام کاربری تکراری می باشد</div>
                            </div>

                        )
                    }
                </div>

                {/* end: user */}

                {/* begin: phone */}
                <div className="form-group fv-plugins-icon-container">
                    <input
                        placeholder="شماره همراه"
                        type="text"
                        className={`form-control form-control-solid h-auto py-5 px-6 ${getInputClasses(
                            "phone"
                        )}`}
                        name="phone"
                        {...formik.getFieldProps("phone")}
                        disabled={data.phone !== "null" ? true : false}
                    />
                    {formik.touched.phone && formik.errors.phone ? (
                        <div className="fv-plugins-message-container">
                            <div className="fv-help-block text-danger">{formik.errors.phone}</div>
                        </div>
                    ) : null}
                </div>
                {/* end: phone */}

                {/* begin: email */}
                <div className="form-group fv-plugins-icon-container">
                    <input
                        placeholder="ایمیل"
                        type="text"
                        className={`form-control form-control-solid h-auto py-5 px-6 ${getInputClasses(
                            "email"
                        )}`}
                        name="email"
                        {...formik.getFieldProps("email")}
                        disabled={data.email !== "null" ? true : false}
                    />
                    {formik.touched.email && formik.errors.email ? (
                        <div className="fv-plugins-message-container">
                            <div className="fv-help-block text-danger">{formik.errors.email}</div>
                        </div>
                    ) : null}
                </div>
                {/* end: email */}

                {/* begin: gender */}
                <div className="form-group fv-plugins-icon-container">
                    <select
                        className={`form-control form-control-lg form-control-solid`}
                        name="gender"
                        {...formik.getFieldProps("gender")}
                        disabled={data.gender !== "null" ? true : false}
                    >
                        <option value="">جنسیت</option>
                        <option value="1">مرد</option>
                        <option value="2">زن</option>
                    </select>
                </div>
                {/* end: gender */}

                {/* begin: pass_salt */}
                <div className="form-group fv-plugins-icon-container">

                    <input
                        type="password"
                        placeholder="رمز عبور"
                        className={`form-control form-control-lg form-control-solid ${getInputClasses(
                            "pass_salt"
                        )}`}
                        name="pass_salt"
                        {...formik.getFieldProps("pass_salt")}
                    />
                    {formik.touched.pass_salt && formik.errors.pass_salt ? (
                        <div className="invalid-feedback text-danger">{formik.errors.pass_salt}</div>
                    ) : null}
                </div>
                {/* end: pass_salt */}


                {/* begin: pass_hash */}
                <div className="form-group fv-plugins-icon-container">
                    <input
                        type="password"
                        placeholder="تائید رمز عبور"
                        className={`form-control form-control-lg form-control-solid ${getInputClasses(
                            "pass_hash"
                        )}`}
                        name="pass_hash"
                        {...formik.getFieldProps("pass_hash")}
                    />
                    {formik.touched.pass_hash && formik.errors.pass_hash ? (
                        <div className="invalid-feedback text-danger">
                            {formik.errors.pass_hash}
                        </div>
                    ) : null}
                </div>

                {/* end: pass_hash */}

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

                    <Link to="/auth/registrationlevel2">
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

export default injectIntl(connect(null, auth.actions)(Registrationlevel3));
