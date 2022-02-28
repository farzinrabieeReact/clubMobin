/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  Dropdown
} from "react-bootstrap";
import SVG from "react-inlinesvg";
import { toAbsoluteUrl } from "../../../_metronic/_helpers";
import {
  DropdownMenu4
} from "../../../_metronic/_partials/dropdowns";
import { actionTypes } from "../../../redux/profile/clubmember_select_info";
import { getDataInLocalstorage } from "../../common/method/getDataInLocalstorage";
import { actionTypes as actionTypesAuth } from "../Auth/_redux/authRedux.js";
import ModalCustom from "../../common/components/ModalCustom";
import { Box, TextField, CircularProgress } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import { insertInvitationLink } from "../../../redux/profile/clubmember_select_info/invitation_insert_link";
import { actionTypes as actionTypesNotif } from "./../../../redux/notificationAlert";
import CustomerRegistration from "./CustomerRegistration";
import { regex_email } from "../../common/method/regex";
import {
  handleNotificationAlertTryUpdate,
  handleNotificationAlertCatch
} from "../../common/method/handleNotificationAlert";

export function ClubmemberSelectInfo() {
  // let history = useHistory();
  const dispatch = useDispatch();
  const profile = useSelector(state => state.reducerProfile.data);

  const [link, setlink] = useState("");
  const [open, setOpen] = useState(false);
  const [valueInvition, setValueInvition] = useState("");
  const [openInvition, setOpenInvition] = useState(false);
  const [loading, setloading] = useState(false);

  useEffect(() => {
    if (getDataInLocalstorage("member_national_id"))
      dispatch({
        type: actionTypes.profileAsync,
        national_id: getDataInLocalstorage("member_national_id")
      });
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (profile[0]) {
      let url = genareLink();
      setlink(url);
    }
  }, [profile]); //eslint-disable-line react-hooks/exhaustive-deps

  const handleLogOut = () => {
    dispatch({ type: actionTypesAuth.Logout });
  };

  const handleSubmitInvitation = () => {
    let regex = regex_email;

    if (!valueInvition) {
      dispatch({
        type: actionTypesNotif.warning,
        textAlert: "ایمیل مورد نظر را وارد نمایید."
      });
      return;
    }

    let flag = valueInvition.match(regex);

    if (!flag) {
      dispatch({
        type: actionTypesNotif.warning,
        textAlert: "ایمیل را با فرمت مناسبی وارد نمایید"
      });
      return;
    }

    let payload = {
      data: {
        receiver_email: valueInvition
      }
    };

    setloading(true);

    insertInvitationLink(payload)
      .then(res => {
        setloading(false);
        handleNotificationAlertTryUpdate(res);
        setOpenInvition(false);
      })
      .catch(err => {
        setloading(false);
        handleNotificationAlertCatch();
        setOpenInvition(false);
      });
  };

  const handleCopyLink = () => {
    var copyText = document.getElementById("linkUserInProfile");

    /* Select the text field */
    copyText.select();
    copyText.setSelectionRange(0, 99999); /* For mobile devices */

    /* Copy the text inside the text field */
    document.execCommand("copy");
    dispatch({
      type: actionTypesNotif.success,
      textAlert: "متن کپی شد"
    });

    /* Alert the copied text */
    // alert("Copied the text: " + copyText.value);
  };

  const FindRoll = key => {
    switch (key) {
      case "ADMIN":
        return "ادمین";
      case "OPERATOR":
        return "اپراتور";
      case "MEMBER":
        return "کاربر عادی";
      default:
        break;
    }
  };

  let member_automation_id = getDataInLocalstorage("member_automation_id");

  const genareLink = () => {
    if (!profile[0]) {
      return;
    }

    let refCode = profile[0].body.ref_code;

    let protocol = window.location.protocol;
    let hostName = window.location.hostname;

    if (!protocol || !hostName || hostName === "localhost") {
      //   return `http://clubadmin.mobinsb.net:${getRandomNumber(7004,7040)}/GradDB/V1/`
      return `http://psrdev.gradientdp.com/auth/registration?ref_code=${refCode}`;
    }

    return `${protocol}//${hostName}/auth/registration?ref_code=${refCode}`;
  };

  return (
    <>
      {profile.length > 0 && (
        <div
          className="flex-row-auto w-lg-250px w-xxl-350px mb-4 mb-lg-0"
          id="kt_profile_aside"
        >
          <div className="card card-custom card-stretch">
            {/* begin::Body */}
            <div className="card-body pt-4">
              {/* begin::Toolbar */}
              <div className="d-flex justify-content-end">
                <Dropdown className="dropdown dropdown-inline" alignRight>
                  <Dropdown.Menu className="dropdown-menu dropdown-menu-sm dropdown-menu-right">
                    <DropdownMenu4></DropdownMenu4>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
              {/* end::Toolbar */}
              {/* begin::User */}
              <div className="d-flex align-items-center">
                <div className="symbol symbol-60 symbol-xxl-100 mr-5 align-self-start align-self-xxl-center">
                  {profile[0] && (
                    <div
                      className="symbol-label"
                      // style={{ backgroundImage: `url(${user.pic})` }}
                      style={{
                        backgroundImage: `url('${
                          profile[0]?.body.profile_picture
                            ? profile[0].body.profile_picture
                            : toAbsoluteUrl("/media/common/Avatar.png")
                        }')`
                      }}
                    ></div>
                  )}
                  {/* style="background-i
                  mage:url('/metronic/theme/html/demo1/dist/assets/media/users/300_21.jpg')" */}
                  <i className="symbol-badge bg-success"></i>
                </div>
                <div>
                  <span className="font-weight-bolder font-size-h5 text-dark-75 text-hover-primary">
                    {profile[0]?.body.first_name} {profile[0]?.body.last_name}
                  </span>
                  <div className="text-muted">
                    {FindRoll(profile[0]?.body.category)}
                  </div>
                  <div className="mt-2">
                    {/* <p
                      // to="/user-profile/personal-edit"
                      className="btn btn-sm btn-success font-weight-bold mr-2 py-2 px-3 px-xxl-5 my-1"
                      onClick={() => handleChekCustomer()}
                    >
                      بروزرسانی اطلاعات
                    </p> */}
                    {/* {!member_automation_id && (
                      <a
                        href={"https://reg.pishrobroker.ir/"}
                        target={"_black"}
                      >
                        <p
                          // to="/user-profile/personal-edit"
                          className="btn btn-sm btn-success font-weight-bold mr-2 py-2 px-3 px-xxl-5 my-1"
                          // onClick={() => handleChekCustomer()}
                        >
                          تکمیل ثبت نام
                        </p>
                      </a>
                    )} */}
                    {/* {member_automation_id === "null" && (
                      <a
                        href={"https://reg.pishrobroker.ir/"}
                        target={"_black"}
                      >
                        <p
                          // to="/user-profile/personal-edit"
                          className="btn btn-sm btn-success font-weight-bold mr-2 py-2 px-3 px-xxl-5 my-1"
                          // onClick={() => handleChekCustomer()}
                        >
                          تکمیل ثبت نام
                        </p>
                      </a>
                    )} */}

                    <CustomerRegistration
                      open={open}
                      setOpen={setOpen}
                      profile={profile}
                    />

                    <button
                      className="btn btn-sm btn-danger font-weight-bold py-2 px-3 px-xxl-5 my-1"
                      onClick={handleLogOut}
                    >
                      خروج
                    </button>
                  </div>
                </div>
              </div>
              {/* end::User */}

              {/* begin::Contact */}
              <div className="py-9">
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <span className="font-weight-bold mr-2">نام کاربری : </span>
                  <span className="text-muted text-hover-primary">
                    {profile[0]?.body.first_name} {profile[0]?.body.last_name}
                  </span>
                </div>
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <span className="font-weight-bold mr-2">تلفن همراه : </span>
                  <span className="text-muted">
                    {/*{!profile[0]?.body.phone === "null"*/}
                    {/*  ? profile[0]?.body.phone*/}
                    {/*  : "-"}*/}
                    {profile[0]?.body.phone === "null"
                      ? "-"
                      : profile[0]?.body.phone}
                  </span>
                </div>
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <span className="font-weight-bold mr-2">ایمیل:</span>
                  <span className="text-muted">{profile[0]?.body.email}</span>
                </div>
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <span className="font-weight-bold mr-2">شناسه باشگاه:</span>
                  <span className="text-muted">
                    {profile[0]?.body.automation_club_id}
                  </span>
                </div>
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <span className="font-weight-bold mr-2">کد معرفی:</span>
                  <span className="text-muted">
                    {profile[0]?.body.ref_code}
                  </span>
                </div>
              </div>
              {/* end::Contact */}
              {/* begin::Nav */}
              <div className="navi navi-bold navi-hover navi-active navi-link-rounded">
              <div className="navi-item mb-2">
                  <NavLink
                    to="/user-profile/profile-overview"
                    className="navi-link py-4"
                    activeClassName="active"
                  >
                    <span className="navi-icon mr-2">
                      <span className="svg-icon">
                        <SVG
                          src={toAbsoluteUrl(
                            "/media/svg/icons/Home/Home.svg"
                          )}
                        ></SVG>{" "}
                      </span>
                    </span>
                    <span className="navi-text font-size-lg">وضعیت من</span>
                  </NavLink>
                </div>

                <div className="navi-item mb-2">
                  <NavLink
                    to="/user-profile/personal-information"
                    className="navi-link py-4"
                    activeClassName="active"
                  >
                    <span className="navi-icon mr-2">
                      <span className="svg-icon">
                        <SVG
                          src={toAbsoluteUrl(
                            "/media/svg/icons/General/User.svg"
                          )}
                        ></SVG>{" "}
                      </span>
                    </span>
                    <span className="navi-text font-size-lg">اطلاعات شخصی</span>
                  </NavLink>
                </div>

                <div className="navi-item mb-2">
                  <NavLink
                    to="/user-profile/change-password"
                    className="navi-link py-4"
                    activeClassName="active"
                  >
                    <span className="navi-icon mr-2">
                      <span className="svg-icon">
                        <SVG
                          src={toAbsoluteUrl(
                            "/media/svg/icons/Communication/Shield-user.svg"
                          )}
                        ></SVG>{" "}
                      </span>
                    </span>

                    <span className="navi-text font-size-lg">
                      تغییر کلمه عبور
                    </span>
                    {/* <span className="navi-label">
                      <span className="label label-light-danger label-rounded font-weight-bold">
                        5
                      </span>
                    </span> */}
                  </NavLink>
                </div>
              </div>
              {/* end::Nav */}

              <div className="rounded border border-light mt-4 p-5">
                <p className="text-secondary text-center">
                  دوستان خود را با ارسال این لینک، به عضویت در باشگاه دعوت کنید.
                  لینک دعوتنامه
                </p>

                <div className="text-center">
                  <input
                    type="text"
                    className=" border-0 p-2 w-100 text-center"
                    // value="http://club.mobinsb.com"
                    value={link}
                    id="linkUserInProfile"
                    onChange={() => null}
                    style={{ color: "#ff5f00" }}
                  />
                </div>

                <div className="mt-3">
                  <button
                    className="btn btn-sm backGroundOrange font-weight-bold mr-2 py-2 px-3 px-xxl-5 my-1"
                    onClick={handleCopyLink}
                  >
                    کپی لینک
                  </button>

                  <button
                    className="btn btn-sm btnColorSuccess font-weight-bol d py-2 px-3 px-xxl-5 my-1"
                    onClick={() => setOpenInvition(true)}
                  >
                    ارسال دعوتنامه به دوستان
                  </button>

                  <ModalCustom open={openInvition} setOpen={setOpenInvition}>
                    <div style={{ minWidth: 500 }}>
                      <h5 className="pt-2 pb-2">ارسال دعوتنامه</h5>

                      <Divider />

                      <Box className="mt-4 mb-4" width="270px">
                        <TextField
                          id="outlined-name"
                          label="آدرس پست الکترونیکی"
                          value={valueInvition}
                          onChange={e => setValueInvition(e.target.value)}
                          margin="normal"
                          variant="outlined"
                          required
                        />
                      </Box>

                      <div className="pt-5 float-right d-flex">
                        {loading && (
                          <div>
                            <CircularProgress
                              style={{ width: 30, marginLeft: 15 }}
                            />
                          </div>
                        )}
                        {!loading && (
                          <button
                            className="btn btn-sm btn-success font-weight-bold py-2 px-3 px-xxl-5 my-1 mr-2"
                            onClick={handleSubmitInvitation}
                          >
                            ارسال
                          </button>
                        )}

                        <button
                          className="btn btn-sm btn-danger font-weight-bold py-2 px-3 px-xxl-5 my-1"
                          onClick={() => setOpenInvition(false)}
                        >
                          خروج
                        </button>
                      </div>
                    </div>
                  </ModalCustom>
                </div>
              </div>
            </div>
            {/* end::Body */}
          </div>
        </div>
      )}
    </>
  );
}
