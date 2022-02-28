import React from 'react'
import { useSubheader } from "../../../../_metronic/layout";
import JobOpportunities from '../../../modules/About/jobOpportunities_select_list';


export default function Index() {

    const suhbeader = useSubheader();
    suhbeader.setTitle("فرصت های شغلی");


    return (
        <div className="bg-white rounded-lg py-10" >
            <JobOpportunities />
        </div>
    )         
}
