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
    width: "98%",
    height: "87%",
    //  backgroundColor:'grey',
    margin: "0 auto",
    display: "flex",
    alignItems: "flex-end",
    border: "1px solid balck",
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
    paddingRight: 5,
    paddingTop: 5,
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
  boxLgSlice1: {
    width: "100%",
    height: 70,
    borderBottom: "1px solid black",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "flex-end",
    paddingRight: 20,
    fontWeight: 600,
  },
  boxLgSlice2: {
    width: "100%",
    height: 100,
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
    height: 200,
    display: "flex",
    flexDirection: "row-reverse",
    justifyContent: "space-around",
    marginTop: 15,
  },

  boxParent2: {
    width: "100%",
    height: 130,
    display: "flex",
    flexDirection: "row-reverse",
    justifyContent: "space-around",
    marginTop: 15,
  },
  boxLgSlice12: {
    width: "100%",
    height: 20,
    borderBottom: "1px solid black",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    fontWeight: 600,
  },
  boxLg2: {
    width: "98%",
    height: 120,
    border: "1px solid black",
    borderRadius: 8,
  },
  w50: {
    width: "50%",
  },
  w50WithBorder: {
    width: "50%",
    borderLeft:'1px solid black'
  },
  w50Text: {
    textAlign: "right",
    paddingRight:5,
    paddingTop:5
  },
  Parent:{
      width:'90%',
      flexDirection:"column",
      alignItems:'flex-end',
      marginTop:10
  },
  checkParent:{
      display:'flex',
      flexDirection:'row',
      paddingRight:5,
      marginBottom:2
  },
  checkBox:{
      width:10,
      height:10,
      border:'1px solid black',
      borderRadius:3,
      marginLeft:3
  },
  footer:{
      width:'95%',
      display:'flex',
      flexDirection:'row',
      justifyContent:'space-between',
      marginTop:20,
      paddingRight:10
  }

});

