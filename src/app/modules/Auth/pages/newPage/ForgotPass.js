import React, { useEffect, useState } from "react";
import IconButton from "@material-ui/core/IconButton";
import RefreshIcon from "@material-ui/icons/Refresh";
import { Link, useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/styles";
import { useFormik } from "formik";
import {
  captchValidation,
  forgotPasswordLink,
  getCaptch,
} from "../../_redux/authCrud";
import { actionTypes as actionTypesNotif } from "../../../../../redux/notificationAlert";
import { handleNotificationAlertCatch } from "../../../../common/method/handleNotificationAlert";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
const useStyles = makeStyles(theme => ({
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
    boxShadow: "0px 0px 86px 0px rgba(0,0,0,0.13)"
  },
  buttonBack: {
    width: 162,
    height: 50,
    background: "white",
    borderRadius: 5,
    color: "#ef6d22",
    fontSize: 16,
    zIndex: 10,
    position: "relative",
    fontFamily: "iransans !important",
    boxShadow: "0px 0px 86px 0px rgba(0,0,0,0.13)",
    border: "1px solid #ef6d22"
  },
  buttonDisable: {
    background: "#e1e1e1",
    color: "#7e7e7e",
    opacity: 0.43,
    position: "relative",
    right: 3,
    zIndex: 5,
    fontWeight: 400
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
      right: 35
    }
  },
  borderInput: {
    border: "1px solid #888888"
  },
  label: {
    color: "#000000",
    fontSize: "14px !important",
    "& span": {
      fontSize: "14px !important",
      fontFamily: "iransans !important"
    }
  },
  link: {
    display: "inherit",
    color: "inherit",
    width: "inherit",
    height: "inherit",
    lineHeight: "48px",
    "&:hover": {
      color: "inherit"
    }
  },
  checkbox: {
    borderRadius: "50%",
    verticalAlign: "middle",
    appearance: "none",
    outline: "none",
    cursor: "pointer"
  }
}));

const ForgotPass = props => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { push } = useHistory();
  const [srcCaptcha, setsrcCaptcha] = useState({ src: "", id: "" });
  useEffect(() => {
    getCaptchMehtod();
  }, []);
  const initialValues = {
    national_id: "",
    needs_sms: "",
    captch: "",
    remember: false
  };

  const LoginSchema = Yup.object().shape({
    national_id: Yup.string()
      .min(10, "کدملی را به درستی وارد نمایید")
      .max(11, "کدملی را به درستی وارد نمایید")
      .required("لطفا شناسه یا کدملی خود را وارد کنید"),

    captch: Yup.string().required("لطفا کد امنیتی خود را وارد کنید")
  });
  const getCaptchMehtod = () => {
    getCaptch()
      .then(res => {
        if (res.data?.response?.is_successful) {
          setsrcCaptcha({
            src: `data:image/gif;base64,${res.data.response.data.img}`,
            id: res.data.response.data._id
          });
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
      });
  };

  const formik = useFormik({
    initialValues,
    validationSchema: LoginSchema,
    onSubmit: values => {
      setLoading(true);
      captchValidation(srcCaptcha.id, values.captch)
        .then(res => {
          if (res.data?.response?.data.check) {
            apiCallLogin();
          } else {
            getCaptchMehtod();
            dispatch({
              type: actionTypesNotif.warning,
              textAlert: "کد امنیتی را اشتباه وارد کرده اید."
            });
            setLoading(false);
          }
        })
        .catch(() => {
          handleNotificationAlertCatch();
          setLoading(false);
        });

      const apiCallLogin = () => {
        setLoading(true);
        forgotPasswordLink(values.national_id, values.needs_sms)
          .then(res => {
            if (res.data.response?.data?.data?.sms_response?.sent) {
              dispatch({
                type: actionTypesNotif.success,
                textAlert: "لینک بازیابی رمز عبور ارسال شد"
              });
              push("/auth/login");
            }
            // dispatch({
            //   type: actionTypesNotif.warning,
            //   textAlert:
            //     "در ارسال لینک مشکلی پیش آمده است  لطفا دوباره تلاش  کنید"
            // });
            //
          })
          .catch(() => {
            getCaptchMehtod();
            handleNotificationAlertCatch();
          })
          .finally(() => {
            setLoading(false);
          });
      };
    }
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

  const classes = useStyles();
  return (
    <>
      <div className="p-4 pt-10">
        <p>لطفاً کد ملی/شناسه حقوقی ثبت شده در هنگام ثبت‌نام را وارد کنید:</p>
        <form
          onSubmit={formik.handleSubmit}
          className="form fv-plugins-bootstrap fv-plugins-framework pt-5"
        >
          <div className="form-group mt-5 mb-5 input-group-lg">
            <label className={classes.label} htmlFor="Input-nationalID">
              کد ملی / شناسه ملی{" "}
            </label>
            <input
              type="text"
              className={`form-control p-2 ${getInputClasses("national_id")} ${
                classes.borderInput
              }`}
              id="Input-nationalID"
              name="national_id"
              {...formik.getFieldProps("national_id")}
            />
            {formik.touched.national_id && formik.errors.national_id ? (
              <small id="emailHelp" className="form-text text-danger">
                {formik.errors.national_id}
              </small>
            ) : null}
          </div>

          <div className={`position-relative form-group input-group-lg mb-10`}>
            <label className={classes.label} htmlFor="Input-captch">
              کد امنیتی
            </label>
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
              onClick={() => getCaptchMehtod()}
              onMouseDown={event => event.preventDefault()}
              className={classes.passwordIcon}
            >
              {<RefreshIcon />}
            </IconButton>
            <div className={classes.captchImg}>
              {srcCaptcha.src && (
                <img width="100%" height="100%" src={srcCaptcha.src} alt="" />
              )}
            </div>
            {formik.touched.captch && formik.errors.captch ? (
              <small id="emailHelp" className="form-text text-danger">
                {formik.errors.captch}
              </small>
            ) : null}
          </div>

          <div className="mb-3">
            <button
              type="submit"
              className={`${classes.button} w-100 ${
                loading ? classes.buttonDisable : ""
              }`}
              disabled={loading}
            >
              <span>ارسال لینک فراموشی عبور</span>
              {loading && <span className="ml-5 spinner spinner-white"></span>}
            </button>
          </div>
        </form>
        <Link to={"/auth/login"}>
          <div>
            <button
              className={`${classes.buttonBack} w-100 `}
              disabled={loading}
            >
              <span>بازگشت</span>
              {loading && <span className="ml-5 spinner spinner-white"></span>}
            </button>
          </div>
        </Link>
      </div>
    </>
  );
};

export default ForgotPass;
