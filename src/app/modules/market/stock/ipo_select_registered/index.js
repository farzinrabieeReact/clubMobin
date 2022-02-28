import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionTypesSelectRegister } from "../../../../../redux/market/stock/ipo_select_registered";
import { dateConvertMiladiToShamsi } from "../../../../common/method/date";
import { Trash } from "react-bootstrap-icons";
import { makeStyles } from "@material-ui/styles";
import { actionTypesUpdateRegister } from "../../../../../redux/market/stock/ipo_update_cancel";
import Pagination from "../../../../common/components/pagination";
import OutlinedCard from "../../../../common/components/cardNoData";

const useStyle = makeStyles(() => ({
  trash: {
    transition: "all .4s",

    "&:hover": {
      color: "red",
      // fontSize: "16px !important",
      cursor: "pointer"
    }
  },
  stickyPagination: {
    textAlign: "center",
    fontWeight: "bold",
    margin: "0px auto",
    bottom: 0,
    /* left: 0; */
    //   backgroundColor: "whitesmoke",
    padding: "5px 0",
    display: "flex",
    justifyContent: "center",
    direction: "ltr"
  }
}));

const TableStock = () => {
  const dispatch = useDispatch();
  const classes = useStyle();
  let nowDate = new Date().getTime();

  // reducer
  const Data = useSelector(state => state.reducer_ipo_selectRegister_list);
  const [pageTab1, setPageTab1] = useState(1); //eslint-disable-line no-unused-vars

  const changePagnation = page => {
    dispatch({
      type: actionTypesSelectRegister.ipoSelectRegisterAsync,
      payload: {
        from: page * Data.size - Data.size,
        size: Data.size
      }
    });
  };

  // hook
  useEffect(() => {
    dispatch({
      type: actionTypesSelectRegister.ipoSelectRegisterAsync,
      payload: { size: 6, from: 0 }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  const handleClick = id => {
    dispatch({ type: actionTypesUpdateRegister.ipoUpdateRegisterAsync, id });
  };

  return (
    <div className="w-100 bg-white shadow rounded-lg py-5 px-10 mb-10">
      <table className="table table-responsive d-lg-table  table-hover ">
        <thead>
          <tr style={{ borderBottom: "2px solid black !important" }}>
            <th style={{width:"unset"}}>نماد</th>
            <th style={{width:"unset"}}>تاریخ ثبت</th>
            <th style={{width:"unset"}}>تاریخ پایان عرضه</th>
            <th style={{width:"unset"}}>قیمت درخواستی</th>
            <th style={{width:"unset"}}>تعداد درخواستی</th>
            <th style={{width:"unset"}}>وضعیت عرضه</th>
          </tr>
        </thead>
        <tbody>
          {Data.data?.map((itm, ind) => (
            <tr key={ind}>
              <td>{itm.body.ipo_stock_name}</td>
              <td>{dateConvertMiladiToShamsi(itm.body.registration_date)}</td>
              <td>{dateConvertMiladiToShamsi(itm.body.ipo_end_date)}</td>
              <td>{itm.body.requested_price}</td>
              <td>{itm.body.requested_quantity}</td>
              <td>
                {handleStatus(
                  itm.body.state,
                  itm.body.ipo_end_date.split(" ")[0]
                )}
              </td>
              <td>
                <Trash
                  className={classes.trash}
                  onClick={() => handleClick(itm.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className={classes.stickyPagination}>
        {Data.data.length !== 0 && (
          <Pagination
            shape="rounded"
            variant="outlined"
            count={Math.ceil(Data.total / Data.size)}
            page={pageTab1}
            // onChange={changePagnation}
            setPagnation={changePagnation}
          />
        )}
      </div>
      {Data.data.length === 0 && <OutlinedCard />}
    </div>
  );
};

export default TableStock;
