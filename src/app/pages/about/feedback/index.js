import React, { useState } from "react";
import { useSubheader } from "../../../../_metronic/layout";
import Feedback from "./../../../modules/About/feedback_insert";
import FeedBackList from "../../../modules/About/feedback_select_list";

export default function Index() {
  const [flagApi, setFlagApi] = useState(false);
  const suhbeader = useSubheader();
  suhbeader.setTitle("صدای مشتری");

  return (
    <>
      <Feedback setFlagApi={setFlagApi} />
      <FeedBackList flagApi={flagApi} setFlagApi={setFlagApi} />
    </>
  );
}
