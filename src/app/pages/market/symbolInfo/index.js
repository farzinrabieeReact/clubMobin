import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import SymbolInformation from "../../../modules/market/stock/stock_select_details_symbolinforamtion/symbolinformation";
import { useSubheader } from "../../../../_metronic/layout";
import SymbolInfoBox from "../../../modules/market/stock/stock_select_details_symbolinforamtion/symbolinfoBox";
import { useLocation } from "react-router-dom";
import LightStreamer from "./../../../common/components/LightStreamer";
import { actionTypes } from "./../../../../redux/lightstreamer";

const Index = () => {
  const dispatch = useDispatch();
  const suhbeader = useSubheader();
  suhbeader.setTitle("اطلاعات نماد");

  let loaction = useLocation();
  let isin = loaction.state?.isin ? loaction.state.isin : null;

  const [value, setValue] = useState([]);

  useEffect(() => {
    return () => {
      dispatch({ type: actionTypes.lightstreamerRemove });
    };
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  if (!isin) {
    alert("لطفا نماد خود را انتخاب کنید");
    return null;
  }

  let fieldList = [
    "LVal18AFC", //نماد
    "PDrCotVal", // آخرین قیمت
    "PClosing", // قیمت پایانی
    "PriceChange", //  تغییر قیمت
    "PriceMax", // بالاترین قیمت
    "PriceMin", // پایین ترین قیمت
    "PriceYesterday", // قیمت دیروز
    "QTotTran5J", // حجم
    "QTotCap", // ارزش
    "PSGelStaMax", // حداکثر قیمت مجاز
    "PSGelStaMin", // حداقل قیمت مجاز
    "BaseVol", //حجم مبنا

    "Buy_I_Volume", // حجم خرید حقیقی
    "Buy_CountI", // تعداد خریداران حقیقی
    "Sell_I_Volume", // حجم فروش حقیقی
    "Sell_CountI", // تعداد فروشنده حقیقی
    "Flow", // بازار
    "time_stamp" // تاریخ
  ];

  return (
    <div className="bg-white rounded-lg  shadow ">
      <LightStreamer
        fieldList={fieldList}
        itemList={[isin]}
        setValue={data => setValue(data)}
        isin={isin}
      />
      <SymbolInfoBox ls={value} />
      <SymbolInformation ls={value} />
    </div>
  );
};

export default Index;
