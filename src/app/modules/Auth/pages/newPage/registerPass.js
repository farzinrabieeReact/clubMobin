import React, { useState } from 'react'
import { makeStyles } from "@material-ui/styles";
import { useFormik } from "formik";
import * as Yup from "yup";
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { useHistory, useLocation } from 'react-router-dom';
import { registerPass } from '../../_redux/authCrud';
import { handleNotificationAlertCatch, handleNotificationAlertTrySelect } from '../../../../common/method/handleNotificationAlert';

const useStyles = makeStyles((theme) => ({
    root: {
        margin: "3px 23px"
    },
    button: {
        width: 162,
        height: 50,
        background: "#ef6d22",
        borderRadius: 5,
        color: "white",
        fontSize: 16,
        border: "none",
        fontFamily: "iransans !important",
        zIndex: 10,
        position: "relative",
        boxShadow: "0px 0px 86px 0px rgba(0,0,0,0.13)",
        marginTop: 20
    },
    passwordIcon: {
        position: "absolute",
        top: 27,
        right: 0
    },
    captchImg: {
        height: 41.5,
        position: "absolute",
        top: 29,
        right: 46,
        [theme.breakpoints.down("1200")]: {
            height: 35,
            top: 30,
            right: 35,
        }
    },
    borderInput: {
        border: "1px solid #888888",
    },
    label: {
        color: "#000000",
        fontSize: "14px !important",
        "& span": {
            fontSize: "14px !important",
        }
    },
    link: {
        display: "inherit",
        color: "inherit",
        width: "inherit",
        height: "inherit",
        lineHeight: "48px",
        '&:hover': {
            color: "inherit",
        }
    }
}))

