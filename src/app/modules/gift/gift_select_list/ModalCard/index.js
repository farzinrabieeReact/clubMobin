import React, { useState } from "react";
import ModalCustom from "../../../../common/components/ModalCustom";
import CloseIcon from "@material-ui/icons/Close";
import { makeStyles } from "@material-ui/core";
import ModelInsert from "./ModalInsert";
import { useDispatch, useSelector } from "react-redux";
import { actionTypes as actionTypesNotif } from "../../../../../redux/notificationAlert";

let useStyles = makeStyles({
  root: {
    width: 700,
    maxWidth: "100%",
    padding: 20
  },
  Line: {
    backgroundColor: "#ff5f00"
  },
  images: {
    width: 150
  },
  grid: {
    maxHeight: 400,
    minHeight: 200,

    overflow: "auto"
  }
});

export default function Index({ data, open, setopen, handleCloseModal,handleFinishGift,setOpen,Open }) {
  return (
    <ModalCustom open={open} setOpen={setopen}>
      <Card data={data} setopen={setopen} handleCloseModal={handleCloseModal} handleFinishGift={handleFinishGift} setOpen={setOpen} Open={Open}  />
    </ModalCustom>
  );
}

const handleCapacity = num => {
  if (num < 10 && num > 0) {
    return <p style={{ color: "red" }}>{`تنها ${num}  عدد باقیست`}</p>;
  } else if (num === 0) {
    return <p style={{ color: "red" }}>ناموجود</p>;
  } else {
    return null;
  }
};

function Card({ data, setopen, handleCloseModal,handleFinishGift,setOpen,Open }) {
  let classes = useStyles();
  const dispatch = useDispatch();

  
 

  // const handleFinishGift = required_bonus => {
  //   if (auth.user === undefined) {
  //     dispatch({
  //       type: actionTypesNotif.warning,
  //       textAlert: "برای انجام این عملیات باید لاگین کنید"
  //     });
  //     return;
  //   }
  //   if (data.body.remained_capacity <= 0) {
  //     dispatch({
  //       type: actionTypesNotif.warning,
  //       textAlert: "جایزه موجود نمی باشد"
  //     });
  //     return;
  //   }
  //   if (auth.user.member_available_bonus < required_bonus) {
  //     dispatch({
  //       type: actionTypesNotif.warning,
  //       textAlert: "امتیاز شما کافی نمی باشد"
  //     });
  //     return;
  //   }
  //   setOpen(prev => !prev);
  // };

  return (
    <div className={`${classes["root"]} bg-white shadow p-10`}>
      <div className={"d-flex justify-content-between align-items-center"}>
        <p>{data.body.title}</p>
        <CloseIcon
          onClick={() => setopen(false)}
          className={"cursor-pointer"}
        />
      </div>
      <hr className={classes["Line"]} />
      <div className={classes["grid"]}>
        <div className={"d-flex justify-content-between align-items-center"}>
          <div className={classes["images"]}>
            <img
              className={"w-100"}
              src={`data:image/png;base64,${data.body.image}`}
              alt=""
            />
          </div>
          <div className={"min-w-50 mt-5 text-center"}>
            <p>
              <span>امتیاز</span>:<span>{data.body.required_bonus}</span>
            </p>
            <p>{data.body.name}</p>
            {handleCapacity(data.body.remained_capacity)}
          </div>
        </div>
        <div className={"mt-5"}>
          <p
            dangerouslySetInnerHTML={{ __html: data.body.detailed_description }}
          ></p>
        </div>
      </div>
      <hr className={classes["Line"]} />
      <div className={"d-flex justify-content-between align-items-center"}>
        <button
          type="button"
          className="btn backGroundOrangeOutLine"
          onClick={() => setopen(false)}
        >
          انصراف
        </button>
        {/* <button
          type="button"
          className="btn"
          style={{ backgroundColor: "#ff5f00", color: "white" }}
          onClick={() => handleFinishGift(data.body.required_bonus)}
        >
          ثبت نهایی
        </button> */}
      </div>
      {/* {Open && (
        <ModelInsert
          data={data}
          Open={Open}
          setOpen={setOpen}
          handleCloseModal={handleCloseModal}
        />
      )} */}
    </div>
  );
}
