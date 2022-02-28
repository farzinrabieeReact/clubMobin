import React from "react";
import Styles from "./index.module.css";
import { convertNumberToPersian } from "../../common/method/convertDigitToEnglish";
import { Swiper, SwiperSlide } from "swiper/react";
import { CircularProgress, LinearProgress } from "@material-ui/core";

const GiftSlider = ({ giftData, handleClickAll, handleClickGift }) => {
  return (
    <>
      <div className="row">
        <div className="col">
          <div className={Styles.gift}>
            <div
              className={`${Styles.slider} row flex-column-reverse flex-lg-row mt-10 mb-10 d-flex justify-content-around`}
            >
              <div className="col-md-12 col-lg-2 col-12 d-flex justify-content-between flex-column align-items-center my-10 my-lg-0">
                {giftData.load && (
                  <div>
                    <CircularProgress size={30} />
                  </div>
                )}
                <div
                  className="d-lg-flex flex-column d-none align-items-center mx-auto"
                  style={{ width: "100%" }}
                >
                  <span
                    className="mb-5 d-none d-lg-block"
                    style={{
                      color: "white",
                      fontSize: "22px",
                      fontWeight: "bold"
                    }}
                  >
                    جدیدترین جوایز
                  </span>

                  <img
                    src={"/media/img/backPIc-removebg-preview.png"}
                    alt=""
                    style={{ maxWidth: "80%", height: "auto" }}
                  />
                </div>
                <a className={Styles.giftBtn} onClick={handleClickAll} href="">
                  نمایش همه
                </a>
              </div>
              <div className="col-12 col-md-12 col-lg-10 p-0 mb-5 mb-lg-0">
                <Swiper
                  breakpoints={{
                    320: {
                      slidesPerView: 1
                    },
                    768: {
                      slidesPerView: 2
                    },
                    992: {
                      slidesPerView: 3
                    },
                    1200: {
                      slidesPerView: 4
                    },
                    1600: {
                      slidesPerView: 5
                    }
                    // when window width is >= 768px
                  }}
                  slidesPerView={4}
                  spaceBetween={5}
                  className="mySwiper"
                >
                  {/*{giftData.load && (*/}
                  {/*  <div>*/}
                  {/*    <LinearProgress />*/}
                  {/*  </div>*/}
                  {/*)}*/}

                  {giftData.data.map((itm, ind) => (
                    <SwiperSlide
                      key={ind}
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        cursor: "pointer"
                      }}
                    >
                      <div
                        onClick={e => handleClickGift(e, itm.body.name)}
                        className={`${Styles.card} card rounded-lg shadow`}
                      >
                        <div
                          className="p-2 mx-auto"
                          style={{ width: "170px", height: "170px" }}
                        >
                          <img
                            src={`${
                              itm.body.image
                                ? "data:image/jpeg;base64," + itm.body.image
                                : "/media/img/defaultGift.jpg"
                            }`}
                            alt=""
                            width="100%"
                            height="100%"
                          />
                        </div>
                        <div
                          className="card-footer p-3 d-flex justify-content-between w-100  align-items-center"
                          style={{ border: "unset" }}
                        >
                          <div className={Styles.textSlider}>
                            {" "}
                            <span
                              className={Styles.textSlider}
                              style={{
                                width: "180px",
                                fontSize: "12px",
                                fontWeight: "bold"
                              }}
                            >
                              {itm.body.name}
                            </span>
                          </div>
                          <div>
                            {" "}
                            <span style={{ color: "orange" }}>
                              {convertNumberToPersian(itm.body.required_bonus)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
              <div className="pl-5 mb-10 d-flex d-lg-none justify-content-between ">
                <div className="d-flex align-items-center">
                  <span
                    style={{
                      color: "white",
                      fontSize: "22px",
                      fontWeight: "bold"
                    }}
                  >
                    جدیدترین جوایز
                  </span>
                </div>
                <div>
                  <img
                    src={"/media/img/backPIc-removebg-preview.png"}
                    alt=""
                    style={{ width: "120px", height: "auto" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GiftSlider;
