import React, { useEffect, useState } from 'react'
import { makeStyles } from "@material-ui/styles";
import { useHistory, useLocation } from 'react-router-dom';
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import styles from "./registerFinish.module.scss";
import { login, registerkycOtp } from '../../_redux/authCrud';
import * as auth from "../../_redux/authRedux";
import { injectIntl } from "react-intl";
import { connect, useDispatch } from "react-redux";
import { handleNotificationAlertCatch } from '../../../../common/method/handleNotificationAlert';
import {
  actionTypes as actionTypesNotif
} from "./../../../../../redux/notificationAlert";


const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: 30,
    width: "90%",
    margin: "auto",
    fontFamily: "iransans !important",
    [theme.breakpoints.down("1200")]: {
      marginBottom: 30
    }
  },
  button: {
    width: 155,
    height: 50,
    background: "white",
    borderRadius: 5,
    color: "#ef6d22",
    fontSize: 16,
    border: "none",
    fontFamily: "iransans !important",
    zIndex: 10,
    border: "1px solid #888888",
    boxShadow: "0px 0px 86px 0px rgba(0,0,0,0.13)",
    [theme.breakpoints.down("1200")]: {
      height: 45,
      width: 140
    }
  },
  buttonCustom: {
    color: "white",
    backgroundColor: "#ef6d22 !important",
    border: "1px solid #ef6d22",
  },
  buttons: {
    marginTop: 15,
    display: "flex",
    justifyContent: "space-between"
  }
}))

function RegisterFinish(props) {
  const classes = useStyles()
  const { push } = useHistory()
  const { state } = useLocation()
  const [loading, setloading] = useState(false)
  const dispatch = useDispatch()

  const apiCallLogin = () => {
    login(state?.national_id, state?.pass_salt)
      .then((res) => {
        if (Object.keys(res.data.response?.data).length) {
          props.login(res.data.response.data);
        }
      })
  }

  useEffect(() => {
    apiCallLogin()
  }, [])

  const clickSubmitCustomer = () => {
    setloading(true)

    let res = {
      national_id: state?.national_id
    }

    registerkycOtp(res)
      .then(res => {
        if (res.data?.response?.is_successful) {
          push({
            pathname: "/auth/registerOTPsejam",
            state: {
              national_id: state.national_id,
              first_name: state.first_name,
              last_name: state.last_name
            }
          })
        } else {
          dispatch({
            type: actionTypesNotif.warning,
            textAlert: res.data?.response?.error_description ? res.data?.response?.error_description : "لطفا بعد از گذشت اندکی زمان دوباره امتحان کنید"
          });
        }
      })
      .catch(() => {
        handleNotificationAlertCatch()
      })
      .finally(() => {
        setloading(false)
      });
  }


  if (!state?.national_id) {
    push("/auth/registerOTP")
    return null
  }

  return (
    <div className={classes.root}>
      <div
        className={`${styles["register-finish-box_green"]} d-flex flex-column mt-3`}
      >
        <img
          src="/media/authCustomer/Group 369@2x.png"
          alt=""
          style={{ width: 51, height: 51 }}
        />
        <div className="d-flex flex-column align-items-center mt-5 text-center">
          <span>{`${state.first_name + " " + state.last_name} عزیز`}</span>
          <span>ثبت نام شما در باشگاه مشتریان با موفقیت انجام شد!</span>
        </div>
      </div>

      <div className={`${styles["register-finish-box_blue"]}`}>
        <InfoOutlinedIcon className="mr-1" />
        <p className={styles["text"]}>
          برای دریافت کد معاملاتی آنلاین می توانید از طریق
            گزینه <span className="font-weight-bolder">تکمیل ثبت نام</span> اقدام نمایید; در غیر این صورت روی دکمه ورود کلیک کنید.
          </p>

      </div>

      <div className={classes.buttons}>
        <button
          className={`${classes.button} ${state.isIndividual ? "" : "w-100"}`}
          onClick={() => {
            push({
              pathname: "/home",
              state: {
                national_id: state.national_id,
                pass_salt: state.pass_salt
              }
            })
          }}
        >
          صفحه اصلی
          </button>
        {
          state.isIndividual && (
            <button
              className={`${classes.button} ${classes.buttonCustom}`}
              onClick={clickSubmitCustomer}
              disabled={!state.isIndividual ? true : false}
            >
              <span>تکمیل ثبت نام</span>
              {loading && <span className="ml-5 spinner spinner-white"></span>}
            </button>
          )
        }
      </div>
    </div>
  )
}

export default injectIntl(connect(null, auth.actions)(RegisterFinish));









