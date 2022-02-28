/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid,jsx-a11y/img-redundant-alt */
import React, { useState, useEffect } from "react";
import { Box, makeStyles } from "@material-ui/core";
import { useSelector, useDispatch } from 'react-redux';
import { actionTypes } from './../../../../../redux/market/stock/stock_select_payment_details';
import { dateConvertMiladiToShamsi } from './../../../../common/method/date';
import CardIicon from './IconRemove';
import CardNoData from "./../../../../common/components/cardNoData";
import Pagination from '@material-ui/lab/Pagination';
import { handleNumber } from "../../../../common/method/displayData";

const size = 10


let useStyles = makeStyles({
  root: {
    // minWidth: 320
  },
  icon: {
    cursor: "pointer"
  }
});

function AdvanceTablesWidget4() {

    let classes = useStyles();
    const dispatch = useDispatch()

    const [state, setState] = useState([])
    const [page, setPage] = useState(1);

    const reducerPaymentDetails = useSelector(state => state.reducerStockPaymentDetails)

    const handleChange = (event, value) => {
        setPage(value);
    };

    // call api select api stock payment details
    useEffect(() => {
        dispatch({ type: actionTypes.StockPaymentDetailsAsync })
    }, [])//eslint-disable-line  react-hooks/exhaustive-deps


    // select list data stock payment details
    useEffect(() => {
        if (reducerPaymentDetails.data) {
            setState(reducerPaymentDetails.data)
        }
    }, [reducerPaymentDetails])//eslint-disable-line  react-hooks/exhaustive-deps



    return (
        <div className={`card card-custom ${classes['root']} rounded-lg mt-10`}>
            <div className={'text-center'}>
                <h3 className={'py-5'}>لیست درخواست های من</h3>
            </div>
            <div className="card-body p-0">
                <div className="tab-content">
                    <div className="table-responsive">
                        <table className="table table-head-custom table-head-bg table-borderless table-vertical-center table-striped">
                            <thead>
                                <tr className="text-center text-uppercase">
                                    <th style={{ minWidth: "80px" }}>ردیف</th>
                                    <th style={{ minWidth: "80px" }}>شماره شناسه</th>
                                    <th style={{ minWidth: "80px" }}>مبلغ درخواستی</th>
                                    <th style={{ minWidth: "80px" }}>اطلاعات حساب</th>

                                    <th style={{ minWidth: "80px" }}>تاریخ ثبت درخواست</th>
                                    <th style={{ minWidth: "80px" }}>تاریخ واریز وجه</th>
                                    <th style={{ minWidth: "80px" }}>وضعیت تایید</th>
                                    <th style={{ minWidth: "80px" }}>عملیات</th>

                                </tr>
                            </thead>
                            <tbody>

                                {
                                    state
                                        .slice((page - 1) * size, ((page - 1) * size) + size)
                                        .map((item, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td className={'text-center'} >
                                                        {((page - 1) * size) + (index + 1)}
                                                    </td>
                                                    <td className={'text-center'}>
                                                        <p> {item.body.RequestedId}</p>
                                                    </td>
                                                    <td className={'text-center'}>
                                                        <p>{handleNumber(item.body.RequestedAmount)}</p>
                                                    </td>
                                                    <td className={'text-center'}>
                                                        <p>{item.body.AccountNumber}</p>
                                                    </td>
                                                    <td className={'text-center'}>
                                                        <p>{dateConvertMiladiToShamsi(item.body.RequestDate.split('T')[0])}</p>
                                                    </td>

                                                    <td className={'text-center'}>
                                                        <p>{dateConvertMiladiToShamsi(item.body.RequestForDate.split('T')[0])}</p>
                                                    </td>
                                                    <td className={'text-center'}>
                                                        <p>{item.body.StateDescription}</p>
                                                    </td>
                                                    <td className={'text-center'}>
                                                        <CardIicon data={item} />
                                                    </td>
                                                </tr>
                                            )
                                        })
                                }
                            </tbody>
                        </table>
                    </div>
                    {
                        state.length === 0 ?
                            <CardNoData
                                text="درخواستی وجود ندارد."
                            />
                            : (
                                <Box display="flex" justifyContent="center" position="sticky" pb={1}>
                                    <Pagination
                                        count={Math.ceil(reducerPaymentDetails.data.length / size)}
                                        color="primary"
                                        page={page}
                                        onChange={handleChange}
                                    />
                                </Box>
                            )
                    }
                </div>
            </div>

        
     
    </div>
  );
}

export default React.memo(AdvanceTablesWidget4);
