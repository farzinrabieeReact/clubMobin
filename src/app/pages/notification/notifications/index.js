import React from 'react'
import { useSubheader } from "../../../../_metronic/layout";
import { Switch, Route } from 'react-router-dom';

import NotificationsSelect from '../../../modules/Notifaction/notification_select_liast';
import NotificationSelectDetails from "../../../modules/Notifaction/notification_select_details";


export default function Index() {

    const suhbeader = useSubheader();
    suhbeader.setTitle("اعلانات");



    return (
            <div className="bg-white rounded-lg p-5" >
                <Switch>
                    <Route exact path="/notifications/detailes">
                        <NotificationSelectDetails />
                    </Route>
                    <Route path="/notifications">
                        <NotificationsSelect />
                    </Route>
                </Switch>
            </div>
            
        // <NotificationsSelect />   
    )
}
