import React, { useState } from 'react'
import CloseIcon from '@material-ui/icons/Close';
import { useDispatch } from 'react-redux';

import AlertDialogSlide from './../../../../../common/components/AlertDialogSlide';
import { removeChangeBroker } from './../../../../../../redux/market/stock/stock_remove-changeBroker';
import { handleNotificationAlertTryUpdate, handleNotificationAlertCatch } from './../../../../../common/method/handleNotificationAlert';
import { actionTypes } from './../../../../../../redux/market/stock/stock_select_changeBroker';


export default function Index({ data }) {

    let dispatch = useDispatch();
    const [openAlert, setOpenAlert] = useState(false);


    const apiRemoveChangeBroker = (item) => {

        let data = {
            _id: item.id
        }

        removeChangeBroker(data)
            .then((res) => {
                let resOk = handleNotificationAlertTryUpdate(res)
                if (resOk) {
                    dispatch({
                        type: actionTypes.StockChangeBrokerAsync,
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
                data.body.state === '-1' && (
                    <div className={'bg-danger p-1 w-25 m-auto cursor-pointer'}>
                        <CloseIcon onClick={() => setOpenAlert(prev => !prev)} />
                    </div>
                )
            }
            {
                data.body.state !== '-1' && (
                    <div>---</div>
                )
            }
            {
                openAlert && (
                    <AlertDialogSlide
                        flagShow={openAlert}
                        handleCloseAlert={setOpenAlert}
                        handleOkAlert={() => apiRemoveChangeBroker(data)}
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

