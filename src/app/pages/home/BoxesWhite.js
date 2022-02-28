import React from "react";
import Styles from "./index.module.css";

const BoxesWhite = () => {
  return (
    <>
      <div className="row mb-8 p-2">
        <div className="col-6  col-lg-6 col-xl-3 mb-2 mb-md-2 mb-xl-0 p-2">
          <a href="https://online.mobinsb.ir" target="_blank" rel="noopener noreferrer">
            <div
              className={`${Styles.redCard} card  rounded-lg shadow `}
              style={{ height: 120, overflow: "hidden" }}
            >
              <div className="p-5">
                <span className={`svg-icon svg-icon-3x svg-icon`}>
                  <img src={"/media/img/onlinePLus.png"} alt="" />
                </span>
                <div
                 
                  className={`${Styles['text-font']} text-dark font-weight-bolder  mt-3`}
                >
                  آنلاین پلاس
                </div>
              </div>
              <div className={Styles.pos}>
                <svg className="icon" style={{ width: "30px", height: "auto" }}>
                  <use xlinkHref="/svg/sprite.svg#yekcharomedayere-ghermez"></use>
                </svg>
              </div>
            </div>
          </a>
        </div>
        <div className="col-6  col-lg-6 col-xl-3 mb-2 mb-md-2 mb-xl-0  p-2">
          <a
            href=" https://smart.mobinsb.ir/login?returnUrl=%2F"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div
              className={`${Styles.aquaCard} card  rounded-lg  shadow`}
              style={{ height: 120, overflow: "hidden" }}
            >
              <div className="p-5">
                {/*<img src={"/media/img/smart.png"} alt="" />*/}
                <svg
                  className="icon"
                  style={{
                    width: "23px",
                    height: "26px",
                    fill: "#2c5399"
                  }}
                >
                  <use xlinkHref="/svg/sprite.svg#logo smart"></use>
                </svg>

                <div
                  className={`${Styles['text-font']} text-dark font-weight-bolder  mt-3`}
                >
                  سامانه اسمارت
                </div>
              </div>
              <div className={Styles.pos}>
                <svg
                  className="icon"
                  style={{ width: "30px", height: "auto", fill: "#2c5399" }}
                >
                  <use xlinkHref="/svg/sprite.svg#smartonline"></use>
                </svg>
              </div>
            </div>
          </a>
        </div>
        <div className="col-6  col-lg-6 col-xl-3 mb-2 mb-md-2 mb-xl-0  p-2">
          <a href="https://fund.mobinsb.ir/" target="_blank" rel="noopener noreferrer">
            <div
              className={`${Styles.banafshCard} card  rounded-lg  shadow`}
              style={{ height: 120, overflow: "hidden" }}
            >
              <div className="p-5">
                <span className={`svg-icon svg-icon-3x svg-icon`}>
                  <img src={"/media/img/sandogh.png"} alt="" />
                </span>
                <div
                 className={`${Styles['text-font']} text-dark font-weight-bolder  mt-3`}
                >
                  صندوق سرمایه‌گذاری
                </div>
              </div>
              <div className={Styles.pos}>
                <svg className="icon" style={{ width: "30px", height: "auto" }}>
                  <use xlinkHref="/svg/sprite.svg#yekcharomedayere-banafsh"></use>
                </svg>
              </div>
            </div>
          </a>
        </div>
        <div className="col-6  col-lg-6 col-xl-3 mb-2 mb-md-2 mb-xl-0  p-2">
          <a href="https://coinonline.mobinsb.com/" target="_blank" rel="noopener noreferrer">
            <div
              className={`${Styles.abiCard} card  rounded-lg shadow`}
              style={{ height: 120, overflow: "hidden" }}
            >
              <div className="p-5">
                <span className={`svg-icon svg-icon-3x svg-icon`}>
                  <img src={"/media/img/moamelat.png"} alt="" />
                </span>
                <div
                  className={`${Styles['text-font']} text-dark font-weight-bolder  mt-3`}
                >
                  معاملات آتی
                </div>

                {/*<a*/}
                {/*  href="#"*/}
                {/*  className="text-muted text-hover-primary font-weight-bold font-size-lg mt-1"*/}
                {/*>*/}
                {/*  New Customers*/}
                {/*</a>*/}
              </div>
              <div className={Styles.pos}>
                <svg className="icon" style={{ width: "30px", height: "auto" }}>
                  <use xlinkHref="/svg/sprite.svg#aquasv"></use>
                </svg>
              </div>
            </div>
          </a>
        </div>
      </div>
    </>
  );
};

export default BoxesWhite;
