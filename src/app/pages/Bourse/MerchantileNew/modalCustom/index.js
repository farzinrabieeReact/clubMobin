import { makeStyles } from "@material-ui/core";
import React from "react";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  grid: {
    width: "100%",
    display: "grid",
    gridTemplateColumns: "auto auto",
    // gridTemplateRows: 20,
    gridGap: "5px",
    "@media (max-width: 992px)": {
      gridTemplateColumns: "auto",
    },
  },

  boxParent: {
    width: "100%",
    display: "flex",
    height: 30,
    marginBottom: 5,
    "@media (max-width: 1250px)": {
      height: 40,
    },
    // boxShadow:' rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px'
  },
  boxRight: {
    width: "35%",
    height: 30,
    backgroundColor: "#ff961e",
    border: "1px solid #ff961e",
    display: "flex",
    borderRight: 0,
    fontSize: 13,
    color: "white",
    borderRadius: "5px 0 0 5px",
    boxShadow:
      " rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px",
    //   justifyContent:'center',
    alignItems: "center",
    paddingLeft: 5,
    "@media (max-width: 1250px)": {
      fontSize: 10,
      height: 40,
    },
  },
  boxLeft: {
    width: "65%",
    height: 30,
    fontSize: 13,
    backgroundColor: "white",
    border: "1px solid #ff961e",
    display: "flex",
    borderRadius: "0 5px 5px 0",
    boxShadow:
      "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px",
    //   justifyContent:'center',
    alignItems: "center",
    paddingLeft: 15,
    "@media (max-width: 1250px)": {
      fontSize: 11,
      height: 40,
    },
  },
  boxRight2: {
    width: "17.2%",
    height: 30,
    backgroundColor: "#ff961e",
    border: "1px solid #ff961e",
    display: "flex",
    borderRight: 0,
    fontSize: 13,
    color: "white",
    borderRadius: "5px 0 0 5px",
    boxShadow:
      " rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px",
    //   justifyContent:'center',
    alignItems: "center",
    paddingLeft: 5,
    "@media (max-width: 1250px)": {
      fontSize: 10,
      height: 40,
    },
    "@media (max-width: 992px)": {
      width: "35%",
    },
  },
  boxLeft2: {
    width: "84%",
    height: 30,
    fontSize: 13,
    backgroundColor: "white",
    border: "1px solid #ff961e",
    display: "flex",
    borderRadius: "0 5px 5px 0",
    boxShadow:
      "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px",
    //   justifyContent:'center',
    alignItems: "center",
    paddingLeft: 15,
    "@media (max-width: 1250px)": {
      fontSize: 11,
      height: 40,
    },
    "@media (max-width: 992px)": {
      width: "65%",
    },
  },
}));
const Index = ({ handleClose, infoModal,handleDate }) => {
  function isEven(value) {
    if (value % 2 == 0) return true;
    else return false;
  }


  const classes = useStyles();
  return (
    <>
      <div
        className="w-100 d-flex justify-content-center mb-3 mt-4 position-relative"
        onClick={handleClose}
      >
        <h5 className="text-center mb-5 mt-10 alert alert-light">جزییات معامله</h5>
        <CloseIcon
          style={{
            cursor: "pointer",
            color: "red",
            position: "absolute",
            left: 0,
            top: 0,
          }}
        />
      </div>
      <div className="row">
        {TitleBox2.map((itm, ind) => (
          <>
            {isEven(ind) === true && (
              <div className="col-12 col-lg-6">
                <div className={classes.boxParent}>
                  <div className={classes.boxRight}>{itm.label}</div>
                  <div className={classes.boxLeft}>
                  {itm.type === "date" ? handleDate(infoModal?.info[itm.id]) : infoModal?.info[itm.id]}
                  </div>
                </div>
              </div>
            )}
            {isEven(ind) === false && (
              <div className="col-12 col-lg-6">
                <div className={classes.boxParent}>
                  <div className={classes.boxRight}>{itm.label}</div>
                  <div className={classes.boxLeft}>
                  {itm.type === "date" ? handleDate(infoModal?.info[itm.id]) : infoModal?.info[itm.id]}
                  </div>
                </div>
              </div>
            )}
          </>
        ))}
      </div>
    </>
  );
};

