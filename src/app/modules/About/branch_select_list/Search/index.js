import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  search: {
    //   maxWidth:350,

    width: "100%",
    minHeight: 50,
    display: "flex",
    alignItems: "center",
    borderRadius: 8,
    marginLeft: "auto",
    marginRight: "auto",
    paddingRight: 10,
    justifyContent: "space-between"
  },
  form: {
    width: "82%"
  },
  input: {
    width: "100%",
    height: 35,
    border: "none",
    outline: "none",
    paddingLeft: 5
  }
}));

export default function Index({
  stateSreach,
  setstateSreach,
  branch_Select,
  handelfilter,
  setPagnation
}) {
  const classes = useStyles();

  const handelSearch = () => {
    setPagnation(1);

    !stateSreach ? branch_Select() : handelfilter();
  };

  return (
    <div className={"row"}>
      <div
        className={`${classes["search"]} input-group bg-gray-200 col-md-6 col-lg-4`}
      >
        <div className={classes["form"]}>
          <input
            type="search"
            id="form1"
            placeholder={"جستجو آدرس"}
            value={stateSreach}
            onChange={event => {
              setstateSreach(event.target.value);
            }}
            className={`${classes["input"]} bg-gray-200`}
          />
          {/* <label className="form-label" for="form1">Search</label> */}
        </div>
        <button type="button" className="btn" style={{zIndex:"unset"}} onClick={() => handelSearch()}>
          <i className="fas fa-search"></i>
        </button>
      </div>
    </div>
  );
}
