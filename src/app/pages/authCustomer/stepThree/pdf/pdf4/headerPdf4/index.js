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
const stylePdf = StyleSheet.create({
  root: {
    fontFamily: "iransans",
  },
  headerParent: {
    width: "100%",
    height: "9%",
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row-reverse",
    padding: "10px 10px 0 10px",
  },
  box: {
      width: 7,
      height: 7,
      backgroundColor: "black",
      borderRadius: 2,
      position: "absolute",
      right: 0,
      top: 5,
    },
    titleParent: {
      width: "30%",
      height: "100%",
      marginRight: 15,
      display: "flex",
      flexDirection: "column",
      alignItems:'flex-start',
    },
 
  titleText: {
      width:100,
    fontSize: 10,
    textAlign: "right",
  },
  logo: {
    width: 80,
    height: 25,
  },
  position: {
    position: "relative",
  },
  parentDateBox: {
    width: 90,
    height: 40,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  dateBox: {
    width: 60,
    height: 20,
    border: "1px solid black",
    borderRadius: 5,
    marginRight: 5,
  },
  fontSize7: {
    fontSize: 7,
  },
  display: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
  },
});

const HeaderPdf4 = () => {
  return (
      <View style={stylePdf.headerParent}>
        <View style={stylePdf.position}>
          <View style={stylePdf.box}></View>
          <View style={stylePdf.titleParent}>
            <Text style={stylePdf.titleText}>
            فرم مشخصات 
            </Text>
            <Text style={stylePdf.titleText}>اشخاص حقیقی</Text>
          </View>
        </View>
        <Image style={stylePdf.logo} src={"/media/authCustomer/Group 2.png"} />
        <View style={stylePdf.display}>
          <View style={stylePdf.parentDateBox}>
            <View style={stylePdf.dateBox}></View>
            <Text style={stylePdf.fontSize7}>سریال</Text>
          </View>
          <View style={stylePdf.parentDateBox}>
            <View style={stylePdf.dateBox}></View>
            <Text style={stylePdf.fontSize7}>تاریخ</Text>
          </View>
        </View>
      </View>
  );
};

export default HeaderPdf4;