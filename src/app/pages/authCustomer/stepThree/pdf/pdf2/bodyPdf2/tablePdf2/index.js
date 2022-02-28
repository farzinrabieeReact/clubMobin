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
import { dateConvertMiladiToShamsi } from "../../../../../../../common/method/date";
const stylePdf = StyleSheet.create({
  main: {
    width: "100%",
    height: "30%",
    //  backgroundColor:'grey',
    margin:'0 auto',
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
    fontSize: 7.4,
  marginBottom:15
  },
  main2: {
    width: "100%",
    height: "22%",
    //  backgroundColor:'grey',
    margin:'0 auto',
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
    fontSize: 7.4,
  },
  table:{
      width:'99%',
      height:'99%',
      marginTop:15,
      border:'1px solid black',
      borderRadius:10
  },
  tableTitle:{
      width:70,
      height:15,
      fontSize:7.5,
      display:'flex',
      justifyContent:'center',
      alignItems:'center',
      backgroundColor:'black',
      color:'white',
      position:'absolute',
      borderRadius:5,
      right:10,
      bottom:'97%'
  },
  tableRow:{
      width:'100%',
      height:'11.1%',
      borderBottom:'1px solid black',
      display:'flex',
      flexDirection:'row-reverse',
      justifyContent:'space-between',
      alignItems:'flex-end',
      paddingRight:5
  },
  tableRowLast:{
      width:'100%',
      height:'11.1%',
      display:'flex',
      flexDirection:'row-reverse',
      justifyContent:'space-between',
      alignItems:'flex-end',
      paddingRight:5
  },
  tableRow2:{
    width:'100%',
    height:'16.6%',
    borderBottom:'1px solid black',
    display:'flex',
    flexDirection:'row-reverse',
    justifyContent:'space-between',
    alignItems:'flex-end',
    paddingRight:5
},
  tableRow2Last:{
    width:'100%',
    height:'16.6%',
    display:'flex',
    flexDirection:'row-reverse',
    justifyContent:'space-between',
    alignItems:'flex-end',
    paddingRight:5
},
  w50:{
      width:'50%',
      textAlign:'right',
      paddingBottom:3

  },
  w30:{
      width:'30%',
      textAlign:'right',
      paddingBottom:3

  },
  w20:{
      width:'20%',
      textAlign:'right',
      paddingBottom:3

  },
  w70:{
      width:'70%',
      textAlign:'right',
      paddingBottom:3
  },
  fildTable:{
      fontSize:9,
      color:'gray'
  }
});

