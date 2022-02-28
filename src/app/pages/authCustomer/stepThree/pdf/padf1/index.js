import React from "react";
import {
  Page,
  View,
  Document,
  StyleSheet,
  Font,
  Text,
} from "@react-pdf/renderer";
import Iransans from "./font/IRANSansWeb.ttf";
import HeaderPdf1 from "./headerPdf1";
import BodyPdf1 from "./bodyPdf1";
import Pdf1Page2 from "./page2";

Font.register({
  family: "iransans",
  format: "truetype", // 1
  src: Iransans,
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

const MyPdf1 = ({
  sejamInfoState
}) => (
  <Document style={stylePdf.root}>
    <Page size="A4" orientation="portrait">
      <View style={stylePdf.main}>
        <HeaderPdf1 />
        <BodyPdf1 sejamInfoState={sejamInfoState}/>
       
        <Text style={stylePdf.font}>صفحه ۱ از ۲</Text>
      </View>
    </Page>
    <Pdf1Page2 />
  </Document>
);

export default MyPdf1;
