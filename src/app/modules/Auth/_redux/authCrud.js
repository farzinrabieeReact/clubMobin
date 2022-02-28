import axios from "axios";
import AxiosCustom from "./../../../common/components/apiConfig";
export const LOGIN_URL = `${process.env.REACT_APP_API_URL}/auth/login`;
export const REGISTER_URL = "api/auth/register";
export const REQUEST_PASSWORD_URL = "api/auth/forgot-password";
export const ME_URL = `${process.env.REACT_APP_API_URL}/auth/me`;

export function login(national_id, password) {
  let config = {
    url: "login"
  };

  let data = {
    table: "login",
    method_type: "login",
    token: null,
    member_id: null,
    data: {
      user: national_id,
      pass: password
    }
  };

  return AxiosCustom(config, data);
}

export function getCaptch() {
  let config = {
    url: "login"
  };

  let data = {
    table: "clubmember",
    method_type: "get_captcha",
    token: null,
    member_id: null,
    data: {}
  };

  return AxiosCustom(config, data);
}

export function captchValidation(captcha_id, captcha_value) {
  let config = {
    url: "login"
  };

  let data = {
    table: "clubmember",
    method_type: "get_captcha_validation",
    token: null,
    member_id: null,
    data: {
      captcha_id,
      captcha_value
    }
  };

  return AxiosCustom(config, data);
}

export function register(_data) {
  let config = {
    url: "insert_request"
  };

  let data = {
    table: "clubmember",
    method_type: "member_inquiry",
    token: "3cf61fab-b50a-410f-9d59-3357ee4706fe",
    member_id: "_0zehXYBdxxYGfkX5_wd",
    data: _data
  };

  return AxiosCustom(config, data);
}

export function registerPass(_data) {
  let config = {
    url: "update_request"
  };

  let data = {
    table: "clubmember",
    method_type: "new_registration",
    token: "3cf61fab-b50a-410f-9d59-3357ee4706fe",
    member_id: "_0zehXYBdxxYGfkX5_wd",
    data: _data
  };

  return AxiosCustom(config, data);
}

export function registerOtp(_data) {
  let config = {
    url: "update_request"
  };

  let data = {
    table: "clubmember",
    method_type: "new_confirm_registration",
    token: "3cf61fab-b50a-410f-9d59-3357ee4706fe",
    member_id: "_0zehXYBdxxYGfkX5_wd",
    data: _data
  };

  return AxiosCustom(config, data);
}

export function registerkycOtp(_data) {
  let config = {
    url: "insert_request"
  };

  let data = {
    table: "clubmember",
    method_type: "send_kyc_otp",
    token: "3cf61fab-b50a-410f-9d59-3357ee4706fe",
    member_id: "_0zehXYBdxxYGfkX5_wd",
    data: _data
  };

  return AxiosCustom(config, data);
}

export function registerkycProfile(_data) {
  let config = {
    url: "select_request"
  };

  let data = {
    table: "clubmember",
    method_type: "get_kyc_profile",
    token: "3cf61fab-b50a-410f-9d59-3357ee4706fe",
    member_id: "_0zehXYBdxxYGfkX5_wd",
    data: _data
  };

  return AxiosCustom(config, data);
}

export function forgotPasswordLink(national_id, needs_sms) {
  let config = {
    url: "login"
  };

  let data = {
    method_type: "forgot_password_link",
    data: {
      national_id: national_id,
      needs_sms: needs_sms
    }
  };

  return AxiosCustom(config, data);
}

export function ChangePassword(member_id, old_password, new_password) {
  let config = {
    url: "update_request"
  };

  let data = {
    table: "clubmember",
    method_type: "change_password",
    data: {
      member_id,
      old_password,
      new_password
    }
  };

  return AxiosCustom(config, data);
}

export function updateProfile(item) {
  let config = {
    url: "update_request"
  };

  let data = {
    table: "clubmember",
    method_type: "update",
    data: item
  };

  return AxiosCustom(config, data);
}

export function registerLevel1(
 { national_id,
  phone,
  // email,
  introducing_member_national_id,
  is_individual}
) {
  let config = {
    url: "insert_request"
  };

  let otherData = {
    first_name: null,
    last_name: null,
    permission_level: null,
    automation_id: null,
    gender: null,
    introducing_member_id: null,
    introducing_member_automation_id: null,
    category: null,
    user: null,
    pass_salt: null,
    pass_hash: null,
    bourse_code: null,
    energy_bourse_code: null,
    kala_bourse_code: null,
    ati_bourse_code: null,
    available_bonus: null,
    reserved_bonus: null,
    registration_date: null,
    profile_picture: null,
    automation_club_id: null,
    introducing_member_automation_club_id: null,
    is_active: null,
    birth_date: null,
    permitted_methods: null
  };

  let data = {
    table: "clubmember",
    method_type: "register",
    data: {
      national_id,
      phone,
      // email,
      introducing_member_national_id: introducing_member_national_id
        ? introducing_member_national_id
        : null,
      is_individual,
      ...otherData
    },
    token: "3cf61fab-b50a-410f-9d59-3357ee4706fe"
  };

  return AxiosCustom(config, data);
  // return axios.post(REGISTER_URL, { email, fullname, username, password });
}

export function registerLevel2({national_id, confirmation_token}) {
  let config = {
    url: "update_request"
  };

  let data = {
    table: "clubmember",
    method_type: "confirm_registration",
    data: {
      national_id,
      confirmation_token
    }
  };

  return AxiosCustom(config, data);
  // return axios.post(REGISTER_URL, { email, fullname, username, password });
}

export function registerLevel3(newData) {
  let config = {
    url: "update_request"
  };

  let otherData = {
    profile_picture: null,
    // "birth_date": null,
    permission_level: null,
    automation_id: null,
    is_individual: null,
    introducing_member_id: null,
    introducing_member_national_id: null,
    introducing_member_automation_id: null,
    category: null,
    bourse_code: null,
    energy_bourse_code: null,
    kala_bourse_code: null,
    ati_bourse_code: null,
    available_bonus: null,
    reserved_bonus: null,
    registration_date: null,
    automation_club_id: null,
    introducing_member_automation_club_id: null,
    is_active: null,
    "account-code": null,
    permitted_methods: null
  };

  let data = {
    table: "clubmember",
    method_type: "finalize_registration",
    data: {
      ...otherData,
      ...newData
    }
  };

  return AxiosCustom(config, data);
  // return axios.post(REGISTER_URL, { email, fullname, username, password });
}

export function forgetPasswordLevel1(item) {
  let config = {
    url: "login"
  };

  let data = {
    method_type: "forgot_password_link",
    data: {
      ...item
    }
  };

  return AxiosCustom(config, data);
}

export function forgetPasswordLevel2(item) {
  let config = {
    url: "login"
  };

  let data = {
    method_type: "forgot_password_change",
    data: {
      ...item
    }
  };

  return AxiosCustom(config, data);
}

// export function requestPassword(email) {
//   return axios.post(REQUEST_PASSWORD_URL, { email });
// }

export function getUserByToken() {
  // Authorization head should be fulfilled in interceptor.
  return axios.get(ME_URL);
}
