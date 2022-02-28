import { makeStyles } from "@material-ui/core";
import React from "react";

let useStyles = makeStyles(() => ({
  parent: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
  },
}));



const PaginationHadaf = ({ pagination ,handlePagiPrev,handlePagiNext,documentReducer,handlePagiNextDouble,handlePagiPrevDouble}) => {
  const classes = useStyles();


  return (
    <>
      <div className={classes.parent}>
        <div className="d-flex mt-5 ">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 16 16"
              onClick={handlePagiPrevDouble}
              style={pagination.number === 1 ? { color: "lightgray" }:{color:'black',cursor:'pointer'}}
              className={pagination.number === 1 ? "bi bi-chevron-double-right disabled" : "bi bi-chevron-double-right"}
            >
              <path
                fill-rule="evenodd"
                d="M3.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L9.293 8 3.646 2.354a.5.5 0 0 1 0-.708z"
              />
              <path
                fill-rule="evenodd"
                d="M7.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L13.293 8 7.646 2.354a.5.5 0 0 1 0-.708z"
              />
            </svg>
          </div>
          <div className="me-4 ms-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 16 16"
              style={{ color: "blue" }}
              id="btn_prev"
              onClick={handlePagiPrev}
              style={pagination.number === 1 ? { color: "lightgray" }:{color:'black',cursor:'pointer'}}
              className={pagination.number === 1 ? "bi bi-chevron-right disabled" : "bi bi-chevron-right"}
            >
              <path
                fill-rule="evenodd"
                d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
              />
            </svg>
          </div>
          <div style={{ fontSize: 16 }}>{`صفحه ${pagination.number} از ${Math.ceil(documentReducer.total/10)}`}</div>
          <div className="me-4 ms-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 16 16"
              style={{color:'black'}}
              id="btn_next"
              onClick={handlePagiNext}
              // className={activeNext? "disabled" : ""}
              style={pagination.number === Math.ceil(documentReducer.total/10) ? { color: "lightgray" }:{color:'black',cursor:'pointer'}}
              className={pagination.number === Math.ceil(documentReducer.total/10) ? "bi bi-chevron-left disabled" : "bi bi-chevron-left"}
            >
              <path
                fill-rule="evenodd"
                d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
              />
            </svg>
          </div>

          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 16 16"
              onClick={handlePagiNextDouble}
              style={pagination.number === Math.ceil(documentReducer.total/10) ? { color: "lightgray" }:{color:'black',cursor:'pointer'}}
              className={pagination.number === Math.ceil(documentReducer.total/10) ? "bi bi-chevron-double-left disabled" : "bi bi-chevron-double-left"}
            >
              <path
                fill-rule="evenodd"
                d="M8.354 1.646a.5.5 0 0 1 0 .708L2.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
              />
              <path
                fill-rule="evenodd"
                d="M12.354 1.646a.5.5 0 0 1 0 .708L6.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
              />
            </svg>
          </div>
          <div>
            <span id="page"></span>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaginationHadaf;
