import React from 'react'
import { useSubheader } from "../../../../_metronic/layout";
import About from '../../../modules/About/about_select_list';

export default function Index() {

    const suhbeader = useSubheader();
    suhbeader.setTitle("درباره باشگاه");


    return (
        <div className="bg-white rounded-lg py-10" >
            <About />
            
        </div>
    )
}
