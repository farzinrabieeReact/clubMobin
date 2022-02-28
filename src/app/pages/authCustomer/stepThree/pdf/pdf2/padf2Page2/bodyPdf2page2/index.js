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

const BodyPdf2Page2 = () => {
  return (
    <>
      <View style={stylePdf.main}>
        <Text>
          ماده ۶ .کارگزار ۸۴ ساعت پس از امضا این توافق نامه، نام کاربری و کلمه
          عبور انجام معاملات اینترنتی را با مراجعه حضوری مشتری و یا از طریق پست
          الکترونیکی در اختیار مشتری قرار می دهد. مسئولیت
        </Text>
        <Text style={stylePdf.fontSize}>
          حفظ حفظ و مراقبت از نام کاربری و کلمه عبور برعهده مشتری است؛ در صورت
          افشای نام کاربری و کلمه عبور، مشتری باید مراتب را کتبا به کارگزاری
          اطلاع داده و تقاضای صدور نام کاربری و کلمه عبور
        </Text>
        <Text style={stylePdf.fontSize}>
          جدید نماید. تا زمانی که این امر توسط مشتری اعلام نشده، کارگزاری بابت
          انجام دستوراتی که از نام کاربری و کلمه عبور مشتری دریافت می کند، هیچ
          مسئولیتی برعهده ندارد. به جهت رعایت امنیت
        </Text>
        <Text style={stylePdf.fontSize}>
          بیشتر، به مشتریان پیشنهاد می گردد به محض دریافت کلمه عبور از کارگزاری
          و همچنین به صورت دوره ای نسبت به تغییر کلمه عبور اقدام نمایند.
        </Text>
        <Text style={stylePdf.fontSize}>
          ماده۷ .حفظ مشتری باید گواهی نامه موقت اوراق بهادار خود را قبل از سفارش
          فروش در اختیار کارگزاری قرار دهد و کارگزار فقط مجاز به فروش اوراق
          بهاداری است که گواهی نامه موقت آن را دراختیار
        </Text>
        <Text style={stylePdf.fontSize}>دارد.</Text>
        <Text style={stylePdf.fontSize}>
          ماده ۸ .مشتری می تواند از طریق مراجعه حضوری گواهی نامه موقت اوراق
          بهاداری را که اینترنتی خریداری کرده است، دریافت نماید. تحویل گواهینامه
          موقت منوط به دریافت گواهی نامه موقت قبلی{" "}
        </Text>
        <Text style={stylePdf.fontSize}>همان سهام توسط کارگزاری است.</Text>
        <Text style={stylePdf.fontSize}>
          ماده ۹ .در اجرای بند ۸ دستورالعمل اجرایی سفارشات الکترونیکی و جهت
          اطلاع از وضعیت تمام درخواست ها، اعم از در خواست های انجام شده و نشده،
          مشتریان می توانند با مراجعه به سایت کارگزاری{" "}
        </Text>
        <Text style={stylePdf.fontSize}>
          اطلاعات مربوط به وضعیت همه در خواست های ثبت شده خود را به دست آورده و
          حداکثر با ۴۲ساعت تأخیر صورت حساب خود را برروی سایت مشاهده نمایند. با
          توجه به اینکه درخواست های خرید
        </Text>
        <Text style={stylePdf.fontSize}>
          و فروش به صورت روزانه از طریق پیام کوتاه و ایمیل به مشتریان ارسال می
          گردد، لذا در صورت هرگونه اعتراض یا مغایرت، مشتری باید مراتب را ظرف ۴۲
          ساعت به صورت کتبی به کارگزاری اعلام نماید.{" "}
        </Text>
        <Text style={stylePdf.fontSize}>
          در غیر این صورت هرگونه اختلاف و مغایرت مورد قبول نبوده و کارگزاری
          هیچگونه مسئولیتی را به عهده نمی گیرد.
        </Text>
        <Text style={stylePdf.fontSize}>
          ماده ۱۰ .کارگزاری پس از دریافت سفارش خرید یا فروش از مشتری، حداکثر ظرف
          یک ساعت پیام وصول سفارش را برای مشتری ارسال می کند. ثبت اطلاعات
          درخواست خرید یا فروشنده توسط مشتری
        </Text>
        <Text style={stylePdf.fontSize}>
          در سایت کارگزاری و همچنین ارسال پیام وصول این اطلاعات به منزله پذیرش
          درخواست از طرف کارگزاری نبوده و تعهدی نسبت به انجام آن ایجاد نمی
          نماید. پذیرش درخواست مشتری منوط به بررسی
        </Text>
        <Text style={stylePdf.fontSize}>
          مدیر حفظ سفارشات اینترنتی بوده و درخواست مشتری پس از این بررسی و با
          تغییر وضعیت از در حال بررسی به در حال اقدام پذیرفته شده و کارگزاری
          نسبت به انجام آن متعهد می گردد
        </Text>
        <Text style={stylePdf.fontSize}>
          ماده ۱۱ .سفارش های ارسالی توسط مشتری به مدت ۵ روز کاری اعتبار دارد و
          درصورت سپری شدن مهلت یاد شده، سفارش باطل می شود. تغییر و اصلاح سفارش
          مشتری فقط از طریق در خواست ابطال{" "}
        </Text>
        <Text style={stylePdf.fontSize}>
          حفظ سفارش قبلی توسط مشتری ممکن است و در صورت دریافت دستور ابطال مشتری
          طی ساعات انجام معامله، کارگزار ملزم به اعمال دستور مشتری حداکثر در روز
          بعد است.
        </Text>
        <Text style={stylePdf.fontSize}>
          ماده ۱۲ .کارگزار موظف است داده پیام های دریافتی از مشتری و داده پیام
          های ارسالی به مشتری را در سامانه اطلاعاتی خود ثبت و نگهداری نماید. در
          صورت بروز اختلاف بین کارگزار و مشتری در خصوص
        </Text>
        <Text style={stylePdf.fontSize}>
          محتوای داده پیام ها، اطلاعات مندرج در سامانه اطلاعاتی کارگزاری معتبر و
          برای طرفین لازم الاتباع است، مشروط براینکه اطلاعات با گزارش های دوره
          ای ماده ۹ مغایر نباشد.{" "}
        </Text>
        <Text style={stylePdf.fontSize}>
          ماده ۱۳ .دستورالعمل اجرایی سفارشات الکترونیکی اوراق بهادار (مصوب
            ۴۰/۹۰/۳۸۳۱هیأت مدیره سازمان بورس) که در سایت کارگزاری انعکاس دارد،
          برای طرفین این قرارداد لازم الاجرا است.
        </Text>
        <Text>
          ماده ۱۴ .چنانچه در اثر بروز اختلال در سیستم معاملات ناشی از نرم افزار
          کاربردی کارگزاری و یا هسته معاملات اجرای سفارش مشتری با تاخیر یا عدم
          اجرا مواجه شود، مسئولیتی متوجه کارگزاری نیست.
        </Text>
        <Text>
          ماده ۱۵ .این قرارداد در ۴۱ماده، ۵ تبصره و در ۲ صفحه با متن و اعتبار
          واحد تنظیم و مشتری ضمن اطلاع و توافق با کلیه مفاد آن، نسبت به امضا و
          مبادله آن اقدام نموده است.{" "}
        </Text>
        <View style={stylePdf.boxParent}>
          <View style={stylePdf.boxSm}>
              <Text style={stylePdf.fontSize2}>امضا مشتری:</Text>
          </View>
          <View style={stylePdf.boxLg}>
            <View style={stylePdf.boxLgSlice1}>
              <Text>اینجانب ............................. از پرسنل ................ در تاریخ ......................... این فرم را دریافت کردم و تطبیق اطلاعات </Text>
              <Text>مندرج در آن را با مدارک دریافتی شامل کپی شناسنامه و کارت ملی که برابر با اصل گردید، تایید می نمایم.</Text>
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
      </View>
    </>
  );
};
export default BodyPdf2Page2;
