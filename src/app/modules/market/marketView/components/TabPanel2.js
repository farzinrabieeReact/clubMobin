import React, { useEffect, useState, useRef } from 'react'
import TableCustom from './TableCustom'
import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { actionTypes } from "./../../../../../redux/market/marketView/abnormal_volume_desc"
import { useDispatch } from 'react-redux';


const useStyles = makeStyles((theme) => ({
    tables: {
        height: 400,
        display: "flex",
        marginTop: 10,
        overflow: "auto",
        justifyContent: "space-between",
        [theme.breakpoints.down(900)]: {
            height: 500,
            flexDirection: "column"
        }
    },
    table: {
        width: "100%",
    },
    customButton: {
        backgroundColor: "#228fd8",
        color: "white",
        height: 40,
        position: "relative",
        top: "-4px",
        '&:hover': {
            backgroundColor: "#008be8",
            color: "white",
        }
    }
}));


export default function TabPanel2({ reducerMainContentTabpanel2 }) {
    const classes = useStyles();
    const [pagination, setPagination] = useState(1)
    const dispatch = useDispatch()
    const ref = useRef(false)
    const [flagApiMore, setflagApiMore] = useState(false)

    let { size, total, desc } = reducerMainContentTabpanel2

    useEffect(() => {
        if (ref.current) {
            dispatch({
                type: actionTypes.marketViewAbnormalVolumeAsync,
                payload: {
                    from: pagination,
                    size: size,
                    type: "MORE",
                }
            })
        }
        ref.current = true
    }, [flagApiMore])


    useEffect(() => {
        dispatch({
            type: actionTypes.marketViewAbnormalVolumeAsync,
            payload: {
                from: pagination,
                size: size,
                type: "ONE",
            }
        })
    }, [])

    const handleRow = (data) => {
        return data.map(item => {
            return {
                "InstrumentName": `${item.body["18_char_persian_symbol"]} (${item.body["30_char_persian_symbol"]})`,
                "PriceChangePercent": ((item.body.price_change / item.body.yesterday_price)) * 100,
                "PriceChange": item.body.price_change,
                "last_price": item.body.last_price,
                "ClosePriceChangePercent": ((item.body.close_price_change / item.body.yesterday_price)) * 100,
                "ClosePriceChange": item.body.close_price_change,
                "ClosePrice": item.body.close_price,
                "TotalValue": item.body.total_value / 10000000
            }
        })
    }

    return (
       
       <div className="w-100 m-0 p-0" dir="rtl">
          
            <Box className={classes.tables}>
                <div className={classes.table}>
                    <TableCustom
                        row={handleRow(desc)}
                    />
                </div>
            </Box>

            <Box margin="auto" textAlign="center">
                {
                    total > ((pagination - 1) * size) + size && (
                        <span
                            className="btn btn-light-success"
                            onClick={() => {
                                setPagination((prev) => ++prev)
                                setflagApiMore(prev => !prev)
                            }}
                        >
                            بیشتر
                        </span>
                    )
                }
            </Box>


        </div >
    )
}



