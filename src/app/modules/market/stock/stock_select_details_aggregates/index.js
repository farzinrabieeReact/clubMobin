import React, { useEffect } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  makeStyles,
} from "@material-ui/core";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { actionTypes } from "../../../../../redux/market/stock/stock_select_details_aggregates";
import TableDetails from "./tableDetails";
import TablesAggregates from "./tablesAggregates";
import { LinearProgress } from '@material-ui/core';

let useStyle = makeStyles({
  inputSelect: {
    width: 300,
    margin: "20px 0px",
  },
});

export default function Index() {
  let classes = useStyle();
  let dispatch = useDispatch();
  const [flaq, setFlag] = useState(true);
  const [state, setstate] = useState([]);
  const [instrumentType] = useState({
    IFB: "فرابورس",
    TSE: "بورس",
    IME: "بورس کالا",
    ENERGY: "بورس انرژی",
    FUTURE: "بورس آتی",
  });

  const reducerOrder = useSelector(
    (state) => state.reducerOrderDetailsAggregates
  );
  const reducerIsin = useSelector((state) => state.reducerStockList);
  console.log("reducerIsin", reducerIsin);

  useEffect(() => {
    if (flaq) {
      let data = {
        method_type: "select_details",
        data: {},
      };
      dispatch({
        type: actionTypes.OrderDetailsAggregatesAsync,
        payload: data,
      });
    }

    if (!flaq) {
      let data = {
        method_type: "select_aggregates",
        data: {},
      };
      dispatch({
        type: actionTypes.OrderDetailsAggregatesAsync,
        payload: data,
      });
    }
  }, [flaq]); //eslint-disable-line  react-hooks/exhaustive-deps

  useEffect(() => {
    if (reducerOrder.data) {
      setstate(reducerOrder.data);
    }
  }, [reducerOrder.data]);

  return (
    <div className={"bg-white rounded"}>
      <div className={classes["inputSelect"]}>
        <FormControl variant="outlined" fullWidth>
          <InputLabel id="demo-simple-select-outlined-label-newpost-subgroup_name">
            نوع گزارش
          </InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label-newpost-subgroup_name"
            id="demo-simple-select-outlined-newpost-subgroup_name"
            label="نوع گزارش"
            value={flaq}
          >
            <MenuItem value={false} onClick={() => setFlag(false)}>
              {"تجمیعی"}
            </MenuItem>
            <MenuItem value={true} onClick={() => setFlag(true)}>
              {"ریزسفارشات"}
            </MenuItem>
          </Select>
        </FormControl>
      </div>
      <div className="table-responsive">
        {state.length === 0 ? (
          <div>
            <LinearProgress color="primary" />
          </div>
        ) : null}
        {flaq && (
          <TableDetails
            data={state}
            setEmpty={setstate}
            isin={reducerIsin.isinJson}
            instrumentType={instrumentType}
          />
        )}
        {!flaq && (
          <TablesAggregates
            data={state}
            setEmpty={setstate}
            isin={reducerIsin.isinJson}
            instrumentType={instrumentType}
          />
        )}
      </div>
    </div>
  );
}
