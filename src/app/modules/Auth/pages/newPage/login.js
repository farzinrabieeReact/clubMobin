import React, { useEffect, useState } from "react";
import { makeStyles, withStyles } from "@material-ui/styles";
import { useFormik } from "formik";
import * as Yup from "yup";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import RefreshIcon from "@material-ui/icons/Refresh";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { Link, useHistory, useLocation } from "react-router-dom";
import { grey } from "@material-ui/core/colors";
import { login, getCaptch, captchValidation } from "../../_redux/authCrud";
import * as auth from "../../_redux/authRedux";
import { injectIntl } from "react-intl";
import { connect, useDispatch } from "react-redux";
import { actionTypes as actionTypesNotif } from "./../../../../../redux/notificationAlert";
import { handleNotificationAlertCatch } from "../../../../common/method/handleNotificationAlert";

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

const OrangeCheckbox = withStyles({
  root: {
    color: grey[600],
    "&$checked": {
      color: "#ef6d22"
    }
  },
  checked: {}
})(props => <Checkbox color="default" {...props} />);

function Login(props) {
  const classes = useStyles();
  const [showPassword, setshowPassword] = useState(false);
  const location = useLocation();
  const history = useHistory();
  const [srcCaptcha, setsrcCaptcha] = useState({ src: "", id: "" });
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

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

  useEffect(() => {
    getCaptchMehtod();
  }, []);

  const initialValues = {
    national_id: location.state?.national_id ? location.state.national_id : "",
    password: location.state?.pass_salt ? location.state.pass_salt : "",
    captch: "",
    remember: false
  };

  const LoginSchema = Yup.object().shape({
    national_id: Yup.string()
      .min(10, "کدملی را به درستی وارد نمایید")
      .max(11, "کدملی را به درستی وارد نمایید")
      .required("لطفا شناسه یا کدملی خود را وارد کنید"),
    password: Yup.string().required("لطفا رمز عبور خود را وارد کنید"),
    captch: Yup.string().required("لطفا کد امنیتی خود را وارد کنید")
  });

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
        login(values.national_id, values.password)
          .then(res => {
            if (!Object.keys(res.data.response.data).length) {
              dispatch({
                type: actionTypesNotif.warning,
                textAlert: "نام کاربری یا رمز عبور نادرست است."
              });
              getCaptchMehtod();
            } else {
              props.login(res.data.response.data);
              handleRoute();
            }
          })
          .catch(() => {
            handleNotificationAlertCatch();
          })
          .finally(() => {
            setLoading(false);
          });
      };
    }
  });

  const handleRoute = () => {
    setTimeout(() => {
      if (location?.state?.from) {
        history.push(location?.state?.from);
        return;
      }

      history.push("/home");
    }, 1000);
  };

  const getInputClasses = fieldname => {
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
        <button className={classes.button}>ورود</button>
        <button className={`${classes.button} ${classes.buttonDisable}`}>
          <Link className={classes.link} to="/auth/register">
            عضویت
          </Link>
        </button>
      </div>
      <div className={classes.form}>
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
              placeholder="کد ملی / شناسه ملی"
              {...formik.getFieldProps("national_id")}
            />
            {formik.touched.national_id && formik.errors.national_id ? (
              <small id="emailHelp" className="form-text text-danger">
                {formik.errors.national_id}
              </small>
            ) : null}
          </div>

          <div className={`position-relative form-group input-group-lg mb-5`}>
            <label className={classes.label} htmlFor="Input-password">
              رمز عبور
            </label>
            <input
              type={showPassword ? "text" : "password"}
              className={`form-control p-2 ${classes.borderInput}`}
              id="Input-password"
              name="password"
              placeholder="رمز عبور"
              {...formik.getFieldProps("password")}
            />
            <IconButton
              aria-label="toggle password visibility"
              onClick={() => setshowPassword(prev => !prev)}
              onMouseDown={event => event.preventDefault()}
              className={classes.passwordIcon}
            >
              {showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
            {formik.touched.password && formik.errors.password ? (
              <small id="emailHelp" className="form-text text-danger">
                {formik.errors.password}
              </small>
            ) : null}
          </div>

          <div className={`position-relative form-group input-group-lg mb-5`}>
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

          <div className="d-flex justify-content-between align-items-center input-group-lg">
            <FormControlLabel
              control={
                <OrangeCheckbox
                  checked={formik.values.remember}
                  onChange={e =>
                    formik.setFieldValue("remember", e.target.checked)
                  }
                />
                // <Checkbox
                //     className={classes.checkbox}
                //     classes={{
                //         root: classes.checkbox,
                //         checked: classes.checkbox,
                //         indeterminate: classes.checkbox,
                //       }}
                //     name="remember" checked={formik.values.remember} onChange={(e) => formik.setFieldValue("remember", e.target.checked)} />
              }
              label={"مرا به خاطر بسپار"}
              className={`d-flex align-items-center ${classes.label} mt-1`}
              style={{ fontSize: 14 }}
            />
            <div>
              <Link className={`${classes.label}  `} to={"/auth/forgotPass"}>
                فراموشی رمز عبور
              </Link>
            </div>
          </div>
          <div>
            <button
              type="submit"
              className={`${classes.button} w-100 ${
                loading ? classes.buttonDisable : ""
              }`}
              disabled={loading}
            >
              <span>ورود به حساب کاربری</span>
              {loading && <span className="ml-5 spinner spinner-white"></span>}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default injectIntl(connect(null, auth.actions)(Login));
