import React from 'react'
import {useSubheader} from "../../../../_metronic/layout";
import { Bonus } from "../../../../app/modules/Bonus/bonus_select-list";


export default function Index() {

    const subheader = useSubheader()
    subheader.setTitle("جزئیات امتیازات کسب شده")

    return (
        <div className="bg-white rounded-lg p-2 shadow mt-5">
               <Bonus/>
        </div>
    )
}
