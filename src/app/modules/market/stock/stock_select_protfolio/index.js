/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid,jsx-a11y/img-redundant-alt */
import React, { useState, useEffect } from "react";
import { LinearProgress, makeStyles } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { actionTypes as actionTypesPortfolio } from "../../../../../redux/market/stock/stock_select_protfolio/";
import LightStreamer from "../../../../common/components/LightStreamer";
import { handleNumber } from "../../../../common/method/displayData";

let useStyles = makeStyles({
  root: {
    minWidth: 320
  },
  icon: {
    cursor: "pointer"
  }
});

export default function AdvanceTablesWidget4() {
  // function handleNumber(num) {
  //   let str = num.toString().split(".");
  //   if (str[0].length >= 5) {
  //     str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, "$1.");
  //   }
  //   if (str[1] && str[1].length >= 5) {
  //     str[1] = str[1].replace(/(\d{3})/g, "$1 ");
  //   }
  //   return str.join(".");
  // }

  let classes = useStyles();
  const dispatch = useDispatch();

  let fieldList = [
    "InstrumentID", //ایدی
    "LVal18AFC", //نماد
    "PDrCotVal", // آخرین قیمت
    "PClosing", // قیمت پایانی
    "PriceChange", // درصد تغییر قیمت
    "PriceMax", // بالاترین قیمت
    "PriceMin", // پایین ترین قیمت
    "PriceYesterday", // قیمت دیروز
    "PriceChange" // تغییر قیمت
    // "QTotTran5J" // حجم
    // "QTotCap" // ارزش
  ];
  const [value, setValue] = useState([]);
  const [lsState, setlsState] = useState([]);
  // const [stateUp, setStateUp] = useState(false);
  // const [stateDown, setStateDown] = useState(false);
  const [stateIsin, setStateIsin] = useState([]);

  // const [state, setState] = useState([]);
  // const reducerIsin = useSelector(state => state.reducerStockList);
  const dataReducer = useSelector(state => state.reducerStockSelectProtfolio);

  useEffect(() => {
    dispatch({ type: actionTypesPortfolio.stockSelectprotfPlioAsync });
  }, []);//eslint-disable-line react-hooks/exhaustive-deps
  // console.log("dataReducer", dataReducer.data);

  let obj = {};
  if (dataReducer.data.length !== 0) {
    let allData = dataReducer.data?.forEach((itm, ind) => { //eslint-disable-line  no-unused-vars
      obj[itm.body.SymbolISIN] = {
        CSDCount: itm.body.CSDCount,
        CurrentCount: itm.body.CurrentCount,
        OnBoardBuy: itm.body.OnBoardBuy,
        OnBoardSell: itm.body.OnBoardSell,
        AverageBuyPrice: itm.body.AverageBuyPrice,
        AverageSellPrice: itm.body.AverageSellPrice,
        TotalQuantityBuy: itm.body.TotalQuantityBuy,
        TotalQuantitySell: itm.body.TotalQuantitySell
      };
    });
  }

  useEffect(() => {
    if (dataReducer.data.length) {
      const isinData = dataReducer.data?.map((itm, ind) => {
        return itm.body.SymbolISIN;
      });
      setStateIsin(isinData);
    }
  }, [dataReducer]);

  useEffect(() => {
    dispatch({ type: actionTypesPortfolio.stockSelectprotfPlioAsync });
    // dispatch({ type: actionTypesPortfolioDetails.stockDetailsPortfolioAsync });
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
  
    let flag = true;
    if (value.length > 0) {
      let data = lsState.map((itm, ind) => {
        if (itm[2] === value[2]) {
          if (parseInt(itm[7]) < parseInt(value[7])) {
            // setStateUp(true);
            // setStateDown(false);
            // console.log("yes");
          } else if (parseInt(itm[7]) > parseInt(value[7])) {
            // setStateUp(false);
            // setStateDown(true);
            // console.log("no");
          }
          //

          flag = false;

          return [
            value[0],
            value[1],
            value[2],
            value[3],
            value[4],
            value[5],
            value[6],
            value[7],
            value[8],
            value[9],
            value[10],
            obj[value[2]].CSDCount,
            obj[value[2]].CurrentCount,
            obj[value[2]].OnBoardBuy,
            obj[value[2]].OnBoardSell,
            obj[value[2]].AverageBuyPrice,
            obj[value[2]].AverageSellPrice,
            obj[value[2]].TotalQuantityBuy,
            obj[value[2]].TotalQuantitySell
          ];
        }

        return itm;
      });
      if (flag) {
        let DataIsin = [
          value[0],
          value[1],
          value[2],
          value[3],
          value[4],
          value[5],
          value[6],
          value[7],
          value[8],
          value[9],
          value[10],
          obj[value[2]].CSDCount,
          obj[value[2]].CurrentCount,
          obj[value[2]].OnBoardBuy,
          obj[value[2]].OnBoardSell,
          obj[value[2]].AverageBuyPrice,
          obj[value[2]].AverageSellPrice,
          obj[value[2]].TotalQuantityBuy,
          obj[value[2]].TotalQuantitySell
        ];

        setlsState(prevState => {
          return [...prevState, DataIsin];
        });
      } else {
        setlsState(data);
      }
    }
  }, [value]); //eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {}, [lsState]);

  // useEffect(() => {
  //   if (!dataReducer.data.length) {
  //     setState(dataStatic);
  //   } else {
  //     setState(dataReducer.data);
  //   }
  // }, [dataReducer]);

  // useEffect(() => {
  //   if (reducerIsin.data.length === 0)
  //     dispatch({ type: actionTypes.stockListAsync });
  // }, []); //eslint-disable-line react-hooks/exhaustive-deps

  const plusPortofolioLevel1 = data => {
    let sumData = 0;
    lsState.forEach((itm, ind) => {
      let items = itm[11] * itm[4];
      sumData = sumData + items;
    });
    return sumData;
  };
  const plusPortofolioLevel2 = data => {
    let sumData = 0;

    lsState.forEach((itm, ind) => {
      let items = itm[12] * itm[4];
      sumData = sumData + items;
    });
    return sumData;
  };

  if (!stateIsin) {
    alert("لطفا نماد خود را انتخاب کنید");
    return null;
  }

  return (
    <>
      {stateIsin.length !==0 && (
        <LightStreamer
          fieldList={fieldList}
          itemList={stateIsin}
          setValue={data => {
            if (data[2]) setValue(data);
          }}
          isin={stateIsin}
        />
      )}

      <div className={`card card-custom ${classes["root"]} rounded-lg`}>
        {/* Head */}
        {/* <div className="card-header border-0 py-5">
                <h3 className="card-title align-items-start flex-column">
                    آخرین آمار
                </h3>
            </div> */}
        {/* Body */}
        <div className="card-body pt-0 pb-3">
          <div className="tab-content">
            <div className="table-responsive">
              {value.length === 0 ? (
                <div>
                  <LinearProgress color="primary" />
                </div>
              ) : null}
              <table className="table table-head-custom table-head-bg table-borderless table-vertical-center table-striped">
                <thead>
                  <tr className="text-center text-uppercase">
                    <th style={{ minWidth: "80px" }}>شناسه نماد </th>
                    <th style={{ minWidth: "80px" }}>پرتفوی سپرده گذاری </th>
                    <th style={{ minWidth: "80px" }}>پرتفوی لحظه ای </th>
                    <th style={{ minWidth: "80px" }}>قیمت آخرین معامله</th>
                    <th style={{ minWidth: "80px" }}>
                      {" "}
                      سفارشات باز (خرید - فروش){" "}
                    </th>
                    <th style={{ minWidth: "80px" }}>
                      {" "}
                      میانگین قیمت خرید امروز{" "}
                    </th>
                    <th style={{ minWidth: "80px" }}>
                      {" "}
                      میانگین قیمت فروش امروز{" "}
                    </th>
                    <th style={{ minWidth: "80px" }}>مجموع خرید امروز </th>
                    <th style={{ minWidth: "80px" }}>مجموع فروش امروز </th>
                    <th style={{ minWidth: "80px" }}>ارزش سپرده گذاری</th>
                    <th style={{ minWidth: "80px" }}>ارزش لحظه ای</th>
                  </tr>
                </thead>
                <tbody className="border-bottom">
                  {/*{state.map((item, index) => {*/}
                  {/*  return (*/}
                  {/*    <tr key={index}>*/}
                  {/*      <td className={"text-center"}>*/}
                  {/*        <p>*/}
                  {/*          {reducerIsin.isinJson[item.body.SymbolISIN]*/}
                  {/*            ? reducerIsin.isinJson[item.body.SymbolISIN]*/}
                  {/*            : item.body.SymbolISIN}*/}
                  {/*          /!*{item.body.SymbolISIN}*!/*/}
                  {/*        </p>*/}
                  {/*      </td>*/}
                  {/*      <td className={"text-center"}>*/}
                  {/*        <p>{item.body.CSDCount}</p>*/}
                  {/*      </td>*/}
                  {/*      <td className={"text-center"}>*/}
                  {/*        <p>{item.body.CurrentCount}</p>*/}
                  {/*      </td>*/}
                  {/*      <td className={"text-center"}>*/}
                  {/*        <div*/}
                  {/*          className={"d-flex justify-content-around w-100"}*/}
                  {/*        >*/}
                  {/*          <p className={"text-success p-2"}>*/}
                  {/*            {item.body.OnBoardBuy}*/}
                  {/*          </p>*/}
                  {/*          <p className={"text-danger p-2"}>*/}
                  {/*            {item.body.OnBoardSell}*/}
                  {/*          </p>*/}
                  {/*        </div>*/}
                  {/*      </td>*/}
                  {/*      <td className={"text-center"}>*/}
                  {/*        <p>{item.body.AverageBuyPrice}</p>*/}
                  {/*      </td>*/}
                  {/*      <td className={"text-center"}>*/}
                  {/*        <p>{item.body.AverageSellPrice}</p>*/}
                  {/*      </td>*/}
                  {/*      <td className={"text-center"}>*/}
                  {/*        <p>{item.body.TotalQuantityBuy}</p>*/}
                  {/*      </td>*/}
                  {/*      <td className={"text-center"}>*/}
                  {/*        <p>{item.body.TotalQuantitySell}</p>*/}
                  {/*      </td>*/}
                  {/*    </tr>*/}
                  {/*  );*/}
                  {/*})}*/}

                  {lsState.map((item, ind) => (
                    <tr key={ind}>
                      <td className={"text-center"}>
                        <p>{item[3] ? item[3] : "-"}</p>
                      </td>
                      <td className={"text-center"}>
                        <p>{item[11] ? item[11] : "-"}</p>
                      </td>
                      <td className={"text-center"}>
                        <p>{item[12] ? item[12] : "-"}</p>
                      </td>

                      <td className={"text-center"}>
                        <p
                          className={
                            item[10] < 0 ? "text-success" : "text-danger"
                          }
                        >
                          {item[4] ? handleNumber(parseFloat(item[4])) : "-"}
                        </p>
                      </td>
                      <td className={"text-center"}>
                        <div className={"d-flex justify-content-around w-100"}>
                          <p className={"text-success p-2"}>
                            {item[13] ? handleNumber(item[13]) : "-"}
                          </p>
                          <p className={"text-danger p-2"}>
                            {item[14] ? handleNumber(item[14]) : "-"}
                          </p>
                        </div>
                      </td>
                      <td
                        className="text-center  "
                        // style={{ padding: "0 35px" }}
                      >
                        <div className="d-flex justify-content-center">
                          <div>
                            <p>{item[15] ? handleNumber(item[15]) : "-"}</p>
                          </div>

                          <div>
                            {" "}
                            {/*{stateUp ? (*/}
                            {/*  <ArrowUp className="text-success" />*/}
                            {/*) : null}*/}
                            {/*{stateDown ? (*/}
                            {/*  <ArrowDown className="text-danger" />*/}
                            {/*) : null}*/}
                          </div>
                        </div>
                      </td>
                      <td className={"text-center"}>
                        <p>{item[16] ? handleNumber(item[16]) : "-"}</p>
                      </td>
                      <td className={"text-center"}>
                        <p>{item[17] ? handleNumber(item[17]) : "-"}</p>
                      </td>
                      <td className={"text-center"}>
                        <p>{item[18] ? handleNumber(item[18]) : "-"}</p>
                      </td>
                      <td className={"text-center"}>
                        <p>{item[11] ? handleNumber(item[11] * item[4]) : "-"}</p>
                      </td>
                      <td className={"text-center"}>
                        <p>{item[12] ? handleNumber(item[12] * item[4]) : "-"}</p>
                      </td>
                      {/*{plusPortofli(item[11] * item[4])}*/}
                    </tr>
                  ))}
                </tbody>
              </table>
              {value.length === 0 ? null : (
                <>
                  <div className="mt-5 d-flex ">
                    <div className="mr-2">
                      <p> ارزش کل سپرده گذاری : </p>
                    </div>
                    <div className="d-flex">
                      <div className="mr-5">
                        {handleNumber(plusPortofolioLevel1())}
                      </div>
                    </div>
                  </div>
                  <div className="mt-5 d-flex ">
                    <div className="mr-2">
                      <p> ارزش کل لحظه ای :</p>
                    </div>
                    <div className="d-flex">
                      <div className="mr-5">
                        {handleNumber(plusPortofolioLevel2())}
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// let dataStatic = [
//   {
//     id: "IRO1KHFZ0001",
//     body: {
//       SymbolISIN: "اطلاعاتی وجود ندارد",
//       TotalQuantitySell: 0, //"مجموع فروش امروز "
//       AverageSellPrice: 0, //"میانگین قیمت فروش امروز"
//       OnBoardBuy: 0, //"خرید"
//       OnBoardSell: 0, //"فروش"
//       CurrentCount: 0, //"پرتفوی لحظه ای"
//       CSDCount: 0, //"پرتفوی سپرده گذاری"
//       TotalQuantityBuy: 0, //"مجموع خرید امروز "
//       AverageBuyPrice: 0 //"میانگین قیمت خرید امروز "
//     }
//   }
// {
//   id: "IRO1KRSH0001",
//   body: {
//     SymbolISIN: "IRO1KRSH0001",
//     TotalQuantitySell: 0,
//     AverageSellPrice: 0,
//     OnBoardBuy: 0,
//     OnBoardSell: 0,
//     CurrentCount: 74,
//     CSDCount: 74,
//     TotalQuantityBuy: 0,
//     AverageBuyPrice: 0
//   }
// },
// {
//   id: "IRO3ILZZ0001",
//   body: {
//     SymbolISIN: "IRO3ILZZ0001",
//     TotalQuantitySell: 0,
//     AverageSellPrice: 0,
//     OnBoardBuy: 0,
//     OnBoardSell: 0,
//     CurrentCount: 27,
//     CSDCount: 27,
//     TotalQuantityBuy: 0,
//     AverageBuyPrice: 0
//   }
// },
// {
//   id: "IRO3IZIZ0001",
//   body: {
//     SymbolISIN: "IRO3IZIZ0001",
//     TotalQuantitySell: 0,
//     AverageSellPrice: 0,
//     OnBoardBuy: 0,
//     OnBoardSell: 0,
//     CurrentCount: 28,
//     CSDCount: 28,
//     TotalQuantityBuy: 0,
//     AverageBuyPrice: 0
//   }
// },
// {
//   id: "IRO1NBAB0001",
//   body: {
//     SymbolISIN: "IRO1NBAB0001",
//     TotalQuantitySell: 0,
//     AverageSellPrice: 0,
//     OnBoardBuy: 0,
//     OnBoardSell: 0,
//     CurrentCount: 22577,
//     CSDCount: 22577,
//     TotalQuantityBuy: 0,
//     AverageBuyPrice: 0
//   }
// }
// ];
