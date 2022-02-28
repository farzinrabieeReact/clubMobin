import React, { useEffect, useState } from "react";
import {
  Box,
  CircularProgress,
  makeStyles,
  Switch,
  Tooltip
} from "@material-ui/core";
import Category from "./category";
import SubCategory from "./subCategory";
import { LinearProgress } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { actionTypes as actionTypesNotif } from "../../../../redux/notificationAlert";
import FilterItem from "../gift_select_list/filterItem";
import { Search } from "@material-ui/icons";
import SortIcon from "../gift_select_list/SortIcon";
import { actionTypes } from "../../../../redux/gift/giftMe_select_affordable";
import InfiniteScroll from "react-infinite-scroll-component";

let useStyles = makeStyles(theme => ({
  btn: {
    border: "1px solid #ff5f00",
    backgroundColor: "white",
    color: "#ff5f00",
    width: "90%",
    padding: "5px 8px",
    margin: "0 auto",
    borderRadius: 8,
    "&:hover": {
      backgroundColor: "#ff5f00",
      color: "white"
    },
    "@media (max-width: 768px)": {
      width: "98%"
    }
  },
  headerTitle: {
    height: "150px",
    paddingBottom: "25px",
    ["@media (min-width:992px)"]: {
      // eslint-disable-line no-useless-computed-key
      height: "5px"
    }
  },
  menuIcon: {
    width: 20,
    height: 20,
    cursor: "pointer",
    marginRight: 15
  },
  menuIcon2: {
    width: 20,
    height: 20,
    cursor: "pointer",
    marginRight: 15,
    transform: "rotate(180deg)"
  },

  anime: {
    visibility: "hidden",
    opacity: 0,
    transition: "all 0.5s"
  },
  animatedItem: {
    animation: `$myEffect 500ms `,
    display: "flex",
    alignItems: "center"
  },

  "@keyframes myEffect": {
    "0%": {
      visibility: "hidden",
      opacity: 0
    },
    "100%": {
      visibility: "visibale",
      opacity: 1
    }
  },

  "@keyframes myEffectExit": {
    "0%": {
      visibility: "hidden",
      opacity: 0
    },
    "100%": {
      visibility: "visibale",
      opacity: 1
    }
  }
}));
let flag = false;
let flagf = false;
let sum = 1;
export default function Index({ setCheckedSwitch, checkedSwitch }) {
  // const suhbeader = useSubheader();
  // suhbeader.setTitle("جوایز قابل انتخاب من");

  ////////////////////////////////////////////////////////////////////////////////////state
  let reducerGiftSelectAffordable = useSelector(
    state => state.reducergiftMeSelectAffordable
  );
  let reducerGiftActiveCategoris = useSelector(
    state => state.reducergiftSelectActiveCategorisList
  );
  const auth = useSelector(state => state.auth);
  const [flagFilter, setflagFilter] = useState(false);
  const [directionSort, setdirectionSort] = useState("null");
  const [category, setcategory] = useState(null);
  const [flagTab, setFlagTab] = useState(false);
  const [dataSort, setdataSort] = useState([]);
  const [flagSearch, setFlagSearch] = useState(false);
  const [stateHasMore, setstateHasMore] = useState(true);

  const [stateFilter, setstateFilter] = useState({
    name: ""
  });
  ////////////////////////////////////////////////////////////////////////////////////hook
  const classes = useStyles();
  const dispatch = useDispatch();
  let { push } = useHistory();
  ////////////////////////////////////////////////////////////////////////////////////functions
  const handeleFilter = (value, type) => {
    setstateFilter({
      [type]: value
    });
  };
  const sortData = () => {
    let coptReducer = [...reducerGiftSelectAffordable.data];
    let infoSort = reducerGiftSelectAffordable.data;
    let res = [];
    if (directionSort === "up") {
      infoSort = coptReducer?.sort(function(a, b) {
        return b.body.required_bonus - a.body.required_bonus;
      });
    } else if (directionSort === "down") {
      infoSort = coptReducer?.sort(function(a, b) {
        return a.body.required_bonus - b.body.required_bonus;
      });
    } else if (directionSort === "null") {
      return infoSort;
    }
    res = [...infoSort];
    setdataSort(res);
  };
  useEffect(() => {
    sortData();
  }, [directionSort]);

  const handelDirection = () => {
    switch (directionSort) {
      case "null":
        setdirectionSort("up");
        return;
      case "up":
        setdirectionSort("down");
        return;
      case "down":
        setdirectionSort("null");
        return;
      default:
        break;
    }
  };
  const handleSort = () => {
    handelDirection();
  };

  // const handleExit = () => {
  //   setflagFilter(false);
  //   setTabs(false);
  //   setflagTextSearch(false);
  //   setValue(0);
  //   setexit(prev => !prev);
  //   setstateFilter({
  //     name: ""
  //   });
  //   location.state = "";
  // };

  const handelRout = () => {
    if (auth.user === undefined) {
      dispatch({
        type: actionTypesNotif.warning,
        textAlert: "برای انجام این عملیات باید لاگین کنید"
      });
      return;
    }

    push({
      pathname: "/gift/request"
    });
  };

  const handleChangeSwitch = event => {
    setCheckedSwitch(event.target.checked);
  };
  const handleFilter = () => {
    setflagFilter(prev => !prev);
  };
  const handleSubmitFilter = event => {
    setFlagTab(true);

    if (stateFilter.name === "" || stateFilter.name === " ") {
      alert("لطفا باکس را پر کنید");
    } else {
      let data = {
        data: { name: stateFilter.name }
      };
      dispatch({
        type: actionTypes.giftMeSelectAffordableAsync,
        payload: data
      });
      // setcategory(reducerGiftActiveCategoris?.data[0]?.body.gift_category);
      setFlagSearch(true);
    }
  };
  const handleExit = () => {
    setFlagTab(false);
    let data = {
      data: {
        gift_category: category
      }
    };
    dispatch({
      type: actionTypes.giftMeSelectAffordableAsync,
      payload: data
    });
    // setcategory(reducerGiftActiveCategoris?.data[0]?.body?.gift_category);
    setstateFilter({
      name: ""
    });
    let scr = document.getElementById("handleScrollMyGift");
    scr.scrollTo({
      top: 0
    });
    sum = 0;
    setFlagSearch(false);
    setstateHasMore(true);
    setflagFilter(false);
  };
  useEffect(() => {
    return () => {
      flag = false;
      flagf = false;
    };
  }, []);

  useEffect(() => {
    setstateHasMore(true);
    let scr = document.getElementById("handleScrollMyGift");
    if (flag) {
      scr.scrollTo({
        top: 0
      });
      sum = 0;
    }
    flag = true;
  }, [category]);

  useEffect(() => {
    if (dataSort.length >= reducerGiftSelectAffordable.total) {
      setstateHasMore(false);
      return;
    }
    setstateHasMore(true);
  }, [dataSort.length]);

  const handleLoadApi = () => {
    if (dataSort.length >= reducerGiftSelectAffordable.total) {
      setstateHasMore(false);
      return;
    }
    if (!flagSearch) {
      if (sum === 0) {
        let { size } = reducerGiftSelectAffordable;
        let data = {
          from: size,
          size: size,
          data: {
            gift_category: category
          }
        };
        setTimeout(() => {
          dispatch({
            type: actionTypes.giftMeSelectAffordableAsync1,
            payload: data
          });
        }, 500);
        sum = sum + 2;
      } else {
        let { size } = reducerGiftSelectAffordable;
        let data = {
          from: sum * size,
          size: size,
          data: {
            gift_category: category
          }
        };
        setTimeout(() => {
          dispatch({
            type: actionTypes.giftMeSelectAffordableAsync1,
            payload: data
          });
        }, 500);
        sum = sum + 1;
      }
    }
  };

  ////////////////////////////////////////////////////////////////////////////////////return

  return (
    <div
      style={{
        paddingTop:
          !reducerGiftSelectAffordable.loading ||
          reducerGiftActiveCategoris.loading
            ? "4px"
            : "0"
      }}
      className=""
    >
      <div
        // className="d-flex align-items-center justify-content-between h-5px"
        className={`d-flex align-items-center justify-content-between flex-column flex-lg-row ${classes.headerTitle}`}
        // style={{ paddingBottom: "25px" }}
      >
        {" "}
        <div className="pl-4">
          <h4 className="m-0">
            {checkedSwitch ? "جوایز قابل انتخاب من" : "جوایز باشگاه مشتریان"}
          </h4>
        </div>
        <div className="pl-3  d-flex justify-content-end">
          <Switch
            color="primary"
            checked={checkedSwitch}
            onChange={handleChangeSwitch}
            inputProps={{ "aria-label": "controlled" }}
          />
          <span
            style={{
              fontWeight: "bold",
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            جوایز قابل انتخاب من{" "}
          </span>
        </div>
        <div className="d-flex align-items-center justify-content-end flex-column-reverse flex-lg-row">
          <div className={!flagFilter ? classes.anime : classes.animatedItem}>
            <FilterItem
              handeleFilter={handeleFilter}
              stateFilter={stateFilter}
              handleSubmitFilter={handleSubmitFilter}
              handleExit={handleExit}
            />
          </div>
          <div className="d-flex align-items-center">
            <Tooltip title="جستجو در تمامی جوایز" placement="bottom">
              <Search
                size={"normal"}
                className={classes["menuIcon"]}
                onClick={() => handleFilter()}
              />
            </Tooltip>
            <div className="ms-4">
              <SortIcon handleSort={handleSort} directionSort={directionSort} />
            </div>
          </div>
        </div>
      </div>

      <Box className={"row d-flex"}>
        <Box
          className="col-lg-2  d-flex flex-column-reverse mb-5 mb-lg-0"
          style={{ justifyContent: "start" }}
        >
          <Category
            handelRout={handelRout}
            setFlagTab={setFlagTab}
            flagTab={flagTab}
            category={category}
          >
            {giftCategory => setcategory(giftCategory)}
          </Category>
        </Box>

        <Box className={"col-lg-10 bg-white p-0"}>
          <div
            className="w-100"
            id="handleScrollMyGift"
            style={{
              height: "750px",
              overflow: "auto",
              overflowX: "hidden !important"
            }}
          >
            {reducerGiftSelectAffordable.loading && <LinearProgress />}
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
              scrollableTarget="handleScrollMyGift"
            >
              {category && (
                <SubCategory
                  category={category}
                  dataSort={dataSort}
                  setdataSort={setdataSort}
                  flagSearch={flagSearch}
                />
              )}
            </InfiniteScroll>
          </div>
        </Box>
      </Box>
    </div>
  );
}
