import React, { useState, useEffect } from "react";
import { dateConvertMiladiToShamsi } from "../../../common/method/date";
import { useDispatch, useSelector } from "react-redux";
import { useSubheader } from "../../../../_metronic/layout";
import Pagination from "./../../../common/components/pagination";
import { actionTypes } from "../../../../redux/gift/gift_select_order";
import CardNoData from "../../../common/components/cardNoData";
import { makeStyles } from "@material-ui/styles";
import Btn from "./Btn";
import { Button, LinearProgress, Tooltip } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { ArrowBack, DateRange } from "@material-ui/icons";
import FilterItem from "./filter";
import { handeFilterForDate } from "./../../../common/method/handeFilterForDate"

const useStyle = makeStyles(() => ({
  stickyPagination: {
    textAlign: "center",
    fontWeight: "bold",
    margin: "0px auto",
    padding: "5px 0",
    display: "flex",
    justifyContent: "center",
  },
  header: {
    width: "100%",
    height: 70,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    padding: "0 10px",
    boxShadow: "rgba(0, 0, 0, 0.15) 3px 3px 7px",
    borderRadius: "0 0 10px 10px",
    ["@media (max-width:780px)"]: {
      // eslint-disable-line no-useless-computed-key
      justifyContent: "flex-end",
    },
  },
  icons: {
    width: "80%",
    display: "flex",
    justifyContent: "flex-end",
  },
  menuIcon: {
    width: 29,
    height: 29,
    cursor: "pointer",
    marginLeft: 15,
  },
  menuIcon2: {
    width: 30,
    height: 30,
    cursor: "pointer",
    marginRight: 15,
  },
  btn: {
    border: "1px solid #64A51C",
    backgroundColor: "white",
    color: "#64A51C",
    marginTop: "auto",
    padding: "5px 8px",
    borderRadius: 8,
    width: "",
    "&:hover": {
      backgroundColor: "#64A51C",
      color: "white",
    },
  },
  anime: {
    visibility: "hidden",
    opacity: 0,
    // backgroundColor:'red'
    transition: "all 0.5s",



    
    display:"none"
  },

  animatedItem: {
    animation: `$myEffect 500ms `,
    display: "flex",
    alignItems: "center",
  },

  "@keyframes myEffect": {
    "0%": {
      visibility: "hidden",
      opacity: 0,
    },
    "100%": {
      visibility: "visibale",
      opacity: 1,
    },
  },

  "@keyframes myEffectExit": {
    "0%": {
      visibility: "hidden",
      opacity: 0,
    },
    "100%": {
      visibility: "visibale",
      opacity: 1,
    },
  },
}));

