import React, { useState, useEffect } from "react";

import { actionTypes } from "../../../../../redux/gift/giftMe_select_affordable";
import { useDispatch, useSelector } from "react-redux";
import Card from "./card";
import CardNoData from "./../../../../common/components/cardNoData";
import Box from "@material-ui/core/Box";

export default function Index({ category, dataSort, setdataSort, flagSearch }) {
  let dispatch = useDispatch();

  const [state, setstate] = useState([]);

  let reducerGiftSelectAffordable = useSelector(
    state => state.reducergiftMeSelectAffordable
  );

  useEffect(() => {
    if (category) {
      let data = {
        data: { gift_category: category }
      };
      dispatch({
        type: actionTypes.giftMeSelectAffordableAsync,
        payload: data
      });
    }
  }, [category]); //eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (reducerGiftSelectAffordable.data) {
      setdataSort(reducerGiftSelectAffordable.data);
    }
  }, [reducerGiftSelectAffordable.data]);

  return (
    <>
      <div className="w-100  row pt-4 pl-3 m-0">
        {!dataSort.length && (
          <div className="w-100">
            <CardNoData
              text={
                reducerGiftSelectAffordable.loading
                  ? "درحال بارگذاری..."
                  : "اطلاعاتی برای نمایش وجود ندارد"
              }
            />
          </div>
        )}
        {dataSort.map((item, index) => (
          <Box className="col-12 col-sm-12 col-md-6 col-lg-4 col-xxl-3 d-flex justify-content-center">
            {" "}
            <Card key={index} data={item} />
          </Box>
        ))}
      </div>
    </>
  );
}
