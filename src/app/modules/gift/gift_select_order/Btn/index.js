import {
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import CardNoData from "../../../../common/components/cardNoData";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  display: "flex",
  justifyContent: "center",
  transform: "translate(-50%, -50%)",
  minWidth: 200,
  maxWidth: 650,
  backgroundColor: "white",
  // border: "2px solid #000",
  boxShadow: 24,
  padding: 50,
  overflowX: "hidden"
};
const styleBtn = {
  position: "absolute",
  bottom: "10px",
  left: "50%",
  right: "50%",
  padding: "2px 7px",
  transform: "translateX(20px)",
  border: "1px solid red",
  borderRadius: 5,
  backgroundColor: "white",
  color: "red",
  width: "60px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center"
};

const Index = ({ infoBtn,setinfoBtn }) => {
  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);
  const [customData, setcustomData] = useState({});

  useEffect(() => {
    if (infoBtn.flag) {
      setOpen(true);
    }
  }, [infoBtn.flag]); 
  
  useEffect(() => {
    return () => {
      setinfoBtn(prev=>({
        ...prev,
        flag:false
      }))
    };
  }, []);


  const handelCustomData = customData => {
    let obj = {};
    let customDataa = customData?.map(item => {
      //eslint-disable-line no-unused-vars
      switch (item.name) {
        case "phoneNumber":
          return (obj["phone"] = Convertnumber2english(item.value));
        case "mobile":
          return (obj["phone"] = Convertnumber2english(item.value));
        case "provinceName":
          return (obj["provinceName"] = item.value);
        case "cityName":
          return (obj["cityName"] = item.value);
        case "postalCode":
          return (obj["postCode"] = item.value);
        case "personName":
          return (obj["personName"] = item.value);
        case "address":
          return (obj["address"] = item.value);
        case "instrumentName":
          return (obj["instrumentName"] = item.value);
        default:
          return {};
      }
    });
    return obj;
  };

  function Convertnumber2english(str) {
    let str2 = undefined; //eslint-disable-line no-unused-vars
    str = str.replaceAll("۰", "0");
    str = str.replaceAll("۱", "1");
    str = str.replaceAll("۲", "2");
    str = str.replaceAll("۳", "3");
    str = str.replaceAll("۴", "4");
    str = str.replaceAll("۵", "5");
    str = str.replaceAll("۶", "6");
    str = str.replaceAll("۷", "7");
    str = str.replaceAll("۸", "8");
    str = str.replaceAll("۹", "9");

    return str;
  }

  useEffect(() => {
    setcustomData(
      handelCustomData(JSON.parse(infoBtn.item.body.gift_custom_data))
    );
  }, []); //eslint-disable-line react-hooks/exhaustive-deps


  const handleHead = item => {
    switch (item) {
      case "personName":
        return "نام";
      case "phoneNumber":
        return "شماره موبایل";
      case "phone":
        return "شماره موبایل";
      case "provinceName":
        return "استان";
      case "cityName":
        return "شهر";
      case "postCode":
        return "کد پستی";
      case "address":
        return "آدرس";
      case "instrumentName":
        return "نام سهم";
      default:
        return "";
    }
  };
  const handelExit = () => {
    handleClose();
  };

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <TableContainer component={Paper} style={style}>
          {/* <h2>{"جزییات"}</h2> */}
          {Object.keys(customData).length !== 0 && (
            <Table
              style={{ minWidth: "200", maxWidth: 650, borderBottom: 0 }}
              aria-label="simple table"
            >
              {Object.keys(customData).length && (
                <TableHead>
                  <TableRow>
                    {Object.keys(customData).map((item, ind) => (
                      <>
                        <TableCell key={ind} style={{ fontWeight: "bold" }}>
                          {handleHead(item)}
                        </TableCell>
                      </>
                    ))}
                  </TableRow>
                </TableHead>
              )}

              {Object.keys(customData).length && (
                <TableBody>
                  <TableRow>
                    {Object.keys(customData).map((item, ind) => (
                      <>
                        <TableCell key={ind} style={{ fontSize: 10 }}>
                          {customData[item]}
                        </TableCell>
                      </>
                    ))}
                  </TableRow>
                </TableBody>
              )}
            </Table>
          )}
          {Object.keys(customData).length === 0 && <CardNoData />}
          <button
            style={styleBtn}
            className="backGroundOrangeOutLine"
            onClick={handelExit}
          >
            بازگشت
          </button>
        </TableContainer>
      </Modal>
    </>
  );
};

export default Index;
