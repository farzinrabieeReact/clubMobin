import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import AccessTimeOutlinedIcon from "@material-ui/icons/AccessTimeOutlined";
import ImagesComplaintsProcess from "./imagesComplaintsProcess";

const useStyles = makeStyles(theme => ({
  root: {
    position: "relative"
  },
  dropdown: {
    position: "absolute",
    width: 250,
    top: 45,
    right: 0,
    left: 0,
    zIndex: 1,
    border: "1px solid",
    padding: theme.spacing(1),
    backgroundColor: theme.palette.background.paper,
    listStyle: "none",
    borderRadius: 5,
    paddingBottom: 15,
    "& > li": {
      marginTop: 10,
      height: 30,
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      "&:hover": {
        backgroundColor: "rgba(0,0,0,0.1)"
      }
    }
  }
}));

export default function ClickAway() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(prev => !prev);
  };

  const handleClickAway = () => {
    setOpen(false);
  };

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <div className={classes.root}>
        <button
          type="button"
          className="btn backGroundOrangeOutLine"
          onClick={handleClick}
        >
          <span className={"mr-2"}>
            <InfoOutlinedIcon />
          </span>
          <span>اطلاعات بیشتر</span>
        </button>
        {open ? (
          <ul className={classes.dropdown}>
            <li>
              <ImagesComplaintsProcess />
            </li>
            <li>
              <span className={"mr-2"}>
                <AccessTimeOutlinedIcon />
              </span>
              <span>دوره اطلاع رسانی در مورد فرایند پیگیری</span>
            </li>
          </ul>
        ) : null}
      </div>
    </ClickAwayListener>
  );
}