const TablePdf2 = ({sejamInfoState}) => {
    const handlegender=(gender)=>{
        switch (gender) {
            case "Female":
               return "زن"
            case "Male":
               return "مرد"
            default:
                break;
        }
    }
    const handleDate = (birthDate)=>{
        let date = dateConvertMiladiToShamsi(birthDate.split("T")[0].replaceAll("-","/"))
        return date
      }
  return (
      <>
    <View style={stylePdf.main}>
        <View style={stylePdf.table}>
            <View style={stylePdf.tableTitle}>
                <Text>اطلاعات مشتری</Text>
            </View>
            <View style={stylePdf.tableRow}>
                <Text style={stylePdf.w50}><View><Text style={stylePdf.fildTable}>{"   "}{sejamInfoState?.body?.privatePerson?.firstName}{"   "}</Text></View> نام:</Text>
                <Text  style={stylePdf.w50}><View><Text style={stylePdf.fildTable}>{"   "}{sejamInfoState?.body?.privatePerson?.placeOfIssue}{"   "}</Text></View> صادره از:</Text>
            </View>
            <View style={stylePdf.tableRow}>
                <Text style={stylePdf.w50}><View><Text style={stylePdf.fildTable}>{"   "}{sejamInfoState?.body?.privatePerson?.lastName}{"   "}</Text></View> نام خانوادگی:</Text>
                <Text  style={stylePdf.w50}><View><Text style={stylePdf.fildTable}>{"   "}{sejamInfoState?.body?.privatePerson?.shNumber}{"   "}</Text></View> شماره شناسنامه:</Text>
            </View>
            <View style={stylePdf.tableRow}>
                <Text style={stylePdf.w50}><View><Text style={stylePdf.fildTable}>{"   "}{sejamInfoState?.body?.privatePerson?.fatherName}{"   "}</Text></View> نام پدر:</Text>
                <Text  style={stylePdf.w50}><View><Text style={stylePdf.fildTable}>{"   "}{sejamInfoState?.body?.privatePerson?.serial}{"   "}</Text></View> سریال شناسنامه: </Text>
            </View>
            <View style={stylePdf.tableRow}>
                <Text style={stylePdf.w50}><View><Text style={stylePdf.fildTable}>{"   "}{handlegender(sejamInfoState?.body?.privatePerson?.gender)}{"   "}</Text></View> جنسیت:</Text>
                <Text  style={stylePdf.w50}><View><Text style={stylePdf.fildTable}>{"   "}{handleDate(sejamInfoState?.body?.privatePerson?.birthDate)}{"   "}</Text></View> تاریخ تولد:</Text>
            </View>
            <View style={stylePdf.tableRow}>
                <Text style={stylePdf.w50}><View><Text style={stylePdf.fildTable}>{"   "}{sejamInfoState?.body?.uniqueIdentifier}{"   "}</Text></View> کدملی:</Text>
                <Text  style={stylePdf.w50}> تحصیلات:</Text>
            </View>
            <View style={stylePdf.tableRow}>
                <Text style={stylePdf.w50}><View><Text style={stylePdf.fildTable}>{"   "}{sejamInfoState?.body?.email}{"   "}</Text></View> پست الکترونیکی:</Text>
                <Text  style={stylePdf.w50}>کد بورسی:</Text>
            </View>
            <View style={stylePdf.tableRow}>
                <Text style={stylePdf.w50}><View><Text style={stylePdf.fildTable}>{"   "}{sejamInfoState?.body?.addresses[0]?.remnantAddress}{"   "}</Text></View> آدرس:</Text>
            </View>
            <View style={stylePdf.tableRow}>
                <Text style={stylePdf.w30}><View><Text style={stylePdf.fildTable}>{"   "}{sejamInfoState?.body?.addresses[0]?.postalCode}{"   "}</Text></View> کد پستی:</Text>
                <Text  style={stylePdf.w70}><View><Text style={stylePdf.fildTable}>{"   "}{sejamInfoState?.body?.addresses[0]?.city?.name}{"   "}</Text></View> شهر محل سکونت:</Text>
            </View>
            <View style={stylePdf.tableRowLast}>
                <Text style={stylePdf.w30}><View><Text style={stylePdf.fildTable}>{"   "}{sejamInfoState?.body?.mobile}{"   "}</Text></View> تلفن همراه:</Text>
                <Text  style={stylePdf.w70}><View><Text style={stylePdf.fildTable}>{"   "}{sejamInfoState?.body?.mobile}{"   "}</Text></View> شماره تماس:</Text>
            </View>
        </View>
    </View>
    <View style={stylePdf.main2}>
        <View style={stylePdf.table}>
            <View style={stylePdf.tableTitle}>
                <Text>حساب های بانکی</Text>
            </View>
            <View style={stylePdf.tableRow2}>
                <Text style={stylePdf.w50}><View><Text style={stylePdf.fildTable}>{"   "}{sejamInfoState?.body?.accounts[0]?.accountNumber}{"   "}</Text></View> شماره حساب:</Text>
                <Text  style={stylePdf.w50}><View><Text style={stylePdf.fildTable}>{"   "}{sejamInfoState?.body?.accounts[0]?.branchCity?.name}{"   "}</Text></View> شهر:</Text>
            </View>
            <View style={stylePdf.tableRow2}>
                <Text style={stylePdf.w50}> نوع حساب:</Text>
                <Text style={stylePdf.w50}><View><Text style={stylePdf.fildTable}>{"   "}{sejamInfoState?.body?.accounts[0]?.sheba}{"   "}</Text></View> شماره شبا:</Text>
            </View>
            <View style={stylePdf.tableRow2}>
                <Text style={stylePdf.w50}><View><Text style={stylePdf.fildTable}>{"   "}{sejamInfoState?.body?.accounts[0]?.bank?.name}{"   "}</Text></View> نام بانک:</Text>
                <Text  style={stylePdf.w20}><View><Text style={stylePdf.fildTable}>{"   "}{sejamInfoState?.body?.accounts[0]?.branchName}</Text></View> نام شعبه:</Text>
                <Text  style={stylePdf.w30}><View><Text style={stylePdf.fildTable}>{"   "}{sejamInfoState?.body?.accounts[0]?.branchCode}</Text></View> کد شعبه:</Text>
            </View>
            <View style={stylePdf.tableRow2}>
                <Text style={stylePdf.w50}><View><Text style={stylePdf.fildTable}>{"   "}{sejamInfoState?.body?.accounts[1]?.accountNumber}{"   "}</Text></View> شماره حساب:</Text>
                <Text  style={stylePdf.w50}><View><Text style={stylePdf.fildTable}>{"   "}{sejamInfoState?.body?.accounts[1]?.branchCity?.name}{"   "}</Text></View> شهر:</Text>
            </View>
            <View style={stylePdf.tableRow2}>
                <Text style={stylePdf.w50}> نوع حساب:</Text>
                <Text style={stylePdf.w50}><View><Text style={stylePdf.fildTable}>{"   "}{sejamInfoState?.body?.accounts[1]?.sheba}{"   "}</Text></View> شماره شبا:</Text>
            </View>
            <View style={stylePdf.tableRow2Last}>
                <Text style={stylePdf.w50}><View><Text style={stylePdf.fildTable}>{"   "}{sejamInfoState?.body?.accounts[1]?.bank?.name}{"   "}</Text></View> نام بانک:</Text>
                <Text  style={stylePdf.w20}><View><Text style={stylePdf.fildTable}>{"   "}{sejamInfoState?.body?.accounts[1]?.branchName}</Text></View> نام شعبه:</Text>
                <Text  style={stylePdf.w30}><View><Text style={stylePdf.fildTable}>{"   "}{sejamInfoState?.body?.accounts[1]?.branchCode}</Text></View> کد شعبه:</Text>
            </View>
        </View>
    </View>
    </>
  );
};
export default TablePdf2;
