import React from 'react'
import { useSubheader } from "../../../../_metronic/layout";
import Education from '../../../modules/Static/education_select_list';

export default function Index() {
    const suhbeader = useSubheader();
    suhbeader.setTitle("نرم افزار ها");

    return (
        <div className="bg-white rounded-lg py-10" >
            <Education />
        </div>
    )
}
