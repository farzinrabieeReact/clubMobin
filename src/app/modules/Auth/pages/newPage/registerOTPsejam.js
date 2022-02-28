import React, { useState } from 'react'
import { makeStyles } from "@material-ui/styles";
import Timer from "./timer"
import { useHistory, useLocation } from 'react-router-dom';
import Otp from './otp';
import { registerkycOtp, registerkycProfile } from '../../_redux/authCrud';
import { useDispatch } from 'react-redux';
import {
    actionTypes as actionTypesNotif
} from "./../../../../../redux/notificationAlert";
import { handleNotificationAlertCatch } from '../../../../common/method/handleNotificationAlert';


const useStyles = makeStyles((theme) => ({
    root: {
        paddingTop: 80,
        width: "90%",
        margin: "auto",
        [theme.breakpoints.down("1200")]: {
            marginBottom: 30,
            paddingTop: 50,
        }
    },
    title: {
        margin: "auto",
        textAlign: "center",
        lineHeight: "25px",
        fontSize: 16,
        width: "50%",
    },
    timer: {
        display: "flex",
        justifyContent: "center",
        marginTop: 23
    },
    buttons: {
        display: "flex",
        justifyContent: "space-between",
        margin: "45px auto 0"
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
        color: "#888888",
        backgroundColor: "#E8E8E8 !important",
        border: "1px solid #E8E8E8",
    },
    buttonActive: {
        background: "#ef6d22",
        borderRadius: 5,
        color: "white",
        fontSize: 16,
        border: "1px solid #ef6d22",
    }
}))

export default function RegisterOTP() {
    const classes = useStyles()
    const [InputSmsCode, setInputSmsCode] = useState({
        1: "",
        2: "",
        3: "",
        4: "",
        5: "",
    }); const { push } = useHistory()
    const { state } = useLocation()
    const [loading, setloading] = useState(false)
    const dispatch = useDispatch()

    const handleSubmit = () => {
        setloading(true)
        let res = {
            otp: `${InputSmsCode[1]}${InputSmsCode[2]}${InputSmsCode[3]}${InputSmsCode[4]}${InputSmsCode[5]}`,
            national_id: state.national_id,
        }

        registerkycProfile(res)
            .then(res => {
                if (res.data?.response?.is_successful) {
                    push({
                        pathname: "/AuthCustomer",
                        state: {
                            sejamInfo: res.data?.response.data.results
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

    const handleClickAgainOtp = () => {
        clickSubmitCustomer()
    }

    const clickSubmitCustomer = () => {
        setloading(true)

        let res = {
            national_id: state.national_id
        }

        registerkycOtp(res)
            .then(res => {
                if (res.data?.response?.is_successful) {
                    dispatch({
                        type: actionTypesNotif.info,
                        textAlert: "کد تایید با موفقیت ارسال شد"
                    });
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
            })
    }

    if (!state?.national_id) {
        push("/auth/RegisterFinish")
        return null
    }

    return (
        <div className={classes.root}>
            <h5 className={classes.title}>
                کد تایید ارسال شده از طرف سجام را وارد کنید
            </h5>

            <Otp
                InputSmsCode={InputSmsCode}
                setInputSmsCode={setInputSmsCode}
            />


            <section className={classes.timer}>
                <Timer
                    initialMinute={2}
                    initialSeconds={0}
                    handleClickAgain={handleClickAgainOtp}
                />
            </section>


            <div className={classes.buttons}>
                <button
                    className={classes.button}
                    onClick={() => {
                        push({
                            pathname: "/auth/RegisterFinish",
                            state: {
                                national_id: state.national_id,
                                first_name: state.first_name,
                                last_name: state.last_name
                            }
                        })
                    }}
                >
                    بازگشت
                </button>
                <button
                    className={`${classes.button} ${InputSmsCode["5"] ? classes.buttonActive : classes.buttonCustom} `}
                    onClick={handleSubmit}
                    disabled={InputSmsCode["5"] && !loading ? false : true}
                >
                    <span>تایید کد</span>
                    {loading && <span className="ml-5 spinner spinner-white"></span>}
                </button>
            </div>
        </div>
    )
}








