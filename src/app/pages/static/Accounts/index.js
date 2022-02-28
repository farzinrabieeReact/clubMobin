import React from 'react'
import { useSubheader } from "../../../../_metronic/layout";

import AccountsSelectList from '../../../modules/Static/Accounts_select_list';

export default function Index() {
    const suhbeader = useSubheader();
    
    suhbeader.setTitle("شماره حساب های کارگزاری");

    return (
        <div className="bg-white rounded-lg p-10" >
            <AccountsSelectList />
        </div>
    )
}
