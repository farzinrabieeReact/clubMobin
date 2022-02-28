import React, { useEffect, useState } from "react";
import {
  makeStyles,
  Box,
  LinearProgress,
  Tooltip,
  Switch
} from "@material-ui/core";
import Category from "./category";
import SubCategory from "./subCategory";
import { useHistory, useLocation } from "react-router-dom";
import { Search } from "@material-ui/icons";
import FilterItem from "./filterItem";
import { useDispatch, useSelector } from "react-redux";
import SortIcon from "./SortIcon";
import { actionTypes as actionTypesNotif } from "../../../../redux/notificationAlert";

let useStyles = makeStyles(theme => ({
  header: {
    width: "100%",
    height: 30,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    padding: "5px 10px",
    // boxShadow: "rgba(0, 0, 0, 0.15) 3px 3px 7px",
    borderRadius: "0 0 10px 10px",
    ["@media (max-width:780px)"]: {
      justifyContent: "flex-end"
    }
  },
  headerTitle: {
    height: "150px",
    paddingBottom: "25px",
    // [theme.breakpoints.up("lg")]: {
    //   backgroundColor: "red"
    // }
    ["@media (min-width:992px)"]: {
      // eslint-disable-line no-useless-computed-key
      height: "5px"
    }
  },
  icons: {
    width: "80%",
    display: "flex",
    justifyContent: "flex-end"
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
  btn: {
    border: "1px solid #ff5f00",
    backgroundColor: "white",
    color: "#ff5f00",
    marginTop: "auto",
    padding: "5px 8px",
    borderRadius: 8,
    width: "200x",
    "&:hover": {
      backgroundColor: "#ff5f00",
      color: "white"
    }
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
let sum = 0;
export default function Index({ setCheckedSwitch, checkedSwitch }) {
  const location = useLocation();
  const dispatch = useDispatch();
  let classes = useStyles();
  let { push } = useHistory();
  const auth = useSelector(state => state.auth);
  const [selectSubCategory, setSelectSubCatogory] = React.useState();

  const [category, setcategory] = useState(null);
  const [tabs, setTabs] = useState(false);
  const [flagFilter, setflagFilter] = useState(false);
  const [stateFilter, setstateFilter] = useState({
    name: location.state ? location.state : ""
  });
  const [apiCallFlag, setapiCallFlag] = useState(false);
  const [flagTextSearch, setflagTextSearch] = useState(false);
  const [exit, setexit] = useState(false);
  const [dataSort, setdataSort] = useState([]);
  const [directionSort, setdirectionSort] = useState("null");
  const [selectCategory, setSelectCategory] = useState();
  const [flagSearch, setFlagSearch] = useState(false);
  const [stateHasMore, setstateHasMore] = useState(true);
  const handleChangeSwitch = event => {
    setCheckedSwitch(event.target.checked);
  };

  const reducerAllGift = useSelector(
    state => state.reducergiftSelectActiveList
  );

  let reducerGiftSubCategory = useSelector(
    state => state.reducerGiftSelectActiveSubCategoryList
  );

  const sortData = () => {
    let coptReducer = [...reducerAllGift.data];
    let infoSort = reducerAllGift.data;
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

  const handleSort = () => {
    handelDirection();
  };
  useEffect(() => {
    return () => {
      flag = false;
    };
  }, []);

  useEffect(() => {
    sortData();
  }, [directionSort]);
  useEffect(() => {
    if (location.state) {
      // setstateFilter({ name: location.state });
      setflagFilter(true);
      handleEdit();
    }
  }, [location.state]);
  useEffect(() => {
    if (flag) {
      if (!flagFilter) {
        handleExit();
      }
    }
    if (location.state) {
      setstateFilter({ name: location.state });
    }
    flag = true;
  }, [flagFilter]);

  const handleEdit = () => {
    setTimeout(handleSubmitFilter, 500);
  };

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

  useEffect(() => {
    setdataSort(reducerAllGift.data);
    sortData();
  }, [reducerAllGift]);

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

  const handleFilter = () => {
    setflagFilter(prev => !prev);
  };

  const handeleFilter = (value, type) => {
    setstateFilter({
      [type]: value
    });
  };

  const handleSubmitFilter = () => {
    if (stateFilter.name === "" || stateFilter.name === " ") {
      alert("لطفا باکس را پر کنید");
    } else {
      setapiCallFlag(true);
      setTabs(true);
      setflagTextSearch(true);
      setFlagSearch(true);
    }
  };

  const handleSerchData = data => {
    setapiCallFlag(false);
  };
  const handleExit = () => {
    setflagFilter(false);
    setTabs(false);
    setflagTextSearch(false);
    setexit(prev => !prev);
    setstateFilter({
      name: ""
    });

    setFlagSearch(false);
    location.state = "";
  };

  return (
    <>
      <div
        // className="d-flex align-items-center justify-content-between flex-column"
        className={`d-flex align-items-center justify-content-between flex-column flex-lg-row ${classes.headerTitle}`}
      >
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
          <div className="d-flex align-items-center ">
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
      <div style={{ paddingTop: !reducerAllGift.load ? "4px" : "0" }}>
        {/*<div className="pl-3"> {reducerAllGift.load && <LinearProgress />}</div>*/}
        <Box className={"row d-flex m-0"}>
          <Box
            className={
              "col-lg-2  -3 d-flex flex-column align-content-between mb-5 mb-lg-0"
            }
          >
            <Category
              apiCallFlag={apiCallFlag}
              flagTextSearch={flagTextSearch}
              setflagTextSearch={setflagTextSearch}
              setTabs={setTabs}
              reducerGiftSubCategory={reducerGiftSubCategory}
              selectSubCategory={selectSubCategory}
              setSelectSubCatogory={setSelectSubCatogory}
              selectCategory={selectCategory}
              setSelectCategory={setSelectCategory}
              handelRout={handelRout}
            >
              {giftCategory => setcategory(giftCategory)}
            </Category>
          </Box>

          <Box
            className={`${"col-lg-10 p-0"} ${classes.media} bg-white rounded`}
          >
            {category && (
              <SubCategory
                reducerAllGift={reducerAllGift}
                exit={exit}
                dataSort={dataSort}
                tabs={tabs}
                category={category}
                stateFilter={stateFilter}
                apiCallFlag={apiCallFlag}
                handleExit={handleExit}
                setapiCallFlag={setapiCallFlag}
                handleSerchData={handleSerchData}
                location={location}
                reducerGiftSubCategory={reducerGiftSubCategory}
                selectCategory={selectCategory}
                setdataSort={setdataSort}
                selectSubCategory={selectSubCategory}
                flagSearch={flagSearch}
                stateHasMore={stateHasMore}
                setstateHasMore={setstateHasMore}
              />
            )}
          </Box>
        </Box>
      </div>
    </>
  );
}
