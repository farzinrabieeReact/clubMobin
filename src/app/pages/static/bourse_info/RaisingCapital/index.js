import React from 'react'
import { useSubheader } from "../../../../../_metronic/layout";
import RaisingCapital from '../../../../modules/Static/bourse_info/RaisingCapital';

export default function Index() {

    const suhbeader = useSubheader();
    suhbeader.setTitle("افزایش سرمایه ");


    return (
        <div className="bg-white rounded-lg py-10" >
            <RaisingCapital />
            
        </div>
    )
}
