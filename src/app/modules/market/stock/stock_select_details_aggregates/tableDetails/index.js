/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid,jsx-a11y/img-redundant-alt */
import React, { useState, useEffect } from "react";
import { Box, makeStyles } from "@material-ui/core";
import { handleNumber } from "../../../../../common/method/displayData";
import { dateConvertMiladiToShamsi } from "./../../../../../common/method/date";
import { useDispatch } from "react-redux";
import CardNoData from "./../../../../../common/components/cardNoData";
import { actionTypes } from "./../../../../../../redux/market/stock_select_summaries";

let useStyles = makeStyles({
  root: {
    minWidth: 320
  },
  icon: {
    cursor: "pointer"
  }
});

export default function AdvanceTablesWidget4({
  data,
  isin,
  instrumentType,
  setEmpty
}) {
  let classes = useStyles();

  const dispatch = useDispatch();
  const [state, setState] = useState([]);

  useEffect(() => {
    if (data) setState(data);
  }, [data]);

  useEffect(() => {
    let getNameIsin = [];
    if (state.length) {
      state.forEach(item => {
        if (
          !isin[item.body.instrument_id] &&
          !getNameIsin.includes(item.body.instrument_id)
        )
          getNameIsin.push(item.body.instrument_id);
      });
    }
    getNameIsin.forEach(item => {
      dispatch({ type: actionTypes.stockListMoreAsync, payload: item });
    });
  }, [state]); //eslint-disable-line  react-hooks/exhaustive-deps

  useEffect(() => {
    return () => {
      setEmpty([]);
    };
  }, []); //eslint-disable-line  react-hooks/exhaustive-deps

  return (
    <div className={`card card-custom ${classes["root"]} rounded-lg`}>
      <div className="card-body p-0">
        <div className="tab-content">
          <div className="table-responsive">
            <table className="table table-head-custom table-head-bg table-borderless table-vertical-center table-striped">
              <thead>
                <tr className="text-center text-uppercase">
                  <th style={{ minWidth: "80px" }}>بازار</th>
                  <th style={{ minWidth: "80px" }}>شناسه نماد</th>
                  <th style={{ minWidth: "80px" }}>نوع معامله </th>
                  <th style={{ minWidth: "80px" }}>تعداد سهم </th>
                  <th style={{ minWidth: "80px" }}>ارزش معامله</th>
                  <th style={{ minWidth: "80px" }}>حداقل قیمت فروش</th>
                  <th style={{ minWidth: "80px" }}>حداکثر قیمت خرید</th>
                  <th style={{ minWidth: "80px" }}>تاریخ شروع </th>
                  <th style={{ minWidth: "80px" }}>تاریخ پایان</th>
                  <th style={{ minWidth: "80px" }}>نوع درخواست</th>
                  <th style={{ minWidth: "80px" }}>وضعیت درخواست</th>
                </tr>
              </thead>
              <tbody>
                {state.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td className={"text-center"}>
                        <p>
                          {instrumentType[item.body.instrument_type]
                            ? instrumentType[item.body.instrument_type]
                            : "-"}
                        </p>
                      </td>
                      <td className={"text-center"}>
                        <p>
                          {isin[item.body.instrument_id]
                            ? isin[item.body.instrument_id]
                            : item.body.instrument_id}
                        </p>
                      </td>
                      <td className={"text-center"}>
                        <p>
                          {item.body.trade_type === "1"
                            ? "خرید"
                            : item.body.trade_type === "2"
                            ? "فروش"
                            : "-"}
                        </p>
                      </td>
                      <td className={"text-center"}>
                        <p>{item.body.quantity}</p>
                      </td>
                      <td className={"text-center"}>
                        <p>{handleNumber(parseInt(item.body.value))}</p>
                      </td>
                      <td className={"text-center"}>
                        <p>
                          {item.body.trade_type === "2"
                            ? handleNumber(parseInt(item.body.price))
                            : 0}
                        </p>
                      </td>
                      <td className={"text-center"}>
                        <p>
                          {item.body.trade_type === "1"
                            ? handleNumber(parseInt(item.body.price))
                            : 0}
                        </p>
                      </td>
                      <td className={"text-center"}>
                        <p>
                          {item.body.start_date !== "null" &&
                          item.body.start_date
                            ? dateConvertMiladiToShamsi(
                                item.body.start_date.split(" ")[0]
                              )
                            : "-"}
                        </p>
                      </td>

                      <td className={"text-center"}>
                        <p>
                          {item.body.end_date !== "null" && item.body.end_date
                            ? dateConvertMiladiToShamsi(
                                item.body.end_date.split(" ")[0]
                              )
                            : "-"}
                        </p>
                      </td>
                      <td className={"text-center"}>
                        <p>
                          {item.body.start_date !== "null" &&
                          item.body.start_date &&
                          item.body.end_date !== "null" &&
                          item.body.end_date
                            ? item.body.start_date.split(" ")[0] ===
                              item.body.end_date.split(" ")[0]
                              ? "سفارش روز"
                              : "معتبر تا تاریخ"
                            : "-"}
                        </p>
                      </td>
                      <td className={"text-center"}>
                        <p>
                          {item.body.is_canceled
                            ? item.body.is_canceled.toUpperCase() === "FALSE"
                              ? "انجام شده"
                              : "لغو شده"
                            : "-"}
                        </p>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {state.length === 0 && (
              <Box width="100%">
                <CardNoData text="سفارشی وجود ندارد" />
              </Box>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
