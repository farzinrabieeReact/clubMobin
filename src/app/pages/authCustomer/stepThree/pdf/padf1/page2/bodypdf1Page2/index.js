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
import Pdf1Page2Box1 from "./box1";
import Pdf1Page2Box2 from "./box2";
import style from "react-syntax-highlighter/dist/esm/styles/hljs/a11y-dark";
const stylePdf = StyleSheet.create({
  main: {
    width: "98%",
    height: "87%",
    //  backgroundColor:'grey',
    border: "1px solid black",
    borderRadius: 10,
    flexDirection: "column",
    alignItems: "flex-end",
    paddingTop: 2,
    paddingRight: 2,
    paddingLeft: 2,
  },
  boxParent:{
      width:'100%',
      height:'300px',
      display:'flex',
      marginTop:30,
      justifyContent:'space-around',
      flexDirection:'row',
  },
  textBody: {
    fontSize: 7.4,
    textAlign: "left",
  },
});

const BodyPdf1Page2 = () => {
  return (
    <View style={stylePdf.main}>
      <Text style={stylePdf.textBody}>۱۷-ریسک های مذكور در این سند جنبه حصری ندارند و اینجانب/ اینجانبان اقرار میدارم/ میداریم كه نسبت به تمام ریسک های این بازار اعم از موارد مذكور در این بیانیه و غیر آن را آگاهی كامل داشته</Text>
      <Text style={stylePdf.textBody}>و آن ریسك ها را مشمول مفاد این اقرارنامه و بیانیه پذیرش ریسک، تلقی می نمایم/ می نماییم.</Text>
      <Text style={stylePdf.textBody}>۱۸-متعهد شدم/ شدیم مفاد تمامی قوانین و مقررات لازم الاجرای بازار سرمایه به ویژه در حوزه شركت های درج شده در بازار پایه و ضوابط معاملاتی آن ها را رعایت نموده و از هرگونه اقدامی كه منجر به </Text>
      <Text style={stylePdf.textBody}>نقض قوانین و مقررات شود، خودداری نمایم/ نماییم. به موجب این سند اینجانب/ نام نام خانوادگی صاحب/ صاحبان امضای مجاز شركت اقرارنامه و بیانیه پذیرش ریسک معاملات سهام و حق تقدم </Text>
      <Text style={stylePdf.textBody}>خرید سهام در بازار پایه را دریافت و مطالعه نموده و ضمن اعلام و اقرار به آگاهی و اطلاع از كلیه قوانین و مقررات و شرایط معاملاتی و ریسک هایی كه در آن بازار متصور بوده و احتمال وقوع دارد و نیز</Text>
      <Text style={stylePdf.textBody}>با شناخت و درک كامل از ماهیت امر و شرایط و مقررات مربوط، مراتب فوق الذكر را با اراده و اختیار كامل تأیید نموده و هیچ گونه اعتراض و ادعایی اعم از حقوقی و جزایی در حال حاضر یا بعدا در این</Text>
      <Text style={stylePdf.textBody}>خصوص ندارم/ نداریم و حق دعوی خود در این زمینه را علی الدوام سلب و ساقط كردم/ كردیم.</Text>
      <View style={stylePdf.boxParent}>
          <Pdf1Page2Box1/>
          <Pdf1Page2Box2/>
      </View>
    </View>
  );
};
export default BodyPdf1Page2;
