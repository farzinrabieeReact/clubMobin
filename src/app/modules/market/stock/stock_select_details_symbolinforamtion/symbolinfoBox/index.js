import React, { useEffect, useState } from "react";
import Boxes from "./boxes";
import { makeStyles } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { actionTypes } from "../../../../../../redux/market/stock_select_details";
import { dateConvertMiladiToShamsi } from "../../../../../common/method/date";
import { useLocation } from "react-router-dom";
const useStyle = makeStyles(() => ({
  title: {
    borderBottom: "1px solid #ff5f00",
    display: "flex",
    alignItems: "center"
  }
}));

const SymbolInfoBox = ({ ls }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const allData = useSelector(
    state => state.reducer_symbolInformation_select_list
  );
  let defaultState = [{ text: "-" }, { text: "-" }];
  let defaultState1 = [
    { text: "" },
    { text: "" },
    { text: "" },
    { text: "" },
    { text: "" },
    { text: "" },
    { text: "" }
  ];
  const [level1, setLevel1] = useState(defaultState);
  const [level2, setLevel2] = useState(defaultState1);

  useEffect(() => {
    if (location.state?.isin)
      dispatch({
        type: actionTypes.symbolInformationAsync,
        isin: location.state.isin
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.state]);

  useEffect(() => {
    if (allData.data[0]) {
      let data = allData.data[0].body;
      let changePersent = data.price_change / data.last_price;
      setLevel1([
        { text: data["18_char_persian_symbol"] },
        { text: data["30_char_persian_symbol"] }
      ]);
      setLevel2([
        { text: dateConvertMiladiToShamsi(data.trade_date.replace(" ", "")) },
        { text: data["18_char_persian_symbol"] },
        { text: data["30_char_persian_symbol"] },
        { text: data.last_price },
        { text: data.quantity },
        { text: data.yesterday_price },
        { text: changePersent.toFixed(2) }
      ]);
    } else {
      setLevel1(defaultState);
      setLevel2(defaultState1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allData]);

  useEffect(() => {
    if (ls) {
      let data = [
        { text: ls[2] ? ls[2] : "" },
        { text: "" },
        { text: "" },
        { text: ls[3] ? ls[3] : "-" },
        { text: ls[9] ? ls[9] : "-" },
        { text: ls[8] ? ls[8] : "-" },
        { text: ls[5] ? `${((ls[5] * 100) / ls[8]).toFixed(2)}%` : "-" }
      ];
      setLevel2(data);
    }
  }, [ls]);

  const classes = useStyle();
  return (
    <>
      <div className={`${classes["title"]} p-5 `}>
        {allData.data.length !== 0 ? (
          <h3>
            {level1[0].text}
            <span>({level1[1].text})</span>
          </h3>
        ) : (
          // <h3>سهم مورد نظر یافت نشد</h3>
          <></>
        )}

        {!level2[0].text && <h3>سهم مورد نظر یافت نشد</h3>}
      </div>
      <div className="row flex-lg-row flex-column">
        <div className="col-lg-2 col-12" />
        <div className="col-lg-12 col-12  py-10 ">
          <div className="container">
            <Boxes allData={allData} data={level2} />
          </div>
        </div>
      </div>
    </>
  );
};

export default SymbolInfoBox;
