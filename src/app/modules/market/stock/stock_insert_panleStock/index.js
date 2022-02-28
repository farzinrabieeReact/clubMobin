import React from "react";
import * as Yup from "yup";
import { useIntl, FormattedMessage } from "react-intl";
import { useFormik } from "formik";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField
} from "@material-ui/core";
import InputAdornment from "@material-ui/core/InputAdornment";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import StockReamin from "../stock_select_remain";
import StockSymbol from "../stock_select_symbol";
import { registerOfflineOrder } from "../../../../../redux/market/stock/stock_insert_offlineOrder";
import DatePicker from "../../../../common/components/DatePicker";
import { convertDigitToEnglish } from "../../../../common/method/convertDigitToEnglish";
import {
  handleNotificationAlertTryUpdate,
  handleNotificationAlertCatch
} from "../../../../common/method/handleNotificationAlert";
import { actionTypes } from "../../../../../redux/market/stock/stock_select_offlineOrders";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
const today = new Date();
const tomorrow = new Date(today);
tomorrow.setDate(tomorrow.getDate() + 1);

let getTimeFormat = date => {
  var dd = String(date.getDate()).padStart(2, "0");
  var mm = String(date.getMonth() + 1).padStart(2, "0");
  var yyyy = date.getFullYear();

  return `${yyyy}/${mm}/${dd} 00:00:00.000000`;
};

