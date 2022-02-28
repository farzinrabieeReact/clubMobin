import { LinearProgress, makeStyles } from "@material-ui/core";
import React from "react";
import { dateConvertMiladiToShamsi } from "../../../../common/method/date";
import PaginationHadaf from "../pagination";
import Styles from "./index.module.scss";

let useStyles = makeStyles((theme) => ({
  titleParent: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    overflow:'auto'
  },
  table: {
    backgroundColor: "#f2f2f2",
    width: "100%",
    "& tr": {
      "& :nth-child(odd)": {
        backgroundColor: "red",
      },
    },
  },
}));



const TableHadaf = ({ documentReducer,apiCallSelectDetaiils,pagination ,handlePagiNext,handlePagiPrev,activeNext,activePrev,handlePagiPrevDouble,handlePagiNextDouble,}) => {
  const classes = useStyles();

  
  
  const handleDetails = (ind)=>{
    apiCallSelectDetaiils(ind)
  }
  const handleType=(type)=>{
    switch (type) {
      case "Fundamental":
        return "بنیادی"
      case "Technical":
        return "تکنیکال"
      case "Technical-Fundamental":
        return "تکنیکال"
    
      default:
        break;
    }
  }

 
  return (
    <>
      <div className="w-100">
        <h5
          className="text-center mb-5"
          style={{ fontWeight: 700, fontSize: 24, marginTop: 80 }}
        >
          لیست تحلیل ها
        </h5>
          {documentReducer.loading && (<LinearProgress/>)}
        <div className={`${classes.tableParent} table-responsive`}>
          <table className={Styles.table} id="listingTable">
            <thead>
              <tr>
                <th>ردیف</th>
                <th>تاریخ</th>
                <th>نماد</th>
                <th>نوع تحلیل</th>
                <th>دانلود</th>
              </tr>
            </thead>
            <tbody>
              {documentReducer.data.map((itm, ind) => (
                <tr>
                  <td>{pagination.number !== 1 ? (pagination.number* 10) - 10 + (ind + 1) : ind + 1}</td>
                  <td>{dateConvertMiladiToShamsi(itm.body.insert_date_time.split(" ")[0])}</td>
                  <td>{itm.body.stock_symbol}</td>
                  <td>{handleType(itm.body.type)}</td>
                  <td>
                    <img src="/media/hadaf/download.png" alt="" onClick={()=>handleDetails(itm.id,ind)} style={{cursor:'pointer'}}/>
                  </td>
                </tr>
              ))}
            </tbody>
            {/* {documentReducer?.data?.lenght === 0 (
              <div className="m-2 p-2">اطلاعاتی برای نمایش وجود ندارد</div>
            )} */}
          </table>
        </div>
        <PaginationHadaf pagination={pagination} documentReducer={documentReducer} handlePagiNext={handlePagiNext} handlePagiPrev={handlePagiPrev} handlePagiPrevDouble={handlePagiPrevDouble} handlePagiNextDouble={handlePagiNextDouble}/>
      </div>
    </>
  );
};

export default TableHadaf;
