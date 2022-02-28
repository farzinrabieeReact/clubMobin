/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from "react";
import SVG from "react-inlinesvg";
import { Dropdown } from "react-bootstrap";
import styles from "./index.module.scss";

// import { toAbsoluteUrl } from "../../../_helpers";

export default function CreaditList({ className }) {
  return (
    <>
      <div className={`card card-custom ${className}`}>
        {/* Header */}
        {/* <div className="card-header border-0">


          <div className="card-toolbar">
          
          </div>
        </div> */}
        

        {/* Body */}
        <div className={`card-body ${styles["card-flex"]}`}>
          {/* <div className={`d-flex align-items-center mb-9 ${styles["bg-light-gray"]} rounded p-5`}>
            <span className="svg-icon svg-icon-warning mr-5 svg-icon-lg">
              <SVG
                // src={toAbsoluteUrl("/media/svg/icons/Home/Library.svg")}
              ></SVG>
            </span>

            <div className="d-flex flex-column flex-grow-1 mr-2">
              <a
                href="#"
                className="font-weight-bold text-dark-75 text-hover-primary font-size-lg mb-1"
              >
                Group lunch celebration
              </a>
              <span className="text-muted font-weight-bold">Due in 2 Days</span>
            </div>

            <span className="font-weight-bolder text-warning py-1 font-size-lg">
              +28%
            </span>
          </div>

          <div className={`d-flex align-items-center rounded p-5 mb-9 ${styles["bg-light-gray"]}`}>
            <span className="svg-icon svg-icon-success mr-5 svg-icon-lg">
              <SVG
                // src={toAbsoluteUrl("/media/svg/icons/Communication/Write.svg")}
              ></SVG>
            </span>
            <div className="d-flex flex-column flex-grow-1 mr-2">
              <a
                href="#"
                className="font-weight-bold text-dark-75 text-hover-primary font-size-lg mb-1"
              >
                Home navigation optimization
              </a>
              <span className="text-muted font-weight-bold">Due in 2 Days</span>
            </div>

            <span className="font-weight-bolder text-success py-1 font-size-lg">
              +50%
            </span>
          </div>

          <div className={`d-flex align-items-center rounded p-5 mb-9 ${styles["bg-light-gray"]}`}>
            <span className="svg-icon svg-icon-danger mr-5 svg-icon-lg">
              <SVG
                // src={toAbsoluteUrl(
                //   "/media/svg/icons/Communication/Group-chat.svg"
                // )}
              ></SVG>
            </span>

            <div className="d-flex flex-column flex-grow-1 mr-2">
              <a
                href="#"
                className="font-weight-bold text-dark-75 text-hover-primary font-size-lg mb-1"
              >
                Rebrand strategy planning
              </a>
              <span className="text-muted font-weight-bold">Due in 2 Days</span>
            </div>

            <span className="font-weight-bolder text-danger py-1 font-size-lg">
              -27%
            </span>
          </div> */}

          <div
            className={`d-flex align-items-center rounded p-5 my-4 ${styles["bg-light-gray"]}`}
          >
            <span className="svg-icon svg-icon-info mr-5 svg-icon-lg">
              <SVG
              // src={toAbsoluteUrl("/media/svg/icons/General/Attachment2.svg")}
              ></SVG>
            </span>

            <div className="d-flex flex-column flex-grow-1 mr-2">
              <span className="font-weight-bold text-dark-75 font-size-lg mb-1">
                میانگین اعتبارات
              </span>
              {/* <span className="text-muted font-weight-bold">Due in 2 Days</span> */}
            </div>

            <span
              className={`font-weight-bolder py-1 font-size-lg font-weight-bold ${styles["text-light-color"]}`}
            >
              5555555555
            </span>
          </div>
          <div
            className={`d-flex align-items-center rounded p-5 my-4 ${styles["bg-light-gray"]}`}
          >
            <span className="svg-icon svg-icon-info mr-5 svg-icon-lg">
              <SVG
              // src={toAbsoluteUrl("/media/svg/icons/General/Attachment2.svg")}
              ></SVG>
            </span>

            <div className="d-flex flex-column flex-grow-1 mr-2">
              <span className="font-weight-bold text-dark-75 font-size-lg mb-1">
                بیشترین اعتبار
              </span>
              {/* <span className="text-muted font-weight-bold">Due in 2 Days</span> */}
            </div>

            <span
              className={`font-weight-bolder py-1 font-size-lg font-weight-bold ${styles["text-light-color"]}`}
            >
              5555555555
            </span>
          </div>
          <div
            className={`d-flex align-items-center rounded p-5 my-4 ${styles["bg-light-gray"]}`}
          >
            <span className="svg-icon svg-icon-info mr-5 svg-icon-lg">
              <SVG
              // src={toAbsoluteUrl("/media/svg/icons/General/Attachment2.svg")}
              ></SVG>
            </span>

            <div className="d-flex flex-column flex-grow-1 mr-2">
              <span className="font-weight-bold text-dark-75 font-size-lg mb-1">
                کمترین اعتبار
              </span>
              {/* <span className="text-muted font-weight-bold">Due in 2 Days</span> */}
            </div>

            <span
              className={`font-weight-bolder py-1 font-size-lg font-weight-bold ${styles["text-light-color"]}`}
            >
              5555555555
            </span>
          </div>
          <div
            className={`d-flex align-items-center rounded p-5 my-4 ${styles["bg-light-gray"]}`}
          >
            <span className="svg-icon svg-icon-info mr-5 svg-icon-lg">
              <SVG
              // src={toAbsoluteUrl("/media/svg/icons/General/Attachment2.svg")}
              ></SVG>
            </span>

            <div className="d-flex flex-column flex-grow-1 mr-2">
              <span className="font-weight-bold text-dark-75 font-size-lg mb-1">
                تعداد کل اعتبارات
              </span>
              {/* <span className="text-muted font-weight-bold">Due in 2 Days</span> */}
            </div>

            <span
              className={`font-weight-bolder py-1 font-size-lg font-weight-bold ${styles["text-light-color"]}`}
            >
              5555555555
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
