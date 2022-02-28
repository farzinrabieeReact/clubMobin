import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FormInsertPost from "./FormInsertPost";
import { actionTypes } from "../../../../redux/posts/posts_select_forum"
import { actionTypes as actionTypesStock } from "../../../../redux/market/stock_select_summaries"
import { CircularProgress } from '@material-ui/core';
import { useLocation } from 'react-router-dom';



export default function Index() {
    const dispatch = useDispatch()
    const state = useSelector(state => state.reducer_select_forum)
    const stateStock = useSelector(state => state.reducerStockList.data)
    const [stateSort, setStateSort] = useState([])
    const location = useLocation()


    ////////////////////////////////////////find from route///////////////////////////////////////
    const handleFromRoute = () => {
        if (!location.state) {
            return <FormInsertPost
                subgroup_name={stateSort}
                symbol={stateStock}
            />
        }

        return <FormInsertPost
            subgroup_name={stateSort}
            symbol={stateStock}
            valueSubgroup_name={location.state}
        />
    }
    //////////////////////////////////////////////////////////////////////////////////////////////

    ///////////////////////////select forum for isin///////////////////////////////
    useEffect(() => {
        dispatch({ type: actionTypes.forumAsync })
        dispatch({ type: actionTypesStock.stockListAsync })
    }, []) //eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if (state) {
            let sort = state.data.sort(function (a, b) {
                return a.body.name.localeCompare(b.body.name)
            }
            );

            setStateSort(sort)
        }
    }, [state])
    /////////////////////////////////////////////////////////////////////////////////////

    ///////////////////////////select forum for subgroup_name///////////////////////////////
    useEffect(() => {
        dispatch({ type: actionTypes.forumAsync })
    }, []) //eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if (state) {
            let sort = state.data.sort(function (a, b) {
                return a.body.name.localeCompare(b.body.name)
            }
            );

            setStateSort(sort)
        }
    }, [state])
    /////////////////////////////////////////////////////////////////////////////////////


    return (
        <div>
            {
                stateSort.length && stateStock.length ?
                    handleFromRoute()
                    :
                    <CircularProgress />
            }

        </div>
    )
}