export default function RegisterPass() {
    const classes = useStyles()
    const [showPassword, setshowPassword] = useState(false)
    const [showcPassword, setshowcPassword] = useState(false)
    const { push } = useHistory()
    const { state } = useLocation()
    const [loading, setLoading] = useState(false);

    const initialValues = {
        company_name: "",
        firstname: state?.isFirstName ? state.isFirstName : "",
        lastname: state?.isLastName ? state.isLastName : "",
        phone: state?.isPhone ? state.isPhone : "",
        password: "",
        cPassword: ""
    };

    const LoginSchema = Yup.object().shape({
        firstname: Yup.string()
            .required("لطفا نام خود را وارد کنید")
        ,
        lastname: Yup.string()
            .required("لطفا نام خانوادگی خود را وارد کنید")
        ,
        phone: Yup.string()
            .required("لطفا شماره موبایل  خود را وارد کنید"),
        password: Yup.string()
            .required("لطفا رمز عبور خود را وارد کنید"),
        cPassword: Yup.string()
            .required("لطفا تکرار رمز عبور خود را وارد کنید")
            .when("password", {
                is: (val) => (val && val.length > 0 ? true : false),
                then: Yup.string().oneOf(
                    [Yup.ref("password")],
                    "رمز عبور و تکرار رمز عبور مطابقت نداشت"
                ),
            }),
    });

    const formik = useFormik({
        initialValues,
        validationSchema: LoginSchema,
        onSubmit: (values) => {
            let res = {
                national_id: state.national_id,
                phone: values.phone,
                first_name: values.firstname,
                last_name: values.lastname,
                pass_salt: values.password,
                pass_hash: values.cPassword,
                company_name: !state.isIndividual ? values.company_name : null
            }
            setLoading(true)
            registerPass(res)
                .then(res => {
                    let isOk = handleNotificationAlertTrySelect(res)
                    if (isOk) {
                        push({
                            pathname: "/auth/registerOTP",
                            state: {
                                national_id: state.national_id,
                                isPhone: values.phone,
                                isFirstName: values.firstname,
                                isLastName: values.lastname,
                                pass_salt: values.password,
                                pass_hash: values.cPassword,
                                isIndividual: state.isIndividual
                            }
                        })
                    }
                })
                .catch(() => {
                    handleNotificationAlertCatch()
                })
                .finally(() => {
                    setLoading(false)
                });
        }
    })

    const getInputClasses = (fieldname) => {
        if (formik.touched[fieldname] && formik.errors[fieldname]) {
            return "is-invalid";
        }

        if (formik.touched[fieldname] && !formik.errors[fieldname]) {
            return "is-valid";
        }

        return "";
    };

    if (!state?.national_id) {
        push("/auth/register")
        return null
    }


    return (
        <div className={classes.root}>

            <div className={classes.form}>
                <form
                    onSubmit={formik.handleSubmit}
                    className="form fv-plugins-bootstrap fv-plugins-framework pt-5"
                >
                    {
                        !state.isIndividual && (
                            <div className="form-group mt-0 mb-1 input-group-lg">
                                <label className={`${classes.label} ${state.isLastName && "text-muted"}`} htmlFor="Input-firstname">
                                    نام شرکت
                                     </label>
                                <input
                                    type="text"
                                    className={`form-control p-2 ${classes.borderInput}`}
                                    id="Input-company_name"
                                    name="company_name"
                                    {...formik.getFieldProps("company_name")}
                                />
                                {formik.touched.company_name && formik.errors.company_name ? (
                                    <small id="emailHelp" className="form-text text-danger">{formik.errors.company_name}</small>
                                ) : null}
                            </div>
                        )
                    }

                    <div className="form-group mt-0 mb-1 input-group-lg">
                        <label className={`${classes.label} ${state.isLastName && "text-muted"}`} htmlFor="Input-firstname">
                            نام
                        </label>
                        <input
                            type="text"
                            className={`form-control p-2 ${getInputClasses("firstname")} ${classes.borderInput}`}
                            id="Input-firstname"
                            name="firstname"
                            {...formik.getFieldProps("firstname")}
                            disabled={state.isFirstName ? true : false}
                        />
                        {formik.touched.firstname && formik.errors.firstname ? (
                            <small id="emailHelp" className="form-text text-danger">{formik.errors.firstname}</small>
                        ) : null}
                    </div>

                    <div className="form-group mt-0 mb-1 input-group-lg">
                        <label className={`${classes.label} ${state.isFirstName && "text-muted"}`} htmlFor="Input-lastname">
                            نام خانوادگی
                        </label>
                        <input
                            type="text"
                            className={`form-control p-2 ${getInputClasses("lastname")} ${classes.borderInput}`}
                            id="Input-lastname"
                            name="lastname"
                            {...formik.getFieldProps("lastname")}
                            disabled={state.isLastName ? true : false}
                        />
                        {formik.touched.lastname && formik.errors.lastname ? (
                            <small id="emailHelp" className="form-text text-danger">{formik.errors.lastname}</small>
                        ) : null}
                    </div>

                    <div className={`form-group input-group-lg mt-0 mb-1`} >
                        <label className={`${classes.label} ${state.isPhone && "text-muted"}`} htmlFor="Input-phone">
                            شماره موبایل
                        </label>
                        <input
                            type="text"
                            className={`form-control p-2 ${classes.borderInput} ${getInputClasses("phone")}`}
                            id="Input-phone"
                            name="phone"
                            placeholder="مثلا 09121234567"
                            {...formik.getFieldProps("phone")}
                            disabled={state.isPhone ? true : false}
                        />
                        {formik.touched.phone && formik.errors.phone ? (
                            <small id="emailHelp" className="form-text text-danger">{formik.errors.phone}</small>
                        ) : null}
                    </div>

                    <div className={`position-relative form-group input-group-lg mt-0 mb-1`} >
                        <label className={classes.label} htmlFor="Input-password">رمز عبور</label>
                        <input
                            type={showPassword ? "text" : "password"}
                            className={`form-control p-2 ${classes.borderInput}`}
                            id="Input-password"
                            name="password"
                            {...formik.getFieldProps("password")}
                        />
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={() => setshowPassword(prev => !prev)}
                            onMouseDown={(event) => event.preventDefault()}
                            className={classes.passwordIcon}
                        >
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                        {formik.touched.password && formik.errors.password ? (
                            <small id="emailHelp" className="form-text text-danger">{formik.errors.password}</small>
                        ) : null}
                    </div>

                    <div className={`position-relative form-group input-group-lg mt-0 mb-1`} >
                        <label className={classes.label} htmlFor="Input-cPassword">تکرار رمز عبور</label>
                        <input
                            type={showcPassword ? "text" : "password"}
                            className={`form-control p-2 ${classes.borderInput}`}
                            id="Input-cPassword"
                            name="cPassword"
                            {...formik.getFieldProps("cPassword")}
                        />
                        <IconButton
                            aria-label="toggle cPassword visibility"
                            onClick={() => setshowcPassword(prev => !prev)}
                            onMouseDown={(event) => event.preventDefault()}
                            className={classes.passwordIcon}
                        >
                            {showcPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                        {formik.touched.cPassword && formik.errors.cPassword ? (
                            <small id="emailHelp" className="form-text text-danger">{formik.errors.cPassword}</small>
                        ) : null}
                    </div>

                    <div>
                        <button className={`${classes.button} w-100`}>
                            <span>ثبت نام</span>
                            {loading && <span className="ml-5 spinner spinner-white"></span>}
                        </button>

                    </div>
                </form>
            </div>
        </div>
    )
}