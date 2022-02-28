/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid,jsx-a11y/img-redundant-alt */
import React, { useState, useEffect } from "react";
import { Box, makeStyles } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { actionTypes } from "./../../../../../redux/market/stock/stock_select_changeBroker";
import { requestStatus } from "./../../../../common/method/requestStatus";
import { dateConvertMiladiToShamsi } from "./../../../../common/method/date";
import CardIicon from "./IconRemove";
import { actionTypes as actionTypesSummaries } from "./../../../../../redux/market/stock_select_summaries";
import Pagination from "@material-ui/lab/Pagination";
import CardNoData from "./../../../../common/components/cardNoData";
import { LinearProgress } from '@material-ui/core';

let useStyles = makeStyles({
  root: {
    // minWidth: 320,
  },
  icon: {
    cursor: "pointer"
  },
  table: {
    maxHeight: "65vh"
  }
});

export default function AdvanceTablesWidget4() {
  let classes = useStyles();
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [state, setState] = useState([]);
  const [loading, setLoading] = useState(false);

  const reducerCHangeBroker = useSelector(
    state => state.reducerStockChangeBroker
  );
  const reducerIsin = useSelector(state => state.reducerStockList);

  const handleChange = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    let getNameIsin = [];
    if (state.length) {
      state.forEach(item => {
        if (
          !reducerIsin.isinJson[item.body.isin] &&
          !getNameIsin.includes(item.body.isin)
        )
          getNameIsin.push(item.body.isin);
      });
    }
    getNameIsin.forEach(item => {
      dispatch({
        type: actionTypesSummaries.stockListMoreAsync,
        payload: item
      });
    });
  }, [state]);//eslint-disable-line react-hooks/exhaustive-deps

  // call api select api stock change broker
  useEffect(() => {
    let payload = { from: page, size: reducerCHangeBroker.size };
    dispatch({ type: actionTypes.StockChangeBrokerAsync, payload });
  }, [page]); //eslint-disable-line  react-hooks/exhaustive-deps

  // select list data stock change broker
  useEffect(() => {
    if (reducerCHangeBroker.data) {
      setState(reducerCHangeBroker.data);
    }
    setLoading(reducerCHangeBroker.loading);
  }, [reducerCHangeBroker]); //eslint-disable-line  react-hooks/exhaustive-deps

  return (
    <div className={`card card-custom ${classes["root"]} rounded-lg mt-10`}>
      <div className={"text-center"}>
        <h3 className={"py-5"}>لیست درخواست های من</h3>
      </div>
      <div className="card-body p-0">
        <div className="tab-content">
          <div className={`table-responsive ${classes.table}`}>
          {loading === true ? (
            <div>
              <LinearProgress color="primary" />
            </div>
          ) : null}
            <table
              className={`table table-head-custom table-head-bg table-borderless table-vertical-center table-striped`}
            >
              <thead>
                <tr className="text-center text-uppercase">
                  <th style={{ minWidth: "80px" }}>ردیف</th>
                  <th style={{ minWidth: "80px" }}>شناسه سهم</th>
                  <th style={{ minWidth: "80px" }}>تاریخ ثبت درخواست </th>
                  <th style={{ minWidth: "80px" }}>وضعیت </th>
                  <th style={{ minWidth: "80px" }}>توضیحات</th>
                  <th style={{ minWidth: "80px" }}>عملیات</th>
                </tr>
              </thead>
              <tbody>
                {state.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td className={"text-center"}>
                        {page !== 1
                          ? page * reducerCHangeBroker.size -
                            reducerCHangeBroker.size +
                            (index + 1)
                          : index + 1}
                      </td>
                      <td className={"text-center"}>
                        <p>
                          {reducerIsin.isinJson[item.body.isin]
                            ? reducerIsin.isinJson[item.body.isin]
                            : item.body.isin}
                        </p>
                      </td>
                      <td className={"text-center"}>
                        <p>
                          {dateConvertMiladiToShamsi(
                            item.body.request_date.split(" ")[0]
                          )}
                        </p>
                      </td>
                      <td className={"text-center"}>
                        <p>{requestStatus(item.body.state)}</p>
                      </td>
                      <td className={"text-center"}>
                        <p>{item.body.description}</p>
                      </td>
                      <td className={"text-center"}>
                        <CardIicon data={item} />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          {state.length === 0 ? (
            <CardNoData text="درخواستی وجود ندارد." />
          ) : (
            <Box
              display="flex"
              justifyContent="center"
              position="sticky"
              pb={1}
            >
              <Pagination
                count={Math.ceil(
                  reducerCHangeBroker.total / reducerCHangeBroker.size
                )}
                color="primary"
                page={page}
                onChange={handleChange}
              />
            </Box>
          )}
        </div>
      </div>
    </div>
  );
}
