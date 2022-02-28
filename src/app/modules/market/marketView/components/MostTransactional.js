import { Box } from '@material-ui/core'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { handleNumber } from '../../../../common/method/displayData'
import { actionTypes } from "./../../../../../redux/market/marketView/trade_count_desc"

export default function MostTransactional() {
    const dispatch = useDispatch()
    const stateReducer = useSelector(state => state.reducermarketViewTradeCount)

    useEffect(() => {
        dispatch({ type: actionTypes.marketViewTradeCountAsync })
    }, [])


    const clacChange = (item) => {
        let res = ((item.body.last_price / item.body.yesterday_price) - 1) * 100
        return res
    }


    return (
        <div className="bg-white w-100 p-3 rounded">

            <h4>
                پر تراکنش ترین نمادها:
                {
                    stateReducer.loading && (
                        <span className="ml-3 spinner spinner-success"></span>
                    )
                }
            </h4>


            <div className="d-flex justify-content-around flex-md-nowrap flex-wrap">
                {
                    (!stateReducer.loading && stateReducer.data.length > 0) && (
                        stateReducer.data.map((item, ind) => (
                            <Box key={ind} className="text-center p-2">
                                <p className="my-1">
                                    <span>{item.body["18_char_persian_symbol"]}</span>{" "}({item.body["30_char_persian_symbol"]})
                                </p>
                                <p dir="ltr" className={`m-0 my-1 ${clacChange(item) > 0 ? "colorGreen" : clacChange(item) < 0 ? "colorRed" : ""}`}>
                                    {handleNumber(clacChange(item))}{""}{"%"}
                                </p>
                            </Box>
                        ))
                    )
                }
            </div>
        </div>
    )
}
