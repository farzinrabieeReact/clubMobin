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

const BodyPdf3Page2 = () => {
  return (
    <>
      <View style={stylePdf.main}>
        <Text style={stylePdf.fontSize}>۲-۴ :عضو متعهد به ثبت و نگهداری کلیه سوابق تراکنش های دریافتی از مشتری و ارسالی به وی در زیرساخت دسترسی برخط بازار خود است.</Text>
        <Text style={stylePdf.fontSize}>۳-۴ :اعمال هرگونه محدودیت بر معاملات مشتری توسط عضو بایستی مستند به این قرارداد و قوانین و مقررات بازار سرمایه باشد. در صورت اعمال این محدودیت ها، عضو مسئولیتی در قبال خسارات </Text>
        <Text style={stylePdf.fontSize}>وارده نخواهد داشت.</Text>
        <Text style={stylePdf.fontSize}>۴-۴ عضو متعهد است امکان ارایه خدمات پشتیبانی زیرساخت دسترسی برخط بازار را فراهم نموده و روش های ارایه آن را در سایت رسمی خود اعلام کند و حسب درخواست مشتری، جهت رفع مشلک </Text>
        <Text style={stylePdf.fontSize}>اقدام نماید.</Text>
        <Text style={stylePdf.fontSize}>۵-۴ :عضو حق ورود سفارس جدید برای مشتری یا تغییر، تعلیق و حذف سفارش های وارد شده توسط مشتری را در چهارچوب قوانین و مقررات و با دستور مشتری دارا است.</Text>
        <Text style={stylePdf.fontSize}>۶-۴ :عضو متعهد است در چهارچوب قوانین و مقررات، داده ها و اطلاعات شخصی مشتری را محرمانه نگه دارد.</Text>
        <Text style={stylePdf.fontSize}>۷-۴ :عضو متعهد است از طریق زیرساخت دسترسی برخط بازار، همواره آخرین وضعیت حساب و سوابق معاملات مشتری را در اختیار وی قرار دهد و در صورت اعلام مغایرت ظرف ۸۴ ساعت از سوی </Text>
        <Text style={stylePdf.fontSize}>مشتری، نسبت به بررسی موضوع و اعلام نتیجه بررسی به وی اقدام نماید. بدیهی است اعلام مغایرت، نافی مسئولیت مشتری در صورت عدم توجه به نظامات قراردادی و قوانین و مقرراتی نخواهد بود.</Text>
        <Text style={stylePdf.fontSize}>۸-۴ :در راستای اجرای این قرارداد، حداقل موارد زیر از طریق وب سایت عضو به اطلاع سرمایه گذاران رسانده می شود:</Text>
        <Text style={stylePdf.fontSize}>اطلاعات حساب مشتری نزد عضو شامل جزئیات خرید و فروش، واریز برداشت و مانده حساب؛*</Text>
        <Text style={stylePdf.fontSize}>*رویه دریافت سفارش ها، پردازش و اجرای سفارش ها و همچنین پایاپای و تسویه معاملات از طریق زیرساخت دسترسی برخط بازار؛</Text>
        <Text style={stylePdf.fontSize}>* رویه های مدیریت حوادث پیش بینی نشده در معاملات برخط اوراق بهادار از جمله قطعی برق، شبکه مخابراتی و اینترنت؛</Text>
        <Text style={stylePdf.fontSize}>*در خصوص قطعی دسترسی برخط بازار، اعلام موضوع قبل از وقوع در موارد قابل پیش بینی و بلافاصله پس از وقوع در موارد غیرقابل پیش بینی از طریق پست الکترونیکی یا به روش مقتضی دیگر؛</Text>
        <Text style={stylePdf.fontSize}>*اطلاع رسانی لازم در مورد نحوه مدیریت سفارش ها در زمان تعلیق یا محرویت عضو از انجام معاملات؛</Text>
        <Text style={stylePdf.fontSize}>*رویه هایی برای حذف سفارشات ثبت شده در زمانی که امکان دسترسی برخط بازار وجود نداشته باشد؛</Text>
        <Text style={stylePdf.fontSize}>* اعلام قوانین و مقررات جدید و محدودیت های ابلاغی توسط سازمان در خصوص انجام معاملات برخط.</Text>
        <Text style={stylePdf.fontSize}>ماده ۵ :تعهدات مشتری</Text>
        <Text style={stylePdf.fontSize}>۱-۵ :مشتری باید گواهی نامه های موقت صادره اوراق بهاداری که قصد فروش آن ها را دارد را حسب درخواست در اختیار وی قرار دهد.</Text>
        <Text style={stylePdf.fontSize}>۲-۵ :مشتری باید اطلاعات و مستندات لازم را جهت احراز هویت به عضو ارایه نماید.</Text>
        <Text style={stylePdf.fontSize}>۳-۵ :مشتری تعهد می کند از انجام هرگونه معامله که منجر به نقض قوانین و مقررات گردد از جمله معاملات مبتنی بر اطلاعات نهانی و دستکاری بازار خودداری نماید.</Text>
        <Text style={stylePdf.fontSize}>۴-۵ :مشتری باید شماره حساب بانکی را در بانکی که عضو اعلام می نماید، جهت دریافت وجوه ارایه نماید. هرگونه پرداخت به مشتری صرفا از طریق واریز وجه به همان حساب (که به نام مشتری است) </Text>
        <Text style={stylePdf.fontSize}>امکان پذیر است.</Text>
        <Text style={stylePdf.fontSize}>۵-۵ :مشتری متعهد است که سفارشات خرید و فروش روزانه خود را در چهارچوب قوانین، مقررات و سقف های اعلامی توسط سازمان به سامانه معاملات برخط ارسال کند.</Text>
        <Text style={stylePdf.fontSize}>۶-۵ :مشتری متعهد به تغییر رمز عبور و سایر کدهای دسترسی قابل تغییر خود در فواصل زمانی حداکثر .......... ماهه (حداکثر سه ماهه) است. در صورت عدم تغییر، هرگونه مسئولیت ناشی از افشای</Text>
        <Text style={stylePdf.fontSize}>رمز عبور بر عهده مشتری است. </Text>
        <Text style={stylePdf.fontSize}>۷-۵ :مشتری مسئولیت تبعات ناشی از استفاده نادرست از خدمات نرم افزاری سامانه معاملات برخط اوراق بهادار را برعهده می گیرد.</Text>
        <Text style={stylePdf.fontSize}>۸-۵ :در صورت عدم استفاده مشتری به مدت ۰۹ روز متوالی از حساب کاربری خود، عضو دسترسی مشتری را غیرفعال خواهد نمود. فعال شدن دسترسی مستلزم مراجعه مشتری به عضو است. </Text>
        <Text style={stylePdf.fontSize}>۹-۵ :مشتری متعهد می شود که اصول امنیت سخت افزاری و نرم افزاری و محافظت از اطلاعات از جمله استفاده از نرم افزارهای ضد ویروس مناسب، محافظت از شناسه کاربر، کلید واژه ها، کدهای رمزی و</Text>
        <Text style={stylePdf.fontSize}>کلیه اطلاعات دریافتی از عضو را به منظور جلوگیری از دسترسی های غیرمجاز به سامانه، رعایت نماید.</Text>
        <Text style={stylePdf.fontSize}>۰۱-۵ :مشتری متعهد می گردد، زیرساخت دسترسی برخط بازار را وسیله آموزش اشخاص ثالث قرار ندهد.</Text>
        <Text style={stylePdf.fontSize}>۱۱-۵ :مشتری متعهد به پرداخت وجه معامله و کارمزدهای مربوطه در چارچوب قوانین و مقررات است.</Text>
        <Text style={stylePdf.fontSize}>۲۱-۵ :مشتری متعهد می گردد از قوانین و مقررات و شرایط اعلامی عضو در چهارچوب قوانین و مقررات مربوط به معاملات برخط پیروی کند.</Text>
        <Text style={stylePdf.fontSize}>۳۱-۵:مشتری متعهد است در هر بار ورود به سامانه معاملات برخط، اطلاعات مربوط به خرید و فروش اوراق بهادار از طریق زیرساخت دسترسی برخط بازار را کنترل و در صورت وجود مغایرت، در اسرع</Text>
        <Text style={stylePdf.fontSize}>وقت به عضو اطلاع دهد.</Text>
        <Text style={stylePdf.fontSize}>۴۱-۵ :مشتری مسئول کنترل حساب های خود بوده و موارد زیر را فورا به صورت الکترونیکی به عضو اطلاع می دهد:</Text>
        <Text style={stylePdf.fontSize}>هرگونه سرقت یا استفاده غیر مجاز از رمز عبور، نام کاربری و شماره (یا شماره های) حساب و نیز هرگونه احتمال وقوع آن؛*</Text>
        <Text style={stylePdf.fontSize}>هرگونه عدم دریافت تاییدیه ثبت سفارش؛*</Text>
        <Text style={stylePdf.fontSize}>دریافت تاییدیه ثبت سفارش یا معامله ای که مشتری دستور آن را صادر نکرده است؛*</Text>
        <Text style={stylePdf.fontSize}>هرگونه اطلاعات نادرست در موجودی حساب مشتری، سبد دارایی ها یا اطلاعات معاملات.*</Text>
        <Text style={stylePdf.fontSize}>۵۱-۵ :مشتری مجاز به هیچ گونه دخل و تصرف در زیر ساخت دسترسی برخط بازار و نحوه دستری به آن به هر دلیل از جمله به منظور بهره برداری تجاری یا غیرتجاری توسط خود یا به واسطه دیگری نیست </Text>
        <Text style={stylePdf.fontSize}>و نمی تواند حق استفاده از این خدمات را به شخص دیگری واگذار کند</Text>
        <Text style={stylePdf.fontSize}>۶۱-۵ :مشتری اقرار می نماید که از دانش کافی در خصوص قوانین و مقررات معاملاتی و سایر قوانین و مقررات مرتبط با بازار سرمایه و شرکت های ارائه دهنده خدمات در رابطه با استفاده از خدمات معاملات </Text>
        <Text style={stylePdf.fontSize}>برخط برخوردار بوده، آموزش های لازم را در مورد نحوه استفاده از این خدمات دیده است و خود را ملزم به رعایت آن ها می داند.</Text>
        <Text style={stylePdf.fontSize}>۷۱-۵ :مشتری متعهد است اختیارات، اطلاعات و دسترسی های لازم جهت بازرسی و نظارت بر زیرساخت دسترسی برخط را حسب درخواست سازمان، بورس، عضو یا نمایندگان ایشان ارایه نماید. </Text>
        <Text style={stylePdf.fontSize}>ماده ۶ : حدود مسئولیت طرفین</Text>
        <Text style={stylePdf.fontSize}>۶-۱ :تنها دارنده نام كاربری و رمز عبور، مشتری است. مسئولیت استفاده، حفاظت از رمز عبور و نام كاربری و نیز مسئولیت انجام هرگونه معامله در این حساب كه از طریق نام كاربری و یا رمز عبور مشتری</Text>
        <Text style={stylePdf.fontSize}>صورت می گیرد، برعهده وی است. مشتری همچنین مسئول خسارت هایی است كه در نتیجه عدم رعایت قوانین و مقررات و مفاد این قرارداد توسط وی حادث شود. </Text>
        <Text style={stylePdf.fontSize}>۶-۲ :عضو مسئول حوادثی كه خارج از حیطه اختیار و بدون تقصیر وی رخ می دهند، نیست.</Text>
        <Text style={stylePdf.fontSize}>۶-۳ :در صورتی كه به واسطه اعمال حقوق متعلق به عضو در این قرارداد، مشتری متحمل ضرر و زیان گردد، عضو مسئول جبران خسارت های وارده نیست.</Text>
        <Text style={stylePdf.fontSize}>۶-۴ :انعقاد این قرارداد به منظور ارائه خدمات دسترسی بر خط بازار از سوی عضو به مشتری است و شامل ارائه سایرخدمات از قبیل خدمات مشاوره سرمایه گذاری، قانونی، مالیاتی، مالی و حسابداری </Text>
        <Text style={stylePdf.fontSize}>نیست.</Text>
        <Text style={stylePdf.fontSize}>۶-۵ :عضو مسئولیتی در قبال سودآوری و مخاطرات انجام معاملات برخط توسط مشتری ندارد.</Text>
        <Text style={stylePdf.fontSize}>۶-۶ :چنانچه در اثر بروز اختلال در سیستم معاملات ناشی از نرم افزار كاربردی عضو و یا هسته معاملات اجرای سفارش مشتری با تاخیر یا عدم اجرا مواجه شود، مسئولیتی متوجه عضو نیست.</Text>
        <Text style={stylePdf.fontSize}>ماده ۷ :قابلیت استناد داده پیام ها</Text>
        <Text style={stylePdf.fontSize}>داده پیام ها و سوابق كلیه تراكنش های دریافتی از مشتری و ارسالی به وی كه با رعایت قوانین و مقررات و در چهارچوب مفاد این قرارداد ایجاد و نگهداری شده است، در حكم اسناد معتبر و قابل استناد</Text>
        <Text style={stylePdf.fontSize}>در مراجع قضایی و حقوقی است. در صورت بروز اختلاف بین عضو و مشتری در خصوص این سوابق و داده پیام ها، اطلاعات مندرج در زیرساخت دسترسی برخط بازار عضو، معتبر و برای طرفین لازم الاتباع</Text>
        <Text style={stylePdf.fontSize}>است.</Text>
        <Text style={stylePdf.fontSize}>ماده ۸ :انحلال قرارداد</Text>
        <Text style={stylePdf.fontSize}>قرارداد مطابق ماده ۰۱ قانون مدنی منعقد شده و صرفا در شرایط زیر پایان می یابد. </Text>
        <Text style={stylePdf.fontSize}>۸-۱ :در صورت اعلام مشتری مبنی بر فسخ قرارداد و پس از تسویه كلیه دیون و تعهدات ناشی از معاملات بر خط وی نزد عضو، قرارداد فسخ می شود.</Text>
        <Text style={stylePdf.fontSize}>۸-۲ :در صورت تخلف مشتری از قوانین و مقررات مربوطه و با اعلام مراجع ذی صلاح، قرارداد منفسخ می شود. در این صورت عضو موظف است مراتب را به مشتری اطلاع دهد.</Text>
        <Text style={stylePdf.fontSize}>۸-۳ :در صورت تعلیق به مدت بیش از یك ماه یا لغو مجوز عضو، قرارداد منفسخ می شود.</Text>
        <Text style={stylePdf.fontSize}>۸-۴ :در صورتی كه بر اثر بروز حوادث قهری، امكان ایفای تمام یا بخشی از تعهدات هریك از طرفین به موجب این قرارداد وجود نداشته و وضعیت مذکور به مدت ۰۲ روز كاری ادامه یابد، هریك از طرفین</Text>
        <Text style={stylePdf.fontSize}>حق فسخ قرارداد را دارند.</Text>

      </View>
    </>
  );
};
export default BodyPdf3Page2;
