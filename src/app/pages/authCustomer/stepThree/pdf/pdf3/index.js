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
import HeaderPdf3 from "./headerPdf3";
import BodyPdf3Page1 from './bodyPdf3Page1'
import BodyPdf3Page2 from "./bodyPdf3Page2";
import BodyPdf3Page3 from "./bodyPdf3Page3";


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

const MyPdf3 = ({
  sejamInfoState
}) => (
  <Document style={stylePdf.root}>
    <Page size="A4" orientation="portrait">
      <View style={stylePdf.main}>
          <HeaderPdf3/>
    <BodyPdf3Page1 sejamInfoState={sejamInfoState}/>
        <Text style={stylePdf.font}>صفحه ۱ از ۳</Text>
      </View>
    </Page>
    <Page size="A4" orientation="portrait">
      <View style={stylePdf.main}>
      <HeaderPdf3/>
      <BodyPdf3Page2/>
        <Text style={stylePdf.font}>صفحه ۲ از ۳</Text>
      </View>
    </Page>
    <Page size="A4" orientation="portrait">
      <View style={stylePdf.main}>
      <HeaderPdf3/>
      <BodyPdf3Page3/>
        <Text style={stylePdf.font}>صفحه ۳ از ۳</Text>
      </View>
    </Page>
  </Document>
);

export default MyPdf3;
