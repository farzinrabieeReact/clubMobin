import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  search: {
    //   maxWidth:350,
    minWidth: 350,
    minHeight: 50,
    display: "flex",
    alignItems: "center",
    borderRadius: 8,
    marginLeft: "auto",
    paddingRight: 10,
    justifyContent: "space-between",
    // ["@media (min-width:200px)"]: {
    //   // eslint-disable-line no-useless-computed-key
    //   minWidth: "200px"
    // },
    ["@media (max-width:576px)"]: {// eslint-disable-line no-useless-computed-key
      minWidth: "265px",

      padding: "0 !important"
    }
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

export default function Index({ faq_filter, faq_Select, state, setstate }) {
  const classes = useStyles();

  const handelSearch = () => {
    state ? faq_filter(state) : faq_Select();
  };

  return (
    <div className={"row"}>
      <div
        className={`${classes["search"]} input-group bg-gray-200 col-md-4 col-lg-3`}
      >
        <div className={classes["form"]}>
          <input
            type="search"
            id="form1"
            value={state}
            onChange={event => {
              setstate(event.target.value);
            }}
            className={`${classes["input"]} bg-gray-200`}
          />
          {/* <label className="form-label" for="form1">Search</label> */}
        </div>
        <button type="button" className="btn" onClick={() => handelSearch()}>
          <i className="fas fa-search"></i>
        </button>
      </div>
    </div>
  );
}
