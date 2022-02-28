import React from "react";

import {
  Page,
  View,
  Document,
  StyleSheet,
  Font,
  Image,
  Text,
} from "@react-pdf/renderer";
import TablePdf2 from "./tablePdf2";
const stylePdf = StyleSheet.create({
  main: {
    width: "98%",
    height: "87%",
    //  backgroundColor:'grey',
    borderRadius: 10,
    flexDirection: "column",
    alignItems: "flex-end",
    paddingTop: 2,
    paddingRight: 2,
    paddingLeft: 2,
    fontSize: 7.4,
    fontWeight: 900,
    position:'relative'
  },
  textBody: {
    fontSize: 7.4,
    textAlign: "left",
  },
  fontSize: {
    fontSize: 7.5,
  },
  padding: {
    marginTop: 10,
    paddingRight: 5,
    display: "flex",
    alignItems: "flex-end",
    fontSize: 7.3,
    position:'relative'
  },
  position:{
      position:'absolute',
      left:25,
      bottom:-35
  },
  margin:{
      marginBottom:5
  }
});

const BodyPdf2 = ({sejamInfoState}) => {
  return (
    <View style={stylePdf.main}>
      <Text style={stylePdf.fontSize}>
        این توافق نامه در اجرای ماده ۴۲ آئین نامه معاملات در بورس اوراق بهادار
        تهران بین کارگزاری مبین سرمایه و مشتری با مشخصات زیر:
      </Text>
      <TablePdf2 sejamInfoState={sejamInfoState}/>
      <View style={stylePdf.padding}>
        <Text style={stylePdf.margin}>منعقد و شرایط آن به شرح زیر تعیین می گردد:</Text>
        <Text>
          ماده ۱ .موضوع توافق نامه عبارت است از توافق كارگزار و مشتری جهت خرید و
          فروش اوراق بهادار برای مشتری براساس سفارش هایی كه به صورت الكترونیكی
          توسط مشتری برای كارگزاری ارسال میشوند.
        </Text>
        <Text>
          ماده ۲ .قرارداد تا زمان اعلام انصراف كتبی مشتری معتبر خواهد بود
        </Text>
        <Text>
          تبصره ۱ .مشتری می تواند در صورت تمایل به فسخ قرارداد با مراجعه حضوری
          به دفتر كارگزاری و درخواست كتبی نسبت به فسخ قرارداد اقدام نماید.
        </Text>
        <Text>
          تبصره ۲ .كارگزاری می تواند در صورت بروز هرگونه شرایط غیرقابل پیش بینی
          و بنا به تشخیص خود نسبت به فسخ قرارداد اقدام و مراتب را به صورت
          الكترونیكی به اطلاع مشتری برساند
        </Text>
        <Text>
          ماده۳ .مشتری می تواند در هر زمانی كه نیاز داشته باشد با توجه به
          امكاناتی كه سایت در اختیار قرار می دهد رمز عبور خود را به دلخواه تغییر
          دهد.
        </Text>
        <Text>
          ماده ۴ .مشتری حساب بانكی خود را جهت واریز وجوه حاصل از فروش اوراق
          بهادار به كارگزار معرفی می كند.{" "}
        </Text>
        <Text>
          ماده ۵ .مشتری آدرس پست الكترونیكی خود را به شرح ذیل جهت ارسال كلمه
          عبور، پیام های مربوط و سایر موارد در اختیار كارگزاری قرار داده و متعهد
          می شود كه حداقل هر ۸۴ ساعت یكبار آن را كنترل
        </Text>
        <Text>نماید.</Text>
        <View style={stylePdf.position}>
          <Text>امضا مشتری:</Text>
        </View>
      </View>
    </View>
  );
};
export default BodyPdf2;
