import { Button, Checkbox, withStyles } from "@material-ui/core";
import { grey, orange } from "@material-ui/core/colors";
import React, { useEffect, useRef, useState } from "react";
import { authCustomerInsertStepTwo } from "../../../../redux/authCustomer/authCustomer_insert_stepTwo";
import {
  handleNotificationAlertCatch,
  handleNotificationAlertTryUpdate,
} from "../../../common/method/handleNotificationAlert";
import StepTwoContractual from "./Contractual";
import Styles from "./index.module.scss";
import InputUpload from "./input2/inputUpload";
import InputUploadPlus from "./input2/inputUploadPlus";
import { actionTypes as actionTypesNotif } from "../../../../redux/notificationAlert";
import { useDispatch } from "react-redux";
import { authCustomerInsertStepThree } from "../../../../redux/authCustomer/authCustomer_insert_StepThree";
import { dateConvertMiladiToShamsi } from "../../../common/method/date";
import moment from "moment";
import { convertDigitToEnglish } from "../../../common/method/convertDigitToEnglish";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import { actionTypes as authLoading } from "../../../../redux/authCustomer/authCusotmer_Loading";

const OrangeCheckbox = withStyles({
  root: {
    color: grey[600],
    "&$checked": {
      color: orange[800],
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

const StepTwo = ({
  handleNextStep,
  handlePrevStep,
  sejamInfoState,
  apicallSendCode,
 
}) => {
  const dispatch = useDispatch();
  // -------------------------------------state----------------------------
  const [checkedStepTwo, setcheckedStepTwo] = useState(false);
  const [nationImgStepTwo, setnationImgStepTwo] = useState("");
  const [backNationImgStepTwo, setbackNationImgStepTwo] = useState("");
  const [pageOneBirth, setpageOneBirth] = useState("");
  const [desBirth, setdesBirth] = useState("");

  const [birthDate, setbirthDate] = useState("");

  const [nationImgStepTwoParent, setnationImgStepTwoParent] = useState("");
  const [backNationImgStepTwoParent, setbackNationImgStepTwoParent] = useState(
    ""
  );
  const [pageOneBirthParent, setpageOneBirthParent] = useState("");
  const [flagNext, setflagNext] = useState(false);
  const [inputPlus1, setinputPlus1] = useState("");
  const [inputPlus2, setinputPlus2] = useState("");
  const [inputPlus3, setinputPlus3] = useState("");
  const [flagInputPlus1, setflagInputPlus1] = useState(false);
  const [flagInputPlus2, setflagInputPlus2] = useState(false);
  const [flagInputPlus3, setflagInputPlus3] = useState(false);
  const [loading, setloading] = useState(false);
  const [objectInputPlus, setobjectInputPlus] = useState(
    {
      id: 1,
      value: false,
      acive: false,
    },
    {
      id: 2,
      value: false,
      acive: false,
    },
    {
      id: 3,
      value: false,
      acive: false,
    }
  );
  // const [flagInputPlus3, setflagInputPlus3] = useState(false);

  const [attachments, setattachments] = useState([]);

  // const [inputPlusCount, setinputPlusCount] = useState([]);

  //--------------------------Apifunction---------------------------

  const apiInsert = () => {
    let data = {
      member_id: "eO1IGX4BK-iqFANTbQyg",
      is_active: checkedStepTwo ? "TRUE" : "FALSE",
      state: "null",
      customer_id: "null",
      registration_id: "null",
      member_first_name: sejamInfoState
        ? sejamInfoState?.body?.privatePerson?.firstName
        : "",
      member_last_name: sejamInfoState
        ? sejamInfoState?.body?.privatePerson?.lastName
        : "",
      member_national_id: sejamInfoState
        ? sejamInfoState?.body?.uniqueIdentifier
        : "",
      identity_serial_number: "null",
      father_name: sejamInfoState
        ? sejamInfoState?.body?.privatePerson?.fatherName
        : "",
      register_serial: sejamInfoState
        ? sejamInfoState?.body?.privatePerson?.serial
        : "",
      register_serial_alpha: sejamInfoState
        ? sejamInfoState?.body?.privatePerson?.seriShChar
        : "",
      birth_location_id: "0",
      identity_number: sejamInfoState
        ? sejamInfoState?.body?.privatePerson?.shNumber
        : "",
      education_id: "0",
      home_state_id: "0",
      home_phone_number: sejamInfoState
        ? sejamInfoState?.body?.addresses[0]?.tel
        : "",
      home_postal_code: sejamInfoState
        ? sejamInfoState?.body?.addresses[0]?.postalCode
        : "",
      home_avenue: sejamInfoState
        ? sejamInfoState?.body?.addresses[0]?.remnantAddress
        : "",
      home_street: sejamInfoState
        ? sejamInfoState?.body?.addresses[0]?.alley
        : "",
      home_number: "null",
      bank_id: sejamInfoState ? sejamInfoState?.body?.accounts[0]?.bank.id : "",
      bank_name: sejamInfoState
        ? sejamInfoState?.body?.accounts[0]?.bank.name
        : "",
      bank_account_1_account_number: sejamInfoState
        ? sejamInfoState?.body?.accounts[0]?.accountNumber
        : "",
      bank_account_1_sheba_number: sejamInfoState
        ? sejamInfoState?.body?.accounts[0]?.sheba
        : "",
      funding_source: "null",
      account_type: sejamInfoState
        ? sejamInfoState?.body?.accounts[0]?.type
        : "",
      bank_1_branch_location_id: sejamInfoState
        ? sejamInfoState?.body?.accounts[0]?.branchCity.id
        : "",
      bank_1_branch_code: sejamInfoState
        ? sejamInfoState?.body?.accounts[0]?.branchCode
        : "",
      bank_1_branch_id: sejamInfoState
        ? sejamInfoState?.body?.accounts[0]?.branchCode
        : "",
      bank_1_branch_name: sejamInfoState
        ? sejamInfoState?.body?.accounts[0]?.branchName
        : "",
      transaction_level_id: sejamInfoState
        ? sejamInfoState?.body?.financialInfo?.transactionLevel
        : "",
      previous_broker: "null",
      stock_introduction_id: sejamInfoState
        ? sejamInfoState?.body?.financialInfo?.tradingKnowledgeLevel
        : "",
      has_trade_experience: "null",
      bonds_transaction_value: "null",
      ime_transaction_value: "null",
      out_transaction_value: "null",
      attachments: attachments,
      // attachments: [
      //   {
      //     "file-type": nationImgStepTwo ? nationImgStepTwo?.file_type : "",
      //     "file-title": nationImgStepTwo ? nationImgStepTwo?.file_name : "",
      //     "file-content": nationImgStepTwo
      //       ? nationImgStepTwo?.file.split(",")[1]
      //       : "",
      //   },
      //   {
      //     "file-type": backNationImgStepTwo
      //       ? backNationImgStepTwo?.file_type
      //       : "",
      //     "file-title": backNationImgStepTwo
      //       ? backNationImgStepTwo?.file_name
      //       : "",
      //     "file-content": backNationImgStepTwo
      //       ? backNationImgStepTwo?.file.split(",")[1]
      //       : "",
      //   },
      //   {
      //     "file-type": pageOneBirth ? pageOneBirth?.file_type : "",
      //     "file-title": pageOneBirth ? pageOneBirth?.file_name : "",
      //     "file-content": pageOneBirth ? pageOneBirth?.file.split(",")[1] : "",
      //   },
      //   {
      //     "file-type": desBirth ? desBirth?.file_type : "",
      //     "file-title": desBirth ? desBirth?.file_name : "",
      //     "file-content": desBirth ? desBirth?.file.split(",")[1] : "",
      //   },
      // ],
    };
    authCustomerInsertStepTwo(data)
      .then((result) => {
        let isok = handleNotificationAlertTryUpdate(result);
        if (!isok) {
          return;
        }
        apicallSendCode();
      })
      .catch((err) => {
        handleNotificationAlertCatch();
      })
      .finally(() => {
        setloading(false);
      });
  };

  //--------------------------function---------------------------

  const handleChange = (event) => {
    setcheckedStepTwo((prev) => !prev);
  };

  const handleInsertAndNextStep = () => {
    if (!flagNext) {
      dispatch({
        type: actionTypesNotif.warning,
        textAlert: "لطفا تمامی فیلد ها را پر نمایید",
      });
      return;
    }
    setloading(true);
    apiInsert();
  };

  const handleCreateArrayforInsert = () => {
    let attachmentsArray = [
      {
        "file-type": nationImgStepTwo ? nationImgStepTwo?.file_type : "",
        "file-title": nationImgStepTwo ? nationImgStepTwo?.file_name : "",
        "file-content": nationImgStepTwo
          ? nationImgStepTwo?.file.split(",")[1]
          : "",
      },
      {
        "file-type": backNationImgStepTwo
          ? backNationImgStepTwo?.file_type
          : "",
        "file-title": backNationImgStepTwo
          ? backNationImgStepTwo?.file_name
          : "",
        "file-content": backNationImgStepTwo
          ? backNationImgStepTwo?.file.split(",")[1]
          : "",
      },
      {
        "file-type": pageOneBirth ? pageOneBirth?.file_type : "",
        "file-title": pageOneBirth ? pageOneBirth?.file_name : "",
        "file-content": pageOneBirth ? pageOneBirth?.file.split(",")[1] : "",
      },
      {
        "file-type": desBirth ? desBirth?.file_type : "",
        "file-title": desBirth ? desBirth?.file_name : "",
        "file-content": desBirth ? desBirth?.file.split(",")[1] : "",
      },
    ];
    if (birthDate < 18) {
      handleUploadParent(attachmentsArray);
    }

    handleInputPlus(attachmentsArray);

    setattachments(attachmentsArray);
  };

  const handleInputPlus = (attachmentsArray) => {
    if (inputPlus1) {
      attachmentsArray.push({
        "file-type": inputPlus1 ? inputPlus1?.file_type : "",
        "file-title": inputPlus1 ? inputPlus1?.file_name : "",
        "file-content": inputPlus1 ? inputPlus1?.file.split(",")[1] : "",
      });
    }
    if (inputPlus2) {
      attachmentsArray.push({
        "file-type": inputPlus2 ? inputPlus2?.file_type : "",
        "file-title": inputPlus2 ? inputPlus2?.file_name : "",
        "file-content": inputPlus2 ? inputPlus2?.file.split(",")[1] : "",
      });
    }
    if (inputPlus3) {
      attachmentsArray.push({
        "file-type": inputPlus3 ? inputPlus3?.file_type : "",
        "file-title": inputPlus3 ? inputPlus3?.file_name : "",
        "file-content": inputPlus3 ? inputPlus3?.file.split(",")[1] : "",
      });
    }
  };

  const handleUploadParent = (attachments) => {
    attachments.push(
      {
        "file-type": pageOneBirthParent ? pageOneBirthParent?.file_type : "",
        "file-title": pageOneBirthParent ? pageOneBirthParent?.file_name : "",
        "file-content": pageOneBirthParent
          ? pageOneBirthParent?.file.split(",")[1]
          : "",
      },
      {
        "file-type": backNationImgStepTwoParent
          ? backNationImgStepTwoParent?.file_type
          : "",
        "file-title": backNationImgStepTwoParent
          ? backNationImgStepTwoParent?.file_name
          : "",
        "file-content": backNationImgStepTwoParent
          ? backNationImgStepTwoParent?.file.split(",")[1]
          : "",
      },
      {
        "file-type": nationImgStepTwoParent
          ? nationImgStepTwoParent?.file_type
          : "",
        "file-title": nationImgStepTwoParent
          ? nationImgStepTwoParent?.file_name
          : "",
        "file-content": nationImgStepTwoParent
          ? nationImgStepTwoParent?.file.split(",")[1]
          : "",
      }
    );
  };

  useEffect(() => {
    if (birthDate < 18) {
      if (
        nationImgStepTwo &&
        nationImgStepTwoParent &&
        backNationImgStepTwo &&
        backNationImgStepTwoParent &&
        desBirth &&
        pageOneBirth &&
        pageOneBirthParent &&
        checkedStepTwo
      ) {
        setflagNext(true);
        handleCreateArrayforInsert();
      } else {
        setflagNext(false);
      }
    } else {
      if (
        nationImgStepTwo &&
        // nationImgStepTwoParent &&
        backNationImgStepTwo &&
        // backNationImgStepTwoParent &&
        desBirth &&
        pageOneBirth &&
        // pageOneBirthParent &&
        checkedStepTwo
      ) {
        setflagNext(true);
        handleCreateArrayforInsert();
      } else {
        setflagNext(false);
      }
    }
  }, [
    nationImgStepTwo,
    nationImgStepTwoParent,
    backNationImgStepTwo,
    backNationImgStepTwoParent,
    desBirth,
    pageOneBirth,
    pageOneBirthParent,
    checkedStepTwo,
  ]);

  useEffect(() => {
    handleCreateArrayforInsert();
  }, [inputPlus1, inputPlus2, inputPlus3]);

  useEffect(() => {
    if (inputPlus1) {
      setflagInputPlus1(true);
    } else {
      setflagInputPlus1(false);
    }
  }, [inputPlus1]);

  useEffect(() => {
    if (inputPlus2) {
      setflagInputPlus2(true);
    } else {
      setflagInputPlus2(false);
    }
  }, [inputPlus2]);

  // const handleAddInput = () => {
  //   setinputPlusCount((prev) => [...prev, 1]);
  // };

  const handleDate = (birthDate) => {
    let date = birthDate.split("T")[0].replaceAll("-", "/");
    var now = moment(new Date());
    let info = convertDigitToEnglish(now.format("YYYY/MM/DD"));

    var start = moment(date);
    var end = moment(info);
    let diff = end.diff(start, "years");

    setbirthDate(diff);
  };

  useEffect(() => {
    if (sejamInfoState?.body?.privatePerson?.birthDate) {
      handleDate(sejamInfoState?.body?.privatePerson?.birthDate);
    }
  }, [sejamInfoState]);

  const handleLoading = () => {
    setTimeout(() => {
      dispatch({ type: authLoading.authCustomerLoading, payload: false });
    }, 2000);
  };

  useEffect(() => {
    handleLoading()
  }, []);

  return (
    <>
      <div className={Styles["stepTwo-Parent"]}>
        <div className={Styles["stepTwo-main"]}>
          <div className={`${Styles["stepTwo-box_blue"]} d-flex mt-5 mb-5`}>
            <div className="text-center">
              <InfoOutlinedIcon className="mr-3" />
              بارگذاری مدارک - فرمت‌های قابل قبول برای بارگذاری مدارک شامل
              JPEG,JPG,PDF با حداکثر حجم 4 مگابایت است. تصاویر بارگذاری شده باید
              کاملا واضح و بدون حاشیه اضافی باشند؛ به گونه‌ای که تمام جزئیات
              صفحه قابل خواندن باشد. لازم به‌ذکر است که در صورت بارگذاری تصاویر
              تار و غیر واضح، فرآیند ثبت‌نام با خطا مواجه شده و باید مجددا
              فایل‌ها را با فرمت صحیح بارگذاری نمایید.
            </div>
          </div>
          {birthDate < 18 && (
            <div className={`${Styles["stepTwo-box_blue"]} d-flex mt-5 mb-5`}>
              <div>
                <InfoOutlinedIcon
                  // style={{ position: "absolute", top: 25, right: 5 }}
                  className="mr-3"
                />
                بارگذاری مدارک ولی متقاضی - تصاویر صفحه اول شناسنامه، پشت و روی
                کارت ملی قیم قانونی فرد را با فرمت JPEG و PDF و حداکثر حجم 4
                مگابایت بارگذاری کنید.
              </div>
            </div>
          )}
          <div className={Styles["stepTwo-content-header"]}>بارگذاری مدارک</div>
          <div className={Styles["stepTwo-content-box"]}>
            <InputUpload
              value={nationImgStepTwo}
              setValue={setnationImgStepTwo}
              title={"روی کارت ملی"}
            />
            <InputUpload
              value={backNationImgStepTwo}
              setValue={setbackNationImgStepTwo}
              title={"پشت کارت ملی"}
            />
            <InputUpload
              value={pageOneBirth}
              setValue={setpageOneBirth}
              title={"صفحه اول شناسنامه"}
            />
            <InputUpload
              value={desBirth}
              setValue={setdesBirth}
              title={"صفحه توضیحات شناسنامه"}
            />
            {/* {objectInputPlus.map((itm, ind) => (
              <InputUploadPlus
                value={inputPlus1}
                setValue={setinputPlus1}
                title={"سایر مدارک"}
              />
            ))} */}
            <InputUploadPlus
              value={inputPlus1}
              setValue={setinputPlus1}
              title={"سایر مدارک"}
            />

            {inputPlus2 || flagInputPlus1 ? (
              <InputUploadPlus
                value={inputPlus2}
                setValue={setinputPlus2}
                title={"سایر مدارک"}
                setflag={setflagInputPlus1}
              />
            ) : null}

            {inputPlus3 || flagInputPlus2 ? (
              <InputUploadPlus
                value={inputPlus3}
                setValue={setinputPlus3}
                title={"سایر مدارک"}
                setflag={setflagInputPlus3}
              />
            ) : null}
          </div>
          {birthDate < 18 && (
            <>
              <div className={Styles["stepTwo-content-header"]}>
                مدارک ولی متقاضی
              </div>
              <div className={Styles["stepTwo-content-box"]}>
                <InputUpload
                  value={nationImgStepTwoParent}
                  setValue={setnationImgStepTwoParent}
                  title={"روی کارت ملی ولی"}
                />
                <InputUpload
                  value={backNationImgStepTwoParent}
                  setValue={setbackNationImgStepTwoParent}
                  title={"پشت کارت ملی ولی"}
                />
                <InputUpload
                  value={pageOneBirthParent}
                  setValue={setpageOneBirthParent}
                  title={"صفحه اول شناسنامه ولی"}
                />
              </div>
            </>
          )}

          <div className={Styles["stepTwo-content-header"]}>قراردادها</div>
          <div className={Styles["stepTwo-content-box2"]}>
            <StepTwoContractual
              checkedStepTwo={checkedStepTwo}
              handleChange={handleChange}
              sejamInfoState={sejamInfoState}
            />
            <div className="d-flex  align-items-center mt-4 mb-2">
              <div style={{ marginTop: -5 }}>
                <OrangeCheckbox
                  checked={checkedStepTwo}
                  onChange={handleChange}
                />
              </div>
              <div className={Styles["contractual-text"]}>
                اینجانب تمامی قراردادهای بالا را مطالعه نموده و می‌پذیرم.
              </div>
            </div>
          </div>
        </div>
        <div className={Styles["stepTwo-footer"]}>
          {/* <div className="d-flex justify-content-center align-items-center">
            <div style={{ marginTop: -5 }}>
              <OrangeCheckbox checked={checkedStepTwo} onChange={handleChange} />
            </div>
            <div className={Styles["contractual-text"]}>اینجانب تمامی قراردادهای بالا را مطالعه نموده و می‌پذیرم.</div>
          </div> */}
          <div className="d-flex w-100 justify-content-between">
            <Button
              className={`${Styles["stepTwo-footer-button-back"]} ms-3`}
              disabled={false}
              onClick={handlePrevStep}
            >
              بازگشت
            </Button>
            <Button
              className={
                flagNext
                  ? Styles["stepTwo-footer-button-active"]
                  : Styles["stepTwo-footer-button"]
              }
              // disabled={!flagNext}
              onClick={handleInsertAndNextStep}
            >
              {loading ? (
                <>
                  <span>مرحله بعدی</span>
                  <span className="ml-5 spinner spinner-white"></span>
                </>
              ) : (
                <span>مرحله بعدی</span>
              )}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default StepTwo;
