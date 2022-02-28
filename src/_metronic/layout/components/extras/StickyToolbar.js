/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React, { useState } from "react";

import Notifications from "./components/Notifications";
import ScoreInfo from "./components/ScoreInfo";
import ScoreCurrent from "./components/ScoreCurrent";
import Consecutive from "./components/Consecutive";
import { useSelector } from "react-redux";
import { ArrowBackIos, ArrowForwardIos } from "@material-ui/icons";

export function StickyToolbar() {
  const auth = useSelector(state => state.auth);
  const [flag, setFlag] = useState(false);
  return (
    <>
      {/*{auth.user === undefined ? null : (*/}
      {/*  <ul className="sticky-toolbar nav flex-column pl-2 pr-2 pt-3 pb-3 mt-4">*/}
      {/*    <Notifications />*/}
      {/*    <ScoreInfo />*/}
      {/*    <ScoreCurrent />*/}
      {/*    <Consecutive />*/}
      {/*  </ul>*/}
      {/*)}*/}
      {auth.user === undefined ? null : (
        <ul
          // className="sticky-toolbar nav flex-column pl-2 pr-2 pt-3 pb-3 mt-4 d-flex d-md-none"
          className={
            flag
              ? "sticky-toolbar sticky-toolbarActive  nav flex-column pl-2 pr-2   mt-4 d-flex d-md-none"
              : "sticky-toolbar nav flex-column pl-2 pr-2   mt-4 d-flex d-md-none"
          }
        >
          <button
            className={flag ? "btn btn-success" : "btn"}
            onClick={() => setFlag(prevState => !prevState)}
            style={{ padding: "10px" }}
          >
            {flag ? <ArrowBackIos /> : <ArrowForwardIos />}
          </button>
          {flag ? (
            <>
              <Notifications />
              <ScoreInfo />
              <ScoreCurrent />
              <Consecutive />
            </>
          ) : null}
        </ul>
      )}
      {auth.user === undefined ? null : (
        <ul className="sticky-toolbar nav flex-column pl-2 pr-2 pt-3 pb-3 mt-4 d-none d-md-flex">
          <Notifications />
          <ScoreInfo />
          <ScoreCurrent />
          <Consecutive />
        </ul>
      )}
    </>
  );
}
