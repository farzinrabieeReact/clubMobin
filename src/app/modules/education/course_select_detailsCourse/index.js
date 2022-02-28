import React, { useEffect, useRef, useState } from "react";
import CardActive from "./cardActive";
import CardRegsiter from "./cardRegsiter";
import { Button, makeStyles } from "@material-ui/core";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { actionTypes as actionTypesNotif } from "../../../../redux/notificationAlert";

const useStyles = makeStyles(theme => ({
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "60%",
    border: "none"
    //     [theme.breakpoints.up('md')]: {
    // width
    //
    // },
  },
  btns: {
    width: 50,
    backgroundColor: "transparent",
    whiteSpace: "nowrap"
  }
  // cardSher: {
  //   position: "absolute",
  //   bottom: 20
  // },
  // cardSher2: {
  //   position: "absolute",
  //   bottom: 20
  // }
}));

export default function Index() {
  const [state, setstate] = useState({ status: "", data: null });
  const dispatch = useDispatch();

  const inputRef = useRef();

  const classes = useStyles();
  let location = useLocation();

  useEffect(() => {
    if (location.state) {
      setstate({
        status: location.state.status,
        data: location.state.data
      });
    }
  }, [location]);

  // function
  const handleClick = elem => {
    var copyText = elem.current;

    /* Select the text field */
    copyText.select();
    copyText.setSelectionRange(0, 99999); /* For mobile devices */

    /* Copy the text inside the text field */
    document.execCommand("copy");
    dispatch({
      type: actionTypesNotif.success,
      textAlert: "متن کپی شد"
    });
  };

  return (
    <div className={"p-5"}>
      <div className="d-flex justify-content-between flex-column overflow-hidden">
        {state.status === "ActiveCourse" && <CardActive data={state.data} />}

        {state.status === "RegsterCourse" && <CardRegsiter data={state.data} />}
        <div className={`${classes["cardSher"]} d-non d-lg-flex w-100 mt-5`}>
          <input
            id="outlined-textarea"
            className={classes["textField"]}
            variant="outlined"
            value="https://club.mobinsb.com/Home/AllCourseProgram"
            ref={inputRef}
            onChange={() => {
              return null;
            }}
          />
          <Button
            variant="contained"
            className={classes["btns"]}
            onClick={() => handleClick(inputRef)}
          >
            اشتراک گذاری
          </Button>
        </div>
      </div>
      {/*<div className={` d-flex d-lg-none w-100 mt-5`}>*/}
      {/*  <input*/}
      {/*    id="outlined-textarea"*/}
      {/*    className={classes["textField"]}*/}
      {/*    variant="outlined"*/}
      {/*    value="https://club.mobinsb.com/Home/AllCourseProgram"*/}
      {/*    ref={inputRef}*/}
      {/*    onChange={() => {*/}
      {/*      return null;*/}
      {/*    }}*/}
      {/*  />*/}
      {/*  <Button*/}
      {/*    variant="contained"*/}
      {/*    className={classes["btns"]}*/}
      {/*    onClick={() => handleClick(inputRef)}*/}
      {/*  >*/}
      {/*    اشتراک گذاری*/}
      {/*  </Button>*/}
      {/*</div>*/}
    </div>
  );
}
