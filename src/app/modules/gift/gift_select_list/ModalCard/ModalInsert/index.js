import React  from 'react';
import { giftInsert } from '../../../../../../redux/gift/gift_insert_gift';
import { getDataInLocalstorage } from '../../../../../common/method/getDataInLocalstorage'
import { handleNotificationAlertTryUpdate, handleNotificationAlertCatch } from './../../../../../common/method/handleNotificationAlert';
import { actionTypes } from "../../../../../../redux/profile/clubmember_select_bonus";



import ModalCustom from '../../../../../common/components/ModalCustom';
import BIMEHSAMAN from './BIMEH_SAMAN';
import DG from './DG';
import NOTYPE from './NO_TYPE';
import OFFCODE from './OFF_CODE';
import ONLINECHARGE from './ONLINE_CHARGE';
import PHYSICAL from './PHYSICAL';
import TAHLIL from './TAHLIL';
import UP from './UP';
import KALA from './KALA'
import { useDispatch } from 'react-redux';


export default function Index({ data, setOpen, Open ,handleCloseModal}) {
    const dispatch = useDispatch();

    

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

                    handleNotificationAlertTryUpdate(res);
                    dispatch({ type: actionTypes.bonusSelectAsync });
                    
                } catch {
                    handleNotificationAlertCatch();
                }
                
            })
            .catch(() => {
                alert('مشکلی در سمت سرور رخ داده است')
            })
            .finally(()=>{
                handleCloseModal();
            })
    }


    let ListModal = {
        BIMEH_SAMAN: <BIMEHSAMAN setopen={setOpen} apiInsertGift={apiInsertGift} />,
        DG: <DG setopen={setOpen} apiInsertGift={apiInsertGift} />,
        NO_TYPE: <NOTYPE setopen={setOpen} apiInsertGift={apiInsertGift} />,
        OFF_CODE: <OFFCODE setopen={setOpen} apiInsertGift={apiInsertGift} />,
        ONLINE_CHARGE: <ONLINECHARGE setopen={setOpen} apiInsertGift={apiInsertGift} />,
        PHYSICAL: <PHYSICAL setopen={setOpen} apiInsertGift={apiInsertGift} />,
        TAHLIL: <TAHLIL setopen={setOpen} apiInsertGift={apiInsertGift} />,
        UP: <UP setopen={setOpen} apiInsertGift={apiInsertGift} />,
        KALA: <KALA setopen={setOpen} apiInsertGift={apiInsertGift} />,
    }


    return (
        <ModalCustom open={Open} setOpen={setOpen} >
            {
                ListModal[data.body.type]
                    ? ListModal[data.body.type]
                    : ListModal['NO_TYPE']
            }

        </ModalCustom>
    )
}
