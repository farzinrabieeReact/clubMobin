import {
  Checkbox,
  CircularProgress,
  FormControlLabel,
  makeStyles,
  TextField,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { ime_insert_request } from "../../../../../../redux/bourse/insert_request";
import {
  handleNotificationAlertCatch,
  handleNotificationAlertTryUpdate,
} from "../../../../../common/method/handleNotificationAlert";
import { actionTypes as actionTypesNotif } from "../../../../../../redux/notificationAlert";
import { useDispatch } from "react-redux";
import { handleNumber } from "../../../../../common/method/displayData";

let useStyles = makeStyles((theme) => ({
  btnGreen: {
    display: "inline-block",
    width: 70,
    height: 30,
    border: "1.5px solid green",
    color: "green",
    borderRadius: 5,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 5,
    "&:hover": {
      backgroundColor: "green",
      color: "white",
      cursor: "pointer",
    },
  },
  btnRed: {
    width: 70,
    height: 30,
    color: "rgb(180, 40, 40)",
    border: "1.5px solid rgb(180, 40, 40)",
    borderRadius: 5,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    "&:hover": {
      cursor: "pointer",

      backgroundColor: "rgb(180, 40, 40)",
      color: "white",
    },
  },
}));

const Index = ({ infoModal, handleClose }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [checked, setChecked] = React.useState(true);
  const [loading, setloading] = useState(false);
  const [dataInsert, setdataInsert] = useState({
    national_id: "",
    price: 0,
    offer_code: "",
    quantity: "",
  });


  const handleChange = (event) => {
    setChecked(event.target.checked);
  };
  const [checked1, setChecked1] = React.useState(true);

  const handleChange1 = (event) => {
    setChecked1(event.target.checked);
  };
  const handleChangeDataInsert = (event, type) => {
    setdataInsert((prev) => ({
      ...prev,
      [type]: event,
    }));
  };
  useEffect(() => {
    if (checked) {
      setdataInsert((prev) => ({
        ...prev,
        price: 0,
      }));
    }
  }, [checked]);

  const apiInsert = () => {
    setloading(true);
    ime_insert_request()
      .then((result) => {
        let isok = handleNotificationAlertTryUpdate(result);
        if (!isok) {
          return;
        }
      })
      .catch((err) => {
        handleNotificationAlertCatch();
      })
      .finally(() => {
        setloading(false);
      });
  };

  const checkFillDataInsert = () => {
    if (!dataInsert["quantity"]) {
      dispatch({
        type: actionTypesNotif.warning,
        textAlert: "لطفا فیلد مربوط به حجم را وارد کنید",
      });
      return;
    }
    if (!dataInsert["price"] && !checked) {
      dispatch({
        type: actionTypesNotif.warning,
        textAlert: "لطفا تیک قیمت در تالار را بزنید یا یک قیمت وارد کنید",
      });
      return;
    }
    if (!checked1) {
      dispatch({
        type: actionTypesNotif.warning,
        textAlert: "لطفا تیک مربوط به قوانین را بزنید",
      });
      return;
    }
    apiInsert();
  };

  useEffect(() => {}, [dataInsert]);

  return (
    <>
      <div className="d-flex justify-content-around flex-column h-100">
        <h5 className="w-100 alert alert-light">
          <span>فرم درخواست عرضه</span>
          <span className="me-3">{infoModal?.info?.offerCode}</span>
        </h5>
        <div>
          <TextField
            id="outlined-basic"
            label="حجم"
            variant="outlined"
            size="small"
            type="number"
            style={{ marginBottom: 10 }}
            onChange={(event) =>
              handleChangeDataInsert(event.target.value, "quantity")
            }
          />
          <div className="d-flex" style={{ color: "gray" }}>
            <div className="mr-4">
              <span>حداقل حجم :</span>
              <span style={{ color: "orange" }} className="mx-1">
                {infoModal?.info?.minQuantity}
              </span>
              <span>{infoModal?.info?.unit}</span>
            </div>
            <div>
              <span>حداکثر حجم :</span>
              <span style={{ color: "orange" }} className="mx-1">
                {infoModal?.info?.quantity}
              </span>
              <span>{infoModal?.info?.unit}</span>
            </div>
          </div>
        </div>
        <div className="d-flex align-items-center" style={{ height: 80 }}>
          <div>
            <FormControlLabel
              label="قیمت در تالار"
              control={<Checkbox checked={checked} onChange={handleChange} />}
            />
          </div>
          {!checked && (
            <div className="mt-2 d-flex">
              <TextField
                id="outlined-basic"
                label="قیمت"
                variant="outlined"
                size="small"
                type="number"
                style={{ marginBottom: 10 }}
                onChange={(event) =>
                  handleChangeDataInsert(event.target.value, "price")
                }
              />
              <span className="mt-2 me-1">ریال</span>
              <div className="me-3 mt-2">
                <span className="mr-1">حداقل قیمت پایه:</span>
                <span style={{ color: "orange" }}>{handleNumber(infoModal?.info?.basePrice)}</span>
              </div>
            </div>
          )}
        </div>
        <div className="d-flex">
          <Checkbox
            checked={checked1}
            onChange={handleChange1}
            inputProps={{ "aria-label": "controlled" }}
            style={{ marginBottom: 10 }}
          />
          <div className="alert alert-primary">
            اینجانب ضمن آگاهی و پذیرش کلیه قوانین ومقررات بازار سرمایه از جمله
            دستورالعمل و پایاپای معاملات بورس کالای ایران,اختیار طی کلیه مراحل و
            تشریفات قبل , حین و بعد از معامله را در حدود قوانین و مقررات به شرکت
            کار گزاری اعطا نمودم
          </div>
        </div>
        <div className="d-flex justify-content-end mt-5 mr-5">
          <div
            onClick={!loading ? checkFillDataInsert : null}
            className={classes.btnGreen}
          >
            {loading ? (
              <CircularProgress
                style={{ fontSize: 20, width: 30, height: 30 }}
              />
            ) : (
              "تایید"
            )}
          </div>
          <div className={classes.btnRed} onClick={handleClose}>
            لغو
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
