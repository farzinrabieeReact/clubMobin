import React, { useEffect, useState } from "react";
import { useSubheader } from "../../../../_metronic/layout";
import Table from "../../../modules/market/turnover/Table";
import Filter from "../../../modules/market/turnover/Filter";
import { actionTypes } from "../../../../redux/market/stock/stock_select_details_aggregates";
import { useDispatch, useSelector } from "react-redux";

const Index = () => {
  const subheader = useSubheader();
  subheader.setTitle("صورت معاملات");
  const dispatch = useDispatch();
  const [flaq, setFlag] = useState(true);
  const [flaqAgree, setFlagAgree] = useState(false);
  const [value, setValue] = React.useState("details");
  const [value1, setValue1] = React.useState("all");
  const [valueFilter, setValueFilter] = React.useState(null);
  const [state, setstate] = useState([]);
  const [pageTab1, setPageTab1] = useState(1); //eslint-disable-line no-unused-vars
  const [instrumentType] = useState({
    IFB: "فرابورس",
    TSE: "بورس",
    IME: "بورس کالا",
    ENERGY: "بورس انرژی",
    FUTURE: "بورس آتی"
  });
  const reducerOrder = useSelector(
    state => state.reducerOrderDetailsAggregates
  );
  const reducerIsin = useSelector(state => state.reducerStockList);
  useEffect(() => {
    if (flaq) {
      let data = {
        method_type: "select_details",
        from: 0,
        size: 20,
        data: valueFilter ? valueFilter : null
      };
      dispatch({
        type: actionTypes.OrderDetailsAggregatesAsync,
        payload: data
      });
    }

    if (!flaq) {
      let data = {
        method_type: "select_aggregates",
        from: 0,
        size: 20,
        data: valueFilter ? valueFilter : null
      };
      dispatch({
        type: actionTypes.OrderDetailsAggregatesAsync,
        payload: data
      });
    }
  }, [flaq, valueFilter]); //eslint-disable-line  react-hooks/exhaustive-deps
  useEffect(() => {
    if (reducerOrder.data) {
      setstate(reducerOrder.data);
    }
  }, [reducerOrder.data]);
  const changePagnation = page => {
    if (flaq) {
      dispatch({
        type: actionTypes.OrderDetailsAggregatesAsync,
        payload: {
          method_type: "select_details",
          from: page * reducerOrder.size - reducerOrder.size,
          size: reducerOrder.size,
          data: valueFilter ? valueFilter : null
        }
      });
    } else {
      dispatch({
        type: actionTypes.OrderDetailsAggregatesAsync,
        payload: {
          method_type: "select_aggregates",
          from: page * reducerOrder.size - reducerOrder.size,
          size: reducerOrder.size,
          data: valueFilter ? valueFilter : null
        }
      });
    }
  };

  return (
    <div className="row  mt-5">
      <div className="col-12 col-lg-3">
        <Filter
          value1={value1}
          setValue1={setValue1}
          setFlag={setFlag}
          value={value}
          setValue={setValue}
          flaq={flaq}
          valueFilter={valueFilter}
          setValueFilter={setValueFilter}
          flaqAgree={flaqAgree}
          setFlagAgree={setFlagAgree}
        />
      </div>
      <div className="col-12 col-lg-9">
        <Table
          flaq={flaq}
          changePagnation={changePagnation}
          pageTab1={pageTab1}
          data={state}
          reducerOrder={reducerOrder}
          setEmpty={setstate}
          isin={reducerIsin.isinJson}
          instrumentType={instrumentType}
        />
      </div>
    </div>
  );
};

export default Index;
