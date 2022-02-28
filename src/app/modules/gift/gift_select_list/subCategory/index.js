import React, { useState, useEffect } from "react";

import { actionTypes as selectSub_category } from "../../../../../redux/gift/gift_select_activeGift";
import { useDispatch, useSelector } from "react-redux";
import {
  makeStyles,
  Box,
  Typography,
  CircularProgress,
  LinearProgress
} from "@material-ui/core";
import PropTypes from "prop-types";
import Card from "../Accordions/card";
import CardNoData from "../../../../common/components/cardNoData";
import Styles from "./index.module.scss";
import InfiniteScroll from "react-infinite-scroll-component";

const useStyles = makeStyles(() => ({
  boxTitle: {
    display: "flex",
    alignItems: "center",
    padding: 5,
    height: 60
  },

  boxTitleChild: {
    width: "95%",
    marginLeft: 33,
    marginRight: 10,
    marginTop: 1,
    backgroundColor: "#ffd8b6",
    borderRadius: 13,
    boxShadow: "rgba(0, 0, 0, 0.15) 3px 3px 7px",
    ["@media (max-width:576px)"]: {
      // eslint-disable-line no-useless-computed-key
      marginRight: 25
    }
  }
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired
};

function a11yProps(index) {
  // console.log("index",index)
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`
  };
}
let flag = false;
let sum = 1;
export default function Index({
  category,
  stateFilter,
  apiCallFlag,
  handleSerchData,
  exit,
  reducerAllGift,
  dataSort,
  location,
  reducerGiftSubCategory,
  selectCategory,
  setdataSort,
  selectSubCategory,
  flagSearch,
  setstateHasMore,
  stateHasMore
}) {
  // console.log("datasort", dataSort);
  const classes = useStyles();
  let dispatch = useDispatch();
  const [state, setstate] = useState([]);
  const [stateScroll, setStateScroll] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);

  let reducerGiftActive = useSelector(
    state => state.reducergiftSelectActiveList
  );

  useEffect(() => {
    if (reducerGiftActive.data) {
      setstate(reducerGiftActive.data);
    }
  }, [reducerGiftActive]);

  useEffect(() => {
    if (apiCallFlag) {
      let data = {
        size: 10000,
        data: { ...stateFilter }
      };
      dispatch({
        type: selectSub_category.giftSelectActiveListAsync,
        payload: data
      });
    }
  }, [apiCallFlag]); //eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    handleSerchData(reducerGiftActive);
  }, [reducerGiftActive]); //eslint-disable-line

  useEffect(() => {
    if (!location.state) {
      let data = {
        from: 0,
        size: reducerGiftActive.size,
        data: {
          gift_category: selectCategory,
          gift_sub_category: selectSubCategory
        }
      };

      if (
        reducerGiftSubCategory.data[0]?.body.gift_sub_category === null ||
        reducerGiftSubCategory.data[0]?.body.gift_sub_category === "null"
      ) {
        return;
      }

      dispatch({
        type: selectSub_category.giftSelectActiveListAsync,
        payload: data
      });
    }
  }, [exit]);
  useEffect(() => {
    if (dataSort.length >= reducerAllGift.total) {
      setstateHasMore(false);
      return;
    }
    setstateHasMore(true);
  }, [dataSort.length]);

  useEffect(() => {
    setstateHasMore(true);
    let scr = document.getElementById("handleScroll");
    if (flag) {
      scr.scrollTo({
        top: 0
      });
      sum = 0;
    }
    if (dataSort.length < 8) {
      setstateHasMore(false);
    }
    flag = true;
  }, [selectSubCategory, selectCategory, exit, apiCallFlag]);

  //eslint-disable-line react-hooks/exhaustive-deps
  const handleLoadApi = () => {
    if (dataSort.length >= reducerAllGift.total) {
      setstateHasMore(false);
      return;
    }
    if (!flagSearch) {
      if (sum === 0) {
        let { size } = reducerGiftActive;
        let data = {
          from: size,
          size: size,
          data: {
            gift_category: selectCategory,
            gift_sub_category: selectSubCategory
          }
        };
        setTimeout(() => {
          dispatch({
            type: selectSub_category.giftSelectActiveListAsync1,
            payload: data
          });
        }, 500);
        sum = sum + 2;
      } else {
        let { size } = reducerGiftActive;
        let data = {
          from: sum * size,
          size: size,
          data: {
            gift_category: selectCategory,
            gift_sub_category: selectSubCategory
          }
        };
        setTimeout(() => {
          dispatch({
            type: selectSub_category.giftSelectActiveListAsync1,
            payload: data
          });
        }, 500);
        sum = sum + 1;
      }
    }
  };
  const handleScroll = () => {
    const position = document.getElementById("handleScroll");
    setScrollPosition(position.scrollTop);
  };
  return (
    <div
      className="w-100"
      id="handleScroll"
      onScroll={handleScroll}
      style={{
        height: "750px",
        overflow: "auto",
        overflowX: "hidden !important"
      }}
    >
      <div className="pl-3"> {reducerAllGift.load && <LinearProgress />}</div>
      <Box sx={{ width: "100%" }}></Box>
      <InfiniteScroll
        style={{ overflowX: "hidden" }}
        next={handleLoadApi}
        hasMore={stateHasMore}
        loader={
          <div className="d-flex justify-content-center h-40px">
            {" "}
            <CircularProgress size={30} style={{ overflowX: "hidden" }} />
          </div>
        }
        endMessage={<p></p>}
        dataLength={dataSort.length}
        scrollableTarget="handleScroll"
      >
        <Box
          className={`${Styles.scroll} row pt-4 pl-3`}
          style={{
            width: "101%",
            overflowY: "auto",
            overflowX: "hidden",

            position: "relative"
          }}
        >
          {dataSort.map((item, index) => {
            return (
              <Box className="col-12 col-sm-12 col-md-6 col-lg-4 col-xxl-3 d-flex justify-content-center">
                <Card key={index} data={item} dataSort={dataSort} />
              </Box>
            );
          })}

          {state.length === 0 && (
            <Box className="col-12">
              <CardNoData
                text={
                  reducerAllGift.load
                    ? "در حال بارگذاری"
                    : "داده ای برای نمایش موجود نمی باشد"
                }
              />
            </Box>
          )}
        </Box>
      </InfiniteScroll>

      {category.gift_category === "کتاب" && (
        <Box className={`${"row"} ${classes.boxTitle}`}>
          <div className={`${"alert"} ${classes.boxTitleChild}`}>
            {
              "هزینه ارسال برای یک جلد کتاب 28 امتیاز و برای دو جلد و بیشتر 56 امتیاز محاسبه و کسر می گردد"
            }
          </div>
        </Box>
      )}
    </div>
  );
}
