import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core";
import { distinctMethod } from "../../../../common/method/distinctMethod";
import { useDispatch, useSelector } from "react-redux";
import { actionTypes } from "../../../../../redux/gift/git_select_activeCategories";

const useStyles = makeStyles(() => ({
  list: {
    listStyle: "none",
    textAlign: "center",
    width: "100%",
    padding: 0,
    height: "500px",
    paddingTop: "10px",
    ["@media (min-width:992px)"]: {
      height: "750px"
    },
    "& > li": {
      height: 40,
      display: "flex",
      alignItems: "center",
      padding: " 0px 10px",
      borderRadius: 8,
      marginBottom: 3,

      "&:hover": {
        backgroundColor: "#ff5f00",
        color: "white",
        opacity: 0.8,
        cursor: "pointer"
      }
    }
  },
  active: {
    backgroundColor: "#ff5f00",
    color: "white"
  }
}));

export default function Index({
  children,
  handelRout,
  setFlagTab,
  flagTab,
  category
}) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [state, setstate] = useState([]);
  const [selectCategory, setSelectCategory] = useState();
  const [defaultSelectItem, setDefaultSelectItems] = useState({});

  let reducerGiftActiveCategoris = useSelector(
    state => state.reducergiftSelectActiveCategorisList
  );

  useEffect(() => {
    dispatch({ type: actionTypes.giftSelectActiveCategorisAsync });
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (selectCategory) children(selectCategory);
  }, [selectCategory]); //eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (reducerGiftActiveCategoris.data) {
      let distinc = distinctMethod(reducerGiftActiveCategoris.data, [
        "body",
        "gift_category"
      ]);
      setstate(distinc);
      setSelectCategory(reducerGiftActiveCategoris.data[0]?.body.gift_category);
    }
  }, [reducerGiftActiveCategoris.data]);
  const handleClickSelectCategory = item => {
    setSelectCategory(item);
  };

  return (
    <ul
      className={`${classes.list} bg-white rounded rounded d-flex flex-column justify-content-between m-0`}
    >
      <div>
        {" "}
        {!flagTab ? (
          state
            .filter(itm => itm !== "null" && itm.trim() !== "")
            .map(
              (item, index) => (
                <>
                  <div
                    style={{ cursor: "pointer" }}
                    onClick={() => handleClickSelectCategory(item)}
                  >
                    <p
                      style={{ color: category === item ? "#ff5f00" : "" }}
                      className={
                        category === item ? "shadow p-3 rounded" : "p-3"
                      }
                    >
                      {item}
                    </p>
                  </div>
                </>
              )
              // return (
              //   <li
              //     key={index}
              //     className={
              //       defaultSelectItem.index === index ? classes["active"] : " "
              //     }
              //     onClick={() =>
              //       setDefaultSelectItems({ index: index, gift_category: item })
              //     }
              //   >
              //     {item}
              //   </li>
              // );
            )
        ) : (
          <div style={{ cursor: "pointer" }}>
            <p style={{ color: "#ff5f00" }} className="shadow rounded p-3">
              جستجو در تمامی موارد
            </p>
          </div>
        )}
      </div>
      <div className="mb-3">
        <button className="btn backGroundOrangeOutLine" onClick={handelRout}>
          لیست درخواست‌ها
        </button>
      </div>
    </ul>
  );
}
