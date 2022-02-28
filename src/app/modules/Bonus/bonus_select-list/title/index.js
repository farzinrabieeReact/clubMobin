import { makeStyles, Tooltip } from "@material-ui/core";
import { DateRange } from "@material-ui/icons";
import React from "react";
import FilterItem from "./filter";

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
    // height: 70,
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

  parentHeader: {
    // height: "300px",
    ["@media (min-width:992px)"]: {
      // eslint-disable-line no-useless-computed-key
      height:"unset"
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
    // marginLeft: 15,
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
    height: 0
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
      height: 0
    },
    "100%": {
      visibility: "visibale",
      opacity: 1,
      height: 50
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

const Title = ({
  flagFilter,
  setflagFilter,
  stateFilter,
  setstateFilter,
  handelChangeDate,
  submit,
}) => {
  const classes = useStyle();

  const handleFilter = () => {
    setflagFilter((prev) => !prev);
  };

  return (
    <div className={`p-5 d-flex justify-content-between ${classes.parentHeader} `}>
      <p style={{whiteSpace : "nowrap"}} className="h3">امتیازات شما</p>

      <div className="d-flex align-items-center">
        <div className={!flagFilter ? classes.anime : classes.animatedItem}>
          <FilterItem
            handelChangeDate={handelChangeDate}
            stateFilter={stateFilter}
            submit={submit}
            setstateFilter={setstateFilter}
            setflagFilter={setflagFilter}
          //   setPagnation={setPagnation}
          />
        </div>
        <Tooltip title="فیلتر تاریخ" placement="bottom">
          <DateRange
            size={"normal"}
            className={classes["menuIcon"]}
            onClick={() => handleFilter()}
          />
        </Tooltip>
      </div>
    </div>
  );
};

export default Title;