export default function AdvanceTablesWidget4() {
  let dispatch = useDispatch();
  const reducerOrder = useSelector((state) => state.reducerGiftSelectOrder);
  const [pagnation, setPagnation] = useState(1); //eslint-disable-line  no-unused-vars
  const [state, setstate] = useState([]);
  const [flagFilter, setflagFilter] = useState(false);
  const [flagApi, setflagApi] = useState(false)
  const suhbeader = useSubheader();
  const [infoBtn, setinfoBtn] = useState({
    ind: "",
    item: [],
    flag: false,
  });
  const [stateFilter, setstateFilter] = useState({
    registration_date_from: null,
    registration_date_to: null,
    status: ""
  });
  const { push } = useHistory();
  suhbeader.setTitle("لیست سفارشات");
  const classes = useStyle();

  const apiCall = () => {
    let obj = {};
    Object.keys(stateFilter).forEach((element) => {
      if (stateFilter[element]) {
        obj[element] = stateFilter[element];
      }
    });
    let data = {
      data: handeFilterForDate(
        obj,
        ["registration_date_from", "registration_date_to"],
        ["registration_date_to"]
      ),
      from: (pagnation - 1) * reducerOrder.size,
      size: reducerOrder.size,
    };
    dispatch({ type: actionTypes.giftSelectOrderAsync, payload: data });
  };

  useEffect(() => {
    apiCall();
  }, [flagApi, pagnation]); //eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (reducerOrder.data) setstate(reducerOrder.data);
  }, [reducerOrder.data]);

  const setValuePrimaryState = () => {
    setPagnation(1)
    setstateFilter({
      registration_date_from: null,
      registration_date_to: null,
      status: ""
    });
  }


  const findBonus = (key) => {
    if (key.length === 0 || key === "null" || key === null) return "در انتظار";
    if (key === "FREE") return "رایگان";
    if (key.length > 0) return "کسر شده";
  };

  const findStatus = (key) => {
    switch (key) {
      case "FINALIZED":
        return "تائید شده";
      case "REJECTED":
        return "لغو شده";
      case "SUBMITTED":
        return "در انتظار";
      default:
        break;
    }
  };

  const handleBtnFlag = (item, index) => {
    setinfoBtn({
      ind: index,
      item: item,
      flag: true,
    });
  };

  const handleBack = () => {
    push({
      pathname: "/gift",
    });
  };


  const handelChange = (data, type) => {
    setstateFilter((prev) => ({
      ...prev,
      [type]: data,
    }))
  }


  return (
    <>
      {reducerOrder.load && <LinearProgress />}
      <div className={`card card-custom shadow rounded-lg py-2`}>
        {/* Head */}
        <div className="d-flex flex-column-reverse flex-sm-row justify-content-sm-end justify-content-start">
          <div className={!flagFilter ? classes.anime : classes.animatedItem}>
            <FilterItem
              handelChange={handelChange}
              stateFilter={stateFilter}
              setflagFilter={setflagFilter}
              setValuePrimaryState={setValuePrimaryState}
              setflagApi={setflagApi}
              setPagnation={setPagnation}
            />
          </div>
          <div className="d-flex justify-content-end mt-4">
            <Tooltip title="فیلتر" placement="bottom">
              <DateRange
                size={"normal"}
                className={classes["menuIcon"]}
                onClick={() => setflagFilter(prev => !prev)}
              />
            </Tooltip>

            <Tooltip title="بازگشت" placement="bottom">
              <ArrowBack
                onClick={handleBack}
                className={`${classes["menuIcon2"]} me-2 me-md-4 ms-2 ms-md-4`}
              />
            </Tooltip>
          </div>
        </div>
        {/* <div className="card-header border-0 pb-5 pt-0 text-center w-100 justify-content-center">
          <h3 className="card-title ">لیست سفارشات</h3>
        </div> */}
        {/* Body */}
        <div className="card-body">
          <div className="tab-content">
            {state.length ? (
              <div className="table-responsive">
                <table className="table table-head-custom table-head-bg table-borderless table-vertical-center">
                  <thead>
                    <tr className="text-center text-uppercase">
                      <th style={{ minWidth: "70px" }}> ردیف</th>
                      <th style={{ minWidth: "70px" }}>نام و نام خانوادگی </th>
                      <th style={{ minWidth: "110px" }}>کد ملی</th>
                      <th style={{ minWidth: "70px" }}>نام جایزه </th>
                      <th style={{ minWidth: "70px" }}>تاریخ ثبت</th>
                      <th style={{ minWidth: "70px" }}>تاریخ پایان</th>
                      <th style={{ minWidth: "70px" }}>امتیاز جایزه</th>
                      <th style={{ minWidth: "70px" }}>امتیاز مورد نیاز</th>
                      <th style={{ minWidth: "70px" }}>وضعیت</th>
                      <th style={{ minWidth: "70px" }}>توضیحات</th>
                      <th style={{ minWidth: "70px" }}>کد رهگیری پستی</th>
                      <th style={{ minWidth: "70px" }}>ابزار</th>
                    </tr>
                  </thead>
                  <tbody>
                    {state.map((item, index) => {
                      return (
                        <tr key={index}>
                          <td className={"text-center"}>
                            {
                              pagnation === 1 ? index + 1 : ((pagnation - 1) * reducerOrder.size) + (index + 1)
                            }
                          </td>
                          <td className={"text-center"}>
                            <span className="text-dark-75 d-block font-size-lg">
                              {item.body.member_first_name}{" "}
                              {item.body.member_last_name}
                            </span>
                          </td>
                          <td className={"text-center"}>
                            <span className="text-dark-75 d-block font-size-lg">
                              {item.body.gift_name}
                            </span>
                          </td>
                          <td className={"text-center"}>
                            <span className="text-dark-75 d-block font-size-lg">
                              {item.body.member_national_id}
                            </span>
                          </td>
                          <td className={"text-center"}>
                            <span className="text-dark-75 d-block font-size-lg">
                              {dateConvertMiladiToShamsi(
                                item.body.registration_date.split(" ")[0]
                              )}
                            </span>
                          </td>
                          <td className={"text-center"}>
                            <span className="text-dark-75 d-block font-size-lg">
                              {dateConvertMiladiToShamsi(
                                item.body.closing_date.split(" ")[0]
                              )}
                            </span>
                          </td>
                          <td className="pr-0 text-center">
                            {findBonus(item.body.bonus_id)}
                          </td>
                          <td className="pr-0 text-center">
                            {item.body.gift_required_bonus}
                          </td>
                          <td className="pr-0 text-center">
                            {findStatus(item.body.status)}
                          </td>
                          <td className="pl-0 text-center">
                            {item.body.rejection_reason === "null"
                              ? "-"
                              : item.body.rejection_reason}
                          </td>
                          <td className="pl-0 text-center">
                            {item.body.postal_tracking_code === "null"
                              ? "-"
                              : item.body.postal_tracking_code}
                          </td>
                          <td className="pl-0 text-center">
                            {/* <Link onClick={()=>handleBtnFlag(item,index)} to={"/gift/infoGift"}>{"info"}</Link> */}
                            <Button
                              onClick={() => handleBtnFlag(item, index)}
                              variant="contained"
                              color="primary"
                              disabled={
                                item?.body?.gift_custom_data === "null" ||
                                  item?.body?.gift_custom_data === "[]"
                                  ? true
                                  : false
                              }
                            >
                              جزییات
                            </Button>
                            {infoBtn.ind === index && (
                              <Btn infoBtn={infoBtn} setinfoBtn={setinfoBtn} />
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            ) : (
                <CardNoData />
              )}
          </div>
        </div>
        {reducerOrder.total > reducerOrder.size ? (
          <div className={classes.stickyPagination}>
            <Pagination
              shape="rounded"
              variant="outlined"
              count={Math.ceil(reducerOrder.total / reducerOrder.size)}
              pagnation={pagnation}
              setPagnation={setPagnation}
            />
          </div>
        ) : null}

      </div>
    </>
  );
}
