import React from "react";
import { dateConvertMiladiToShamsi } from "../../../common/method/date";
import { makeStyles } from "@material-ui/styles";
import Pagination from "../../../common/components/pagination";
import OutlinedCard from "../../../common/components/cardNoData";

const useStyle = makeStyles(() => ({
  trash: {
    transition: "all .4s",

    "&:hover": {
      color: "red",
      fontSize: "16px !important",
      cursor: "pointer",
    },
  },
  stickyPagination: {
    textAlign: "center",
    fontWeight: "bold",
    margin: "0px auto",
    position: "sticky",
    bottom: 0,
    /* left: 0; */
    //   backgroundColor: "whitesmoke",
    padding: "5px 0",
    display: "flex",
    justifyContent: "center",
    direction: "ltr",
  },
}));

const TableCredit = ({ Data, changePagnation, pagnation }) => {
  const classes = useStyle();
  let nowDate = new Date().getTime();

  // functions
  const handleStatus = (data, endDate) => {
    let endDateConvert = new Date(endDate).getTime();
    if (endDateConvert < nowDate) {
      return "عرضه انجام شده است";
    }

    switch (data) {
      case "REJECTED":
        return "لغو شده";
      case "NOT_PROCESSED":
        return "در انتظار";
      case "SUBMITTED":
        return "در انتظار";
      case "FINALIZED":
        return "تایید شده";
      default:
        return "نا مشخص";
    }
  };

  return (
    <div className="w-100 bg-white shadow rounded-lg py-5 px-10 mb-10">
      <table className="table table-responsive d-lg-table  table-hover ">
        <thead>
          <tr style={{ borderBottom: "2px solid black !important" }}>
            <th scope="col" style={{ textAlign: "center" }}>
              تاریخ
            </th>
            <th scope="col" style={{ textAlign: "center" }}>
              <p>مبلغ اعتبار (ریال)</p>
            </th>
          </tr>
        </thead>
        <tbody>
          {Data?.data.map((itm, ind) => (
            <tr key={ind}>
              <td style={{ textAlign: "center" }}>
                {dateConvertMiladiToShamsi(itm.body.from_date)}
              </td>
              <td style={{ textAlign: "center" }}>{itm.body.credit}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className={classes.stickyPagination}>
        {Data?.Data?.data.length !== 0 && (
          <Pagination
            shape="rounded"
            variant="outlined"
            count={pagnation.count}
            pagnation={pagnation.number}
            setPagnation={(data) => changePagnation(data)}
          />
        )}
      </div>

      {Data?.Data?.data.length === 0 ? <OutlinedCard /> : ""}
    </div>
  );
};

export default TableCredit;
