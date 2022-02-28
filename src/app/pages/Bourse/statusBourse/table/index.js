import React, { useEffect, useState } from "react";
import Styles from "./index.module.scss";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Box, LinearProgress, Paper, TablePagination } from "@material-ui/core";
import {actionTypes as tradeAction} from '../../../../../redux/bourse/select_trade_status'
import { useDispatch, useSelector } from "react-redux";
import { dateConvertMiladiToShamsi } from "../../../../common/method/date";
import ModalCancel from '../modalCancel' 

const Index = () => {

  const dispatch = useDispatch()
  const ReducerTrade = useSelector(state => state.select_ime_request_status_reducer)
  const [flagModalCancel, setflagModalCancel] = useState(false);
  const [loading, setloading] = useState(false);
  const [flagAccordian, setflagAccordian] = useState({
    ind: "",
    flag: false,
  });
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);


  const changePage = (event, newPage) => {
    setPage(newPage);
  };
  const changeRowsPerPage = (event, data) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleClickTd = (e, ind,info) => {
    if (flagAccordian.ind === ind) {
      setflagAccordian((prev) => ({
        ind: "",
        flag: false,
      }));
    } else {
      setflagAccordian((prev) => ({
        ind: ind,
        flag: true,
        info:info,
        icon: <ExpandMoreIcon style={{ cursor: "pointer" }} />,
      }));
    }
  };




  const handleDelete = ()=>{
    setflagModalCancel(true)
  }

  useEffect(() => {
    dispatch({type:tradeAction.selectRequesStatussAsync,payload:{}})
  }, []);





  const handleLink = (date) => {
    let changeDate = dateConvertMiladiToShamsi(date.split("T")[0].replaceAll("-","/"))
  return changeDate
    // return <div dangerouslySetInnerHTML={{ __html: text }}></div>;
  };


  return (
    <>
      <Paper className={Styles.root}>
        {ReducerTrade.loading?<LinearProgress/>:null}
        <div className="table-responsive">
          <table
            className={`${Styles.table} table table-head-custom table-head-bg table-borderless table-vertical-center `}
          >
            <thead>
              <tr>
                
                {data.map((itm, ind) => (
                  <th
                    key={ind}
                    align="center"
                    style={{ fontWeight: "bold" }}
                    className="target"
                  >
                    {itm.label}
                  </th>
                ))}
                <th 
                 align="center"
                 style={{ fontWeight: "bold" }}
                 className="target">
                   {"اطلاعات بیشتر"}
                 </th>
              </tr>
            </thead>
            <tbody>
              {ReducerTrade.data[0]?.getImeRequestStatusResponse
              .slice(page * 10, (page + 1) * 10)
              .map((itm, ind) => (
                <>
                  <tr
                    className={
                      flagAccordian.flag && flagAccordian.ind === ind
                        ? Styles.accordian
                        : ""
                    }
                  >
                    {data.map((info, index) => (
                      <td
                        key={index}
                        align="center"
                        dir="ltr"
                        // className={classes.tableCellCustom}
                        style={{ fontSize: 10 }}
                      >
                        {index === 0 ? page !== 0 ? (page * 10) - 10 + (ind + 1) : ind+1 :index === 1 ? handleLink(itm[info.fild]) : !itm[info.fild]?"_":itm[info.fild]}
                      </td>
                    ))}
                    <td onClick={(e) => handleClickTd(e, ind,itm)}>
                      {flagAccordian.ind === ind && flagAccordian.flag ? (
                        flagAccordian.icon
                      ) : (
                        <ChevronRightIcon style={{ cursor: "pointer" }} />
                      )}
                    </td>
                  </tr>
                  {flagAccordian.flag && flagAccordian.ind === ind && (
                    <tr
                      className={
                        flagAccordian.flag && flagAccordian.ind === ind
                          ? Styles.accordian
                          : ""
                      }
                      style={{ height: 120 }}
                    >
                      <td className="d-flex flex-column align-items-center">
                        {""}
                      </td>
                      <td className="d-flex flex-column align-items-center">
                        <h6>قیمت پایه</h6>
                        <div>{flagAccordian.info.price}</div>
                      </td>
                      <td className="d-flex flex-column align-items-center">
                        <h6 >کد عرضه</h6>
                        <div>{flagAccordian.info.offerCode}</div>
                      </td>
                      <td>
                        <h6 >تاریخ درخواست عرضه</h6>
                        <div>{handleLink(flagAccordian.info.requestDateTime)}</div>
                      </td>
                      <td>
                        <h6>قیمت پیشنهادی(ریال)</h6>
                        <div>_</div>
                      </td>
                      <td>
                        <h6>درخواست ابطال عرضه</h6>
                        <div onClick={flagAccordian.info.requestState === "لیست انتظار"?(e)=>handleDelete(e, ind,itm):null} className={flagAccordian.info.requestState === "لیست انتظار" ? `${Styles.btnBack}` : `${Styles.btnBackDisabled} disabled`}>
                          ابطال عرضه
                        </div>
                      </td>

                      <td>{""}</td>
                    </tr>
                  )}
                </>
              ))}
            </tbody>
          </table>
        </div>
        <Box dir="rtl" display="inline-block">
          <TablePagination
            // rowsPerPageOptions={[10, 20, 50]}
            component="div"
            count={ReducerTrade?.data[0]?.getImeRequestStatusResponse.length > 0?ReducerTrade?.data[0]?.getImeRequestStatusResponse.length :0}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={changePage}
            rowsPerPageOptions={false}
            className="tablePaginationBourse"
            row
            // onChangeRowsPerPage={changeRowsPerPage}
            labelRowsPerPage="تعداد نمایش سطر"
          />
        </Box>
      </Paper>
      {flagModalCancel && (
        <ModalCancel
        flagModalCancel={flagModalCancel}
        setflagModalCancel={setflagModalCancel}
        loading={loading}
        flagAccordian={flagAccordian}
        setloading={setloading}

        />
      )}
    </>
  );
};

export default Index;

let data = [
  {
    id: 1,
    fild: "row",
    label: "ردیف",
  
  },
  {
    id: 2,
    fild: "startDate",
    label: "تاریخ عرضه",
    
  },
  {
    id: 3,
    label: "بازار",
    fild: "_",
    
  },
  {
    id: 4,
    label: "حجم",
    fild: "quantity",
 
  },
  {
    id: 5,
    label: "نماد",
    fild: "instrumentName",
  
  },
  {
    id: 6,
    label: "وضعیت",
    fild: "requestState",
   
  },


];
let head = ["تاریخ عرضه", "بازار", "حجم(تن)", "نماد", "وضعیت", "اطلاعات بیشتر"];