const BodyPdf3Page3 = () => {
  return (
    <>
      <View style={stylePdf.main}>
        <Text style={stylePdf.fontSize}>ماده ۹ :حل اختلاف</Text>
        <Text style={stylePdf.fontSize}>
          با توجه به حاكمیت قانون بازار اوراق بهادار و اختلافات ناشی از معاملات
          در این بازار، حل اختلاف طرفین این قرارداد در صورت عدم حصول توافق از
          طریق مذاكره فی مابین، مطابق ماده ۶۳ قانون بازار
        </Text>
        <Text style={stylePdf.fontSize}>
          اوراق بهادار جمهوری اسلامی ایران مصوب ۴۸۳۱ صورت می گیرد.
        </Text>
        <Text style={stylePdf.fontSize}>ماده ۰۱ :تغییر قراداد</Text>
        <Text style={stylePdf.fontSize}>
          این قرارداد در ۰۱ماده و ۲ نسخه تنظیم گردیده و در تاریخ
          ............................. به امضای طرفین رسیده است. هرگونه تغییر
          در مفاد آن، منوط به تایید سازمان بورس و اوراق بهادار است. در صورتی كه
        </Text>
        <Text style={stylePdf.fontSize}>
          در قوانین و مقررات مربوط به معاملات برخط، تغییراتی حاصل شود كه تغییر
          بر شرایط و مفاد قرارداد حاضر را ایجاب نماید، تغییرات مذكور بدون نیاز
          به توافق ثانوی جز لاینفك این قرارداد خواهد بود.
        </Text>
        <Text style={stylePdf.fontSize}>
          اینجانب ..................................... نام كاربری و رمز عبور
          خود را به صورت چاپی و محرمانه دریافت نموده ام.
        </Text>

        <View style={stylePdf.boxParent}>
          <View style={stylePdf.boxSm}>
            <Text style={stylePdf.fontSize2}>امضا مشتری:</Text>
          </View>
          <View style={stylePdf.boxLg}>
            <View style={stylePdf.boxLgSlice1}>
              <Text>
                اینجانب ............................. از پرسنل ................
                در تاریخ ......................... این فرم را دریافت کردم و
                تطبیق اطلاعات{" "}
              </Text>
              <Text>
                مندرج در آن را با مدارک دریافتی شامل کپی شناسنامه و کارت ملی که
                برابر با اصل گردید، تایید می نمایم.
              </Text>
            </View>
            <View style={stylePdf.boxLgSlice2}>
              <View style={stylePdf.boxLgSlice2Child3}>
                <Text>مهر کارگزاری:</Text>
              </View>
              <View style={stylePdf.boxLgSlice2Child}>
                <Text>نام و نام خانوادگی و امضا تایید کننده </Text>
                <Text>واحد آنلاین:</Text>
              </View>
              <View style={stylePdf.boxLgSlice2Child}>
                <Text>امضا دریافت کننده:</Text>
              </View>
            </View>
          </View>
        </View>
        <Text style={stylePdf.fontSize}>تعهدنامه استفاده از زیرساخت برخط</Text>
        <Text style={stylePdf.fontSize}>
          اینجانب .................... فرزند............. به شماره
          شناسنامه................... كد ملی .................. متولد
          ................. صادره از .................. كه اصالت/ به عنوان
          نماینده قانونی (ولی/اقیم/وصی) آقای
        </Text>
        <Text style={stylePdf.fontSize}>
          /خانم متقاضی استفاده از زیرساخت های موضوع بندهای ۴و ۵ ماده ۱
          دستورالعمل اجرایی معاملات برخط هستم، اقرار و تعهد می نمایم:
        </Text>
        <Text style={stylePdf.fontSize}>
          ۱-از دانش و مهارت لازم در خصوص نحوه استفاده از زیر ساخت ها و همچنین
          نحوه انجام معامله اوراق بهادار/كالا برخوردار هستم.
        </Text>
        <Text style={stylePdf.fontSize}>
          ۲-با قوانین و مقررات مرتبط با معامله اوراق بهادار / كالا آشنایی كافی
          دارم.{" "}
        </Text>
        <Text style={stylePdf.fontSize}>
          ۳ -مشمول هیچگونه حكم منع معاملاتی كه توسط سازمان بورس و اوراق بهادار
          یا سایر مراجع ذی صلاح اعلام شده باشد، نیستم.
        </Text>
        <Text style={stylePdf.fontSize}>
          ۴ -از انجام معاملات مبتنی بر اطلاعات محرمانه و دستكاری در بازار
          خودداری نموده و در مقابل مراجع قانونی پاسخگو باشم.
        </Text>
        <Text style={stylePdf.fontSize}>
          ۵ -از ایجاد اخلال یا هرگونه اقدام به اخلال (سوء استفاده) در سامانه
          معاملات و زیر ساخت های برخط متعلق به كارگزار یا كارگزار / معامله گر
          خودداری نموده و در مقابل مراجع قانونی پاسخگو باشم.
        </Text>
        <Text style={stylePdf.fontSize}>
          ۶ -امكان استفاده از زیر ساخت های برخط اختصاص یافته به اینجانب را در
          اختیار هیچ فرد دیگری تحت هر عنوان از قبیل نماینده، وكیل یا غیره قرار
          ندهم و به شخص دیگری اجازه نخواهم داد از مجوز{" "}
        </Text>
        <Text style={stylePdf.fontSize}>
          صادره استفاده و اقدام به انجام معامله نماید و در هر صورت مسئولیت كلیه
          معاملات انجام شده از طریق دسترسی به زیرساخت برخط كه توسط كارگزار در
          اختیار اینجانب قرار داده شده است را می پذیرم.
        </Text>
        <Text style={stylePdf.fontSize}>
          ۷ -مسئولیت صحت موارد مندرج در فرم مشخصات مشتری بر عهده اینجانب بوده و
          در صورت ارائه اطلاعات خلاف واقع و مستندات جعلی، مسئولیت هرگونه عواقب
          ناشی از آن برعهده اینجانب است.
        </Text>
        <View style={stylePdf.boxParent2}>
          <View style={stylePdf.boxLg2}>
            <View style={stylePdf.boxLgSlice12}>
              <View style={stylePdf.w50}>
                <Text style={stylePdf.w50Text}>نام و نام خانوادگی:</Text>
              </View>
              <View style={stylePdf.w50WithBorder}>
                <Text style={stylePdf.w50Text}>تاریخ تکمیل: </Text>
              </View>
            </View>
            <View style={stylePdf.boxLgSlice2}>
              <View style={stylePdf.boxLgSlice2Child3}>
                <Text>مهر کارگزاری:</Text>
              </View>
              <View style={stylePdf.boxLgSlice2Child}>
                <Text>امضا دریافت کننده:</Text>
              </View>
            </View>
          </View>
        </View>
        <Text>نحوه احراز صلاحیت داوطلب</Text>
        <View style={stylePdf.Parent}>
            <View style={stylePdf.checkParent}>
                <Text> انجام مصاحبه شفاهی</Text>
                <View style={stylePdf.checkBox}></View>
            </View>
            <View style={stylePdf.checkParent}>
                <Text>برگزاری آزمون كتبی یا الكترونیكی</Text>
                <View style={stylePdf.checkBox}></View>
            </View>
            <View style={stylePdf.checkParent}>
                <Text>دارا بودن هریک از گواهینامه های حرفه ای یا گواهینامه های کاربردی بازار سرمایه</Text>
                <View style={stylePdf.checkBox}></View>
            </View>
            <View style={stylePdf.checkParent}>
                <Text>دارا بودن گواهی حضور در دوره آموزشی مشخصی كه به منظور آشنایی با نحوه انجام معاملات برخط توسط كانون برگزار می شود</Text>
                <View style={stylePdf.checkBox}></View>
            </View>
        </View>
        <View style={stylePdf.footer}>
            <Text>مهرو امضا:</Text>
            <Text>کارگزاری:</Text>
        </View>
      </View>
    </>
  );
};
export default BodyPdf3Page3;
