import React from "react";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    position: "relative",
    cursor: "pointer"
  },
  bg: {
    // width: 340,
    width: "100%",
    minHeight: 97,
    position: "absolute",
    backgroundColor: "rgba(0,0,0,0.4)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    borderRadius: 20,
    transform: "translate(-50% , -50%)",
    top: "50%",
    left: "50%",
    overflow: "hidden"
  }
});

export default function Index({ index, data, handelClick }) {
  const classes = useStyles();

  return (
    <div className={`${classes["root"]} m-5`} onClick={() => handelClick(data)}>
      <div className={classes["bg"]}>
        <h4>{data.body.category}</h4>
      </div>
      <img
        src={`/media/common/imagesPuplaer/${index <= 6 ? index : "2.png"}.png`}
        alt=""
        className="img-fluid"
      />
    </div>
  );
}
