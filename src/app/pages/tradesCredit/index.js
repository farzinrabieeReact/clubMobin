import React from "react";
import { useSubheader } from "../../../_metronic/layout";
import TradesCredit from "../../modules/TradesCredit";

export default function Index() {
  const suhbeader = useSubheader();
  suhbeader.setTitle("اعتبارات دریافتی");

  return (
    <div className="bg-white rounded-lg p-1">
      <TradesCredit/>
    </div>
  );
}
