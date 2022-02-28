import React, { useEffect } from 'react';
import DateRangeIcon from '@material-ui/icons/DateRange';
import PersonIcon from '@material-ui/icons/Person';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { actionTypes } from "./../../../../redux/posts/posts_select_sidebarGoldAndCurrency"
import { LinearProgress } from '@material-ui/core';
import { dateConvertMiladiToShamsi } from '../../../common/method/date';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';

export function PostSidebarGoldAndCurrency() {
    const dataReducer = useSelector(state => state.reducerPostGoldAndCurrency)
    let dispatch = useDispatch()
    const { push } = useHistory()

    useEffect(() => {
        dispatch({ type: actionTypes.postsGoldAndCurrencyAsync })
    }, []) //eslint-disable-line react-hooks/exhaustive-deps

    if (dataReducer.loading) {
        return (
            <div className="bg-white rounded-lg p-5 shadow m-5">
                <h4 className="border-bottom py-2 text-center">آخرین مطالب گروه طلا و ارز</h4>
                <LinearProgress />
            </div>
        )
    }


    return (
        <div className="bg-white rounded-lg p-5 shadow m-5">
            <h4 className="border-bottom py-2 text-center">آخرین مطالب گروه طلا و ارز</h4>
            {
                dataReducer.data.map((item, ind) => (
                    <div key={ind} className="d-flex justify-content-center align-items-center p-2">
                        <div
                            className="flex-grow-1 cursor-pointer color-hover text-dark-75 text-ellipsis"
                            onClick={() => push({
                                pathname: "/posts/detailPost",
                                state: { id: item.id, subgroup_name: item.body.subgroup_name }
                            })}
                        >
                            {item.body.title}
                        </div>

                        <div className="border-left pl-2 text-muted-custom" style={{ width: "40%" }}>
                            <p className="text-ellipsis">
                                <PersonIcon />
                                {item.body.author_first_name}{" "}{item.body.author_last_name}
                            </p>
                            <p className="text-ellipsis">
                                <DateRangeIcon />
                                <span className="pl-1">
                                    {item.body.create_date.split(" ")[1].split(".")[0]}
                                </span>
                                <span className="px-1">
                                    {dateConvertMiladiToShamsi(item.body.create_date.split(" ")[0])}
                                </span>
                            </p>
                        </div>
                    </div>
                ))
            }
            {
                dataReducer.data.length !== 0 && (
                    <div
                        className="color-g text-center cursor-pointer"
                        onClick={() => push({
                            pathname: "/posts/list",
                            state: {
                                subgroup_name: dataReducer.data[0].body.subgroup_name,
                                id: dataReducer.data[0].body.subgroup_id
                            }
                        })}
                    >
                        <p>
                            نمایش بیشتر
                    <KeyboardArrowLeftIcon />
                        </p>
                    </div>
                )
            }
        </div>
    )
}

