import { Button } from "@material-ui/core";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";

import { authCustomerUpdateStepThree } from "../../../../redux/authCustomer/authCustomer_update_StepThree";
import {
  handleNotificationAlertCatch,
  handleNotificationAlertTryUpdate,
} from "../../../common/method/handleNotificationAlert";
import { actionTypes as actionTypesNotif } from "../../../../redux/notificationAlert";
import Styles from "./index.module.scss";
import Timer from "./timer";

const StepThree = ({
  handleNextStep,
  handlePrevStep,
  nationalState,
  step,
  apicallSendCode,
  flagCode,
  sejamInfoState,
}) => {
  // -----------------------------state-----------------------------
  const dispatch = useDispatch();
  const [InputSmsCode, setInputSmsCode] = useState({
    0: "",
    1: "",
    2: "",
    3: "",
  });
  const [lengthInput, setlengthInput] = useState(0);
  const inputRef = useRef(null);
  const [loading, setloading] = useState(false);
  //---------------------------------------apiFunction----------------------

  useEffect(() => {}, [InputSmsCode]);

  const apicallAcceptCode = () => {
    let sum = "";
    Object.values(InputSmsCode).forEach((element) => {
      sum += element;
    });
    if (sum.length < 4) {
      dispatch({
        type: actionTypesNotif.warning,
        textAlert: "کد وارد شده باید 4 رقم باشد",
      });
      return;
    }
    let data = {
      national_id: sejamInfoState?.body?.uniqueIdentifier
        ? sejamInfoState?.body?.uniqueIdentifier
        : "",
      sign_code: sum,
    };
    authCustomerUpdateStepThree(data)
      .then((result) => {
        let isok = handleNotificationAlertTryUpdate(result);
        if (!isok) {
          return;
        }
        handleNextStep();
      })
      .catch((err) => {
        handleNotificationAlertCatch();
      })
      .finally(() => {
        setloading(false);
      });
  };

  // ---------------------------------------------useEffect----------------------------------

  useEffect(() => {
    if (step === 3) {
      // apicallSendCode()
    }
  }, [step]);

  const handelSmsCode = () => {
    const form = document.querySelector('[name="verifyForm"]');
    const inputs = form.querySelectorAll(".inputs input");

    const formData = new FormData();

    function shouldSubmit() {
      return [...inputs].every((input) => input.value.length > 0);
    }

    function handleSubmit(e) {
      e.preventDefault();

      if (shouldSubmit()) {
        const code = [...formData.values()].join("");
        alert(`CODE ${code} VERIFIED!`);
      }
    }

    function handleInput(e) {
      // check for data that was inputted
      // if there is a next input, focus on it
      const input = e.target;
      if (input.value) {
        formData.append(input.name, input.value);

        if (input.nextElementSibling) {
          input.nextElementSibling.focus();
        }
      }
    }

    function handleFocus(e) {
      if (e.target.value) {
        e.target.select();
      }
    }

    function handlePaste(e) {
      const paste = e.clipboardData.getData("text");
      // loop over each input and populate with the index of that string
      inputs.forEach((input, i) => {
        input.value = paste[i] || "";
        formData.set(input.name, input.value);
      });

      if (shouldSubmit()) {
        handleSubmit();
      }
    }

    function handleKeyDown({ key, target }) {
      if (key !== "Backspace") {
        return;
      } else if (target.previousElementSibling) {
        formData.delete(target.name);
        target.value = "";
        // target.previousElementSibling.focus();
        inputRef.current.focus();
      }
    }

    inputs[0].addEventListener("paste", handlePaste);
    form.addEventListener("input", handleInput);
    form.addEventListener("focusin", handleFocus);
    form.addEventListener("keydown", handleKeyDown);
    form.onsubmit = handleSubmit;
  };

  const handleChangeSmsCodeInput = (value, type) => {
    // // InputSmsCode
    // if (value === "" || value === " ") {
    //   setInputSmsCode((prev) => prev.slice(0,type-4));
    // }else{
    //   setInputSmsCode((prev) => prev + value);
    // }
    if (value === " " || value === "") {
      setInputSmsCode({
        0: "",
        1: "",
        2: "",
        3: "",
      });
      // if (type === 3) {
      //   setInputSmsCode((prev) => ({
      //     ...prev,
      //     [type + 1]: value.toString(),
      //     [2]: value.toString(),
      //   }));
      // }
      // if (type === 2) {
      //   setInputSmsCode((prev) => ({
      //     ...prev,
      //     [type + 1]: value.toString(),
      //     [2]: value.toString(),
      //   }));
      // }
      // if (type === 1) {
      //   setInputSmsCode((prev) => ({
      //     ...prev,
      //     [type + 1]: value.toString(),
      //     [type + 2]: value.toString(),
      //     [1]: value.toString(),
      //   }));
      // }
      // if (type === 0) {
      //   setInputSmsCode((prev) => ({
      //     ...prev,
      //     [type + 1]: value.toString(),
      //     [0]: value.toString(),
      //   }));
      // }
      // setInputSmsCode((prev) => ({
      //   ...prev,
      //   [type]: value.toString(),
      // }));
    } else {
      setInputSmsCode((prev) => ({
        ...prev,
        [type]: value.toString(),
      }));
    }
  };

  const handleAcceptCode = () => {
    setloading(true);
    apicallAcceptCode();
  };

  const handleActiveBtnCode = () => {
    let data = "";
    Object.values(InputSmsCode).forEach((element) => {
      data += element;
    });
    setlengthInput(data);
  };

  useEffect(() => {
    handleActiveBtnCode();
  }, [InputSmsCode]);


  const handleGender = () => {
    if (sejamInfoState?.privatePerson?.gender === "Female") {
      return <span>به نام خانم</span>;
    } else if (sejamInfoState?.privatePerson?.gender === "Male") {
      return <span>به نام آقا</span>;
    } else {
      return <span>به نام آقا/خانم</span>;
    }
  };


  return (
    <>
      <div className={Styles["stepThree-Parent"]}>
        <div className={Styles["stepThree-main"]}>
          <div className={Styles["fontSize-text-responsive"]}>
            <div className="text-center">
              رمز یکبار مصرف جهت امضای قرارداد به شماره همراه
            </div>
            <div className="text-center mb-1">
              <span>{sejamInfoState?.mobile}</span>
              <span>به نام آقا/خانم </span>
              <span>
                {sejamInfoState?.body?.privatePerson.firstName}{" "}
                {sejamInfoState?.body?.privatePerson.lastName}
              </span>{" "}
              ارسال شد.
            </div>
            <div className={Styles["fontSize-text-responsive-title"]}>
              وارد کردن رمز ارسال شده به منزله امضای قرارداد است
            </div>
          </div>
          {/* <div style={{ fontSize: 15, lineHeight: 2 }} className="d-block d-md-none mt-20">
           <div className="text-center">کد وارد شده از طرف سجام را وارد کنید</div>
          </div> */}
          <div>
            <section className={Styles["sms-code-verification"]}>
              <div className="w-100">
                <form name="verifyForm" onClick={handelSmsCode}>
                  <div className="inputs d-flex justify-content-center align-content-center w-100">
                    <input
                      type="text"
                      name="n1"
                      maxLength="1"
                      value={InputSmsCode["0"]}
                      className="ml-2"
                      ref={inputRef}
                      onChange={(e) =>
                        handleChangeSmsCodeInput(e.target.value, 0)
                      }
                      placeholder="_"
                    />
                    <input
                      type="text"
                      name="n2"
                      value={InputSmsCode["1"]}
                      maxLength="1"
                      className="ml-2"
                      onChange={(e) =>
                        handleChangeSmsCodeInput(e.target.value, 1)
                      }
                      placeholder="_"
                    />
                    <input
                      type="text"
                      name="n3"
                      maxLength="1"
                      value={InputSmsCode["2"]}
                      className="ml-2"
                      onChange={(e) =>
                        handleChangeSmsCodeInput(e.target.value, 2)
                      }
                      placeholder="_"
                    />
                    <input
                      type="text"
                      name="n4"
                      value={InputSmsCode["3"]}
                      maxLength="1"
                      onChange={(e) =>
                        handleChangeSmsCodeInput(e.target.value, 3)
                      }
                      placeholder="_"
                    />
                  </div>
                </form>
              </div>
            </section>

            <div className="d-flex justify-content-center align-items-center mt-10">
              <Timer
                initialMinute={2}
                initialSeconds={0}
                apicallSendCode={apicallSendCode}
              />
            </div>
            <div className="mt-20 d-flex justify-content-center align-items-center">
              <Button
                className={` ${Styles["stepThree-footer-button-back"]} ms-3`}
                disabled={false}
                onClick={handlePrevStep}
              >
                بازگشت
              </Button>
              <Button
                disabled={lengthInput.length === 4 ? false : true}
                onClick={handleAcceptCode}
                className={
                  lengthInput.length === 4
                    ? ` ${Styles["stepThree-footer-button-active"]} ms-3`
                    : ` ${Styles["stepThree-footer-button"]} ms-3`
                }
              >
                {loading ? (
                  <>
                    <span>تایید کد</span>
                    <span className="ml-5 spinner spinner-white"></span>
                  </>
                ) : (
                  <span>تایید کد</span>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* <form onsubmit="onSubmit(event)" classNameName="content-area form">
        <h4>Verify Login Code</h4>
        <h5>Welcome Back!</h5>
        <p>
          It looks like you're trying to login from a new device. As an added
          security mesure, please enter the 6-character code sent to your email.
        </p>
        <p>
          <a href="#">Need help?</a>
        </p>
        <fieldset classNameName="number-code">
          <legend>Security Code</legend>
          <div>
            <input name="code" classNameName="code-input" required />
            <input name="code" classNameName="code-input" required />
            <input name="code" classNameName="code-input" required />
            <input name="code" classNameName="code-input" required />
            <input name="code" classNameName="code-input" required />
            <input name="code" classNameName="code-input" required />
          </div>
        </fieldset>
        <p>
          <a href="#">Resend Code</a>
        </p>
        <input type="submit" value="Submit" />
      </form> */}
    </>
  );
};

export default StepThree;
