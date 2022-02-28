import React, { useEffect, useState } from "react";
import Items from "./items/Items";
import { makeStyles } from "@material-ui/core";
import { dateConvertMiladiToShamsi } from "../../../../../../../common/method/date";
const useStyle = makeStyles(() => ({
  title: {
    borderBottom: "2px solid #64A51C",
    textAlign: "center"
  }
}));

const SymbolLevel1 = ({ allData, ls }) => {



  let defaultState = [
    { text: "-" },
    { text: "-" },
    { text: "-" },
    { text: "-" },
    { text: "-" },
    { text: "-" },
    { text: "-" },
    { text: "-" },
    { text: "-" },
    { text: "-" }
  ];
  let defaultState1 = [
    { text: "-" },
    { text: "-" },
    { text: "-" },
    { text: "-" },
    { text: "-" }
  ];
  let defaultState2 = [{ text: "-" }, { text: "-" }];


  const [level1, setLevel1] = useState(defaultState);
  const [level2, setLevel2] = useState(defaultState1);
  const [level3, setLevel3] = useState(defaultState2);


  useEffect(() => {

    if (allData.data[0]) {
      let data = allData.data[0].body;
      let changePersent = data.price_change / data.last_price;

      let item1 = [
        { text: data["18_char_persian_symbol"] },
        { text: data.last_price },
        { text: data.close_price },
        { text: changePersent.toFixed(2) },
        { text: data.price_change },
        { text: data.high_price },
        { text: data.low_price },
        { text: data.yesterday_price },
        { text: data.quantity },
        { text: data.total_value }
      ];
      let item2 = [
        { text: handleFlow(data.flow) },
        { text: data.total_buy_power.toFixed(2) },
        { text: data.total_sell_power.toFixed(2) },
        { text: data.base_volume },
        { text: dateConvertMiladiToShamsi(data.trade_date.replace(" ", "")) }
      ];
      let item3 = [
        { text: data.min_permitted_price },
        { text: data.max_permitted_price }
      ];

      setLevel1(item1);
      setLevel2(item2);
      setLevel3(item3);
    } else {
      // setLevel1(defaultState);
      setLevel2(defaultState1);
      setLevel3(defaultState2);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allData]);



  useEffect(() => {

    if (ls) {
      let data = [
        { text: ls[2] ? ls[2] : '-' },
        { text: ls[3] ? ls[3] : '-' },
        { text: ls[4] ? ls[4] : '-' },
        { text: ls[5] ? `${((ls[5] * 100) / ls[8]).toFixed(2)}%` : '-' },
        { text: ls[5] ? ls[5] : '-' },
        { text: ls[6] ? ls[6] : '-' },
        { text: ls[7] ? ls[7] : '-' },
        { text: ls[8] ? ls[8] : '-' },
        { text: ls[9] ? ls[9] : '-' },
        { text: ls[10] ? ls[10] : '-' }
      ]

      let data1 = [
        { text: handleFlow(+ls[18]) },
        {
          text:
            ls[14]
              ? ls[15]
                ? +(ls[14] / ls[15]).toFixed(2) : '-'
              : '-'
        },
        {
          text:
          ls[16]
          ? ls[17]
            ? +(ls[16] / ls[17]).toFixed(2) : '-'
          : '-'
        },
        { text: ls[13] ? ls[13] : '-' },
        { text: ls[19] ? ls[19] : '-' }
      ]

      let data2 = [
        { text: ls[12] ? ls[12] : '-' },
        { text: ls[11] ? ls[11] : '-' },
      ]
      setLevel1(data)
      setLevel2(data1)
      setLevel3(data2)
    }
  }, [ls])



  const handleFlow = data => {
    switch (data) {
      case 1:
        return "بورس";
      case 2:
        return "فرابورس";
      case 4:
        return "پایه";
      default:
        return "-";
    }
  };

  const classes = useStyle();
  return (
    <>
      <div className="row ">
        <div className="col-12 col-lg py-10 px-20 ">
          <div className="shadow rounded-lg p-3 d-flex ">
            <Items data={title1} data1={level1} />
          </div>
        </div>
        <div className="col-12 col-lg py-10 px-20 d-flex flex-column mb-4 mb-lg-0 justify-content-between">
          <div className="shadow rounded-xl p-2 mb-20 mb-lg-0 ">
            <div className={`${classes["title"]} p-2 mb-2`}>
              <h4>اطلاعات کلی</h4>
            </div>
            <Items data={title2} data1={level2} />
          </div>
          <div className="shadow rounded-xl p-2 ">
            <div className={`${classes["title"]} p-2 mb-2`}>
              <h4>حداقل و حداکثر قیمت</h4>
            </div>
            <Items data={title3} data1={level3} />
          </div>
        </div>
      </div>
    </>
  );
};

export default SymbolLevel1;

let title1 = [
  { text: "نماد" },
  { text: "آخرین قیمت " },
  { text: "قیمت پایانی" },
  { text: "درصد تغییر قیمت" },
  { text: "تغییر قیمت" },
  { text: "بیشترین قیمت روز" },
  { text: "کمترین قیمت روز" },
  { text: "قیمت دیروز" },
  { text: "حجم" },
  { text: "ارزش" }
];

let title2 = [
  { text: "بازار" },
  { text: "قدرت خریدار" },
  { text: "قدرت فروشنده" },
  { text: "حجم مبنا" },
  { text: "آخرین بروز رسانی" }
];

let title3 = [{ text: "حداقل قیمت مجاز" }, { text: "حداکثر قیمت مجاز" }];

// let data1 = [
//   { text: allData ? allData["18_char_persian_symbol"] : 0 },
//   { text: allData?.last_price },
//   { text: allData?.close_price },
//   { text: changePersent },
//   { text: allData?.price_change },
//   { text: allData?.high_price },
//   { text: allData?.low_price },
//   { text: allData?.yesterday_price },
//   { text: allData?.base_volume },
//   { text: allData?.total_value }
// ];
// let data1 = [
//   { text:state["18_char_persian_symbol"]},
//   { text: allData?.last_price },
//   { text: allData?.close_price },
//   { text: changePersent },
//   { text: allData?.price_change },
//   { text: allData?.high_price },
//   { text: allData?.low_price },
//   { text: allData?.yesterday_price },
//   { text: allData?.base_volume },
//   { text: allData?.total_value }
// ];
// let item2 = [
//   { text: handleFlow(allData?.flow) },
//   { text: "-" },
//   { text: allData?.total_sell_power },
//   { text: allData?.base_volume },
//   { text: dateConvertMiladiToShamsi(allData?.trade_date.replace(" ", "")) }
// ];
// let items2 = [
//   { text: allData?.min_permitted_price },
//   { text: allData?.max_permitted_price }
// ];
