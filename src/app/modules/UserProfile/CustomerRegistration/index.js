import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux';

import Router from './Router';
import StepOne from './StepOne';
import StepTwo from './StepTwo';
import StepThree from './StepThree';
import { actionTypes } from './../../../../redux/profile/clubmember_select_get_kyc_profile';


export default function Index({ open, setOpen, profile }) {

    const dispatch = useDispatch()
    const [indexChild, setIndexChild] = useState(0)
    const [state, setstate] = useState({ national_id: '' })

    useEffect(() => {
        if (profile[0]) {
            setstate(profile[0])
        }
    }, [profile])


    useEffect(() => {
        if (!open) {
            dispatch({ type: actionTypes.remove_profileAsync })
        }
    }, [open])//eslint-disable-line react-hooks/exhaustive-deps 


    return (
        <div>
            <Router open={open} setOpen={setOpen} indexChild={indexChild}>
                <StepOne
                    data={state}
                    setIndexChild={setIndexChild}
                />
                <StepTwo
                    setIndexChild={setIndexChild}
                    data={state}
                    open={open}
                />
                <StepThree
                    setIndexChild={setIndexChild}
                    open={open}
                    setOpen={setOpen}
                />
            </Router>
        </div>
    )
}
