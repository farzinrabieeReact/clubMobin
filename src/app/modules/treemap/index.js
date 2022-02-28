// import { CircularProgress } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import "./index.css"

export function TreemapModule() {
    const [state, setstate] = useState(null)

    useEffect(() => {
        window.foamTreeCall()
        window.foamTreeMethod()

        return function cleanup() {
            window.foamTreeMethodUnsubscribe()
        }

    }, [])

    useEffect(() => {
        window.clickFilterColor(state)
    }, [state])

    const handleClickColor = (num) => {
        setstate(prev => prev === num ? null : num)
    }


    return (
        <>
            <div className="root-foamtree">
                {/* <div className="col-12 col-md-3" id="loading-treemap">
                    <CircularProgress />
                </div> */}
                {/* <div className="details">
                    <p className="title text-center btn-default" id="foamtree-sector-name">جزئیات سهم</p>
                    <div className="items">
                        <div className="table-responsive">
                            <table className="table" id="foamtree-details">
                                <thead className="tableFixHead">
                                    <tr>
                                        <th>نام نماد</th>
                                        <th>قیمت سهم</th>
                                        <th>درصد تغییر</th>
                                        <th>حجم تغییر</th>
                                        <th>ارزش معاملات</th>
                                    </tr>
                                </thead>
                                <tbody id="foamtree-details-tbody">
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div> */}

                <div className="main">
                    <div className="filter">
                        <div className="d-flex">
                            <div className="">
                                <select className="form-select form-select-lg" aria-label=".form-select-lg example"
                                    id="baseFilter-treemap">
                                    <option value="turnover" selected>حجم معاملات</option>
                                    <option value="transactions_value">ارزش معاملات</option>
                                    <option value="Legal_movements">تحرکات حقوقی</option>
                                </select>
                            </div>

                            <div className="px-1">
                                <select className="form-select form-select-lg" aria-label=".form-select-lg example"
                                    id="flowfilter-treemap">
                                    <option value="all" selected>کل بازار</option>
                                    <option value="1">بورس</option>
                                    <option value="2">فرابورس</option>
                                    <option value="4">پایه</option>
                                </select>
                            </div>

                            <div className="px-1">
                                <select className="form-select form-select-lg" aria-label=".form-select-lg example"
                                    id="sectorsfilter-treemap">
                                    <option value="all" selected>همه صنایع</option>
                                </select>
                            </div>
                        </div>

                        <div className="d-flex align-items-center white-space my-2 my-xl-0">
                            <p className="m-0">
                                <span className="ml-2">شاخص کل:</span>
                                <span id="treemapIndexLastValue" className="mx-1"></span>
                            </p>
                            <p className="m-0">
                                <span className="ml-2">تغییر شاخص کل:</span>
                                <span id="treemapIndexChange" className="mx-1"></span>
                            </p>
                            <p className="m-0">
                                <span className="ml-2">آخرین بروز رسانی:</span>
                                <span id="treemapTimeStamp" className="mx-1"></span>
                            </p>
                        </div>

                        <div className="legend">
                            <p onClick={() => handleClickColor(-4)} className={`pallet ${state === -4 ? "selectedColor" : ""}`} style={{ backgroundColor: "rgb(246, 53, 56)" }}>-4</p>
                            <p onClick={() => handleClickColor(-2)} className={`pallet ${state === -2 ? "selectedColor" : ""}`} style={{ backgroundColor: "rgb(139,68, 78)" }}>-2</p>
                            <p onClick={() => handleClickColor(0)} className={`pallet ${state === 0 ? "selectedColor" : ""}`} style={{ backgroundColor: "rgb(65, 69, 84)" }}>0</p>
                            <p onClick={() => handleClickColor(2)} className={`pallet ${state === 2 ? "selectedColor" : ""}`} style={{ backgroundColor: "rgb(53,118,78)" }}>+2</p>
                            <p onClick={() => handleClickColor(4)} className={`pallet ${state === 4 ? "selectedColor" : ""}`} style={{ backgroundColor: " rgb(48, 204, 90)" }}>+4</p>
                        </div>
                    </div>

                    <div className="visualization mt-md-0 mt" id="visualization">
                    </div>



                </div>

            </div >
        </>
    )
}
