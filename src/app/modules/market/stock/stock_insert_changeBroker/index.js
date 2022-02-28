import React from "react";
import * as Yup from "yup";
import { useIntl, FormattedMessage } from "react-intl";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";

import Symbol from "./../../../../modules/market/stock/stock_select_symbol";
import { Box } from "@material-ui/core";
import CardFile from "../../../../common/components/base64Images";
import { changeBrokerStock } from "./../../../../../redux/market/stock/stock_insert_changeBroker";
import {
  handleNotificationAlertCatch,
  handleNotificationAlertTryUpdate
} from "./../../../../common/method/handleNotificationAlert";
import { actionTypes } from "./../../../../../redux/market/stock/stock_select_changeBroker";

export default function Index() {
  const intl = useIntl();
  const dispatch = useDispatch();

  let initialValues = {
    isin: null,
    file: ""
  };

  let validateShcama = Yup.object().shape({
    isin: Yup.string().required(
      intl.formatMessage({
        id: "AUTH.VALIDATION.REQUIRED_FIELD"
      })
    )
  });

  let Submit = (values, { setSubmitting, resetForm }) => {
    let data = {
      automation_change_broker_id: null,
      member_id: null,
      national_id: null,
      isin: values.isin.body.isin,
      state: null,
      description: null,
      file: values.file.file ? values.file.file : null,
      file_type: values.file.file_type ? values.file.file_type : null,
      file_name: null,
      cancel_type: null,
      request_date: null
    };

    changeBrokerStock(data)
      .then(res => {
        let resOk = handleNotificationAlertTryUpdate(res);
        if (resOk) {
          dispatch({
            type: actionTypes.StockChangeBrokerAsync
          });
          resetForm(values);
        }
      })
      .catch(() => {
        handleNotificationAlertCatch();
      });
  };

  const formik = useFormik({
    initialValues,
    validationSchema: validateShcama,
    onSubmit: Submit
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <Box className={"mt-3"}>
          <Symbol
            value={formik.values.isin}
            setValue={data => formik.setFieldValue("isin", data)}
          />
          {formik.touched.isin && formik.errors.isin && (
            <div className={"text-danger"}>
              <FormattedMessage id="AUTH.VALIDATION.REQUIRED_FIELD" />
            </div>
          )}
        </Box>

        <CardFile
          value={formik.values.file}
          setValues={data => formik.setFieldValue("file", data)}
        />

        <div className={"mt-5"}>
          <button type="submit" className={"btn   backGroundOrange"}>
            ثبت درخواست
          </button>
        </div>
      </form>
    </div>
  );
}
