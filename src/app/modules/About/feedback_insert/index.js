import React, { useState } from "react";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import { makeStyles, TextField } from "@material-ui/core";
import { actionTypes } from "../../../../redux/notificationAlert";
import { actionTypes as actionTypesSelect } from "../../../../redux/about/feedback/feedback_select_list/index";
import { useDispatch } from "react-redux";
import LinearProgress from "@material-ui/core/LinearProgress";
import Styles from "../feedback_select_list/index.module.css";

import { feedbackInsert } from "../../../../redux/about/feedback/feedback_insert";
import {
  handleNotificationAlertTryUpdate,
  handleNotificationAlertCatch
} from "../../../../app/common/method/handleNotificationAlert";

const useStyles = makeStyles({
  Textarea: {
    minHeight: 200,
    resize: "none",
    border: "1px solid rgba(0,0,0,0.2)"
  }
});

export default function Index({ setFlagApi }) {
  let classes = useStyles();
  const [stateCode, setStateCode] = useState();
  const [state, setstate] = useState({
    feedback: "",
    title: ""
  });
  const [loading, setloading] = useState(false);
  const dispatch = useDispatch();

  const apiFeedbackInsert = () => {
    setloading(prev => !prev);

    if (state.title && state.feedback) {
      let data = {
        feedback: state.feedback,
        feedback_title: state.title
      };

      feedbackInsert(data)
        .then(res => {
          setStateCode(res.data.response.data.ticket_id);
          try {
            handleNotificationAlertTryUpdate(res);
          } catch {
            handleNotificationAlertCatch();
          }
          setTimeout(() => {
            let data = {
              after_key: null
              // from: pagnation.nember,
            };
            dispatch({ type: actionTypesSelect.feedbackAsync2, payload: data });
          }, 1000);
          setstate({
            feedback: "",
            title: ""
          });
          setloading(prev => !prev);
        })
        .catch(() => {
          setloading(prev => !prev);
        });
    } else {
      dispatch({
        type: actionTypes.info,
        textAlert: "لطفا فیلد های مورد نظر را وارد نمایید"
      });
      setloading(prev => !prev);
    }
  };
  const handelChange = (e, type) => {
    setstate(prevState => {
      return { ...prevState, [type]: e };
    });
  };

  return (
    <>
      {loading && <LinearProgress />}
      {/*<div className={"shadow rounded-lg p-10 bg-white"}>*/}
      {/*  <h3>ارتباط با ما</h3>*/}
      {/*  <hr className={`w-100`} />*/}
      {/*  <div className={`w-100`}>*/}
      {/*    <TextareaAutosize*/}
      {/*      rowsMax={10}*/}
      {/*      className={`${classes["Textarea"]} w-100 rounded-lg p-5`}*/}
      {/*      onChange={event => setstate(event.target.value)}*/}
      {/*      placeholder="متن خود را در حداکثر 1000 کاراکتر وارد نماید"*/}
      {/*      value={state}*/}
      {/*    />*/}
      {/*    <p className={"my-5"}>*/}
      {/*      از طریق این فرم می توانید هرگونه نظر، پیشنهاد و یا انتقاد خود را*/}
      {/*      پیرامون نحوه عملکرد مجموعه و یا کارکنان، جهت بررسی ارسال فرمایید،*/}
      {/*      روند پیگیری نیز در اطلاعات بیشتر جهت آگاهی در دسترس می باشد*/}
      {/*    </p>*/}
      {/*  </div>*/}
      {/*  <div className={"d-flex justify-content-between "}>*/}
      {/*    <ButtonMoreInformation />*/}
      {/*    <button*/}
      {/*      type="button"*/}
      {/*      className="btn btn-success"*/}
      {/*      onClick={() => apiFeedbackInsert()}*/}
      {/*    >*/}
      {/*      ارسال*/}
      {/*    </button>*/}
      {/*  </div>*/}
      {/*</div>*/}
      <div className={"shadow rounded-lg p-10 bg-white"}>
        <div className="row">
          <div className="col-12 col-md-6 mb-5 mb-md-0">
            <h3>ارتباط با ما</h3>

            <p>
              از طریق این فرم می توانید هرگونه نظر، پیشنهاد و یا انتقاد خود را
              پیرامون نحوه عملکرد مجموعه و یا کارکنان، جهت بررسی ارسال فرمایید،
              روند پیگیری نیز در اطلاعات بیشتر جهت آگاهی در دسترس می باشد
            </p>
            <div className="w-100 d-flex justify-content-center">
              <button
                className="btn btn-warning mt-md-20"
                style={{ background: "#FFC107", border: "0" }}
              >
                روند رسیدگی به شکایات
              </button>
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="px-10">
              <TextField
                className="shadow"
                label="عنوان"
                id="titleNewButton"
                value={state.title}
                variant="outlined"
                size="small"
                fullWidth
                margin="dense"
                onChange={event => {
                  handelChange(event.target.value, "title");
                }}
              />
              <TextareaAutosize
                className="shadow"
                aria-label="minimum height"
                rowsMin={10}
                value={state.feedback}
                placeholder="پیام خود را بنویسید"
                style={{
                  width: "100%",
                  padding: "10px",
                  border: "1px solid rgb(199 193 193)",
                  borderRadius: "5px"
                }}
                onChange={event => {
                  handelChange(event.target.value, "feedback");
                }}
              />
              <div className="d-flex justify-content-between  mt-5">
                <p style={stateCode ? { color: "green" } : { color: "red" }}>
                  {" "}
                  {stateCode &&
                    `مورد اعلام شده جهت بررسی در سیستم ثبت شد کد پیگیری:${stateCode}`}
                </p>

                <div>
                  {" "}
                  <span
                    className={Styles.btnSend}
                    style={{ cursor: "pointer" }}
                    onClick={apiFeedbackInsert}
                  >
                    ارسال
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
