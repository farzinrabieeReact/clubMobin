import React from "react";
import Brochure from "../../../modules/Static/brochure_select_list";
import { useSubheader } from "../../../../_metronic/layout";

const Index = () => {
  const subheader = useSubheader();
  subheader.setTitle("بروشور های آموزشی");
  return (
    <div className="bg-white rounded-lg p-2 shadow">
      <Brochure />
    </div>
  );
};

export default Index;
