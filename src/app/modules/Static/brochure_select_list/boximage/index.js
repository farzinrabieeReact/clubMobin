import React from "react";
import { Box, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  btn: {
    width: "150px",
    height: "30px",
    border: "1px solid black",
    background: "transparent",
    color: "black",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  titleImage: {
    color: "white",
  },
  tileBox:{
    margin : 30,
  },
}));

const BoxImage = ({ item }) => {
  const classes = useStyles();

  return (
    <>
      <Box className={classes.tileBox} style={{ width: "40%" }}>
        <a href={`${item.PdfUrl}`} download>
          <img
            src={item.Pic}
            className="img-fluid"
            alt={item.title}
            width={1000}
            height={1000}
          />
        </a>
      </Box>
    </>
  );
};

export default BoxImage;
