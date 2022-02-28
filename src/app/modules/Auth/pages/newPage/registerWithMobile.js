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
import { captchValidation, getCaptch, registerLevel1 } from '../../_redux/authCrud';
import { injectIntl } from 'react-intl';
import * as auth from "../../_redux/authRedux";
import { connect, useDispatch } from "react-redux";
import {
    actionTypes as actionTypesNotif
} from "./../../../../../redux/notificationAlert";
import { handleNotificationAlertCatch, handleNotificationAlertTrySelect } from '../../../../common/method/handleNotificationAlert';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Tooltip from '@material-ui/core/Tooltip';
import InfoIcon from '@material-ui/icons/Info';
import ModalCustom from '../../../../common/components/ModalCustom';
import { ModalRules } from './ModalRules';


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
    },
    tooltipNationalid: {
        maxWidth: 250,
        fontSize: 12,
        padding: 5
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


function RegisterWithMobile() {
    const classes = useStyles()
    const { push } = useHistory()
    const [srcCaptcha, setsrcCaptcha] = useState({ src: "", id: "" })
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch()
    const [openModal, setOpenModal] = React.useState(false);



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
        phone: "",
        identifier_code: "",
        captch: "",
        rules: false
    };

    const LoginSchema = Yup.object().shape({
        national_id: Yup.string()
            .min(10, 'کدملی را به درستی وارد نمایید')
            .max(11, 'کدملی را به درستی وارد نمایید')
            .required("لطفا شناسه یا کدملی خود را وارد کنید")
        , phone: Yup.string()
            .required(`لطفا شماره موبایل خود را وارد کنید`)
        ,
        captch: Yup.string()
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
                    phone: values.phone,
                    introducing_member_national_id: values.identifier_code ? values.identifier_code : null,
                    is_individual: values.isIndividual
                }
                registerLevel1(res)
                    .then((res) => {
                        let isOk = handleNotificationAlertTrySelect(res)
                        if (isOk) {
                            push({
                                pathname: "/auth/registerOTP",
                                state: {
                                    phone: values.phone,
                                    national_id: values.national_id,
                                    isIndividual: values.isIndividual === "TRUE" ? true : false,
                                    introducing_member_national_id: values.identifier_code ? values.identifier_code : null,
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
                            {
                                formik.values.isIndividual === "TRUE" ? "کد ملی" : "شناسه ملی"
                            }
                        </label>
                        <Tooltip title={<p className="p-2 m-0">{tooltipNationalid}</p>} placement="left" arrow classes={{ tooltip: classes.tooltipNationalid }}>
                            <InfoIcon style={{ color: "rgb(147 209 233)" }} />
                        </Tooltip>
                        <input
                            type="text"
                            className={`form-control p-2 ${getInputClasses("national_id")} ${classes.borderInput}`}
                            id="Input-nationalID"
                            name="national_id"
                            {...formik.getFieldProps("national_id")}
                            placeholder={`${formik.values.isIndividual === "TRUE" ? "کد ملی" : "شناسه ملی"} را وارد نمایید`}
                        />
                        {formik.touched.national_id && formik.errors.national_id ? (
                            <small id="emailHelp" className="form-text text-danger">{formik.errors.national_id}</small>
                        ) : null}
                    </div>

                    <div className="form-group mt-1 mb-3 input-group-lg">
                        <label className={classes.label} htmlFor="Input-phone">
                            {
                                formik.values.isIndividual === "TRUE" ? "شماره موبایل" : "شماره موبایل نماینده"
                            }
                        </label>
                        <input
                            type="text"
                            className={`form-control p-2 ${classes.borderInput}`}
                            id="Input-phone"
                            name="phone"
                            placeholder="09123456789"
                            {...formik.getFieldProps("phone")}
                        />
                        {formik.touched.phone && formik.errors.phone ? (
                            <small id="emailHelp" className="form-text text-danger">{formik.errors.phone}</small>
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
                            placeholder="کد معرف"
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
                            label={
                                <div>
                                    <span onClick={(e) => {
                                        e.preventDefault()
                                        setOpenModal(true)
                                    }} className={formik.touched.rules && formik.errors.rules ? "d-block mt-5" : ""}>
                                        با <span className={classes.colorMain}>قوانین و مقررات </span>موافقم.
                                </span>
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
                            disabled={loading}
                        >
                            <span>ادامه</span>
                            {loading && <span className="ml-5 spinner spinner-white"></span>}
                        </button>

                    </div>
                </form>

                <ModalCustom open={openModal} setOpen={setOpenModal} >
                    <div className={'d-flex flex-column '}>
                        <ModalRules
                            setOpen={setOpenModal}
                        />
                    </div>
                </ModalCustom>
            </div>
        </div>
    )
}




export default injectIntl(connect(null, auth.actions)(RegisterWithMobile));


let tooltipNationalid = "اگر از اتباع خارجی مقیم ایران هستید، خواهشمند است جهت ثبت‌نام و احراز هویت حضورا به یکی از شعب کارگزاری مبین سرمایه مراجعه نمایید."