import React from 'react'
import { Checkbox } from "@material-ui/core";
import {
    dateConvertMiladiToShamsi,
} from "../../../../../common/method/date";
import { makeStyles } from "@material-ui/styles";
import Pagination from "../../../../../common/components/pagination";
import OutlinedCard from "../../../../../common/components/cardNoData";


const useStyle = makeStyles(() => ({
    table: {
        maxHeight: '63vh',
        overflow: 'auto'
    },
    stickyPagination: {
        textAlign: "center",
        fontWeight: "bold",
        margin: "0px auto",
        position: "sticky",
        bottom: -17,
        padding: "10px 0",
        display: "flex",
        justifyContent: "center",
        backgroundColor: 'white'

    },
}));


export default function Index({
    state,
    pagnation,
    stateFilter,
    stateReducer,
    selectMultiRow,
    flagAllCheckBox,
    changePagnation,
    handleAllCheckBoxBody,
    handleChangeCheckboxBody,
}) {


    const classes = useStyle();

    return (
        <div className={`${classes['table']} w-100  rounded-lg py-2 px-10 mb-10 mt-10`}>
            <table className={`table table-responsive d-lg-table  table-hover`}>
                <thead>
                    <tr style={{ borderBottom: "2px solid black !important" }}>
                        <th scope="col">
                            <Checkbox
                                checked={flagAllCheckBox}
                                onChange={() => handleAllCheckBoxBody()}
                                inputProps={{ "aria-label": "primary checkbox" }}
                            />
                        </th>
                        <th scope="col" style={{ minWidth: 120 }}> نام نماد</th>
                        <th scope="col" style={{ minWidth: 120 }}> شناسه نماد</th>
                        <th scope="col" style={{ minWidth: 120 }}>تعداد</th>
                        <th scope="col" style={{ minWidth: 120 }}>سود نقدی هر سهم </th>
                        <th scope="col" style={{ minWidth: 120 }}>سود نقدی نقدی کل</th>
                        <th scope="col" style={{ minWidth: 120 }}>تاریخ</th>
                    </tr>
                </thead>
                <tbody>
                    {state
                        .filter(item => {
                            if (!stateFilter) return item
                            if (stateFilter) {
                                if (item.body.company_name.includes(stateFilter)) {
                                    return item
                                }
                            }
                            return null
                        })
                        ?.filter((item, index) => {

                            if (stateFilter) return item

                            if (
                                index + 1 >= ((pagnation.number * stateReducer.size) - stateReducer.size) + 1 &&
                                index + 1 <= (pagnation.number * stateReducer.size)
                            ) {
                                return item
                            }
                            return null
                        })
                        .map((itm, ind) => (
                            <tr key={ind}>
                                <td>
                                    <Checkbox
                                        checked={selectMultiRow[itm.id] ? selectMultiRow[itm.id] : false}
                                        onChange={() => handleChangeCheckboxBody(itm.id)}
                                        inputProps={{ "aria-label": "primary checkbox" }}
                                    />
                                </td>
                                <td>
                                    {itm.body.company_name}
                                </td>
                                <td>
                                    {itm.body.isin}
                                </td>
                                <td>
                                    {itm.body.stocks}
                                </td>
                                <td>
                                    {itm.body.distributed_netincome}
                                </td>
                                <td>
                                    {itm.body.dividend_value}
                                </td>

                                <td>
                                    {dateConvertMiladiToShamsi(itm.body.publish_date)}
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
            <div className={classes.stickyPagination}>

                {
                    (stateReducer.data.length !== 0 && !stateFilter) && (
                        <Pagination
                            shape="rounded"
                            variant="outlined"
                            count={Math.ceil(stateReducer.total / stateReducer.size)}
                            page={pagnation.count}
                            onChange={changePagnation}
                            setPagnation={changePagnation}
                        />
                    )
                }


            </div>
            {
                stateReducer.data.length === 0 && (
                    <OutlinedCard />
                )
            }


        </div >
    )
}
