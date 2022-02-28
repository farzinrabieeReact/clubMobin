import React, { useEffect } from 'react'
import * as ls from 'lightstreamer-client-web';
import { getDataInLocalstorage } from '../../../common/method/getDataInLocalstorage';
import { useDispatch, useSelector } from 'react-redux';
import { actionTypes } from './../../../../redux/lightstreamer'
import {getUrlAuth , getUrlSubscription} from './getUrl/index';


const getRandomNumber = (min, max) => {
  return Math.ceil(Math.random() * (max - min) + min);
};

let randomNumber = getRandomNumber(1000, 10000);



export default function Index({ fieldList, itemList, setValue, isin }) {

    const dispatch = useDispatch();

    const state = useSelector(state => state.reducerLightstreamer).data

    let member_id = getDataInLocalstorage("member_id")
        ? getDataInLocalstorage("member_id") + randomNumber
        : randomNumber


    var field_List = [
        'InstrumentID',
        'PSGelStaMax', // حداکثر قیمت مجاز
        'PSGelStaMin', // حداقل قیمت مجاز
        'QTotTran5J', // حجم
        'QTotCap', // ارزش
        'PClosing', // قیمت پایانی
        'PDrCotVal', // آخرین قیمت
        'PriceChange', // تغییر قیمت
        'PriceMin', // پایین ترین قیمت
        'PriceMax', // بالاترین قیمت
        'PriceYesterday', // قیمت دیروز
        'timestamp', //آخرین بروز رسانی
        'LVal18AFC', //نماد 
        'PriceFirst',//
        'ZTotTran',//تعداد معاملات
        'CEtaVal',//وضعیت نماد
        'QTitMeDem_1',//حجم خرید در صف  اولین
        'ZOrdMeDem_1',//تعداد خرید در صف  اولین
        'PMeDem_1',//قیمت خرید در صف  اولین
        'PMeOf_1',//قیمت فروش در صف  اولین
        'ZOrdMeOf_1',//تعداد فروش در صف  اولین
        'QTitMeOf_1',//حجم فروش در صف  اولین
        'QTitMeDem_2',//حجم خرید در صف  دومین
        'ZOrdMeDem_2',//تعداد خرید در صف  دومین
        'PMeDem_2',//قیمت خرید در صف  دومین
        'PMeOf_2',//قیمت فروش در صف  دومین
        'ZOrdMeOf_2',//تعداد فروش در صف  دومین
        'QTitMeOf_2',//حجم فروش در صف  دومین
        'QTitMeDem_3',//حجم خرید در صف  سومین
        'ZOrdMeDem_3',//تعداد خرید در صف  سومین
        'PMeDem_3',//قیمت خرید در صف  سومین
        'PMeOf_3',//قیمت فروش در صف  سومین
        'ZOrdMeOf_3',//تعداد فروش در صف  سومین
        'QTitMeOf_3',//حجم فروش در صف  سومین
        'LVal30',//اسم شرکت
        'BaseVol',//حجم مبنا
        'CComVal',//کد تابلو
        'YVal',//
        'Buy_CountI',// تعداد خریداران حقیقی
        'Buy_CountN',// تعداد خریداران حقوقی
        'Buy_I_Volume',// حجم خرید حقیقی
        'Buy_N_Volume',// حجم خرید حقوقی
        'Sell_CountI',// تعداد فروشنده حقیقی
        'Sell_CountN',// تعداد فروشنده حقوقی
        'Sell_I_Volume',// حجم فروش حقیقی
        'Sell_N_Volume',// حجم فروش حقوقی
    ];

    const item_list = []

    const apiAuth = async () => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({ "User": "CLUB", "Pass": "!@#$%RTFVBNM56464216%$^YGBH", "member_id": `${member_id}` });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        // let res = await fetch("http://192.168.231.11:9191/stream/V1/auth", requestOptions)
        let res = await fetch(getUrlAuth(), requestOptions)
        let result = await res.json()

        if (result.token) {
            dispatch({ type: actionTypes.lightstreamer, payload: { token: result.token } })
        }
    }


    const ls_Client = (token, member_id) => {
        var lsClient = new ls.LightstreamerClient(getUrlSubscription(), "MARKETMAP_ADAPTERS");
        // var lsClient = new ls.LightstreamerClient("http://192.168.231.11:8090", "MARKETMAP_ADAPTERS");
        // var lsClient = new LightstreamerClient("http://80.75.9.13:8090", "MARKETMAP_ADAPTERS");
        // var lsClient = new LightstreamerClient("https://streamer.mobinsb.com:8090", "MARKETMAP_ADAPTERS");

        lsClient.connectionDetails.setUser(member_id)
        lsClient.connectionDetails.setPassword(token)

        lsClient.connect();
        return lsClient
    }

    const Un_Subscribe = () => {
        if (state.lsClient) {
            // console.log('unsubscribe---------->' , state.lsClient);
            // state.lsClient.unsubscribe(state.subscription);
            dispatch({ type: actionTypes.lightstreamerRemove })
        }
    }

    useEffect(() => {
        Un_Subscribe()
        apiAuth()
        // console.log('start-----------', {fieldList}, {itemList}, {isin});
    }, [isin]) //eslint-disable-line react-hooks/exhaustive-deps



    useEffect(() => {

        if (state?.token) {
            // console.log('token---------->');

            let lsClient = ls_Client(state.token, member_id);
            let subscription = new ls.Subscription(
                "MERGE",
                itemList ? itemList : item_list,
                fieldList ? fieldList : field_List
            );

            dispatch({ type: actionTypes.lightstreamerAsync, payload: { lsClient: lsClient, subscription: subscription } })

            subscription.addListener({
                onItemUpdate: function (obj) {
                    if (obj.updateValues)
                        setValue(obj.updateValues)
                        // console.log(obj.updateValues);
                    // var rowData = {};
                    // obj.forEachChangedField(function (fName, fPos, val) {
                    //     rowData[fName] = val;
                    // });

                    // if (obj.Dg[3] || obj.Dg[4] || obj.Dg[5]) {
                    //     // SetdataonItemUpdate(obj.Dg)
                    // }
                }
            });

            lsClient.subscribe(subscription);
        }
    }, [state?.token])//eslint-disable-line react-hooks/exhaustive-deps

  return <></>;
}




