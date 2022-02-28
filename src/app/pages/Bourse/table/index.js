import {
  Box,
  LinearProgress,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  styled,
  Modal,
  Backdrop,
  Fade,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { dateConvertMiladiToShamsi } from "../../../common/method/date";
import { handleNumber } from "../../../common/method/displayData";
import Styles from "./index.module.scss";
import ModalCustom from './modalCustom'
import ModalInsert from './modalInsert'

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    position: "relative",
  },
  container: {
    height: "max-content",
  },
  tableCellCustom: {
    whiteSpace: "nowrap",
    width: 200,
    padding: 10,
    fontSize: "0.8em",
    [theme.breakpoints.down("md")]: {
      fontSize: "0.8em",
    },
  },
  noData: {
    width: "90%",
    // height:40,
    fontSize: 20,
    border: "1px solid lightgray",
    margin: "20px auto",
    borderRadius: 5,
    padding: 10,
  },
  btn: {
    color: theme.palette.primary.main,
    cursor: "pointer",
    whiteSpace: "nowrap",
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border:0,
    outline:0,
  },
  paper: {
    width:'80%',
    height:'90%',
    overflowY:'auto',
    backgroundColor: theme.palette.background.paper,
    // border: '2px solid #000',
    border:0,
    outline:0,
    borderRadius:5,
    // height:'90%',
    boxShadow: theme.shadows[5],
    padding: 10,
    overflowX:'hidden',
    "@media (max-width: 992px)": {
      width:'95%',
    },
  },
}));

