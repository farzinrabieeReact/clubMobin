import React from "react";
import { useSubheader } from "../../../../_metronic/layout";
import SignUpHelp from "../../../modules/Static/SignUpHelp/SignUpHelp_select_list";

function Index() {
  const suhbeader = useSubheader();
  suhbeader.setTitle("راهنمای ثبت نام");

  return (
    <div className="bg-white rounded-lg p-3 p-md-0" style={{ minHeight: "80vh" }}>
      <SignUpHelp />
    </div>
  );
}

export default Index;
