import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionTypes } from "../../../../../redux/market/stock_select_summaries";
import { actionTypes as actionTypesStockSearch } from "../../../../../redux/market/stock_select_summaries_search/sock_select_summries_search";

import { Autocomplete } from "@material-ui/lab";
import { TextField } from "@material-ui/core";

export default function Index({ value, setValue }) {
  const dispatch = useDispatch();
  const [state, setstate] = useState([]);
  const reducerStockList = useSelector((state) => state.reducerStockList);
  const stateStock = useSelector((state) => state.reducerStockListSearch.data);
  
  const [searchOnline, setsearchOnline] = useState({
    short_name: "",
    full_name: "",
  });
  
  useEffect(() => {
    if (reducerStockList.data.length === 0) {
      dispatch({ type: actionTypes.stockListAsync });
    }
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (state.length === 0) {
      setstate(reducerStockList.data);
    }
  }, [reducerStockList.data]); //eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (Object.keys(searchOnline).length) {
      if (
        searchOnline["short_name"] !== "" &&
        searchOnline["full_name"] !== ""
      ) {
        let data = {
          table: "stock",
          method_type: "select_summaries",
          data: { ...searchOnline },
        };
        dispatch({
          type: actionTypesStockSearch.stockListSearchAsync,
          payload: { ...data },
        });
      } else {
        let data = {
          table: "stock",
          method_type: "select_summaries",
          from: 0,
          size: 100,
          data: {},
        };
        dispatch({
          type: actionTypesStockSearch.stockListSearchAsync,
          payload: { ...data },
        });
      }
    } else {
      let data = {
        table: "stock",
        method_type: "select_summaries",
        from: 0,
        size: 100,
        data: {},
      };
      dispatch({
        type: actionTypesStockSearch.stockListSearchAsync,
        payload: { ...data },
      });
    }
  }, [searchOnline]);//eslint-disable-line react-hooks/exhaustive-deps

  const handleChangeText = (e) => {
    let obj = {
      short_name: `${e.target.value}`,
      full_name: `${e.target.value}`,
    };
    setsearchOnline(obj);
  };


  return (
    <div>
      <Autocomplete
        fullWidth
        id="combo-box-demo-newPost-symbol"
        options={stateStock}
        getOptionLabel={(option) => `${option.body.short_name} ${"--"} ${option.body.full_name}`}
        // renderInput={(params) => (
        //   <TextField {...params} label="جستجو نماد" variant="outlined" />
        // )}
        value={value}
        onChange={(e, val) => setValue(val)}
        renderInput={(params) => (
          <TextField
            {...params}
            label="جستجو نماد"
            variant="outlined"
            onChange={(e) => handleChangeText(e)}
            // style={{boxShadow:'0 0 100px black'}}
          />
        )}
      />
    </div>
  );
}
