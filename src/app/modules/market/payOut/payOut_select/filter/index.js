import { Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React, { useState } from "react";
import { Search, Close, DateRange, DeleteSweep } from "@material-ui/icons";
import DatePicker from "../../../../../common/components/DatePicker";
import { convertDigitToEnglish } from "../../../../../common/method/convertDigitToEnglish";
import { Tooltip, TextField } from "@material-ui/core";
import { actionTypesSelect } from "../../../../../../redux/market/payOut/payOut_select";
import { useDispatch } from "react-redux";

const useStyles = makeStyles(() => ({
  input: {
    width: 300,
    ["@media (max-width:576px)"]: {
      width: "95%",
      margin: "auto"
    }
  },

  head: {
    height: 50,
    display: "flex",
    flexWrap: "wrap",
    width: "100%",
    justifyContent: "center",
    alignItems: "end",
    ["@media (max-width:576px)"]: {
      // eslint-disable-line no-useless-computed-key
      height: "auto",
      width: "90%",
      margin: "0 auto"
    }
  },
  btn: {
    color: "rgb(100,165,28)",
    backgroundColor: "white",
    borderRadius: 3,
    marginRight: 5,
    margin: "0 5px",
    fontSize: 25,
    boxShadow:
      "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px",
    "&:hover": {
      color: "white",
      backgroundColor: "rgb(100,165,28)"
    }
  },
  btn2: {
    color: "#fe534a",
    backgroundColor: "white",
    borderRadius: 3,
    marginRight: 5,
    fontSize: 25,
    boxShadow:
      "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px",
    "&:hover": {
      color: "white",
      backgroundColor: "#fe534a"
    }
  },
  anime: {
    visibility: "hidden",
    height: 0,
    opacity: 0,
    // backgroundColor:'red'
    transition: "all 0.5s"
  },

  animatedItem: {
    animation: `$myEffect 500ms `,
    display: "flex",
    alignItems: "center",
    height: "auto"
  },
  menuIcon: {
    width: 29,
    height: 29,
    cursor: "pointer",

    fill: "black !important"
  },
  deleteIcon: {
    width: 29,
    height: 29,
    cursor: "pointer",
    marginRight: 15,
    fill: "#ff5f00 !important"
  },
  deleteIconDisable: {
    width: 29,
    height: 29,
    cursor: "pointer",
    marginRight: 15,
    fill: "black !important"
  },
  header: {
    display: "flex",
    justifyContent: "flex-start",
    flexDirection: "row-reverse",
    alignItems: "end",
    padding: "0px 15px",
    flexWrap: "wrap",
    backgroundColor: "#fff!important",
    borderRadius: "10px"
  },
  btns: {
    display: "flex",
    alignItems: "center",
    ["@media (max-width:576px)"]: {
      minWidth: 250,
      marginTop: 10
    }
  },
  filter: {
    display: "flex",
    justifyContent: "end",
    width: " 100%",
    marginBottom: 15
  },
  gridInputSreach: {
    width: "50%",
    paddingLeft: "14px",
    display: "flex",
    justifyContent: "flex-start",
    marginTop: 5
  }
}));

export default function Index({
  selectMultiRow,
  apiRemoveItems,
  setFilter,
  Filter
}) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [flagFilter, setflagFilter] = useState(true);

  const [stateFilter, setstateFilter] = useState({
    from_date: null,
    to_date: null,
    company_name: ""
  });

  const handleExit = () => {
    setflagFilter(false);
    setstateFilter({
      from_date: null,
      to_date: null
    });
    dispatch({
      type: actionTypesSelect.payOutSelectAsync,
      payload: {

      }
    });

  };

  const handelChangeDate = (data, type) => {
    let date = convertDigitToEnglish(data?.format("YYYY/MM/DD"));
    date = `${date} 00:00:00.000000`;
    setstateFilter(prev => ({
      ...prev,
      [type]: date
    }));
  };

  const apiSubmit = () => {
    let obj = {};

    Object.keys(stateFilter).forEach(element => {
      if (stateFilter[element] && !stateFilter[element].includes("undefined")) {
        obj[element] = stateFilter[element];
      }
    });

    dispatch({
      type: actionTypesSelect.payOutSelectAsync,
      payload: {
        data: { ...obj }
      }
    });
  };

  return (
    <>
      <div className={classes["header"]}>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "end",
            width: "50%"
          }}
        >
          <div className={classes["filter"]}>
            <Tooltip
              onClick={() => apiRemoveItems(selectMultiRow)}
              title={
                Object.keys(selectMultiRow).length > 0
                  ? "حذف موارد انتخاب شده"
                  : "موردی را انتخاب نکرده اید"
              }
              placement="bottom"
            >
              <div>
                {" "}
                <DeleteSweep
                  size={"normal"}
                  className={
                    Object.keys(selectMultiRow).length > 0
                      ? `${classes.deleteIcon}`
                      : `${classes.deleteIconDisable}`
                  }
                  disable
                />
              </div>
            </Tooltip>
            {/*{Object.keys(selectMultiRow).length <= 0 && (*/}
            {/*  <div style={{ height: 37.5 }}>*/}
            {/*    <DeleteSweep size={"normal"} className={classes.deleteIcon} />*/}
            {/*  </div>*/}
            {/*)}*/}
            {/*{Object.keys(selectMultiRow).length > 0 && (*/}
            {/*  <button*/}
            {/*    type="button"*/}
            {/*    className="btn btn-danger mx-5"*/}
            {/*    onClick={() => apiRemoveItems(selectMultiRow)}*/}
            {/*  >*/}
            {/*    حذف موارد انتخابی*/}
            {/*  </button>*/}
            {/*)}*/}
            <Tooltip title="فیلتر تاریخ" placement="bottom">
              <DateRange
                size={"normal"}
                className={classes["menuIcon"]}
                onClick={() => setflagFilter(prev => !prev)}
              />
            </Tooltip>
          </div>

          <div className={!flagFilter ? classes.anime : classes.animatedItem}>
            <>
              <div className={classes.head}>
                <Box width={250} className="me-md-3 me-1  align-items-center">
                  <DatePicker
                    label="از تاریخ"
                    value={
                      stateFilter.from_date?.includes("undefined")
                        ? null
                        : stateFilter.from_date
                    }
                    setValue={data => handelChangeDate(data, "from_date")}
                  />
                </Box>

                <Box
                  width={250}
                  className="me-1 me-md-3 d-flex align-items-center"
                >
                  <DatePicker
                    label="تا تاریخ"
                    value={stateFilter.to_date}
                    setValue={data => handelChangeDate(data, "to_date")}
                  />{" "}
                </Box>
                <div
                  className="d-flex mt-5 align-items-start align-items-sm-start"
                  className={classes["btns"]}
                >
                  <Search className={classes.btn} onClick={() => apiSubmit()} />
                  <Close
                    style={{}}
                    onClick={handleExit}
                    className={classes.btn2}
                  />
                </div>
              </div>
            </>
          </div>
        </div>
        <div className={classes["gridInputSreach"]}>
          <TextField
            className={`${classes["input"]} `}
            label="جستجو نماد"
            value={Filter}
            size="small"
            // fullWidth
            variant="outlined"
            // margin="dense"
            onChange={event => {
              setFilter(event.target.value);
            }}
          />
        </div>
      </div>
    </>
  );
}
