/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid,jsx-a11y/img-redundant-alt */
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, makeStyles } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { dateConvertMiladiToShamsi } from "../../../../../common/method/date";
import { removeOfflineOrder } from "../../../../../../redux/market/stock/stock_remove_offlineOrder";

import {
  handleNotificationAlertTryUpdate,
  handleNotificationAlertCatch
} from "../../../../../common/method/handleNotificationAlert";
import { actionTypes } from "../../../../../../redux/market/stock/stock_select_offlineOrders";
// import { requestStatus } from './../../../../../common/method/requestStatus';
import { handleNumber } from "../../../../../common/method/displayData";
import CardNoData from "./../../../../../common/components/cardNoData";
import { actionTypes as actionTypesSummaries } from "./../../../../../../redux/market/stock_select_summaries";
import Pagination from "@material-ui/lab/Pagination";

let useStyles = makeStyles({
  root: {
    // minWidth: 320
  },
  icon: {
    cursor: "pointer"
  }
});

let size = 5;

export default function AdvanceTablesWidget4({ data }) {
  let classes = useStyles();
  let dispatch = useDispatch();
  const [page, setPage] = React.useState(1);

  const [state, setState] = useState([]);
  const isinJson = useSelector(state => state.reducerStockList).isinJson;

  const handleChange = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    if (data) {
      setState(data);
    }
  }, [data]);

  useEffect(() => {
    let getNameIsin = [];
    if (state.length) {
      state.forEach(item => {
        if (!isinJson[item.body.isin] && !getNameIsin.includes(item.body.isin))
          getNameIsin.push(item.body.isin);
      });
    }
    getNameIsin.forEach(item => {
      dispatch({
        type: actionTypesSummaries.stockListMoreAsync,
        payload: item
      });
    });
  }, [state]); //eslint-disable-line react-hooks/exhaustive-deps

  let apiRemove = id => {
    let data = {
      _id: id
    };

    removeOfflineOrder(data)
      .then(res => {
        let resOk = handleNotificationAlertTryUpdate(res);
        if (resOk) {
          dispatch({
            type: actionTypes.stockOfflineOrdersAsync
          });
          // resetForm(values)
        }
      })
      .catch(() => {
        handleNotificationAlertCatch();
      });
  };

  return (
    <div className={`card card-custom ${classes["root"]} rounded-lg`}>
      {/* Head */}
      {/* <div className="card-header border-0 py-5">
                <h3 className="card-title align-items-start flex-column">
                    آخرین آمار
                </h3>
            </div> */}
      {/* Body */}
      <div className="card-body p-0 p-md-2">
        <div className="tab-content">
          <div className="table-responsive">
            <table className="table table-head-custom table-head-bg table-borderless table-vertical-center">
              <thead>
                <tr className="text-center text-uppercase white-space">
                  <th style={{ minWidth: "80px" }}>ردیف</th>
                  <th style={{ minWidth: "80px" }}>نماد</th>
                  <th style={{ minWidth: "80px" }}>نوع معامله</th>
                  <th style={{ minWidth: "80px" }}>تعداد سهم</th>
                  <th style={{ minWidth: "80px" }}> قیمت (ریال)	</th>
                  <th style={{ minWidth: "80px" }}>حداقل قیمت فروش (ریال)</th>
                  <th style={{ minWidth: "80px" }}>حداکثر قیمت خرید (ریال)</th>
                  <th style={{ minWidth: "80px" }}>مبلغ کلی </th>
                  <th style={{ minWidth: "80px" }}>تاریخ </th>
                  <th style={{ minWidth: "80px" }}>وضعیت سفارش</th>
                  <th style={{ minWidth: "80px" }}>عملیات</th>
                </tr>
              </thead>
              <tbody>
                {state
                  .slice((page - 1) * size, (page - 1) * size + size)
                  .map((item, index) => {
                    // let symbol = reducerSymbol.filter(items => items.body.isin === item.body.isin)
                    // console.log(symbol);
                    return (
                      <tr key={index}>
                        <td className={"text-center"}>
                          {(page - 1) * size + (index + 1)}
                        </td>
                        <td className={"text-center"}>
                          {isinJson[item.body.isin]
                            ? isinJson[item.body.isin]
                            : item.body.isin}
                        </td>
                        <td className={"text-center"}>
                          <p>
                            {item.body.side === "SELL"
                              ? "فروش"
                              : item.body.side === "BUY"
                                ? "خرید"
                                : ""}
                          </p>
                        </td>
                        <td className={"text-center"}>
                          <p>{item.body.quantity}</p>{" "}
                        </td>
                        <td className={"text-center"}>
                          <p>{handleNumber(parseInt(item.body.price))}</p>{" "}
                        </td>

                        <td className={"text-center"}>
                          <p>{item.body.side === "SELL" ? handleNumber(parseInt(item.body.limit_price)) : "-"}</p>
                        </td>
                        <td className={"text-center"}>
                          <p>{item.body.side === "BUY" ? handleNumber(parseInt(item.body.limit_price)) : "-"}</p>
                        </td>

                        <td className={"text-center"}>
                          <p>{handleNumber(parseInt(0))}</p>{" "}
                        </td>
                        <td className={"text-center"}>
                          <p>
                            {dateConvertMiladiToShamsi(
                              item.body.validity_date.split(" ")[0]
                            )}
                          </p>
                        </td>
                        {/* <td className={'text-center'} ><p>{requestStatus(item.body.state)}</p> </td> */}
                        <td className={"text-center"}>
                          <p>{item.body.description}</p>{" "}
                        </td>
                        <td className={"text-center"}>
                          <DeleteIcon
                            className={classes["icon"]}
                            onClick={() => apiRemove(item.id)}
                          />{" "}
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
            {state.length === 0 ? (
              <Box width="100%">
                <CardNoData text="سفارشی وجود ندارد" />
              </Box>
            ) : (
                <Box
                  display="flex"
                  justifyContent="center"
                  position="sticky"
                  pb={1}
                >
                  <Pagination
                    count={Math.ceil(data.length / size)}
                    color="primary"
                    page={page}
                    onChange={handleChange}
                    style={{ color: "#ff5f00" }}
                  />
                </Box>
              )}
          </div>
        </div>
      </div>
    </div>
  );
}
