import React from "react";
import { makeStyles, TextField, Box } from "@material-ui/core";
import { Formik } from "formik";
import * as Yup from "yup";
import { useIntl } from "react-intl";
import SelectLabels from "./Components/SelectLabels";
import { useState } from "react";
import { useEffect } from "react";
import { regx_phone, regex_number_english } from "../../../../../../common/method/regex";

let useStyles = makeStyles({
  root: {
    width: 700,
    maxWidth: "100%",
  },
});

const provinceList = [
  { value: "", name: "استان" },
  { value: "8", name: "آذربایجان شرقی" },
  { value: "7", name: "آذربایجان غربی" },
  { value: "22", name: "اردبیل" },
  { value: "6", name: "اصفهان" },
  { value: "31", name: "البرز" },
  { value: "28", name: "ایلام" },
  { value: "26", name: "بوشهر" },
  { value: "1", name: "تهران" },
  { value: "20", name: "چهارمحال و بختیاری" },
  { value: "30", name: "خراسان جنوبی" },
  { value: "2", name: "خراسان رضوی" },
  { value: "29", name: "خراسان شمالی" },
  { value: "5", name: "خوزستان" },
  { value: "23", name: "زنجان" },
  { value: "21", name: "سمنان" },
  { value: "25", name: "سیستان و بلوچستان" },
  { value: "4", name: "فارس" },
  { value: "18", name: "قزوین" },
  { value: "24", name: "قم" },
  { value: "13", name: "گلستان" },
  { value: "9", name: "گیلان" },
  { value: "11", name: "لرستان" },
  { value: "3", name: "مازندران" },
  { value: "15", name: "مرکزی" },
  { value: "27", name: "هرمزگان" },
  { value: "16", name: "همدان" },
  { value: "14", name: "کردستان" },
  { value: "10", name: "کرمان" },
  { value: "12", name: "کرمانشاه" },
  { value: "19", name: "کهگیلویه و بویراحمد" },
  { value: "17", name: "یزد" },
];

