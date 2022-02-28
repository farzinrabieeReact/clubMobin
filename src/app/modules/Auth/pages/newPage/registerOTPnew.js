import React, { useState } from 'react'
import { makeStyles } from "@material-ui/styles";
import Timer from "./timer"
import { useHistory, useLocation } from 'react-router-dom';
import { registerLevel2, registerLevel1 } from '../../_redux/authCrud';
import Otp from './otp';
import { handleNotificationAlertCatch, handleNotificationAlertTrySelect } from '../../../../common/method/handleNotificationAlert';
import {
    actionTypes as actionTypesNotif
} from "./../../../../../redux/notificationAlert";
import { useDispatch } from 'react-redux';

const useStyles = makeStyles((theme) => ({
    root: {
        paddingTop: 80,
        width: "90%",
        margin: "auto",
        [theme.breakpoints.down("1200")]: {
            marginBottom: 30,
            // marginTop: 70
        }
    },
    smsCodeVerification: {
        border: "1px solid #ef6d22",
        margin: "30px auto 0 auto",
        width: 170,
        height: 57,
        textAlign: "center",
        direction: "rtl",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderRadius: 5,
        fontSize: 20,
        "& input": {
            fontSize: "20px !important",
            height: 20,
            textAlign: "center",
            width: 20,
            border: 0,
            "&:focus": {
                border: 0,
                fontSize: 20,
                outline: 0
            },
            "&::placeholder": {
                color: "black",
                position: "relative",
                top: -5
            }

        }
    },
    title: {
        width: 260,
        margin: "auto",
        textAlign: "center",
        lineHeight: "25px"
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
    },
}))

export default function RegisterOTP() {
    const classes = useStyles()
    const { push } = useHistory()
    const { state } = useLocation()
    const [loading, setloading] = useState(false)
    const dispatch = useDispatch()

    const [InputSmsCode, setInputSmsCode] = useState({
        1: "",
        2: "",
        3: "",
        4: "",
        5: "",
        6: "",
    });

    const handleSubmit = () => {
        setloading(true)
        let res = {
            confirmation_token: `${InputSmsCode[1]}${InputSmsCode[2]}${InputSmsCode[3]}${InputSmsCode[4]}${InputSmsCode[5]}${InputSmsCode[6]}`,
            national_id: state.national_id,
        }

        registerLevel2(res)
            .then(res => {
                let isOk = handleNotificationAlertTrySelect(res)
                if (isOk) {
                    push({
                        pathname: "/auth/RegisterPass",
                        state: {
                            isIndividual: state.isIndividual , 
                            national_id: state.national_id,
                        }
                    })
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
        setloading(true)
        let res = {
            national_id: state.national_id,
            phone: state.phone,
            introducing_member_national_id: state.introducing_member_national_id ? state.introducing_member_national_id : null,
            is_individual: state.isIndividual ? "TRUE" : "FALSE"
        }

        registerLevel1(res)
            .then(res => {
                let isOk = handleNotificationAlertTrySelect(res)
                if (isOk) {
                    dispatch({
                        type: actionTypesNotif.info,
                        textAlert: "کد تایید با موفقیت ارسال شد."
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
        push("/auth/RegisterPass")
        return null
    }

    return (
        <div className={classes.root}>
            <h5 className={classes.title}>
                کد تایید ارسال شده را به شماره
                <span> {state?.phone} </span>
                را وارد کنید
            </h5>

            <Otp
                InputSmsCode={InputSmsCode}
                setInputSmsCode={setInputSmsCode}
                numberOtp={6}
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
                    onClick={() => push({
                        pathname: "/auth/register",
                    })}
                >
                    بازگشت
                </button>
                <button
                    className={`${classes.button} ${InputSmsCode["6"] ? classes.buttonActive : classes.buttonCustom} `}
                    disabled={InputSmsCode["6"] &&  !loading ? false : true}
                    onClick={handleSubmit}
                >
                    <span>تایید کد</span>
                    {loading && <span className="ml-5 spinner spinner-white"></span>}

                </button>
            </div>
        </div>
    )
}








