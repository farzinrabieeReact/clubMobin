import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  actionTypes,
  telegramLinks_Select_reducer
} from "../../../../../redux/static/telegramLinks/telegram_links_select";
import { Telegram } from "@material-ui/icons";
import { makeStyles } from "@material-ui/styles";
const useStyles = makeStyles({
  card: {
    "&:hover": {
      background: "rgba(255,95,0,0.29)"
    }
  }
});
const TelegramLink = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const stateReducer = useSelector(state => state.telegramLinks_Select_reducer);
  const [state, setState] = useState();
  console.log("stateeee", state);

  useEffect(() => {
    if (stateReducer.data.length !== 0) {
      setState(JSON.parse(stateReducer.data[0]?.body.content));
    }
  }, [stateReducer]);
  useEffect(() => {
    dispatch({ type: actionTypes.telegramLinksAsync });
  }, []);
  return (
    <>
      <>
        <div className="row">
          {state?.map((itm, ind) => (
            <div className="col-4">
              <a href={itm.link} target="_blank">
                <div
                  className={`d-flex justify-content-center align-items-center flex-column mb-4 ${classes.card}`}
                  style={{ borderRadius: "10px ", border: "1px solid #ff5f00" }}
                >
                  <div className="mt-5">
                    <span
                      className="mb-4 font-weight-bolder font-size-h5"
                      style={{
                        color: "#ff5f00",
                        padding: "10px 20px",
                        borderRadius: "7px"
                      }}
                    >
                      <Telegram />
                      {itm.title}
                    </span>
                  </div>
                  <div className=" p-3">
                    <span
                      className="font-weight-bolder"
                      style={{ color: "#ff5f00" }}
                    >
                      <span style={{ color: "black" }}>
                        <span style={{ color: "black" }}>{`${itm.link}`}</span>
                      </span>
                    </span>
                  </div>
                </div>
              </a>
            </div>
          ))}
        </div>
      </>
    </>
  );
};

export default TelegramLink;
