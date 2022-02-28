import React, { useState } from "react";
import { makeStyles } from "@material-ui/core";
import ModalCard from "../../ModalCard";
import ModelInsert from "../../ModalCard/ModalInsert";
import { actionTypes as actionTypesNotif } from "../../../../../../redux/notificationAlert";
import { useDispatch, useSelector } from "react-redux";

let useStyles = makeStyles({
  root: {
    maxWidth: 300,
    minWidth: 260,
    height: 345,
    margin: "unset auto",
    ["@media (max-width:768px)"]: {
      // eslint-disable-line no-useless-computed-key
      margin: "10px auto !important"
    },
    ["@media (min-width:1750px)"]: {
      // eslint-disable-line no-useless-computed-key
      minWidth: 270
    },
    ["@media (min-width:992px) and (max-width:1198px)"]: {
      // eslint-disable-line no-useless-computed-key
      margin: "10px auto !important",
      maxWidth: 240,
      minWidth: 240
    },

    ["@media (min-width:1200px) and (max-width:1400px)"]: {
      // eslint-disable-line no-useless-computed-key
      margin: "10px auto !important",
      maxWidth: 300,
      minWidth: 300
    },
    ["@media (min-width:1450px) and (max-width:1550px)"]: {
      // eslint-disable-line no-useless-computed-key

      maxWidth: 240,
      minWidth: 240
    }
  },
  parentImg: {
    width: 260,
    ["@media (min-width:1200px) and (max-width:1400px)"]: {
      // eslint-disable-line no-useless-computed-key
      width: 300
    },

    ["@media (min-width:992px) and (max-width:1198px)"]: {
      // eslint-disable-line no-useless-computed-key
      width: 240
    },
    ["@media (min-width:1750px)"]: {
      // eslint-disable-line no-useless-computed-key
      width: 270
    },
    ["@media (min-width:1450px) and (max-width:1550px)"]: {
      // eslint-disable-line no-useless-computed-key

      width: 240
    }
  },
  images: {
    textAlign: "center",
    paddingTop: "10px",
    width: 260,
    ["@media (min-width:1200px) and (max-width:1400px)"]: {
      // eslint-disable-line no-useless-computed-key
      width: 300
    },

    ["@media (min-width:992px) and (max-width:1198px)"]: {
      // eslint-disable-line no-useless-computed-key
      width: 240
    },
    ["@media (min-width:1450px) and (max-width:1550px)"]: {
      // eslint-disable-line no-useless-computed-key

      width: 240
    },
    ["@media (min-width:1750px)"]: {
      // eslint-disable-line no-useless-computed-key
      width: 270
    },
    "& > img": {
      height: 180,
      maxWidth: "95%"
    }
  },
  fontMedia: {
    fontSize: 12,
    whiteSpace: "nowrap",
    overflow: "hidden",
    width: "100%",
    textOverflow: "ellipsis",
    ["@media (max-width:576px)"]: {
      // eslint-disable-line no-useless-computed-key
      fontSize: 9
    }
  },
  desc: {
    color: "#ff5f00",
    cursor: "pointer",
    marginLeft: 5
  }
});

export default function Index({ data }) {
  const auth = useSelector(state => state.auth);
  let classes = useStyles();
  const dispatch = useDispatch();
  const [open, setopen] = useState(false);
  const [openSlide, setOpenSilde] = useState(false);
  const handleOpen = () => {
    setopen(true);
  };
  const handleFinsihGift = (e, required_bonus) => {
    e.stopPropagation();
    if (auth.user === undefined) {
      dispatch({
        type: actionTypesNotif.warning,
        textAlert: "برای انجام این عملیات باید لاگین کنید"
      });
      return;
    }
    if (data.body.remained_capacity <= 0) {
      dispatch({
        type: actionTypesNotif.warning,
        textAlert: "جایزه موجود نمی باشد"
      });
      return;
    }
    if (auth.user.member_available_bonus < required_bonus) {
      dispatch({
        type: actionTypesNotif.warning,
        textAlert: "امتیاز شما کافی نمی باشد"
      });
      return;
    }
    setOpenSilde(true);
  };
  return (
    <div className={`${classes["root"]} shadow mb-8  rounded`}>
      <div onClick={() => handleOpen()} className={classes.parentImg}>
        <div className={`${classes["images"]}  `}>
          {data?.body?.image === "" ? (
            <img src={"/media/img/defaultGift.jpg"} alt="" />
          ) : (
            <img src={`data:image/png;base64,${data.body.image}`} alt="" />
          )}
        </div>
        <div className={"p-3"}>
          <div
            className={
              "d-flex justify-content-between align-items-center flex-wrap"
            }
          >
            <p className={classes.fontMedia}>{data.body.name}</p>
            <p>
              <span>امتیاز</span>:<span>{data.body.required_bonus}</span>
            </p>
          </div>
          <hr />
          <div>
            <p className="d-flex justify-content-between">
              <span>{data.body.description}</span>
              {/*<span*/}
              {/*  className={classes["desc"]}*/}
              {/*  onClick={e => handleFinsihGift(e)}*/}
              {/*>*/}
              {/*  توضیحات بیشتر*/}
              {/*</span>*/}
              <button
                type="button"
                className="btn backGroundOrangeOutLine"
                // style={{ backgroundColor: "#ff5f00", color: "white" }}
                onClick={e => handleFinsihGift(e, data?.body?.required_bonus)}
              >
                انتخاب
              </button>
            </p>
          </div>
        </div>
      </div>
      <ModalCard open={open} setopen={setopen} data={data} />
      {openSlide && (
        <ModelInsert data={data} open={openSlide} setopen={setOpenSilde} />
      )}
    </div>
  );
}
