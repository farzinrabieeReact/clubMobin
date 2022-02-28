import React from 'react';
import { giftInsert } from '../../../../../../redux/gift/gift_insert_gift';
import { getDataInLocalstorage } from '../../../../../common/method/getDataInLocalstorage'
import { handleNotificationAlertTryUpdate, handleNotificationAlertCatch } from './../../../../../common/method/handleNotificationAlert';


import ModalCustom from '../../../../../common/components/ModalCustom';
import BIMEHSAMAN from './../../../gift_select_list/ModalCard/ModalInsert/BIMEH_SAMAN';
import DG from './../../../gift_select_list/ModalCard/ModalInsert/DG';
import NOTYPE from './../../../gift_select_list/ModalCard/ModalInsert/NO_TYPE';
import OFFCODE from './../../../gift_select_list/ModalCard/ModalInsert/OFF_CODE';
import ONLINECHARGE from './../../../gift_select_list/ModalCard/ModalInsert/ONLINE_CHARGE';
import PHYSICAL from './../../../gift_select_list/ModalCard/ModalInsert/PHYSICAL';
import TAHLIL from './../../../gift_select_list/ModalCard/ModalInsert/TAHLIL';
import UP from './../../../gift_select_list/ModalCard/ModalInsert/UP';
import KALA from './../../../gift_select_list/ModalCard/ModalInsert/KALA'


export default function Index({ data, open, setopen }) {



    const apiInsertGift = (values) => {

        let customData = Object.keys(values).map((items) => {
            return { name: items, value: values[items] }
        })


        let _data = {
            member_id: getDataInLocalstorage("member_id"),
            member_first_name: null,
            member_last_name: null,
            member_national_id: null,
            registration_date: null,
            status: null,
            gift_id: data.id,
            gift_name: null,
            bonus_id: null,
            gift_type: null,
            rejection_reason: null,
            gift_custom_data: customData ? JSON.stringify(customData) : JSON.stringify([])

        }


        giftInsert(_data)
            .then(res => {
                try {
                    handleNotificationAlertTryUpdate(res)

                } catch {
                    handleNotificationAlertCatch()
                }

            })
            .catch(() => {
                alert('مشکلی در سمت سرور رخ داده است')
            })
    }


    let ListModal = {
        BIMEH_SAMAN: <BIMEHSAMAN setopen={setopen} apiInsertGift={apiInsertGift} />,
        DG: <DG setopen={setopen} apiInsertGift={apiInsertGift} />,
        NO_TYPE: <NOTYPE setopen={setopen} apiInsertGift={apiInsertGift} />,
        OFF_CODE: <OFFCODE setopen={setopen} apiInsertGift={apiInsertGift} />,
        ONLINE_CHARGE: <ONLINECHARGE setopen={setopen} apiInsertGift={apiInsertGift} />,
        PHYSICAL: <PHYSICAL setopen={setopen} apiInsertGift={apiInsertGift} />,
        TAHLIL: <TAHLIL setopen={setopen} apiInsertGift={apiInsertGift} />,
        UP: <UP setopen={setopen} apiInsertGift={apiInsertGift} />,
        KALA: <KALA setopen={setopen} apiInsertGift={apiInsertGift} />,
    }


    return (
        <ModalCustom open={open} setOpen={setopen} >
            {
                ListModal[data.body.type]
                    ? ListModal[data.body.type]
                    : ListModal['NO_TYPE']
            }

        </ModalCustom>
    )
}
