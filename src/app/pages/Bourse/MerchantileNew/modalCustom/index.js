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
        <h5 className="text-center mb-5 mt-10 alert alert-light">???????????? ????????????</h5>
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
  // { id: "offerDate", label: "?????????? ????????", minWidth: 120, align: "center" },

  // {
  {
    id: "contract_Code",
    label: "?????????? ??????????????",
    minWidth: 120,
    align: "center",
    //   format: (value) => value.toFixed(2),
  },
  //   id: "xKalaNamadKala",
  //   label: "????????",
  //   minWidth: 120,
  //   align: "left",
  //   //   format: (value) => value.toLocaleString('en-US'),
  // },
  {
    id: "name",
    label: "?????? ????????",
    minWidth: 120,
    align: "center",
    //   format: (value) => value.toFixed(2),
  },
  {
    id: "base_Price",
    label: "???????? ????????",
    minWidth: 120,
    align: "center",
    //   format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: "supplier",
    label: "???????? ??????????",
    minWidth: 120,
    align: "center",
    //   format: (value) => value.toFixed(2),
  },
  {
    id: "delivery_Date",
    label: "?????????? ??????????",
    minWidth: 120,
    align: "center",
    type:"date"
    //   format: (value) => value.toFixed(2),
  },
  {
    id: "buyer_Broker",
    label: "?????????????? ????????????",
    minWidth: 120,
    align: "center",

    //   format: (value) => value.toFixed(2),
  },
  {
    id: "prePayment_Precent",
    label: "???????? ?????? ????????????",
    minWidth: 120,
    align: "center",

    //   format: (value) => value.toFixed(2),
  },
  {
    id: "tonnage_Fee",
    label: "???? ???? ????????",
    minWidth: 120,
    align: "center",

    //   format: (value) => value.toFixed(2),
  },
  {
    id: "buyer_Broker_Commission",
    label: "???????????? ?????????????? ?????? ????????????",
    minWidth: 120,
    align: "right",
    //   format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: "buyer_Ime_Commission",
    label: "???????????? ???????? ?????? ????????????",
    minWidth: 120,
    align: "right",
    //   format: (value) => value.toLocaleString('en-US'),
  },
  // {
  //     id: 'areaCode',
  //     label: '?????? ??????????',
  //     minWidth: 170,
  //     align: 'center',
  //     //   format: (value) => value.toLocaleString('en-US'),
  // },
  {
    id: "seller_Total_Commission",
    label: "???? ???????????? ?????? ??????????????",
    minWidth: 120,
    align: "center",
    //   format: (value) => value.toFixed(2),
  },
  {
    id: "settlement_Remain",
    label: "?????????? ???????? ???????????? ?????? ??????????",
    minWidth: 120,
    align: "center",
    //   format: (value) => value.toFixed(2),
  },
  {
    id: "settlement_Delivery_Date",
    label: "???????? ?????????? ???????? ??????????",
    minWidth: 120,
    align: "center",
    //   format: (value) => value.toFixed(2),
  },
  {
    id: "penalty_Amount",
    label: "???????? ??????????",
    minWidth: 120,
    align: "center",
    //   format: (value) => value.toFixed(2),
  },
  {
    id: "settlement_Type",
    label: "?????? ?????????? ?????????? ??????",
    minWidth: 120,
    align: "center",
    //   format: (value) => value.toFixed(2),
  },
  // {
  //   id: "allowedDeliveryError",
  //   label: "?????????? ???????? ??????????",
  //   minWidth: 120,
  //   align: "center",
  //   type:"date"
  //   //   format: (value) => value.toFixed(2),
  // },
  {
    id: "maxAllowedPrice",
    label: "?????????? ???????? ???????????? ???? ??????????",
    minWidth: 120,
    align: "center",
    //   format: (value) => value.toFixed(2),
  },
  {
    id: "minPriceChange",
    label: "?????????? ?????????????? ??????",
    minWidth: 120,
    align: "center",
    //   format: (value) => value.toFixed(2),
  },
  // {
  //   id: "settlementType",
  //   label: "?????????? ??????????",
  //   minWidth: 120,
  //   align: "center",
  //   type:"date"
  //   //   format: (value) => value.toFixed(2),
  // },
  {
    id: "sheba_Number",
    label: "?????????? ??????",
    minWidth: 120,
    align: "center",
    //   format: (value) => value.toFixed(2),
  },
  {
    id: "offer_Code",
    label: "???? ????????",
    minWidth: 120,
    align: "center",
    //   format: (value) => value.toFixed(2),
  },
  {
    id: "producer",
    label: "?????????? ??????????",
    minWidth: 120,
    align: "center",
    //   format: (value) => value.toFixed(2),
  },
  {
    id: "buy_Price",
    label: "???????? ???????? ??????",
    minWidth: 120,
    align: "center",
    //   format: (value) => value.toFixed(2),
  },
  {
    id: "tonnage",
    label: "????????",
    minWidth: 120,
    align: "center",
    //   format: (value) => value.toFixed(2),
  },
  {
    id: "offerType",
    label: "?????? ??????????",
    minWidth: 120,
    align: "center",
    //   format: (value) => value.toFixed(2),
  },
  {
    id: "seller_Broker",
    label: "?????? ???????? ??????????????",
    minWidth: 120,
    align: "center",
    //   format: (value) => value.toFixed(2),
  },
  {
    id: "name",
    label: "???????? ?????? ???????????? ?????? ??????",
    minWidth: 120,
    align: "center",
    //   format: (value) => value.toFixed(2),
  },
  {
    id: "producer",
    label: "?????? ??????????????",
    minWidth: 120,
    align: "center",
    //   format: (value) => value.toFixed(2),
  },
  {
    id: "buyer_Seo_Commission",
    label: "???????????? ???????????? ?????? ????????????",
    minWidth: 120,
    align: "center",
    //   format: (value) => value.toFixed(2),
  },
  {
    id: "description",
    label: "???? ???????????? ?????? ????????????",
    minWidth: 120,
    align: "center",
    //   format: (value) => value.toFixed(2),
  },
  {
    id: "preSettlementConditions",
    label: "?????????? ???????? ??????????",
    minWidth: 120,
    align: "center",
    //   format: (value) => value.toFixed(2),
  },
  {
    id: "settlement_Payment_Id",
    label: "?????????? ?????????? ?????? ??????????",
    minWidth: 120,
    align: "center",
    //   format: (value) => value.toFixed(2),
  },
  {
    id: "settlement_Delivery_Date_With_Penalty",
    label: "???????? ?????????? ?????????? ??????????",
    minWidth: 120,
    align: "center",
    //   format: (value) => value.toFixed(2),
  },
  {
    id: "settlement_Deadline",
    label: "?????????? ?????????? ?????????? ??????",
    minWidth: 120,
    align: "center",
    type:"date"
    //   format: (value) => value.toFixed(2),
  },
  {
    id: "settlement_Date",
    label: "?????????? ?????? ??????????",
    minWidth: 120,
    align: "center",
    type:"date"
    //   format: (value) => value.toFixed(2),
  },
  {
    id: "description",
    label: "?????????? ??????????",
    minWidth: 120,
    align: "center",
    //   format: (value) => value.toFixed(2),
  },
  // {
  //   id: "description",
  //   label: "?????????? ?????????????? ??????",
  //   minWidth: 120,
  //   align: "center",
  //   type:"date"
  //   //   format: (value) => value.toFixed(2),
  // },
  {
    id: "account_Number",
    label: "?????????? ???????? ?????? ??????",
    minWidth: 120,
    align: "center",
    //   format: (value) => value.toFixed(2),
  },
  {
    id: "description",
    label: "???????????? ?????????????? ????????",
    minWidth: 120,
    align: "center",
    //   format: (value) => value.toFixed(2),
  },
];


