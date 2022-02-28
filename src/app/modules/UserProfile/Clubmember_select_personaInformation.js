import React, { useEffect, useState } from "react";
import { useSelector, connect, useDispatch } from "react-redux";
// import { useFormik } from "formik";
import * as auth from "../Auth";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { getDataInLocalstorage } from "../../common/method/getDataInLocalstorage";
import { actionTypes } from "../../../redux/profile/clubmember_select_info";
import { dateConvertMiladiToShamsi } from "../../common/method/date";
import { clubmember_send_kyc_otp } from "../../../redux/profile/clubmember_insert_send_kyc_otp";
import { handleNotificationAlertCatch, handleNotificationAlertTrySelect, handleNotificationAlertTryUpdate } from "../../common/method/handleNotificationAlert";
import ModalCustom from "./../../common/components/ModalCustom"
import Otp from "../Auth/pages/newPage/otp";
import { registerkycProfile } from "../Auth/_redux/authCrud";


function PersonaInformation() {
  // Fields
  const dispatch = useDispatch();
  const profile = useSelector(state => state.reducerProfile.data);
  let member_national_id = getDataInLocalstorage("member_national_id")
  const [stateUpdateSejam, setstateUpdateSejam] = useState(false)
  const [loadinggetKyc, setloadinggetKyc] = useState(false)
  const [loadingsendKyc, setloadingsendKyc] = useState(false)
  const [InputSmsCode, setInputSmsCode] = useState({
    1: "",
    2: "",
    3: "",
    4: "",
    5: "",
  });

  const checkTrueAndFalse = item => {
    if (item !== "null") {
      return true;
    } else {
      return false;
    }
  };

  const gender_handle = gender => {
    switch (gender) {
      case "1":
        return "مرد";
      case "2":
        return "زن";
      default:
        return "";
    }
  };

  const fun_roll = key => {
    switch (key) {
      case "ADMIN":
        return { value: "ادمین", roll: "ADMIN" };
      case "OPERATOR":
        return { value: "اپراتور", roll: "OPERATOR" };
      case "MEMBER":
        return { value: "کاربر عادی", roll: "MEMBER" };
      default:
        break;
    }
  };

  const sendKycSejam = () => {
    setloadingsendKyc(true)
    if (member_national_id) {
      clubmember_send_kyc_otp({ national_id: member_national_id })
        .then((res) => {
          let isOk = handleNotificationAlertTrySelect(res)
          if (isOk) {
            setstateUpdateSejam(true)
          }
        })
        .catch(() => {
          handleNotificationAlertCatch()
        })
        .finally(() => {
          setloadingsendKyc(false)
        })
    }
  }

  const handleClickGetKyc = () => {
    setloadinggetKyc(true)
    let res = {
      otp: `${InputSmsCode[1]}${InputSmsCode[2]}${InputSmsCode[3]}${InputSmsCode[4]}${InputSmsCode[5]}`,
      national_id: member_national_id,
    }

    registerkycProfile(res)
      .then(res => {
        let isOk = handleNotificationAlertTryUpdate(res)
        if (isOk) {
          getApiProfile()
          setTimeout(() => {
            setstateUpdateSejam(false)
          }, 1000);
        }
      })
      .catch(() => {
        handleNotificationAlertCatch()
      })
      .finally(() => {
        setloadinggetKyc(false)
      });

  }

  const getApiProfile = () => {
    if (member_national_id) {
      dispatch({
        type: actionTypes.profileAsync,
        national_id: member_national_id
      });
    }
  }

  useEffect(() => {
    getApiProfile()
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  if (!profile[0]) return null;

  return (
    <form className="card card-custom card-stretch">
      {/* begin::Header */}
      <div className="card-header py-3">
        <div className="card-title align-items-start flex-column">
          <h3 className="card-label font-weight-bolder text-dark">
            اطلاعات شخصی
          </h3>
          <span className="text-muted font-weight-bold font-size-sm mt-1">
            اطلاعات شخصی خود را به روز کنید
          </span>
        </div>

        <div className="d-flex align-items-center">
          <button
            className="btn btnBgSuccess d-flex align-items-center"
            onClick={(e) => {
              e.preventDefault()
              sendKycSejam()
            }}
          >
            <span>بروزرسانی از سجام</span>
            {
              loadingsendKyc && (
                <span className="spinner d-inline-block ml-1" style={{width : 20}}></span>
              )
            }
          </button>
          <ModalCustom open={stateUpdateSejam} setOpen={setstateUpdateSejam} >
            <div className="p-5 text-center" style={{ minWidth: 300 }}>
              لطفا کد ارسال شده را وارد نمایید
            <Otp
                InputSmsCode={InputSmsCode}
                setInputSmsCode={setInputSmsCode}
              />

              <div>
                <button
                  className="btn backGroundOrange mt-10 d-flex align-items-center mx-auto"
                  onClick={handleClickGetKyc}
                  disabled={InputSmsCode["5"] && !loadinggetKyc ? false : true}
                >
                  <span>تایید</span>
                  {
                    loadinggetKyc && (
                      <span className="spinner d-inline-block ml-1" style={{width : 20}}></span>
                    )
                  }
                </button>
              </div>
            </div>
          </ModalCustom>
        </div>
      </div>
      {/* end::Header */}
      {/* begin::Form */}
      <div className="form">
        {/* begin::Body */}
        <div className="card-body">
          {/* //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}
          <div className="row">
            <div className="form-group col-lg-6 row">
              <label className="col-lg-4 col-form-label">نام:</label>

              <div className="col-lg-8">
                <input
                  type="text"
                  placeholder="نام"
                  onChange={() => null}
                  value={profile[0]?.body.first_name}
                  className={`form-control form-control-lg form-control-solid`}
                  name="first_name"
                />
              </div>
            </div>

            <div className="form-group col-lg-6 row">
              <label className="col-lg-4 col-form-label">تاریخ ثبت نام:</label>

              <div className="col-lg-8">
                <input
                  type="text"
                  placeholder="تاریخ ثبت نام"
                  onChange={() => null}
                  // value={profile[0]?.body.registration_date.split(" ")[0]}
                  value={dateConvertMiladiToShamsi(
                    profile[0]?.body.registration_date
                  )}
                  className={`form-control form-control-lg form-control-solid`}
                  name="registration_date"
                />
              </div>
            </div>

            <div className="form-group col-lg-6 row">
              <label className="col-lg-4 col-form-label">نام خانوادگی:</label>

              <div className="col-lg-8">
                <input
                  type="text"
                  placeholder="نام خانوادگی"
                  onChange={() => null}
                  value={profile[0]?.body.last_name}
                  className={`form-control form-control-lg form-control-solid`}
                  name="last_name"
                />
              </div>
            </div>

            <div className="form-group col-lg-6 row">
              <label className="col-lg-4 col-form-label">تاریخ تولد:</label>

              <div className="col-lg-8">
                <input
                  type="text"
                  placeholder="تاریخ تولد"
                  onChange={() => null}
                  // value={profile[0]?.body.birth_date.split(" ")[0]}
                  value={dateConvertMiladiToShamsi(profile[0]?.body.birth_date)}
                  className={`form-control form-control-lg form-control-solid`}
                  name="birth_date"
                />
              </div>
            </div>

            <div className="form-group col-lg-6 row">
              <label className="col-lg-4 col-form-label">تلفن همراه:</label>

              <div className="col-lg-8">
                <input
                  type="text"
                  placeholder="تلفن همراه"
                  onChange={() => null}
                  value={
                    // !profile[0]?.body.phone === "null"
                    //   ? profile[0]?.body.phone
                    //   : " "
                    profile[0]?.body.phone ? profile[0]?.body.phone : null
                  }
                  className={`form-control form-control-lg form-control-solid`}
                  name="phone"
                />
              </div>
            </div>

            <div className="form-group col-lg-6 row">
              <label className="col-lg-4 col-form-label">پست الکترونیکی:</label>

              <div className="col-lg-8">
                <input
                  type="text"
                  placeholder="پست الکترونیکی"
                  onChange={() => null}
                  value={profile[0]?.body.email}
                  className={`form-control form-control-lg form-control-solid`}
                  name="email"
                />
              </div>
            </div>

            <div className="form-group col-lg-6 row">
              <label className="col-lg-4 col-form-label">جنسیت:</label>

              <div className="col-lg-8">
                <input
                  type="text"
                  placeholder="جنسیت"
                  onChange={() => null}
                  value={gender_handle(profile[0]?.body.gender)}
                  className={`form-control form-control-lg form-control-solid`}
                  name="gender"
                />
              </div>
            </div>

            <div className="form-group col-lg-6 row">
              <label className="col-lg-4 col-form-label">شناسه کارگزاری:</label>

              <div className="col-lg-8">
                <input
                  type="text"
                  placeholder="شناسه کارگزاری"
                  onChange={() => null}
                  value={profile[0]?.body.automation_club_id}
                  className={`form-control form-control-lg form-control-solid`}
                  name="automation_club_id"
                />
              </div>
            </div>

            <div className="form-group col-lg-6 row">
              <label className="col-lg-4 col-form-label">کدملی:</label>

              <div className="col-lg-8">
                <input
                  type="text"
                  placeholder="کدملی"
                  onChange={() => null}
                  value={profile[0]?.body.national_id}
                  className={`form-control form-control-lg form-control-solid`}
                  name="national_id"
                />
              </div>
            </div>

            <div className="form-group col-lg-6 row">
              <label className="col-lg-4 col-form-label">سطح دسترسی:</label>

              <div className="col-lg-8">
                <input
                  type="text"
                  placeholder="سطح دسترسی"
                  onChange={() => null}
                  value={fun_roll(profile[0]?.body.category).value}
                  className={`form-control form-control-lg form-control-solid`}
                  name="category"
                />
              </div>
            </div>

            <div className="form-group col-lg-6 row">
              <label className="col-lg-4 col-form-label">
                کد بورسی اوراق :
              </label>

              <div className="col-lg-8">
                <FormControlLabel
                  control={
                    <Checkbox
                      name="bourse_code"
                      color="primary"
                      size="medium"
                      checked={checkTrueAndFalse(profile[0]?.body.bourse_code)}
                      style={{
                        transform: "scale(1.2)"
                      }}
                    />
                  }
                />
                {profile[0]?.body.bourse_code !== "null" ? (
                  <>
                    <span style={{ fontSize: "14px", fontWeight: "700" }}>
                      شناسه :{" "}
                    </span>

                    <span> {` ${profile[0]?.body.bourse_code} `}</span>
                  </>
                ) : null}
              </div>
            </div>

            <div className="form-group col-lg-6 row">
              <label className="col-lg-4 col-form-label">
                کد بورسی انرژی :
              </label>

              <div className="col-lg-8">
                <FormControlLabel
                  control={
                    <Checkbox
                      name="energy_bourse_code"
                      color="primary"
                      size="medium"
                      checked={checkTrueAndFalse(
                        profile[0]?.body.energy_bourse_code
                      )}
                      style={{
                        transform: "scale(1.2)"
                      }}
                    />
                  }
                />
              </div>
            </div>

            <div className="form-group col-lg-6 row">
              <label className="col-lg-4 col-form-label">کد بورسی کالا :</label>

              <div className="col-lg-8">
                <FormControlLabel
                  control={
                    <Checkbox
                      name="kala_bourse_code"
                      color="primary"
                      size="medium"
                      checked={checkTrueAndFalse(
                        profile[0]?.body.kala_bourse_code
                      )}
                      style={{
                        transform: "scale(1.2)"
                      }}
                    />
                  }
                />
              </div>
            </div>

            <div className="form-group col-lg-6 row">
              <label className="col-lg-4 col-form-label">کد بورسی آتی :</label>

              <div className="col-lg-8">
                <FormControlLabel
                  control={
                    <Checkbox
                      name="ati_bourse_code"
                      color="primary"
                      size="medium"
                      checked={checkTrueAndFalse(
                        profile[0]?.body.ati_bourse_code
                      )}
                      style={{
                        transform: "scale(1.2)"
                      }}
                    />
                  }
                />
              </div>
            </div>
          </div>
        </div>
        {/* end::Body */}
      </div>
      {/* end::Form */}
    </form>
  );
}

export default connect(null, auth.actions)(PersonaInformation);