export default Index;

let TitleBox2 = [
  // { id: "offerDate", label: "تاریخ عرضه", minWidth: 120, align: "center" },

  // {
  {
    id: "contract_Code",
    label: "شماره قرارداد",
    minWidth: 120,
    align: "center",
    //   format: (value) => value.toFixed(2),
  },
  //   id: "xKalaNamadKala",
  //   label: "نماد",
  //   minWidth: 120,
  //   align: "left",
  //   //   format: (value) => value.toLocaleString('en-US'),
  // },
  {
    id: "name",
    label: "نام کالا",
    minWidth: 120,
    align: "center",
    //   format: (value) => value.toFixed(2),
  },
  {
    id: "base_Price",
    label: "قیمت پایه",
    minWidth: 120,
    align: "center",
    //   format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: "supplier",
    label: "عرضه کننده",
    minWidth: 120,
    align: "center",
    //   format: (value) => value.toFixed(2),
  },
  {
    id: "delivery_Date",
    label: "تاریخ تحویل",
    minWidth: 120,
    align: "center",
    type:"date"
    //   format: (value) => value.toFixed(2),
  },
  {
    id: "buyer_Broker",
    label: "کارگزار خریدار",
    minWidth: 120,
    align: "center",

    //   format: (value) => value.toFixed(2),
  },
  {
    id: "prePayment_Precent",
    label: "درصد پیش پرداخت",
    minWidth: 120,
    align: "center",

    //   format: (value) => value.toFixed(2),
  },
  {
    id: "tonnage_Fee",
    label: "فی در تناژ",
    minWidth: 120,
    align: "center",

    //   format: (value) => value.toFixed(2),
  },
  {
    id: "buyer_Broker_Commission",
    label: "کارمزد کارگزار سهم خریدار",
    minWidth: 120,
    align: "right",
    //   format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: "buyer_Ime_Commission",
    label: "کارمزد بورس سهم خریدار",
    minWidth: 120,
    align: "right",
    //   format: (value) => value.toLocaleString('en-US'),
  },
  // {
  //     id: 'areaCode',
  //     label: 'پیش شماره',
  //     minWidth: 170,
  //     align: 'center',
  //     //   format: (value) => value.toLocaleString('en-US'),
  // },
  {
    id: "seller_Total_Commission",
    label: "کل کارمزد سهم فروشنده",
    minWidth: 120,
    align: "center",
    //   format: (value) => value.toFixed(2),
  },
  {
    id: "settlement_Remain",
    label: "مانده قابل پرداخت جهت تسویه",
    minWidth: 120,
    align: "center",
    //   format: (value) => value.toFixed(2),
  },
  {
    id: "settlement_Delivery_Date",
    label: "مهلت تسویه بدون جریمه",
    minWidth: 120,
    align: "center",
    //   format: (value) => value.toFixed(2),
  },
  {
    id: "penalty_Amount",
    label: "مبلغ جریمه",
    minWidth: 120,
    align: "center",
    //   format: (value) => value.toFixed(2),
  },
  {
    id: "settlement_Type",
    label: "نوع تسویه انجام شده",
    minWidth: 120,
    align: "center",
    //   format: (value) => value.toFixed(2),
  },
  // {
  //   id: "allowedDeliveryError",
  //   label: "تاریخ صدور حواله",
  //   minWidth: 120,
  //   align: "center",
  //   type:"date"
  //   //   format: (value) => value.toFixed(2),
  // },
  {
    id: "maxAllowedPrice",
    label: "مانده قابل پرداخت به مشتری",
    minWidth: 120,
    align: "center",
    //   format: (value) => value.toFixed(2),
  },
  {
    id: "minPriceChange",
    label: "وضعیت درخواست وجه",
    minWidth: 120,
    align: "center",
    //   format: (value) => value.toFixed(2),
  },
  // {
  //   id: "settlementType",
  //   label: "تاریخ واریز",
  //   minWidth: 120,
  //   align: "center",
  //   type:"date"
  //   //   format: (value) => value.toFixed(2),
  // },
  {
    id: "sheba_Number",
    label: "شماره شبا",
    minWidth: 120,
    align: "center",
    //   format: (value) => value.toFixed(2),
  },
  {
    id: "offer_Code",
    label: "کد عرضه",
    minWidth: 120,
    align: "center",
    //   format: (value) => value.toFixed(2),
  },
  {
    id: "producer",
    label: "تولید کننده",
    minWidth: 120,
    align: "center",
    //   format: (value) => value.toFixed(2),
  },
  {
    id: "buy_Price",
    label: "قیمت خرید شده",
    minWidth: 120,
    align: "center",
    //   format: (value) => value.toFixed(2),
  },
  {
    id: "tonnage",
    label: "تناژ",
    minWidth: 120,
    align: "center",
    //   format: (value) => value.toFixed(2),
  },
  {
    id: "offerType",
    label: "محل تحویل",
    minWidth: 120,
    align: "center",
    //   format: (value) => value.toFixed(2),
  },
  {
    id: "seller_Broker",
    label: "کار گزار فروشنده",
    minWidth: 120,
    align: "center",
    //   format: (value) => value.toFixed(2),
  },
  {
    id: "name",
    label: "مبلغ پیش پرداخت کسر شده",
    minWidth: 120,
    align: "center",
    //   format: (value) => value.toFixed(2),
  },
  {
    id: "producer",
    label: "نوع قرارداد",
    minWidth: 120,
    align: "center",
    //   format: (value) => value.toFixed(2),
  },
  {
    id: "buyer_Seo_Commission",
    label: "کارمزد سازمان سهم خریدار",
    minWidth: 120,
    align: "center",
    //   format: (value) => value.toFixed(2),
  },
  {
    id: "description",
    label: "کل کارمزد سهم خریدار",
    minWidth: 120,
    align: "center",
    //   format: (value) => value.toFixed(2),
  },
  {
    id: "preSettlementConditions",
    label: "شرایط قابل تسویه",
    minWidth: 120,
    align: "center",
    //   format: (value) => value.toFixed(2),
  },
  {
    id: "settlement_Payment_Id",
    label: "شناسه واریز جهت تسویه",
    minWidth: 120,
    align: "center",
    //   format: (value) => value.toFixed(2),
  },
  {
    id: "settlement_Delivery_Date_With_Penalty",
    label: "مهلت تسویه مشمول جریمه",
    minWidth: 120,
    align: "center",
    //   format: (value) => value.toFixed(2),
  },
  {
    id: "settlement_Deadline",
    label: "تاریخ تسویه انجام شده",
    minWidth: 120,
    align: "center",
    type:"date"
    //   format: (value) => value.toFixed(2),
  },
  {
    id: "settlement_Date",
    label: "تاریخ ثبت سفارش",
    minWidth: 120,
    align: "center",
    type:"date"
    //   format: (value) => value.toFixed(2),
  },
  {
    id: "description",
    label: "شماره حواله",
    minWidth: 120,
    align: "center",
    //   format: (value) => value.toFixed(2),
  },
  // {
  //   id: "description",
  //   label: "تاریخ درخواست وجه",
  //   minWidth: 120,
  //   align: "center",
  //   type:"date"
  //   //   format: (value) => value.toFixed(2),
  // },
  {
    id: "account_Number",
    label: "شماره حساب ثبت شده",
    minWidth: 120,
    align: "center",
    //   format: (value) => value.toFixed(2),
  },
  {
    id: "description",
    label: "دریافت اعلامیه خرید",
    minWidth: 120,
    align: "center",
    //   format: (value) => value.toFixed(2),
  },
];


