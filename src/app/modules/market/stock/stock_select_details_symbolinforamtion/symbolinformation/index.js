import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core";
import Btns from "../../../../Static/SignUpHelp/SignUpHelp_select_list/btns";
import SymbolLevel1 from "./symbolLevels/sumbollevel1/SymbolLevel1";
import { useDispatch, useSelector } from "react-redux";
import { actionTypes } from "../../../../../../redux/market/stock_select_details";
import { useLocation } from "react-router-dom";

const useStyle = makeStyles(() => ({
  boxparent: {
    border: "1px solid #B2B2B2"
  }
}));

const SymbolInformation = ({ ls }) => {
  const [click, setClick] = useState(0);
  const classes = useStyle();
  const dispatch = useDispatch();
  const location = useLocation();

  const allData = useSelector(
    state => state.reducer_symbolInformation_select_list
  );

  useEffect(() => {
    if (location.state?.isin)
      dispatch({
        type: actionTypes.symbolInformationAsync,
        isin: location.state.isin
      });
  }, [location.state]); //eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <div className="row flex-lg-row flex-column ">
        {/*<div className="col-lg-2 col-12 text-center mb-20 mb-lg-0">*/}
        {/*  {btn.map((item, index) => (*/}
        {/*    <Btns*/}
        {/*      disable={"disabled"}*/}
        {/*      state={click}*/}
        {/*      setState={setClick}*/}
        {/*      btn={item}*/}
        {/*      key={index}*/}
        {/*      id={index}*/}
        {/*    />*/}
        {/*  ))}*/}
        {/*</div>*/}
        <div className="col-lg-12 col-12 ">
          <div className="container ">
            <div className={`${classes.boxparent} rounded-lg mb-10 shadow`}>
              <SymbolLevel1 allData={allData} ls={ls} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SymbolInformation;

let btn = [{ item: "مشخصات نماد" }];
