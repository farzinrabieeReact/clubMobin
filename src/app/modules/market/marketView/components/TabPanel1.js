import React, { useEffect, useState, useRef } from 'react'
import TableCustom from './TableCustom'
import { FormControl, Select, MenuItem, Button, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { actionTypes } from "./../../../../../redux/market/marketView/non_individual_movements_asc_desc"
import { useDispatch } from 'react-redux';


const useStyles = makeStyles((theme) => ({
    tables: {
        height: 380,
        display: "flex",
        marginTop: 10,
        overflow: "auto",
        justifyContent: "space-between",
        [theme.breakpoints.down(900)]: {
            minHeight: 800,
            flexDirection: "column"
        }
    },
    table: {
        width: "48%",
        [theme.breakpoints.down(900)]: {
            width: "100%"
        }
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


export default function TabPanel1({ reducerMainContentTabpanel1 }) {
    const classes = useStyles();
    const [pagination, setPagination] = useState(1)
    const dispatch = useDispatch()
    const [stateFilter, setstateFilter] = useState("non_individual_movements")
    const [flowFilter, setFlowFilter] = useState("0")
    const ref = useRef(false)
    const [flagApiMore, setflagApiMore] = useState(false)
    const [flagApiOne, setflagApiOne] = useState(false)

    let { size, total, desc, asc } = reducerMainContentTabpanel1

    useEffect(() => {
        if (ref.current) {
            dispatch({
                type: actionTypes.marketViewnMainContentTabpanel1Async,
                payload: {
                    from: pagination,
                    size: size,
                    type: "MORE",
                    key: stateFilter,
                    flow: flowFilter
                }
            })
        }
        ref.current = true
    }, [flagApiMore])


    useEffect(() => {
        dispatch({
            type: actionTypes.marketViewnMainContentTabpanel1Async,
            payload: {
                from: pagination,
                size: size,
                type: "ONE",
                key: stateFilter,
                flow: flowFilter
            }
        })
    }, [flagApiOne])

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
            <Box className="mt-5 ml-5 d-flex flex-column flex-lg-row justify-content-start align-items-start">
                <Box width="300px">
                    <FormControl variant="outlined" fullWidth >
                        <Select
                            labelId="demo-simple-select-outlined-label-newpost-subgroup_name"
                            id="demo-simple-select-outlined-newpost-subgroup_name"
                            style={{ height: 36 }}
                            value={stateFilter}
                            onChange={(e) => setstateFilter(e.target.value)}
                        >
                            <MenuItem size="small" value={"non_individual_movements"}>{'بیشترین افزایش و کاهش مالکیت حقوقی'}</MenuItem>
                            <MenuItem size="small" value={"total_value"}>{'بیشترین ارزش معامله'}</MenuItem>
                            <MenuItem size="small" value={"quantity"}>{'بیشترین حجم معامله'}</MenuItem>
                            <MenuItem size="small" value={"total_sell_power"}>{'بیشترین قدرت خرید و فروش'}</MenuItem>
                            <MenuItem size="small" value={"sell_count_individual"}>{'بیشترین تعداد خریدار و فروشنده'}</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
                <Box width="200px" className="ml-0 ml-lg-5 my-5 my-lg-0" >
                    <FormControl variant="outlined" fullWidth >
                        <Select
                            labelId="demo-simple-select-outlined-label-newpost-subgroup_name"
                            id="demo-simple-select-outlined-newpost-subgroup_name"
                            style={{ height: 36 }}
                            value={flowFilter}
                            onChange={(e) => setFlowFilter(e.target.value)}
                        >
                            <MenuItem size="small" value="0">{'همه'}</MenuItem>
                            <MenuItem size="small" value={"1"}>{'بورس'}</MenuItem>
                            <MenuItem size="small" value={"2"}>{'فرابورس'}</MenuItem>
                            <MenuItem size="small" value={"4"}>{'بازار پایه'}</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
                <Box width="75px" height="40px" className="ml-0 ml-lg-10">
                    <Button
                        variant="contained"
                        className={classes.customButton}
                        fullWidth
                        onClick={() => {
                            setPagination(1)
                            setflagApiOne((prev => !prev))
                        }}
                    >
                        اعمال
                        </Button>
                </Box>
            </Box>

            <Box className={classes.tables}>
                <div className={classes.table}>
                    <TableCustom
                        row={handleRow(desc)}
                    />
                </div>
                <div className={classes.table}>
                    <TableCustom
                        row={handleRow(asc)}
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



