import React, { useEffect, useState } from "react";
import { Div } from "./../styledComponent";
import { useLocation} from "react-router-dom";
import { useDispatch } from "react-redux";

import Panel from "../../../../modules/market/stock/stock_insert_panleStock";
import QueueStock from "../../../../modules/market/stock/stock_select_queueStock";
import DetailsStock from "../../../../modules/market/stock/stock_select_details_oragh";
import Oragh from "../../../../modules/market/stock/stock_select_order";
import LightStreamer from '../../../../common/components/LightStreamer';
import { actionTypes } from "./../../../../../redux/lightstreamer";

export default function Index() {


  let location = useLocation()
  const dispatch = useDispatch();

  const [isin, setisin] = useState(null)
  const [value, setValue] = useState([])//eslint-disable-line no-unused-vars

  useEffect(() => {
    if (location.state && location.pathname === '/stock') {

      let isin = location.state.isin;
      if (isin) {
        setisin(isin)
      }
    }
  }, [location])



  useEffect(() => {
    return () => {
      dispatch({ type: actionTypes.lightstreamerRemove })
    }
  }, [])//eslint-disable-line react-hooks/exhaustive-deps



  let fieldList = [//eslint-disable-line no-unused-vars

    'ZOrdMeDem_1',//تعداد خرید در صف  اولین
    'QTitMeDem_1',//حجم خرید در صف  اولین
    'PMeDem_1',//قیمت خرید در صف  اولین
    'ZOrdMeDem_2',//تعداد خرید در صف  دومین
    'QTitMeDem_2',//حجم خرید در صف  دومین
    'PMeDem_2',//قیمت خرید در صف  دومین
    'ZOrdMeDem_3',//تعداد خرید در صف  سومین
    'QTitMeDem_3',//حجم خرید در صف  سومین
    'PMeDem_3',//قیمت خرید در صف  سومین
    'QTitMeOf_1',//حجم فروش در صف  اولین
    'PMeOf_1',//قیمت فروش در صف  اولین
    'ZOrdMeOf_1',//تعداد فروش در صف  اولین
    'QTitMeDem_2',//حجم خرید در صف  دومین
    'PMeOf_2',//قیمت فروش در صف  دومین
    'ZOrdMeOf_2',//تعداد فروش در صف  دومین
    'QTitMeOf_3',//حجم فروش در صف  سومین
    'PMeOf_3',//قیمت فروش در صف  سومین
    'ZOrdMeOf_3',//تعداد فروش در صف  سومین

    'PDrCotVal', // آخرین قیمت
    'PriceYesterday', // قیمت دیروز
    'PriceMax', // بالاترین قیمت
    'PriceMin', // پایین ترین قیمت
    'BaseVol',//حجم مبنا
    'CEtaVal',//وضعیت نماد
    'PClosing', // قیمت پایانی
    'QTotTran5J', // حجم
    'QTotCap', // ارزش
    'ZTotTran',//تعداد معاملات

    'Buy_I_Volume',// حجم خرید حقیقی
    'Buy_CountI',// تعداد خریداران حقیقی
    'Sell_I_Volume',// حجم فروش حقیقی
    'Sell_CountI',// تعداد فروشنده حقیقی

    'Buy_N_Volume',// حجم خرید حقوقی
    'Buy_CountN',// تعداد خریداران حقوقی
    'Sell_N_Volume',// حجم فروش حقوقی
    'Sell_CountN',// تعداد فروشنده حقوقی


  ]

  return (
    <div>
      {
        isin && (
          <>
            <LightStreamer
              fieldList={fieldList}
              itemList={[isin]}
              setValue={(data) => setValue(data)}
              isin={isin}
            />
          </>
        )}
      <Div>
        <div
          className={
            "d-flex justify-content-between align-items-cneter flex-wrap"
          }
        >
          <div className={"w-100 w-lg-50"}>
            <Panel />
          </div>
          <div className={"w-100 w-lg-50"}>
            <QueueStock ls={value} isin={isin} />
          </div>
        </div>
      </Div>
      <hr />
      <br />
      <Div>
        <DetailsStock ls={value} isin={isin} />
      </Div>
      <br /> <hr />
      <br />
      <Div>
        <Oragh />
      </Div>
    </div>
  );
}
