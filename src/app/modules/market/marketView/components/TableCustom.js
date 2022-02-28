import React from 'react';
import { recColor } from '..';
import { handleNumber } from '../../../../common/method/displayData';

let head = [
    {
        label: "نماد"
    },
    {
        label: "آخرین قیمت"
    },
    {
        label: "قیمت پایانی"
    },
    {
        label: "ارزش کل"
    },
]

export default function TableCustom({ row }) {
    return (
        <div className="table-responsive">
            <table className="table table-head-custom table-head-bg table-borderless table-vertical-center stickyHeader">
                <thead>
                    <tr className="text-left text-uppercase">
                        {
                            head.map((item, ind) => (
                                <th key={ind}>{item.label}</th>
                            ))
                        }
                        {/* <th ><span className="text-dark-75">products</span></th>
                            <th></th>
                            <th>company</th>
                            <th>rating</th>
                            <th/> */}
                    </tr>
                </thead>
                <tbody>
                    {
                        row.map((item, ind) => (
                            <tr key={ind}>
                                <td >
                                        {item.InstrumentName}
                                </td>

                                <td dir="ltr">
                                    <span className={recColor(item.PriceChangePercent)}>
                                        {item.PriceChangePercent.toFixed(2)}%
                                     </span>
                                    {"  "}
                                    <span className={recColor(item.PriceChange)}>
                                        {handleNumber(item.PriceChange)}
                                    </span>
                                    <span className="d-block">{handleNumber(item.last_price)}</span>
                                </td>

                                <td dir="ltr">
                                    <span className={recColor(item.PriceChangePercent)}>
                                        {item.ClosePriceChangePercent.toFixed(2)}%
                                    </span>
                                    {"  "}
                                    <span className={recColor(item.PriceChangePercent)}>
                                        {handleNumber(item.ClosePriceChange)}</span>
                                    <span className="d-block">{handleNumber(item.ClosePrice)}
                                    </span>
                                </td>

                                <td>
                                    {handleNumber(item.TotalValue)} میلیون تومان
                                </td>


                            </tr>
                        ))
                    }




                    {/* 

                     <span className="text-dark-75 font-size-lg">
                                        $8,000,000
                                    </span>
                                    <span className="">
                                        In Proccess
                                    </span>
                                    <span className="text-dark-75 font-size-lg">
                                        $8,000,000
                                    </span>
                    
                    <td>
                        <span className="text-dark-75 font-weight-bolder d-blockblock font-size-lg">
                            Intertico
                                </span>
                        <span className="text-muted font-weight-bold">
                            Web, UI/UX Design
                                </span>
                    </td>
                    <td>
                        <span className="text-muted font-weight-bold d-block font-size-sm">
                            Best Rated
                                 </span>
                    </td>
                    <td className="pr-0 text-right">
                        <a href="#" className="btn btn-light-success font-weight-bolder font-size-sm">View Offer</a>
                    </td> */}

                </tbody>
            </table>
        </div>
    )
}
