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
import TablePdf4 from "./tablePdf4";
const stylePdf = StyleSheet.create({
  main: {
    width: "98%",
    height: "87%",
    //  backgroundColor:'grey',
    margin: "0 auto",
    display: "flex",
    alignItems: "flex-end",
    // border: "1px solid balck",
    borderRadius: 10,
    paddingTop: 3,
    fontSize: 7.3,
    marginBottom: 15,
    paddingRight: 2,
  },
  fontSize: {
    fontSize: 7.3,
    textAlign: "right",
  },
  fontSize2: {
    fontSize: 7.5,
    textAlign: "right",
    paddingRight:5,
    paddingTop:5
  },

  w50: {
    width: "50%",
    textAlign: "right",
    paddingBottom: 3,
  },
  w30: {
    width: "30%",
    textAlign: "right",
    paddingBottom: 3,
  },
  w20: {
    width: "20%",
    textAlign: "right",
    paddingBottom: 3,
  },
  w70: {
    width: "70%",
    textAlign: "right",
    paddingBottom: 3,
  },
  boxSm: {
    width: "25%",
    height: 170,
    border: "1px solid black",
    borderRadius: 8,
  },
  boxLg: {
    width: "73%",
    height: 170,
    border: "1px solid black",
    borderRadius: 8,
  },
  boxLgSlice1:{
    width:'100%',
    height:70,
    borderBottom:'1px solid black',
    display:'flex',
    flexDirection:'column',
    justifyContent:'space-around',
    alignItems:'flex-end',
    paddingRight:20,
    fontWeight:600

  },
  boxLgSlice2:{
    width:'100%',
    height:100,
    display:'flex',
    flexDirection:'row',
  },
  boxLgSlice2Child:{
    flex:'1',
    borderLeft:'1px solid black',
    display:'flex',
    alignItems:'flex-end',
    padding:'5px 5px 0 0 '

  },
  boxLgSlice2Child3:{
    flex:'1',
    display:'flex',
    alignItems:'flex-end',
    padding:'5px 5px 0 0 '
  },
  
  boxParent:{
      width:'100%',
      height:200,
      display:'flex',
      flexDirection:'row-reverse',
      justifyContent:'space-around',
      marginTop:15
  }
});

const BodyPdf4Page1 = ({sejamInfoState}) => {
  return (
    <>
      <View style={stylePdf.main}>
       <TablePdf4 sejamInfoState={sejamInfoState}/>
      </View>
    </>
  );
};
export default BodyPdf4Page1;
