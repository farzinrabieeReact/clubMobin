import React from "react";
import { useSubheader } from "../../../../_metronic/layout";

import PayOut from "../../../modules/market/payOut/payOut_select";

const Index = () => {
  const subheader = useSubheader();
  subheader.setTitle("سود نقدی سهام");

  return (
    <div className="row  ">
      <div className="col-12 col-lg-12">
        <PayOut />
      </div>
    </div>
  );
};

export default Index;
