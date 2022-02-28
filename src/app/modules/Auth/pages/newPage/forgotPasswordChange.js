import React, { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { makeStyles } from "@material-ui/styles";
import { useFormik } from "formik";
import {
  handleNotificationAlertCatch,
  handleNotificationAlertTryUpdate,
} from "../../../../common/method/handleNotificationAlert";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { forgetPasswordLevel2 } from "../../_redux/authCrud";
const useStyles = makeStyles((theme) => ({
  root: {
    margin: "37px 23px",
  },
  buttons: {
    display: "flex",
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
    border: "1px solid #ef6d22",
  },
  buttonDisable: {
    background: "#e1e1e1",
    color: "#7e7e7e",
    opacity: 0.43,
    position: "relative",
    right: 3,
    zIndex: 5,
    fontWeight: 400,
  },
  passwordIcon: {
    position: "absolute",
    top: 27,
    right: 0,
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
    },
  },
  borderInput: {
    border: "1px solid #888888",
  },
  label: {
    color: "#000000",
    fontSize: "14px !important",
    "& span": {
      fontSize: "14px !important",
      fontFamily: "iransans !important",
    },
  },
  link: {
    display: "inherit",
    color: "inherit",
    width: "inherit",
    height: "inherit",
    lineHeight: "48px",
    "&:hover": {
      color: "inherit",
    },
  },
  checkbox: {
    borderRadius: "50%",
    verticalAlign: "middle",
    appearance: "none",
    outline: "none",
    cursor: "pointer",
  },
}));

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const ForgotPass = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { push } = useHistory();
  let query = useQuery();

  const initialValues = {
    national_id: "",
    newPass: "",
    newPassConfirm: "",
    national_id: "",
    remember: false,
  };

  const LoginSchema = Yup.object().shape({
    national_id: Yup.string()
      .required("لطفا شناسه یا کدملی خود را وارد کنید")
      .min(10, "کدملی را به درستی وارد نمایید")
      .max(11, "کدملی را به درستی وارد نمایید"),
    newPass: Yup.string()
      .required("لطفا رمز عبور جدید خود را وارد کنید")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
        "رمز عبور باید ۸کاراکتر و شامل عدد و حروف کوچک و بزرگ انگلیسی باشد"
      )
      .min(8, "رمز عبور حداقل باید ۸ کاراکتر باشد"),
    newPassConfirm: Yup.string()
      .required("تأیید رمز عبور لازم است")
      .oneOf(
        [Yup.ref("newPass"), null],
        "تکرار رمز عبور با رمز عبور یکی نیست!"
      ),
  });

  const formik = useFormik({
    initialValues,
    validationSchema: LoginSchema,
    onSubmit: (values, { setSubmitting }) => {
      let data = {
        national_id: values.national_id,
        new_pass: values.newPass,
        new_pass_confirm: values.newPassConfirm,
        a_param: query.get("a"),
        b_param: query.get("b"),
      };
      console.log("data", data);
      setLoading(true);
      forgetPasswordLevel2(data)
        .then((res) => {
          setLoading(false);
          let isok = handleNotificationAlertTryUpdate(res);
          if (!isok) {
            return;
          }
          setSubmitting(false);
          push("/auth/login");
        })
        .catch(() => {
          setSubmitting(false);
          setLoading(false);
          handleNotificationAlertCatch();
        });
    },
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

  const classes = useStyles();
  return (
    <>
      <div className="p-4 pt-10">
        <p>لطفا رمز عبور جدید را همراه با کد ملی وارد کنید</p>
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

          <div className="form-group mt-5 mb-5 input-group-lg">
            <label className={classes.label} htmlFor="Input-newPass">
              رمز عبور جدید{" "}
            </label>
            <input
              type="text"
              className={`form-control p-2 ${getInputClasses("newPass")} ${
                classes.borderInput
              }`}
              id="Input-newPass"
              name="newPass"
              {...formik.getFieldProps("newPass")}
            />
            {formik.touched.newPass && formik.errors.newPass ? (
              <small id="emailHelp" className="form-text text-danger">
                {formik.errors.newPass}
              </small>
            ) : null}
          </div>

          <div className="form-group mt-5 mb-5 input-group-lg">
            <label className={classes.label} htmlFor="Input-newPassConfirm">
              تکرار رمز عبور{" "}
            </label>
            <input
              type="text"
              className={`form-control p-2 ${getInputClasses(
                "newPassConfirm"
              )} ${classes.borderInput}`}
              id="Input-newPassConfirm"
              name="newPassConfirm"
              {...formik.getFieldProps("newPassConfirm")}
            />
            {formik.touched.newPassConfirm && formik.errors.newPassConfirm ? (
              <small id="emailHelp" className="form-text text-danger">
                {formik.errors.newPassConfirm}
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
              <span>ثبت رمز عبور جدید</span>
              {loading && <span className="ml-5 spinner spinner-white"></span>}
            </button>
          </div>
        </form>
        {/* <Link to={"/auth/login"}>
          <div>
            <button
              className={`${classes.buttonBack} w-100 `}
              disabled={loading}
            >
              <span>بازگشت</span>
              {loading && <span className="ml-5 spinner spinner-white"></span>}
            </button>
          </div>
        </Link> */}
      </div>
    </>
  );
};

export default ForgotPass;
