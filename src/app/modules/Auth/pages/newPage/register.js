import React, { useEffect, useState } from 'react'
import { makeStyles, withStyles } from "@material-ui/styles";
import { useFormik } from "formik";
import * as Yup from "yup";
import IconButton from '@material-ui/core/IconButton';
import RefreshIcon from '@material-ui/icons/Refresh';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { Link, useHistory } from "react-router-dom"
import { grey } from '@material-ui/core/colors';
import { captchValidation, getCaptch, register } from '../../_redux/authCrud';
import { injectIntl } from 'react-intl';
import * as auth from "../../_redux/authRedux";
import { connect, useDispatch } from "react-redux";
import {
    actionTypes as actionTypesNotif
} from "./../../../../../redux/notificationAlert";
import { handleNotificationAlertCatch, handleNotificationAlertTrySelect } from '../../../../common/method/handleNotificationAlert';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';


const useStyles = makeStyles((theme) => ({
    root: {
        margin: "37px 23px"
    },
    buttons: {
        display: "flex"
    },
    button: {
        width: 162,
        height: 50,
        background: "#ef6d22",
        borderRadius: 5,
        color: "white",
        fontSize: 16,
        border: "none",
        zIndex: 10,
        position: "relative",
        fontFamily: "iransans !important",
        boxShadow: "0px 0px 86px 0px rgba(0,0,0,0.13)",
    },
    buttonDisable: {
        background: "#e1e1e1",
        color: "#000000",
        opacity: 0.43,
        position: "relative",
        right: -3,
        zIndex: 5,
        fontWeight: 400,
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
        color: "#000000 !important",
        fontSize: "14px !important",
        fontFamily: "iransans",
        "& span": {
            fontSize: "14px !important",
        }
    },
    colorRadio: {
        color: "#ef6d22",
    },
    colorMain: {
        color: theme.palette.cutomColor.main,
        marginBottom: 0
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

const OrangeRadio = withStyles({
    root: {
        color: grey[600],
        '&$checked': {
            color: "#ef6d22",
        },
    },
    checked: {},
})((props) => <Radio color="default" {...props} />);

const OrangeCheckbox = withStyles({
    root: {
        color: grey[600],
        "&$checked": {
            color: "#ef6d22",
        },
    },
    checked: {},
})((props) => <Checkbox color="default" {...props} />);


function Register() {
    const classes = useStyles()
    const { push } = useHistory()
    const [srcCaptcha, setsrcCaptcha] = useState({ src: "", id: "" })
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch()


    const getCaptchMehtod = () => {
        getCaptch()
            .then(res => {
                if (res.data?.response?.is_successful) {
                    setsrcCaptcha({
                        src: `data:image/gif;base64,${res.data.response.data.img}`,
                        id: res.data.response.data._id
                    })
                } else {
                    dispatch({
                        type: actionTypesNotif.error,
                        textAlert: "در دریافت کد امنیتی مشکلی به وجود آمده است"
                    });
                }
            })
            .catch(() => {
                dispatch({
                    type: actionTypesNotif.error,
                    textAlert: "در دریافت کد امنیتی مشکلی به وجود آمده است"
                });
            })

    }

    useEffect(() => {
        getCaptchMehtod()
    }, [])

    const initialValues = {
        isIndividual: "TRUE",
        national_id: "",
        // phone: "",
        identifier_code: "",
        captch: "",
        rules: false
    };

    const LoginSchema = Yup.object().shape({
        national_id: Yup.string()
            .min(10, 'کدملی را به درستی وارد نمایید')
            .max(11, 'کدملی را به درستی وارد نمایید')
            .required("لطفا شناسه یا کدملی خود را وارد کنید")
        ,captch: Yup.string()
            .required("لطفا کد امنیتی خود را وارد کنید"),
        rules: Yup.boolean()
            .oneOf([true], 'باید شرایط و ضوابط را بپذیرد'),
    });


    const formik = useFormik({
        initialValues,
        validationSchema: LoginSchema,
        onSubmit: (values) => {
            setLoading(true)
            captchValidation(srcCaptcha.id, values.captch)
                .then(res => {
                    if (res.data?.response?.data.check) {
                        apiCallRegister()
                    } else {
                        getCaptchMehtod()
                        dispatch({
                            type: actionTypesNotif.warning,
                            textAlert: "کد امنیتی را اشتباه وارد کرده اید."
                        });
                        setLoading(false)
                    }
                })
                .catch(() => {
                    handleNotificationAlertCatch()
                    setLoading(false)
                })

            const apiCallRegister = () => {
                setLoading(true)
                let res = {
                    national_id: values.national_id,
                    introducing_member_national_id: values.identifier_code ? values.identifier_code : null,
                    is_individual: values.isIndividual
                }
                register(res)
                    .then((res) => {
                        let isOk = handleNotificationAlertTrySelect(res)
                        if (isOk) {
                            push({
                                pathname: "/auth/RegisterPass",
                                state: {
                                    national_id: values.national_id,
                                    isPhone: res.data.response.data.phone === "null" || !res.data.response.data.phone ? false : res.data.response.data.phone,
                                    isFirstName: res.data.response.data.first_name === "null" || !res.data.response.data.first_name ? false : res.data.response.data.first_name,
                                    isLastName: res.data.response.data.last_name === "null" || !res.data.response.data.last_name ? false : res.data.response.data.last_name,
                                    isIndividual: values.isIndividual === "TRUE" ? true : false
                                }
                            })
                        } else {
                            getCaptchMehtod()
                        }

                    })
                    .catch(() => {
                        handleNotificationAlertCatch()
                    })
                    .finally(() => {
                        setLoading(false)
                    });
            }
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



    return (
        <div className={classes.root}>
            <div className={classes.buttons}>
                <button className={`${classes.button} ${classes.buttonDisable}`}>
                    <Link className={classes.link} to="/auth/login">ورود</Link>
                </button>
                <button className={`${classes.button}`}>عضویت</button>
            </div>
            <div className={classes.form}>
                <form
                    onSubmit={formik.handleSubmit}
                    className="form fv-plugins-bootstrap fv-plugins-framework pt-3"
                >
                    <div className="form-group mt-1 mb-3 input-group-lg">

                        <RadioGroup
                            aria-label="isIndividual"
                            value={formik.values.isIndividual}
                            onChange={(e) => formik.setFieldValue("isIndividual", e.target.value)}
                            row
                        >
                            <FormControlLabel value={"TRUE"} control={<OrangeRadio />} label="حقیقی" />
                            <FormControlLabel value={"FALSE"} control={<OrangeRadio />} label="حقوقی" />
                        </RadioGroup>
                    </div>



                    <div className="form-group mt-1 mb-3 input-group-lg">
                        <label className={classes.label} htmlFor="Input-nationalID">
                            کد ملی / شناسه ملی
                            </label>
                        <input
                            type="text"
                            className={`form-control p-2 ${getInputClasses("national_id")} ${classes.borderInput}`}
                            id="Input-nationalID"
                            name="national_id"
                            {...formik.getFieldProps("national_id")}
                        />
                        {formik.touched.national_id && formik.errors.national_id ? (
                            <small id="emailHelp" className="form-text text-danger">{formik.errors.national_id}</small>
                        ) : null}
                    </div>

                    <div className={`form-group input-group-lg mb-3`} >
                        <label className={classes.label} htmlFor="Input-identifier_code">کد معرف</label>
                        <input
                            type="text"
                            className={`form-control p-2 ${classes.borderInput}`}
                            id="Input-identifier_code"
                            name="identifier_code"
                            {...formik.getFieldProps("identifier_code")}
                        />
                        {formik.touched.identifier_code && formik.errors.identifier_code ? (
                            <small id="emailHelp" className="form-text text-danger">{formik.errors.identifier_code}</small>
                        ) : null}
                    </div>

                    <div className={`position-relative form-group input-group-lg mb-3`} >
                        <label className={classes.label} htmlFor="Input-captch">کد امنیتی</label>
                        <input
                            placeholder="عدد روبرو را وارد کنید"
                            type="text"
                            className={`form-control p-2 ${classes.borderInput}`}
                            id="Input-captch"
                            name="captch"
                            {...formik.getFieldProps("captch")}
                        />
                        <IconButton
                            aria-label="toggle password visibility"
                            onMouseDown={(event) => event.preventDefault()}
                            className={classes.passwordIcon}
                            onClick={() => getCaptchMehtod()}
                        >
                            {<RefreshIcon />}
                        </IconButton>
                        <div className={classes.captchImg}>
                            {
                                srcCaptcha.src && (
                                    <img width="100%" height="100%" src={srcCaptcha.src} alt="" />
                                )
                            }
                        </div>
                        {formik.touched.captch && formik.errors.captch ? (
                            <small id="emailHelp" className="form-text text-danger">{formik.errors.captch}</small>
                        ) : null}
                    </div>

                    <div className="input-group-lg">
                        <FormControlLabel
                            control={
                                <OrangeCheckbox checked={formik.values.rules} onChange={(e) => formik.setFieldValue("rules", e.target.checked)} />
                            }
                            label={<div>
                                <span className={formik.touched.rules && formik.errors.rules ? "d-block mt-5" : ""}>با <span className={classes.colorMain}>قوانین و مقررات </span>موافقم.</span>
                                {formik.touched.rules && formik.errors.rules ? (
                                    <small id="emailHelp" className="form-text text-danger">{formik.errors.rules}</small>
                                ) : null}
                            </div>}
                            className={`d-flex align-items-center ${classes.label}`}
                            style={{ fontSize: 14 }}
                        />
                    </div>
                    <div>
                        <button
                            className={`${classes.button} w-100`}
                        >
                            <span>ادامه</span>
                            {loading && <span className="ml-5 spinner spinner-white"></span>}
                        </button>

                    </div>
                </form>
            </div>
        </div>
    )
}




export default injectIntl(connect(null, auth.actions)(Register));



let img = "data:image/gif;base64,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"



var str2bool = (value) => {
    if (value && typeof value === "string") {
        if (value.toLowerCase() === "true") return true;
        if (value.toLowerCase() === "false") return false;
    }
    return value;
}