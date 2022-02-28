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
import TablePdf3 from "./tablePdf3";
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
    position: "relative",
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
    position: "relative",
  },
  position: {
    position: "absolute",
    left: 25,
    bottom: -35,
  },
  margin: {
    marginBottom: 5,
  },
  marginTop25:{
    marginTop:25,
    marginRight:5
  },
  marginTop10:{
    marginTop:10,
  }
});

const BodyPdf3Page1 = ({sejamInfoState}) => {
  return (
    <View style={stylePdf.main}>
      <Text style={stylePdf.fontSize}>
        قرارداد حاضر بین کارگزاری مبین سرمایه و مشتری
        آقای/خانم....................... به شرح ذیل منعقد گردید. تعاریف
        دستورالعمل اجرایی معاملات و برخط اوراق بهادار در بورس اوراق
      </Text>
      <Text>
        بهادار تهران و فرابورس ایران در این قرارداد به همان مفاهیم به کار رفته
        است.
      </Text>
      <Text>ماده ۱ :طرفین قرارداد</Text>
      <Text>
        این قرارداد بین به مشخصات جدول زیر که از این پس در این قرارداد عضو
        نامیده می شود:
      </Text>
      <TablePdf3 sejamInfoState={sejamInfoState}/>
      <Text style={stylePdf.marginTop10}>به شرح مواد آتی منعقد گردید.</Text>
      <Text>ماده ۲ :موضوع قرارداد</Text>
      <Text>
        استفاده از خدمات معاملات برخط آنلاین اوراق بهادار در بورس اوراق بهادار
        تهران و یا فرابورس ایران
      </Text>
      <Text>ماده ۳ :مدت قرارداد</Text>
      <Text>این قرارداد از تاریخ ......./......../......۴۱ بدون محدودیت زمانی است.</Text>
      <Text>ماده ۴ :حقوق و تعهدات عضو</Text>
      <Text>۱-۴ :عضو باید نام کاربری و رمز عبور استفاده از سامانه معاملاتی را برای انجام معاملات برخط، به صورت محرمانه و چاپی یا از طریق پست الکترونیکی ظرف حداکثر یک هفته پس از امضای این</Text>
      <Text>قرار داد، در اختیار مشتری قرار دهد و ارایه خدمات آغاز گردد</Text>
      <Text style={stylePdf.marginTop25}>امضا مشتری: </Text>
    </View>
  );
};

export default BodyPdf3Page1;