const TableBourse = ({
  bourseInstruments,
  setRowsPerPage,
  rowsPerPage,
  setPage,
  page,
}) => {


  const classes = useStyles();

  const [stateData, setstateData] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [flagmodalInsert, setflagmodalInsert] = useState(false);
  const [infoModal, setinfoModal] = useState({
    ind:"",
    info:""
  });

  

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  useEffect(() => {
    setstateData(bourseInstruments);
  }, [bourseInstruments]);

  const changePage = (event, newPage) => {
    setPage(newPage);
  };
  const changeRowsPerPage = (event, data) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleLink = (date) => {
    let changeDate = dateConvertMiladiToShamsi(
      date.split("T")[0].replaceAll("-", "/")
    );
    return changeDate;
    // return <div dangerouslySetInnerHTML={{ __html: text }}></div>;
  };

  const handleDetailsAndBuy = (ind) => {
    if (ind === 11) {
      return <span className={classes.btn} onClick={()=>handleOpen()}>جزییات عرضه</span>;
    }
    if (ind === 12) {
      return <span className={classes.btn} onClick={()=>handleOpenModalInsert()}>درخواست خرید عرضه</span>;
    }
  };

  const handleModalData = (index,info)=>{
    setinfoModal({
      ind:index,
      info:info
    })    
  }
  const handleOpenModalInsert =()=>{
    setflagmodalInsert(true)
  }


  
  return (
    <>
      <div style={{ height: 5, width: "100%", transform: "translateY(-5px)" }}>
        {bourseInstruments.loading && (
          <LinearProgress style={{ width: "100%" }} color="primary" />
        )}
      </div>
      <Paper className={classes.root}>
        <div className="table-responsive">
          <table
            className={`${Styles.table} table table-head-custom table-head-bg table-borderless table-vertical-center`}
          >
            <thead>
              <tr className="text-center text-uppercase">
                {columns.map((column, ind) => (
                  <th
                    key={ind}
                    align="center"
                    style={{ fontWeight: "bold", width: 100 }}
                    className="target"
                  >
                    {column.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {stateData?.data
                ?.slice(page * 10, (page + 1) * 10)
                .map((info, index) => (
                  <tr
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={index}
                    style={{ height: 60 }}
                  >
                    {columns.map((cell, ind) => (
                      <>
                        {ind != 11 && ind != 12 && (
                          <td
                            key={ind}
                            align="center"
                            dir="ltr"
                            // className={classes.tableCellCustom}
                            style={{ fontSize: 10, width: 100 }}
                          >
                            {/* <div dangerouslySetInnerHTML={{__html: `${info.Attachment}`}}></div> */}
                            {cell.type === "date"
                              ? handleLink(info[cell.id])
                              :cell.type === "price"? handleNumber(info[cell.id]) : info[cell.id] }
                          </td>
                        )}
                        {ind === 11 || ind === 12 ? (
                          <td
                            key={ind}
                            align="center"
                            dir="ltr"
                            // className={classes.tableCellCustom}
                            onClick={()=>handleModalData(index,info)}
                            style={{ fontSize: 10, width: 100 }}
                          >
                            {handleDetailsAndBuy(ind)}
                          </td>
                        ) : null}
                      </>
                    ))}
                  </tr>
                ))}
            </tbody>
          </table>

          {stateData?.data?.lenght === 0 && (
            <div className={classes.noData}>دیتایی برای نمایش وجود ندارد</div>
          )}
        </div>

        <Box dir="rtl" display="inline-block">
          <TablePagination
            // rowsPerPageOptions={[10, 20, 50]}
            component="div"
            count={bourseInstruments.total}
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
            <ModalCustom handleClose={handleClose} infoModal={infoModal}/>
          </div>
        </Fade>
      </Modal>
      {flagmodalInsert && (
        <ModalInsert flagmodalInsert={flagmodalInsert} infoModal={infoModal} setflagmodalInsert={setflagmodalInsert}/>
      )}
    </>
  );
};

export default TableBourse;

const columns = [
  // { id: "Attachment", label: "پیوست", minWidth: 120, align: "center" },
  // { id: "cBrokerSpcName", label: "کارگزار", minWidth: 120, align: "center" },
  {
    id: "name",
    label: "نام کالا",
    minWidth: 120,
    align: "center",
  },
  { id: "offerDate", label: "تاریخ عرضه", minWidth: 120, align: "center" ,type: "date",},

  // {
  //   id: "xKalaNamadKala",
  //   label: "نماد",
  //   minWidth: 120,
  //   align: "left",
  //   //   format: (value) => value.toLocaleString('en-US'),
  // },
  {
    id: "producer",
    label: "تولید کننده",
    minWidth: 120,
    align: "right",
    //   format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: "supplier",
    label: "عرضه کننده",
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
    id: "quantity",
    label: "حجم کالای قابل عرضه",
    minWidth: 120,
    align: "center",
    //   format: (value) => value.toFixed(2),
  },
  {
    id: "minQuantity",
    label: "حداقل عرضه",
    minWidth: 120,
    align: "center",
    //   format: (value) => value.toFixed(2),
  },
  {
    id: "basePrice",
    label: "قیمت پایه",
    minWidth: 120,
    align: "center",
    type:'price'
    //   format: (value) => value.toFixed(2),
  },
  {
    id: "deliveryLocation",
    label: "مکان تحویل",
    minWidth: 120,
    align: "center",

    //   format: (value) => value.toFixed(2),
  },
  {
    id: "maxOfferIncrement",
    label: "حداکثر افزایش عرضه",
    minWidth: 120,
    align: "center",
    //   format: (value) => value.toFixed(2),
  },
  {
    id: "buyLimit",
    label: "حداقل خرید",
    minWidth: 120,
    align: "center",
    //   format: (value) => value.toFixed(2),
  },
  {
    id: "offerCode",
    label: "کد عرضه",
    minWidth: 120,
    align: "center",
    //   format: (value) => value.toFixed(2),
  },
  {
    id: "offerCode",
    label: "جزییات",
    minWidth: 120,
    align: "center",
    //   format: (value) => value.toFixed(2),
  },
  {
    id: "offerCode",
    label: "درخواست عرضه",
    minWidth: 120,
    align: "center",
    //   format: (value) => value.toFixed(2),
  },
];
