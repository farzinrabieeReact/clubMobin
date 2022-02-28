import React from 'react'
import { useSubheader } from "../../../../_metronic/layout";
import GovermentsSelectList from './../../../modules/About/goverments_select_list';

export default function Index() {

    const suhbeader = useSubheader();
    suhbeader.setTitle("لیست دفاتر پیشخوان دولت");


    return (
        <div className="bg-white rounded p-10" >
            <GovermentsSelectList />
        </div>
    )
}
