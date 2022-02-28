import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  list: {
    listStyle: "none",
    textAlign: "center",
    minWidth: "80%",
    padding: "0 !important",
    maxWidth: "400px",

    "& > li": {
      height: 40,
      display: "flex",
      alignItems: "center",
      padding: " 0px 10px",
      borderRadius: 8,
      marginBottom: 3,

      "&:hover": {
        backgroundColor: "#ff5f00",
        color: "white",
        opacity: 0.8,
        cursor: "pointer"
      }
    }
  },
  active: {
    backgroundColor: "#ff5f00",
    color: "white"
  }
}));

export default function Index({
  data,
  defaultSelectItem,
  setDefaultSelectItems
}) {
  const classes = useStyles();

  useEffect(() => {
    // console.log('data' , data);
    // console.log('defaultSelectItem.category ' , defaultSelectItem.category );
    // console.log('defaultSelectItem.index ' , defaultSelectItem.index );

    // set defalue value index 0
    if (
      !defaultSelectItem.index &&
      !defaultSelectItem.category &&
      data.length > 0
    ) {
      console.log("data[0]-------------->", data[0]);
      setDefaultSelectItems({ index: 0, category: data[0] });
    }
  }, [data, defaultSelectItem]); //eslint-disable-line react-hooks/exhaustive-deps

  return (
    <ul className={classes["list"]}>
      {data.map((category, index) => {
        return (
          <li
            key={index}
            className={
              defaultSelectItem.index === index ? classes["active"] : " "
            }
            onClick={() =>
              setDefaultSelectItems({ index: index, category: category })
            }
          >
            {category}
          </li>
        );
      })}
    </ul>
  );
}
