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
  main: {
    width: "100%",
    height: "24%",
    //  backgroundColor:'grey',
    margin: "0 auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 7.4,
    marginBottom: 10,
  },
  main2: {
    width: "100%",
    height: "22%",
    //  backgroundColor:'grey',
    margin: "0 auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 7.4,
  },
  main3: {
    width: "100%",
    height: "15%",
    //  backgroundColor:'grey',
    margin: "0 auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 7.4,
    marginBottom: 15,
    marginTop: 10,
  },
  main4: {
    width: "100%",
    height: "45%",
    //  backgroundColor:'grey',
    margin: "0 auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 7.4,
    marginTop: 10,
  },
  table: {
    width: "99%",
    height: "99%",
    marginTop: 15,
    border: "1px solid black",
    borderRadius: 10,
  },
  tableTitle: {
    width: 70,
    height: 15,
    fontSize: 7.5,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
    color: "white",
    position: "absolute",
    borderRadius: 5,
    right: 10,
    bottom: "97%",
  },
  tableRow: {
    width: "100%",
    height: "15%",
    borderBottom: "1px solid black",
    display: "flex",
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    alignItems: "flex-end",
    paddingRight: 5,
  },
  tableRowLast: {
    width: "100%",
    height: "20",
    display: "flex",
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    alignItems: "flex-end",
    paddingRight: 5,
  },
  tableRow2: {
    width: "100%",
    height: "16.6%",
    borderBottom: "1px solid black",
    display: "flex",
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    alignItems: "flex-end",
    paddingRight: 5,
  },
  tableRow3: {
    width: "100%",
    height: "25%",
    borderBottom: "1px solid black",
    display: "flex",
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    alignItems: "flex-end",
    paddingRight: 5,
  },
  tableRow3last: {
    width: "100%",
    height: "25%",
    display: "flex",
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    alignItems: "flex-end",
    paddingRight: 5,
  },
  tableRow2Last: {
    width: "100%",
    height: "16.6%",
    display: "flex",
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    alignItems: "flex-end",
    paddingRight: 5,
  },
  table4Text: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    paddingTop: 10,
    paddingRight: 5,
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
  main4Table4Parent: {
    width: "100%",
    height: 50,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 5,
  },
  main4Table4: {
    width: "60%",
    height: "100%",
    border: "1px solid black",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  main4Table4Child: {
    flex: 1,
    borderLeft: "1px solid black",
  },
  main4Table4ChilLast: {
    flex: 1,
  },
  titleTable: {
    width: "100%",
    height: "70%",
    borderBottom: "1px solid black",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  textTable: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  main5Table5Parent: {
    width: "100%",
    height: 50,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 5,
  },
  main5Table5: {
    width: "90%",
    height: "100%",
    border: "1px solid black",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  main4Table4Child: {
    flex: 1,
    borderLeft: "1px solid black",
  },
  main5Table5ChilLast: {
    flex: 1,
  },
  footerText: {
    width: "100%",
    display: "flex",
    alignItems: "flex-end",
    marginTop: 5,
  },
  boxSm: {
    width: "25%",
    height: 170,
    border: "1px solid black",
    borderRadius: 8,
  },
  boxLg: {
    width: "99%",
    height: 300,
    border: "1px solid black",
    borderRadius: 8,
  },
  boxLgSlice1: {
    width: "100%",
    height: 220,
    borderBottom: "1px solid black",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    paddingRight: 20,
    fontWeight: 600,
    paddingTop:15
  },
  boxLgSlice2: {
    width: "100%",
    height: 80,
    display: "flex",
    flexDirection: "row",
  },
  boxLgSlice2Child: {
    flex: "1",
    borderLeft: "1px solid black",
    display: "flex",
    alignItems: "flex-end",
    padding: "5px 5px 0 0 ",
  },
  boxLgSlice2Child3: {
    flex: "1",
    display: "flex",
    alignItems: "flex-end",
    padding: "5px 5px 0 0 ",
  },

  boxParent: {
    width: "100%",
    height: 300,
    display: "flex",
    flexDirection: "row-reverse",
    justifyContent: "space-around",
    marginTop: 15,
  },
  boxSm2: {
    width: "25%",
    height: 170,
    border: "1px solid black",
    borderRadius: 8,
  },
  boxLg2: {
    width: "99%",
    height: 170,
    border: "1px solid black",
    borderRadius: 8,
  },
  boxLgSlice12:{
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
  boxLgSlice22:{
    width:'100%',
    height:100,
    display:'flex',
    flexDirection:'row',
  },
  boxLgSlice2Child2:{
    flex:'1',
    borderLeft:'1px solid black',
    display:'flex',
    alignItems:'flex-end',
    padding:'5px 5px 0 0 '

  },
  boxLgSlice2Child32:{
    flex:'1',
    display:'flex',
    alignItems:'flex-end',
    padding:'5px 5px 0 0 '
  },
  
  boxParent2:{
      width:'100%',
      height:200,
      display:'flex',
      flexDirection:'row-reverse',
      justifyContent:'space-around',
      marginTop:15
  }
});

const TablePdf4Page2 = () => {
  return (
    <>
      <View style={stylePdf.main}>
        <View style={stylePdf.table}>
          <View style={stylePdf.tableTitle}>
            <Text>اطلاعات وکیل مشتری</Text>
          </View>
          <View style={stylePdf.tableRow}>
            <Text style={stylePdf.w30}>نام:</Text>
            <Text style={stylePdf.w30}>نام خانوادگی:</Text>
            <Text style={stylePdf.w30}>صادره از:</Text>
          </View>
          <View style={stylePdf.tableRow}>
            <Text style={stylePdf.w30}>نام پدر:</Text>
            <Text style={stylePdf.w30}>شماره شناسنامه:</Text>
            <Text style={stylePdf.w30}>سریال شناسنامه:</Text>
          </View>
          <View style={stylePdf.tableRow}>
            <Text style={stylePdf.w30}>کد ملی:</Text>
            <Text style={stylePdf.w70}>آدرس:</Text>
          </View>
          <View style={stylePdf.tableRowLast}>
            <Text style={stylePdf.w50}>امضا و اثر انگشت وکیل:</Text>
          </View>
        </View>
      </View>

      <View style={stylePdf.boxParent}>
        {/* <View style={stylePdf.boxSm}>
              <Text style={stylePdf.fontSize2}>امضا مشتری:</Text>
          </View> */}
        {/* <View style={stylePdf.tableTitle}>
          <Text>اطلاعات وکیل مشتری</Text>
        </View> */}
        <View style={stylePdf.boxLg}>
          <View style={stylePdf.tableTitle}>
            <Text>تایید مشتری</Text>
          </View>
          <View style={stylePdf.boxLgSlice1}>
            <Text>مشتری متعهد و مطلع می گردد:</Text>
            <Text>
              ضمن رعایت دقیق قوانین و مقررات پولشویی، اطلاعات مورد درخواست
              کارگزار در موضوع مبارزه با پولشویی را مطابق مقررات ارائه نماید.
              اجازه استفاده اشخاص دیگر از کد معاملاتی
            </Text>
            <Text>
              (خدمات پایه دریافتی) را ندهد و در صورت اطلاع، موضوع را بلافاصله به
              کارگزار اطلاع دهد.
            </Text>
            <Text>
              هرگونه تغییر در اطلاعات ارائه شده را با مستندات مربوط در اسرع وقت
              به اطلاع کارگزار برساند
            </Text>
            <Text>
              مدیران و صاحبان حساب امضای مجاز مشتری/ نماینده مشتری ضمن اقرار به
              این که آخرین اطلاعات و مدارک مربوط به مشتری/نماینده مشتری را طی
              این فرم ارائه نموده اند، متعهد
            </Text>
            <Text>
              میگردند هرگونه تغییر در اطلاعات ارائه شده را بلافاصله به کارگزاری
              اطلاع دهند.
            </Text>
            <Text>
              از پرداخت هرگونه وجه نقد و یا چک بابت تسویه بدهی و یا خرید سهم به
              پرسنل و نمایندگان کارگزاری خودداری نمایند
            </Text>
            <Text>
              پس از واریز وجه از طریق دستگاه های کارتخوان (پوز) در شعب ضمن
              دریافت رسید از پرسنل، از ثبت مبلغ پرداختی در حساب کاربری خود با
              اخذ پرینت دفتر حساب اطمینان حاصل نماید.
            </Text>
            <Text>
              در صورت ابطال معاملات به هردلیل و واریز وجه معامله ابطال شده از
              کارگزاری به حساب مشتری، مشتری ملزم به عودت وجه حاصل از فروش آن
              معامله خواهد بود؛ در غیر این صورت{" "}
            </Text>
            <Text>کارگزار مجاز به فروش سهام مشتری به میزان بدهی وی است.</Text>
            <Text>
              چنانچه به هر نحو در ازای خرید سهام یا سایر اوراق بهادار مشتری به
              کارگزاری بدهکار شود، کارگزاری اجازه و اختیار خواهد داشت راسا نسبت
              به فروش سهام یا سایر اوراق بهادار متعلق به{" "}
            </Text>
            <Text>مشتری اقدام و مانده طلب خود را تسویه نماید.</Text>
            <Text>
              چنانچه در اثر بروز اختلال در سیستم معاملات ناشی از نرم افزار
              کاربردی کارگزاری و یا هسته معاملات، اجرای سفارش مشتری با تاخیر یا
              عدم اجرا مواجه شود، مسئولیتی متوجه کارگزاری
            </Text>
            <Text>نیست.</Text>
            <Text>
              با توجه به اینکه درخواست های خرید و فروش به صورت روزانه از طریق
              پیام کوتاه و ایمیل به مشتریان ارسال می گردد، لذا در صورت هرگونه
              اعتراض یا مغایرت مشتری باید مراتب را ظرف
            </Text>
            <Text>
            ۴۲ساعت به صورت کتبی به کارگزاری اعلام نماید؛ در غیر این صورت
              هرگونه اختلاف و مغایرت مورد قبول نبوده و کارگزاری هیچگونه مسئولیتی
              را به عهده نخواهد گرفت.
            </Text>
            <Text>کارگزاری هیچگونه مسئولیتی در مورد خرید و فروش نمادهای تحت احتیاط ندارد.</Text>
            <Text>اینجانب تمامی موارد فوق را با دقت مطالعه کرده و ضمن پذیرش آن اقرار می نمایم که در صورت بروز موارد فوق، کارگزاری هیچگونه مسئولیتی نخواهد داشت و حق اعتراض را از خود سلب</Text>
            <Text>و ساقط می نمایم.</Text>
          </View>
          <View style={stylePdf.boxLgSlice2}>
            <View style={stylePdf.boxLgSlice2Child3}>
              <Text>مهر کارگزاری:</Text>
            </View>
            <View style={stylePdf.boxLgSlice2Child}>
              <Text>نمونه امضاء مشتری:</Text>
            </View>
            <View style={stylePdf.boxLgSlice2Child}>
              <Text>نام و نام خانوادگی:</Text>
            </View>
          </View>
        </View>
      </View>
      <View style={stylePdf.boxParent2}>
          {/* <View style={stylePdf.boxSm2}>
              <Text style={stylePdf.fontSize22}>امضا مشتری:</Text>
          </View> */}
           
          <View style={stylePdf.boxLg2}>
          <View style={stylePdf.tableTitle}>
            <Text>اطلاعات وکیل مشتری</Text>
          </View>
            <View style={stylePdf.boxLgSlice12}>
              <Text>اینجانب ........................ از پرسنل ......................در تاریخ ......./......../......۴۱ این فرم را دریافت کردم و تطبیق اطلاعات مندرج در آن را با مدارک دریافتی شامل کپی شناسنامه و </Text>
              <Text>کارت ملی که برابر با اصل گردید، تایید می نمایم.</Text>
            </View>
            <View style={stylePdf.boxLgSlice22}>
              <View style={stylePdf.boxLgSlice2Child32}>
                <Text>مهر کارگزاری:</Text>
              </View>
              <View style={stylePdf.boxLgSlice2Child2}>
                <Text>نام و نام خانوادگی و امضا تایید کننده: </Text>
              </View>
              <View style={stylePdf.boxLgSlice2Child2}>
                <Text>امضا دریافت کننده:</Text>
              </View>
            </View>
          </View>
        </View>
      {/* <View style={stylePdf.main2}>
        <View style={stylePdf.table}>
          <View style={stylePdf.tableTitle}>
            <Text>حساب های بانکی</Text>
          </View>
          <View style={stylePdf.tableRow2}>
            <Text style={stylePdf.w50}>شماره حساب )۱(:</Text>
            <Text style={stylePdf.w50}>شهر:</Text>
          </View>
          <View style={stylePdf.tableRow2}>
            <Text style={stylePdf.w50}>نوع حساب:</Text>
            <Text style={stylePdf.w50}>شماره شبا:</Text>
          </View>
          <View style={stylePdf.tableRow2}>
            <Text style={stylePdf.w50}>نام بانک:</Text>
            <Text style={stylePdf.w20}>کد و نام شعبه:</Text>
            <Text style={stylePdf.w30}>کد شعبه:</Text>
          </View>
          <View style={stylePdf.tableRow2}>
            <Text style={stylePdf.w50}>شماره حساب )۲(:</Text>
            <Text style={stylePdf.w50}>شهر:</Text>
          </View>
          <View style={stylePdf.tableRow2}>
            <Text style={stylePdf.w50}>نوع حساب:</Text>
            <Text style={stylePdf.w50}>شماره شبا:</Text>
          </View>
          <View style={stylePdf.tableRow2Last}>
            <Text style={stylePdf.w50}>نام بانک:</Text>
            <Text style={stylePdf.w20}>کد و نام شعبه:</Text>
            <Text style={stylePdf.w30}>کد شعبه:</Text>
          </View>
        </View>
      </View> */}
      {/* <View style={stylePdf.main3}>
        <View style={stylePdf.table}>
          <View style={stylePdf.tableTitle}>
            <Text>اطلاعات شغل مشتری</Text>
          </View>
          <View style={stylePdf.tableRow3}>
            <Text style={stylePdf.w50}>شغل:</Text>
            <Text style={stylePdf.w50}> نام سازمان یا شرکت: </Text>
          </View>
          <View style={stylePdf.tableRow3}>
            <Text style={stylePdf.w50}>آدرس: </Text>
          </View>
          <View style={stylePdf.tableRow3}>
            <Text style={stylePdf.w50}>کدپستی:</Text>
            <Text style={stylePdf.w50}> سمت:</Text>
          </View>
          <View style={stylePdf.tableRow3last}>
            <Text style={stylePdf.w50}>تلفن محل کار:</Text>
            <Text style={stylePdf.w50}>نمابر:</Text>
          </View>
        </View>
      </View> */}
    </>
  );
};
export default TablePdf4Page2;
