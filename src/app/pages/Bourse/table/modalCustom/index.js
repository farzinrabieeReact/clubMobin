import { makeStyles } from "@material-ui/core";
import React from "react";
import CloseIcon from "@material-ui/icons/Close";
import { dateConvertMiladiToShamsi } from "../../../../common/method/date";
import { handleNumber } from "../../../../common/method/displayData";

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
const Index = ({ handleClose, infoModal }) => {
  function isEven(value) {
    if (value % 2 == 0) return true;
    else return false;
  }

  const handleDate = (date) => {
    let changeDate = dateConvertMiladiToShamsi(
      date.split("T")[0].replaceAll("-", "/")
    );
    return changeDate;
    // return <div dangerouslySetInnerHTML={{ __html: text }}></div>;
  };
  const classes = useStyles();
  return (
    <>
      <div className="position-relative">
        <h5 className="alert alert-light ">
          {"عرضه"} {infoModal?.info?.name}
        </h5>
        <CloseIcon
          style={{
            cursor: "pointer",
            color: "red",
            position: "absolute",
            left: 10,
            top: 10,
          }}
          onClick={handleClose}
        />
      </div>
      <div className="w-100 d-flex justify-content-center mb-3 mt-4 text-center position-relative">
        <h5 className="mb-5 alert alert-light">اطلاعات کلی محصول</h5>
      </div>
      <div className="row">
        {TitleBox1.map((itm, ind) => (
          <>
            {itm.label === "مشخصات کلی عرضه" && (
              <div className="col-12">
                <div className={classes.boxParent} style={{ height: "auto" }}>
                  <div className={classes.boxRight2} style={{ height: "auto" }}>
                    {itm.label}
                  </div>
                  <div
                    className={classes.boxLeft2}
                    style={{ height: "auto", fontSize: 10, padding: "5px 5px" }}
                  >
                    {infoModal.info[itm.id]}
                  </div>
                </div>
              </div>
            )}
            {isEven(ind) === true && itm.label !== "مشخصات کلی عرضه" && (
              <div className="col-12 col-lg-6 order-0">
                <div className={classes.boxParent}>
                  <div className={classes.boxRight}>{itm.label}</div>
                  <div className={classes.boxLeft}>
                    {infoModal.info[itm.id]}
                  </div>
                </div>
              </div>
            )}
            {isEven(ind) === false && itm.label !== "مشخصات کلی عرضه" && (
              <div className="col-12 col-lg-6 order-0">
                <div className={classes.boxParent}>
                  <div className={classes.boxRight}>{itm.label}</div>
                  <div className={classes.boxLeft}>
                    {infoModal.info[itm.id]}
                  </div>
                </div>
              </div>
            )}
          </>
        ))}
      </div>

      {/* 
      <div
        className="w-100 d-flex justify-content-between mb-3 mt-4"
        onClick={handleClose}
      >
        <h5 className="text-center mb-5">اطلاعات کلی محصول</h5>
        <CloseIcon style={{ cursor: "pointer", color: "red" }} />
      </div>
      <div className={classes.grid}>
        {TitleBox1.map((itm, ind) => (
          <div className={classes.boxParent} style={itm.label === "مشخصات کلی عرضه"? {height:100}: {}}>
            <div className={classes.boxRight} style={itm.label === "مشخصات کلی عرضه"?{height:100}: {}}>{itm.label}</div>
            <div className={classes.boxLeft} style={itm.label === "مشخصات کلی عرضه"? {height:100,fontSize:10,whiteSpace:'wrap'}: {}}>{infoModal.info[itm.id]}</div>
          </div>
        ))}
      </div> */}

      <div
        className="w-100 d-flex justify-content-center mb-3 mt-4"
        onClick={handleClose}
      >
        <h5 className="text-center mb-5 mt-10 alert alert-light">
          جزییات معامله
        </h5>
        {/* <CloseIcon  style={{cursor:'pointer',color:'red'}}/> */}
      </div>
      <div className="row">
        {TitleBox2.map((itm, ind) => (
          <>
            {isEven(ind) === true && (
              <div className="col-12 col-lg-6">
                <div className={classes.boxParent}>
                  <div className={classes.boxRight}>{itm.label}</div>
                  <div className={classes.boxLeft}>
                    {itm.type === "date"? handleDate(infoModal.info[itm.id]) : itm.type === "price" ? handleNumber(infoModal.info[itm.id]) : infoModal.info[itm.id]}
                  </div>
                </div>
              </div>
            )}
            {isEven(ind) === false && (
              <div className="col-12 col-lg-6">
                <div className={classes.boxParent}>
                  <div className={classes.boxRight}>
                    {itm.label}
                  </div>
                  <div className={classes.boxLeft}>
                  {itm.type === "date"? handleDate(infoModal.info[itm.id]) : itm.type === "price" ? handleNumber(infoModal.info[itm.id]) : infoModal.info[itm.id]}
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
  {
    id: "offerDate",
    label: "تاریخ عرضه",
    minWidth: 120,
    align: "center",
    type: "date",
  },

  // {
  {
    id: "offerCode",
    label: "کد عرضه",
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
    id: "quantity",
    label: "حجم کالای قابل عرضه",
    minWidth: 120,
    align: "center",
    //   format: (value) => value.toFixed(2),
  },
  {
    id: "supplier",
    label: "عرضه کننده",
    minWidth: 120,
    align: "center",
    //   format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: "basePrice",
    label: "قیمت پایه",
    minWidth: 120,
    align: "center",
    type:"price"
    //   format: (value) => value.toFixed(2),
  },
  {
    id: "minQuantity",
    label: "حداقل عرضه",
    minWidth: 120,
    align: "center",
    //   format: (value) => value.toFixed(2),
  },
  {
    id: "deliveryLocation",
    label: "مکان تحویل",
    minWidth: 120,
    align: "center",

    //   format: (value) => value.toFixed(2),
  },
  {
    id: "basePriceLimit",
    label: "حداقل قیمت پایه",
    minWidth: 120,
    align: "center",
    type:"price"

    //   format: (value) => value.toFixed(2),
  },
  {
    id: "maxOfferIncrement",
    label: "حداکثر افزایش عرضه",
    minWidth: 120,
    align: "center",

    //   format: (value) => value.toFixed(2),
  },
  {
    id: "deliveryDate",
    label: "تاریخ تحویل",
    minWidth: 120,
    align: "right",
    type: "date",
    //   format: (value) => value.toLocaleString('en-US'),
  },
  // {
  //     id: 'areaCode',
  //     label: 'پیش شماره',
  //     minWidth: 170,
  //     align: 'center',
  //     //   format: (value) => value.toLocaleString('en-US'),
  // },
  // {
  //   id: "maxOfferIncrement",
  //   label: "حداکثر افزایش عرضه",
  //   minWidth: 120,
  //   align: "center",
  //   //   format: (value) => value.toFixed(2),
  // },
  {
    id: "minBuyQuantityToDescreasePrice",
    label: "حداقل خرید جهت کاهش نرخ",
    minWidth: 120,
    align: "center",
    //   format: (value) => value.toFixed(2),
  },
  {
    id: "allocationBaseUnit",
    label: "واحد پایه تخصیص",
    minWidth: 120,
    align: "center",
    //   format: (value) => value.toFixed(2),
  },
  {
    id: "minAllowedPrice",
    label: "حداقل قیمت مجاز",
    minWidth: 120,
    align: "center",
    type:"price"
    //   format: (value) => value.toFixed(2),
  },
  {
    id: "maxBuyQuantityIfExist",
    label: "حداکثر خرید در صورت وجود",
    minWidth: 120,
    align: "center",
    //   format: (value) => value.toFixed(2),
  },
  {
    id: "allowedDeliveryError",
    label: "خطای مجاز تحویل",
    minWidth: 120,
    align: "center",
    //   format: (value) => value.toFixed(2),
  },
  {
    id: "maxAllowedPrice",
    label: "حداکثر قیمت مجاز",
    minWidth: 120,
    align: "center",
    type:"price"
    //   format: (value) => value.toFixed(2),
  },
  {
    id: "minPriceChange",
    label: "حداقل تغییر قیمت سفارش",
    minWidth: 120,
    align: "center",
    //   format: (value) => value.toFixed(2),
  },
  {
    id: "settlementType",
    label: "نوع تسویه",
    minWidth: 120,
    align: "center",
    //   format: (value) => value.toFixed(2),
  },
  {
    id: "buyType",
    label: "روش خرید",
    minWidth: 120,
    align: "center",
    //   format: (value) => value.toFixed(2),
  },
  {
    id: "offerMode",
    label: "نحوه عرضه",
    minWidth: 120,
    align: "center",
    //   format: (value) => value.toFixed(2),
  },
  {
    id: "unit",
    label: "واحد",
    minWidth: 120,
    align: "center",
    //   format: (value) => value.toFixed(2),
  },
  {
    id: "currency",
    label: "نوع ارز",
    minWidth: 120,
    align: "center",
    //   format: (value) => value.toFixed(2),
  },
  {
    id: "prePaymentRate",
    label: "ضریب پیش پرداخت",
    minWidth: 120,
    align: "center",
    //   format: (value) => value.toFixed(2),
  },
  {
    id: "offerType",
    label: "نوع عرضه",
    minWidth: 120,
    align: "center",
    //   format: (value) => value.toFixed(2),
  },
];

let TitleBox1 = [
  {
    id: "packageType",
    label: "نوع بسته بندی",
    minWidth: 120,
    align: "center",
    //   format: (value) => value.toFixed(2),
  },
  {
    id: "name",
    label: "نام کالا",
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
    id: "description",
    label: "مشخصات کلی عرضه",
    minWidth: 120,
    align: "center",
    //   format: (value) => value.toFixed(2),
  },
];

// allocationBaseUnit: "20.00000"
// allowedDeliveryError: "5"
// basePrice: 125560
// basePriceLimit: 125560
// buyLimit: 10000
// buyType: "2"
// currency: "ریال"
// deliveryDate: "2022-02-08T00:00:00"
// deliveryLocation: "انبار کارخانه"
// description: "عرضه ی معامله نهایی قرارداد 1400161351001 مربوط به عرضه کشف پریمیوم  400/08/26کد عرضه 505173"
// maxAllowedPrice: 502240
// maxBuyQuantityIfExist: 10000
// maxOfferIncrement: 0
// minAllowedPrice: 1
// minBuyQuantityToDescreasePrice: 100
// minPriceChange: 1
// minQuantity: 200
// name: "شمش بلوم (150*150)5SP"
// offerCode: "519632"
// offerDate: "2022-01-31T00:00:00"
// offerMode: "عمده"
// offerType: "عرضه داخلی"
// packageType: "شمش"
// prePaymentRate: 10
// producer: "شرکت معدنی وصنعتی چادرملو"
// quantity: 10000
// settlementType: "انفساخ"
// supplier: "معدنی و صنعتی چادر ملو"
// unit: "کیلوگرم"
