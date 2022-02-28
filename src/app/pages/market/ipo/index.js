import React, { useState } from "react";
import { useSubheader } from "../../../../_metronic/layout";
import RecordBy from "../../../modules/market/stock/ipo_insert_resgister";
import IpoInfo from "../../../modules/market/stock/ipo_information/index";
import Table from "../../../modules/market/stock/ipo_select_registered";
import IpoRules from "../../../modules/market/stock/ipo_rules";

const Index = () => {
  const[stateSelect,setStateSelect]=useState()
  const subheader = useSubheader();
  subheader.setTitle("عرضه اولیه");

  return (
    <div className="row my-5">
       <div className="col-12 col-lg-4">
        <RecordBy setStateSelect={setStateSelect} stateSelect={stateSelect} />
      </div>
      <div className="col-12 col-lg-4">
     <IpoInfo stateSelect={stateSelect} />
      </div>
     
      <div className="col-12 col-lg-4">
       <IpoRules/>
      </div>
      <div className="col-12 col-lg-12">
        <Table />
      </div>
    </div>
  );
};

export default Index;
