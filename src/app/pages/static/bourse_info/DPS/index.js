import React from 'react'
import { useSubheader } from "../../../../../_metronic/layout";
import Dps from '../../../../modules/Static/bourse_info/DPS';

export default function Index() {

    const suhbeader = useSubheader();
    suhbeader.setTitle("مجمع شرکت ها");


    return (
        <div className="bg-white rounded-lg py-10" >
            <Dps />
            
        </div>
    )
}
