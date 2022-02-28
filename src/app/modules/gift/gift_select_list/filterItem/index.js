import { Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React from "react";
import { Search, Close } from "@material-ui/icons";

const useStyles = makeStyles(() => ({
  head: {
    height: 60,
    display: "flex",
    width: "100%",

    justifyContent: "center",
    alignItems: "center",
    ["@media (max-width:576px)"]: {
      // eslint-disable-line no-useless-computed-key
      width: 150,
      marginLeft: 20,
    },
  },
  textField: {
    width: 200,
    height: 30,
    marginRight: 10,
    borderRadius: 4,
    outline: 0,
    border: "0.5px solid grey",
    boxShadow:
      "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px",
    ["@media (max-width:576px)"]: {
      // eslint-disable-line no-useless-computed-key
      width: 120,
      height: 30,
    },
    "&:focus": {
      outline: 0,
    },
    "&::placeholder": {
      color: "gray",
    },
  },

  btn: {
    width:28,
    height:28,
    color: "rgb(100,165,28)",
    backgroundColor: "white",
    borderRadius: 3,
    margin: "0 5px",
    fontSize: 28,
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    boxShadow:
      "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px",
    "&:hover": {
      color: "white",
      backgroundColor: "rgb(100,165,28)",
    },
    "@media(maxWidth: 576px)": {
      padding: 0,
    },
  },
  btn2: {
    width:28,
    height:28,
    color: "#fe534a",
    backgroundColor: "white",
    borderRadius: 3,
    marginRight: 5,
    boxShadow:
      "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px",
    fontSize: 28,
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    "&:hover": {
      color: "white",
      backgroundColor: "#fe534a",
    },
    "@media(maxWidth: 576px)": {
      padding: 0,
    },
  },
}));

const Index = ({
  handeleFilter,
  stateFilter,
  handleSubmitFilter,
  handleExit,
}) => {
  const classes = useStyles();

  return (
    <>
      <>
        <div className={classes.head}>
          <Box>
            <input
              id="outlined-basic"
              variant="outlined"
              placeholder="نام جایزه"
              value={stateFilter.name}
              className={classes.textField}
              onChange={(e) => handeleFilter(e.target.value, "name")}
            ></input>
          </Box>

          <div className={classes.btn}>
            <Search onClick={handleSubmitFilter} style={{fontSize:28}}/>
          </div>
          <div className={classes.btn2}>
            <Close onClick={handleExit} style={{fontSize:28}}/>
          </div>
        </div>
      </>
    </>
  );
};

export default Index;
