import React, { useEffect, useState } from "react";

import { makeStyles, Typography } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { actionTypes } from "../../../../../redux/gift/git_select_activeCategories";
import { actionTypes as actionTypesSubCategory } from "../../../../../redux/gift/gift_select_activeSubCategory";

import { Accordion, Card } from "react-bootstrap";
import { actionTypes as actionTypesActiveGift } from "../../../../../redux/gift/gift_select_activeGift";
import { KeyboardArrowDown, KeyboardArrowLeft } from "@material-ui/icons";

const useStyles = makeStyles(() => ({
  list: {
    listStyle: "none",
    textAlign: "center",
    width: "100%",
    margin: 0,
    padding: 0,
    height: "500px",
    overflow: "auto",
    backgroundColor: "white",
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
let flag = false;
export default function Index({
  children,
  flagTextSearch,
  reducerGiftSubCategory,
  setSelectSubCatogory,
  selectSubCategory,
  setSelectCategory,
  selectCategory,
  handelRout
}) {
  const classes = useStyles();
  let dispatch = useDispatch();

  const [subCategory, setSubCategory] = useState([]);
  const [selectkey, setselectkey] = useState();
  const [selectId, setSelectId] = useState();

  const [state, setstate] = useState([]);
  const [defaultSelectItem, setDefaultSelectItems] = useState({
    index: 0,
    gift_category: null
  });
  let reducerGiftCategory = useSelector(
    state => state.reducergiftSelectActiveCategorisList
  );

  useEffect(() => {
    dispatch({ type: actionTypes.giftSelectActiveCategorisAsync });
    return () => {
      flag = false;
    };
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (defaultSelectItem.gift_category) children(defaultSelectItem);
  }, [defaultSelectItem]); //eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (reducerGiftCategory.data) {
      setstate(reducerGiftCategory.data);
      setDefaultSelectItems({
        index: 0,
        gift_category: reducerGiftCategory.data[0]?.body.gift_category
      });
    }
  }, [reducerGiftCategory]);

  useEffect(() => {
    if (reducerGiftSubCategory.data.length !== 0) {
      setSubCategory(reducerGiftSubCategory.data);
    }
  }, [reducerGiftSubCategory.data]);
  useEffect(() => {
    if (flag) {
      if (!selectCategory) {
        let data = {};
        dispatch({
          type: actionTypesActiveGift.giftSelectActiveListAsync,
          payload: data
        });
        setSelectSubCatogory({});
      } else {
        let data = {
          gift_category: selectCategory
        };
        let dataActiveGift = {
          data: { gift_category: selectCategory }
        };

        dispatch({
          type: actionTypesSubCategory.giftSelectActiveSubCategoryAsync,
          payload: data
        });
        dispatch({
          type: actionTypesActiveGift.giftSelectActiveListAsync,
          payload: dataActiveGift
        });
      }
      setSelectSubCatogory();
    }

    flag = true;
  }, [selectCategory]);

  const handleClick = item => {
    if (!item) {
      setselectkey(null);
    }
    setSelectCategory(item?.body?.gift_category);
  };

  const handleClickSubCategory = (e, item, itm, id) => {
    e.stopPropagation();
    setSelectSubCatogory(item);
    // setSelectCategory(itm);
    setSelectId(id);
    // setSelectSubCatogory()
    let data = {
      data: { gift_category: itm, gift_sub_category: item }
    };

    dispatch({
      type: actionTypesActiveGift.giftSelectActiveListAsync,
      payload: data
    });
  };
  const handleSelect = e => {
    setselectkey(e);
  };
  return (
    <ul
      className={`${classes["list"]} rounded d-flex flex-column justify-content-between`}
    >
      {!flagTextSearch && (
        <>
          <div>
            <div
              className="d-flex justify-content-center w-100"
              style={{ paddingLeft: "16px" }}
              onClick={() => handleClick(undefined)}
            >
              <span
                style={{
                  color: selectCategory === undefined ? "#ff5f00" : null,
                  cursor: "pointer"
                }}
              >
                همه
              </span>
            </div>
            <Accordion
              defaultActiveKey="0"
              onSelect={e => handleSelect(e)}
              activeKey={selectkey}
            >
              {state
                .filter(
                  itm =>
                    itm.body?.gift_category !== "null" &&
                    itm.body?.gift_category.trim() !== ""
                )
                .map((itm, ind) => (
                  <Card
                    onClick={() => handleClick(itm)}
                    style={{ border: "0" }}
                  >
                    <Accordion.Toggle
                      as={Card.Header}
                      eventKey={itm.id}
                      style={{
                        padding: "7px 10px",
                        color:
                          selectCategory === itm.body.gift_category
                            ? "#ff5f00"
                            : null,

                        backgroundColor: "white",
                        border: "0 !important"
                      }}
                      className="d-flex"
                    >
                      <span className="w-100"> {itm?.body?.gift_category}</span>
                      <div>
                        {" "}
                        {selectCategory === itm.body.gift_category ? (
                          <KeyboardArrowDown />
                        ) : (
                          <KeyboardArrowLeft />
                        )}
                      </div>
                    </Accordion.Toggle>
                    {!reducerGiftSubCategory.loading && (
                      <>
                        {subCategory?.map((item, index) => (
                          <Accordion.Collapse
                            eventKey={itm.id}
                            onClick={e =>
                              handleClickSubCategory(
                                e,
                                item?.body?.gift_sub_category,
                                itm?.body?.gift_category
                              )
                            }
                            className={
                              selectSubCategory === item.body.gift_sub_category
                                ? " rounded"
                                : null
                            }
                            style={{
                              color:
                                selectSubCategory ===
                                item.body.gift_sub_category
                                  ? "#ff5f00"
                                  : "",
                              cursor: "pointer"
                            }}
                          >
                            <Card.Body className="p-2">
                              <span
                                className={
                                  selectSubCategory ===
                                  item.body.gift_sub_category
                                    ? "shadow rounded w-100 h-30px d-flex justify-content-center align-items-center"
                                    : null
                                }
                              >
                                {" "}
                                {item?.body?.gift_sub_category.split(":")[0]}
                              </span>
                            </Card.Body>
                          </Accordion.Collapse>
                        ))}
                      </>
                    )}
                  </Card>
                ))}
            </Accordion>
          </div>
        </>
      )}
      {flagTextSearch && (
        <li className={classes["active"]}>جستجو در تمامی جوایز</li>
      )}
      <div className="mb-3">
        <button className="btn backGroundOrangeOutLine" onClick={handelRout}>
          لیست درخواست‌ها
        </button>
      </div>
      {/* {flagTextSearch ? <li className={classes["active"]}>جستجو در تمام جوایز</li> : null} */}
    </ul>
  );
}
