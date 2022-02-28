import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { actionTypes as creaditActions } from "../../../redux/tradesCredit/tradesCredit_select";
import { makeStyles } from "@material-ui/core/styles";
import Table from "./table";
const useStyles = makeStyles({
  root: {
    display: "flex",
    justifyContent: "space-between",
  },
  infoBox: {},
  tableBox: {},
});

export default function TradesCredit() {
  let ref = useRef(null);
  const classes = useStyles();
  const dispatch = useDispatch();
  const allData = useSelector((state) => state.reducer_trades_credit_select);
  const [state, setState] = useState(null);
  const [pagnation, setPagnation] = useState({
    number: 1,
    count: 2,
  });
  const [flag, setFlag] = useState(false);

  useEffect(() => {
    setPagnation((prev) => ({
      ...prev,
      count: Math.ceil(allData.total / allData.size),
    }));
  }, [allData]);

  const apiSubmit = () => {
    let obj = {};
    let { size } = allData;
    let _data = {
      data: obj,
      from: pagnation.number,
      size: size,
    };
    dispatch({
      type: creaditActions.tradesCreditSelectAsync,
      payload: _data,
    });
  };

  useEffect(() => {
    apiSubmit();
  }, []);

  useEffect(() => {
    setState(allData);
  }, [allData]);

  useEffect(() => {
    if (ref.current === true) {
      apiSubmit();
    }
    ref.current = true;
  }, [flag]);

  const changePagnation = (page) => {
    setPagnation((prev) => ({
      ...prev,
      number: page,
    }));
    setFlag((prev) => !prev);
  };

  return (
    <div className={`${classes.root} row mt-5 mx-auto`}>
      <div className="col-12 col-lg-12">
        <Table
          Data={state}
          pagnation={pagnation}
          changePagnation={changePagnation}
        />
      </div>
    </div>
  );
}
