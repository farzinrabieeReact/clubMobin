import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core";

let useStyles = makeStyles({
  root: {
    minWidth: 320,
    maxWidth: "100%",
    "& > div": {
      minWidth: 300,
      margin: "auto"
    }
  },
  tableDem: {
    color: "#64A51C"
    // backgroundColor: 'rgba(0,255,0,0.1)',
  },
  tableOf: {
    color: "#F86879"
    // backgroundColor: 'rgba(255,0,0,0.1)',
  }
});

export default function Index({ ls, isin }) {
  let classes = useStyles();

  let defaultData = [];
  const [state, setstate] = useState(defaultData);

  useEffect(() => {
    if (isin) {
      setstate(defaultData);
    }
  }, [isin]); //eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (ls) {
      setstate(ls);
    }
  }, [ls]); //eslint-disable-line react-hooks/exhaustive-deps

  let symbol = {
    I: "ممنوع",
    A: "مجاز",
    AG: "مجاز-محفوظ",
    AS: "ممنوع-مسدود",
    AR: "ممنوع-متوقف",
    IG: "ممنوع-مسدود",
    IS: "ممنوع-متوقف",
    IR: "ممنوع-محفوظ"
  };

  return (
    <div>
      <h3 className={"mb-5"}>اطلاعات نماد</h3>
      <div
        className={
          "w-100 d-flex flex-wrap justify-content-between align-items-center"
        }
      >
        <div
          className={`d-flex flex-wrap justify-content-between align-items-center w-50 ${classes["root"]} mb-5 mb-lg-0`}
        >
          <div
            className={
              "d-flex justify-content-between align-items-center w-50 bg-light px-5 pt-5 "
            }
          >
            <p>آخرین قیمت</p>
            <p>{state[20] ? state[20] : "-"}</p>
          </div>
          <div
            className={
              "d-flex justify-content-between align-items-center w-50  px-5 pt-5"
            }
          >
            <p>قیمت پایانی</p>
            <p>{state[26] ? state[26] : "-"}</p>
          </div>
          <div
            className={
              "d-flex justify-content-between align-items-center w-50  px-5 pt-5"
            }
          >
            <p>قیمت دیروز</p>
            <p>{state[21] ? state[21] : "-"}</p>
          </div>
          <div
            className={
              "d-flex justify-content-between align-items-center w-50 bg-light px-5 pt-5"
            }
          >
            <p>حجم معملات</p>
            <p>{state[27] ? state[27] : "-"}</p>
          </div>
          <div
            className={
              "d-flex justify-content-between align-items-center w-50 bg-light px-5 pt-5"
            }
          >
            <p>بیشترین - کمترین</p>
            <p>
              {state[22] ? state[22] : "-"}-{state[23] ? state[23] : "-"}
            </p>
          </div>
          <div
            className={
              "d-flex justify-content-between align-items-center w-50 px-5 pt-5"
            }
          >
            <p>ارزش معاملات</p>
            <p>{state[28] ? state[28] : "-"}</p>
          </div>
          <div
            className={
              "d-flex justify-content-between align-items-center w-50 px-5 pt-5"
            }
          >
            <p>حجم مبنا</p>
            <p>{state[24] ? state[24] : "-"}</p>
          </div>
          <div
            className={
              "d-flex justify-content-between align-items-center w-50 bg-light px-5 pt-5"
            }
          >
            <p>تعداد معاملات</p>
            <p>{state[29] ? state[29] : "-"}</p>
          </div>
          <div
            className={
              "d-flex justify-content-between align-items-center w-50 bg-light px-5 pt-5"
            }
          >
            <p>وضعیت</p>
            <p>{symbol[state[25]] ? symbol[state[25]] : "-"}</p>
          </div>
          <div
            className={
              "d-flex justify-content-between align-items-center w-50 px-5 pt-5"
            }
          ></div>
        </div>

        {/* //////////////////////////////////////////////////////////////////////////////////////////////////////// */}

        <div className="w-100 w-md-50 ">
          <div
            className={
              " d-flex justify-content-between align-items-center flex-wrap"
            }
          >
            <div className={"w-50"}>
              <h3>حقیقی</h3>
              <div
                className={
                  "d-flex justify-content-between align-items-center w-100 bg-light rounded-lg px-5 pt-5"
                }
              >
                <p>خرید</p>
                <p className={classes["tableDem"]}>
                  {state[30] ? state[30] : "-"}
                </p>
              </div>
              <div
                className={
                  "d-flex justify-content-between align-items-center w-100 px-5 pt-5"
                }
              >
                <p>تعداد</p>
                <p className={classes["tableDem"]}>
                  {state[31] ? state[31] : "-"}
                </p>
              </div>
              <div
                className={
                  "d-flex justify-content-between align-items-center w-100  bg-light rounded-lg px-5 pt-5"
                }
              >
                <p>فروش</p>
                <p className={classes["tableOf"]}>
                  {state[32] ? state[32] : "-"}
                </p>
              </div>
              <div
                className={
                  "d-flex justify-content-between align-items-center w-100 px-5 pt-5"
                }
              >
                <p>تعداد</p>
                <p className={classes["tableOf"]}>
                  {state[33] ? state[33] : "-"}
                </p>
              </div>
            </div>
            <div className={"w-50"}>
              <h3>حقوقی</h3>
              <div
                className={
                  "d-flex justify-content-between align-items-center w-100 bg-light rounded-lg px-5 pt-5"
                }
              >
                <p>خرید</p>
                <p className={classes["tableDem"]}>
                  {state[34] ? state[34] : "-"}
                </p>
              </div>
              <div
                className={
                  "d-flex justify-content-between align-items-center w-100 px-5 pt-5"
                }
              >
                <p>تعداد</p>
                <p className={classes["tableDem"]}>
                  {state[35] ? state[35] : "-"}
                </p>
              </div>
              <div
                className={
                  "d-flex justify-content-between align-items-center w-100  bg-light rounded-lg px-5 pt-5"
                }
              >
                <p>فروش</p>
                <p className={classes["tableOf"]}>
                  {state[36] ? state[36] : "-"}
                </p>
              </div>
              <div
                className={
                  "d-flex justify-content-between align-items-center w-100 px-5 pt-5"
                }
              >
                <p>تعداد</p>
                <p className={classes["tableOf"]}>
                  {state[37] ? state[37] : "-"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
