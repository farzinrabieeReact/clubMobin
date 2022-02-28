import { makeStyles, Tooltip } from "@material-ui/core";
import { DateRange, Refresh } from "@material-ui/icons";
import React from "react";
import FilterItem from "../filter";

const useStyle = makeStyles(() => ({
  stickyPagination: {
    textAlign: "center",
    fontWeight: "bold",
    margin: "0px auto",
    padding: "5px 0",
    display: "flex",
    justifyContent: "center"
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
    "@media (max-width:780px)": {
      // eslint-disable-line no-useless-computed-key
      justifyContent: "flex-end"
    }
  },
  icons: {
    width: "80%",
    display: "flex",
    justifyContent: "flex-end"
  },
  menuIcon: {
    width: 29,
    height: 29,
    cursor: "pointer",
    marginRight: 10,
    marginLeft: 10,
    "@media (max-width:576px)": {
      // eslint-disable-line no-useless-computed-key
      width: 24,
      height: 24
    }
  },
  menuIcon2: {
    width: 30,
    height: 30,
    cursor: "pointer",
    marginRight: 15
  },
  btn: {
    border: "1px solid #ff5f00",
    backgroundColor: "white",
    color: "#ff5f00",
    marginTop: "auto",
    padding: "5px 8px",
    borderRadius: 8,
    width: "",
    "&:hover": {
      backgroundColor: "#ff5f00",
      color: "white"
    }
  },
  anime: {
    visibility: "hidden",
    opacity: 0,
    // backgroundColor:'red'
    transition: "all 0.5s"
  },

  animatedItem: {
    animation: `$myEffect 500ms `,
    display: "flex",
    alignItems: "center"
  },

  "@keyframes myEffect": {
    "0%": {
      visibility: "hidden",
      opacity: 0
    },
    "100%": {
      visibility: "visibale",
      opacity: 1
    }
  },

  "@keyframes myEffectExit": {
    "0%": {
      visibility: "hidden",
      opacity: 0
    },
    "100%": {
      visibility: "visibale",
      opacity: 1
    }
  },
  height50: {
    height: 50,

    "@media (max-width:767px)": {
      // eslint-disable-line no-useless-computed-key
      height: "auto"
    }
  }
}));

export default function Index({
  setflagSwich,
  flagSwich,
  generalInformation,
  PersonalInformation,
  stateTitleBtnPersonal,
  stateTitleBtnGeneral,
  setflagFilter,
  submit,
  handelChangeDate,
  flagFilter,
  setstateTitleBtnPersonal,
  setstateTitleBtnGeneral,
  handleRefresh
}) {
  const classes = useStyle();
  return (
    <>
      <div
        className={
          "d-flex flex-md-row flex-column justify-content-between align-items-center border-bottom pb-5"
        }
      >
        <div>
          <h3 className={"font-weight-bold"}>تابلوی اعلانات</h3>
        </div>

        <div>
          <button
            onClick={() => setflagSwich(generalInformation)}
            className={`btn 
                     ${
                       flagSwich === generalInformation
                         ? "btn-success"
                         : "btn-light"
                     }
                     m-3`}
          >
            {generalInformation}
          </button>
          <button
            onClick={() => setflagSwich(PersonalInformation)}
            className={`btn 
                     ${
                       flagSwich === PersonalInformation
                         ? "btn-success"
                         : "btn-light"
                     }
                     m-3`}
          >
            {PersonalInformation}
          </button>
        </div>
      </div>

      <div className="d-flex flex-column-reverse flex-md-row  justify-content-end align-items-end align-items-md-center ">
        <div className={`${classes.height50} mb-1`}>
          {flagFilter && (
            <div className={!flagFilter ? classes.anime : classes.animatedItem}>
              <FilterItem
                handelChangeDate={handelChangeDate}
                stateFilter={
                  flagSwich === generalInformation
                    ? stateTitleBtnGeneral
                    : stateTitleBtnPersonal
                }
                submit={submit}
                setstateFilter={
                  flagSwich === generalInformation
                    ? setstateTitleBtnGeneral
                    : setstateTitleBtnPersonal
                }
                setflagFilter={setflagFilter}
                handleRefresh={handleRefresh}
              />
            </div>
          )}
        </div>
        <div className="d-flex">
          <Tooltip title="فیلتر تاریخ" placement="bottom">
            <DateRange
              className={classes["menuIcon"]}
              onClick={() => setflagFilter(prev => !prev)}
            />
          </Tooltip>
          <Refresh className={classes["menuIcon"]} onClick={handleRefresh} />
        </div>
      </div>
    </>
  );
}
