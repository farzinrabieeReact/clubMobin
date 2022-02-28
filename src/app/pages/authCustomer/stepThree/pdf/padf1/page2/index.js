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
import HeaderPdf1 from "../headerPdf1";
import BodyPdf1 from "../bodyPdf1";
import BodyPdf1Page2 from "./bodypdf1Page2";




const stylePdf = StyleSheet.create({
 
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

const MyPdf = ({
  totalPdf,
  bourseInstruments,
  handleClose,
  flag,
  setflag,
  mainCategory,
  exmaple,
  arrayState,
}) => (
    <Page size="A4" orientation="portrait">
      <View style={stylePdf.main}>
        <HeaderPdf1 />
        <BodyPdf1Page2/>
        <Text style={stylePdf.font}>صفحه ۲ از ۲</Text>
      </View>
    </Page>
);

export default MyPdf;
