import {
  actionTypes,
  actionTypes as actionTypesNotif
} from "./../../../../redux/notificationAlert";
import store from "./../../../../redux/store";

import { EMPTYALLREDUCERS } from "../../../../redux/type";
import { actionTypes as actionTypesLogout } from "../../../modules/Auth/_redux/authRedux";

export function handleNotificationAlertTryUpdate(item) {
  const { dispatch } = store;

  if (item?.data?.response?.is_successful) {
    dispatch({ type: actionTypesNotif.success });
    return true;
  } else if (item.data?.error === "INVALID INPUT token: Not Authorized") {
    dispatch({
      type: actionTypesNotif.error,
      textAlert: "زمان ورود شما به پایان رسید، لطفا دوباره لاگین کنید."
    });
    dispatch({ type: EMPTYALLREDUCERS });
    dispatch({ type: actionTypesLogout.Logout });
    return false;
  } else if (item.status !== 200) {
    dispatch({
      type: actionTypesNotif.error,
      textAlert: "ارتباط با سرور قطع می باشد"
    });
    return false;
  } else if (item.data.status !== 200) {
    dispatch({
      type: actionTypesNotif.error,
      textAlert: "ارتباط با سرور قطع می باشد."
    });
    return false;
  }
  else if (!item?.data?.response?.is_successful) {
    let textError = handelError(item.data.response.error_code)
    dispatch({
      type: actionTypes.warning,
      textAlert: textError
    });
    return false;
  }

  else {
    dispatch({ type: actionTypesNotif.error });
    return false;
  }
}



export function handleNotificationAlertCatch() {
  const { dispatch } = store;
  dispatch({
    type: actionTypesNotif.error,
    textAlert: "ارتباط با سرور قطع می باشد"
  });
}

export function handleNotificationAlertTrySelect(item) {
  const { dispatch } = store;

  if (item?.data?.response?.is_successful) {
    return true;
  } else if (item.status !== 200) {
    dispatch({
      type: actionTypesNotif.error,
      textAlert: "ارتباط با سرور قطع می باشد."
    });
    return false;
  } else if (item.data.error === "INVALID INPUT token: Not Authorized") {
    dispatch({
      type: actionTypesNotif.error,
      textAlert: "زمان ورود شما به پایان رسید، لطفا دوباره لاگین کنید."
    });
    dispatch({ type: EMPTYALLREDUCERS });
    dispatch({ type: actionTypesLogout.Logout });
    return false;
  } else if (item.data.status !== 200) {
    dispatch({
      type: actionTypesNotif.error,
      textAlert: "ارتباط با سرور قطع می باشد."
    });

    return false;
  }
  else if (!item?.data?.response?.is_successful) {
    let textError = handelError(item.data.response.error_code)
    dispatch({
      type: actionTypes.warning,
      textAlert: textError
    });
    return false;
  }
  else{
    return false;
  }

}




const handelError = (value) => {
  switch (value) {
    /////////////---->700
    case 701:
      return "اجازه انجام عملیات را ندارید."
    case 601:
      return "مقادیر ارسالی پارامترها معتبر نیستند."
    case 401:
      return "خطای عمومی"
    case 801:
      return "عدم رعایت وابستگی ها"
    case 602:
      return "یک فیلد اجباری ارسال نشده است."
    case 603:
      return "مقدار یکی از فیلدهای ارسالی معتبر نیست."
    case 604:
      return "نام یکی از فیلدهای ارسالی معتبر نیست."
    case 605:
      return "کاربر مورد نظر یافت نشد"
    case 901:
      return "فروم مورد نظر یافت نشد."
    case 107101:
      return "سفارش با وضعیت کنسل شده قابل ثبت نیست"
    case 102101:
      return "امتیاز کاربر برای انجام عملیات کافی نیست"
    case 102201:
      return "امکان ویرایش مقادیر امتیاز وجود ندارد."
    case 103101:
      return "ظرفیت مسابقه تکمیل شده است."
    case 103201:
      return "امکان ویرایش مسابقه وجود ند "
    case 103301:
      return "امکان نهاییسازی مسابقه وج ود ندا رد."
    case 103401:
      return "شما قبلا در این مسابقه ثبت نام کردهاید."
    case 104101:
      return "وضعیت پیام معتبر نیست."
    case 101101:
      return "ظرفیت دوره به پایان رسیده است."
    case 101201:
      return "عدم امکان ویرایش دوره"
    case 101301:
      return "شما قبلا در این دوره ثبت نام کرده اید."
    case 101401:
      return "وضعیت ثبت نام در دوره نامعتبر است."
    case 102301:
      return "امکان رزرو امتیاز وجود ندارد."
    case 102401:
      return "مکان رولبک امتیاز وجود ندارد."
    case 102501:
      return "امکان نهاییسازی امتیاز وجود ندارد."
    case 102601:
      return "امکان لغو امتیاز وجود ندارد."
    case 105101:
      return "امکان ویرایش امتیاز وجود ندارد."
    case 105201:
      return "تصویر پروفایل بزرگتر از حد مجاز است."
    case 105501:
      return "کد ملی اشتباه است"
    case 110104:
      return "شما قبلا ثبت نام کرده اید"
    case 110301:
      return "این درخواست قبلا لغو شده است"
    case 109301:
      return "عضو قبلاً درخواست تغییر کارگزار مشابهی را ارسال کرده است."
    case 105804:
      return "کد تایید را به درستی وارد کنید"
    case 105805:
      return "در حال حاضر دسترسی به سامانه امکان‌پذیر نیست. لطفا بعدا تلاش فرمایید"
    case 101501:
      return "مهلت ثبت نام این دوره تمام شده است"
    case 110101:
      return "زمان ثبت نام این عرضه شروع نشده است"
    case 110102:
      return "زمان ثبت نام این عرضه شروع نشده است"
    default:
      return "به دلایل نامشخص انجام نشد.";
  }
}