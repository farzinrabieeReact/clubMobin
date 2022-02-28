import React, { useState, useEffect } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  makeStyles,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel
} from "@material-ui/core";

import {
  dateConvertMiladiToShamsi,
  getNameDays
} from "../../../../common/method/date";
import { useDispatch, useSelector } from "react-redux";
import { stockInsertPayment } from "./../../../../../redux/market/stock/stock_insert_payment";
import {
  handleNotificationAlertTryUpdate,
  handleNotificationAlertCatch
} from "../../../../common/method/handleNotificationAlert";
import { actionTypes } from "./../../../../../redux/market/stock/stock_select_payment_info";
import { actionTypes as actionAlert } from "./../../../../../redux/notificationAlert";
import { actionTypes as actionTypesDetails } from "./../../../../../redux/market/stock/stock_select_payment_details";

let useStyles = makeStyles({
  accounts: {
    width: "70%"
  }
});

export default function Index() {
  let classes = useStyles();
  const dispatch = useDispatch();

  const [date, setDate] = useState(null);
  const [amount, setAmount] = useState("");
  const [account, setAccounts] = useState({ Id: "", Description: "" });
  const [accountsPyement, setAccountsPyement] = useState([]);

  const paymentInfo = useSelector(state => state.reducerStockPaymentInfo);

  useEffect(() => {
    dispatch({ type: actionTypes.StockPaymentInfoAsync });
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (paymentInfo.data) {
      setAccountsPyement(paymentInfo.data[0]);
    }
  }, [paymentInfo.data]);

  const apiInsertPayment = () => {
    if (!accountsPyement) {
      dispatch({
        type: actionAlert.info,
        textAlert: "سرویس مورد نظر در حال حاضر در دسترس نمی باشد"
      });
      return;
    }

    if (
      !amount ||
      amount <= 0 ||
      amount > accountsPyement.body.PardakhtDays[0].Value
    ) {
      dispatch({
        type: actionAlert.info,
        textAlert: "لطفا مبلغ را به درستی وارد نمایید"
      });
      return;
    }

    if (!account.Id) {
      dispatch({
        type: actionAlert.info,
        textAlert: "لطفا شماره حساب خود را وارد نمایید"
      });
      return;
    }

    if (!date) {
      dispatch({
        type: actionAlert.info,
        textAlert: "لطفا تاریخ خود را وارد نمایید"
      });
      return;
    }

    let data = {
      amount: +amount,
      date: date.Date,
      account_id: account.Id
    };

    stockInsertPayment(data)
      .then(res => {
        let resOk = handleNotificationAlertTryUpdate(res);
        if (resOk) {
          dispatch({
            type: actionTypesDetails.StockPaymentDetailsAsync
          });
        }
      })
      .catch(() => {
        handleNotificationAlertCatch();
      });
  };

  // if (!accountsPyement) {
  //   return null;
  // }

  return (
    <div>
      {/*<div className={'w-100 d-flex justify-content-between align-items-center'}>*/}
      {/*    <div className={'w-50'}>*/}
      {/*        <div className={'mt-5 w-50'}>*/}
      {/*            <TextField*/}
      {/*                variant="outlined"*/}
      {/*                className={'w-100'}*/}
      {/*                label={'مبلغ درخواستی:'}*/}
      {/*                type="text"*/}
      {/*                value={amount}*/}
      {/*                onChange={(event) => setAmount(event.target.value)}*/}
      {/*            />*/}
      {/*        </div>*/}
      {/*        <div className={`${classes['accounts']} mt-5`}>*/}

      {/*            <FormControl variant="outlined" fullWidth  >*/}
      {/*                <InputLabel id="demo-simple-select-outlined-label-newpost-subgroup_name">شماره حساب مقصد</InputLabel>*/}
      {/*                <Select*/}
      {/*                    labelId="demo-simple-select-outlined-label-newpost-subgroup_name"*/}
      {/*                    id="demo-simple-select-outlined-newpost-subgroup_name"*/}
      {/*                    label="شماره حساب مقصد"*/}
      {/*                    value={account.Description}*/}
      {/*                >*/}
      {/*                    {*/}
      {/*                        accountsPyement?.body?.BankAccounts*/}
      {/*                            .map((item, index) => {*/}
      {/*                                return (*/}
      {/*                                    <MenuItem key={index} value={item.Description} onClick={() => setAccounts(item)} >{item.Description}</MenuItem>*/}
      {/*                                )*/}
      {/*                            })*/}
      {/*                    }*/}
      {/*                </Select>*/}
      {/*            </FormControl>*/}
      {/*        </div>*/}
      {/*        <div>*/}
      {/*            <button className={'btn btn-success mt-5'} onClick={() => apiInsertPayment()}>ثبت درخواست</button>*/}
      {/*        </div>*/}
      {/*    </div>*/}
      {/*    <div className={'w-50'}>*/}
      {/*        <div className={'w-50 mt-5 shadow p-5'}>*/}
      {/*            <FormControl component="fieldset">*/}
      {/*                <FormLabel component="legend" className={'mb-5'}>انتخاب روز:</FormLabel>*/}
      {/*                <RadioGroup aria-label="gender" name="gender1" >*/}
      {/*                    {*/}
      {/*                        accountsPyement?.body?.PardakhtDays*/}
      {/*                            .map((item, index) => {*/}
      {/*                                return (*/}
      {/*                                    <div key={index} className={'d-flex  align-items-center'} onClick={() => setDate(item)}>*/}
      {/*                                        <FormControlLabel value={item.Date.split('T')[0]} control={<Radio />} />*/}
      {/*                                        <div className={'d-flex align-items-center'}>*/}
      {/*                                            <p className={'mr-5'} style={{ width: 50 }}>{getNameDays(item.Date.split('T')[0])}</p>*/}
      {/*                                            <div className={'ml-2'}>*/}
      {/*                                                <p>{dateConvertMiladiToShamsi(item.Date.split('T')[0])}</p>*/}
      {/*                                                <p>{item.Value}</p>*/}
      {/*                                            </div>*/}
      {/*                                        </div>*/}
      {/*                                    </div>*/}
      {/*                                )*/}
      {/*                            })*/}
      {/*                    }*/}
      {/*                </RadioGroup>*/}
      {/*            </FormControl>*/}
      {/*        </div>*/}
      {/*    </div>*/}
      {/*</div>*/}
      <div className={"row justify-content-between align-items-center"}>
        <div className={"col-12 col-md-6"}>
          <div className={"mt-5 w-50"}>
            <TextField
              variant="outlined"
              className={"w-100"}
              label={"مبلغ درخواستی:"}
              type="text"
              value={amount}
              onChange={event => setAmount(event.target.value)}
            />
          </div>
          <div className={`${classes["accounts"]} mt-5`}>
            <FormControl variant="outlined" fullWidth>
              <InputLabel id="demo-simple-select-outlined-label-newpost-subgroup_name">
                شماره حساب مقصد
              </InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label-newpost-subgroup_name"
                id="demo-simple-select-outlined-newpost-subgroup_name"
                label="شماره حساب مقصد"
                value={account.Description}
              >
                {accountsPyement?.body?.BankAccounts.map((item, index) => {
                  return (
                    <MenuItem
                      key={index}
                      value={item.Description}
                      onClick={() => setAccounts(item)}
                    >
                      {item.Description}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </div>
          <div>
            <button
              className={"btn backGroundOrange  mt-5"}
              onClick={() => apiInsertPayment()}
            >
              ثبت درخواست
            </button>
          </div>
        </div>
        <div className={"col-12 col-md-6"}>
          <div className={"w-100 mt-5 shadow p-5 rounded"}>
            <FormControl component="fieldset">
              <FormLabel component="legend" className={"mb-5"}>
                انتخاب روز:
              </FormLabel>
              <RadioGroup aria-label="gender" name="gender1">
                {accountsPyement?.body?.PardakhtDays.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className={"d-flex  align-items-center"}
                      onClick={() => setDate(item)}
                    >
                      <FormControlLabel
                        value={item.Date.split("T")[0]}
                        control={<Radio />}
                      />
                      <div className={"d-flex align-items-center"}>
                        <p className={"mr-5"} style={{ width: 50 }}>
                          {getNameDays(item.Date.split("T")[0])}
                        </p>
                        <div className={"ml-2"}>
                          <p>
                            {dateConvertMiladiToShamsi(item.Date.split("T")[0])}
                          </p>
                          <p>{item.Value}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </RadioGroup>
            </FormControl>
          </div>
        </div>
      </div>
    </div>
  );
}
