import React, { useEffect, useState } from "react";
import { Box, makeStyles } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import RefreshIcon from "@material-ui/icons/Refresh";

import Category from "./category";
import Question from "./question";
import { actionTypes } from "../../../../../redux/about/faq/faq_select_list";
import { distinctMethod } from "../../../../common/method/distinctMethod";
import Serach from "./Search";
import OutlinedCard from "../../../../common/components/cardNoData";

let useStyle = makeStyles({
  cardSearch: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center"
  },
  iconRefresh: {
    width: 25,
    height: 25,
    cursor: "pointer"
  },
  cardIcon: {
    display: "flex",
    alignItems: "center",
    width: 60,
    textAlign: "center"
  }
});

export default function Index() {
  let classes = useStyle();
  const dispatch = useDispatch();
  const faq = useSelector(state => state.reducer_faq_select_list).data;

  const [state, setstate] = useState("");
  const [defaultSelectItems, setDefaultSelectItems] = useState({
    index: null,
    category: null
  });

  useEffect(() => {
    faq_Select();
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  const faq_Select = () => {
    setstate("");
    dispatch({ type: actionTypes.faqEmpty });
    dispatch({ type: actionTypes.faqAsync });

    setTimeout(() => {
      setDefaultSelectItems({ index: null, category: null });
    }, 500);
  };

  const faq_filter = data => {
    dispatch({ type: actionTypes.faqEmpty });

    dispatch({
      type: actionTypes.faqAsync,
      data: {
        question: data,
        answer: data
      }
    });
    setTimeout(() => {
      setDefaultSelectItems({ index: null, category: null });
    }, 500);
  };
  let distinct_data = distinctMethod(faq, ["body", ["category"]]);

  return (
    <Box>
      <Box className="d-flex align-items-center justify-content-center justify-content-lg-end">
        <div className="d-flex">
          <div className={`${classes["cardIcon"]} `}>
            <RefreshIcon
              className={classes["iconRefresh"]}
              onClick={() => faq_Select()}
            />
          </div>
          <Serach
            state={state}
            setstate={setstate}
            faq_filter={faq_filter}
            faq_Select={faq_Select}
          />
        </div>
      </Box>
      <Box className={"row mt-5"}>
        {distinct_data.length !== 0 && (
          <>
            <Box className={"col-lg-3 d-flex justify-content-center"}>
              <Category
                data={distinct_data}
                defaultSelectItem={defaultSelectItems}
                setDefaultSelectItems={setDefaultSelectItems}
              />
            </Box>
            <Box className={"col-lg-9"}>
              <Question data={faq} defaultSelectItems={defaultSelectItems} />
            </Box>
          </>
        )}
        {distinct_data.length === 0 && <OutlinedCard />}
      </Box>
    </Box>
  );
}