const cities = [
  { Statevalue: "", value: "", name: "شهر" },
  { Statevalue: "4", value: "4027", name: "آب پرده" },
  { Statevalue: "5", value: "5005", name: "آبادان" },
  { Statevalue: "4", value: "4006", name: "آباده" },
  { Statevalue: "28", value: "28003", name: "آبدانان" },
  { Statevalue: "17", value: "17002", name: "ابركوه" },
  { Statevalue: "23", value: "23002", name: "ابهر" },
  { Statevalue: "18", value: "18003", name: "آبيك" },
  { Statevalue: "8", value: "8013", name: "آذرشهر" },
  { Statevalue: "21", value: "21005", name: "آرادان" },
  { Statevalue: "15", value: "15001", name: "اراك" },
  { Statevalue: "6", value: "6020", name: "آران و بيدگل" },
  { Statevalue: "22", value: "22001", name: "اردبيل" },
  { Statevalue: "6", value: "6021", name: "اردستان" },
  { Statevalue: "17", value: "17011", name: "اردكان" },
  { Statevalue: "10", value: "10022", name: "ارزوئيه" },
  { Statevalue: "30", value: "30021", name: "ارسك" },
  { Statevalue: "4", value: "4017", name: "ارسنجان" },
  { Statevalue: "28", value: "28007", name: "اركوازملكشاهي" },
  { Statevalue: "7", value: "7001", name: "اروميه" },
  { Statevalue: "13", value: "13004", name: "آزادشهر" },
  { Statevalue: "11", value: "11009", name: "ازنا" },
  { Statevalue: "9", value: "9006", name: "آستارا" },
  { Statevalue: "9", value: "9013", name: "آستانه اشرفيه" },
  { Statevalue: "4", value: "4014", name: "استهبان" },
  { Statevalue: "16", value: "16003", name: "اسدآباد" },
  { Statevalue: "29", value: "29011", name: "اسفراين" },
  { Statevalue: "8", value: "8070", name: "اسكو" },
  { Statevalue: "12", value: "12002", name: "اسلام آبادغرب" },
  { Statevalue: "1", value: "1006", name: "اسلام‌شهر" },
  { Statevalue: "31", value: "1056", name: "اشتهارد" },
  { Statevalue: "15", value: "15009", name: "آشتيان اراك" },
  { Statevalue: "29", value: "29003", name: "آشخانه" },
  { Statevalue: "17", value: "17021", name: "اشکذر" },
  { Statevalue: "7", value: "7011", name: "اشنويه" },
  { Statevalue: "6", value: "6001", name: "اصفهان" },
  { Statevalue: "22", value: "22045", name: "اصلان دوز" },
  { Statevalue: "5", value: "5018", name: "آغاجاري" },
  { Statevalue: "13", value: "13009", name: "آق‌قلا" },
  { Statevalue: "4", value: "4008", name: "اقليد" },
  { Statevalue: "1", value: "1069", name: "اكبرآباد/نس" },
  { Statevalue: "11", value: "11007", name: "الشتر" },
  { Statevalue: "5", value: "5282", name: "الوان" },
  { Statevalue: "18", value: "18102", name: "الوند" },
  { Statevalue: "11", value: "11006", name: "اليگودرز" },
  { Statevalue: "3", value: "3003", name: "آمل" },
  { Statevalue: "9", value: "9042", name: "املش" },
  { Statevalue: "5", value: "5012", name: "اميديه" },
  { Statevalue: "3", value: "3416", name: "اميركلا" },
  { Statevalue: "10", value: "10010", name: "انار" },
  { Statevalue: "5", value: "5007", name: "انديمشك" },
  { Statevalue: "8", value: "8008", name: "اهر" },
  { Statevalue: "26", value: "26015", name: "اهرم" },
  { Statevalue: "5", value: "5001", name: "اهواز" },
  { Statevalue: "4", value: "4023", name: "اوز" },
  { Statevalue: "5", value: "5013", name: "ايذه" },
  { Statevalue: "25", value: "25004", name: "ايرانشهر" },
  { Statevalue: "28", value: "28001", name: "ايلام" },
  { Statevalue: "8", value: "8100", name: "ايلخچي" },
  { Statevalue: "28", value: "28010", name: "ايوان غرب" },
  { Statevalue: "21", value: "21014", name: "ايوانكي" },
  { Statevalue: "3", value: "3002", name: "بابل" },
  { Statevalue: "3", value: "3008", name: "بابلسر" },
  { Statevalue: "2", value: "2116", name: "باخرز" },
  { Statevalue: "6", value: "6069", name: "بادرودكاشان" },
  { Statevalue: "8", value: "8111", name: "باسمنج" },
  { Statevalue: "19", value: "19004", name: "باشت" },
  { Statevalue: "6", value: "6070", name: "باغ ابريشم" },
  { Statevalue: "6", value: "6019", name: "باغ بهادران" },
  { Statevalue: "1", value: "1316", name: "باغستان" },
  { Statevalue: "5", value: "5040", name: "باغملك" },
  { Statevalue: "10", value: "10012", name: "بافت" },
  { Statevalue: "17", value: "17009", name: "بافق" },
  { Statevalue: "4", value: "4077", name: "بالاده كازرون" },
  { Statevalue: "14", value: "14006", name: "بانه" },
  { Statevalue: "2", value: "30016", name: "بجستان" },
  { Statevalue: "29", value: "29001", name: "بجنورد" },
  { Statevalue: "28", value: "28012", name: "بدره" },
  { Statevalue: "26", value: "26002", name: "برازجان" },
  { Statevalue: "2", value: "2021", name: "بردسكن" },
  { Statevalue: "10", value: "10009", name: "بردسير" },
  { Statevalue: "16", value: "16042", name: "برزول" },
  { Statevalue: "11", value: "11002", name: "بروجرد" },
  { Statevalue: "20", value: "20005", name: "بروجن" },
  { Statevalue: "23", value: "23021", name: "بزين" },
  { Statevalue: "8", value: "8012", name: "بستان آباد" },
  { Statevalue: "27", value: "27021", name: "بستك" },
  { Statevalue: "27", value: "27007", name: "بشاگرد" },
  { Statevalue: "30", value: "30004", name: "بشرويه" },
  { Statevalue: "10", value: "10004", name: "بم" },
  { Statevalue: "20", value: "20028", name: "بن" },
  { Statevalue: "8", value: "8007", name: "بناب" },
  { Statevalue: "3", value: "3327", name: "بندپي" },
  { Statevalue: "27", value: "27024", name: "بندر جاسك" },
  { Statevalue: "27", value: "27028", name: "بندر خمير" },
  { Statevalue: "26", value: "26030", name: "بندر دیر" },
  { Statevalue: "26", value: "26031", name: "بندر ديلم" },
  { Statevalue: "27", value: "27170", name: "بندر کنگ و" },
  { Statevalue: "26", value: "26035", name: "بندر گناوه" },
  { Statevalue: "27", value: "27008", name: "بندر لنگه" },
  { Statevalue: "5", value: "5279", name: "بندرامام خميني" },
  { Statevalue: "9", value: "9009", name: "بندرانزلي" },
  { Statevalue: "13", value: "13006", name: "بندرتركمن" },
  { Statevalue: "27", value: "27001", name: "بندرعباس" },
  { Statevalue: "13", value: "13005", name: "بندرگز" },
  { Statevalue: "17", value: "17032", name: "بهاباد" },
  { Statevalue: "16", value: "16007", name: "بهار" },
  { Statevalue: "6", value: "6008", name: "بهارستان" },
  { Statevalue: "5", value: "5004", name: "بهبهان" },
  { Statevalue: "3", value: "3009", name: "بهشهر" },
  { Statevalue: "4", value: "4101", name: "بهمن" },
  { Statevalue: "19", value: "19037", name: "بهمئي" },
  { Statevalue: "3", value: "3100", name: "بهنمير" },
  { Statevalue: "4", value: "4102", name: "بوانات /سوريان" },
  { Statevalue: "26", value: "26001", name: "بوشهر" },
  { Statevalue: "7", value: "7007", name: "بوكان" },
  { Statevalue: "1", value: "1079", name: "بومهن" },
  { Statevalue: "18", value: "18029", name: "بوئين زهرا" },
  { Statevalue: "6", value: "6083", name: "بوئين مياندشت" },
  { Statevalue: "21", value: "21021", name: "بيارجمند" },
  { Statevalue: "14", value: "14005", name: "بيجار" },
  { Statevalue: "11", value: "11167", name: "بيران شهر" },
  { Statevalue: "30", value: "30001", name: "بيرجند" },
  { Statevalue: "22", value: "22093", name: "بيله سوار" },
  { Statevalue: "22", value: "22005", name: "پارس‌آباد مغان" },
  { Statevalue: "27", value: "27122", name: "پارسيان" },
  { Statevalue: "1", value: "1010", name: "پاكدشت" },
  { Statevalue: "12", value: "12004", name: "پاوه" },
  { Statevalue: "1", value: "1190", name: "پرديس" },
  { Statevalue: "11", value: "11008", name: "پلدختر" },
  { Statevalue: "7", value: "7015", name: "پلدشت" },
  { Statevalue: "7", value: "7010", name: "پيرانشهر" },
  { Statevalue: "6", value: "6095", name: "پيربكران" },
  { Statevalue: "1", value: "1022", name: "پيشوا" },
  { Statevalue: "22", value: "22104", name: "تازه كندانگوت" },
  { Statevalue: "18", value: "18002", name: "تاكستان" },
  { Statevalue: "9", value: "9004", name: "تالش" },
  { Statevalue: "2", value: "2010", name: "تايباد" },
  { Statevalue: "8", value: "8001", name: "تبريز" },
  { Statevalue: "2", value: "2016", name: "تربت جام" },
  { Statevalue: "2", value: "2004", name: "تربت حيدريه" },
  { Statevalue: "8", value: "8156", name: "تركمن چاي" },
  { Statevalue: "17", value: "17005", name: "تفت" },
  { Statevalue: "15", value: "15006", name: "تفرش" },
  { Statevalue: "7", value: "7014", name: "تكاب" },
  { Statevalue: "4", value: "4126", name: "تل بيضا" },
  { Statevalue: "3", value: "3007", name: "تنكابن" },
  { Statevalue: "1", value: "1001", name: "تهران" },
  { Statevalue: "6", value: "6101", name: "تودشك" },
  { Statevalue: "16", value: "16005", name: "تويسركان" },
  { Statevalue: "6", value: "6102", name: "تيران" },
  { Statevalue: "29", value: "29002", name: "جاجرم" },
  { Statevalue: "22", value: "22123", name: "جعفرآباد" },
  { Statevalue: "2", value: "2223", name: "جغتاي" },
  { Statevalue: "8", value: "8011", name: "جلفا" },
  { Statevalue: "26", value: "26062", name: "جم" },
  { Statevalue: "2", value: "2228", name: "جنگل" },
  { Statevalue: "4", value: "4002", name: "جهرم" },
  { Statevalue: "12", value: "12005", name: "جوانرود" },
  { Statevalue: "3", value: "3016", name: "جويبار" },
  { Statevalue: "4", value: "4150", name: "جويم" },
  { Statevalue: "10", value: "10005", name: "جيرفت" },
  { Statevalue: "9", value: "9097", name: "چابكسر" },
  { Statevalue: "25", value: "25003", name: "چابهار" },
  { Statevalue: "6", value: "6126", name: "چادگان" },
  { Statevalue: "7", value: "7076", name: "چالدران سيا" },
  { Statevalue: "3", value: "3005", name: "چالوس" },
  { Statevalue: "17", value: "17043", name: "چاهك هاشم آباد" },
  { Statevalue: "10", value: "10071", name: "چترود" },
  { Statevalue: "19", value: "19036", name: "چرام" },
  { Statevalue: "3", value: "3014", name: "چمستان" },
  { Statevalue: "2", value: "2020", name: "چناران" },
  { Statevalue: "23", value: "23038", name: "چورزق طارم" },
  { Statevalue: "27", value: "27006", name: "حاجي آباد" },
  { Statevalue: "1", value: "1109", name: "حسن آبادفشا" },
  { Statevalue: "9", value: "9119", name: "حويق" },
  { Statevalue: "17", value: "17008", name: "خاتم" },
  { Statevalue: "26", value: "26079", name: "خارك /جزيره" },
  { Statevalue: "25", value: "25049", name: "خاش" },
  { Statevalue: "13", value: "13086", name: "خان ببين" },
  { Statevalue: "8", value: "8572", name: "خدا آفرين" },
  { Statevalue: "23", value: "23046", name: "خدابنده" },
  { Statevalue: "4", value: "4184", name: "خرامه" },
  { Statevalue: "11", value: "11001", name: "خرم آباد" },
  { Statevalue: "4", value: "4020", name: "خرم‌بيد" },
  { Statevalue: "23", value: "23003", name: "خرمدره" },
  { Statevalue: "5", value: "5014", name: "خرمشهر" },
  { Statevalue: "8", value: "8211", name: "خسروشاه" },
  { Statevalue: "4", value: "4188", name: "خشت" },
  { Statevalue: "9", value: "9127", name: "خشكبيجار" },
  { Statevalue: "22", value: "22002", name: "خلخال" },
  { Statevalue: "15", value: "15004", name: "خمين" },
  { Statevalue: "6", value: "6013", name: "خميني شهر" },
  { Statevalue: "4", value: "4019", name: "خنج" },
  { Statevalue: "15", value: "15058", name: "خنداب" },
  { Statevalue: "2", value: "2018", name: "خواف" },
  { Statevalue: "6", value: "6009", name: "خوانسار" },
  { Statevalue: "6", value: "6012", name: "خوراسگان" },
  { Statevalue: "26", value: "26083", name: "خورموج" },
  { Statevalue: "6", value: "6023", name: "خوروبيابانك" },
  { Statevalue: "7", value: "7002", name: "خوي" },
  { Statevalue: "4", value: "4010", name: "داراب" },
  { Statevalue: "6", value: "6014", name: "داران" },
  { Statevalue: "4", value: "4203", name: "داريون" },
  { Statevalue: "12", value: "12129", name: "دالاهو" },
  { Statevalue: "21", value: "21004", name: "دامغان" },
  { Statevalue: "6", value: "6173", name: "دامنه" },
  { Statevalue: "6", value: "6176", name: "درچه پياز" },
  { Statevalue: "2", value: "2019", name: "در‌گز" },
  { Statevalue: "28", value: "28002", name: "دره شهر" },
  { Statevalue: "5", value: "5002", name: "دزفول" },
  { Statevalue: "5", value: "4214", name: "دشت آزادگان" },
  { Statevalue: "13", value: "13091", name: "دلند" },
  { Statevalue: "26", value: "26093", name: "دلوار" },
  { Statevalue: "15", value: "15003", name: "دليجان" },
  { Statevalue: "1", value: "1011", name: "دماوند" },
  { Statevalue: "6", value: "6022", name: "دهاقان" },
  { Statevalue: "5", value: "5109", name: "دهدز" },
  { Statevalue: "19", value: "19003", name: "دهدشت" },
  { Statevalue: "14", value: "14008", name: "دهگلان" },
  { Statevalue: "28", value: "28004", name: "دهلران" },
  { Statevalue: "11", value: "11095", name: "دوره" },
  { Statevalue: "11", value: "11005", name: "دورود" },
  { Statevalue: "6", value: "6196", name: "دولت آباد" },
  { Statevalue: "2", value: "2347", name: "دولت آبادتر" },
  { Statevalue: "14", value: "14009", name: "ديواندره" },
  { Statevalue: "10", value: "10014", name: "رابر" },
  { Statevalue: "29", value: "29007", name: "راز" },
  { Statevalue: "3", value: "3006", name: "رامسر" },
  { Statevalue: "5", value: "5009", name: "رامهرمز" },
  { Statevalue: "13", value: "13098", name: "راميان" },
  { Statevalue: "10", value: "10115", name: "راور" },
  { Statevalue: "10", value: "10117", name: "راين" },
  { Statevalue: "1", value: "1017", name: "رباط كريم" },
  { Statevalue: "7", value: "7123", name: "ربط" },
  { Statevalue: "9", value: "9337", name: "رحيم آباد" },
  { Statevalue: "16", value: "16008", name: "رزن" },
  { Statevalue: "10", value: "10122", name: "رستم آباد" },
  { Statevalue: "3", value: "3206", name: "رستم كلا" },
  { Statevalue: "9", value: "9001", name: "رشت" },
  { Statevalue: "2", value: "2376", name: "رشتخوار" },
  { Statevalue: "9", value: "9010", name: "رضوانشهر" },
  { Statevalue: "10", value: "10003", name: "رفسنجان" },
  { Statevalue: "12", value: "12011", name: "روانسر" },
  { Statevalue: "27", value: "27004", name: "رودان" },
  { Statevalue: "10", value: "10124", name: "رودبار" },
  { Statevalue: "9", value: "9007", name: "رودبارمنجيل" },
  { Statevalue: "9", value: "9008", name: "رودسر" },
  { Statevalue: "1", value: "1012", name: "رودهن" },
  { Statevalue: "11", value: "11010", name: "رومشكان" },
  { Statevalue: "3", value: "3213", name: "رويان" },
  { Statevalue: "10", value: "10125", name: "ريگان" },
  { Statevalue: "25", value: "25002", name: "زابل" },
  { Statevalue: "17", value: "17004", name: "زارچ" },
  { Statevalue: "25", value: "25001", name: "زاهدان" },
  { Statevalue: "4", value: "4519", name: "زرقان" },
  { Statevalue: "10", value: "10007", name: "زرند" },
  { Statevalue: "23", value: "23058", name: "زرين آباداي" },
  { Statevalue: "23", value: "23059", name: "زرين آبادخد" },
  { Statevalue: "4", value: "4022", name: "زرين دشت" },
  { Statevalue: "6", value: "6007", name: "زرين شهر" },
  { Statevalue: "23", value: "23001", name: "زنجان" },
  { Statevalue: "6", value: "6217", name: "زواره اردستان" },
  { Statevalue: "10", value: "10129", name: "زيدآباد" },
  { Statevalue: "5", value: "5126", name: "زيدون" },
  { Statevalue: "3", value: "3227", name: "زيراب سوادکوه" },
  { Statevalue: "30", value: "30112", name: "زيرکوه" },
  { Statevalue: "3", value: "3001", name: "ساری" },
  { Statevalue: "20", value: "20004", name: "سامان" },
  { Statevalue: "15", value: "15002", name: "ساوه" },
  { Statevalue: "2", value: "2005", name: "سبزوار" },
  { Statevalue: "4", value: "4011", name: "سپيدان" },
  { Statevalue: "23", value: "23061", name: "سجاس" },
  { Statevalue: "4", value: "4278", name: "سده اقليد" },
  { Statevalue: "6", value: "6222", name: "سده لنجان" },
  { Statevalue: "8", value: "8005", name: "سراب" },
  { Statevalue: "28", value: "28045", name: "سرابله" },
  { Statevalue: "25", value: "25075", name: "سراوان" },
  { Statevalue: "30", value: "30011", name: "سرايان" },
  { Statevalue: "25", value: "25066", name: "سرباز راسك" },
  { Statevalue: "30", value: "30012", name: "سربيشه" },
  { Statevalue: "12", value: "12003", name: "سرپل ذهاب" },
  { Statevalue: "2", value: "2014", name: "سرخس" },
  { Statevalue: "13", value: "13109", name: "سرخن كلاته" },
  { Statevalue: "21", value: "21050", name: "سرخه" },
  { Statevalue: "8", value: "8568", name: "سردرود" },
  { Statevalue: "7", value: "7012", name: "سردشت" },
  { Statevalue: "22", value: "22188", name: "سرعين" },
  { Statevalue: "14", value: "14093", name: "سروآباد" },
  { Statevalue: "4", value: "4283", name: "سروستان شيراز" },
  { Statevalue: "4", value: "4285", name: "سعادت شهر" },
  { Statevalue: "14", value: "14003", name: "سقز" },
  { Statevalue: "2", value: "2437", name: "سلطان آبادس" },
  { Statevalue: "23", value: "23063", name: "سلطانيه" },
  { Statevalue: "7", value: "7003", name: "سلماس" },
  { Statevalue: "3", value: "3017", name: "سلمان شهر" },
  { Statevalue: "21", value: "21001", name: "سمنان" },
  { Statevalue: "6", value: "6018", name: "سميرم" },
  { Statevalue: "12", value: "12010", name: "سنقر" },
  { Statevalue: "9", value: "9172", name: "سنگر" },
  { Statevalue: "14", value: "14001", name: "سنندج" },
  { Statevalue: "3", value: "3015", name: "سوادكوه" },
  { Statevalue: "3", value: "3255", name: "سورك ساري" },
  { Statevalue: "19", value: "19014", name: "سوق دوگنبدان" },
  { Statevalue: "9", value: "9011", name: "سياهكل" },
  { Statevalue: "25", value: "25083", name: "سيب سوران و" },
  { Statevalue: "10", value: "10002", name: "سيرجان" },
  { Statevalue: "7", value: "7149", name: "سيلوانا" },
  { Statevalue: "5", value: "5147", name: "شادگان" },
  { Statevalue: "15", value: "15092", name: "شازند" },
  { Statevalue: "21", value: "21002", name: "شاهرود" },
  { Statevalue: "7", value: "7009", name: "شاهين دژ" },
  { Statevalue: "6", value: "6005", name: "شاهين شهر" },
  { Statevalue: "8", value: "8010", name: "شبستر" },
  { Statevalue: "2", value: "2471", name: "ششتمد" },
  { Statevalue: "9", value: "9189", name: "شفت" },
  { Statevalue: "10", value: "10149", name: "شهداد" },
  { Statevalue: "1", value: "1016", name: "شهر قدس" },
  { Statevalue: "10", value: "10006", name: "شهربابك" },
  { Statevalue: "1", value: "1179", name: "شهرجديد پرند" },
  { Statevalue: "31", value: "1180", name: "شهرجديد هشتگرد" },
  { Statevalue: "6", value: "6003", name: "شهرضا" },
  { Statevalue: "5", value: "5158", name: "شهرك حربن ر" },
  { Statevalue: "8", value: "8324", name: "شهرك سهند" },
  { Statevalue: "15", value: "15100", name: "شهرك مهاجران" },
  { Statevalue: "20", value: "20001", name: "شهركرد" },
  { Statevalue: "1", value: "1004", name: "شهريار" },
  { Statevalue: "21", value: "21057", name: "شهميرزاد" },
  { Statevalue: "5", value: "5008", name: "شوش دانيال" },
  { Statevalue: "5", value: "5003", name: "شوشتر" },
  { Statevalue: "7", value: "7153", name: "شوط" },
  { Statevalue: "4", value: "4001", name: "شيراز" },
  { Statevalue: "3", value: "3274", name: "شيرگاه" },
  { Statevalue: "29", value: "29012", name: "شيروان" },
  { Statevalue: "1", value: "1197", name: "صالح آباد" },
  { Statevalue: "2", value: "2500", name: "صالح آباد" },
  { Statevalue: "23", value: "23075", name: "صائين قلعه" },
  { Statevalue: "12", value: "12008", name: "صحنه" },
  { Statevalue: "4", value: "4334", name: "صغاد" },
  { Statevalue: "8", value: "8015", name: "صوفيان" },
  { Statevalue: "9", value: "9012", name: "صومعه سرا" },
  { Statevalue: "17", value: "17007", name: "طبس" },
  { Statevalue: "2", value: "2513", name: "طرقبه" },
  { Statevalue: "3", value: "3012", name: "عباس آباد" },
  { Statevalue: "8", value: "8006", name: "عجب شير" },
  { Statevalue: "17", value: "17101", name: "عشق آباد" },
  { Statevalue: "13", value: "13003", name: "علي آبادكتول" },
  { Statevalue: "10", value: "10013", name: "عنبرآباد" },
  { Statevalue: "20", value: "20002", name: "فارسان" },
  { Statevalue: "29", value: "29009", name: "فاروج" },
  { Statevalue: "10", value: "10168", name: "فارياب" },
  { Statevalue: "13", value: "13230", name: "فاضل آباد" },
  { Statevalue: "16", value: "16141", name: "فامنين" },
  { Statevalue: "4", value: "4024", name: "فراشبند" },
  { Statevalue: "20", value: "20003", name: "فرخ شهر" },
  { Statevalue: "30", value: "30002", name: "فردوس" },
  { Statevalue: "31", value: "1003", name: "فرديس" },
  { Statevalue: "3", value: "3018", name: "فريدون كنار" },
  { Statevalue: "6", value: "6279", name: "فريدونشهر" },
  { Statevalue: "2", value: "2013", name: "فريمان" },
  { Statevalue: "4", value: "4004", name: "فسا" },
  { Statevalue: "20", value: "20113", name: "فلارد" },
  { Statevalue: "6", value: "6015", name: "فلاورجان" },
  { Statevalue: "25", value: "25096", name: "فنوج" },
  { Statevalue: "10", value: "10172", name: "فهرج" },
  { Statevalue: "6", value: "6016", name: "فولاد شهر" },
  { Statevalue: "9", value: "9003", name: "فومن" },
  { Statevalue: "4", value: "4007", name: "فيروزآباد" },
  { Statevalue: "11", value: "11119", name: "فيروزآباد" },
  { Statevalue: "16", value: "16145", name: "فيروزان" },
  { Statevalue: "1", value: "1018", name: "فيروزكوه" },
  { Statevalue: "2", value: "2568", name: "فيض آبادترب" },
  { Statevalue: "4", value: "4523", name: "قادراباد" },
  { Statevalue: "3", value: "3004", name: "قائم شهر" },
  { Statevalue: "4", value: "4025", name: "قائميه" },
  { Statevalue: "30", value: "30003", name: "قائن" },
  { Statevalue: "1", value: "1021", name: "قرچك" },
  { Statevalue: "7", value: "7013", name: "قره‌ضياءالدين" },
  { Statevalue: "14", value: "14004", name: "قروه" },
  { Statevalue: "16", value: "16151", name: "قروه درجزين" },
  { Statevalue: "18", value: "18001", name: "قزوين" },
  { Statevalue: "27", value: "27005", name: "قشم" },
  { Statevalue: "12", value: "12009", name: "قصر شيرين" },
  { Statevalue: "10", value: "10178", name: "قلعه گنج" },
  { Statevalue: "24", value: "24001", name: "قم" },
  { Statevalue: "2", value: "2002", name: "قوچان" },
  { Statevalue: "4", value: "4021", name: "قير و كارزين" },
  { Statevalue: "4", value: "4003", name: "كازرون" },
  { Statevalue: "6", value: "6002", name: "كاشان" },
  { Statevalue: "2", value: "2008", name: "كاشمر" },
  { Statevalue: "13", value: "13217", name: "كاكا" },
  { Statevalue: "14", value: "14007", name: "كامياران" },
  { Statevalue: "16", value: "16006", name: "كبودرآهنگ" },
  { Statevalue: "8", value: "8526", name: "كجاآباد" },
  { Statevalue: "31", value: "1002", name: "كرج" },
  { Statevalue: "13", value: "13008", name: "كردكوي" },
  { Statevalue: "10", value: "10001", name: "كرمان" },
  { Statevalue: "12", value: "12001", name: "كرمانشاه" },
  { Statevalue: "10", value: "10227", name: "كشكوئيه رفس" },
  { Statevalue: "2", value: "2786", name: "كلات نادر" },
  { Statevalue: "9", value: "9018", name: "كلاچاي" },
  { Statevalue: "3", value: "3436", name: "كلارآباد" },
  { Statevalue: "3", value: "3437", name: "كلاردشت /حس" },
  { Statevalue: "13", value: "13011", name: "كلاله" },
  { Statevalue: "8", value: "8556", name: "كليبر" },
  { Statevalue: "31", value: "1298", name: "كمال آباد/ك" },
  { Statevalue: "4", value: "4497", name: "كنارتخته" },
  { Statevalue: "25", value: "25149", name: "كنارك" },
  { Statevalue: "12", value: "12006", name: "كنگاور" },
  { Statevalue: "10", value: "10008", name: "كهنوج" },
  { Statevalue: "4", value: "4012", name: "كوار" },
  { Statevalue: "9", value: "9016", name: "كوچصفهان" },
  { Statevalue: "9", value: "9328", name: "كومله" },
  { Statevalue: "11", value: "11161", name: "كوناني" },
  { Statevalue: "10", value: "10235", name: "كوهبنان" },
  { Statevalue: "11", value: "11003", name: "كوهدشت" },
  { Statevalue: "20", value: "20146", name: "كيار" },
  { Statevalue: "3", value: "3464", name: "كياسر" },
  { Statevalue: "9", value: "9333", name: "كياشهر" },
  { Statevalue: "3", value: "3459", name: "كياكلا" },
  { Statevalue: "20", value: "20144", name: "كيان" },
  { Statevalue: "27", value: "27002", name: "كيش" },
  { Statevalue: "13", value: "13174", name: "گاليكش" },
  { Statevalue: "5", value: "5220", name: "گتوند" },
  { Statevalue: "19", value: "19002", name: "گچساران" },
  { Statevalue: "11", value: "11166", name: "گراب" },
  { Statevalue: "4", value: "4386", name: "گراش" },
  { Statevalue: "13", value: "13001", name: "گرگان" },
  { Statevalue: "23", value: "23084", name: "گرماب" },
  { Statevalue: "21", value: "21003", name: "گرمسار" },
  { Statevalue: "22", value: "22006", name: "گرمي" },
  { Statevalue: "6", value: "6309", name: "گزبرخوار" },
  { Statevalue: "3", value: "3323", name: "گزنك" },
  { Statevalue: "10", value: "10188", name: "گلباف" },
  { Statevalue: "6", value: "6006", name: "گلپايگان" },
  { Statevalue: "1", value: "1313", name: "گلستان" },
  { Statevalue: "4", value: "4396", name: "گله دار" },
  { Statevalue: "3", value: "3466", name: "گلوگاه" },
  { Statevalue: "13", value: "13180", name: "گمیشان" },
  { Statevalue: "2", value: "2015", name: "گناباد" },
  { Statevalue: "13", value: "13002", name: "گنبد" },
  { Statevalue: "8", value: "8396", name: "گوگان" },
  { Statevalue: "16", value: "16163", name: "گيان" },
  { Statevalue: "12", value: "12110", name: "گيلانغرب" },
  { Statevalue: "4", value: "4009", name: "لار" },
  { Statevalue: "25", value: "25157", name: "لاشار" },
  { Statevalue: "16", value: "16165", name: "لالجين" },
  { Statevalue: "5", value: "5229", name: "لالي" },
  { Statevalue: "4", value: "4013", name: "لامرد" },
  { Statevalue: "9", value: "9002", name: "لاهيجان" },
  { Statevalue: "20", value: "20007", name: "لردگان" },
  { Statevalue: "9", value: "9017", name: "لشت نشا" },
  { Statevalue: "19", value: "19024", name: "لنده دوگنبدان" },
  { Statevalue: "9", value: "9005", name: "لنگرود" },
  { Statevalue: "1", value: "1013", name: "لواسانات" },
  { Statevalue: "8", value: "8426", name: "ليلان" },
  { Statevalue: "9", value: "9014", name: "ماسال" },
  { Statevalue: "7", value: "7008", name: "ماكو" },
  { Statevalue: "15", value: "15141", name: "مامونيه / ز" },
  { Statevalue: "5", value: "5006", name: "ماه شهر" },
  { Statevalue: "10", value: "10197", name: "ماهان" },
  { Statevalue: "31", value: "1244", name: "ماهدشت /مرد" },
  { Statevalue: "6", value: "6010", name: "مباركه" },
  { Statevalue: "15", value: "15005", name: "محلات" },
  { Statevalue: "31", value: "1014", name: "محمد شهر" },
  { Statevalue: "7", value: "7238", name: "محمديار" },
  { Statevalue: "18", value: "18084", name: "محمديه" },
  { Statevalue: "3", value: "3013", name: "محمودآباد" },
  { Statevalue: "8", value: "8003", name: "مراغه" },
  { Statevalue: "13", value: "13010", name: "مراوه تپه" },
  { Statevalue: "8", value: "8004", name: "مرند" },
  { Statevalue: "4", value: "4005", name: "مرودشت" },
  { Statevalue: "17", value: "17119", name: "مروست" },
  { Statevalue: "14", value: "14002", name: "مريوان" },
  { Statevalue: "10", value: "10240", name: "مس سرچشمه" },
  { Statevalue: "5", value: "5011", name: "مسجدسليمان" },
  { Statevalue: "31", value: "1305", name: "مشكين دشت" },
  { Statevalue: "22", value: "22003", name: "مشكين شهر" },
  { Statevalue: "2", value: "2001", name: "مشهد" },
  { Statevalue: "4", value: "4430", name: "مصيري" },
  { Statevalue: "1", value: "1315", name: "ملارد" },
  { Statevalue: "16", value: "16002", name: "ملاير" },
  { Statevalue: "8", value: "8009", name: "ملكان" },
  { Statevalue: "8", value: "8453", name: "ممقان" },
  { Statevalue: "10", value: "10015", name: "منوجان" },
  { Statevalue: "7", value: "7004", name: "مهاباد" },
  { Statevalue: "21", value: "21080", name: "مهدي شهر" },
  { Statevalue: "28", value: "28073", name: "مهران" },
  { Statevalue: "8", value: "8456", name: "مهربان" },
  { Statevalue: "17", value: "17034", name: "مهردشت" },
  { Statevalue: "17", value: "17010", name: "مهريز" },
  { Statevalue: "7", value: "7006", name: "مياندوآب" },
  { Statevalue: "8", value: "8002", name: "ميانه" },
  { Statevalue: "17", value: "17003", name: "ميبد" },
  { Statevalue: "6", value: "6348", name: "ميمه /وزوان" },
  { Statevalue: "27", value: "27003", name: "ميناب" },
  { Statevalue: "13", value: "13007", name: "مينودشت" },
  { Statevalue: "6", value: "6011", name: "نائين" },
  { Statevalue: "6", value: "6004", name: "نجف آباد" },
  { Statevalue: "3", value: "3378", name: "نشتارود" },
  { Statevalue: "1", value: "1269", name: "نصيرآبادقاجار" },
  { Statevalue: "6", value: "6017", name: "نطنز" },
  { Statevalue: "10", value: "10212", name: "نظام آباد" },
  { Statevalue: "31", value: "1019", name: "نظرآباد" },
  { Statevalue: "2", value: "2707", name: "نقاب سبزوار" },
  { Statevalue: "7", value: "7005", name: "نقده" },
  { Statevalue: "3", value: "3010", name: "نكا" },
  { Statevalue: "10", value: "10213", name: "نگار" },
  { Statevalue: "22", value: "22004", name: "نمين" },
  { Statevalue: "16", value: "16004", name: "نهاوند" },
  { Statevalue: "30", value: "30015", name: "نهبندان" },
  { Statevalue: "4", value: "4461", name: "نودان" },
  { Statevalue: "13", value: "13200", name: "نوده خاندوز" },
  { Statevalue: "3", value: "3011", name: "نور" },
  { Statevalue: "11", value: "11004", name: "نورآباد" },
  { Statevalue: "4", value: "4018", name: "نورآباد ممسني" },
  { Statevalue: "6", value: "6360", name: "نوش آباد" },
  { Statevalue: "3", value: "3019", name: "نوشهر" },
  { Statevalue: "4", value: "4015", name: "ني ريز" },
  { Statevalue: "2", value: "2003", name: "نيشابور" },
  { Statevalue: "23", value: "23109", name: "نيك پي" },
  { Statevalue: "25", value: "25138", name: "نيك شهرچابهار" },
  { Statevalue: "12", value: "12007", name: "هرسين" },
  { Statevalue: "6", value: "6371", name: "هرند" },
  { Statevalue: "8", value: "8487", name: "هريس" },
  { Statevalue: "8", value: "8014", name: "هشترود" },
  { Statevalue: "31", value: "1005", name: "هشتگرد" },
  { Statevalue: "20", value: "20006", name: "هفشجان" },
  { Statevalue: "16", value: "16001", name: "همدان" },
  { Statevalue: "5", value: "5258", name: "هنديجان" },
  { Statevalue: "23", value: "23113", name: "هيدج" },
  { Statevalue: "1", value: "1008", name: "ورامين" },
  { Statevalue: "1", value: "1304", name: "وردآورد" },
  { Statevalue: "8", value: "8499", name: "ورزقان اهر" },
  { Statevalue: "19", value: "19001", name: "ياسوج" },
  { Statevalue: "17", value: "17001", name: "يزد" },
];
export default function Index({ setopen, apiInsertGift }) {
  const [province, setProvince] = useState([]);
  const [citiesList, setCitiesList] = useState([]);
  const [city, setCity] = useState([]);
  const intl = useIntl();
  let classes = useStyles();

  let initialValues = {
    provinceName: " ",
    cityName: " ",
    address: "",
    postalCode: "",
    mobile: "",
    personName: "",
  };

  useEffect(() => {
    if (province) {
      let filterCity = cities.filter((item) => item.Statevalue === province);
      let array = [{ Statevalue: "", value: "", name: "شهر" }, ...filterCity];
      setCitiesList(array);
    };
  }, [province]);

  const setCityVal = (values) => {
    let arrayOfCity = cities.filter((item) => item.value === city);
    values.cityName = arrayOfCity[0]?.name;
  };

  const setProvinceVal = (values) => {
    let arrayOfProvince = provinceList.filter((item) => item.value === province);
    values.provinceName = arrayOfProvince[0]?.name;
  };

  const validateShcama = Yup.object().shape({
    address: Yup.string().required(
      intl.formatMessage({
        id: "AUTH.VALIDATION.REQUIRED_FIELD",
      })
    ),
    postalCode: Yup.string().required(
      intl.formatMessage({
        id: "AUTH.VALIDATION.REQUIRED_FIELD",
      })
    )
    .matches(regex_number_english, 'کد پستی فقط می تواند شامل اعداد باشد')
    .min(10,"کد پستی نمیتواند کمتر از 10 رقم باشد")
    .max(10,"کد پستی نمیتواند بیشتر از 10 رقم باشد"),
     mobile: Yup.string().required(
      intl.formatMessage({
        id: "AUTH.VALIDATION.REQUIRED_FIELD",
      })
    )
      .matches(regex_number_english, 'موبایل گیرنده فقط می تواند شامل اعداد باشد')
      .matches(regx_phone, 'موبایل گیرنده را به درستی وارد کنید'),
    personName: Yup.string().required(
      intl.formatMessage({
        id: "AUTH.VALIDATION.REQUIRED_FIELD",
      })
    ),
  });

  let onSubmit = (values, { setSubmitting }) => {
    setCityVal(values);
    setProvinceVal(values);
    apiInsertGift(values);
    setSubmitting(false);
    setopen((prev) => !prev);
  };

  return (
    <div className={`${classes["root"]} `}>
      <div>
        <h4 className="modal-title">درخواست جوایز</h4>
      </div>
      <hr />
      <div>
        <Formik
          initialValues={{ ...initialValues }}
          validationSchema={validateShcama}
          onSubmit={onSubmit}
        >
          {({
            values,
            errors,
            touched,
            handleSubmit,
            isSubmitting,
            isValid,
            setFieldValue,
            /* and other goodies */
          }) => (
            <form onSubmit={handleSubmit}>
              <Box
                className={
                  "d-flex align-items-center justify-content-between flex-wrap w-100"
                }
              >
                <Box width="270px" style={{ marginBottom: 10 }}>
                  {/* <TextField
                    id="outlined-name"
                    label="استان"
                    value={values.provinceName}
                    onChange={(e) =>
                      setFieldValue("provinceName", e.target.value)
                    }
                    margin="normal"
                    variant="outlined"
                  /> */}
                  <SelectLabels
                    list={provinceList}
                    setState={setProvince}
                    state={province}
                  />
                  {touched.provinceName && errors.provinceName ? (
                    <small id="emailHelp" className="form-text text-danger">
                      {errors.provinceName}
                    </small>
                  ) : null}
                </Box>
                <Box width="270px" style={{ marginBottom: 10 }}>
                  {/* <TextField
                    id="outlined-name"
                    label="شهر"
                    value={values.cityName}
                    onChange={(e) => setFieldValue("cityName", e.target.value)}
                    margin="normal"
                    variant="outlined"
                  /> */}
                  <SelectLabels
                    list={citiesList}
                    setState={setCity}
                    state={city}
                  />
                  {touched.cityName && errors.cityName ? (
                    <small id="emailHelp" className="form-text text-danger">
                      {errors.cityName}
                    </small>
                  ) : null}
                </Box>
                <Box width="270px">
                  <TextField
                    id="outlined-name"
                    label="آدرس"
                    value={values.address}
                    onChange={(e) => setFieldValue("address", e.target.value)}
                    margin="normal"
                    variant="outlined"
                  />
                  {touched.address && errors.address ? (
                    <small id="emailHelp" className="form-text text-danger">
                      {errors.address}
                    </small>
                  ) : null}
                </Box>
                <Box width="270px">
                  <TextField
                    id="outlined-name"
                    label="کد پستی"
                    value={values.postalCode}
                    onChange={(e) =>
                      setFieldValue("postalCode", e.target.value)
                    }
                    margin="normal"
                    variant="outlined"
                  />
                  {touched.postalCode && errors.postalCode && (
                    <div className={"text-danger"}>
                      <small id="emailHelp" className="form-text text-danger">
                        {errors.postalCode}
                      </small>
                    </div>
                  )}
                </Box>
                <Box width="270px">
                  <TextField
                    id="outlined-name"
                    label="موبایل گیرنده"
                    value={values.mobile}
                    onChange={(e) => setFieldValue("mobile", e.target.value)}
                    margin="normal"
                    variant="outlined"
                  />
                  {touched.mobile && errors.mobile ? (
                    <small id="emailHelp" className="form-text text-danger">
                      {errors.mobile}
                    </small>
                  ) : null}
                </Box>
                <Box width="270px">
                  <TextField
                    id="outlined-name"
                    label="نام گیرنده"
                    value={values.personName}
                    onChange={(e) =>
                      setFieldValue("personName", e.target.value)
                    }
                    margin="normal"
                    variant="outlined"
                  />
                  {touched.personName && errors.personName && (
                    <div className={"text-danger"}>
                      <small id="emailHelp" className="form-text text-danger">
                        {errors.personName}
                      </small>
                    </div>
                  )}
                </Box>
              </Box>
              <hr />
              <div className={"d-flex justify-content-end align-items-center"}>
                <button
                  type="submit"
                  className="btn btn-success mr-5"
                  disabled={isSubmitting}
                >
                  ثبت{" "}
                </button>
                <button
                  type="button"
                  className="btn btn-outline-danger"
                  onClick={() => setopen((prev) => !prev)}
                >
                  انصراف
                </button>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
}
