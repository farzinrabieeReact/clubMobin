import React, { useEffect } from "react";
import { Slider } from "./../../modules/home/home_select_slider";
import { PostsSelectLastpost } from "../../modules/posts/posts_select_lastpost";
import { useSubheader } from "../../../_metronic/layout";
import Styles from "./index.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  actionTypes,
} from "../../../redux/home/homeGift_select_activeGift";
import { useHistory } from "react-router-dom";
import BoxesWhite from "./BoxesWhite";
import BoxesColor from "./BoxesColor";
import GiftSlider from "./GiftSlider";

function Index() {
  const dispatch = useDispatch();
  const { push } = useHistory();
  const giftData = useSelector(state => state.homeGift_select_activeGift);
  const suhbeader = useSubheader();
  suhbeader.setTitle("باشگاه مشتریان کارگزاری مبین سرمایه");
  useEffect(() => {
    dispatch({ type: actionTypes.giftHomeSelectAsync });
  }, []);
  const handleClickAll = e => {
    e.preventDefault();
    push("/gift");
  };
  const handleClickGift = (e, name) => {
    push({
      pathname: "/gift",
      state: name
    });
  };

  return (
    <>
      <div className="row mb-5">
        <div className="col-12   col-md-12 col-lg-7">
          <Slider style={{ backgroundColor: "#E8EBEE" }} />
          <BoxesWhite />
          <BoxesColor />
        </div>
        <div className="col-lg-5 col-md-12 col-12 ">
          <PostsSelectLastpost
            height={Styles.heightPost}
            title="پست های اخیر"
            className="card-stretch gutter-b"
            paginationShow={true}
            home={true}
            data3={true}
            payload={{
              size: "12",
              filter: {
                parent_post_id: "null"
              }
            }}
          />
        </div>
      </div>
      <GiftSlider
        giftData={giftData}
        handleClickAll={handleClickAll}
        handleClickGift={handleClickGift}
      />
    </>
  );
}

export default Index;
