import React, { useEffect, useState } from "react";
import Styles from "./index.module.scss";
import {
  Backdrop,
  Box,
  Fade,
  LinearProgress,
  makeStyles,
  Modal,
  Paper,
  TablePagination,
} from "@material-ui/core";
import InfoIcon from "@material-ui/icons/Info";
import ModalCustom from "./modalCustom";
import { actionTypes as trade } from "../../../../redux/bourse/select_Ime_trade_state";
import { useDispatch, useSelector } from "react-redux";
import { dateConvertMiladiToShamsi } from "../../../common/method/date";
import {actionTypes as notif} from '../../../../redux/notificationAlert'
const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: 0,
    outline: 0,
  },
  paper: {
    width: "80%",
    height: "90%",
    overflowY: "auto",
    overflowX: "hidden",
    backgroundColor: theme.palette.background.paper,
    // border: '2px solid #000',
    border: 0,
    outline: 0,
    borderRadius: 5,
    // height:'90%',
    boxShadow: theme.shadows[5],
    padding: 10,
  },
}));

const MerchantileNew = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [infoModal, setinfoModal] = useState({
    info: "",
    ind: "",
  });

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const reducerTrade = useSelector(
    (state) => state.bourse_select_trade_reducer
  );
  const [open, setOpen] = React.useState(false);

  const handleClickTd = (itm, ind) => {
    setinfoModal((prev) => ({
      info: itm,
      ind: ind,
    }));
    handleOpen();
  };
  const changePage = (event, newPage) => {
    setPage(newPage);
  };
  const changeRowsPerPage = (event, data) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    dispatch({ type: trade.selectTardeAsync, payload: {} });
  }, []);

  const handleDate = (date) => {
    if (date) {
      let changeDate = dateConvertMiladiToShamsi(
        date.split("T")[0].replaceAll("-", "/")
      );
      return changeDate;
    } else {
      return date;
    }
  };

  const handleLinkDownload = (itm) => {
    // return <FontDownload onClick={() => handleClickDownLadBase64(itm)} />;
    return(

    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      class="bi bi-file-earmark-arrow-down-fill"
      viewBox="0 0 16 16"
      onClick={() => handleClickDownLadBase64(itm)}
      style={{cursor:'pointer'}}
    >
      <path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0zM9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1zm-1 4v3.793l1.146-1.147a.5.5 0 0 1 .708.708l-2 2a.5.5 0 0 1-.708 0l-2-2a.5.5 0 0 1 .708-.708L7.5 11.293V7.5a.5.5 0 0 1 1 0z" />
    </svg>
    )
    // console.log("itm",itm)
    // let obj={
    //   contract_number: itm.contract_Code,
    //   from_date: "",
    //   to_date: "",
    //   send_file: true,
    //   page_size: "",
    //   page_number: "",
    //   sort: "",
    // }
    // let data ={
    //  data:obj
    // }
    // if(itm.contract_Code){
    //   dispatch({ type: trade.selectTardeAsync, payload: data });
    // }
  };

  const handleClickDownLadBase64 = (itm) => {
    // let obj={
    //   contract_number: itm.contract_Code,
    //   from_date: "",
    //   to_date: "",
    //   send_file: true,
    //   page_size: "",
    //   page_number: "",
    //   sort: "",
    // }
    // let data ={
    //  data:obj
    // }
    // if(itm.contract_Code){
    //   dispatch({ type: trade.selectTardeAsync, payload: data });
    // }
    dispatch({type:notif.warning,textAlert:'امکان دانلود فایل وجود ندارد'})
  };

  return (
    <>
      <Paper className={Styles.root}>
        {reducerTrade.loading ? <LinearProgress /> : null}
        <div className="table-responsive">
          <table
            className={`${Styles.table} table table-head-custom table-head-bg table-borderless table-vertical-center `}
          >
            <thead>
              <tr>
                {/* <th
                  align="center"
                  style={{ fontWeight: "bold",  }}
                  className="target"
                >
                  {"ردیف"}
                </th> */}
                {columns.map((itm, ind) => (
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
                  className="target"
                >
                  اطلاعات بیشتر
                </th>
              </tr>
            </thead>
            <tbody>
              {reducerTrade?.data
                ?.slice(page * 10, (page + 1) * 10)
                .map((itm, ind) => (
                  <>
                    <tr>
                      {columns.map((info, index) => (
                        <td
                          key={index}
                          align="center"
                          dir="ltr"
                          // className={classes.tableCellCustom}
                          style={{ fontSize: 10 }}
                        >
                          {info.type === "date" && itm[info.id]
                            ? handleDate(itm[info.id])
                            : info.type === "link"
                            ? handleLinkDownload(itm)
                            : !itm[info.id]?"_":itm[info.id]}
                        </td>
                      ))}
                      <td onClick={() => handleClickTd(itm, ind)}>
                        <InfoIcon style={{ cursor: "pointer" }} />
                      </td>
                    </tr>

                    <Modal
                      aria-labelledby="transition-modal-title"
                      aria-describedby="transition-modal-description"
                      className={classes.modal}
                      open={open}
                      onClose={handleClose}
                      closeAfterTransition
                      BackdropComponent={Backdrop}
                      BackdropProps={{
                        timeout: 500,
                      }}
                    >
                      <Fade in={open}>
                        <div className={classes.paper}>
                          <ModalCustom
                            handleClose={handleClose}
                            infoModal={infoModal}
                            handleDate={handleDate}
                          />
                        </div>
                      </Fade>
                    </Modal>
                  </>
                ))}
            </tbody>
          </table>
        </div>
        <Box dir="rtl" display="inline-block">
          <TablePagination
            // rowsPerPageOptions={[10, 20, 50]}
            component="div"
            count={reducerTrade.total}
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
    </>
  );
};

export default MerchantileNew;

const columns = [
  // { id: "Attachment", label: "پیوست", minWidth: 120, align: "center" },
  // { id: "cBrokerSpcName", label: "کارگزار", minWidth: 120, align: "center" },
  {
    id: "date",
    label: "تاریخ عرضه",
    minWidth: 120,
    align: "center",
    type: "date",
  },

  // {
  //   id: "xKalaNamadKala",
  //   label: "نماد",
  //   minWidth: 120,
  //   align: "left",
  //   //   format: (value) => value.toLocaleString('en-US'),
  // },
  {
    id: "contract_Code",
    label: "شماره قرارداد",
    minWidth: 120,
    align: "right",
    //   format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: "name",
    label: "نام کالا",
    minWidth: 120,
    align: "center",
    //   format: (value) => value.toLocaleString('en-US'),
  },
  // {
  //     id: 'areaCode',
  //     label: 'پیش شماره',
  //     minWidth: 170,
  //     align: 'center',
  //     //   format: (value) => value.toLocaleString('en-US'),
  // },
  {
    id: "tonnage",
    label: "تناژ",
    minWidth: 120,
    align: "center",
    //   format: (value) => value.toFixed(2),
  },
  {
    id: "producer",
    label: "تولید کننده",
    minWidth: 120,
    align: "center",
    //   format: (value) => value.toFixed(2),
  },
  {
    id: "supplier",
    label: "عرضه کننده",
    minWidth: 120,
    align: "center",
    //   format: (value) => value.toFixed(2),
  },
  {
    id: "buyer_Broke",
    label: "کارگزار خرید",
    minWidth: 120,
    align: "center",
    //   format: (value) => value.toFixed(2),
  },
  {
    id: "seller_Broker",
    label: "کارگزار فروشنده",
    minWidth: 120,
    align: "center",
    //   format: (value) => value.toFixed(2),
  },
  {
    id: "tt",
    label: "اعلامیه خرید",
    minWidth: 120,
    align: "center",
    type: "link",
    //   format: (value) => value.toFixed(2),
  },
];