export default function Index() {
  const intl = useIntl();
  let dispatch = useDispatch();
  let { push } = useHistory();
  let time = today.getHours();

  // console.log("datetomorrow", datetomorrow)

  let initialValues = {
    limit_price: "",
    side: "BUY",
    price: "",
    quantity: "",
    isin: null,
    validity_date: time < 12 ? today : tomorrow
  };

  let validateShcama = Yup.object().shape({
    price: Yup.string().required(
      intl.formatMessage({
        id: "AUTH.VALIDATION.REQUIRED_FIELD"
      })
    ),
    limit_price: Yup.string().required(
      intl.formatMessage({
        id: "AUTH.VALIDATION.REQUIRED_FIELD"
      })
    ),
    side: Yup.string().required(
      intl.formatMessage({
        id: "AUTH.VALIDATION.REQUIRED_FIELD"
      })
    ),
    quantity: Yup.string().required(
      intl.formatMessage({
        id: "AUTH.VALIDATION.REQUIRED_FIELD"
      })
    ),
    isin: Yup.string().required(
      intl.formatMessage({
        id: "AUTH.VALIDATION.REQUIRED_FIELD"
      })
    ),
    validity_date: Yup.string().required(
      intl.formatMessage({
        id: "AUTH.VALIDATION.REQUIRED_FIELD"
      })
    )
  });

  let Submit = (values, { isSubmitting , resetForm }) => {
    isSubmitting = true;
    let data = {
      ...values,
      validity_date: values["validity_date"].format
        ? `${convertDigitToEnglish(
            values["validity_date"].format("YYYY/MM/DD")
          )} 00:00:00.000000`
        : getTimeFormat(values.validity_date),
      isin: values.isin.body.isin,
      automation_offline_order_id: null,
      member_id: null,
      national_id: null,
      state: null,
      cancel_type: null,
      description: null
    };

    registerOfflineOrder(data)
      .then(res => {
        let resOk = handleNotificationAlertTryUpdate(res);
        if (resOk) {
          dispatch({
            type: actionTypes.stockOfflineOrdersAsync
          });
          resetForm(values);
        }
      })
      .catch(() => {
        handleNotificationAlertCatch();
      })
      .finally(()=>{
        isSubmitting = false
      });
  };

  const formik = useFormik({
    initialValues,
    validationSchema: validateShcama,
    onSubmit: Submit
  });

  const handel_ls = data => {
    if (data)
      push({
        pathname: "/stock",
        state: {
          tabPanel: 0,
          isin: data.body.isin
        }
      });
    formik.setFieldValue("isin", data);
  };

  return (
    <div>
      <h3>ثبت سفارش</h3>
      <StockReamin />
      <div>
        <div className={"mt-3"}>
          <StockSymbol
            value={formik.values.isin}
            setValue={data => handel_ls(data)}
          />
          {formik.touched.isin && formik.errors.isin && (
            <div className={"text-danger"}>
              <FormattedMessage id="AUTH.VALIDATION.REQUIRED_FIELD" />
            </div>
          )}
        </div>
        <form onSubmit={formik.handleSubmit}>
          <div
            className={"mt-3 d-flex justify-content-between align-items-center"}
          >
            <div className={"w-50"}>
              <FormControl variant="outlined" fullWidth>
                <InputLabel id="demo-simple-select-outlined-label-newpost-subgroup_name">
                  نوع
                </InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label-newpost-subgroup_name"
                  id="demo-simple-select-outlined-newpost-subgroup_name"
                  label="نوع سفارش"
                  value={formik.values.side}
                >
                  <MenuItem
                    value={"BUY"}
                    onClick={() => formik.setFieldValue("side", "BUY")}
                  >
                    {"خرید"}
                  </MenuItem>
                  <MenuItem
                    value={"SELL"}
                    onClick={() => formik.setFieldValue("side", "SELL")}
                  >
                    {"فروش"}
                  </MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className={"w-50"}>
              <TextField
                variant="outlined"
                className={"w-100"}
                label={
                  formik.values.side === "BUY"
                    ? "حداکثر قیمت خرید"
                    : "حداکثر قیمت فروش"
                }
                type="text"
                value={formik.values.price}
                onChange={event =>
                  formik.setFieldValue("price", event.target.value)
                }
              />
            </div>
          </div>

          <div className={"d-flex justify-content-between align-items-center"}>
            <div className={"w-50"}>
              {formik.touched.side && formik.errors.side && (
                <div className={"text-danger"}>
                  <FormattedMessage id="AUTH.VALIDATION.REQUIRED_FIELD" />
                </div>
              )}
            </div>
            <div className={"w-50"}>
              {formik.touched.price && formik.errors.price && (
                <div className={"text-danger"}>
                  <FormattedMessage id="AUTH.VALIDATION.REQUIRED_FIELD" />
                </div>
              )}
            </div>
          </div>

          <div
            className={
              "mt-3 d-flex justify-content-between align-items-center "
            }
          >
            <div className={"w-50"}>
              <TextField
                variant="outlined"
                className={"w-100"}
                label={
                  formik.values.side === "BUY"
                    ? "مبلغ کلی خرید"
                    : "مبلغ کلی فروش"
                }
                type="text"
                value={formik.values.limit_price}
                onChange={event =>
                  formik.setFieldValue("limit_price", event.target.value)
                }
              />
            </div>
            <div className={"w-50"}>
              <TextField
                variant="outlined"
                className={"w-100"}
                label="تعداد"
                type="text"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="start">
                    </InputAdornment>
                  )
                }}
                value={formik.values.quantity}
                onChange={event =>
                  formik.setFieldValue("quantity", event.target.value)
                }
              />
            </div>
          </div>
          <div className={"d-flex justify-content-between align-items-center"}>
            <div className={"w-50"}>
              {formik.touched.limit_price && formik.errors.limit_price && (
                <div className={"text-danger"}>
                  <FormattedMessage id="AUTH.VALIDATION.REQUIRED_FIELD" />
                </div>
              )}
            </div>
            <div className={"w-50"}>
              {formik.touched.quantity && formik.errors.quantity && (
                <div className={"text-danger"}>
                  <FormattedMessage id="AUTH.VALIDATION.REQUIRED_FIELD" />
                </div>
              )}
            </div>
          </div>

          <div
            className={"d-flex justify-content-between align-items-center my-5"}
          >
            <div className={"w-50"}>
              <DatePicker
                label={"تاریخ اعتبار"}
                value={formik.values.validity_date}
                setValue={data => formik.setFieldValue("validity_date", data)}
              />

              {formik.touched.validity_date && formik.errors.validity_date && (
                <div className={"text-danger"}>
                  <FormattedMessage id="AUTH.VALIDATION.REQUIRED_FIELD" />
                </div>
              )}
            </div>
            <div className="mt-2">
              <button type="submit" className="btn backGroundOrange" disabled={formik.isSubmitting}>
                ثبت سفارش
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
