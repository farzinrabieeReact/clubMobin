import React from 'react'
import { useSubheader } from "../../../../_metronic/layout";
import BranchSelectList from '../../../modules/About/branch_select_list';

export default function Index() {

    const suhbeader = useSubheader();
    suhbeader.setTitle("شعبه کارگزاری مبین سرمایه");


    return (
        <div className="bg-white rounded-lg p-10" >
            <BranchSelectList />
        </div>
    )
}
