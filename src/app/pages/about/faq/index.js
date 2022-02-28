import React from 'react'
import { useSubheader } from "../../../../_metronic/layout";
// import NotificationSelectNotificationLast4 from '../../../modules/Notifaction/notification_select_notificationLast4';
import FaqSelectList from './../../../modules/About/faq_select_list';


export default function Index() {
    const suhbeader = useSubheader();
    suhbeader.setTitle("سوالات متداول");

    return (
        <div className="bg-white rounded-lg p-10" >
            {/* <NotificationSelectNotificationLast4 /> */}
            <FaqSelectList />
        </div>
    )
}
