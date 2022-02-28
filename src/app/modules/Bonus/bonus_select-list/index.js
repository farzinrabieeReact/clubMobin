import React, { useEffect, useState } from "react";
import { Box, LinearProgress } from "@material-ui/core";
import Table from "./table";
import Title from "./title";
import { useDispatch, useSelector } from "react-redux";
import { actionTypes } from "../../../../redux/bonus/bonus/bonus_select-list";
import { useSubheader } from "../../../../_metronic/layout";
import { convertDigitToEnglish } from "../../../common/method/convertDigitToEnglish";

export const Bonus = () => {
  const bonus = useSelector((state) => state.reducer_bonus_select_list.data);
  const loading = useSelector((state) => state.reducer_bonus_select_list.load);
  const dispatch = useDispatch();

  const [flagFilter, setflagFilter] = useState(false);
  const [flagRefresh, setflagRefresh] = useState(false);
  const [stateFilter, setstateFilter] = useState({
    create_date_from: null,
    create_date_to: null,
    is_removed: "",
  });

  const suhbeader = useSubheader();
  suhbeader.setTitle("جزییات امتیاز کسب شده");

  const apiCall = () => {
    let obj = {};
    Object.keys(stateFilter).forEach((element) => {
      if (stateFilter[element]) {
        obj[element] = stateFilter[element];
      }
    });
    let data = {
      data: obj,
    };
    dispatch({ type: actionTypes.bonusAsync, payload: data });
    setflagRefresh(false);
  };

  useEffect(() => {
    apiCall();
  }, []); //eslint-disable-line react-hooks/exhaustive-deps
  
  const submit = (type) => {
    if (type === "Refresh") {
      setstateFilter({
        create_date_from: null,
        create_date_to: null,
        is_removed: "",
      });
    }
    setflagRefresh(true);
  };

  useEffect(() => {
    if (flagRefresh) {
      apiCall();
    }
  }, [flagRefresh]);

  const handelChangeDate = (data, type) => {
    let date = convertDigitToEnglish(data?.format("YYYY/MM/DD"));

    if (type === "create_date_from") {
      date = `${date} 00:00:00.000000`;
      setstateFilter((prev) => ({
        ...prev,
        [type]: date,
      }));
    } else if (type === "create_date_to") {
      date = `${date} 23:59:59.999999`;
      setstateFilter((prev) => ({
        ...prev,
        [type]: date,
      }));
    }
  };

  return (
    <div className="bg-white rounded-lg m-5 border">
      {loading && <LinearProgress />}
      <Box>
        <Title
          setflagFilter={setflagFilter}
          flagFilter={flagFilter}
          stateFilter={stateFilter}
          setstateFilter={setstateFilter}
          handelChangeDate={handelChangeDate}
          submit={submit}
        />
        <Table data={bonus} loading={loading} />
      </Box>
    </div>
  );
};
