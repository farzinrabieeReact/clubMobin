import React from "react";
import Styles from "../index.module.scss";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import MyPdf1 from "../../stepThree/pdf/padf1";
import MyPdf2 from "../../stepThree/pdf/pdf2";
import MyPdf3 from "../../stepThree/pdf/pdf3";
import MyPdf4 from "../../stepThree/pdf/pdf4";

const StepTwoContractual = ({ sejamInfoState }) => {
  return (
    <>
      <div className="d-flex flex-column w-100 pr-5 border-bottom pb-5 pt-5">
        {/* <PDFViewer width={1100} height={1000}>
          <MyPdf4 />
        </PDFViewer> */}
        <div className="d-flex justify-content-between">
          <div className="d-flex align-items-center">
            <span className={Styles["stepTwo-contractual-circle"]}>1</span>
            <div
              style={{ marginRight: 10 }}
              className={Styles["contractual-text"]}
            >
              مشخصات - فرم مشخصات (حقیقی)
            </div>
          </div>
          <div className="d-flex align-items-center">
            <div className="d-none d-md-block mx-0 mx-md-3">
              نمایش قراردادها
            </div>
            <PDFDownloadLink
              document={<MyPdf4 sejamInfoState={sejamInfoState} />}
              fileName="contractual1.pdf"
            >
              {({ blob, url, loading, error }) => (
                <img
                  src="/media/authCustomer/writing@2x.png"
                  style={{ width: 15, height: 17 }}
                  alt=""
                />
              )}
            </PDFDownloadLink>

            {/* <img
              src="/media/authCustomer/writing@2x.png"
              style={{ width: 15, height: 17 }}
              alt=""
            /> */}
          </div>
        </div>
      </div>
      <div className="d-flex flex-column w-100 pr-5 border-bottom pb-5 pt-5">
        <div className="d-flex justify-content-between">
          <div className="d-flex align-items-center">
            <span className={Styles["stepTwo-contractual-circle"]}>2</span>
            <div
              style={{ marginRight: 10 }}
              className={Styles["contractual-text"]}
            >
              آنلاین - فرم معاملات آنلاین
            </div>
          </div>
          <div className="d-flex align-items-center">
            <div className="d-none d-md-block mx-0 mx-md-3">
              نمایش قراردادها
            </div>
            <PDFDownloadLink
              document={<MyPdf3 sejamInfoState={sejamInfoState} />}
              fileName="contractual2.pdf"
            >
              {({ blob, url, loading, error }) => (
                <img
                  src="/media/authCustomer/writing@2x.png"
                  style={{ width: 15, height: 17 }}
                  alt=""
                />
              )}
            </PDFDownloadLink>
          </div>
        </div>
      </div>
      <div className="d-flex flex-column w-100 pr-5 border-bottom pb-5 pt-5">
        <div className="d-flex justify-content-between">
          <div className="d-flex align-items-center">
            <span className={Styles["stepTwo-contractual-circle"]}>3</span>
            <div
              style={{ marginRight: 10 }}
              className={Styles["contractual-text"]}
            >
              آفلاین - فرم معاملات آفلاین
            </div>
          </div>
          <div className="d-flex align-items-center">
            <div className="d-none d-md-block mx-0 mx-md-3">
              نمایش قراردادها
            </div>
            <PDFDownloadLink
              document={<MyPdf2 sejamInfoState={sejamInfoState} />}
              fileName="contractual3.pdf"
            >
              {({ blob, url, loading, error }) => (
                <img
                  src="/media/authCustomer/writing@2x.png"
                  style={{ width: 15, height: 17 }}
                  alt=""
                />
              )}
            </PDFDownloadLink>
          </div>
        </div>
      </div>
      <div className="d-flex flex-column w-100 pr-5 border-bottom pb-5 pt-5">
        <div className="d-flex justify-content-between">
          <div className="d-flex align-items-center">
            <span className={Styles["stepTwo-contractual-circle"]}>4</span>
            <div
              style={{ marginRight: 10 }}
              className={Styles["contractual-text"]}
            >
              ریسک - پذیرش ریسک
            </div>
          </div>
          <div className="d-flex align-items-center">
            <div className="d-none d-md-block mx-0 mx-md-3">
              نمایش قراردادها
            </div>
            <PDFDownloadLink document={<MyPdf1 />} fileName="contractual4.pdf">
              {({ blob, url, loading, error }) => (
                <img
                  src="/media/authCustomer/writing@2x.png"
                  style={{ width: 15, height: 17 }}
                  alt=""
                />
              )}
            </PDFDownloadLink>
          </div>
        </div>
      </div>
      <div className="d-flex flex-column w-100 pr-5 pb-5 pt-5 mb-3">
        <div className="d-flex justify-content-between">
          <div className="d-flex align-items-center">
            <span className={Styles["stepTwo-contractual-circle"]}>5</span>
            <div
              style={{ marginRight: 10 }}
              className={Styles["contractual-text"]}
            >
              صندوق سرمایه گذاری مشترک
            </div>
          </div>
          <div className="d-flex align-items-center">
            <div className="d-none d-md-block mx-0 mx-md-3">
              نمایش قراردادها
            </div>
            <a href="/media/authCustomer/page-010.jpg" download>
              <img
                src="/media/authCustomer/writing@2x.png"
                style={{ width: 15, height: 17 }}
                alt=""
              />
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default StepTwoContractual;
