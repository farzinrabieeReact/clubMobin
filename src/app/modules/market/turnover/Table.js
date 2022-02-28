import React, { useEffect, useState } from "react";
import { dateConvertMiladiToShamsi } from "../../../common/method/date";
import Pagination from "../../../common/components/pagination";
import OutlinedCard from "../../../common/components/cardNoData";
import { useDispatch } from "react-redux";

import { actionTypes } from "../../../../redux/market/stock_select_summaries";
import { handleNumber } from "../../../common/method/displayData";
import { makeStyles } from "@material-ui/styles";
import { LinearProgress } from "@material-ui/core";
const useStyle = makeStyles(() => ({
  trash: {
    transition: "all .4s",

    "&:hover": {
      color: "red",
      fontSize: "16px !important",
      cursor: "pointer"
    }
  },
  stickyPagination: {
    textAlign: "center",
    fontWeight: "bold",
    margin: "0px auto",
    // position: "sticky",/
    bottom: 0,
    /* left: 0; */
    //   backgroundColor: "whitesmoke",
    padding: "5px 0",
    display: "flex",
    justifyContent: "center",
    direction: "ltr"
  }
}));
const Table = ({
  data,
  isin,
  setEmpty,
  instrumentType,
  reducerOrder,
  pageTab1,
  changePagnation
}) => {
  const [state, setState] = useState([]);

  const dispatch = useDispatch();
  const classes = useStyle();

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
    <>
      <div className="w-100 bg-white shadow rounded-lg py-5 px-10 mb-10">
        {reducerOrder.loading && (
          <div>
            <LinearProgress />
          </div>
        )}
        <table className="table table-responsive d-lg-table  table-hover ">
          <thead>
            <tr style={{ borderBottom: "2px solid black !important" }}>
              <th scope="col">بازار</th>
              <th scope="col">شناسه نماد</th>
              <th scope="col">نوع معامله </th>
              <th scope="col">تعداد سهم </th>
              <th scope="col">ارزش معامله </th>
              <th scope="col">حداقل قیمت فروش </th>
              <th scope="col">حداکثر قیمت خرید </th>
              <th scope="col">تاریخ شروع</th>
              <th scope="col">تاریخ پایان</th>
              <th scope="col">نوع درخواست</th>
              <th scope="col">وضعیت درخواست</th>
            </tr>
          </thead>
          <tbody>
            {state?.map((itm, ind) => (
              <tr key={ind}>
                <td>
                  {" "}
                  {instrumentType[itm.body.instrument_type]
                    ? instrumentType[itm.body.instrument_type]
                    : "-"}
                </td>
                <td>
                  {" "}
                  {isin[itm.body.instrument_id]
                    ? isin[itm.body.instrument_id]
                    : itm.body.instrument_id}
                </td>
                <td>{itm.body.trade_type}</td>
                <td>{itm.body.quantity}</td>
                <td>{itm.body.value}</td>
                <td>
                  {itm.body.trade_type === "2"
                    ? handleNumber(parseInt(itm.body.price))
                    : 0}
                </td>
                <td>
                  {itm.body.trade_type === "1"
                    ? handleNumber(parseInt(itm.body.price))
                    : 0}
                </td>
                <td>
                  {itm.body.start_date !== "null" && itm.body.start_date
                    ? dateConvertMiladiToShamsi(
                        itm.body.start_date.split(" ")[0]
                      )
                    : "-"}
                </td>
                <td>
                  {itm.body.end_date !== "null" && itm.body.end_date
                    ? dateConvertMiladiToShamsi(itm.body.end_date.split(" ")[0])
                    : "-"}
                </td>
                <td>
                  {itm.body.start_date !== "null" &&
                  itm.body.start_date &&
                  itm.body.end_date !== "null" &&
                  itm.body.end_date
                    ? itm.body.start_date.split(" ")[0] ===
                      itm.body.end_date.split(" ")[0]
                      ? "سفارش روز"
                      : "معتبر تا تاریخ"
                    : "-"}
                </td>
                <td>
                  {itm.body.is_canceled
                    ? itm.body.is_canceled.toUpperCase() === "FALSE"
                      ? "انجام شده"
                      : "لغو شده"
                    : "-"}
                </td>

                {/*<td>*/}
                {/*  <Trash*/}
                {/*    className={classes.trash}*/}
                {/*    onClick={() => handleClick(itm.id)}*/}
                {/*  />*/}
                {/*</td>*/}
              </tr>
            ))}
          </tbody>
        </table>
        <div className={classes.stickyPagination}>
          {reducerOrder.data.length !== 0 && (
            <Pagination
              shape="rounded"
              variant="outlined"
              count={Math.ceil(reducerOrder.total / reducerOrder.size)}
              page={pageTab1}
              // onChange={changePagnation}
              setPagnation={changePagnation}
            />
          )}
        </div>
        {reducerOrder.data.length === 0 && <OutlinedCard />}
      </div>
    </>
  );
};

export default Table;
