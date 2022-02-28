import React, { useState } from "react";
import { makeStyles } from "@material-ui/core";
import ModalCard from "../../ModalCard";
import { actionTypes as actionTypesNotif } from "../../../../../../redux/notificationAlert";
import { useDispatch, useSelector } from "react-redux";
import ModelInsert from "../../ModalCard/ModalInsert";

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
  desc: {
    color: "#ff5f00",
    cursor: "pointer",
    marginLeft: 5
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
  }
});

export default function Index({ data, dataSort }) {
  let classes = useStyles();
  const [open, setopen] = useState(false);
  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const [Open, setOpen] = useState(false);

  const handleCloseModal = () => setopen(false);
  const handleOpen = () => {
    setopen(true);
  };
  const handleFinishGift = (e, required_bonus) => {
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
    setOpen(true);
  };
  return (
    <div className={`${classes["root"]} shadow mb-8 rounded `}>
      <div onClick={() => handleOpen()} className={classes.parentImg}>
        <div className={`${classes["images"]}  `}>
          {data?.body?.image === "" ? (
            <img
              src={"/media/img/defaultGift.jpg"}
              alt=""
              className="img-fluid"
            />
          ) : (
            <img
              src={`data:image/png;base64,${data.body.image}`}
              alt=""
              className="img-fluid"
            />
          )}
        </div>
        <div className={"p-3"}>
          <div className={"d-flex align-itmes-center flex-wrap flex-column"}>
            <p className={classes.fontMedia}>{data.body.name}</p>
            <p>
              <span className="font-weight-bolder">امتیاز</span>:
              <span className="font-weight-bolder">
                {data.body.required_bonus}
              </span>
            </p>
          </div>
          <hr />
          <div className="d-flex justify-content-end">
            <p className="d-flex justify-content-between">
              {/* <span>{data.body.description}</span> */}
              {/* <span
              className={classes["desc"]}
              onClick={() => setopen(prev => !prev)}
            >
              توضیحات بیشتر
            </span> */}
              <button
                type="button"
                className="btn backGroundOrangeOutLine"
                // style={{ backgroundColor: "#ff5f00", color: "white" }}
                onClick={e => handleFinishGift(e, data.body.required_bonus)}
              >
                انتخاب
              </button>
            </p>
          </div>
        </div>
      </div>
      <ModalCard
        open={open}
        setopen={setopen}
        Open={Open}
        data={data}
        setOpen={setOpen}
        handleCloseModal={handleCloseModal}
        handleFinishGift={handleFinishGift}
      />
      {Open && (
        <ModelInsert
          data={data}
          Open={Open}
          setOpen={setOpen}
          handleCloseModal={handleCloseModal}
        />
      )}
    </div>
  );
}
