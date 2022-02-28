/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid,jsx-a11y/img-redundant-alt */
import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core";

let useStyles = makeStyles({
  root: {
    // minWidth: 320
  },
  tableDem: {
    color: "#64A51C"
    // backgroundColor: 'rgba(0,255,0,0.1)',
  },
  tableOf: {
    color: "#F86879"
    // backgroundColor: 'rgba(255,0,0,0.1)',
  }
});
export default function AdvanceTablesWidget4({ ls, isin }) {
  let classes = useStyles();

  let defaultData = {
    Dem: [
      { p: "0", c: "0", v: "0" },
      { p: "0", c: "0", v: "0" },
      { p: "0", c: "0", v: "0" }
    ],
    Of: [
      { p: "0", c: "0", v: "0" },
      { p: "0", c: "0", v: "0" },
      { p: "0", c: "0", v: "0" }
    ]
  };

  const [state, setstate] = useState(defaultData);

  useEffect(() => {
    if (isin) {
      setstate(defaultData);
    }
  }, [isin]); //eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (ls.length > 0) {
      let data = {
        Dem: [
          { c: ls[2] ? ls[2] : '-', v: ls[3] ? ls[3] : '-', p: ls[4]  ? ls[4] : '-'},
          { c: ls[5] ? ls[5] : '-', v: ls[6] ? ls[6] : '-', p: ls[7]  ? ls[7] : '-'},
          { c: ls[8] ? ls[8] : '-', v: ls[9] ? ls[9] : '-', p: ls[10] ? ls[10] : '-'},
        ],
        Of: [
          { v: ls[11] ? ls[11] : '-', p: ls[12] ? ls[12] : '-', c: ls[13] ? ls[13] : '-' },
          { v: ls[14] ? ls[14] : '-', p: ls[15] ? ls[15] : '-', c: ls[16] ? ls[16] : '-' },
          { v: ls[17] ? ls[17] : '-', p: ls[18] ? ls[18] : '-', c: ls[19] ? ls[19] : '-' },
        ]
      };

      setstate(data);
    }
  }, [ls]); //eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className={`card card-custom ${classes["root"]} rounded-lg`}>
      {/* Head */}
      <div className="card-header border-0 py-5">
        <h3 className="card-title align-items-start flex-column">عمق بازار</h3>
      </div>
      {/* Body */}
      <div className="card-body p-0 p-md-2">
        <div className="tab-content">
          <div className="table-responsive d-flex">
            <table
              className={`table table-head-custom table-head-bg table-borderless table-vertical-center ${classes["tableDem"]}`}
            >
              <thead>
                <tr className="text-center text-uppercase">
                  <th style={{ minWidth: "100px" }}>تعداد</th>
                  <th style={{ minWidth: "100px" }}>
                    <div
                      className={
                        "d-flex justify-content-between align-items-center mt-3"
                      }
                    >
                      <p>حجم</p>
                      <p>قیمت</p>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {state.Dem.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td className="pl-0 py-8">
                        <div className="d-flex align-items-center text-center">
                          <div className={"text-center w-100"}>
                            <span className="font-weight-bolder d-block font-size-lg">
                              {item.c}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className={"text-center"}>
                        <div
                          className={
                            "d-flex justify-content-between align-items-center mt-3"
                          }
                        >
                          <p>{item.v}</p>
                          <p>{item.p}</p>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            <table
              className={`table table-head-custom table-head-bg table-borderless table-vertical-center ${classes["tableOf"]}`}
            >
              <thead>
                <tr className="text-center text-uppercase">
                  <th style={{ minWidth: "100px" }}>
                    <div
                      className={
                        "d-flex justify-content-between align-items-center mt-3 pl-5"
                      }
                    >
                      <p>حجم</p>
                      <p>قیمت</p>
                    </div>
                  </th>
                  <th style={{ minWidth: "100px" }}>تعداد</th>
                </tr>
              </thead>
              <tbody>
                {state.Of.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td className={"text-center"}>
                        <div
                          className={
                            "d-flex justify-content-between align-items-center mt-3 pl-5"
                          }
                        >
                          <p>{item.v}</p>
                          <p>{item.p}</p>
                        </div>
                      </td>
                      <td className={"text-center"}>
                        <div className="d-flex align-items-center text-center">
                          <div className={"text-center w-100 "}>
                            <span className="font-weight-bolder d-block font-size-lg">
                              {item.c}
                            </span>
                          </div>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
