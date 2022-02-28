/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid,jsx-a11y/img-redundant-alt */
import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { actionTypes } from "../../../../redux/about/feedback/feedback_select_list";
import { actionTypes as actionTypesChatBody } from "../../../../redux/about/feedback/feedback_select_chat_body";
import CardNoData from "../../../common/components/cardNoData";
import Styles from "./index.module.css";
import ModalDetails from "./modalDetails/ModalDetails";
import { dateConvertMiladiToShamsi } from "../../../common/method/date";
import { feedbackInsert } from "../../../../redux/about/feedback/feedback_insert";
import {
  handleNotificationAlertCatch,
  handleNotificationAlertTryUpdate
} from "../../../common/method/handleNotificationAlert";
import { Tooltip } from "@material-ui/core";

export default function AdvanceTablesWidget4({
  className,

  flagApi
}) {
  let dispatch = useDispatch();

  const reducerFeedback = useSelector(state => state.reducerFeedbackSelectList);
  console.log("resuusssss", reducerFeedback);
  const chatReducer = useSelector(state => state.feedBack_Select_ChatBody);
  const [stateModal, setStateModal] = useState([]);
  const [state, setstate] = useState([]);
  const [stateChat, setstateChat] = useState({
    feedback: "",
    ticket_id: ""
  });
  const [stateIndex, setstateIndex] = useState();
  const [newButton, setNewButton] = useState(false);
  useEffect(() => {
    apiCall();
  }, [flagApi]); //eslint-disable-line react-hooks/exhaustive-deps
  const apiCall = key => {
    let data = {
      after_key: key ? key : null
      // from: pagnation.nember,
    };
    dispatch({ type: actionTypes.feedbackAsync, payload: data });
  };

  useEffect(() => {
    if (reducerFeedback.data) setstate(reducerFeedback.data);
  }, [reducerFeedback.data]);

  const handleClickField = (e, item, index) => {
    setstateIndex(reducerFeedback.data[index]);
    setNewButton(true);
    let data = {
      data: {
        ticket_id: item.body.ticket_id
      }
    };
    dispatch({ type: actionTypesChatBody.selectChatBodyAsync, payload: data });
    setstateChat(prevState => {
      return { ...prevState, ticket_id: item.body.ticket_id };
    });
  };
  const handleClickMore = () => {
    apiCall(reducerFeedback.after_key);
  };
  const apiFeedbackInsert = () => {
    // if (state) {
    let ticket = {
      data: {
        ticket_id: stateChat.ticket_id
      }
    };
    let data = {
      feedback: stateChat.feedback,
      ticket_id: stateChat.ticket_id
    };

    feedbackInsert(data)
      .then(res => {
        let isok = handleNotificationAlertTryUpdate(res);
        if (!isok) {
          return;
        }
        setTimeout(() => {
          dispatch({
            type: actionTypesChatBody.selectChatBodyAsync,
            payload: ticket
          });
        }, 1000);
        setTimeout(() => {
          let data = {
            after_key: null
            // from: pagnation.nember,
          };
          dispatch({ type: actionTypes.feedbackAsync2, payload: data });
        }, 2000);
      })
      .catch(() => {
        handleNotificationAlertCatch();
      });
  };

  return (
    <div className={`card card-custom ${className} mt-5  shadow rounded-lg`}>
      <div className="card-body pt-0 pb-3">
        <div className="tab-content">
          <div className="table-responsive">
            <table className="table   table-borderless table-vertical-center">
              <thead style={{ borderBottom: "1px solid #ff5f00" }}>
                <tr className="text-center text-uppercase">
                  <th style={{ minWidth: "200px" }}>
                    <span className={Styles.HeaderText}>عنوان پیام</span>
                  </th>
                  <th
                    className={Styles.HeaderText}
                    style={{ minWidth: "200px" }}
                  >
                    <span className={Styles.HeaderText}>متن پیام</span>
                  </th>
                  <th
                    className={Styles.HeaderText}
                    style={{ minWidth: "200px" }}
                  >
                    <span className={Styles.HeaderText}>کد پیگیری</span>
                  </th>
                  <th
                    className={Styles.HeaderText}
                    style={{ minWidth: "200px" }}
                  >
                    <span className={Styles.HeaderText}>تاریخ ارسال</span>
                  </th>
                  {/*<th*/}
                  {/*  className={Styles.HeaderText}*/}
                  {/*  style={{ minWidth: "200px" }}*/}
                  {/*>*/}
                  {/*  <span className={Styles.HeaderText}> وضیعت</span>*/}
                  {/*</th>*/}
                </tr>
              </thead>
              <tbody>
                {!state.length && (
                  <tr>
                    <td colSpan={5}>
                      <CardNoData />
                    </td>
                  </tr>
                )}
                {state.map((item, index) => {
                  return (
                    <Tooltip
                      title={"باز گردن پیام"}
                      placement="bottom-start"
                      arrow
                    >
                      <tr
                        key={index}
                        onClick={e => handleClickField(e, item, index)}
                        className={Styles.TrTable}
                      >
                        <td className={"text-center "}>
                          <div className="d-flex">
                            {item.body.unseen !== 0 ? (
                              <div style={{ width: "45%" }}>
                                <span className={Styles.notPm}>
                                  {item.body.unseen}
                                </span>
                              </div>
                            ) : (
                              <div style={{ width: "45%" }}></div>
                            )}
                            <div>
                              <span>
                                {item?.body?.feedback_title
                                  ? item?.body?.feedback_title
                                  : "-"}
                              </span>
                            </div>
                          </div>
                          {/* <span className="text-muted font-weight-bold">
                                        13:19
                                        </span> */}
                        </td>
                        <td
                          className={
                            "text-center d-flex justify-content-center align-items-center "
                          }
                          style={{ height: "71px" }}
                        >
                          <span className={Styles.FieldRow}>
                            {item?.body.last_feedback
                              ? item?.body.last_feedback
                              : "-"}
                          </span>
                          {/* <span className="text-muted font-weight-bold">
                                            Paid
                                        </span> */}
                        </td>
                        <td className="pl-0 py-8">
                          <div className="d-flex align-items-center text-center">
                            <div className={"text-center w-100"}>
                              <span className={"d-block"}>
                                {item.body.ticket_id
                                  ? item.body.ticket_id
                                  : "-"}
                              </span>
                              <span className="text-muted font-weight-bold"></span>
                            </div>
                          </div>
                        </td>
                        <td className={"text-center"}>
                          <span className={"d-block"}>
                            {item?.body.last_update
                              ? dateConvertMiladiToShamsi(
                                  item?.body.last_update?.split(" ")[0]
                                )
                              : "-"}
                          </span>
                          {/* <span className="text-muted font-weight-bold">
                                        13:19
                                        </span> */}
                        </td>
                        {/*<td className="pr-0 text-center d-flex justify-content-center align-items-center">*/}
                        {/*  /!*<ButtonQuestions data={itemfeedback} />*!/*/}
                        {/*  {item?.status === "ANSWERED" ? (*/}
                        {/*    <span className={Styles.btnAnswer}>*/}
                        {/*      پاسخ داده شده*/}
                        {/*    </span>*/}
                        {/*  ) : (*/}
                        {/*    <span className={Styles.btnRegister}>ثبت شده</span>*/}
                        {/*  )}*/}
                        {/*</td>*/}
                      </tr>
                    </Tooltip>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {/*<div*/}
      {/*  className={"m-5 d-flex w-100 justify-content-center align-items-center"}*/}
      {/*>*/}
      {/*  <span*/}
      {/*    className="btn btn-warning"*/}
      {/*    style={{ background: "#FFC107", border: "0" }}*/}
      {/*    onClick={handleClickMore}*/}
      {/*  >*/}
      {/*    موارد بیشتر...*/}
      {/*  </span>*/}
      {/*</div>*/}
      {newButton && (
        <ModalDetails
          stateModal={stateModal}
          setStateModal={setStateModal}
          apiFeedbackInsert={apiFeedbackInsert}
          stateChat={stateChat}
          setstateChat={setstateChat}
          stateIndex={stateIndex}
          setNewButton={setNewButton}
          newButton={newButton}
          chatReducer={chatReducer}
        />
      )}
    </div>
  );
}
