import React
  from 'react'
import { useSelector } from 'react-redux';
import RegistrationLevel3 from './RegistrationLevel3'

export default function Index() {
    const state = useSelector(state => state.reducerRegistration)


    return (
        <>
            {
                state.data ? (
                    <RegistrationLevel3 data={state.data} />
                ) : null
            }
        </>
    )
}


// let stateStatic = {
//     "first_name": "erfan",
//     "last_name": "null",
//     "national_id": "0005008050",
//     "user": "null",
//     "phone": "+989129734568",
//     "email": "ahmad.asadi@aut.ac.ir",
//     "gender": "2",
//     "pass_salt": "",
//     "pass_hash": "",


//     "profile_picture": null,
//     "birth_date": null,


//     "permission_level": null,
//     "automation_id": null,
//     "is_individual": null,
//     "introducing_member_id": null,
//     "introducing_member_national_id": null,
//     "introducing_member_automation_id": null,
//     "category": null,
//     "bourse_code": null,
//     "energy_bourse_code": null,
//     "kala_bourse_code": null,
//     "ati_bourse_code": null,
//     "available_bonus": null,
//     "reserved_bonus": null,
//     "registration_date": null,
//     "automation_club_id": null,
//     "introducing_member_automation_club_id": null,
//     "is_active": null,
// }

