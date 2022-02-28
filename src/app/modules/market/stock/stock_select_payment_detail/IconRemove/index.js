import React, { useState } from 'react'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { useDispatch } from 'react-redux';

import AlertDialogSlide from './../../../../../common/components/AlertDialogSlide';
import { removePayment } from './../../../../../../redux/market/stock/stock_remove_payment';
import { handleNotificationAlertTryUpdate, handleNotificationAlertCatch } from './../../../../../common/method/handleNotificationAlert';
import { actionTypes } from './../../../../../../redux/market/stock/stock_select_payment_details';


export default function Index({ data }) {

    let dispatch = useDispatch();
    const [openAlert, setOpenAlert] = useState(false);


    const apiRemovePayment = (item) => {

        let data = {
            _id: item.body.RequestedId
        }

        removePayment(data)
            .then((res) => {
                let resOk = handleNotificationAlertTryUpdate(res)
                if (resOk) {
                    dispatch({
                        type: actionTypes.StockPaymentDetailsAsync,
                    })
                }
            })
            .catch(() => {
                handleNotificationAlertCatch()
            })

        setOpenAlert(prev => !prev)
    }


    return (
        <>
            {
                +data.body.State === 5 && (
                    <DeleteForeverIcon  style={{fill: "red"}} onClick={() => setOpenAlert(prev => !prev)} />
                )
            }

            {
                +data.body.State === 8 && (
                    <DeleteForeverIcon  style={{fill: "red"}}   onClick={() => setOpenAlert(prev => !prev)} />
                )
            }
            {
                +data.body.State !== 5 &&  +data.body.State !== 8 && (
                    <div>---</div>
                )
            }

            {
                openAlert && (
                    <AlertDialogSlide
                        flagShow={openAlert}
                        handleCloseAlert={setOpenAlert}
                        handleOkAlert={() => apiRemovePayment(data)}
                        data={dataAlertDialogSlide}
                    />
                )
            }
        </>
    )
}


const dataAlertDialogSlide = {
    title: "حذف",
    description: "از حذف این رکورد اطمینان دارید؟",
}

