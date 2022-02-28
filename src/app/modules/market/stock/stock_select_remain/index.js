import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux'
import { actionTypes } from '../../../../../redux/market/stock/stock_select_remain';
import { handleNumber } from '../../../../common/method/displayData';


const useStyles = makeStyles({
    textInventory: {
        backgroundColor: '#E8EBEE',
        minWidth: 100
    },
    textBlock: {
        color: '#F86879',
        backgroundColor: 'rgba(255,0,0,0.1)',
        minWidth: 100
    },
    textBuy: {
        color: '#64A51C',
        backgroundColor: 'rgba(0,255,0,0.1)',
        minWidth: 150
    }
})


export default function Index() {

    let classes = useStyles();
    let dispatch = useDispatch()

    const [state, setstate] = useState({
        account_balance: null,
        blocked_balance: null,
        real_balance: null
    })
    const reducerStockRemain = useSelector(state => state.reducerStockRemain);

    useEffect(() => {
        dispatch({ type: actionTypes.stockRemainAsync })
    }, [])//eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if (reducerStockRemain.data[0]) {
            setstate(reducerStockRemain.data[0].body)
        }
    }, [reducerStockRemain.data])//eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div className={'d-flex flex-wrap align-items-center'}>
            <div className={'m-3'}>
                <p>موجودی:</p>
                <div className={`${classes['textInventory']} p-3 rounded`}>
                    <span>
                        {
                            state.account_balance ? handleNumber(state.account_balance) : '0'
                        }
                    </span>
                    <span className={'ml-2'}>ریال</span>
                </div>
            </div>
            <div className={'m-3'}>
                <p>بلوکه:</p>
                <div className={`${classes['textBlock']} p-3 rounded `}>
                    <span>
                        {
                            state.blocked_balance ? handleNumber(state.blocked_balance) : '0'
                        }
                    </span>
                    <span className={'ml-2'}>ریال</span>
                </div>
            </div>
            <div className={'m-3'}>
                <p>قدرت خرید:</p>
                <div className={`${classes['textBuy']} p-3 rounded`}>
                    <span>
                        {
                            state.real_balance ? handleNumber(state.real_balance) : '0'
                        }
                    </span>
                    <span className={'ml-2'}>ریال</span>
                </div>
            </div>
        </div>
    )
}
