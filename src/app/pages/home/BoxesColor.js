import React from "react";
import Styles from "./index.module.css";
import { Link } from "react-router-dom";

const BoxesColor = () => {
  return (
    <>
      <div className="row mb-1">
        <div className="col-12 col-xl-5 col-md-12 pr-xl-0 mb-2">
          <Link to={"/courses"}>
            <div
              className={`${Styles.backCardBanafsh} card card-custom bgi-no-repeat bgi-size-cover rounded-lg`}
              // style={{
              //   backgroundImage: `url("${backgroundImageUrl}")`,
              // }}
            >
              {/* begin::Body */}
              <div
                style={{ width: "60px" }}
                className="pr-4 pt-4 d-flex flex-column align-items-start justify-content-start"
              >
                <div className="p-1 flex-grow-1">
                  {/*<h3 className="text-white font-weight-bolder line-height-lg mb-5">*/}

                  {/*  <br />*/}
                  {/*  With App*/}
                  {/*</h3>*/}
                  <div className="d-flex justify-content-center flex-column align-items-center">
                    <img
                      src={"/media/img/amoozesh.png"}
                      alt=""
                      className="mb-xl-3"
                      style={{ width: "40px", height: "auto" }}
                    />
                    <h2 style={{ color: "white", paddingRight: "10px" }}>
                      آموزش
                    </h2>
                  </div>
                </div>
              </div>
              {/* end::Body */}
            </div>
          </Link>
        </div>
        <div className="col-12 col-md-12 col-xl-7">
          <div className="d-flex flex-row flex-md-row flex-xl-column ">
            <div className="w-100 w-md-50 w-xl-100  pr-md-1 pr-xl-0 pr-1">
              <Link to={"/competitions"}>
                <div
                  className={`${Styles.backCardsoorati} card card-custom bgi-no-repeat bgi-size-cover rounded-lg mb-2`}
                  // style={{
                  //   backgroundImage: `url("${backgroundImageUrl}")`,
                  // }}
                >
                  {/* begin::Body */}
                  <div className="pr-4 pt-4 d-flex flex-column align-items-start justify-content-start">
                    <div className="p-1 flex-grow-1">
                      <div
                        style={{ width: "60px" }}
                        className="d-flex justify-content-center flex-column align-items-center"
                      >
                        <img
                          src={"/media/img/mosabeghat.png"}
                          alt=""
                          className="mb-xl-3"
                          style={{ width: "40px", height: "auto" }}
                        />
                        {/*<svg*/}
                        {/*  className="icon"*/}
                        {/*  style={{ width: "30px", height: "auto" }}*/}
                        {/*>*/}
                        {/*  <use xlinkHref="/svg/sprite.svg#yekcharomedayere-Firouzei"></use>*/}
                        {/*</svg>*/}
                        <h2 style={{ color: "white", paddingRight: "30px" }}>
                          مسابقات
                        </h2>
                      </div>
                    </div>
                  </div>
                  {/* end::Body */}
                </div>
              </Link>
            </div>

            <div className="w-100 w-md-50 w-xl-100 pl-md-1 pl-xl-0 pl-1">
              <Link
                to={{
                  pathname: "/stock/5",
                  state: { tabPanel: "Portfolio" }
                }}
              >
                <div
                  className={`${Styles.backCardAabi} card card-custom bgi-no-repeat bgi-size-cover rounded-lg`}
                  // style={{
                  //   backgroundImage: `url("${backgroundImageUrl}")`,
                  // }}
                >
                  {/* begin::Body */}
                  <div className="pr-4 pt-4 d-flex flex-column align-items-start justify-content-start">
                    <div className="p-1 flex-grow-1">
                      <div
                        style={{ width: "60px" }}
                        className="d-flex justify-content-center flex-column align-items-center"
                      >
                        <img
                          src={"/media/img/portfo2.png"}
                          alt=""
                          className="mb-xl-3"
                          style={{ width: "40px", height: "auto" }}
                        />
                        <h2
                          style={{
                            color: "white",
                            paddingRight: "60px",
                            whiteSpace: "nowrap"
                          }}
                        >
                          پرتفوی سهام
                        </h2>
                      </div>
                    </div>
                  </div>
                  {/* end::Body */}
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-6  col-md-6  col-lg-6  col-xl-3 pr-xl-0 mb-2 pr-1" >
          <Link
            to={{
              pathname: "/stock/1",
              state: { tabPanel: "changeBroker" }
            }}
          >
            <div
              className={`${Styles.backCardSabz} card card-custom bgi-no-repeat bgi-size-cover rounded-lg`}
              style={{ height: 120 }}
            >
              <div className="card-body  p-4">
                <span className={`svg-icon svg-icon-3x svg-icon`}>
                  <img src={"/media/img/nazer.png"} alt="" className="mb-3" />
                </span>
                <div
                  style={{ fontSize: "17px", color: "white" }}
                  className=" font-weight-bolder  "
                >
                  تغییر کارگزار ناظر
                </div>
              </div>
            </div>
          </Link>
        </div>
        <div className="col-6 col-md-6 col-lg-6 col-xl-3 pr-xl-0 mb-2 pl-1">
          <Link to={"/treemap"}>
            <div
              className={`${Styles.backCardSabzAbi} card card-custom bgi-no-repeat bgi-size-cover rounded-lg`}
              style={{ height: 120 }}
            >
              <div className="card-body p-4">
                <span className={`svg-icon svg-icon-3x svg-icon`}>
                  <img
                    src={"/media/img/naghsheBazar.png"}
                    alt=""
                    className="mb-3"
                  />
                </span>
                <div
                  style={{ fontSize: "17px", color: "white" }}
                  className=" font-weight-bolder  "
                >
                  نقشه بازار
                </div>
              </div>
            </div>
          </Link>
        </div>
        <div className="col-12  col-md-6  col-lg-6  col-xl-3 pr-xl-0 mb-2 pr-4 pr-md-1 pl-xl-1">
          <Link to={"/about"}>
            <div
              className={`${Styles.backCardNarenji} card card-custom bgi-no-repeat bgi-size-cover rounded-lg`}
              style={{ height: 120 }}
            >
              <div className="card-body p-4">
                <span className={`svg-icon svg-icon-3x svg-icon`}>
                  <img
                    src={"/media/img/kasbeEmtiaz.png"}
                    alt=""
                    className="mb-3"
                  />
                </span>
                <div
                  style={{ fontSize: "17px", color: "white" }}
                  className="font-weight-bolder"
                >
                  نحوه کسب امتیاز
                </div>
              </div>
            </div>
          </Link>
        </div>
        <div className="col-12  col-md-6  col-lg-6  col-xl-3 pl-4 pl-md-1">
          <Link to={"/ipo"}>
            <div
              className={`${Styles.backCardghermez} card card-custom bgi-no-repeat bgi-size-cover rounded-lg`}
              style={{ height: 120 }}
            >
              <div className="card-body p-4">
                <span className={`svg-icon svg-icon-3x svg-icon`}>
                  <img src={"/media/img/ipo.png"} alt="" className="mb-3" />
                </span>
                <div
                  style={{ fontSize: "17px", color: "white" }}
                  className=" font-weight-bolder  "
                >
                  عرضه اولیه
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default BoxesColor;
