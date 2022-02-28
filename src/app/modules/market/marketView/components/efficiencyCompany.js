import React, { useEffect, useState } from 'react';
import { makeStyles } from "@material-ui/styles";
import { Box } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { actionTypes } from "./../../../../../redux/market/marketView/efficiency_asc_desc"
import { handleNumber } from '../../../../common/method/displayData';



const useStyles = makeStyles(theme => ({
    rootEfficiency: {
        height: "100%"
    },
    boxEfficiency: {
        padding: "45px 5px",
        height: "90%"
    },
    colorEfficiency: {
        width: 7,
        height: "100%",
        margin: "0 10px",
        backgroundImage: "linear-gradient(180deg, rgba(28,117,73,1) 0%, rgba(164,0,5,1) 100%)"
    }
}));

export default function EfficiencyCompany() {
    const classes = useStyles();
    const dispatch = useDispatch()
    const stateReducer = useSelector(state => state.reducermarketViewEfficiency)
    const [state, setstate] = useState([])

    useEffect(() => {
        dispatch({ type: actionTypes.marketViewEfficiencyAsync })
    }, [])


    useEffect(() => {
        setstate([
            ...stateReducer.desc,
            ...stateReducer.asc,
        ])
    }, [stateReducer])

    const clacChange = (item) => {
        let res = ((item.body.last_price / item.body.yesterday_price) - 1) * 100
        return res
    }


    return (
        <div className={classes.rootEfficiency}>
            <h5 className="pt-3">
                بیشترین و کمترین بازدهی شرکت ها
                {
                    stateReducer.loading && (
                        <span className="ml-3 spinner spinner-success"></span>
                    )
                }
                </h5>

            <Box className={classes.boxEfficiency}>
                <div className="d-flex h-100">
                    <div className={`${classes.colorEfficiency} rounded`}></div>
                    <div className="flex-grow-1 d-flex flex-column justify-content-between py-2">
                        {
                            state.map((item, ind) => (
                                <p key={ind} className={`m-0`}>
                                    <span>{item.body["18_char_persian_symbol"]}</span>{" "}({item.body["30_char_persian_symbol"]})
                                    {" "}
                                    <span dir="ltr" className={`${clacChange(item) > 0 ? "colorGreen" : clacChange(item) < 0 ? "colorRed" : ""}`}>
                                        {handleNumber(clacChange(item))}{""}{"%"}
                                    </span>
                                </p>
                            ))
                        }

                    </div>
                </div>
            </Box>
        </div>
    )
}

// let data = [
//     { label: "واعتبار (سرمایه گذاری اعتبار ایران)", change: 25.68 },
//     { label: "واعتبار (سرمایه گذاری اعتبار ایران)", change: 0 },
//     { label: "واعتبار (سرمایه گذاری اعتبار ایران)", change: -25.68 },
//     { label: "واعتبار (سرمایه گذاری اعتبار ایران)", change: 25.68 },
//     { label: "واعتبار (سرمایه گذاری اعتبار ایران)", change: 25.68 },
//     { label: "واعتبار (سرمایه گذاری اعتبار ایران)", change: 25.68 },
// ]
