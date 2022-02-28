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
import iransans from './font/IRANSansWeb.ttf'
import HeaderPdf4 from "./headerPdf4";
import BodyPdf4Page1 from "./bodyPdf4Page1";
import BodyPdf4Page2 from "./bodyPdf4Page2";
// import HeaderPdf2 from "./headerPdf2";
// import BodyPdf2 from "./bodyPdf2";
// import BodyPdf2Page2 from "./padf2Page2/bodyPdf2page2";

Font.register({
  family: "iransans",
  format: "truetype", // 1
  src: iransans,
  fontStyle: "normal",
  fontWeight: "normal",
});

const stylePdf = StyleSheet.create({
  root: {
    fontFamily: "iransans",
  },
  main: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  font: {
    fontSize: 9,
  },
});

const MyPdf4 = ({
  sejamInfoState
}) => (
  <Document style={stylePdf.root}>
    <Page size="A4" orientation="portrait">
      <View style={stylePdf.main}>
        <HeaderPdf4/>
        <BodyPdf4Page1 sejamInfoState={sejamInfoState}/>
        <Text style={stylePdf.font}>صفحه ۱ از ۲</Text>
      </View>
    </Page>
    <Page size="A4" orientation="portrait">
      <View style={stylePdf.main}>
      <HeaderPdf4/>
      <BodyPdf4Page2/>
        <Text style={stylePdf.font}>صفحه ۲ از ۲</Text>
      </View>
    </Page>
  </Document>
);

export default MyPdf4;
