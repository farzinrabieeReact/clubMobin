import React from "react";
import { useSubheader } from "../../../../_metronic/layout";
import Credit from "../../../modules/Static/credit_select_list";

export default function Index() {
  const suhbeader = useSubheader();
  suhbeader.setTitle("شرایط و ضوابط دریافت اعتبار ");

  return (
    <div className="bg-white rounded-lg py-10">
      <Credit />
    </div>
  );
}
